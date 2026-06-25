"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useApp } from "@/features/app-context/context/app-context";
import { GlowButton } from "@/components/glow/button";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { Upload, Camera, ArrowRight, Info } from "lucide-react";

export default function PhotoUploadPage() {
  const router = useRouter();
  const { setPhotoUploaded } = useApp();
  const [uploaded, setUploaded] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (uploaded) setPhotoUploaded(true);
    router.push("/user/assessment/analyzing" as Route);
  };

  const handleSkip = () => {
    setPhotoUploaded(false);
    router.push("/user/assessment/analyzing" as Route);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Upload Photo (Optional)</h1>
          <GlowBadge variant="info">Photo optional</GlowBadge>
        </div>
        <p className="text-muted-foreground">
          Upload a clear photo of your face for enhanced AI analysis
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlowCard padding="lg">
          <h3 className="mb-4 font-semibold">Upload Photo</h3>

          {!preview ? (
            <label className="border-border hover:border-primary hover:bg-accent flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="text-muted-foreground mb-4 h-12 w-12" />
              <p className="text-foreground mb-1 text-sm">Click to upload</p>
              <p className="text-muted-foreground text-xs">
                PNG, JPG up to 10MB
              </p>
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="h-64 w-full object-cover"
                />
              </div>
              <GlowButton
                variant="outline"
                onClick={() => {
                  setPreview(null);
                  setUploaded(false);
                }}
                className="w-full"
              >
                Change Photo
              </GlowButton>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <GlowButton
              onClick={handleContinue}
              disabled={!uploaded}
              className="w-full"
            >
              <Camera className="mr-2 h-4 w-4" />
              Continue with Photo
            </GlowButton>
            <GlowButton
              variant="outline"
              onClick={handleSkip}
              className="w-full"
            >
              Continue without photo
              <ArrowRight className="ml-2 h-4 w-4" />
            </GlowButton>
          </div>
        </GlowCard>

        <div className="space-y-4">
          <GlowCard variant="lavender" padding="md">
            <h4 className="mb-2 font-semibold">Photo Guidelines</h4>
            <ul className="text-foreground space-y-2 text-sm">
              <li>• Face the camera directly</li>
              <li>• Good lighting, no shadows</li>
              <li>• No makeup preferred</li>
              <li>• Neutral expression</li>
              <li>• Clear, high-resolution image</li>
            </ul>
          </GlowCard>

          <GlowCard variant="sky">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div className="text-sm">
                <p className="mb-1 font-medium">Photo is optional</p>
                <p className="text-muted-foreground">
                  Our AI recommendations work with survey data alone. The photo
                  provides additional insights for acne severity, oiliness, and
                  other visual markers.
                </p>
              </div>
            </div>
          </GlowCard>

          <GlowCard variant="yellow">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
              <div className="text-sm">
                <p className="mb-1 font-medium">Not medical diagnosis</p>
                <p className="text-muted-foreground">
                  GlowScan provides aesthetic skincare support only. This is not
                  a medical diagnosis or treatment.
                </p>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm">
          Last survey updated: May 16, 2026 ·{" "}
          <button className="text-primary hover:underline">
            Refresh survey
          </button>
        </p>
      </div>
    </div>
  );
}
