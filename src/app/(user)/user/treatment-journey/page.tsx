"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import {
  Calendar,
  Stethoscope,
  TrendingUp,
  Award,
  Camera,
  Package,
  CheckCircle,
  Sparkles,
  Heart,
  Activity,
  Target,
  Flame,
  User,
  MapPin,
  RefreshCw,
  MessageSquare,
} from "lucide-react";

type EventType =
  | "consultation"
  | "routine-update"
  | "progress-photo"
  | "milestone"
  | "check-in"
  | "product-change";

interface TimelineEvent {
  id: number;
  date: string;
  type: EventType;
  title: string;
  description: string;
  expert?: string;
  images?: string[];
  metrics?: {
    acne?: string;
    oiliness?: string;
    hydration?: string;
    satisfaction?: number;
  };
}

const treatmentPhases = [
  {
    id: 0,
    name: "Initial Assessment",
    startDate: "April 1, 2026",
    endDate: "April 15, 2026",
    status: "completed" as const,
    expert: "Dr. Lan Nguyen",
    clinic: "Derma Clinic - District 1",
    goals: [
      "Complete skin assessment",
      "Identify concerns",
      "Set treatment goals",
    ],
    achievements: [
      "AI scan completed",
      "Allergy testing done",
      "Baseline established",
    ],
  },
  {
    id: 1,
    name: "Active Treatment - Phase 1",
    startDate: "April 16, 2026",
    endDate: "July 16, 2026",
    status: "active" as const,
    expert: "Dr. Minh Anh",
    clinic: "Derma Clinic - District 1",
    goals: ["Reduce acne 50%", "Control oiliness", "Improve hydration"],
    achievements: ["Week 4: Acne reduced 20%", "Week 8: Oiliness controlled"],
  },
  {
    id: 2,
    name: "Maintenance Phase",
    startDate: "July 17, 2026",
    endDate: "October 17, 2026",
    status: "upcoming" as const,
    expert: "Dr. Minh Anh",
    clinic: "Derma Clinic - District 1",
    goals: ["Maintain improvements", "Prevent recurrence", "Refine routine"],
  },
];

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "May 17, 2026",
    type: "check-in",
    title: "Daily Check-in",
    description:
      "Completed morning and evening routine. Skin feeling better today.",
    metrics: { satisfaction: 4 },
  },
  {
    id: 2,
    date: "May 16, 2026",
    type: "progress-photo",
    title: "Week 4 Progress Photo",
    description: "Monthly progress documentation",
    images: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop",
    ],
    metrics: {
      acne: "Moderate → Mild",
      oiliness: "High → Normal",
      hydration: "Normal",
    },
  },
  {
    id: 3,
    date: "May 14, 2026",
    type: "consultation",
    title: "Follow-up Consultation",
    description:
      "Dr. Minh Anh reviewed progress. Treatment showing good results. Continue current routine.",
    expert: "Dr. Minh Anh",
  },
  {
    id: 4,
    date: "May 10, 2026",
    type: "routine-update",
    title: "Routine Adjustment",
    description:
      "Added Niacinamide serum to evening routine. Reduced BHA frequency to 3x/week.",
    expert: "Dr. Minh Anh",
  },
  {
    id: 5,
    date: "May 5, 2026",
    type: "milestone",
    title: "Milestone: 20% Acne Reduction",
    description: "AI analysis shows significant improvement in acne severity",
    metrics: { acne: "Moderate → Mild" },
  },
  {
    id: 6,
    date: "April 28, 2026",
    type: "product-change",
    title: "New Product Added",
    description: "Started using CeraVe Moisturizing Cream for better hydration",
  },
  {
    id: 7,
    date: "April 16, 2026",
    type: "consultation",
    title: "Treatment Plan Created",
    description:
      "Dr. Minh Anh created 4-month treatment roadmap focusing on acne and oiliness control",
    expert: "Dr. Minh Anh",
  },
  {
    id: 8,
    date: "April 1, 2026",
    type: "consultation",
    title: "Initial Assessment",
    description:
      "First consultation with Dr. Lan Nguyen. Baseline skin analysis completed.",
    expert: "Dr. Lan Nguyen",
  },
];

const getEventIcon = (type: EventType) => {
  switch (type) {
    case "consultation":
      return Stethoscope;
    case "routine-update":
      return Activity;
    case "progress-photo":
      return Camera;
    case "milestone":
      return Award;
    case "check-in":
      return CheckCircle;
    case "product-change":
      return Package;
    default:
      return Calendar;
  }
};

