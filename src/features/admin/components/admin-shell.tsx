"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SessionGuard } from "@/features/auth/components/session-guard";

import type { AdminNavItem, AdminSection } from "../types/admin-content";
import { AdminHeader } from "./admin-header";
import { AppSidebar } from "./app-sidebar";

type AdminShellProps = Readonly<{
  children: React.ReactNode;
  navRoot: AdminNavItem;
  sections: AdminSection[];
}>;

export function AdminShell({ children, navRoot, sections }: AdminShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar navRoot={navRoot} sections={sections} />
      <SidebarInset className="bg-transparent">
        <AdminHeader sections={sections} />
        <div className="page-shell">
          <SessionGuard>{children}</SessionGuard>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
