import { notFound } from "next/navigation";

import { AdminSectionPage } from "@/features/admin/components/admin-section-page";
import { getAdminSectionBySlug } from "@/features/admin/config/admin-sections";

type AdminSectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export default async function AdminDynamicSectionPage({
  params,
}: AdminSectionPageProps) {
  const { section } = await params;
  const definition = getAdminSectionBySlug(section);

  if (!definition) {
    notFound();
  }

  return <AdminSectionPage section={definition} />;
}
