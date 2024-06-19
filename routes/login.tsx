import { defineRoute, type Handlers } from "$fresh/server.ts";
import type { PostState, State } from "./_middleware.ts";

import { Card, CardContent } from "../components/card.tsx";
import LoginEmailPassword from "../islands/LoginEmailPassword.tsx";

import { authConfig, fixedAuthFromForm } from "../auth.ts";
import { redirectForAuth } from "../oidc.ts";

export const handler: Handlers<undefined, PostState> = {
  POST(_req, { render, state: { formData, session } }) {
    const userId = (authConfig.type === "fixed")
      ? fixedAuthFromForm(formData)
      : undefined;

    if (authConfig.type != null && userId == null) {
      // Authentication failed. Render login page.
      return render(undefined, {
        status: 401,
        statusText: "Authentication failed",
      });
    }

    // Get the original user's target URL from the session cookie
    const targetUrl: string = session.flash("targetUrl") ?? "/";

    // Set the user ID in the session, and redirect to the target URL
    // Only redirect to relative URLs, for security (CWE-601)
    session.set("userId", userId);
    return new Response("", {
      status: 303,
      headers: { Location: targetUrl },
    });
  },
};

export default defineRoute<State>((_, { url, state: { csrf } }) => {
  if (authConfig.type == null) {
    // Redirect immediately to target if authentication is not required
    return new Response("", { status: 303, headers: { Location: "/" } });
  } else if (authConfig.type == "oidc") {
    // Redirect for OpenID Connect
    return redirectForAuth(url);
  } else {
    // Remaining authentication options are e-mail and password based
    const LoginComponent = LoginEmailPassword;

    return (
      <div class="h-full flex-center">
        <form method="POST">
          <input type="hidden" name="csrf" value={csrf} />
          <Card class="w-fit">
            <CardContent class="pt-6">
              <LoginComponent />
            </CardContent>
          </Card>
        </form>
      </div>
    );
  }
});
