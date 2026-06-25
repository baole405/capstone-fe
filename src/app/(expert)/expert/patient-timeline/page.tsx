"use client";

import { useState } from "react";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { useGlowToast } from "@/components/glow/toast";
import {
  canExpertAccessPatient,
  getRemainingAccessDays,
} from "@/lib/treatment-types";
import type { TreatmentRelationship } from "@/lib/treatment-types";
import {
  Calendar,
  TrendingUp,
  Activity,
  Camera,
  MessageSquare,
  FileText,
  AlertTriangle,
  Clock,
  Heart,
  Sun,
  Moon,
  ArrowLeft,
  Edit,
  Send,
  Plus,
  BarChart3,
} from "lucide-react";

interface TreatmentNote {
  id: number;
  date: string;
  type: "consultation" | "adjustment" | "observation" | "milestone";
  title: string;
  content: string;
  privateNote: boolean;
}

const treatmentRelationship: TreatmentRelationship = {
  id: 1,
  userId: 1,
  expertId: 1,
  clinicId: 1,
  startDate: "2026-04-15",
  endDate: "2026-08-15",
  status: "active",
  accessGranted: true,
  accessExpiry: "2026-08-15",
};

const patient = {
  id: 1,
  name: "Linh Nguyen",
  age: 28,
  skinType: "combination",
  concerns: ["Acne", "Oiliness"],
  allergies: ["Fragrance"],
  treatmentStartDate: "April 16, 2026",
  treatmentEndDate: "July 16, 2026",
  treatmentStatus: "active" as const,
  currentPhase: "Active Treatment - Phase 1",
  clinic: "Derma Clinic - District 1",
  complianceRate: 85,
  lastCheckIn: "2 hours ago",
  satisfactionAvg: 4.2,
};

const treatmentNotes: TreatmentNote[] = [
  {
    id: 1,
    date: "May 17, 2026",
    type: "observation",
    title: "Week 4 Review",
    content:
      "Patient showing good progress. Acne reduced approximately 20%. Oiliness under control. No adverse reactions to current products. Continue with current routine.",
    privateNote: true,
  },
  {
    id: 2,
    date: "May 14, 2026",
    type: "consultation",
    title: "Follow-up Consultation",
    content:
      "Discussed progress with patient. Patient reports improved confidence and satisfaction with results. Addressed concerns about purging phase.",
    privateNote: false,
  },
  {
    id: 3,
    date: "May 10, 2026",
    type: "adjustment",
    title: "Routine Adjustment",
    content:
      "Added Niacinamide 10% serum to evening routine. Reduced BHA toner from daily to 3x per week to prevent over-exfoliation.",
    privateNote: false,
  },
  {
    id: 4,
    date: "May 5, 2026",
    type: "milestone",
    title: "First Milestone Achieved",
    content:
      "AI analysis confirms 20% reduction in acne severity. Patient adherence to routine has been excellent at 85%. Skin barrier appears healthy.",
    privateNote: false,
  },
];

const weeklyProgress = [
  { week: "Week 1", acne: 85, oiliness: 90, hydration: 55, satisfaction: 3.5 },
  { week: "Week 2", acne: 75, oiliness: 80, hydration: 60, satisfaction: 3.8 },
  { week: "Week 3", acne: 65, oiliness: 70, hydration: 65, satisfaction: 4.0 },
  { week: "Week 4", acne: 55, oiliness: 60, hydration: 70, satisfaction: 4.2 },
];

const checkInHistory = [
  {
    date: "May 17",
    morning: true,
    evening: true,
    satisfaction: 4,
    notes: "Skin feeling much better",
  },
  {
    date: "May 16",
    morning: true,
    evening: true,
    satisfaction: 5,
    notes: "Very satisfied today",
  },
  {
    date: "May 15",
    morning: true,
    evening: false,
    satisfaction: 4,
    notes: "Forgot evening routine",
  },
  { date: "May 14", morning: true, evening: true, satisfaction: 4, notes: "" },
  {
    date: "May 13",
    morning: true,
    evening: true,
    satisfaction: 3,
    notes: "Slight irritation",
  },
];

