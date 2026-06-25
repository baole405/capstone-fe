"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowButton } from "@/components/glow/button";
import { GlowBadge } from "@/components/glow/badge";
import { useGlowToast } from "@/components/glow/toast";
import {
  CheckCircle,
  Upload,
  Calendar,
  Sun,
  Moon,
  Package,
  Droplet,
  Heart,
  Camera,
  MessageSquare,
  Smile,
  Meh,
  Frown,
  Activity,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
} from "lucide-react";

interface DailyCheckInData {
  morningRoutine: boolean;
  eveningRoutine: boolean;
  productsUsed: string[];
  productsRunningLow: string[];
  skinCondition: {
    acne: "better" | "same" | "worse";
    oiliness: "better" | "same" | "worse";
    hydration: "better" | "same" | "worse";
    redness: "better" | "same" | "worse";
  };
  mood: "happy" | "neutral" | "sad";
  satisfaction: number;
  sideEffects: string[];
  notes: string;
}

const availableProducts = [
  "CeraVe Foaming Cleanser",
  "The Ordinary Niacinamide",
  "CeraVe Moisturizing Cream",
  "Beauty of Joseon Relief Sun",
  "Paula's Choice BHA",
];

const commonSideEffects = [
  "Slight tingling",
  "Dryness",
  "Redness",
  "Purging",
  "Irritation",
  "None",
];

