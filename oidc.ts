import { getCookies, setCookie } from "$std/http/cookie.ts";

import { eq, sql } from "drizzle-orm";
import * as jose from "jose";
import * as oauth from "oauth4webapi";
import * as z from "zod";

import { authConfig } from "./auth.ts";
import { db, t } from "./database/mod.ts";

/** Set if edge TLS termination is in use (i.e. app sees http) */
const edgeTlsRedirects = Deno.env.get("EDGE_TLS_REDIRECTS") === "1";

const idTokenSchema = z.object({
  sub: z.string().uuid(),
  sid: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
});
type IdToken = z.infer<typeof idTokenSchema>;

const tokenGrantSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  id_token: z.string(),
  refresh_expires_in: z.number().int().positive(),
});

let client: {
  client_id: string;
  token_endpoint_auth_method: "client_secret_basic";
  client_secret: string;
};

let as: oauth.AuthorizationServer;
let jwks: ReturnType<typeof jose.createRemoteJWKSet>;

export async function initialise() {
  // Check authorisation config
  if (authConfig.type !== "oidc") {
    throw Error(`Invalid auth config for OpenID Connect`);
  }
  const { url, issuerUrl, clientSecret } = authConfig;

  // Create client object
  client = {
    client_id: "cap_audit_fresh",
    token_endpoint_auth_method: "client_secret_basic" as const,
    client_secret: clientSecret,
  };

  // Send discovery request to the authorization server
  const resp = await oauth.discoveryRequest(url, {
    algorithm: "oidc",
    [oauth.customFetch]: fetchWithRetry,
  });

  // Check the response and save the authentication server details
  as = await oauth.processDiscoveryResponse(issuerUrl ?? url, resp);

  // Get function for getting server's public key, for access token validation
  if (as.jwks_uri == null) {
    throw Error("No JWKS URI in discovery response from OIDC server");
  }
  jwks = jose.createRemoteJWKSet(new URL(as.jwks_uri));
}

function parseGrantResult(result: oauth.TokenEndpointResponse) {
  const x = tokenGrantSchema.parse(result);
  return {
    access: x.access_token,
    refresh: x.refresh_token,
    expiresAt: new Date(Date.now() + x.refresh_expires_in * 1e3),
    id: x.id_token,
  };
}

type TokenSet = ReturnType<typeof parseGrantResult>;

export async function redirectForAuth(requestUrl: URL) {
  if (as === undefined) {
    await initialise();
  }

  // PKCE
  const codeVerifier = oauth.generateRandomCodeVerifier();
  const codeChallenge = await oauth.calculatePKCECodeChallenge(codeVerifier);

  // Build URL to redirect user to authorization endpoint
  const authUrlParams = new URLSearchParams({
    client_id: client.client_id,
    redirect_uri: requestUrl.origin + "/oidc/callback",
    response_type: "code",
    scope: "openid email",
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });
  const authUrl = `${as.authorization_endpoint}?${authUrlParams}`;

  // Headers for redirect response, including setting cookie for PKCE
  const headers = new Headers({ Location: authUrl });
  setCookie(headers, {
    name: "authCodeVerifier",
    value: codeVerifier,
    maxAge: 1800,
    path: "/oidc/callback",
    sameSite: "Lax",
    secure: true,
    httpOnly: true,
  });

  // Redirect to the authorisation server
  return new Response("", { status: 303, headers });
}

