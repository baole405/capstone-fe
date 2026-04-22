"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SessionGuard } from "@/features/auth/components/session-guard";

import { AdminHeader } from "./admin-header";
import { AppSidebar } from "./app-sidebar";

export function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset className="bg-transparent">
        <AdminHeader />
        <div className="page-shell">
          <SessionGuard>{children}</SessionGuard>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
