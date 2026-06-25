"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useApp } from "@/features/app-context/context/app-context";
import { mockAIResult } from "@/lib/mock-data";
import { GlowCard } from "@/components/glow/card";
import { Sparkles } from "lucide-react";

export default function AIAnalyzingPage() {
  const router = useRouter();
  const { setAiResult, photoUploaded } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAiResult(mockAIResult);
      router.push("/user/assessment/result" as Route);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, setAiResult]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center">
      <GlowCard variant="lavender" padding="lg" className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-primary flex h-20 w-20 animate-pulse items-center justify-center rounded-full">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mb-4 text-2xl font-bold">Analyzing Your Skin</h2>
        <p className="text-muted-foreground mb-6">
          {photoUploaded
            ? "Processing your survey responses and photo..."
            : "Processing your survey responses..."}
        </p>
        <div className="mx-auto max-w-md space-y-2 text-left text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-primary h-4 w-4 animate-pulse rounded-full" />
            <span>Analyzing skin type and concerns</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="bg-primary h-4 w-4 animate-pulse rounded-full"
              style={{ animationDelay: "200ms" }}
            />
            <span>Mapping to product ingredients</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="bg-primary h-4 w-4 animate-pulse rounded-full"
              style={{ animationDelay: "400ms" }}
            />
            <span>Generating personalized recommendations</span>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