export async function exchangeAuthCodeForAccessToken(
  url: URL,
  headers: Headers,
  currentSid?: string,
) {
  if (as === undefined) {
    throw Error("Can not authenticate - No connection to OIDC server");
  }

  // Rewrite callback URL if edge TLS termination is in use
  if (edgeTlsRedirects) {
    url.protocol = "https:";
  }

  // Authorization Code Grant Request
  const params = oauth.validateAuthResponse(as, client, url.searchParams);
  checkOauthError(params, "auth code grant");
  const codeVerifier = getCookies(headers).authCodeVerifier;
  const redirectUri = url.origin + url.pathname;
  const response = await oauth.authorizationCodeGrantRequest(
    as,
    client,
    params,
    redirectUri,
    codeVerifier,
  );

  // Process response
  checkWwwAuthenticateHeaders(response);
  const result = await oauth.processAuthorizationCodeOpenIDResponse(
    as,
    client,
    response,
  );
  checkOauthError(result, "auth code grant ID token");
  const tokens = parseGrantResult(result);

  // Get ID token claims
  const allClaims = oauth.getValidatedIdTokenClaims(result);
  const claims = idTokenSchema.parse(allClaims);

  // Log if this is a new session, but not if this was "silent authentication"
  if (claims.sid !== currentSid) {
    console.log(`Successful login by ${claims.email} (session ${claims.sid})`);
  }

  // Update the user table if needed,
  // and then store the refresh token in the db. No need to wait.
  updateUserTableFromIdToken(claims).then(() =>
    storeUserSession(
      claims.sub,
      claims.sid,
      tokens.refresh,
      tokens.expiresAt,
      tokens.id,
    )
  );

  return { tokens, claims };
}

/**
 * Validates an access token, including checking the auth server's signature.
 */
export async function validateAccessToken(accessToken: string) {
  if (jwks === undefined) {
    await initialise();
  }

  try {
    const { payload: claims } = await jose.jwtVerify<
      { sid: string; sub: string }
    >(
      accessToken,
      jwks,
      { requiredClaims: ["sid", "sub"] },
    );

    // Access token is valid. Check its claims are as expected.
    if (claims.typ !== "Bearer") {
      console.warn("Wrong token type received as access token", { claims });
      return { result: "wrong_type" as const };
    }

    return { result: "valid" as const, claims };
  } catch (error) {
    if (!(error instanceof jose.errors.JWTExpired)) {
      console.error("Invalid access token received", error);
      return { result: "invalid" as const };
    }

    // Access token has expired. Check its claims.
    const claims = jose.decodeJwt<{ sid: string }>(accessToken);
    return { result: "expired" as const, claims };
  }
}

const refreshTokenQuery = db.query.userSession.findFirst({
  columns: { refreshToken: true },
  where: eq(t.userSession.id, sql.placeholder("sid")),
}).prepare("refresh_token_query");

/** Look up the refresh token from the session ID */
export async function lookupRefreshToken(sid: string) {
  // Look up the refresh token corresponding to this session
  const dbResult = await refreshTokenQuery.execute({ sid });
  if (dbResult == null) {
    console.warn(`Session ${sid} not found, cannot look up refresh token`);
    return undefined;
  }
  return dbResult.refreshToken;
}

/** Update the user table from an ID token. Do not wait for completion. */
export function updateUserTableFromIdToken(claims: IdToken) {
  const { name, sub, email } = claims;
  return db.insert(t.user).values({ id: sub, name, emailAddr: email })
    .onConflictDoUpdate({ target: t.user.id, set: { name, emailAddr: email } })
    .execute()
    .catch((reason) => console.error(`User table update failed: ${reason}`));
}

/**
 * Creates a new entry in the user session table
 */
export function storeUserSession(
  userId: string,
  sid: string,
  refreshToken: string,
  expiresAt: Date,
  idToken?: string,
) {
  return db.insert(t.userSession)
    .values({ id: sid, userId, refreshToken, expiresAt, idToken })
    .onConflictDoUpdate({
      target: t.userSession.id,
      set: { refreshToken, expiresAt, idToken },
    })
    .execute()
    .catch((reason) => console.error(`User session store failed: ${reason}`));
}

/**
 * Uses a refresh token to request a new access token.
 * Returns the token set and refresh expiry time,
 * or undefined if the refresh token has itself expired.
 */
