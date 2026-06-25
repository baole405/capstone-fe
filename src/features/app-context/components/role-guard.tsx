"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResolvedRole } from "@/features/app-context/hooks/use-resolved-role";
import type { UserRole } from "@/lib/domain-types";

interface RoleGuardProps {
  requiredRole: UserRole;
  children: ReactNode;
}

export function RoleGuard({ requiredRole, children }: RoleGuardProps) {
  const role = useResolvedRole();
  const router = useRouter();

  useEffect(() => {
    if (role !== requiredRole) {
      router.replace("/unauthorized");
    }
  }, [role, requiredRole, router]);

  if (role !== requiredRole) return null;

  return <>{children}</>;
}
