"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { useGlowToast } from "@/components/glow/toast";
import {
  Users,
  Clock,
  AlertTriangle,
  Sparkles,
  Calendar,
  Camera,
  Send,
  MessageSquare,
  TrendingUp,
  Activity,
  Zap,
  Award,
  Brain,
  Target,
  Shield,
  Flame,
  CheckCircle,
  User,
  Save,
  Play,
  X,
} from "lucide-react";

type QueueStatus =
  | "pending"
  | "in-review"
  | "high-priority"
  | "awaiting-photos"
  | "ready-to-send"
  | "completed";
type RiskLevel = "low" | "medium" | "high" | "urgent";

interface QueueItem {
  id: number;
  customerId: number;
  customerName: string;
  customerAvatar: string;
  skinType: string;
  mainConcerns: string[];
  severityScore: number;
  aiConfidence: number;
  riskLevel: RiskLevel;
  daysWaiting: number;
  status: QueueStatus;
  assignedExpert: string;
  priority: number;
  lastScanDate: string;
  acneSeverity: string;
  oiliness: string;
  hydration: string;
  allergies: string[];
  currentProducts: string[];
  complianceRate: number;
}

const queueItems: QueueItem[] = [
  {
    id: 1,
    customerId: 1,
    customerName: "Linh Nguyen",
    customerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    skinType: "combination",
    mainConcerns: ["Acne", "Oiliness"],
    severityScore: 7.5,
    aiConfidence: 86,
    riskLevel: "high",
    daysWaiting: 2,
    status: "pending",
    assignedExpert: "You",
    priority: 1,
    lastScanDate: "May 16, 2026",
    acneSeverity: "Moderate",
    oiliness: "High",
    hydration: "Normal",
    allergies: ["Fragrance"],
    currentProducts: ["CeraVe Cleanser", "The Ordinary Niacinamide"],
    complianceRate: 85,
  },
  {
    id: 2,
    customerId: 3,
    customerName: "Hoa Le",
    customerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    skinType: "sensitive",
    mainConcerns: ["Dryness", "Irritation", "Redness"],
    severityScore: 8.2,
    aiConfidence: 68,
    riskLevel: "urgent",
    daysWaiting: 0,
    status: "high-priority",
    assignedExpert: "You",
    priority: 0,
    lastScanDate: "May 17, 2026",
    acneSeverity: "None",
    oiliness: "Very Low",
    hydration: "Very Low",
    allergies: ["Fragrance", "Alcohol"],
    currentProducts: ["La Roche-Posay Toleriane"],
    complianceRate: 45,
  },
  {
    id: 3,
    customerId: 4,
    customerName: "Thu Nguyen",
    customerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    skinType: "oily",
    mainConcerns: ["Severe Acne", "Large Pores"],
    severityScore: 8.8,
    aiConfidence: 78,
    riskLevel: "urgent",
    daysWaiting: 1,
    status: "in-review",
    assignedExpert: "Dr. Minh Anh",
    priority: 1,
    lastScanDate: "May 15, 2026",
    acneSeverity: "Severe",
    oiliness: "Very High",
    hydration: "Normal",
    allergies: [],
    currentProducts: ["Benzoyl Peroxide 5%", "Salicylic Acid Cleanser"],
    complianceRate: 70,
  },
  {
    id: 4,
    customerId: 2,
    customerName: "Minh Tran",
    customerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    skinType: "dry",
    mainConcerns: ["Dark spots", "Fine lines"],
    severityScore: 5.5,
    aiConfidence: 92,
    riskLevel: "medium",
    daysWaiting: 3,
    status: "ready-to-send",
    assignedExpert: "You",
    priority: 2,
    lastScanDate: "May 14, 2026",
    acneSeverity: "Mild",
    oiliness: "Low",
    hydration: "Low",
    allergies: [],
    currentProducts: ["Vitamin C Serum", "Hyaluronic Acid"],
    complianceRate: 95,
  },
  {
    id: 5,
    customerId: 5,
    customerName: "Anh Pham",
    customerAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    skinType: "normal",
    mainConcerns: ["Anti-aging", "Brightness"],
    severityScore: 4.0,
    aiConfidence: 94,
    riskLevel: "low",
    daysWaiting: 0,
    status: "awaiting-photos",
    assignedExpert: "You",
    priority: 3,
    lastScanDate: "May 12, 2026",
    acneSeverity: "None",
    oiliness: "Normal",
    hydration: "High",
    allergies: [],
    currentProducts: ["Retinol 0.5%", "Vitamin C", "Niacinamide"],
    complianceRate: 100,
  },
];