export async function refreshTokenGrant(refreshToken: string) {
  if (as === undefined) {
    await initialise();
  }

  const resp = await oauth.refreshTokenGrantRequest(as, client, refreshToken);
  checkWwwAuthenticateHeaders(resp);
  const result = await oauth.processRefreshTokenResponse(as, client, resp);
  if (oauth.isOAuth2Error(result)) {
    console.log(`Refresh token grant failed - ${result.error_description}`);
    return undefined;
  }

  const tokens = parseGrantResult(result);
  const { refresh, expiresAt, id } = tokens;

  // Get ID token claims
  const allClaims = oauth.getValidatedIdTokenClaims(result);
  const claims = idTokenSchema.parse(allClaims);

  console.log(`Session refreshed for ${claims.email} (session ${claims.sid})`);

  // Store the updated user session
  storeUserSession(
    claims.sub,
    claims.sid,
    refresh,
    expiresAt,
    id,
  );

  return tokens;
}

// Access token for Keycloak Admin API
let adminApiAccessToken: string;
let adminApiAccessTokenExpiry: number = 0;

export async function clientCredentialsGrant() {
  if (as === undefined) {
    await initialise();
  }

  // Return existing access token if it has not expired
  if (adminApiAccessTokenExpiry > Date.now()) return adminApiAccessToken;

  const resp = await oauth.clientCredentialsGrantRequest(as, client, {});
  checkWwwAuthenticateHeaders(resp);

  const result = await oauth.processClientCredentialsResponse(as, client, resp);
  checkOauthError(result, "client credentials grant");

  const { access_token, expires_in } = result;
  adminApiAccessToken = access_token;
  adminApiAccessTokenExpiry = Date.now() + (expires_in ?? 1e6) - 1000;

  console.log("Client credentials grant succeeded");

  return adminApiAccessToken;
}

export async function redirectForLogout(idToken: string | null | undefined) {
  if (as === undefined) {
    await initialise();
  }

  // Build URL to redirect user to logout endpoint
  let logoutUrl = `${as.end_session_endpoint}?client_id=${client.client_id}`;
  if (idToken != null) {
    logoutUrl += `&id_token_hint=${idToken}`;
  }

  // Redirect to the authorisation server
  return new Response("", { status: 302, headers: { Location: logoutUrl } });
}

// Validates and process a back-channel logout token
export async function backChannelLogout(logoutToken: string) {
  try {
    const { payload } = await jose.jwtVerify<{ sid: string; typ: string }>(
      logoutToken,
      jwks,
      { requiredClaims: ["sid"] },
    );

    const { sid, sub, typ } = payload;

    if (typ !== "Logout") {
      console.error("Invalid back-channel logout token", payload);
    }

    const { count } = await db.delete(t.userSession).where(
      eq(t.userSession.id, sid),
    );
    if (count > 0) {
      console.log("Back-channel logout succeeded", { sid, sub });
    } else {
      console.warn("Back-channel logout failed. Unknown session", { sid, sub });
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

function checkWwwAuthenticateHeaders({ headers, url }: Response) {
  const wwwAuth = headers.get("www-authenticate");
  if (wwwAuth) {
    throw Error(`Not authenticated for ${url}. WWW-Authenticate: ${wwwAuth}`);
  }
}

type AuthResponse = Parameters<typeof oauth.isOAuth2Error>[0];
function checkOauthError(
  x: AuthResponse,
  context?: string,
): asserts x is Exclude<AuthResponse, oauth.OAuth2Error> {
  if (oauth.isOAuth2Error(x)) {
    const ctx = (context === undefined) ? "" : `(${context})`;
    throw new Error(`OAuth Error${ctx}: ${x.error}`);
  }
}

async function fetchWithRetry(
  url: URL | RequestInfo,
  options?: RequestInit,
): Promise<Response> {
  let lastError;
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      const c = new AbortController();
      const timeoutId = setTimeout(() => c.abort(), 3000);
      try {
        return await fetch(url, { ...options, signal: c.signal });
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      lastError = error;
      console.warn(`Auth server connection failed (retry ${attempt}/10)...`);
      if (attempt < 10) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }
  throw new Error("All fetch attempts failed", { cause: lastError });
}
