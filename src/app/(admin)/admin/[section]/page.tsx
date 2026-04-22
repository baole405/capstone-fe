import { notFound } from "next/navigation";

import { getAdminContentAdapter } from "@/features/admin/adapters/admin-content-adapter";
import { AdminSectionPage } from "@/features/admin/components/admin-section-page";

type AdminSectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export default async function AdminDynamicSectionPage({
  params,
}: AdminSectionPageProps) {
  const { section } = await params;
  const data = await getAdminContentAdapter().getSectionViewModel(section);

  if (!data) {
    notFound();
  }

  return <AdminSectionPage data={data} />;
}
