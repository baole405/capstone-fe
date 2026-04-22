import type { LucideIcon } from "lucide-react";
import {
  BadgePercentIcon,
  BoxesIcon,
  BrainCircuitIcon,
  LayoutDashboardIcon,
  PackageCheckIcon,
  ShoppingCartIcon,
  StoreIcon,
  TruckIcon,
  UserRoundCogIcon,
  UsersRoundIcon,
  WrenchIcon,
} from "lucide-react";

export type AdminSection = {
  slug: string;
  title: string;
  summary: string;
  priority: "P0" | "P1" | "P2";
  icon: LucideIcon;
  outcomes: string[];
  blockers: string[];
};

export const adminSections: AdminSection[] = [
  {
    slug: "users",
    title: "User accounts",
    summary:
      "Manage admin, staff, expert, and end-user identities once BE exposes role sources.",
    priority: "P1",
    icon: UsersRoundIcon,
    outcomes: [
      "Search and filter user list",
      "View account profile and provider metadata",
      "Prepare activation and role management actions",
    ],
    blockers: [
      "BE has not exposed a role model in auth/session yet.",
      "User list and pagination contracts are still missing.",
    ],
  },
  {
    slug: "ai-models",
    title: "AI model config",
    summary:
      "Track analysis model versions, parameter definitions, and release notes for scan outputs.",
    priority: "P2",
    icon: BrainCircuitIcon,
    outcomes: [
      "List model versions and status",
      "Show configurable parameter descriptions",
      "Reserve space for model rollout controls",
    ],
    blockers: [
      "No BE module contract yet for model registry or config updates.",
    ],
  },
  {
    slug: "products",
    title: "Product catalog",
    summary:
      "Manage skincare products, ingredients, pricing, imagery, and recommendation metadata.",
    priority: "P1",
    icon: BoxesIcon,
    outcomes: [
      "Catalog table with filters and badge states",
      "Draft product detail drawer structure",
      "Image and inventory integration placeholders",
    ],
    blockers: ["Need BE schema for products, ingredients, and media uploads."],
  },
  {
    slug: "inventory",
    title: "Inventory",
    summary:
      "Track stock across warehouse and partner store locations with alert-driven operations.",
    priority: "P1",
    icon: PackageCheckIcon,
    outcomes: [
      "Inventory snapshot cards",
      "Low-stock queue placeholder",
      "Multi-location table shell",
    ],
    blockers: ["Need BE contract for stock movements and location hierarchy."],
  },
  {
    slug: "orders",
    title: "Orders",
    summary:
      "Review checkout flow outcomes, payment states, cancellations, refunds, and fulfillment progress.",
    priority: "P1",
    icon: ShoppingCartIcon,
    outcomes: [
      "Order list shell with status filters",
      "Lifecycle timeline placeholder",
      "Refund and cancel action affordances",
    ],
    blockers: ["Need BE order status enum and refund capability contract."],
  },
  {
    slug: "delivery",
    title: "Delivery partners",
    summary:
      "Configure shipping integrations and monitor real-time delivery sync health.",
    priority: "P2",
    icon: TruckIcon,
    outcomes: [
      "Partner list and health badge shell",
      "Shipment detail summary card",
      "Integration status placeholder",
    ],
    blockers: [
      "Need BE adapter status APIs for GHN, GHTK, or equivalent providers.",
    ],
  },
  {
    slug: "stores",
    title: "Partner stores",
    summary:
      "Maintain GlowScan partner store locations with in-store services and measurement capabilities.",
    priority: "P2",
    icon: StoreIcon,
    outcomes: [
      "Store profile cards",
      "Address and services form shell",
      "Map-ready metadata placeholders",
    ],
    blockers: [
      "Need BE schema for store services, availability, and coordinates.",
    ],
  },
  {
    slug: "experts",
    title: "Experts",
    summary:
      "Review expert profile verification, commission setup, and consultation readiness.",
    priority: "P2",
    icon: UserRoundCogIcon,
    outcomes: [
      "Expert roster with verification state",
      "Commission and pricing summary cards",
      "Certification review placeholder",
    ],
    blockers: [
      "Need BE contract for expert status, earnings, and commission rules.",
    ],
  },
  {
    slug: "analytics",
    title: "Analytics and reports",
    summary:
      "Show business KPIs, engagement signals, skin concern trends, and export entrypoints.",
    priority: "P2",
    icon: BadgePercentIcon,
    outcomes: [
      "KPI cards for revenue, orders, and engagement",
      "Report export placeholder actions",
      "Trend section shells for future charts",
    ],
    blockers: [
      "Need BE report endpoints and export formats for CSV, Excel, or PDF.",
    ],
  },
  {
    slug: "settings",
    title: "System settings",
    summary:
      "Centralize environment-facing admin settings, governance notes, and rollout toggles.",
    priority: "P2",
    icon: WrenchIcon,
    outcomes: [
      "Environment metadata view",
      "Feature flag placeholder table",
      "Governance notes and audit handoff space",
    ],
    blockers: [
      "Need BE scope for mutable system settings before wiring any save action.",
    ],
  },
];

export const dashboardHighlights = [
  {
    label: "Auth style",
    value: "BFF session cookie",
    detail: "Frontend never stores Keycloak tokens in browser storage.",
  },
  {
    label: "Proxy boundary",
    value: "/api/be/*",
    detail: "Browser requests stay same-origin and forward to NestJS.",
  },
  {
    label: "Admin scope",
    value: "10 module shells",
    detail: "Every priority area from the overview has a route placeholder.",
  },
];

export const backendQuestions = [
  "Where will the canonical role model live: Keycloak claims or database tables?",
  "Which auth document is still authoritative besides docs/auth.vi.md?",
  "When will Swagger/OpenAPI cover the admin modules beyond auth?",
  "What are the first stable schemas for products, inventory, orders, and reports?",
];

export function getAdminSectionBySlug(slug: string) {
  return adminSections.find((section) => section.slug === slug);
}

export const adminRootItem = {
  href: "/admin",
  label: "Dashboard",
  icon: LayoutDashboardIcon,
};
