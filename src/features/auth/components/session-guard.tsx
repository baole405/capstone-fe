"use client";

import type { Route } from "next";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api/client";

import { AdminShellLoading } from "@/features/admin/components/admin-shell-loading";

import { useSession } from "../hooks/use-session";

export function SessionGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const sessionQuery = useSession();

  useEffect(() => {
    if (!(sessionQuery.error instanceof ApiError)) {
      return;
    }

    if (sessionQuery.error.status === 401) {
      const loginTarget = pathname
        ? `/login?redirectTo=${encodeURIComponent(pathname)}`
        : "/login";
      router.replace(loginTarget as Route);
    }
  }, [pathname, router, sessionQuery.error]);

  if (sessionQuery.isLoading) {
    return <AdminShellLoading label="Restoring admin session..." />;
  }

  if (
    sessionQuery.error instanceof ApiError &&
    sessionQuery.error.status === 401
  ) {
    return (
      <AdminShellLoading label="Session expired. Redirecting to login..." />
    );
  }

  if (sessionQuery.error) {
    return (
      <Card className="surface-glass max-w-2xl">
        <CardHeader>
          <CardTitle>Session validation failed.</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          The admin shell is reachable, but the frontend could not load the
          current user from <code>/auth/me</code>. Check the backend session and
          proxy response first.
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
}