export default function PatientTimelinePage() {
  const { showToast } = useGlowToast();
  const [viewMode, setViewMode] = useState<
    "overview" | "timeline" | "progress" | "notes"
  >("overview");
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    type: "observation" as const,
    privateNote: false,
  });

  const hasAccess = canExpertAccessPatient(treatmentRelationship);
  const daysRemaining = getRemainingAccessDays(treatmentRelationship);
  const isExpiringSoon = daysRemaining <= 14 && daysRemaining > 0;

  const handleAction = (action: string) =>
    showToast(`${action} (mock)`, "success");

  const handleAddNote = () => {
    if (!newNote.title || !newNote.content) {
      showToast("Please fill in all fields", "error");
      return;
    }
    showToast("Treatment note added successfully", "success");
    setShowAddNote(false);
    setNewNote({
      title: "",
      content: "",
      type: "observation",
      privateNote: false,
    });
  };

  if (!hasAccess) {
    return (
      <GlowCard variant="peach" className="mx-auto mt-12 max-w-2xl">
        <div className="py-8 text-center">
          <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-orange-600" />
          <h2 className="mb-2 text-2xl font-bold">Access Revoked</h2>
          <p className="text-muted-foreground">
            Your access to this patient timeline has ended. The treatment
            relationship was terminated on {treatmentRelationship.endDate}.
          </p>
        </div>
      </GlowCard>
    );
  }

  return (
    <div>
      {isExpiringSoon && (
        <GlowCard variant="yellow" className="mb-6">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
            <div>
              <p className="mb-1 font-semibold">
                Access Expiring Soon — {daysRemaining} days remaining
              </p>
              <p className="text-muted-foreground text-sm">
                Your access to {patient.name} expires on{" "}
                {treatmentRelationship.endDate}.
              </p>
              <div className="mt-3 flex gap-2">
                <GlowButton
                  size="sm"
                  onClick={() => handleAction("Extend Treatment")}
                >
                  Extend Treatment
                </GlowButton>
                <GlowButton
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction("Schedule Follow-up")}
                >
                  Schedule Follow-up
                </GlowButton>
              </div>
            </div>
          </div>
        </GlowCard>
      )}

      <div className="mb-8">
        <GlowButton
          variant="outline"
          size="sm"
          className="mb-4"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Queue
        </GlowButton>
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-3xl font-bold">{patient.name}</h1>
              <GlowBadge variant={isExpiringSoon ? "warning" : "success"}>
                {isExpiringSoon
                  ? `Expiring in ${daysRemaining}d`
                  : "Active Access"}
              </GlowBadge>
            </div>
            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
              <span>
                {patient.age} years • {patient.skinType} skin
              </span>
              <span>•</span>
              <span>{patient.clinic}</span>
              <span>•</span>
              <span>Treatment Day 31</span>
            </div>
          </div>
          <div className="flex gap-2">
            <GlowButton
              size="sm"
              variant="outline"
              onClick={() => handleAction("Message Patient")}
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              Message
            </GlowButton>
            <GlowButton
              size="sm"
              onClick={() => handleAction("Schedule Consultation")}
            >
              <Calendar className="mr-1 h-4 w-4" />
              Schedule
            </GlowButton>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <GlowCard variant="lavender">
          <p className="text-muted-foreground mb-1 text-xs">Treatment Phase</p>
          <p className="font-bold">{patient.currentPhase}</p>
          <GlowBadge variant="purple" className="mt-2 text-xs">
            {patient.treatmentStatus}
          </GlowBadge>
        </GlowCard>
        <GlowCard variant="mint">
          <p className="text-muted-foreground mb-1 text-xs">Compliance Rate</p>
          <p className="text-2xl font-bold text-green-600">
            {patient.complianceRate}%
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Excellent adherence
          </p>
        </GlowCard>
        <GlowCard variant="sky">
          <p className="text-muted-foreground mb-1 text-xs">Satisfaction</p>
          <p className="text-2xl font-bold text-blue-600">
            {patient.satisfactionAvg}/5
          </p>
          <p className="text-muted-foreground mt-1 text-xs">Average score</p>
        </GlowCard>
        <GlowCard variant="yellow">
          <p className="text-muted-foreground mb-1 text-xs">Last Check-in</p>
          <p className="font-bold">{patient.lastCheckIn}</p>
          <p className="text-muted-foreground mt-1 text-xs">Active today</p>
        </GlowCard>
      </div>

      {patient.allergies.length > 0 && (
        <GlowCard variant="peach" className="mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
            <div>
              <p className="mb-1 font-semibold">Allergy Alert</p>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy) => (
                  <GlowBadge key={allergy} variant="danger">
                    {allergy}
                  </GlowBadge>
                ))}
              </div>
            </div>
          </div>
        </GlowCard>
      )}

      <div className="mb-6 flex gap-2 overflow-x-auto">
        {["overview", "timeline", "progress", "notes"].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as typeof viewMode)}
            className={`rounded-lg px-4 py-2 whitespace-nowrap capitalize transition-all ${viewMode === mode ? "bg-primary text-white" : "bg-muted hover:bg-accent"}`}
          >
            {mode === "overview" && (
              <BarChart3 className="mr-2 inline h-4 w-4" />
            )}
            {mode === "timeline" && (
              <Activity className="mr-2 inline h-4 w-4" />
            )}
            {mode === "progress" && (
              <TrendingUp className="mr-2 inline h-4 w-4" />
            )}
            {mode === "notes" && <FileText className="mr-2 inline h-4 w-4" />}
            {mode}
          </button>
        ))}
      </div>

      {viewMode === "overview" && (
        <div className="grid gap-6 md:grid-cols-2">
          <GlowCard>
            <h3 className="mb-4 font-semibold">Treatment Summary</h3>
            <div className="space-y-3">
              {[
                ["Start Date", patient.treatmentStartDate],
                ["Expected End", patient.treatmentEndDate],
                ["Duration", "3 months"],
                ["Progress", "33% Complete"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{k}</span>
                  <span
                    className={
                      k === "Progress"
                        ? "font-bold text-green-600"
                        : "font-medium"
                    }
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </GlowCard>
          <GlowCard>
            <h3 className="mb-4 font-semibold">Primary Concerns</h3>
            <div className="space-y-2">
              {patient.concerns.map((concern) => (
                <div
                  key={concern}
                  className="bg-muted flex items-center justify-between rounded p-2"
                >
                  <span className="text-sm">{concern}</span>
                  <GlowBadge variant="warning" className="text-xs">
                    Active
                  </GlowBadge>
                </div>
              ))}
            </div>
          </GlowCard>
          <GlowCard variant="mint">
            <h3 className="mb-4 font-semibold">Recent Progress</h3>
            <div className="space-y-3">
              {[
                {
                  label: "Acne Reduction",
                  value: "-35%",
                  width: "70%",
                  color: "bg-green-600 text-green-600",
                },
                {
                  label: "Oiliness Control",
                  value: "-40%",
                  width: "80%",
                  color: "bg-blue-600 text-blue-600",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span className={`font-bold ${item.color.split(" ")[1]}`}>
                      {item.value}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className={`h-full ${item.color.split(" ")[0]}`}
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
          <GlowCard variant="lavender">
            <h3 className="mb-4 font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <GlowButton
                size="sm"
                variant="outline"
                className="w-full justify-start"
                onClick={() => setViewMode("notes")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Treatment Note
              </GlowButton>
              <GlowButton
                size="sm"
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAction("Adjust Routine")}
              >
                <Edit className="mr-2 h-4 w-4" />
                Adjust Routine
              </GlowButton>
              <GlowButton
                size="sm"
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAction("Request Progress Photo")}
              >
                <Camera className="mr-2 h-4 w-4" />
                Request Progress Photo
              </GlowButton>
            </div>
          </GlowCard>
        </div>
      )}

      {viewMode === "timeline" && (
        <GlowCard>
          <h3 className="mb-4 font-semibold">Daily Check-in History</h3>
          <div className="space-y-2">
            {checkInHistory.map((checkin, i) => (
              <div
                key={i}
                className="bg-muted flex items-center justify-between rounded p-3"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{checkin.date}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs">
                      <Sun
                        className={`h-3 w-3 ${checkin.morning ? "text-yellow-600" : "text-gray-300"}`}
                      />
                      AM
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Moon
                        className={`h-3 w-3 ${checkin.evening ? "text-purple-600" : "text-gray-300"}`}
                      />
                      PM
                    </div>
                  </div>
                  <GlowBadge variant="info" className="text-xs">
                    <Heart className="mr-1 inline h-3 w-3" />
                    {checkin.satisfaction}/5
                  </GlowBadge>
                </div>
                {checkin.notes && (
                  <p className="text-muted-foreground text-xs">
                    {checkin.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </GlowCard>
      )}

      {viewMode === "progress" && (
        <div className="space-y-6">
          <GlowCard>
            <h3 className="mb-4 font-semibold">Weekly Progress Tracking</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b">
                    {[
                      "Week",
                      "Acne",
                      "Oiliness",
                      "Hydration",
                      "Satisfaction",
                    ].map((h) => (
                      <th
                        key={h}
                        className={`${h === "Week" ? "text-left" : "text-center"} p-2`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeklyProgress.map((week, i) => (
                    <tr key={i} className="border-border border-b">
                      <td className="p-2 font-medium">{week.week}</td>
                      <td className="p-2 text-center">
                        <span
                          className={
                            week.acne < 70 ? "font-bold text-green-600" : ""
                          }
                        >
                          {week.acne}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span
                          className={
                            week.oiliness < 70 ? "font-bold text-blue-600" : ""
                          }
                        >
                          {week.oiliness}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span
                          className={
                            week.hydration > 60
                              ? "font-bold text-green-600"
                              : ""
                          }
                        >
                          {week.hydration}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <GlowBadge variant="success" className="text-xs">
                          {week.satisfaction}/5
                        </GlowBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlowCard>
          <div className="grid gap-4 md:grid-cols-3">
            <GlowCard variant="mint">
              <h4 className="mb-2 text-sm font-semibold">
                Overall Improvement
              </h4>
              <p className="text-3xl font-bold text-green-600">+35%</p>
              <p className="text-muted-foreground mt-1 text-xs">
                Since treatment start
              </p>
            </GlowCard>
            <GlowCard variant="sky">
              <h4 className="mb-2 text-sm font-semibold">Routine Adherence</h4>
              <p className="text-3xl font-bold text-blue-600">85%</p>
              <p className="text-muted-foreground mt-1 text-xs">
                26/31 days completed
              </p>
            </GlowCard>
            <GlowCard variant="yellow">
              <h4 className="mb-2 text-sm font-semibold">Satisfaction Trend</h4>
              <p className="text-3xl font-bold text-yellow-600">↑ 4.2</p>
              <p className="text-muted-foreground mt-1 text-xs">
                +0.7 from baseline
              </p>
            </GlowCard>
          </div>
        </div>
      )}

      {viewMode === "notes" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Treatment Notes</h3>
            <GlowButton size="sm" onClick={() => setShowAddNote(true)}>
              <Plus className="mr-1 h-4 w-4" />
              Add Note
            </GlowButton>
          </div>
          {showAddNote && (
            <GlowCard variant="lavender">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Note Type
                  </label>
                  <select
                    value={newNote.type}
                    onChange={(e) =>
                      setNewNote({
                        ...newNote,
                        type: e.target.value as typeof newNote.type,
                      })
                    }
                    className="border-border w-full rounded border bg-white px-3 py-2"
                  >
                    <option value="observation">Observation</option>
                    <option value="consultation">Consultation</option>
                    <option value="adjustment">Treatment Adjustment</option>
                    <option value="milestone">Milestone</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                    className="border-border w-full rounded border bg-white px-3 py-2"
                    placeholder="Note title..."
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Content
                  </label>
                  <textarea
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                    className="border-border w-full rounded border bg-white px-3 py-2"
                    rows={4}
                    placeholder="Detailed notes..."
                  />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={newNote.privateNote}
                    onChange={(e) =>
                      setNewNote({ ...newNote, privateNote: e.target.checked })
                    }
                    className="rounded"
                  />
                  <span>Private note (only visible to experts)</span>
                </label>
                <div className="flex gap-2">
                  <GlowButton onClick={handleAddNote} className="flex-1">
                    <Send className="mr-1 h-4 w-4" />
                    Save Note
                  </GlowButton>
                  <GlowButton
                    variant="outline"
                    onClick={() => setShowAddNote(false)}
                  >
                    Cancel
                  </GlowButton>
                </div>
              </div>
            </GlowCard>
          )}
          <div className="space-y-3">
            {treatmentNotes.map((note) => (
              <GlowCard
                key={note.id}
                variant={
                  note.type === "milestone"
                    ? "yellow"
                    : note.type === "consultation"
                      ? "lavender"
                      : undefined
                }
              >
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="font-semibold">{note.title}</h4>
                      <GlowBadge variant="info" className="text-xs capitalize">
                        {note.type}
                      </GlowBadge>
                      {note.privateNote && (
                        <GlowBadge className="text-xs">Private</GlowBadge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs">{note.date}</p>
                  </div>
                </div>
                <p className="text-sm">{note.content}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
