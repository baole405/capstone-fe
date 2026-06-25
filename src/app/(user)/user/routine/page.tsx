"use client";

import Link from "next/link";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { mockProducts } from "@/lib/mock-data";
import { Calendar, Clock, CheckCircle, TrendingUp } from "lucide-react";

export default function RoutinePage() {
  const morningRoutine = [
    { product: mockProducts[2], step: 1 },
    { product: mockProducts[4], step: 2 },
  ];

  const eveningRoutine = [
    { product: mockProducts[0], step: 1 },
    { product: mockProducts[1], step: 2 },
    { product: mockProducts[3], step: 3 },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">My Skincare Routine</h1>
        <p className="text-muted-foreground">
          Track your daily routine and progress
        </p>
        <div className="mt-4 flex gap-2">
          <GlowBadge variant="info" className="cursor-pointer px-4 py-2">
            Skincare Routine
          </GlowBadge>
          <Link href={"/user/routine/exercises" as Route}>
            <GlowBadge className="cursor-pointer px-4 py-2">
              Support Habits
            </GlowBadge>
          </Link>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <GlowCard variant="mint">
          <p className="text-muted-foreground mb-1 text-sm">Completion Rate</p>
          <p className="text-2xl font-bold">85%</p>
        </GlowCard>
        <GlowCard variant="lavender">
          <p className="text-muted-foreground mb-1 text-sm">Days Tracked</p>
          <p className="text-2xl font-bold">14</p>
        </GlowCard>
        <GlowCard variant="peach">
          <p className="text-muted-foreground mb-1 text-sm">Next Check-in</p>
          <p className="text-2xl font-bold">Today</p>
        </GlowCard>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Morning Routine</h2>
          <GlowBadge variant="info">Active</GlowBadge>
        </div>
        <div className="space-y-3">
          {morningRoutine.map((item, index) => (
            <GlowCard key={index} variant="sky">
              <div className="flex items-center gap-4">
                <div className="bg-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg font-bold text-white">
                  {item.step}
                </div>
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm">
                    {item.product.brand}
                  </p>
                  <p className="font-semibold">{item.product.name}</p>
                </div>
                <GlowButton size="sm" variant="outline">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Done
                </GlowButton>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Evening Routine</h2>
        <div className="space-y-3">
          {eveningRoutine.map((item, index) => (
            <GlowCard key={index} variant="lavender">
              <div className="flex items-center gap-4">
                <div className="bg-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg font-bold text-white">
                  {item.step}
                </div>
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm">
                    {item.product.brand}
                  </p>
                  <p className="font-semibold">{item.product.name}</p>
                </div>
                <GlowButton size="sm" variant="outline">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Done
                </GlowButton>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlowCard variant="peach">
          <h3 className="mb-3 font-semibold">Daily Check-in</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            How is your skin feeling today?
          </p>
          <Link href={"/user/routine/checkin" as Route}>
            <GlowButton className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Log Today&apos;s Check-in
            </GlowButton>
          </Link>
        </GlowCard>

        <GlowCard variant="mint">
          <h3 className="mb-3 font-semibold">Progress Timeline</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Track your skin improvement over time
          </p>
          <Link href={"/user/progress" as Route}>
            <GlowButton variant="outline" className="w-full">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Progress
            </GlowButton>
          </Link>
        </GlowCard>
      </div>

      <GlowCard variant="yellow" className="mt-6">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div>
            <p className="mb-1 font-semibold">Routine Endpoint</p>
            <p className="text-muted-foreground text-sm">
              Based on product quantity and usage, your Beauty of Joseon Relief
              Sun may run out in 5 days.
            </p>
            <GlowButton size="sm" variant="outline" className="mt-3">
              Reorder Product
            </GlowButton>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
