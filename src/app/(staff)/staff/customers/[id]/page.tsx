"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { useGlowToast } from "@/components/glow/toast";
import { mockUser, mockAIResult } from "@/lib/mock-data";
import {
  ArrowLeft,
  Sparkles,
  ShoppingCart,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Flag,
  RefreshCw,
  Bell,
  FileText,
} from "lucide-react";

const customer = {
  ...mockUser,
  joinedDate: "April 15, 2026",
  lastActive: "2 hours ago",
  totalOrders: 3,
  totalSpent: 1485000,
  riskLevel: "medium",
  tags: ["Responsive", "High Value"],
};

const activityTimeline = [
  {
    type: "order",
    title: "Order delivered",
    desc: "GS-1284 completed successfully",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    type: "checkin",
    title: "Routine check-in",
    desc: "Reported improved skin condition",
    time: "1 day ago",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    type: "consultation",
    title: "Staff consultation",
    desc: "Product recommendations provided",
    time: "6 days ago",
    icon: MessageSquare,
    color: "text-purple-600",
  },
  {
    type: "assessment",
    title: "Skin assessment",
    desc: "AI confidence: 86%",
    time: "3 days ago",
    icon: Sparkles,
    color: "text-primary",
  },
];

const scanHistory = [
  {
    date: "May 16, 2026",
    confidence: 86,
    mainConcern: "Acne, Oiliness",
    thumbnail:
      "https://images.unsplash.com/photo-1614287270006-e9a0c6d93c91?w=100&h=100&fit=crop",
    improvement: "+12%",
  },
  {
    date: "April 18, 2026",
    confidence: 82,
    mainConcern: "Acne, Oiliness",
    thumbnail:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=100&h=100&fit=crop",
    improvement: "baseline",
  },
];

