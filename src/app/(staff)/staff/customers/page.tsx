"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { GlowInput } from "@/components/glow/input";
import { useGlowToast } from "@/components/glow/toast";
import {
  Search,
  Users,
  AlertTriangle,
  Clock,
  TrendingUp,
  Star,
  User,
  Activity,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  Filter,
  ChevronDown,
  X,
  Camera,
  FileText,
  CheckCircle,
  Sparkles,
  Heart,
  Flame,
} from "lucide-react";

type RiskLevel = "low" | "medium" | "high" | "urgent";
type CustomerStatus = "active" | "inactive" | "pending-followup" | "escalated";
type TreatmentStage =
  | "assessment"
  | "initial-treatment"
  | "maintenance"
  | "improvement";

interface Customer {
  id: number;
  name: string;
  avatar: string;
  skinType: string;
  concerns: string[];
  riskLevel: RiskLevel;
  lastScanDate: string;
  treatmentStage: TreatmentStage;
  assignedStaff: string;
  purchaseValue: number;
  status: CustomerStatus;
  aiConfidence: number;
  complianceRate: number;
  lastInteraction: string;
  acneSeverity: string;
  oiliness: string;
}

const customers: Customer[] = [
  {
    id: 1,
    name: "Linh Nguyen",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    skinType: "combination",
    concerns: ["Acne", "Oiliness"],
    riskLevel: "high",
    lastScanDate: "May 16, 2026",
    treatmentStage: "initial-treatment",
    assignedStaff: "You",
    purchaseValue: 1485000,
    status: "active",
    aiConfidence: 86,
    complianceRate: 85,
    lastInteraction: "2 hours ago",
    acneSeverity: "Moderate",
    oiliness: "High",
  },
  {
    id: 2,
    name: "Minh Tran",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    skinType: "dry",
    concerns: ["Dark spots", "Fine lines"],
    riskLevel: "low",
    lastScanDate: "May 14, 2026",
    treatmentStage: "maintenance",
    assignedStaff: "Mai Anh",
    purchaseValue: 890000,
    status: "active",
    aiConfidence: 92,
    complianceRate: 95,
    lastInteraction: "1 day ago",
    acneSeverity: "Mild",
    oiliness: "Low",
  },
  {
    id: 3,
    name: "Hoa Le",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    skinType: "sensitive",
    concerns: ["Dryness", "Irritation", "Redness"],
    riskLevel: "urgent",
    lastScanDate: "May 17, 2026",
    treatmentStage: "assessment",
    assignedStaff: "You",
    purchaseValue: 650000,
    status: "escalated",
    aiConfidence: 68,
    complianceRate: 45,
    lastInteraction: "30 min ago",
    acneSeverity: "None",
    oiliness: "Very Low",
  },
  {
    id: 4,
    name: "Thu Nguyen",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    skinType: "oily",
    concerns: ["Severe Acne", "Large Pores"],
    riskLevel: "high",
    lastScanDate: "May 15, 2026",
    treatmentStage: "initial-treatment",
    assignedStaff: "You",
    purchaseValue: 1200000,
    status: "pending-followup",
    aiConfidence: 78,
    complianceRate: 70,
    lastInteraction: "5 hours ago",
    acneSeverity: "Severe",
    oiliness: "Very High",
  },
  {
    id: 5,
    name: "Anh Pham",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    skinType: "normal",
    concerns: ["Anti-aging", "Brightness"],
    riskLevel: "low",
    lastScanDate: "May 12, 2026",
    treatmentStage: "improvement",
    assignedStaff: "Mai Anh",
    purchaseValue: 2100000,
    status: "active",
    aiConfidence: 94,
    complianceRate: 100,
    lastInteraction: "3 days ago",
    acneSeverity: "None",
    oiliness: "Normal",
  },
];

const getRiskVariant = (risk: RiskLevel) => {
  if (risk === "low") return "success" as const;
  if (risk === "medium") return "info" as const;
  if (risk === "high") return "warning" as const;
  return "danger" as const;
};

const getStatusVariant = (status: CustomerStatus) => {
  if (status === "active") return "success" as const;
  if (status === "pending-followup") return "warning" as const;
  if (status === "escalated") return "danger" as const;
  return undefined;
};

const getTreatmentIcon = (stage: TreatmentStage) => {
  if (stage === "assessment") return <Camera className="h-4 w-4" />;
  if (stage === "initial-treatment") return <Flame className="h-4 w-4" />;
  if (stage === "maintenance") return <Heart className="h-4 w-4" />;
  if (stage === "improvement") return <TrendingUp className="h-4 w-4" />;
  return <Activity className="h-4 w-4" />;
};

