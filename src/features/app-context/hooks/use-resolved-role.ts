"use client";

import { useApp } from "@/features/app-context/context/app-context";
import { useSession } from "@/features/auth/hooks/use-session";
import type { UserRole } from "@/lib/domain-types";

export function useResolvedRole(): UserRole {
  const { currentRole } = useApp();
  const { data: session } = useSession();

  if (process.env.NODE_ENV === "development") {
    return currentRole;
  }

  // In production, role comes from session. Falls back to 'user' until
  // the backend returns a role field on SessionUser.
  const sessionRole = (session as (typeof session & { role?: UserRole }) | null)
    ?.role;
  return sessionRole ?? "user";
}
