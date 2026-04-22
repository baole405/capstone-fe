import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginPanel } from "@/features/auth/components/login-panel";
import { sanitizeRedirectPath } from "@/features/auth/lib/safe-redirect";
import { appConfig } from "@/lib/env";

type LoginPageProps = {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  if (appConfig.devBypassAuth) {
    redirect("/admin");
  }

  const cookieStore = await cookies();

  if (cookieStore.has("sid")) {
    redirect("/admin");
  }

  const { redirectTo } = await searchParams;

  return <LoginPanel redirectTo={sanitizeRedirectPath(redirectTo)} />;
}
