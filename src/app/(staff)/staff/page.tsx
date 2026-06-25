"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowInput } from "@/components/glow/input";
import {
  Users,
  Search,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
} from "lucide-react";

const recentCustomers = [
  {
    id: 1,
    name: "Linh Nguyen",
    concern: "Acne, Oiliness",
    lastSeen: "2 hours ago",
    status: "active",
    priority: "high",
    hasUnread: true,
  },
  {
    id: 2,
    name: "Minh Tran",
    concern: "Dark spots",
    lastSeen: "1 day ago",
    status: "pending",
    priority: "medium",
    hasUnread: false,
  },
  {
    id: 3,
    name: "Hoa Le",
    concern: "Dryness",
    lastSeen: "3 days ago",
    status: "active",
    priority: "low",
    hasUnread: false,
  },
  {
    id: 4,
    name: "Thu Pham",
    concern: "Irritation",
    lastSeen: "5 hours ago",
    status: "escalated",
    priority: "high",
    hasUnread: true,
  },
];

const pendingQueue = [
  {
    id: 1,
    name: "An Nguyen",
    type: "New Assessment",
    time: "15 min ago",
    priority: "high",
  },
  {
    id: 2,
    name: "Bao Tran",
    type: "Follow-up",
    time: "1 hour ago",
    priority: "medium",
  },
  {
    id: 3,
    name: "Chi Le",
    type: "Product Question",
    time: "2 hours ago",
    priority: "low",
  },
];

export default function StaffDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = recentCustomers.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Staff Dashboard</h1>
            <p className="text-muted-foreground">
              Customer support and consultation management
            </p>
          </div>
          <GlowBadge
            variant="success"
            className="flex items-center gap-2 px-3 py-1"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-600" />
            Online
          </GlowBadge>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <GlowCard variant="sky">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-muted-foreground text-sm">Handled Today</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard variant="mint">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-muted-foreground text-sm">Avg Response</p>
              <p className="text-2xl font-bold">8m</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard variant="yellow">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-muted-foreground text-sm">High Priority</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard variant="lavender">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-muted-foreground text-sm">Satisfaction</p>
              <p className="text-2xl font-bold">94%</p>
            </div>
          </div>
        </GlowCard>
      </div>

      <GlowCard variant="peach" className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Pending Queue</h3>
          <GlowBadge variant="warning">{pendingQueue.length} waiting</GlowBadge>
        </div>
        <div className="space-y-2">
          {pendingQueue.map((item) => (
            <Link key={item.id} href={`/staff/customers/${item.id}` as Route}>
              <div className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-3 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3">
                  {item.priority === "high" && (
                    <ArrowUp className="h-4 w-4 text-red-600" />
                  )}
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-muted-foreground text-sm">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <GlowBadge
                    variant={
                      item.priority === "high"
                        ? "danger"
                        : item.priority === "medium"
                          ? "warning"
                          : undefined
                    }
                    className="text-xs"
                  >
                    {item.priority}
                  </GlowBadge>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {item.time}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </GlowCard>

      <GlowCard className="mb-8">
        <h3 className="mb-4 font-semibold">Quick Customer Lookup</h3>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-2.5 left-3 h-5 w-5" />
            <GlowInput
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </GlowCard>

      <div className="grid gap-6 md:grid-cols-2">
        <GlowCard>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Recent Activity</h3>
            <GlowBadge variant="info">2 clicks to full history</GlowBadge>
          </div>
          <div className="space-y-3">
            {filteredCustomers.map((customer) => (
              <Link
                key={customer.id}
                href={`/staff/customers/${customer.id}` as Route}
              >
                <div className="bg-muted hover:bg-accent relative cursor-pointer rounded-lg p-4 transition-colors">
                  {customer.hasUnread && (
                    <div className="bg-primary absolute top-3 right-3 h-2 w-2 rounded-full" />
                  )}
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{customer.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {customer.concern}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <GlowBadge
                        variant={
                          customer.status === "active"
                            ? "success"
                            : customer.status === "escalated"
                              ? "purple"
                              : "warning"
                        }
                        className="text-xs"
                      >
                        {customer.status}
                      </GlowBadge>
                      {customer.priority === "high" && (
                        <GlowBadge variant="danger" className="text-xs">
                          High Priority
                        </GlowBadge>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Last seen: {customer.lastSeen}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </GlowCard>

        <GlowCard variant="mint">
          <h3 className="mb-4 font-semibold">{"Today's Highlights"}</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-white p-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="font-medium">Successfully escalated 2 cases</p>
                <p className="text-muted-foreground text-sm">
                  Complex acne treatments to Dr. Minh Anh
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-white p-3">
              <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="font-medium">12 customers supported</p>
                <p className="text-muted-foreground text-sm">
                  Above your daily average of 9
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-white p-3">
              <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
              <div>
                <p className="font-medium">94% satisfaction rate</p>
                <p className="text-muted-foreground text-sm">
                  3 five-star reviews received
                </p>
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
