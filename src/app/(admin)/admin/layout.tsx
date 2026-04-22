import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminShell } from "@/features/admin/components/admin-shell";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  if (!cookieStore.has("sid")) {
    redirect("/login?redirectTo=/admin");
  }

  return <AdminShell>{children}</AdminShell>;
}
