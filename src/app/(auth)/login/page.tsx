import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginPanel } from "@/features/auth/components/login-panel";
import { sanitizeRedirectPath } from "@/features/auth/lib/safe-redirect";

type LoginPageProps = {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();

  if (cookieStore.has("sid")) {
    redirect("/admin");
  }

  const { redirectTo } = await searchParams;

  return <LoginPanel redirectTo={sanitizeRedirectPath(redirectTo)} />;
}