export default function CustomersPage() {
  const { showToast } = useGlowToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const activeToday = customers.filter((c) => c.status === "active").length;
  const pendingFollowups = customers.filter(
    (c) => c.status === "pending-followup",
  ).length;
  const highRiskUsers = customers.filter(
    (c) => c.riskLevel === "high" || c.riskLevel === "urgent",
  ).length;
  const escalatedCases = customers.filter(
    (c) => c.status === "escalated",
  ).length;

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.concerns.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    const matchesRisk =
      riskFilter === "all" || customer.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleAction = (action: string, customer: Customer) => {
    showToast(`${action}: ${customer.name}`, "success");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Customer Management</h1>
        <p className="text-muted-foreground">
          Comprehensive CRM center for customer care
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <GlowCard variant="sky">
          <div className="mb-1 flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <p className="text-muted-foreground text-xs">Active Today</p>
          </div>
          <p className="text-2xl font-bold">{activeToday}</p>
        </GlowCard>
        <GlowCard variant="yellow">
          <div className="mb-1 flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-600" />
            <p className="text-muted-foreground text-xs">Pending Followups</p>
          </div>
          <p className="text-2xl font-bold">{pendingFollowups}</p>
        </GlowCard>
        <GlowCard variant="peach">
          <div className="mb-1 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <p className="text-muted-foreground text-xs">High Risk</p>
          </div>
          <p className="text-2xl font-bold">{highRiskUsers}</p>
        </GlowCard>
        <GlowCard>
          <div className="mb-1 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-red-600" />
            <p className="text-muted-foreground text-xs">Recent Complaints</p>
          </div>
          <p className="text-2xl font-bold">2</p>
        </GlowCard>
        <GlowCard variant="lavender">
          <div className="mb-1 flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-purple-600" />
            <p className="text-muted-foreground text-xs">Escalated</p>
          </div>
          <p className="text-2xl font-bold">{escalatedCases}</p>
        </GlowCard>
        <GlowCard variant="mint">
          <div className="mb-1 flex items-center gap-2">
            <Star className="h-4 w-4 text-green-600" />
            <p className="text-muted-foreground text-xs">Satisfaction</p>
          </div>
          <p className="text-2xl font-bold">4.6/5</p>
        </GlowCard>
      </div>

      {highRiskUsers > 0 && (
        <GlowCard variant="peach" className="mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
            <div className="flex-1">
              <p className="mb-1 font-semibold">
                High Priority Customers Require Attention
              </p>
              <p className="text-muted-foreground mb-3 text-sm">
                {highRiskUsers} customers are marked as high-risk or urgent.
              </p>
              <div className="flex flex-wrap gap-2">
                {customers
                  .filter(
                    (c) => c.riskLevel === "high" || c.riskLevel === "urgent",
                  )
                  .map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCustomer(c)}
                      className="hover:bg-accent rounded bg-white px-3 py-1.5 text-sm transition-colors"
                    >
                      {c.name} - {c.concerns.join(", ")}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </GlowCard>
      )}

      <GlowCard className="mb-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground pointer-events-none absolute top-2.5 left-3 h-5 w-5" />
              <GlowInput
                placeholder="Search by name, email, phone, or skin condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <GlowButton
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </GlowButton>
          </div>
          {showFilters && (
            <div className="border-border grid grid-cols-1 gap-3 border-t pt-3 md:grid-cols-2">
              <div>
                <label className="text-muted-foreground mb-1 block text-xs">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border-border w-full rounded border bg-white px-3 py-2 text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending-followup">Pending Followup</option>
                  <option value="escalated">Escalated</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="text-muted-foreground mb-1 block text-xs">
                  Risk Level
                </label>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="border-border w-full rounded border bg-white px-3 py-2 text-sm"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </GlowCard>

      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <GlowCard
            key={customer.id}
            className="cursor-pointer transition-all hover:shadow-md"
            onClick={() => setSelectedCustomer(customer)}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex flex-1 items-start gap-4">
                <div className="relative">
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div
                    className={`absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-2 border-white ${customer.riskLevel === "urgent" ? "bg-red-600" : customer.riskLevel === "high" ? "bg-yellow-600" : customer.riskLevel === "medium" ? "bg-blue-600" : "bg-green-600"}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="truncate font-semibold">{customer.name}</h3>
                    <GlowBadge
                      variant={getRiskVariant(customer.riskLevel)}
                      className="text-xs capitalize"
                    >
                      {customer.riskLevel}
                    </GlowBadge>
                    <GlowBadge
                      variant={getStatusVariant(customer.status)}
                      className="text-xs"
                    >
                      {customer.status.replace("-", " ")}
                    </GlowBadge>
                  </div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="text-muted-foreground text-xs">
                      {customer.skinType} skin
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-muted-foreground text-xs">
                      {customer.concerns.join(", ")}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Last scan: {customer.lastScanDate}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      {getTreatmentIcon(customer.treatmentStage)}
                      <span className="capitalize">
                        {customer.treatmentStage.replace("-", " ")}
                      </span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {customer.assignedStaff}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-1 text-xs">AI Score</p>
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-purple-600" />
                    <p className="font-semibold">{customer.aiConfidence}%</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground mb-1 text-xs">
                    Compliance
                  </p>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <p className="font-semibold">{customer.complianceRate}%</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground mb-1 text-xs">Spend</p>
                  <p className="font-semibold">
                    {(customer.purchaseValue / 1000).toFixed(0)}K VNĐ
                  </p>
                </div>
              </div>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Link href={`/staff/customers/${customer.id}` as Route}>
                  <GlowButton size="sm" variant="outline">
                    <FileText className="mr-1 h-4 w-4" />
                    Details
                  </GlowButton>
                </Link>
              </div>
            </div>
          </GlowCard>
        ))}
        {filteredCustomers.length === 0 && (
          <GlowCard>
            <div className="py-12 text-center">
              <Users className="text-muted-foreground mx-auto mb-4 h-16 w-16 opacity-30" />
              <p className="text-muted-foreground mb-2">No customers found</p>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          </GlowCard>
        )}
      </div>

      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="h-full w-full overflow-y-auto bg-white shadow-2xl md:w-2/3 lg:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-border sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
                <p className="text-muted-foreground text-sm">
                  {selectedCustomer.skinType} skin •{" "}
                  {selectedCustomer.lastInteraction}
                </p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="hover:bg-accent rounded p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-6 p-6">
              <GlowCard variant="lavender">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Status Overview</h3>
                  <div className="flex gap-2">
                    <GlowBadge
                      variant={getRiskVariant(selectedCustomer.riskLevel)}
                      className="capitalize"
                    >
                      {selectedCustomer.riskLevel} Risk
                    </GlowBadge>
                    <GlowBadge
                      variant={getStatusVariant(selectedCustomer.status)}
                      className="capitalize"
                    >
                      {selectedCustomer.status.replace("-", " ")}
                    </GlowBadge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Treatment Stage",
                      value: selectedCustomer.treatmentStage.replace("-", " "),
                    },
                    {
                      label: "Assigned Staff",
                      value: selectedCustomer.assignedStaff,
                    },
                    {
                      label: "AI Confidence",
                      value: `${selectedCustomer.aiConfidence}%`,
                    },
                    {
                      label: "Compliance Rate",
                      value: `${selectedCustomer.complianceRate}%`,
                    },
                  ].map((m) => (
                    <div key={m.label} className="rounded bg-white p-3">
                      <p className="text-muted-foreground mb-1 text-xs">
                        {m.label}
                      </p>
                      <p className="font-semibold capitalize">{m.value}</p>
                    </div>
                  ))}
                </div>
              </GlowCard>
              <GlowCard variant="sky">
                <h3 className="mb-3 font-semibold">Latest Skin Analysis</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded bg-white p-3 text-center">
                    <p className="text-muted-foreground mb-1 text-xs">Acne</p>
                    <p className="font-bold text-purple-600">
                      {selectedCustomer.acneSeverity}
                    </p>
                  </div>
                  <div className="rounded bg-white p-3 text-center">
                    <p className="text-muted-foreground mb-1 text-xs">
                      Oiliness
                    </p>
                    <p className="font-bold text-blue-600">
                      {selectedCustomer.oiliness}
                    </p>
                  </div>
                  <div className="rounded bg-white p-3 text-center">
                    <p className="text-muted-foreground mb-1 text-xs">
                      Last Scan
                    </p>
                    <p className="text-sm font-semibold">
                      {selectedCustomer.lastScanDate}
                    </p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard variant="yellow">
                <h3 className="mb-3 font-semibold">Primary Concerns</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCustomer.concerns.map((concern) => (
                    <GlowBadge key={concern} variant="warning">
                      {concern}
                    </GlowBadge>
                  ))}
                </div>
              </GlowCard>
              <GlowCard variant="mint">
                <h3 className="mb-4 font-semibold">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <GlowButton
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction("Follow-up", selectedCustomer)}
                  >
                    Follow-up
                  </GlowButton>
                  <GlowButton
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleAction("Request Scan", selectedCustomer)
                    }
                  >
                    Request Scan
                  </GlowButton>
                  <GlowButton
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction("Add Note", selectedCustomer)}
                  >
                    Add Note
                  </GlowButton>
                  <GlowButton
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleAction("Send Reminder", selectedCustomer)
                    }
                  >
                    Send Reminder
                  </GlowButton>
                  <GlowButton
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction("Escalate", selectedCustomer)}
                  >
                    Escalate
                  </GlowButton>
                  <Link
                    href={`/staff/customers/${selectedCustomer.id}` as Route}
                    className="block"
                  >
                    <GlowButton size="sm" className="w-full">
                      Full Details
                    </GlowButton>
                  </Link>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
