"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import {
  Heart,
  Droplets,
  Sun,
  Moon,
  Wind,
  Smile,
  CheckCircle,
} from "lucide-react";

const habits = [
  {
    id: "face-yoga",
    name: "Face Yoga",
    icon: Smile,
    purpose: "Improve blood circulation and skin elasticity",
    duration: "5-10 minutes",
    frequency: "Daily",
    concern: "Fine lines, skin firmness",
    color: "lavender" as const,
  },
  {
    id: "facial-massage",
    name: "Facial Massage",
    icon: Heart,
    purpose: "Promote lymphatic drainage and reduce puffiness",
    duration: "5 minutes",
    frequency: "Daily",
    concern: "Puffiness, circulation",
    color: "rose" as const,
  },
  {
    id: "hydration",
    name: "Hydration Habit",
    icon: Droplets,
    purpose: "Maintain skin moisture from within",
    duration: "2L daily",
    frequency: "Throughout day",
    concern: "Dryness, hydration",
    color: "sky" as const,
  },
  {
    id: "sleep",
    name: "Sleep Routine",
    icon: Moon,
    purpose: "Allow skin to repair and regenerate",
    duration: "7-8 hours",
    frequency: "Nightly",
    concern: "Dark circles, skin recovery",
    color: "mint" as const,
  },
  {
    id: "sunscreen-reapply",
    name: "Sunscreen Reapplication",
    icon: Sun,
    purpose: "Continuous UV protection throughout the day",
    duration: "2-3 hours",
    frequency: "Every 2-3 hours",
    concern: "Sun damage, dark spots",
    color: "yellow" as const,
  },
  {
    id: "stress-reduction",
    name: "Stress Reduction",
    icon: Wind,
    purpose: "Reduce cortisol levels that affect skin",
    duration: "10-15 minutes",
    frequency: "Daily",
    concern: "Breakouts, inflammation",
    color: "peach" as const,
  },
] as const;

export default function ExercisesPage() {
  const [checkedHabits, setCheckedHabits] = useState<string[]>([]);

  const toggleHabit = (habitId: string) => {
    setCheckedHabits((prev) =>
      prev.includes(habitId)
        ? prev.filter((id) => id !== habitId)
        : [...prev, habitId],
    );
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Support Habits & Exercises</h1>
        <p className="text-muted-foreground">
          Complement your skincare routine with healthy habits for better skin
        </p>
        <div className="mt-4 flex gap-2">
          <Link href={"/user/routine" as Route}>
            <GlowBadge className="cursor-pointer px-4 py-2">
              Skincare Routine
            </GlowBadge>
          </Link>
          <GlowBadge variant="info" className="cursor-pointer px-4 py-2">
            Support Habits
          </GlowBadge>
        </div>
      </div>

      <GlowCard variant="mint" className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground mb-1 text-sm">
              Today&apos;s Habits
            </p>
            <p className="text-2xl font-bold">
              {checkedHabits.length} / {habits.length} Completed
            </p>
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-green-600">
            <span className="text-2xl font-bold text-green-600">
              {Math.round((checkedHabits.length / habits.length) * 100)}%
            </span>
          </div>
        </div>
      </GlowCard>

      <div className="space-y-4">
        {habits.map((habit) => {
          const Icon = habit.icon;
          const isCompleted = checkedHabits.includes(habit.id);
          return (
            <GlowCard
              key={habit.id}
              variant={habit.color}
              className={isCompleted ? "ring-2 ring-green-600" : ""}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon
                    className={`h-8 w-8 ${isCompleted ? "text-green-600" : "text-primary"}`}
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 text-lg font-semibold">
                        {habit.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {habit.purpose}
                      </p>
                    </div>
                    <GlowButton
                      size="sm"
                      variant={isCompleted ? "primary" : "outline"}
                      onClick={() => toggleHabit(habit.id)}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Done
                        </>
                      ) : (
                        "Mark Done"
                      )}
                    </GlowButton>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-white px-3 py-2">
                      <p className="text-muted-foreground mb-0.5 text-xs">
                        Duration
                      </p>
                      <p className="text-sm font-semibold">{habit.duration}</p>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2">
                      <p className="text-muted-foreground mb-0.5 text-xs">
                        Frequency
                      </p>
                      <p className="text-sm font-semibold">{habit.frequency}</p>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2">
                      <p className="text-muted-foreground mb-0.5 text-xs">
                        Helps with
                      </p>
                      <p className="truncate text-sm font-semibold">
                        {habit.concern}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          );
        })}
      </div>

      <GlowCard variant="sky" className="mt-8">
        <h3 className="mb-3 font-semibold">Tips for Success</h3>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>• Set reminders for habits throughout your day</li>
          <li>• Start with 2-3 habits and gradually add more</li>
          <li>• Track your progress to see which habits help your skin most</li>
          <li>• Consistency is more important than perfection</li>
          <li>
            • Combine these habits with your daily skincare routine for best
            results
          </li>
        </ul>
      </GlowCard>

      <GlowCard className="mt-8">
        <h3 className="mb-4 font-semibold">This Week&apos;s Summary</h3>
        <div className="space-y-3">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day, index) => {
              const completionValues = [85, 60, 100, 40, 75, 90, 50];
              const completion = completionValues[index];
              return (
                <div key={day} className="flex items-center gap-3">
                  <span className="w-12 text-sm font-medium">{day}</span>
                  <div className="bg-secondary h-2 flex-1 overflow-hidden rounded-full">
                    <div
                      className={`h-full ${completion >= 70 ? "bg-green-600" : completion >= 40 ? "bg-yellow-500" : "bg-gray-400"}`}
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                  <span className="text-muted-foreground w-12 text-sm">
                    {completion}%
                  </span>
                </div>
              );
            },
          )}
        </div>
      </GlowCard>
    </div>
  );
}
