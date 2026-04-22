import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminShell } from "@/features/admin/components/admin-shell";
import { getAdminContentAdapter } from "@/features/admin/adapters/admin-content-adapter";
import { appConfig } from "@/lib/env";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminContentAdapter = getAdminContentAdapter();
  const [navRoot, sections] = await Promise.all([
    adminContentAdapter.getNavRoot(),
    adminContentAdapter.getSections(),
  ]);

  if (appConfig.devBypassAuth) {
    return (
      <AdminShell navRoot={navRoot} sections={sections}>
        {children}
      </AdminShell>
    );
  }

  const cookieStore = await cookies();

  if (!cookieStore.has("sid")) {
    redirect("/login?redirectTo=/admin");
  }

  return (
    <AdminShell navRoot={navRoot} sections={sections}>
      {children}
    </AdminShell>
  );
}
