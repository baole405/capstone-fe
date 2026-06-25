import Link from "next/link";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { activeIngredients } from "@/lib/mock-data";
import {
  Calendar,
  Users,
  TrendingUp,
  Award,
  Clock,
  Star,
  BarChart3,
  Package,
  Activity,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const consultationQueue = [
  {
    id: 1,
    name: "Linh Nguyen",
    concern: "Acne, Oiliness",
    time: "2:00 PM",
    status: "pending",
    priority: "high",
    aiConfidence: 86,
  },
  {
    id: 2,
    name: "Hoa Tran",
    concern: "Dark spots, Fine lines",
    time: "4:00 PM",
    status: "confirmed",
    priority: "medium",
    aiConfidence: 82,
  },
];

const activePatients = [
  {
    id: 1,
    name: "Linh Nguyen",
    treatmentDay: 31,
    phase: "Active Treatment",
    complianceRate: 85,
    needsReview: false,
    concern: "Acne + Oiliness",
    lastCheckIn: "2 hours ago",
  },
  {
    id: 3,
    name: "Hoa Le",
    treatmentDay: 14,
    phase: "Initial Assessment",
    complianceRate: 45,
    needsReview: true,
    concern: "Severe dryness",
    lastCheckIn: "1 day ago",
  },
  {
    id: 2,
    name: "Minh Tran",
    treatmentDay: 58,
    phase: "Maintenance",
    complianceRate: 95,
    needsReview: false,
    concern: "Dark spots",
    lastCheckIn: "3 hours ago",
  },
  {
    id: 4,
    name: "Thu Nguyen",
    treatmentDay: 7,
    phase: "Initial Assessment",
    complianceRate: 70,
    needsReview: false,
    concern: "Severe acne",
    lastCheckIn: "5 hours ago",
  },
  {
    id: 5,
    name: "Anh Pham",
    treatmentDay: 89,
    phase: "Maintenance",
    complianceRate: 100,
    needsReview: false,
    concern: "Anti-aging",
    lastCheckIn: "1 hour ago",
  },
];

const topProducts = [
  { name: "CeraVe Blemish Control", successRate: 94, prescriptions: 45 },
  { name: "La Roche-Posay Effaclar", successRate: 91, prescriptions: 38 },
  { name: "The Ordinary Niacinamide", successRate: 88, prescriptions: 52 },
];

const commonIssues = [
  { issue: "Acne (moderate-high)", count: 34, trend: "+12%" },
  { issue: "Oiliness control", count: 28, trend: "+8%" },
  { issue: "Dark spots reduction", count: 19, trend: "-5%" },
];

const successStories = [
  {
    name: "Linh N.",
    desc: "Acne + Oiliness treatment",
    improvement: "72% improvement",
    before:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=200&fit=crop",
    after:
      "https://images.unsplash.com/photo-1614287270006-e9a0c6d93c91?w=200&h=200&fit=crop",
    weeks: 8,
  },
  {
    name: "Minh T.",
    desc: "Dark spots reduction",
    improvement: "85% improvement",
    before:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=200&fit=crop",
    after:
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=200&h=200&fit=crop",
    weeks: 10,
  },
  {
    name: "Hoa L.",
    desc: "Fine lines + Hydration",
    improvement: "68% improvement",
    before:
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=200&h=200&fit=crop",
    after:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop",
    weeks: 12,
  },
];

export default function ExpertDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Expert Dashboard</h1>
            <p className="text-muted-foreground">
              Dr. Minh Anh • Certified Skincare Specialist
            </p>
          </div>
          <GlowBadge
            variant="purple"
            className="flex items-center gap-1 px-3 py-1"
          >
            <Award className="h-4 w-4" />
            Expert Level
          </GlowBadge>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <GlowCard variant="lavender">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-muted-foreground text-sm">{"Today's Queue"}</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard variant="mint">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-muted-foreground text-sm">Active Patients</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard variant="sky">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-muted-foreground text-sm">Success Rate</p>
              <p className="text-2xl font-bold">91%</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard variant="peach">
          <div className="flex items-center gap-3">
            <Star className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-muted-foreground text-sm">Avg Rating</p>
              <p className="text-2xl font-bold">4.8</p>
            </div>
          </div>
        </GlowCard>
      </div>

      <GlowCard className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {"Today's Consultation Queue"}
          </h3>
          <GlowBadge variant="info">
            {consultationQueue.length} scheduled
          </GlowBadge>
        </div>
        <div className="space-y-3">
          {consultationQueue.map((consultation) => (
            <div
              key={consultation.id}
              className="border-primary rounded-lg border-l-4 bg-gradient-to-r from-purple-50 to-white p-4"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-lg font-semibold">{consultation.name}</p>
                    {consultation.priority === "high" && (
                      <GlowBadge variant="danger" className="text-xs">
                        High Priority
                      </GlowBadge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2 text-sm">
                    {consultation.concern}
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {consultation.time}
                    </span>
                    <GlowBadge variant="info" className="text-xs">
                      AI: {consultation.aiConfidence}%
                    </GlowBadge>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <GlowBadge
                    variant={
                      consultation.status === "confirmed"
                        ? "success"
                        : "warning"
                    }
                  >
                    {consultation.status}
                  </GlowBadge>
                  <Link href={"/expert/treatment-plan" as Route}>
                    <GlowButton size="sm" className="w-full">
                      <Sparkles className="mr-1 h-4 w-4" />
                      Create Plan
                    </GlowButton>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlowCard>

      <GlowCard className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-primary h-5 w-5" />
            <h3 className="text-xl font-semibold">My Active Patients</h3>
          </div>
          <GlowBadge variant="info">{activePatients.length} patients</GlowBadge>
        </div>
        <div className="space-y-2">
          {activePatients.map((patient) => (
            <Link key={patient.id} href={"/expert/patient-timeline" as Route}>
              <div className="bg-muted hover:bg-accent hover:border-primary rounded-lg border border-transparent p-4 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <p className="font-semibold">{patient.name}</p>
                      {patient.needsReview && (
                        <GlowBadge
                          variant="danger"
                          className="flex items-center gap-1 text-xs"
                        >
                          <AlertCircle className="h-3 w-3" />
                          Needs Review
                        </GlowBadge>
                      )}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                      <span>{patient.concern}</span>
                      <span>•</span>
                      <span>
                        Day {patient.treatmentDay} • {patient.phase}
                      </span>
                      <span>•</span>
                      <span className="text-xs">
                        Last check-in: {patient.lastCheckIn}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GlowBadge
                      variant={
                        patient.complianceRate >= 80
                          ? "success"
                          : patient.complianceRate >= 60
                            ? "warning"
                            : "danger"
                      }
                      className="text-xs"
                    >
                      {patient.complianceRate}% compliance
                    </GlowBadge>
                    <ArrowRight className="text-muted-foreground h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </GlowCard>

      <div className="grid gap-6 md:grid-cols-2">
        <GlowCard variant="sky">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Common Skin Issues (This Month)</h3>
          </div>
          <div className="space-y-3">
            {commonIssues.map((issue, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white p-3"
              >
                <div>
                  <p className="font-medium">{issue.issue}</p>
                  <p className="text-muted-foreground text-sm">
                    {issue.count} patients
                  </p>
                </div>
                <GlowBadge
                  variant={issue.trend.startsWith("+") ? "warning" : "success"}
                >
                  {issue.trend}
                </GlowBadge>
              </div>
            ))}
          </div>
        </GlowCard>

        <GlowCard variant="mint">
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Top Performing Products</h3>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="rounded-lg bg-white p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-medium">{product.name}</p>
                  <GlowBadge variant="success">
                    {product.successRate}%
                  </GlowBadge>
                </div>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <span>{product.prescriptions} prescriptions</span>
                  <div className="bg-secondary h-2 flex-1 overflow-hidden rounded-full">
                    <div
                      className="h-full bg-green-600"
                      style={{ width: `${product.successRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlowCard>
      </div>

      <GlowCard variant="peach" className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Recent Success Stories</h3>
          </div>
          <GlowBadge variant="success">92% improvement rate</GlowBadge>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {successStories.map((story) => (
            <div key={story.name} className="rounded-lg bg-white p-4">
              <div className="mb-2">
                <p className="text-muted-foreground mb-1 text-xs">
                  Before (Week 0)
                </p>
                <div className="h-32 w-full overflow-hidden rounded bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={story.before}
                    alt="Before"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="mb-3">
                <p className="text-muted-foreground mb-1 text-xs">
                  After (Week {story.weeks})
                </p>
                <div className="h-32 w-full overflow-hidden rounded bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={story.after}
                    alt="After"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="border-border border-t pt-3">
                <p className="mb-1 text-sm font-semibold">{story.name}</p>
                <p className="text-muted-foreground mb-2 text-xs">
                  {story.desc}
                </p>
                <GlowBadge variant="success" className="text-xs">
                  {story.improvement}
                </GlowBadge>
              </div>
            </div>
          ))}
        </div>
      </GlowCard>

      <GlowCard variant="lavender" className="mt-6">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-6 w-6 flex-shrink-0 text-purple-600" />
          <div className="flex-1">
            <h3 className="mb-1 font-semibold">
              AI-Assisted Treatment Planning
            </h3>
            <p className="text-muted-foreground mb-3 text-sm">
              Select active ingredients first, then let AI intelligently map to
              available products with compatibility checks
            </p>
            <div className="rounded-lg bg-white p-4">
              <p className="mb-3 text-sm font-medium">
                Available Active Ingredients:
              </p>
              <div className="flex flex-wrap gap-2">
                {activeIngredients.slice(0, 6).map((ingredient) => (
                  <GlowBadge
                    key={ingredient}
                    variant="purple"
                    className="text-xs"
                  >
                    {ingredient}
                  </GlowBadge>
                ))}
                <GlowBadge className="text-xs">
                  +{activeIngredients.length - 6} more
                </GlowBadge>
              </div>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
