"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { useGlowToast } from "@/components/glow/toast";
import { Users, Stethoscope, Calendar, DollarSign } from "lucide-react";

export default function ConsultationPage() {
  const router = useRouter();
  const { showToast } = useGlowToast();
  const [selectedType, setSelectedType] = useState<"staff" | "expert" | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      showToast("Please select both date and time", "error");
      return;
    }

    if (selectedType === "expert") {
      showToast("Processing payment...", "info");
      setTimeout(() => {
        showToast(
          "Payment successful! Creating treatment workspace...",
          "success",
        );
        setTimeout(() => {
          router.push("/user/treatment-workspace-created" as Route);
        }, 1000);
      }, 1500);
    } else {
      showToast(
        "Booking confirmed! Creating treatment workspace...",
        "success",
      );
      setTimeout(() => {
        router.push("/user/treatment-workspace-created" as Route);
      }, 1000);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Book Consultation</h1>
        <p className="text-muted-foreground">
          Get personalized skincare advice from our staff or certified experts
        </p>
      </div>

      {!selectedType ? (
        <div className="grid gap-6 md:grid-cols-2">
          <GlowCard
            variant="sky"
            padding="lg"
            className="cursor-pointer transition-shadow hover:shadow-lg"
            onClick={() => setSelectedType("staff")}
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold">Staff Consultation</h2>
              <GlowBadge variant="success" className="mb-4">
                Free
              </GlowBadge>
              <ul className="mb-6 space-y-2 text-left">
                {[
                  "General skincare advice",
                  "Product recommendations",
                  "Routine building support",
                  "Order support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <GlowButton className="w-full">
                Select Staff Consultation
              </GlowButton>
            </div>
          </GlowCard>

          <GlowCard
            variant="lavender"
            padding="lg"
            className="cursor-pointer transition-shadow hover:shadow-lg"
            onClick={() => setSelectedType("expert")}
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <Stethoscope className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold">Expert Consultation</h2>
              <GlowBadge variant="warning" className="mb-4">
                150,000 VNĐ
              </GlowBadge>
              <ul className="mb-6 space-y-2 text-left">
                {[
                  "Certified skincare expert",
                  "Detailed skin analysis review",
                  "Custom treatment plan",
                  "Active ingredient mapping",
                  "Ongoing progress tracking",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-purple-600">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <GlowButton className="w-full">
                Select Expert Consultation
              </GlowButton>
            </div>
          </GlowCard>
        </div>
      ) : (
        <div>
          <GlowButton
            variant="outline"
            className="mb-6"
            onClick={() => setSelectedType(null)}
          >
            ← Back to selection
          </GlowButton>

          <GlowCard
            variant={selectedType === "staff" ? "sky" : "lavender"}
            padding="lg"
          >
            <h2 className="mb-4 text-2xl font-bold">
              {selectedType === "staff"
                ? "Staff Consultation"
                : "Expert Consultation"}
            </h2>

            {selectedType === "expert" && (
              <GlowCard className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-200 to-orange-200" />
                  <div>
                    <h3 className="font-semibold">Dr. Minh Anh</h3>
                    <p className="text-muted-foreground text-sm">
                      Certified Skincare Expert
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Specialization: Acne-prone skin, active ingredients
                    </p>
                  </div>
                </div>
              </GlowCard>
            )}

            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border-border w-full rounded-lg border bg-white px-3 py-2"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"].map(
                    (time) => (
                      <GlowButton
                        key={time}
                        variant={selectedTime === time ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        <Calendar className="mr-1 h-4 w-4" />
                        {time}
                      </GlowButton>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Additional notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="border-border min-h-[100px] w-full rounded-lg border bg-white px-3 py-2"
                  placeholder="Describe your concerns or questions..."
                />
              </div>

              {selectedType === "expert" && (
                <GlowCard variant="yellow">
                  <div className="flex items-start gap-3">
                    <DollarSign className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                    <div>
                      <p className="mb-1 font-semibold">Payment Required</p>
                      <p className="text-muted-foreground text-sm">
                        Expert consultation fee: 150,000 VNĐ (Sandbox payment)
                      </p>
                    </div>
                  </div>
                </GlowCard>
              )}

              <GlowButton
                size="lg"
                className="w-full"
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
              >
                {selectedType === "staff"
                  ? "Book Free Consultation"
                  : "Proceed to Payment"}
              </GlowButton>
            </div>
          </GlowCard>
        </div>
      )}
    </div>
  );
}