const queueTabs: {
  status: QueueStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { status: "pending", label: "Pending", icon: Clock },
  { status: "in-review", label: "In Review", icon: Activity },
  { status: "high-priority", label: "High Priority", icon: Flame },
  { status: "awaiting-photos", label: "Awaiting Photos", icon: Camera },
  { status: "ready-to-send", label: "Ready to Send", icon: Send },
  { status: "completed", label: "Completed", icon: CheckCircle },
];

const getRiskColor = (risk: RiskLevel) => {
  if (risk === "low") return "bg-green-100 text-green-700 border-green-300";
  if (risk === "medium") return "bg-blue-100 text-blue-700 border-blue-300";
  if (risk === "high") return "bg-yellow-100 text-yellow-700 border-yellow-300";
  return "bg-red-100 text-red-700 border-red-300";
};

const getAISuggestedIngredients = (customer: QueueItem) => {
  const suggestions: string[] = [];
  if (
    customer.mainConcerns.includes("Acne") ||
    customer.mainConcerns.includes("Severe Acne")
  )
    suggestions.push("Salicylic Acid", "Niacinamide", "Benzoyl Peroxide");
  if (customer.mainConcerns.includes("Oiliness"))
    suggestions.push("Niacinamide", "BHA");
  if (customer.mainConcerns.includes("Dryness"))
    suggestions.push("Hyaluronic Acid", "Ceramides");
  if (customer.mainConcerns.includes("Dark spots"))
    suggestions.push("Vitamin C", "Niacinamide", "AHA");
  if (
    customer.mainConcerns.includes("Fine lines") ||
    customer.mainConcerns.includes("Anti-aging")
  )
    suggestions.push("Retinol", "Peptides");
  return [...new Set(suggestions)];
};