const getEventBg = (type: EventType) => {
  switch (type) {
    case "consultation":
      return "bg-purple-600";
    case "routine-update":
      return "bg-blue-600";
    case "progress-photo":
      return "bg-green-600";
    case "milestone":
      return "bg-yellow-600";
    case "product-change":
      return "bg-orange-600";
    default:
      return "bg-gray-600";
  }
};

const getCardVariant = (type: EventType) => {
  switch (type) {
    case "consultation":
      return "lavender" as const;
    case "routine-update":
      return "sky" as const;
    case "progress-photo":
      return "mint" as const;
    case "milestone":
      return "yellow" as const;
    case "product-change":
      return "peach" as const;
    default:
      return undefined;
  }
};

export default function TreatmentJourneyPage() {
  const [viewMode, setViewMode] = useState<"timeline" | "progress" | "phases">(
    "timeline",
  );

  const currentPhase = treatmentPhases.find((p) => p.status === "active");
  const completedPhases = treatmentPhases.filter(
    (p) => p.status === "completed",
  );
  const upcomingPhases = treatmentPhases.filter((p) => p.status === "upcoming");

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">My Treatment Journey</h1>
            <p className="text-muted-foreground">
              Long-term skincare treatment tracking and progress
            </p>
          </div>
          <GlowBadge variant="purple">
            <Activity className="mr-2 inline h-4 w-4" />
            Day 31 of Treatment
          </GlowBadge>
        </div>
      </div>

      {currentPhase && (
        <GlowCard variant="lavender" className="mb-8">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-purple-600">
                <Flame className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="mb-1 text-xl font-bold">{currentPhase.name}</h2>
                <p className="text-muted-foreground mb-2 text-sm">
                  {currentPhase.startDate} - {currentPhase.endDate}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-purple-600" />
                    <span>{currentPhase.expert}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <span>{currentPhase.clinic}</span>
                  </div>
                </div>
              </div>
            </div>
            <GlowBadge variant="success">Active</GlowBadge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Target className="h-4 w-4 text-purple-600" />
                Treatment Goals
              </p>
              <ul className="space-y-1 text-sm">
                {currentPhase.goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-white p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Award className="h-4 w-4 text-yellow-600" />
                Achievements So Far
              </p>
              <ul className="space-y-1 text-sm">
                {currentPhase.achievements?.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link href={"/user/clinic-transfer" as Route}>
              <GlowButton size="sm" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Transfer to New Clinic
              </GlowButton>
            </Link>
            <GlowButton size="sm" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Expert
            </GlowButton>
            <GlowButton size="sm" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Follow-up
            </GlowButton>
          </div>
        </GlowCard>
      )}

      <div className="mb-6 flex gap-2 overflow-x-auto">
        {(["timeline", "progress", "phases"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`rounded-lg px-4 py-2 whitespace-nowrap capitalize transition-all ${viewMode === mode ? "bg-primary text-white" : "bg-muted hover:bg-accent"}`}
          >
            {mode === "timeline" && (
              <Activity className="mr-2 inline h-4 w-4" />
            )}
            {mode === "progress" && (
              <TrendingUp className="mr-2 inline h-4 w-4" />
            )}
            {mode === "phases" && <Calendar className="mr-2 inline h-4 w-4" />}
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {viewMode === "timeline" && (
        <div className="space-y-4">
          {timelineEvents.map((event) => {
            const Icon = getEventIcon(event.type);
            const variant = getCardVariant(event.type);
            return (
              <GlowCard key={event.id} variant={variant}>
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${getEventBg(event.type)}`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 font-semibold">{event.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {event.description}
                        </p>
                        {event.expert && (
                          <p className="text-muted-foreground mt-1 text-xs">
                            <User className="mr-1 inline h-3 w-3" />
                            {event.expert}
                          </p>
                        )}
                      </div>
                      <span className="text-muted-foreground ml-4 text-xs whitespace-nowrap">
                        {event.date}
                      </span>
                    </div>
                    {event.metrics && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {event.metrics.acne && (
                          <GlowBadge variant="info" className="text-xs">
                            Acne: {event.metrics.acne}
                          </GlowBadge>
                        )}
                        {event.metrics.oiliness && (
                          <GlowBadge variant="info" className="text-xs">
                            Oiliness: {event.metrics.oiliness}
                          </GlowBadge>
                        )}
                        {event.metrics.hydration && (
                          <GlowBadge variant="info" className="text-xs">
                            Hydration: {event.metrics.hydration}
                          </GlowBadge>
                        )}
                        {event.metrics.satisfaction && (
                          <GlowBadge variant="success" className="text-xs">
                            Satisfaction: {event.metrics.satisfaction}/5
                          </GlowBadge>
                        )}
                      </div>
                    )}
                    {event.images && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {event.images.map((img, i) => (
                          <div
                            key={i}
                            className="aspect-square overflow-hidden rounded bg-gray-200"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img}
                              alt={`Progress ${i + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      )}

      {viewMode === "progress" && (
        <div className="grid gap-6 md:grid-cols-2">
          <GlowCard variant="mint">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Skin Progress
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "Acne Improvement",
                  pct: 70,
                  value: "+35%",
                  color: "bg-green-600",
                },
                {
                  label: "Oiliness Control",
                  pct: 80,
                  value: "+40%",
                  color: "bg-blue-600",
                },
                {
                  label: "Hydration",
                  pct: 45,
                  value: "+15%",
                  color: "bg-purple-600",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm">{item.label}</span>
                    <span
                      className={`font-bold ${item.color.replace("bg-", "text-")}`}
                    >
                      {item.value}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white">
                    <div
                      className={`h-full ${item.color}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard variant="sky">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Activity className="h-5 w-5 text-blue-600" />
              Routine Adherence
            </h3>
            <div className="py-6 text-center">
              <div className="mb-2 text-5xl font-bold text-blue-600">85%</div>
              <p className="text-muted-foreground text-sm">
                Routine completion rate
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                26/31 days completed
              </p>
            </div>
          </GlowCard>

          <GlowCard variant="yellow">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Heart className="h-5 w-5 text-yellow-600" />
              Satisfaction Score
            </h3>
            <div className="py-6 text-center">
              <div className="mb-2 text-5xl font-bold text-yellow-600">
                4.2/5
              </div>
              <p className="text-muted-foreground text-sm">
                Average daily satisfaction
              </p>
            </div>
          </GlowCard>

          <GlowCard variant="lavender">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Package className="h-5 w-5 text-purple-600" />
              Product Usage
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded bg-white p-2">
                <span className="text-sm">CeraVe Cleanser</span>
                <GlowBadge variant="warning" className="text-xs">
                  Running low
                </GlowBadge>
              </div>
              <div className="flex items-center justify-between rounded bg-white p-2">
                <span className="text-sm">Niacinamide Serum</span>
                <GlowBadge variant="success" className="text-xs">
                  Plenty left
                </GlowBadge>
              </div>
            </div>
          </GlowCard>
        </div>
      )}

      {viewMode === "phases" && (
        <div className="space-y-6">
          {completedPhases.length > 0 && (
            <div>
              <h3 className="text-muted-foreground mb-3 font-semibold">
                Completed Phases
              </h3>
              <div className="space-y-3">
                {completedPhases.map((phase) => (
                  <GlowCard key={phase.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="mb-1 font-semibold">{phase.name}</h4>
                        <p className="text-muted-foreground mb-2 text-sm">
                          {phase.startDate} - {phase.endDate}
                        </p>
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
                          <span>{phase.expert}</span>
                          <span>•</span>
                          <span>{phase.clinic}</span>
                        </div>
                      </div>
                      <GlowBadge variant="success">Completed</GlowBadge>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          )}

          {currentPhase && (
            <div>
              <h3 className="mb-3 font-semibold">Active Phase</h3>
              <GlowCard variant="lavender">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="mb-1 font-semibold">{currentPhase.name}</h4>
                    <p className="text-muted-foreground mb-2 text-sm">
                      {currentPhase.startDate} - {currentPhase.endDate}
                    </p>
                    <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs">
                      <span>{currentPhase.expert}</span>
                      <span>•</span>
                      <span>{currentPhase.clinic}</span>
                    </div>
                    <div className="space-y-1">
                      {currentPhase.goals.map((goal, i) => (
                        <p key={i} className="text-sm">
                          <CheckCircle className="mr-1 inline h-3 w-3 text-purple-600" />
                          {goal}
                        </p>
                      ))}
                    </div>
                  </div>
                  <GlowBadge variant="purple">Active</GlowBadge>
                </div>
              </GlowCard>
            </div>
          )}

          {upcomingPhases.length > 0 && (
            <div>
              <h3 className="text-muted-foreground mb-3 font-semibold">
                Upcoming Phases
              </h3>
              <div className="space-y-3">
                {upcomingPhases.map((phase) => (
                  <GlowCard key={phase.id} className="bg-muted">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="mb-1 font-semibold">{phase.name}</h4>
                        <p className="text-muted-foreground mb-2 text-sm">
                          {phase.startDate} - {phase.endDate}
                        </p>
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
                          <span>{phase.expert}</span>
                          <span>•</span>
                          <span>{phase.clinic}</span>
                        </div>
                      </div>
                      <GlowBadge>Upcoming</GlowBadge>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
