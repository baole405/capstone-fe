import Link from "next/link";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import {
  CheckCircle,
  Calendar,
  Activity,
  Sparkles,
  Shield,
  Clock,
  ArrowRight,
  FileText,
} from "lucide-react";

const bookingDetails = {
  expertName: "Dr. Minh Anh",
  clinicName: "Glow Dermatology Partner Clinic",
  consultationType: "Expert Consultation",
  consultationDate: "May 28, 2026",
  consultationTime: "2:00 PM",
  bookingId: "GS-2026-001",
};

const nextSteps = [
  {
    step: 1,
    title: "Prepare for Initial Consultation",
    desc: "Your expert will review your skin assessment before the consultation. Prepare any questions or concerns you'd like to discuss.",
  },
  {
    step: 2,
    title: `Initial Consultation (${bookingDetails.consultationDate})`,
    desc: `Meet with ${bookingDetails.expertName} to discuss your skincare goals, concerns, and create a personalized treatment roadmap.`,
  },
  {
    step: 3,
    title: "Treatment Roadmap Created",
    desc: "Your expert will create a customized treatment plan with product recommendations, routine schedule, and treatment phases (Recovery → Active → Maintenance).",
  },
  {
    step: 4,
    title: "Daily Tracking Begins",
    desc: "Start your daily check-ins to track product usage, skin condition, and progress. Your expert monitors your journey and adjusts treatment as needed.",
  },
  {
    step: 5,
    title: "Weekly Expert Reviews",
    desc: "Your expert reviews your progress weekly, provides observations, and makes routine adjustments to optimize your results.",
  },
];

export default function TreatmentWorkspaceCreatedPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Treatment Workspace Created</h1>
        <p className="text-muted-foreground">
          Your skincare journey with {bookingDetails.expertName} begins now
        </p>
      </div>

      <GlowCard variant="mint" className="mb-6">
        <div className="mb-4 flex items-start gap-3">
          <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="flex-1">
            <p className="mb-1 font-semibold">Initial Consultation Scheduled</p>
            <div className="grid gap-3 text-sm md:grid-cols-2">
              {[
                { label: "Expert", value: bookingDetails.expertName },
                { label: "Clinic", value: bookingDetails.clinicName },
                {
                  label: "Date & Time",
                  value: `${bookingDetails.consultationDate} at ${bookingDetails.consultationTime}`,
                },
                { label: "Booking ID", value: bookingDetails.bookingId },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlowCard>

      <GlowCard variant="lavender" className="mb-6">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-6 w-6 flex-shrink-0 text-purple-600" />
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <p className="font-semibold">Expert Access Granted</p>
              <GlowBadge variant="success" className="text-xs">
                Active
              </GlowBadge>
            </div>
            <p className="text-muted-foreground mb-3 text-sm">
              {bookingDetails.expertName} now has temporary access to your
              skincare profile and can monitor your progress until treatment
              ends.
            </p>
            <div className="space-y-2 rounded-lg bg-white/50 p-3 text-sm">
              <p className="font-medium">Your expert can now view:</p>
              <ul className="text-muted-foreground space-y-1">
                {[
                  "Your skin assessment and AI analysis",
                  "Daily check-ins and skincare routine adherence",
                  "Progress photos and timeline updates",
                  "Treatment notes and recommendations",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground border-border border-t pt-2 text-xs">
                🔒 Privacy: Access is automatically revoked when treatment ends
                or if you cancel.
              </p>
            </div>
          </div>
        </div>
      </GlowCard>

      <GlowCard variant="sky" className="mb-6">
        <div className="flex items-start gap-3">
          <Activity className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div className="flex-1">
            <p className="mb-1 font-semibold">
              Shared Treatment Timeline Created
            </p>
            <p className="text-muted-foreground mb-3 text-sm">
              You and your expert now share one collaborative treatment journey.
              Track your progress, routine adjustments, and treatment milestones
              together.
            </p>
            <Link href={"/user/treatment-journey" as Route}>
              <GlowButton variant="outline" size="sm">
                <Activity className="mr-2 h-4 w-4" />
                View Treatment Journey
              </GlowButton>
            </Link>
          </div>
        </div>
      </GlowCard>

      <GlowCard className="mb-8">
        <h3 className="mb-4 flex items-center gap-2 font-semibold">
          <Clock className="text-primary h-5 w-5" />
          What Happens Next
        </h3>
        <div className="space-y-4">
          {nextSteps.map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                <span className="text-primary font-semibold">{item.step}</span>
              </div>
              <div>
                <p className="mb-1 font-medium">{item.title}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </GlowCard>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {[
          {
            href: "/user/treatment-journey",
            icon: Activity,
            color: "text-blue-600",
            title: "View Timeline",
            desc: "See your treatment journey",
          },
          {
            href: "/user/routine/checkin",
            icon: FileText,
            color: "text-green-600",
            title: "Daily Check-in",
            desc: "Track your routine",
          },
          {
            href: "/user/shop",
            icon: Sparkles,
            color: "text-purple-600",
            title: "Browse Products",
            desc: "Shop recommended items",
          },
        ].map((item) => (
          <Link key={item.href} href={item.href as Route}>
            <GlowCard className="h-full cursor-pointer transition-shadow hover:shadow-md">
              <div className="py-4 text-center">
                <item.icon className={`mx-auto mb-2 h-8 w-8 ${item.color}`} />
                <p className="mb-1 font-semibold">{item.title}</p>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            </GlowCard>
          </Link>
        ))}
      </div>

      <div className="flex gap-4">
        <Link href={"/user/treatment-journey" as Route} className="flex-1">
          <GlowButton size="lg" className="w-full">
            View Treatment Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </GlowButton>
        </Link>
        <Link href={"/user" as Route}>
          <GlowButton variant="outline" size="lg">
            Return Home
          </GlowButton>
        </Link>
      </div>
    </div>
  );
}