export default function ConsultationQueuePage() {
  const { showToast } = useGlowToast();
  const [activeTab, setActiveTab] = useState<QueueStatus>("pending");
  const [selectedQueue, setSelectedQueue] = useState<QueueItem | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [treatmentNotes, setTreatmentNotes] = useState("");

  const filteredQueue = queueItems.filter((item) => item.status === activeTab);

  const handleAction = (action: string) =>
    showToast(`${action} (mock)`, "success");

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient],
    );
  };

  return (
    <div className="flex flex-col" style={{ minHeight: "80vh" }}>
      <div className="border-border flex-shrink-0 border-b bg-white px-6 py-4">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Consultation Queue</h1>
            <p className="text-muted-foreground text-sm">
              AI-assisted skincare expert operations center
            </p>
          </div>
          <div className="flex items-center gap-2">
            <GlowBadge
              variant="purple"
              className="flex items-center gap-1 px-3 py-1"
            >
              <Award className="h-4 w-4" />
              Expert Mode
            </GlowBadge>
            <GlowBadge variant="info">
              {queueItems.filter((q) => q.status !== "completed").length} active
              consultations
            </GlowBadge>
          </div>
        </div>
      </div>

      <div className="border-border flex-shrink-0 border-b bg-white px-6">
        <div className="flex gap-2 overflow-x-auto">
          {queueTabs.map((tab) => {
            const count = queueItems.filter(
              (q) => q.status === tab.status,
            ).length;
            const Icon = tab.icon;
            return (
              <button
                key={tab.status}
                onClick={() => setActiveTab(tab.status)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 whitespace-nowrap transition-all ${activeTab === tab.status ? "border-primary text-primary font-semibold" : "text-muted-foreground hover:text-foreground border-transparent"}`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                <GlowBadge
                  variant={activeTab === tab.status ? "purple" : undefined}
                  className="text-xs"
                >
                  {count}
                </GlowBadge>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-12 gap-0" style={{ minHeight: "60vh" }}>
          <div className="border-border bg-muted/30 col-span-12 overflow-y-auto border-r lg:col-span-3">
            <div className="space-y-3 p-4">
              {filteredQueue.length === 0 ? (
                <div className="py-12 text-center">
                  <Users className="text-muted-foreground mx-auto mb-3 h-12 w-12 opacity-30" />
                  <p className="text-muted-foreground text-sm">
                    No consultations in this queue
                  </p>
                </div>
              ) : (
                filteredQueue.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedQueue(item)}
                    className={`w-full rounded-lg border-2 p-4 text-left transition-all ${selectedQueue?.id === item.id ? "border-primary bg-white shadow-md" : "hover:border-primary/30 border-transparent bg-white"}`}
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.customerAvatar}
                            alt={item.customerName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div
                          className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${item.riskLevel === "urgent" ? "bg-red-600" : item.riskLevel === "high" ? "bg-yellow-600" : item.riskLevel === "medium" ? "bg-blue-600" : "bg-green-600"}`}
                        >
                          {item.priority}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">
                          {item.customerName}
                        </p>
                        <p className="text-muted-foreground text-xs capitalize">
                          {item.skinType} skin
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Severity Score
                        </span>
                        <span className="font-bold text-red-600">
                          {item.severityScore}/10
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          AI Confidence
                        </span>
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-purple-600" />
                          <span className="font-semibold">
                            {item.aiConfidence}%
                          </span>
                        </div>
                      </div>
                      <div
                        className={`rounded border px-2 py-1 text-xs font-medium capitalize ${getRiskColor(item.riskLevel)}`}
                      >
                        {item.riskLevel} Risk
                      </div>
                      {item.daysWaiting > 0 && (
                        <div className="flex items-center gap-1 text-xs text-orange-600">
                          <Clock className="h-3 w-3" />
                          Waiting {item.daysWaiting} day
                          {item.daysWaiting > 1 ? "s" : ""}
                        </div>
                      )}
                      <div className="border-border border-t pt-2">
                        <p className="text-muted-foreground mb-1 text-xs">
                          Main Concerns:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.mainConcerns.map((concern) => (
                            <span
                              key={concern}
                              className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700"
                            >
                              {concern}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="col-span-12 overflow-y-auto bg-white lg:col-span-5">
            {selectedQueue ? (
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      {selectedQueue.customerName}
                    </h2>
                    <p className="text-muted-foreground text-sm capitalize">
                      {selectedQueue.skinType} skin • Last scan:{" "}
                      {selectedQueue.lastScanDate}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedQueue(null)}
                    className="hover:bg-accent rounded p-2 lg:hidden"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <GlowCard variant="lavender">
                  <div className="mb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold">AI Skin Analysis</h3>
                    <GlowBadge variant="purple" className="text-xs">
                      {selectedQueue.aiConfidence}% confidence
                    </GlowBadge>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded bg-white p-3 text-center">
                      <p className="text-muted-foreground mb-1 text-xs">Acne</p>
                      <p className="font-bold text-purple-600">
                        {selectedQueue.acneSeverity}
                      </p>
                    </div>
                    <div className="rounded bg-white p-3 text-center">
                      <p className="text-muted-foreground mb-1 text-xs">
                        Oiliness
                      </p>
                      <p className="font-bold text-blue-600">
                        {selectedQueue.oiliness}
                      </p>
                    </div>
                    <div className="rounded bg-white p-3 text-center">
                      <p className="text-muted-foreground mb-1 text-xs">
                        Hydration
                      </p>
                      <p className="font-bold text-green-600">
                        {selectedQueue.hydration}
                      </p>
                    </div>
                  </div>
                </GlowCard>
                <GlowCard>
                  <h3 className="mb-3 font-semibold">Scan Timeline</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {["Week 0", "Week 2", "Latest"].map((label) => (
                      <div
                        key={label}
                        className="text-muted-foreground flex aspect-square items-center justify-center rounded bg-gray-200 text-xs"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </GlowCard>
                <GlowCard variant="peach">
                  <div className="mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold">Severity Heatmap</h3>
                  </div>
                  <div className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-yellow-200 via-orange-300 to-red-400">
                    <div className="text-center text-white">
                      <p className="text-3xl font-bold">
                        {selectedQueue.severityScore}
                      </p>
                      <p className="text-xs">Severity Score</p>
                    </div>
                  </div>
                </GlowCard>
                {selectedQueue.allergies.length > 0 && (
                  <GlowCard variant="yellow">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                      <div>
                        <p className="mb-2 font-semibold">Allergy Warnings</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedQueue.allergies.map((allergy) => (
                            <GlowBadge key={allergy} variant="danger">
                              {allergy}
                            </GlowBadge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                )}
                <GlowCard variant="sky">
                  <h3 className="mb-3 font-semibold">Current Routine</h3>
                  <div className="space-y-2">
                    {selectedQueue.currentProducts.map((product, i) => (
                      <div key={i} className="rounded bg-white p-2 text-sm">
                        {product}
                      </div>
                    ))}
                  </div>
                </GlowCard>
                <GlowCard variant="mint">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">Daily Compliance</h3>
                    <span className="text-2xl font-bold text-green-600">
                      {selectedQueue.complianceRate}%
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full bg-green-600 transition-all"
                      style={{ width: `${selectedQueue.complianceRate}%` }}
                    />
                  </div>
                </GlowCard>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center">
                <div>
                  <Users className="text-muted-foreground mx-auto mb-4 h-16 w-16 opacity-30" />
                  <p className="text-muted-foreground mb-2 text-lg">
                    Select a consultation from the queue
                  </p>
                  <p className="text-muted-foreground text-sm">
                    View customer analysis and build treatment plans
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-border bg-muted/30 col-span-12 overflow-y-auto border-l lg:col-span-4">
            {selectedQueue ? (
              <div className="space-y-4 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Zap className="text-primary h-5 w-5" />
                  <h3 className="font-semibold">Expert Actions</h3>
                </div>
                <GlowCard variant="lavender">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <p className="text-sm font-semibold">
                      AI Suggested Ingredients
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getAISuggestedIngredients(selectedQueue).map(
                      (ingredient) => (
                        <button
                          key={ingredient}
                          onClick={() => toggleIngredient(ingredient)}
                          className={`rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-all ${selectedIngredients.includes(ingredient) ? "border-primary text-primary bg-white" : "border-border hover:border-primary/50 bg-white"}`}
                        >
                          {ingredient}
                        </button>
                      ),
                    )}
                  </div>
                </GlowCard>
                <GlowCard variant="mint">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm font-semibold">
                      Predicted Improvement
                    </p>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-4xl font-bold text-green-600">+62%</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      in 8 weeks with suggested routine
                    </p>
                  </div>
                </GlowCard>
                <GlowCard variant="yellow">
                  <div className="mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-yellow-600" />
                    <p className="text-sm font-semibold">Risk Assessment</p>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded bg-white p-2">
                      <span>Purging Risk</span>
                      <GlowBadge variant="warning" className="text-xs">
                        Medium
                      </GlowBadge>
                    </div>
                    <div className="flex items-center justify-between rounded bg-white p-2">
                      <span>Irritation Risk</span>
                      <GlowBadge variant="success" className="text-xs">
                        Low
                      </GlowBadge>
                    </div>
                  </div>
                </GlowCard>
                <GlowCard>
                  <label className="mb-2 block text-sm font-semibold">
                    Treatment Notes
                  </label>
                  <textarea
                    className="border-border w-full rounded border bg-white px-3 py-2 text-sm"
                    rows={4}
                    placeholder="Add treatment guidance, usage instructions..."
                    value={treatmentNotes}
                    onChange={(e) => setTreatmentNotes(e.target.value)}
                  />
                </GlowCard>
                <div className="space-y-2">
                  <Link
                    href={"/expert/patient-timeline" as Route}
                    className="block"
                  >
                    <GlowButton className="w-full" size="sm">
                      <User className="mr-2 h-4 w-4" />
                      View Patient Timeline
                    </GlowButton>
                  </Link>
                  <Link
                    href={"/expert/treatment-plan" as Route}
                    className="block"
                  >
                    <GlowButton variant="outline" className="w-full" size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Build Full Treatment
                    </GlowButton>
                  </Link>
                  <GlowButton
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAction("Request More Photos")}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Request More Photos
                  </GlowButton>
                  <GlowButton
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAction("Send Quick Treatment")}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Quick Treatment
                  </GlowButton>
                  <GlowButton
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAction("Collaborate with Staff")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Collaborate with Staff
                  </GlowButton>
                  <GlowButton
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAction("Mark Urgent")}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Mark Urgent
                  </GlowButton>
                  <GlowButton
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAction("Schedule Follow-up")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Follow-up
                  </GlowButton>
                  <GlowButton
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAction("Save Draft")}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Consultation Draft
                  </GlowButton>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center">
                <div>
                  <Zap className="text-muted-foreground mx-auto mb-3 h-12 w-12 opacity-30" />
                  <p className="text-muted-foreground text-sm">
                    Select a customer to access expert tools
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
