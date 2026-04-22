import type {
  AdminDashboardViewModel,
  AdminNavItem,
  AdminSection,
  AdminSectionViewModel,
} from "../types/admin-content";
import {
  getMockAdminDashboardViewModel,
  getMockAdminSections,
  getMockAdminSectionViewModel,
} from "./mock-admin-content-adapter";

export type AdminContentAdapter = {
  getDashboardViewModel: () => Promise<AdminDashboardViewModel>;
  getSectionViewModel: (slug: string) => Promise<AdminSectionViewModel | null>;
  getSections: () => Promise<AdminSection[]>;
  getNavRoot: () => Promise<AdminNavItem>;
};

const mockAdminContentAdapter: AdminContentAdapter = {
  async getDashboardViewModel() {
    return getMockAdminDashboardViewModel();
  },
  async getSectionViewModel(slug) {
    return getMockAdminSectionViewModel(slug);
  },
  async getSections() {
    return getMockAdminSections();
  },
  async getNavRoot() {
    const viewModel = await getMockAdminDashboardViewModel();

    return viewModel.navRoot;
  },
};

export function getAdminContentAdapter() {
  return mockAdminContentAdapter;
}
