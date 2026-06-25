import { ReactNode } from "react";
import { GlowLayout } from "@/components/glow/layout";
import { RoleSwitcher } from "@/features/app-context/components/role-switcher";

export default function StaffLayout({ children }: { children: ReactNode }) {
  return (
    <GlowLayout>
      {process.env.NODE_ENV === "development" && <RoleSwitcher />}
      {children}
    </GlowLayout>
  );
}
