"use client";

import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { Upload, TrendingUp, TrendingDown, Minus } from "lucide-react";

const progressPhotos = [
  {
    label: "Before",
    date: "April 18, 2026",
    image:
      "https://images.unsplash.com/photo-1614287270006-e9a0c6d93c91?w=400&h=400&fit=crop",
  },
  {
    label: "Week 2",
    date: "May 2, 2026",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop",
  },
  {
    label: "Week 4",
    date: "May 16, 2026",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=400&fit=crop",
  },
];

const metrics = [
  { label: "Acne Severity", before: "High", after: "Moderate", trend: "down" },
  { label: "Oiliness", before: "High", after: "Moderate", trend: "down" },
  { label: "Hydration", before: "Low", after: "Moderate", trend: "up" },
  { label: "Dark Spots", before: "Moderate", after: "Low", trend: "down" },
  {
    label: "Pore Visibility",
    before: "High",
    after: "Moderate",
    trend: "down",
  },
  { label: "Fine Lines", before: "Low", after: "Low", trend: "same" },
];

const weeklyHistory = [
  {
    week: "Week 4",
    satisfaction: "Very Satisfied",
    progress: "Significant improvement in acne",
  },
  {
    week: "Week 3",
    satisfaction: "Satisfied",
    progress: "Less oiliness, clearer skin",
  },
  {
    week: "Week 2",
    satisfaction: "Somewhat Satisfied",
    progress: "Minor improvements visible",
  },
  {
    week: "Week 1",
    satisfaction: "Neutral",
    progress: "Getting used to routine",
  },
];

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Progress Timeline</h1>
          <GlowBadge variant="success">4 Weeks Active</GlowBadge>
        </div>
        <p className="text-muted-foreground">
          Track your skin improvement journey with photo comparisons and AI
          analysis
        </p>
      </div>

      <GlowCard padding="lg" className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">Photo Comparison</h2>
        <div className="mb-6 grid gap-6 md:grid-cols-3">
          {progressPhotos.map((photo, index) => (
            <div key={index}>
              <div className="mb-3 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 to-purple-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.image}
                  alt={photo.label}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold">{photo.label}</p>
                <p className="text-muted-foreground text-sm">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>
        <GlowButton variant="outline" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload New Progress Photo
        </GlowButton>
      </GlowCard>

      <GlowCard variant="lavender" padding="lg" className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">AI Parameter Changes</h2>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="rounded-lg bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">{metric.label}</span>
                <div className="flex items-center gap-2">
                  {metric.trend === "down" && (
                    <TrendingDown className="h-5 w-5 text-green-600" />
                  )}
                  {metric.trend === "up" && (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  )}
                  {metric.trend === "same" && (
                    <Minus className="h-5 w-5 text-gray-400" />
                  )}
                  <GlowBadge
                    variant={metric.trend === "same" ? "default" : "success"}
                  >
                    {metric.trend === "same" ? "Stable" : "Improved"}
                  </GlowBadge>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex-1">
                  <p className="text-muted-foreground mb-1">Before</p>
                  <div className="rounded bg-orange-100 px-3 py-1 capitalize">
                    {metric.before}
                  </div>
                </div>
                <div className="text-muted-foreground text-2xl">→</div>
                <div className="flex-1">
                  <p className="text-muted-foreground mb-1">Current</p>
                  <div className="rounded bg-green-100 px-3 py-1 capitalize">
                    {metric.after}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlowCard>

      <GlowCard variant="sky" padding="lg">
        <h2 className="mb-6 text-2xl font-bold">Weekly Satisfaction History</h2>
        <div className="space-y-3">
          {weeklyHistory.map((entry, index) => (
            <div key={index} className="rounded-lg bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">{entry.week}</span>
                <GlowBadge variant="success">{entry.satisfaction}</GlowBadge>
              </div>
              <p className="text-muted-foreground text-sm">{entry.progress}</p>
            </div>
          ))}
        </div>
      </GlowCard>

      <GlowCard variant="yellow" className="mt-8">
        <div className="flex items-start gap-3">
          <Upload className="mt-0.5 h-6 w-6 flex-shrink-0 text-yellow-600" />
          <div className="flex-1">
            <p className="mb-1 font-semibold">Keep Up the Great Work!</p>
            <p className="text-muted-foreground mb-3 text-sm">
              Your routine is showing excellent results. Continue for another 4
              weeks for optimal improvement.
            </p>
            <GlowButton>Reorder Products</GlowButton>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
