"use client";

import Link from "next/link";
import type { Route } from "next";
import {
  Sparkles,
  ShoppingCart,
  Package,
  Calendar,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { GlowButton } from "@/components/glow/button";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";

const features = [
  {
    icon: Sparkles,
    title: "AI-Assisted Recommendations",
    description:
      "Survey-driven skin profile assessment with optional photo analysis. Gets smarter every treatment cycle.",
    badge: "Survey-primary",
  },
  {
    icon: Package,
    title: "Conflict-Safe Shopping",
    description:
      "Real-time ingredient conflict detection when you add products to cart — from both recommendation and direct shopping.",
    badge: "Conflict Engine",
  },
  {
    icon: Calendar,
    title: "Personalised Routine",
    description:
      "AM and PM routines generated from your recommended products, sequenced by ingredient compatibility.",
    badge: "AI-assisted",
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description:
      "Connect with certified dermatology experts across partner clinics for long-term treatment plans.",
    badge: "Expert paid",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="-mx-4 bg-slate-900 px-4 py-24 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <GlowBadge variant="info">
              Vietnam&apos;s #1 Skincare Platform
            </GlowBadge>
          </div>
          <h1 className="mb-4 text-4xl leading-tight font-bold md:text-5xl">
            Your Skin Journey,
            <br />
            Intelligently Guided
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg text-gray-300">
            Complete a treatment survey, get personalised recommendations,
            detect ingredient conflicts, and build a science-backed routine —
            all in one flow.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={"/user/treatment-survey" as Route}>
              <GlowButton
                size="lg"
                className="w-full gap-2 sm:w-auto"
                style={{ background: "#5B8DEF", borderColor: "#5B8DEF" }}
              >
                <Sparkles className="h-5 w-5" />
                Start New Treatment
              </GlowButton>
            </Link>
            <Link href={"/user/shop" as Route}>
              <GlowButton
                size="lg"
                variant="outline"
                className="w-full gap-2 border-white bg-transparent text-white hover:bg-white/10 sm:w-auto"
              >
                <ShoppingCart className="h-5 w-5" />
                Shop Products
              </GlowButton>
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            No account needed for this demo · Pre-filled survey data available ·
            Sandbox payment only
          </p>
        </div>
      </section>

      {/* Two ways to start */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold">
            Two Ways to Start
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <GlowCard variant="lavender">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Sparkles className="text-primary h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Start New Treatment</h3>
                  <p className="text-muted-foreground text-xs">
                    Recommendation-driven purchase
                  </p>
                </div>
              </div>
              <ol className="text-muted-foreground mb-4 space-y-1.5 text-sm">
                {[
                  "Complete Treatment Survey (pre-filled)",
                  "Optional AI photo analysis",
                  "View personalised product recommendations",
                  "Add recommended products to cart",
                  "Conflict detection runs automatically",
                  "Checkout → Order Success",
                  "Activate personalised routine",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <Link href={"/user/treatment-survey" as Route}>
                <GlowButton
                  size="sm"
                  className="w-full gap-2"
                  style={{ background: "#5B8DEF", borderColor: "#5B8DEF" }}
                >
                  <Sparkles className="h-4 w-4" /> Start New Treatment{" "}
                  <ArrowRight className="ml-auto h-4 w-4" />
                </GlowButton>
              </Link>
            </GlowCard>

            <GlowCard variant="sky">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                  <ShoppingCart className="text-primary h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Shop Products</h3>
                  <p className="text-muted-foreground text-xs">
                    Direct shopping with conflict detection
                  </p>
                </div>
              </div>
              <ol className="text-muted-foreground mb-4 space-y-1.5 text-sm">
                {[
                  "Browse the product catalogue",
                  "View product details and ingredients",
                  "Add products to cart",
                  "Conflict detection runs automatically",
                  "Retinol + AHA conflict demo built-in",
                  "Checkout → Order Success",
                  "Usage reminders based on conflicts",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <Link href={"/user/shop" as Route}>
                <GlowButton
                  size="sm"
                  variant="outline"
                  className="w-full gap-2"
                >
                  <ShoppingCart className="h-4 w-4" /> Shop Products{" "}
                  <ArrowRight className="ml-auto h-4 w-4" />
                </GlowButton>
              </Link>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* Platform features */}
      <section className="bg-muted -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-xl font-bold">
            Platform Capabilities
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {features.map((feature, index) => (
              <GlowCard
                key={index}
                variant={
                  index % 4 === 0
                    ? "mint"
                    : index % 4 === 1
                      ? "peach"
                      : index % 4 === 2
                        ? "lavender"
                        : "sky"
                }
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                    <feature.icon className="text-primary h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{feature.title}</h3>
                      <GlowBadge>{feature.badge}</GlowBadge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-3 text-2xl font-bold">Ready to begin?</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Choose your path — both flows share the same cart, conflict engine,
            and checkout.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={"/user/treatment-survey" as Route}>
              <GlowButton
                size="lg"
                className="w-full gap-2 sm:w-auto"
                style={{ background: "#5B8DEF", borderColor: "#5B8DEF" }}
              >
                <Sparkles className="h-5 w-5" /> Start New Treatment
              </GlowButton>
            </Link>
            <Link href={"/user/shop" as Route}>
              <GlowButton
                size="lg"
                variant="outline"
                className="w-full gap-2 sm:w-auto"
              >
                <ShoppingCart className="h-5 w-5" /> Shop Products
              </GlowButton>
            </Link>
          </div>
          <div className="text-muted-foreground mt-5 flex items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              Not a medical diagnosis
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <GlowBadge variant="info" className="text-xs">
                Sandbox payment
              </GlowBadge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
