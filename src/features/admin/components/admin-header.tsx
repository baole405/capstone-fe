"use client";

import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { useSession } from "@/features/auth/hooks/use-session";

import type { AdminSection } from "../types/admin-content";

type AdminHeaderProps = {
  sections: AdminSection[];
};

export function AdminHeader({ sections }: AdminHeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const sessionQuery = useSession();
  const activeSection = segments[1]
    ? (sections.find((section) => section.slug === segments[1]) ?? null)
    : null;
  const initials =
    sessionQuery.data?.name
      ?.split(" ")
      .slice(0, 2)
      .map((chunk) => chunk[0])
      .join("")
      .toUpperCase() ?? "GS";

  return (
    <header className="bg-background/80 sticky top-0 z-20 border-b border-white/50 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger />
          <div className="min-w-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={
                      <Link href="/admin" className="flex items-center gap-2" />
                    }
                  >
                    <HomeIcon className="size-4" />
                    Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {activeSection ? (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{activeSection.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : null}
              </BreadcrumbList>
            </Breadcrumb>
            <p className="text-muted-foreground truncate text-sm">
              {activeSection?.summary ??
                "Admin dashboard foundation with BFF auth and proxy-ready routing."}
            </p>
          </div>
        </div>

        <div className="border-border/70 flex items-center gap-3 rounded-full border bg-white/80 px-3 py-2">
          <Avatar className="border-border/80 size-9 border">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden min-w-0 sm:block">
            {sessionQuery.isLoading ? (
              <>
                <Skeleton className="mb-1 h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </>
            ) : (
              <>
                <p className="truncate text-sm font-medium">
                  {sessionQuery.data?.name ?? "Authenticated operator"}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {sessionQuery.data?.email ?? "Session cookie active"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
