"use client";

import { useState } from "react";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { GlowInput } from "@/components/glow/input";
import { Search, Package, Truck, CheckCircle } from "lucide-react";

type OrderStatus =
  | "Created"
  | "Confirmed"
  | "Packed"
  | "Shipping"
  | "Delivered";

const orders = [
  {
    id: "GS-1284",
    customer: "Linh Nguyen",
    date: "May 16, 2026",
    total: 1485000,
    status: "Delivered" as OrderStatus,
    items: 3,
    delivery: "GHN",
    trackingCode: "GHN123456789",
  },
  {
    id: "GS-1283",
    customer: "Minh Tran",
    date: "May 16, 2026",
    total: 675000,
    status: "Shipping" as OrderStatus,
    items: 2,
    delivery: "GHTK",
    trackingCode: "GHTK987654321",
  },
  {
    id: "GS-1282",
    customer: "Hoa Le",
    date: "May 15, 2026",
    total: 950000,
    status: "Packed" as OrderStatus,
    items: 4,
    delivery: "GHN",
    trackingCode: "GHN456789123",
  },
  {
    id: "GS-1281",
    customer: "Anh Pham",
    date: "May 15, 2026",
    total: 385000,
    status: "Confirmed" as OrderStatus,
    items: 1,
    delivery: "GHTK",
    trackingCode: "GHTK321654987",
  },
  {
    id: "GS-1280",
    customer: "Thu Nguyen",
    date: "May 14, 2026",
    total: 1260000,
    status: "Created" as OrderStatus,
    items: 5,
    delivery: "GHN",
    trackingCode: "Pending",
  },
];

const getStatusVariant = (status: OrderStatus) => {
  switch (status) {
    case "Confirmed":
      return "info" as const;
    case "Packed":
      return "warning" as const;
    case "Shipping":
      return "purple" as const;
    case "Delivered":
      return "success" as const;
    default:
      return undefined;
  }
};

const getStatusIcon = (status: OrderStatus) => {
  if (status === "Packed") return <Package className="h-4 w-4" />;
  if (status === "Shipping") return <Truck className="h-4 w-4" />;
  if (status === "Delivered") return <CheckCircle className="h-4 w-4" />;
  return null;
};

const statuses = [
  "all",
  "Created",
  "Confirmed",
  "Packed",
  "Shipping",
  "Delivered",
] as const;

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Order Management</h1>
        <p className="text-muted-foreground">
          Track and manage customer orders
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          {
            label: "Total Orders",
            value: orders.length,
            variant: "sky" as const,
          },
          {
            label: "Pending",
            value: orders.filter(
              (o) => o.status === "Created" || o.status === "Confirmed",
            ).length,
            variant: "peach" as const,
          },
          {
            label: "Packed",
            value: orders.filter((o) => o.status === "Packed").length,
            variant: "yellow" as const,
          },
          {
            label: "Shipping",
            value: orders.filter((o) => o.status === "Shipping").length,
            variant: "lavender" as const,
          },
          {
            label: "Delivered",
            value: orders.filter((o) => o.status === "Delivered").length,
            variant: "mint" as const,
          },
        ].map((stat) => (
          <GlowCard key={stat.label} variant={stat.variant}>
            <p className="text-muted-foreground mb-1 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </GlowCard>
        ))}
      </div>

      <GlowCard className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-2.5 left-3 h-5 w-5" />
            <GlowInput
              placeholder="Search by order ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {statuses.map((status) => (
              <GlowButton
                key={status}
                size="sm"
                variant={statusFilter === status ? "primary" : "outline"}
                onClick={() => setStatusFilter(status)}
              >
                {status === "all" ? "All" : status}
              </GlowButton>
            ))}
          </div>
        </div>
      </GlowCard>

      <GlowCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-border border-b">
                <th className="p-3 text-left font-semibold">Order ID</th>
                <th className="p-3 text-left font-semibold">Customer</th>
                <th className="p-3 text-left font-semibold">Date</th>
                <th className="p-3 text-center font-semibold">Items</th>
                <th className="p-3 text-right font-semibold">Total</th>
                <th className="p-3 text-center font-semibold">Delivery</th>
                <th className="p-3 text-center font-semibold">Status</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-border hover:bg-muted/50 border-b"
                >
                  <td className="p-3">
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-muted-foreground text-xs">
                      {order.trackingCode}
                    </p>
                  </td>
                  <td className="p-3">{order.customer}</td>
                  <td className="text-muted-foreground p-3">{order.date}</td>
                  <td className="p-3 text-center">{order.items}</td>
                  <td className="p-3 text-right font-semibold">
                    {order.total.toLocaleString()} VNĐ
                  </td>
                  <td className="p-3 text-center">
                    <GlowBadge variant="info">{order.delivery}</GlowBadge>
                  </td>
                  <td className="p-3 text-center">
                    <GlowBadge variant={getStatusVariant(order.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </GlowBadge>
                  </td>
                  <td className="p-3 text-right">
                    <GlowButton size="sm" variant="outline">
                      View Details
                    </GlowButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlowCard>

      <GlowCard variant="sky" className="mt-6">
        <div className="flex items-start gap-3">
          <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <p className="mb-1 font-semibold">Mock Delivery Integration</p>
            <p className="text-muted-foreground text-sm">
              GHN/GHTK integration is mocked for demo and designed to be
              swappable for production. Tracking codes and delivery statuses are
              simulated.
            </p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
