import { apiJson } from "@/lib/api/client";
import type { AuthStatus, SessionUser } from "@/types/auth";

import { sanitizeRedirectPath } from "../lib/safe-redirect";

type StartLoginInput = {
  redirectTo?: string;
  idpHint?: "google";
};

export async function getSession() {
  return apiJson<SessionUser>("/auth/me");
}

export async function getAuthStatus() {
  return apiJson<AuthStatus>("/auth/status");
}

export async function startLogin({
  redirectTo = "/admin",
  idpHint,
}: StartLoginInput = {}) {
  const clientRedirectUri = new URL(
    sanitizeRedirectPath(redirectTo),
    window.location.origin,
  ).toString();

  const response = await apiJson<{ login_uri: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      client_redirect_uri: clientRedirectUri,
      ...(idpHint ? { idpHint } : {}),
    }),
  });

  window.location.assign(response.login_uri);
}

export async function logout() {
  await apiJson<{ success: boolean }>("/auth/logout", {
    method: "POST",
  });
}