export default function CheckInPage() {
  const router = useRouter();
  const { showToast } = useGlowToast();
  const [checkInType, setCheckInType] = useState<"daily" | "weekly">("daily");
  const [completed, setCompleted] = useState(false);

  const [dailyData, setDailyData] = useState<DailyCheckInData>({
    morningRoutine: false,
    eveningRoutine: false,
    productsUsed: [],
    productsRunningLow: [],
    skinCondition: {
      acne: "same",
      oiliness: "same",
      hydration: "same",
      redness: "same",
    },
    mood: "neutral",
    satisfaction: 4,
    sideEffects: [],
    notes: "",
  });

  const [weeklyData, setWeeklyData] = useState({
    satisfaction: "",
    expectationsMet: "",
    continueIntent: "",
    notes: "",
  });

  const handleSubmit = () => {
    if (
      checkInType === "daily" &&
      !dailyData.morningRoutine &&
      !dailyData.eveningRoutine
    ) {
      showToast("Please select at least one routine completion", "error");
      return;
    }
    setCompleted(true);
    showToast("Check-in submitted successfully!", "success");
    setTimeout(() => router.push("/user/routine" as Route), 2000);
  };

  const toggleProduct = (product: string, type: "used" | "low") => {
    if (type === "used") {
      setDailyData((d) => ({
        ...d,
        productsUsed: d.productsUsed.includes(product)
          ? d.productsUsed.filter((p) => p !== product)
          : [...d.productsUsed, product],
      }));
    } else {
      setDailyData((d) => ({
        ...d,
        productsRunningLow: d.productsRunningLow.includes(product)
          ? d.productsRunningLow.filter((p) => p !== product)
          : [...d.productsRunningLow, product],
      }));
    }
  };

  const toggleSideEffect = (effect: string) => {
    if (effect === "None") {
      setDailyData((d) => ({ ...d, sideEffects: ["None"] }));
    } else {
      setDailyData((d) => ({
        ...d,
        sideEffects: d.sideEffects.includes(effect)
          ? d.sideEffects.filter((e) => e !== effect)
          : [...d.sideEffects.filter((e) => e !== "None"), effect],
      }));
    }
  };

  if (completed) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center">
        <GlowCard variant="mint">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-600">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Check-in Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for tracking your progress. Keep up the great work!
          </p>
          <div className="flex justify-center gap-3">
            <GlowButton onClick={() => router.push("/user/routine" as Route)}>
              Back to Routine
            </GlowButton>
            <GlowButton
              variant="outline"
              onClick={() => router.push("/user/progress" as Route)}
            >
              View Progress
            </GlowButton>
          </div>
        </GlowCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Routine Check-in</h1>
          <div className="flex gap-2">
            <button onClick={() => setCheckInType("daily")}>
              <GlowBadge
                variant={checkInType === "daily" ? "info" : "default"}
                className="cursor-pointer"
              >
                Daily
              </GlowBadge>
            </button>
            <button onClick={() => setCheckInType("weekly")}>
              <GlowBadge
                variant={checkInType === "weekly" ? "purple" : "default"}
                className="cursor-pointer"
              >
                Weekly
              </GlowBadge>
            </button>
          </div>
        </div>
        <p className="text-muted-foreground">
          {checkInType === "daily"
            ? "Track your daily routine completion and skin condition"
            : "Weekly satisfaction review and progress evaluation"}
        </p>
      </div>

      {checkInType === "daily" ? (
        <div className="space-y-6">
          <GlowCard variant="sky">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Activity className="h-5 w-5 text-blue-600" />
              Routine Completion
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  setDailyData((d) => ({
                    ...d,
                    morningRoutine: !d.morningRoutine,
                  }))
                }
                className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${dailyData.morningRoutine ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
              >
                <Sun
                  className={`h-6 w-6 ${dailyData.morningRoutine ? "text-yellow-600" : "text-muted-foreground"}`}
                />
                <div className="text-left">
                  <p className="font-medium">Morning Routine</p>
                  <p className="text-muted-foreground text-xs">
                    {dailyData.morningRoutine ? "Completed" : "Not done yet"}
                  </p>
                </div>
              </button>
              <button
                onClick={() =>
                  setDailyData((d) => ({
                    ...d,
                    eveningRoutine: !d.eveningRoutine,
                  }))
                }
                className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${dailyData.eveningRoutine ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
              >
                <Moon
                  className={`h-6 w-6 ${dailyData.eveningRoutine ? "text-purple-600" : "text-muted-foreground"}`}
                />
                <div className="text-left">
                  <p className="font-medium">Evening Routine</p>
                  <p className="text-muted-foreground text-xs">
                    {dailyData.eveningRoutine ? "Completed" : "Not done yet"}
                  </p>
                </div>
              </button>
            </div>
          </GlowCard>

          <GlowCard>
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Package className="h-5 w-5" />
              Products Used Today
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {availableProducts.map((product) => (
                <button
                  key={product}
                  onClick={() => toggleProduct(product, "used")}
                  className={`rounded-lg border-2 p-3 text-left text-sm transition-all ${dailyData.productsUsed.includes(product) ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                >
                  {dailyData.productsUsed.includes(product) && (
                    <CheckCircle className="text-primary mr-1 inline h-4 w-4" />
                  )}
                  {product}
                </button>
              ))}
            </div>
          </GlowCard>

          <GlowCard variant="yellow">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Products Running Low
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {availableProducts.map((product) => (
                <button
                  key={product}
                  onClick={() => toggleProduct(product, "low")}
                  className={`rounded-lg border-2 p-3 text-left text-sm transition-all ${dailyData.productsRunningLow.includes(product) ? "border-yellow-600 bg-yellow-100" : "border-border hover:border-yellow-600/50"}`}
                >
                  {dailyData.productsRunningLow.includes(product) && (
                    <Package className="mr-1 inline h-4 w-4 text-yellow-600" />
                  )}
                  {product}
                </button>
              ))}
            </div>
          </GlowCard>

          <GlowCard variant="mint">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Droplet className="h-5 w-5 text-green-600" />
              Skin Condition vs Yesterday
            </h3>
            <div className="space-y-3">
              {(["acne", "oiliness", "hydration", "redness"] as const).map(
                (condition) => (
                  <div key={condition}>
                    <p className="mb-2 text-sm font-medium capitalize">
                      {condition}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {(["better", "same", "worse"] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() =>
                            setDailyData((d) => ({
                              ...d,
                              skinCondition: {
                                ...d.skinCondition,
                                [condition]: status,
                              },
                            }))
                          }
                          className={`rounded border-2 px-3 py-2 text-xs capitalize transition-all ${dailyData.skinCondition[condition] === status ? "border-primary bg-primary text-white" : "border-border hover:border-primary/50"}`}
                        >
                          {status === "better" && (
                            <ThumbsUp className="mr-1 inline h-3 w-3" />
                          )}
                          {status === "worse" && (
                            <ThumbsDown className="mr-1 inline h-3 w-3" />
                          )}
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </GlowCard>

          <GlowCard variant="lavender">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Heart className="h-5 w-5 text-purple-600" />
              Mood & Satisfaction
            </h3>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">
                  How do you feel today?
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "happy", icon: Smile, label: "Happy" },
                    { value: "neutral", icon: Meh, label: "Neutral" },
                    { value: "sad", icon: Frown, label: "Sad" },
                  ].map((mood) => {
                    const Icon = mood.icon;
                    return (
                      <button
                        key={mood.value}
                        onClick={() =>
                          setDailyData((d) => ({
                            ...d,
                            mood: mood.value as "happy" | "neutral" | "sad",
                          }))
                        }
                        className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${dailyData.mood === mood.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                      >
                        <Icon
                          className={`h-6 w-6 ${dailyData.mood === mood.value ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <span className="text-sm">{mood.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="mb-2 flex items-center justify-between text-sm font-medium">
                  <span>Satisfaction:</span>
                  <GlowBadge variant="info">
                    {dailyData.satisfaction}/5
                  </GlowBadge>
                </p>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={dailyData.satisfaction}
                  onChange={(e) =>
                    setDailyData((d) => ({
                      ...d,
                      satisfaction: Number(e.target.value),
                    }))
                  }
                  className="w-full"
                />
                <div className="text-muted-foreground mt-1 flex justify-between text-xs">
                  <span>Not satisfied</span>
                  <span>Very satisfied</span>
                </div>
              </div>
            </div>
          </GlowCard>

          <GlowCard variant="peach">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Any Side Effects?
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {commonSideEffects.map((effect) => (
                <button
                  key={effect}
                  onClick={() => toggleSideEffect(effect)}
                  className={`rounded border-2 p-2 text-left text-sm transition-all ${dailyData.sideEffects.includes(effect) ? "border-orange-600 bg-orange-100" : "border-border hover:border-orange-600/50"}`}
                >
                  {dailyData.sideEffects.includes(effect) && (
                    <CheckCircle className="mr-1 inline h-4 w-4 text-orange-600" />
                  )}
                  {effect}
                </button>
              ))}
            </div>
          </GlowCard>

          <GlowCard>
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <MessageSquare className="h-5 w-5" />
              Additional Notes
            </h3>
            <textarea
              value={dailyData.notes}
              onChange={(e) =>
                setDailyData((d) => ({ ...d, notes: e.target.value }))
              }
              className="border-border bg-background w-full rounded border px-3 py-2"
              rows={3}
              placeholder="Any observations, concerns, or questions..."
            />
          </GlowCard>

          <GlowCard variant="sky">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Camera className="h-5 w-5 text-blue-600" />
              Upload Progress Photo (Optional)
            </h3>
            <div className="border-border hover:border-primary cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all">
              <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
              <p className="text-muted-foreground text-sm">
                Click to upload or drag and drop
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Weekly progress photos recommended
              </p>
            </div>
          </GlowCard>

          <GlowButton size="lg" className="w-full" onClick={handleSubmit}>
            <Calendar className="mr-2 h-5 w-5" />
            Submit Daily Check-in
          </GlowButton>
        </div>
      ) : (
        <div className="space-y-6">
          <GlowCard variant="lavender">
            <h3 className="mb-4 font-semibold">
              Overall satisfaction with your routine this week?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"].map(
                (level) => (
                  <GlowButton
                    key={level}
                    variant={
                      weeklyData.satisfaction === level ? "primary" : "outline"
                    }
                    onClick={() =>
                      setWeeklyData((d) => ({ ...d, satisfaction: level }))
                    }
                    size="sm"
                  >
                    {level}
                  </GlowButton>
                ),
              )}
            </div>
          </GlowCard>

          <GlowCard variant="sky">
            <h3 className="mb-4 font-semibold">
              Are your expectations being met?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {["Exceeding", "Meeting", "Not Meeting"].map((level) => (
                <GlowButton
                  key={level}
                  variant={
                    weeklyData.expectationsMet === level ? "primary" : "outline"
                  }
                  onClick={() =>
                    setWeeklyData((d) => ({ ...d, expectationsMet: level }))
                  }
                >
                  {level}
                </GlowButton>
              ))}
            </div>
          </GlowCard>

          <GlowCard variant="mint">
            <h3 className="mb-4 font-semibold">
              Do you plan to continue this routine?
            </h3>
            <div className="flex gap-3">
              {[
                { value: "yes", label: "Yes, Continue" },
                { value: "adjust", label: "Need Adjustments" },
                { value: "no", label: "Stop" },
              ].map((opt) => (
                <GlowButton
                  key={opt.value}
                  variant={
                    weeklyData.continueIntent === opt.value
                      ? "primary"
                      : "outline"
                  }
                  onClick={() =>
                    setWeeklyData((d) => ({ ...d, continueIntent: opt.value }))
                  }
                  className="flex-1"
                >
                  {opt.label}
                </GlowButton>
              ))}
            </div>
          </GlowCard>

          <GlowCard variant="peach">
            <div className="mb-4 flex items-start gap-3">
              <Upload className="mt-0.5 h-6 w-6 flex-shrink-0 text-orange-600" />
              <div>
                <h3 className="mb-1 font-semibold">
                  Upload Weekly Progress Photo
                </h3>
                <p className="text-muted-foreground text-sm">
                  Track your skin improvement with photos every week
                </p>
              </div>
            </div>
            <GlowButton variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Choose Photo
            </GlowButton>
          </GlowCard>

          <GlowCard>
            <h3 className="mb-4 font-semibold">Additional Feedback</h3>
            <textarea
              className="border-border bg-background w-full rounded-lg border px-3 py-2"
              rows={4}
              placeholder="Share your experience, concerns, or questions..."
              value={weeklyData.notes}
              onChange={(e) =>
                setWeeklyData((d) => ({ ...d, notes: e.target.value }))
              }
            />
          </GlowCard>

          <div className="flex gap-3">
            <GlowButton variant="outline" className="flex-1">
              Request Consultation
            </GlowButton>
            <GlowButton size="lg" className="flex-1" onClick={handleSubmit}>
              Submit Weekly Review
            </GlowButton>
          </div>
        </div>
      )}
    </div>
  );
}
