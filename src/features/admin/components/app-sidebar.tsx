"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { LogoutButton } from "@/features/auth/components/logout-button";

import type { AdminNavItem, AdminSection } from "../types/admin-content";

type AppSidebarProps = {
  navRoot: AdminNavItem;
  sections: AdminSection[];
};

export function AppSidebar({ navRoot, sections }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="gap-4 px-3 py-4">
        <div className="bg-sidebar-primary/12 text-sidebar-foreground rounded-2xl p-3">
          <p className="text-sidebar-foreground/60 text-xs font-medium tracking-[0.24em] uppercase">
            GlowScan
          </p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div>
              <p className="font-heading text-xl font-semibold">Admin</p>
              <p className="text-sidebar-foreground/70 text-xs">
                Next.js 16 scaffold
              </p>
            </div>
            <Badge className="bg-sidebar-primary text-sidebar-primary-foreground">
              v1
            </Badge>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === navRoot.href}
                  tooltip={navRoot.label}
                  render={
                    <Link href={navRoot.href as Route}>
                      <navRoot.icon />
                      <span>{navRoot.label}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((section) => {
                const href = `/admin/${section.slug}` as Route;

                return (
                  <SidebarMenuItem key={section.slug}>
                    <SidebarMenuButton
                      isActive={pathname === href}
                      tooltip={section.title}
                      render={
                        <Link href={href}>
                          <section.icon />
                          <span>{section.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-3 p-3">
        <div className="border-sidebar-border bg-sidebar-accent/70 text-sidebar-foreground/72 rounded-2xl border p-3 text-xs leading-5">
          Current auth gate is session-based only. Full admin RBAC waits on BE
          role contracts.
        </div>
        <LogoutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
