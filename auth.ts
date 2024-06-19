import { getCookies } from "$std/http/cookie.ts";

import type { Session } from "fresh-session";
import secureCompare from "secure-compare";

import {
  lookupRefreshToken,
  redirectForAuth,
  refreshTokenGrant,
  validateAccessToken,
} from "./oidc.ts";

const authConfigPath = Deno.env.get("AUTH_CONFIG_TS") ?? "@/auth.config.ts";

/** Set if edge TLS termination is in use (i.e. app sees http) */
const edgeTlsRedirects = Deno.env.get("EDGE_TLS_REDIRECTS") === "1";

/** Authentication config object, from auth.config.ts module */
export const authConfig = await import(authConfigPath)
  .then((x) => x.default).catch(() => ({ type: null })) as AuthCfg;

/** Type used in auth config file */
export type AuthCfg = { type: null } | FixedAuthCfg | OidcAuthCfg;

/** Type used in auth config file to configure fixed authentication */
export type FixedAuthCfg = {
  type: "fixed";
  users: { id: string; email: string; password: string }[];
};

/** Type used in auth config file to configure OpenID Connect authentication */
export type OidcAuthCfg = {
  type: "oidc";
  url: URL;
  clientSecret: string;
  issuerUrl?: URL;
};

/** Authenticate against fixed credentials in the config file. Returns the user ID or `undefined`. */
export function fixedAuth(email: string, password: string) {
  const userId = (authConfig as FixedAuthCfg).users.find((x) =>
    secureCompare(email, x.email) && secureCompare(password, x.password)
  )?.id;

  // Log attempt
  if (userId != null) {
    console.log(`Successful login. Email ${email} => user ID ${userId}`);
  } else {
    console.warn(`Failed login attempt. Email: ${email}.`);
  }

  return userId;
}

/** Perform fixed authentication from form data. Returns the user ID or `undefined`. */
export function fixedAuthFromForm(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email == "string" && typeof password == "string") {
    return fixedAuth(email, password);
  }
}

/** Perform fixed authentication from HTTP basic auth headers  */
export function fixedAuthFromHttpBasic(request: Request) {
  const authorization = request.headers.get("authorization");
  if (authorization) {
    const match = authorization.match(/^Basic\s+(.*)$/);
    if (match) {
      const [user, pw] = atob(match[1]).split(":");
      return fixedAuth(user, pw);
    }
  }
}

/** Perform bearer token authentication from HTTP auth headers  */
export async function authFromBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  if (authorization) {
    const match = authorization.match(/^Bearer\s+(.*)$/);
    if (match) {
      const accessToken = match[1];
      const { claims, result } = await validateAccessToken(accessToken);
      if (result === "valid") {
        return claims.sid;
      }
    }
  }
  return undefined;
}

/**
 * Uses the configured authentication to derive the user's ID from a Request.
 * For use with cookie-based browser sessions.
 *
 * If the request indicates the user is logged in, with a valid session,
 * then it returns an object containing the user ID,
 * as well as the access token if using OIDC.
 *
 * If the user is not logged in, or the session is invalid/expired,
 * then `userId` is undefined.
 *
 * If the session is valid, but a refresh grant was performed,
 * then the new access token is returned,
 * along with the expiry time of the new refresh token
 */
export async function userIdFromRequest(
  req: Request,
  session: Session,
): Promise<
  | { userId?: string; access?: string; expiresAt?: never }
  | { userId: string; access: string; expiresAt: Date }
> {
  if (authConfig.type == null) {
    // No authentication (used for development). Use fixed user ID.
    return { userId: "d90d599c-3a33-4ac1-a3af-a99e48f80dbe" };
  } else if (authConfig.type === "oidc") {
    // Get user and session ID from the session cookie
    const userId: string | undefined = session.get("userId");
    const sid: string | undefined = session.get("sid");

    // Get the access token from its cookie
    const access = getCookies(req.headers).access_token;

    // Give up now if any of this information is missing
    if (access == null || sid == null || userId == null) return {};

    // Validate the access token
    const { result, claims } = await validateAccessToken(access);
    if (result === "valid") {
      if (claims.sid !== sid || claims.sub !== userId) {
        console.warn("Invalid claims in access token", {
          claims,
          expected: { sid, sub: userId },
        });
        return {};
      }
      return { userId, access };
    } else if (result === "expired") {
      // Look up refresh token for this session from the database
      const refreshToken = await lookupRefreshToken(claims.sid);

      // Return now if refresh token not found
      if (refreshToken == null) return {};

      const refresh = await refreshTokenGrant(refreshToken);

      // Return now if refresh failed
      if (refresh == null) return {};

      return { userId, access: refresh.access, expiresAt: refresh.expiresAt };
    } else {
      // Access token is invalid
      return {};
    }
  } else if (authConfig.type === "fixed") {
    const userId: string | undefined = session.get("userId");
    return { userId };
  } else {
    throw Error("Unrecognised auth type in config");
  }
}

/** Returns a Response to redirect an unauthenticated user for login */
export function redirectToLogin(targetUrl: URL, session: Session) {
  // Rewrite target URL if edge TLS termination is in use
  if (edgeTlsRedirects) {
    targetUrl.protocol = "https:";
  }

  // Store the target URL temporarily in the session cookie
  session.flash("targetUrl", targetUrl.toString());

  if (authConfig.type === "oidc") {
    return redirectForAuth(targetUrl);
  } else {
    return new Response("", {
      status: 303,
      headers: { Location: "/login" },
    });
  }
}