export default function CustomerDetailPage() {
  const { showToast } = useGlowToast();
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setTimeout(() => {
      showToast(`${action} action completed!`, "success");
      setSelectedAction(null);
    }, 1000);
  };

  const handleAddNote = () => {
    if (noteText.trim()) {
      showToast("Note added successfully", "success");
      setNoteText("");
      setShowNoteForm(false);
    }
  };

  return (
    <div>
      <Link
        href={"/staff" as Route}
        className="text-primary mb-6 inline-flex items-center gap-2 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-3xl font-bold">{customer.name}</h1>
              <GlowBadge variant="success">Active</GlowBadge>
              {customer.riskLevel === "high" && (
                <GlowBadge variant="danger">High Risk</GlowBadge>
              )}
            </div>
            <p className="text-muted-foreground mb-2">{customer.email}</p>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag) => (
                <GlowBadge key={tag} variant="info" className="text-xs">
                  {tag}
                </GlowBadge>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <GlowButton
                size="sm"
                variant="outline"
                onClick={() => handleAction("Approve Recommendation")}
                disabled={selectedAction !== null}
              >
                <CheckCircle className="mr-1 h-4 w-4" />
                Approve
              </GlowButton>
              <GlowButton
                size="sm"
                variant="outline"
                onClick={() => handleAction("Escalate to Expert")}
                disabled={selectedAction !== null}
              >
                <ArrowUpRight className="mr-1 h-4 w-4" />
                Escalate
              </GlowButton>
            </div>
            <div className="flex gap-2">
              <GlowButton
                size="sm"
                variant="outline"
                onClick={() => handleAction("Request Re-scan")}
                disabled={selectedAction !== null}
              >
                <RefreshCw className="mr-1 h-4 w-4" />
                Re-scan
              </GlowButton>
              <GlowButton
                size="sm"
                variant="outline"
                onClick={() => handleAction("Send Reminder")}
                disabled={selectedAction !== null}
              >
                <Bell className="mr-1 h-4 w-4" />
                Remind
              </GlowButton>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground flex flex-wrap gap-6 text-sm">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Joined: {customer.joinedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Last active: {customer.lastActive}
          </span>
          <span>{customer.location}</span>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <GlowCard variant="sky">
          <p className="text-muted-foreground mb-1 text-sm">Total Orders</p>
          <p className="text-2xl font-bold">{customer.totalOrders}</p>
        </GlowCard>
        <GlowCard variant="mint">
          <p className="text-muted-foreground mb-1 text-sm">Total Spent</p>
          <p className="text-2xl font-bold">
            {(customer.totalSpent / 1000).toFixed(0)}K VNĐ
          </p>
        </GlowCard>
        <GlowCard variant="lavender">
          <p className="text-muted-foreground mb-1 text-sm">AI Confidence</p>
          <p className="text-2xl font-bold">{mockAIResult.confidence}%</p>
        </GlowCard>
        <GlowCard variant="peach">
          <p className="text-muted-foreground mb-1 text-sm">Routine Active</p>
          <p className="text-2xl font-bold">Yes</p>
        </GlowCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GlowCard>
            <h2 className="mb-4 text-xl font-semibold">Activity Timeline</h2>
            <div className="space-y-4">
              {activityTimeline.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                        <Icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                      {index < activityTimeline.length - 1 && (
                        <div className="bg-border mt-2 h-full w-0.5" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold">{activity.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {activity.desc}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlowCard>

          <GlowCard variant="lavender">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Latest Skin Assessment</h2>
              <GlowButton size="sm" variant="outline">
                <Sparkles className="mr-1 h-4 w-4" />
                View Full
              </GlowButton>
            </div>
            {customer.allergies.length > 0 && (
              <div className="mb-4 flex items-start gap-2 rounded-lg bg-yellow-50 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                <div>
                  <p className="text-sm font-semibold">Allergy Alert</p>
                  <p className="text-muted-foreground text-sm">
                    {customer.allergies.join(", ")}
                  </p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-white p-3">
                <p className="text-muted-foreground mb-1 text-xs">
                  Acne Severity
                </p>
                <p className="font-semibold capitalize">
                  {mockAIResult.acneSeverity}
                </p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-muted-foreground mb-1 text-xs">Oiliness</p>
                <p className="font-semibold capitalize">
                  {mockAIResult.oiliness}
                </p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-muted-foreground mb-1 text-xs">Hydration</p>
                <p className="font-semibold capitalize">
                  {mockAIResult.hydration}
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-white p-3">
              <p className="text-sm">
                <span className="font-semibold">Main Concerns:</span>{" "}
                {customer.concerns.map((c) => (
                  <GlowBadge key={c} variant="warning" className="ml-1 text-xs">
                    {c}
                  </GlowBadge>
                ))}
              </p>
            </div>
          </GlowCard>

          <GlowCard variant="sky">
            <h2 className="mb-4 text-xl font-semibold">
              Scan History & Progress
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {scanHistory.map((scan, index) => (
                <div key={index} className="rounded-lg bg-white p-4">
                  <div className="mb-3 flex gap-3">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={scan.thumbnail}
                        alt={scan.date}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{scan.date}</p>
                      <p className="text-muted-foreground text-sm">
                        {scan.mainConcern}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <GlowBadge variant="info" className="text-xs">
                          {scan.confidence}%
                        </GlowBadge>
                        {scan.improvement !== "baseline" && (
                          <GlowBadge variant="success" className="text-xs">
                            {scan.improvement}
                          </GlowBadge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        <div className="space-y-6">
          <GlowCard variant="mint">
            <h3 className="mb-4 font-semibold">Communication</h3>
            <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
              <div className="rounded-lg bg-white p-3">
                <div className="mb-1 flex items-start gap-2">
                  <GlowBadge variant="info" className="text-xs">
                    Staff
                  </GlowBadge>
                  <span className="text-muted-foreground text-xs">
                    May 10, 2026
                  </span>
                </div>
                <p className="text-sm">
                  Recommended CeraVe cleanser based on skin type and concerns
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 p-3">
                <div className="mb-1 flex items-start gap-2">
                  <GlowBadge className="text-xs">Customer</GlowBadge>
                  <span className="text-muted-foreground text-xs">
                    May 10, 2026
                  </span>
                </div>
                <p className="text-sm">
                  Thank you! Will try the recommended products.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <textarea
                placeholder="Type your message..."
                className="border-border min-h-[80px] w-full rounded-lg border bg-white px-3 py-2 text-sm"
                rows={3}
              />
              <div className="flex gap-2">
                <GlowButton
                  size="sm"
                  className="flex-1"
                  onClick={() => showToast("Message sent!", "success")}
                >
                  <Send className="mr-1 h-4 w-4" />
                  Send
                </GlowButton>
                <GlowButton size="sm" variant="outline">
                  Quick Reply
                </GlowButton>
              </div>
            </div>
          </GlowCard>

          <GlowCard variant="yellow">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Staff Notes</h3>
              <GlowButton
                size="sm"
                variant="ghost"
                onClick={() => setShowNoteForm(!showNoteForm)}
              >
                <FileText className="h-4 w-4" />
              </GlowButton>
            </div>
            {showNoteForm && (
              <div className="mb-4 space-y-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add internal note..."
                  className="border-border w-full rounded-lg border bg-white px-3 py-2 text-sm"
                  rows={3}
                />
                <div className="flex gap-2">
                  <GlowButton size="sm" onClick={handleAddNote}>
                    Save Note
                  </GlowButton>
                  <GlowButton
                    size="sm"
                    variant="outline"
                    onClick={() => setShowNoteForm(false)}
                  >
                    Cancel
                  </GlowButton>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <div className="rounded-lg bg-white p-3">
                <div className="mb-1 flex items-start gap-2">
                  <Flag className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                  <div className="flex-1">
                    <p className="mb-1 text-sm">
                      Customer is very responsive to recommendations
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Added May 10, 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>

          <GlowCard>
            <h3 className="mb-4 font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <GlowButton
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAction("View Routine")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                View Current Routine
              </GlowButton>
              <GlowButton
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAction("View Orders")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Order History
              </GlowButton>
              <GlowButton
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAction("Mark Resolved")}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Resolved
              </GlowButton>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
