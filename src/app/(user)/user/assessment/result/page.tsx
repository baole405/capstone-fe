"use client";

import Link from "next/link";
import type { Route } from "next";
import { useApp } from "@/features/app-context/context/app-context";
import { GlowButton } from "@/components/glow/button";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import {
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  FileText,
} from "lucide-react";

export default function AIResultPage() {
  const { aiResult, surveyData, photoUploaded } = useApp();

  if (!aiResult) {
    return (
      <div className="mx-auto max-w-2xl">
        <GlowCard>
          <p>
            No assessment results available. Please complete the assessment
            first.
          </p>
          <Link href={"/user/assessment" as Route}>
            <GlowButton className="mt-4">Start Assessment</GlowButton>
          </Link>
        </GlowCard>
      </div>
    );
  }

  const getSeverityColor = (level: string) => {
    if (level === "low") return "bg-green-50";
    if (level === "moderate") return "bg-yellow-50";
    return "bg-orange-50";
  };

  const aiMetrics = [
    {
      label: "Acne Severity",
      value: aiResult.acneSeverity,
      color: getSeverityColor(aiResult.acneSeverity),
    },
    {
      label: "Dark Spots",
      value: aiResult.darkSpots,
      color: getSeverityColor(aiResult.darkSpots),
    },
    {
      label: "Pore Visibility",
      value: aiResult.poreVisibility,
      color: getSeverityColor(aiResult.poreVisibility),
    },
    {
      label: "Fine Lines",
      value: aiResult.fineLines,
      color: getSeverityColor(aiResult.fineLines),
    },
  ];

  const surveyMetrics = [
    {
      label: "Skin Oiliness",
      value:
        surveyData?.skinType === "oily"
          ? "High during day"
          : surveyData?.skinType === "dry"
            ? "Rarely oily"
            : surveyData?.skinType === "combination"
              ? "T-zone oily"
              : "Balanced",
      color: "bg-blue-50",
    },
    {
      label: "Skin Hydration",
      value:
        surveyData?.skinType === "dry"
          ? "Often tight"
          : surveyData?.skinType === "oily"
            ? "Well-hydrated"
            : "Normal feel",
      color: "bg-green-50",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Skin Analysis Results</h1>
          <GlowBadge variant="success">Complete</GlowBadge>
        </div>
        <p className="text-muted-foreground">
          AI analysis based on{" "}
          {photoUploaded ? "survey + photo" : "survey data only"}
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <GlowCard className="md:col-span-1">
          <div className="mb-4 flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-orange-100 to-purple-100">
            {photoUploaded ? (
              <div className="text-muted-foreground text-center">
                <p className="text-sm">Face Analysis</p>
                <p className="mt-1 text-xs">Photo processed</p>
              </div>
            ) : (
              <div className="text-muted-foreground text-center">
                <p className="text-sm">No photo</p>
                <p className="mt-1 text-xs">Survey-based</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-muted-foreground text-sm">
                Skin Type (from survey)
              </p>
              <p className="font-semibold capitalize">
                {surveyData?.skinType ?? "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">AI Confidence</p>
              <div className="flex items-center gap-2">
                <div className="bg-secondary h-2 flex-1 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${aiResult.confidence}%` }}
                  />
                </div>
                <span className="font-semibold">{aiResult.confidence}%</span>
              </div>
            </div>
          </div>
        </GlowCard>

        <GlowCard className="md:col-span-2">
          <div className="space-y-6">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <h3 className="font-semibold">AI Visual Analysis</h3>
                <GlowBadge variant="purple" className="text-xs">
                  Photo-based
                </GlowBadge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {aiMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className={`rounded-lg p-3 ${metric.color}`}
                  >
                    <p className="text-muted-foreground mb-1 text-sm">
                      {metric.label}
                    </p>
                    <p className="text-lg font-semibold capitalize">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold">Your Reported Skin Feel</h3>
                <GlowBadge variant="info" className="text-xs">
                  Survey-based
                </GlowBadge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {surveyMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className={`rounded-lg p-3 ${metric.color}`}
                  >
                    <p className="text-muted-foreground mb-1 text-sm">
                      {metric.label}
                    </p>
                    <p className="text-sm font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                Based on your survey responses about how your skin feels
              </p>
            </div>
          </div>
        </GlowCard>
      </div>

      <GlowCard variant="yellow" className="mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div className="flex-1">
            <p className="mb-1 font-semibold">Important Disclaimers</p>
            <div className="text-muted-foreground space-y-2 text-sm">
              <p>
                <strong>AI Analysis Limitations:</strong> Our AI analyzes only
                visually observable features (acne, spots, pores, fine lines).
                Skin hydration and oiliness are based on your self-reported
                feelings, not measured by camera.
              </p>
              <p>
                <strong>Not Medical Diagnosis:</strong> GlowScan provides
                aesthetic skincare support only. For medical skin concerns,
                please consult a licensed dermatologist.
              </p>
            </div>
          </div>
        </div>
      </GlowCard>

      <GlowCard variant="mint" className="mb-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="flex-1">
            <p className="mb-1 font-semibold">Main Concerns Identified</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {surveyData?.concerns?.map((concern) => (
                <GlowBadge key={concern}>{concern}</GlowBadge>
              ))}
            </div>
          </div>
        </div>
      </GlowCard>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href={"/user/recommendations" as Route} className="flex-1">
          <GlowButton className="w-full" size="lg">
            View Product Recommendations
            <ArrowRight className="ml-2 h-5 w-5" />
          </GlowButton>
        </Link>
        <Link href={"/user/consultation" as Route}>
          <GlowButton variant="outline" size="lg" className="w-full sm:w-auto">
            Book Consultation
          </GlowButton>
        </Link>
      </div>
    </div>
  );
}
