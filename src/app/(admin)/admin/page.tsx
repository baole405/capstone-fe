import { getAdminContentAdapter } from "@/features/admin/adapters/admin-content-adapter";
import { DashboardOverview } from "@/features/admin/components/dashboard-overview";

export default async function AdminDashboardPage() {
  const data = await getAdminContentAdapter().getDashboardViewModel();

  return <DashboardOverview data={data} />;
}
