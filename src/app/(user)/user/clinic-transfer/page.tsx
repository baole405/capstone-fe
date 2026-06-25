"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { useGlowToast } from "@/components/glow/toast";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  Lock,
  ArrowRight,
  X,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";

const currentTreatment = {
  expertName: "Dr. Minh Anh",
  clinicName: "Glow Dermatology Partner Clinic",
  startDate: "April 16, 2026",
  duration: "4 months",
  currentPhase: "Brightening Phase",
  consultations: 8,
  progressPhotos: 12,
  routineAdjustments: 5,
  notes: 15,
};

const newClinic = {
  name: "Clear Skin Clinic - District 3",
  expertName: "Dr. Lan Phuong",
};

export default function ClinicTransferPage() {
  const router = useRouter();
  const { showToast } = useGlowToast();
  const [step, setStep] = useState<"consent" | "confirm" | "success">(
    "consent",
  );
  const [shareLevel, setShareLevel] = useState<"full" | "limited" | null>(null);
  const [showDataDetails, setShowDataDetails] = useState(false);

  const handleTransfer = () => {
    if (!shareLevel) {
      showToast("Please select a sharing option", "error");
      return;
    }
    setStep("confirm");
  };

  const handleConfirmTransfer = () => {
    showToast("Processing transfer...", "info");
    setTimeout(() => {
      setStep("success");
      showToast(
        "Transfer complete! Your treatment history has been shared.",
        "success",
      );
    }, 2000);
  };

  if (step === "success") {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Transfer Complete</h1>
          <p className="text-muted-foreground text-lg">
            Your treatment history has been successfully transferred
          </p>
        </div>

        <GlowCard variant="mint" className="mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
            <div className="flex-1">
              <p className="mb-2 font-semibold">What Happened</p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <strong>{newClinic.expertName}</strong> at {newClinic.name}{" "}
                  can now access your{" "}
                  {shareLevel === "full" ? "complete" : "limited"} treatment
                  history
                </p>
                <p className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-red-600" />
                  <strong>{currentTreatment.expertName}</strong> at{" "}
                  {currentTreatment.clinicName} no longer has access
                </p>
                <p className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  New expert can continue your existing treatment roadmap
                  seamlessly
                </p>
              </div>
            </div>
          </div>
        </GlowCard>

        <GlowCard variant="lavender" className="mb-6">
          <div className="flex items-start gap-3">
            <Activity className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
            <div className="flex-1">
              <p className="mb-1 font-semibold">Your Shared Timeline</p>
              <p className="text-muted-foreground mb-3 text-sm">
                Your new expert can see your full treatment journey and will
                build upon your progress without starting from scratch.
              </p>
              {shareLevel === "full" && (
                <div className="rounded-lg bg-white/50 p-3 text-sm">
                  <p className="mb-2 font-medium">Shared data includes:</p>
                  <div className="text-muted-foreground grid grid-cols-2 gap-2">
                    <div>✓ {currentTreatment.consultations} consultations</div>
                    <div>
                      ✓ {currentTreatment.progressPhotos} progress photos
                    </div>
                    <div>
                      ✓ {currentTreatment.routineAdjustments} routine
                      adjustments
                    </div>
                    <div>✓ {currentTreatment.notes} treatment notes</div>
                    <div>✓ Previous reactions & sensitivities</div>
                    <div>✓ Active ingredient history</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </GlowCard>

        <div className="flex gap-4">
          <GlowButton
            size="lg"
            className="flex-1"
            onClick={() => router.push("/user/treatment-journey" as Route)}
          >
            View Shared Timeline
            <ArrowRight className="ml-2 h-5 w-5" />
          </GlowButton>
          <GlowButton
            variant="outline"
            size="lg"
            onClick={() => router.push("/user" as Route)}
          >
            Return Home
          </GlowButton>
        </div>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Confirm Transfer</h1>
          <p className="text-muted-foreground">
            Please review the details before completing the transfer
          </p>
        </div>

        <GlowCard variant="yellow" className="mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-yellow-600" />
            <div className="flex-1">
              <p className="mb-1 font-semibold">This Action Cannot Be Undone</p>
              <p className="text-muted-foreground text-sm">
                Once you transfer, {currentTreatment.expertName} will
                immediately lose access to your treatment data. You cannot
                reverse this action.
              </p>
            </div>
          </div>
        </GlowCard>

        <GlowCard className="mb-6">
          <h3 className="mb-4 font-semibold">Transfer Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
              <div>
                <p className="text-muted-foreground text-sm">Revoking Access</p>
                <p className="font-medium">{currentTreatment.expertName}</p>
                <p className="text-muted-foreground text-sm">
                  {currentTreatment.clinicName}
                </p>
              </div>
              <Lock className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="text-muted-foreground h-6 w-6" />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
              <div>
                <p className="text-muted-foreground text-sm">Granting Access</p>
                <p className="font-medium">{newClinic.expertName}</p>
                <p className="text-muted-foreground text-sm">
                  {newClinic.name}
                </p>
              </div>
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="mb-1 text-sm font-medium">Sharing Level</p>
              <GlowBadge
                variant={shareLevel === "full" ? "success" : "warning"}
              >
                {shareLevel === "full"
                  ? "Full Treatment History"
                  : "Limited Summary"}
              </GlowBadge>
            </div>
          </div>
        </GlowCard>

        <div className="flex gap-4">
          <GlowButton
            variant="outline"
            size="lg"
            onClick={() => setStep("consent")}
          >
            Go Back
          </GlowButton>
          <GlowButton
            size="lg"
            className="flex-1"
            onClick={handleConfirmTransfer}
          >
            Confirm Transfer
          </GlowButton>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Transfer Treatment History</h1>
        <p className="text-muted-foreground">
          Share your skincare journey with your new clinic while maintaining
          privacy
        </p>
      </div>

      <GlowCard variant="sky" className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 font-semibold">
          <Activity className="h-5 w-5 text-blue-600" />
          Your Current Treatment
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Expert</p>
            <p className="font-medium">{currentTreatment.expertName}</p>
            <p className="text-muted-foreground text-xs">
              {currentTreatment.clinicName}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Duration</p>
            <p className="font-medium">{currentTreatment.duration}</p>
            <p className="text-muted-foreground text-xs">
              Since {currentTreatment.startDate}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Current Phase</p>
            <p className="font-medium">{currentTreatment.currentPhase}</p>
          </div>
        </div>
      </GlowCard>

      <GlowCard variant="mint" className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 font-semibold">
          <Users className="h-5 w-5 text-green-600" />
          Transferring To
        </h3>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-200 to-purple-200" />
          <div>
            <p className="font-medium">{newClinic.expertName}</p>
            <p className="text-muted-foreground text-sm">{newClinic.name}</p>
          </div>
        </div>
      </GlowCard>

      <div className="mb-6 space-y-4">
        <h3 className="font-semibold">Choose Sharing Level</h3>

        <GlowCard
          variant={shareLevel === "full" ? "lavender" : undefined}
          className={`cursor-pointer transition-all ${shareLevel === "full" ? "ring-primary ring-2" : "hover:ring-primary/30 hover:ring-1"}`}
          onClick={() => setShareLevel("full")}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${shareLevel === "full" ? "border-primary bg-primary" : "border-border"}`}
                >
                  {shareLevel === "full" && (
                    <CheckCircle className="h-3 w-3 text-white" />
                  )}
                </div>
                <p className="font-semibold">Share Full Treatment History</p>
                <GlowBadge variant="success" className="text-xs">
                  Recommended
                </GlowBadge>
              </div>
              <p className="text-muted-foreground mb-3 text-sm">
                Share complete treatment records for seamless continuity. Your
                new expert can build upon your progress.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDataDetails(!showDataDetails);
                }}
                className="text-primary flex items-center gap-1 text-sm hover:underline"
              >
                {showDataDetails ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                {showDataDetails ? "Hide" : "Show"} what will be shared
              </button>
              {showDataDetails && (
                <div className="mt-3 rounded-lg bg-white/50 p-4">
                  <div className="grid gap-3 text-sm md:grid-cols-2">
                    {[
                      `Full treatment timeline (${currentTreatment.duration})`,
                      `All consultation notes (${currentTreatment.consultations})`,
                      `Progress photos (${currentTreatment.progressPhotos})`,
                      `Routine history (${currentTreatment.routineAdjustments} adjustments)`,
                      `Treatment notes (${currentTreatment.notes})`,
                      "Side effect history & sensitivities",
                      "Active ingredient reactions",
                      "Daily check-in data",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </GlowCard>

        <GlowCard
          variant={shareLevel === "limited" ? "sky" : undefined}
          className={`cursor-pointer transition-all ${shareLevel === "limited" ? "ring-2 ring-blue-600" : "hover:ring-1 hover:ring-blue-600/30"}`}
          onClick={() => setShareLevel("limited")}
        >
          <div className="flex items-start gap-2">
            <div
              className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 ${shareLevel === "limited" ? "border-blue-600 bg-blue-600" : "border-border"}`}
            >
              {shareLevel === "limited" && (
                <CheckCircle className="h-3 w-3 text-white" />
              )}
            </div>
            <div className="flex-1">
              <p className="mb-1 font-semibold">Share Limited Summary Only</p>
              <p className="text-muted-foreground text-sm">
                Share basic treatment summary without detailed notes or photos.
                New expert sees skin type, concerns, and completed phases only.
              </p>
            </div>
          </div>
        </GlowCard>
      </div>

      <GlowCard variant="yellow" className="mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div className="flex-1">
            <p className="mb-1 font-semibold">
              Your Previous Expert Will Lose Access
            </p>
            <p className="text-muted-foreground mb-3 text-sm">
              When you complete this transfer,{" "}
              <strong>{currentTreatment.expertName}</strong> at{" "}
              {currentTreatment.clinicName} will immediately lose access to:
            </p>
            <div className="text-muted-foreground grid gap-2 text-sm md:grid-cols-2">
              {[
                "Your ongoing treatment timeline",
                "New progress photos and check-ins",
                "Current routine and product usage",
                "Real-time treatment updates",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlowCard>

      <div className="flex gap-4">
        <GlowButton
          variant="outline"
          size="lg"
          onClick={() => router.push("/user/treatment-journey" as Route)}
        >
          Cancel
        </GlowButton>
        <GlowButton
          size="lg"
          className="flex-1"
          onClick={handleTransfer}
          disabled={!shareLevel}
        >
          Continue to Confirmation
          <ArrowRight className="ml-2 h-5 w-5" />
        </GlowButton>
      </div>
    </div>
  );
}
