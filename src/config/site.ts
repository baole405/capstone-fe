/**
 * WHAT: Global Site Configuration
 * WHY: Centralizes navigation menus, metadata, and routing structure to avoid hardcoding in layouts.
 * HOW: Layouts (DashboardLayout, AdminLayout) import this config and pass the relevant menu array to the reusable AppSidebar.
 * Note: Icons are stored as string names to prevent Next.js Server-to-Client serialization crashes.
 */

import { vi } from "./locales/vi";

export const siteConfig = {
  // Config for the general dashboard
  dashboard: {
    navMain: [
      {
        title: vi.sidebar.sections.dashboard,
        url: "/dashboard",
        icon: "LayoutDashboard",
      },
      {
        title: vi.sidebar.sections.lifecycle,
        url: "#",
        icon: "List",
      },
      {
        title: vi.sidebar.sections.analytics,
        url: "#",
        icon: "ChartBar",
      },
      {
        title: vi.sidebar.sections.projects,
        url: "#",
        icon: "Folder",
      },
      {
        title: vi.sidebar.sections.team,
        url: "#",
        icon: "Users",
      },
    ],
    navSecondary: [
      {
        title: vi.sidebar.sections.settings,
        url: "#",
        icon: "Settings2",
      },
      {
        title: vi.sidebar.sections.help,
        url: "#",
        icon: "CircleHelp",
      },
      {
        title: vi.sidebar.sections.search,
        url: "#",
        icon: "Search",
      },
    ],
    documents: [
      {
        name: vi.sidebar.sections.dataLibrary,
        url: "#",
        icon: "Database",
      },
      {
        name: vi.sidebar.sections.reports,
        url: "#",
        icon: "FileChartColumn",
      },
      {
        name: vi.sidebar.sections.wordAssistant,
        url: "#",
        icon: "File",
      },
    ],
  },

  // Future Configs:
  // admin: { ... },
  // staff: { ... }
};

export type SiteConfig = typeof siteConfig;
