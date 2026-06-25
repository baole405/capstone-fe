"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { useApp } from "@/features/app-context/context/app-context";
import { useEcommerce } from "@/features/ecommerce/context/ecommerce-context";
import { GlowBadge } from "@/components/glow/badge";
import {
  ShoppingCart,
  Home,
  Sparkles,
  Package,
  Calendar,
  MapPin,
  User,
  LayoutDashboard,
  Users,
  Stethoscope,
  Activity,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
};

interface GlowLayoutProps {
  children: ReactNode;
}

export function GlowLayout({ children }: GlowLayoutProps) {
  const { currentRole } = useApp();
  const { cart: ecommerceCart } = useEcommerce();
  const cartCount = ecommerceCart.reduce((s, i) => s + i.qty, 0);
  const pathname = usePathname();

  const userNav: NavItem[] = [
    { to: "/user", icon: Home, label: "Home" },
    { to: "/user/shop", icon: Package, label: "Products" },
    { to: "/user/routine", icon: Calendar, label: "Routine" },
    { to: "/user/treatment-journey", icon: Activity, label: "Journey" },
    { to: "/user/consultation", icon: Stethoscope, label: "Consult" },
    { to: "/user/clinics", icon: MapPin, label: "Clinics" },
    { to: "/user/cart", icon: ShoppingCart, label: "Cart", badge: cartCount },
    { to: "/user/profile", icon: User, label: "Profile" },
  ];

  const adminNav: NavItem[] = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/products", icon: Package, label: "Products" },
    { to: "/admin/inventory", icon: Package, label: "Inventory" },
    { to: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  ];

  const staffNav: NavItem[] = [
    { to: "/staff", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/staff/customers", icon: Users, label: "Customers" },
  ];

  const expertNav: NavItem[] = [
    { to: "/expert", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/expert/queue", icon: Calendar, label: "Queue" },
  ];

  const navItems: NavItem[] =
    currentRole === "admin"
      ? adminNav
      : currentRole === "staff"
        ? staffNav
        : currentRole === "expert"
          ? expertNav
          : userNav;

  return (
    <div className="bg-background min-h-screen">
      <nav className="border-border sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href={"/user" as Route}
              className="flex shrink-0 items-center gap-2"
            >
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-foreground hidden text-xl font-semibold md:inline">
                GlowScan
              </span>
            </Link>
            <div className="ml-4 flex flex-1 items-center gap-1 overflow-x-auto md:flex-initial">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  href={item.to as Route}
                  className={`relative flex items-center gap-1 rounded-lg px-2 py-2 whitespace-nowrap transition-colors md:gap-2 md:px-3 ${
                    pathname === item.to
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="hidden text-sm sm:inline md:text-base">
                    {item.label}
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <GlowBadge
                      variant="danger"
                      className="ml-1 scale-75 md:scale-100"
                    >
                      {item.badge}
                    </GlowBadge>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
