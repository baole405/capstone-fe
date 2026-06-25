"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useApp } from "@/features/app-context/context/app-context";
import { GlowButton } from "@/components/glow/button";
import { GlowCard } from "@/components/glow/card";
import { GlowInput } from "@/components/glow/input";
import { GlowBadge } from "@/components/glow/badge";
import { skinTypeOptions, concernOptions } from "@/lib/mock-data";
import type { SkinType, SkinConcern } from "@/lib/domain-types";
import { ChevronRight, ChevronLeft, Info } from "lucide-react";

export default function AssessmentPage() {
  const router = useRouter();
  const { setSurveyData } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    skinType: "" as SkinType,
    region: "Ho Chi Minh City",
    age: "25-34",
    gender: "Female",
    allergies: [] as string[],
    currentRoutine: "",
    currentTreatment: "",
    skinGoals: [] as string[],
    expectations: "",
    concerns: [] as SkinConcern[],
  });
  const [showDefaultInfo, setShowDefaultInfo] = useState(false);
  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const finalSkinType =
        formData.skinType === ("unknown" as SkinType)
          ? "normal"
          : formData.skinType;
      setSurveyData({ ...formData, skinType: finalSkinType });
      router.push("/user/assessment/photo" as Route);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleConcern = (concern: SkinConcern) => {
    setFormData((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter((c) => c !== concern)
        : [...prev.concerns, concern],
    }));
  };

  const handleSkinTypeChange = (type: SkinType) => {
    setFormData((prev) => ({ ...prev, skinType: type }));
    if (type === ("unknown" as SkinType)) {
      setShowDefaultInfo(true);
      setTimeout(() => setShowDefaultInfo(false), 5000);
    } else {
      setShowDefaultInfo(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Skin Assessment Survey</h1>
          <GlowBadge variant="info">Survey-primary</GlowBadge>
        </div>
        <p className="text-muted-foreground">
          Help us understand your skin to provide personalized recommendations
        </p>
        <div className="mt-6">
          <div className="text-muted-foreground mb-2 flex justify-between text-sm">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <GlowCard padding="lg">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium">
                What is your skin type?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {skinTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleSkinTypeChange(option.value as SkinType)
                    }
                    className={`rounded-lg border-2 p-4 transition-all ${
                      formData.skinType === option.value
                        ? "border-primary bg-purple-50"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
              {showDefaultInfo && (
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3">
                  <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <p className="text-foreground text-sm">
                    We&apos;ll use Normal as default. You can update this later.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">
                Select your main skin concerns
              </label>
              <div className="grid grid-cols-2 gap-3">
                {concernOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleConcern(option.value as SkinConcern)}
                    className={`rounded-lg border-2 p-3 transition-all ${
                      formData.concerns.includes(option.value as SkinConcern)
                        ? "border-primary bg-green-50"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <GlowInput
              label="Region / Climate"
              value={formData.region}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, region: e.target.value }))
              }
            />

            <div>
              <label className="mb-3 block text-sm font-medium">
                Age Range
              </label>
              <select
                value={formData.age}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, age: e.target.value }))
                }
                className="border-border bg-background w-full rounded-lg border px-3 py-2"
              >
                <option>18-24</option>
                <option>25-34</option>
                <option>35-44</option>
                <option>45-54</option>
                <option>55+</option>
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border-border bg-background w-full rounded-lg border px-3 py-2"
              >
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Known allergies (comma separated)
              </label>
              <GlowInput
                placeholder="e.g., Fragrance, Alcohol, Parabens"
                value={formData.allergies.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    allergies: e.target.value
                      .split(",")
                      .map((a) => a.trim())
                      .filter(Boolean),
                  }))
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Current skincare routine
              </label>
              <textarea
                value={formData.currentRoutine}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    currentRoutine: e.target.value,
                  }))
                }
                className="border-border bg-background min-h-[100px] w-full rounded-lg border px-3 py-2"
                placeholder="Describe your current morning and evening routine..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Current treatment / medication
              </label>
              <GlowInput
                value={formData.currentTreatment}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    currentTreatment: e.target.value,
                  }))
                }
                placeholder="e.g., Tretinoin, Benzoyl Peroxide"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                What are your skin goals?
              </label>
              <textarea
                value={formData.skinGoals.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    skinGoals: [e.target.value],
                  }))
                }
                className="border-border bg-background min-h-[80px] w-full rounded-lg border px-3 py-2"
                placeholder="e.g., Clear acne, reduce oiliness, improve texture"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                What are your expectations from this assessment?
              </label>
              <textarea
                value={formData.expectations}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expectations: e.target.value,
                  }))
                }
                className="border-border bg-background min-h-[100px] w-full rounded-lg border px-3 py-2"
                placeholder="Tell us what you hope to achieve..."
              />
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <GlowButton
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </GlowButton>
          <GlowButton onClick={handleNext}>
            {step === totalSteps ? "Continue" : "Next"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </GlowButton>
        </div>
      </GlowCard>

      <GlowCard variant="sky" className="mt-6">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div className="text-sm">
            <p className="mb-1 font-medium">Survey-based assessment</p>
            <p className="text-muted-foreground">
              Your skin type comes from this survey. The optional photo in the
              next step provides additional analysis but is not required for
              recommendations.
            </p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
