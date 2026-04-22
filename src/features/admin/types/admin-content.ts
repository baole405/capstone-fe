import type { LucideIcon } from "lucide-react";

export type AdminPriority = "P0" | "P1" | "P2";

export type AdminSection = {
  slug: string;
  title: string;
  summary: string;
  priority: AdminPriority;
  icon: LucideIcon;
  outcomes: string[];
  blockers: string[];
};

export type DashboardHighlight = {
  label: string;
  value: string;
  detail: string;
};

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type AdminDashboardViewModel = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  highlights: DashboardHighlight[];
  sections: AdminSection[];
  backendQuestions: string[];
  navRoot: AdminNavItem;
};

export type AdminSectionViewModel = {
  section: AdminSection;
};
