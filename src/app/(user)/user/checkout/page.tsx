"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import {
  ChevronLeft,
  AlertTriangle,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import {
  useEcommerce,
  P,
} from "@/features/ecommerce/context/ecommerce-context";

export default function ShopCheckoutPage() {
  const { cart, conflicts, placeOrder } = useEcommerce();
  const router = useRouter();
  const [step, setStep] = useState<"review" | "confirm">("review");
  const [placing, setPlacing] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 60 ? 0 : 5;
  const total = subtotal + shipping;

  const handleConfirm = () => {
    setPlacing(true);
    setTimeout(() => {
      placeOrder();
      router.push("/user/order-success" as Route);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center"
        style={{ background: P.bg }}
      >
        <p style={{ color: P.muted }}>Your cart is empty.</p>
        <Link
          href={"/user/shop" as Route}
          style={{ color: P.blue }}
          className="mt-2"
        >
          Go to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ background: P.bg }}>
      <div className="mx-auto max-w-xl px-4">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => router.push("/user/cart" as Route)}
            className="flex cursor-pointer items-center gap-1 text-sm"
            style={{ color: P.blue }}
          >
            <ChevronLeft className="h-4 w-4" /> Back to Cart
          </button>
          <div
            className="ml-auto flex items-center gap-2 text-xs"
            style={{ color: P.muted }}
          >
            <span
              className="rounded-full px-2 py-1"
              style={{
                background: step === "review" ? P.blueLight : P.successSoft,
                color: step === "review" ? P.blue : P.success,
              }}
            >
              1. Review Order
            </span>
            <span>→</span>
            <span
              className="rounded-full px-2 py-1"
              style={{
                background: step === "confirm" ? P.blueLight : P.light,
                color: step === "confirm" ? P.blue : P.muted,
              }}
            >
              2. Confirm Purchase
            </span>
          </div>
        </div>

        {step === "review" && (
          <div>
            <h1 className="mb-6" style={{ color: P.text }}>
              Review Your Order
            </h1>

            <div
              className="mb-4 rounded-2xl border bg-white p-5"
              style={{ borderColor: P.border }}
            >
              <h3 className="mb-4" style={{ color: P.text }}>
                Products ({cart.length})
              </h3>
              <div className="space-y-3">
                {cart.map((item) => {
                  const conflicted = conflicts.some(
                    (c) =>
                      c.productA.id === item.product.id ||
                      c.productB.id === item.product.id,
                  );
                  return (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3"
                    >
                      <span className="text-2xl">{item.product.emoji}</span>
                      <div className="flex-1">
                        <p
                          className="text-sm font-medium"
                          style={{ color: P.text }}
                        >
                          {item.product.name}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <p className="text-xs" style={{ color: P.muted }}>
                            Qty {item.qty}
                          </p>
                          {conflicted ? (
                            <span
                              className="flex items-center gap-0.5 text-xs"
                              style={{ color: P.warning }}
                            >
                              <AlertTriangle className="h-3 w-3" /> Conflict
                              noted
                            </span>
                          ) : (
                            <span
                              className="flex items-center gap-0.5 text-xs"
                              style={{ color: P.success }}
                            >
                              <CheckCircle className="h-3 w-3" /> Compatible
                            </span>
                          )}
                        </div>
                      </div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: P.text }}
                      >
                        ${(item.product.price * item.qty).toFixed(0)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {conflicts.length > 0 && (
              <div
                className="mb-4 rounded-2xl p-4"
                style={{
                  background: P.warningSoft,
                  borderLeft: `4px solid ${P.warning}`,
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle
                    className="h-4 w-4"
                    style={{ color: P.warning }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: P.text }}
                  >
                    {conflicts.length} Ingredient Conflict
                    {conflicts.length > 1 ? "s" : ""} in Order
                  </span>
                </div>
                {conflicts.map((c, i) => (
                  <p key={i} className="text-sm" style={{ color: P.text }}>
                    • <strong>{c.rule.label}:</strong> {c.productA.name} and{" "}
                    {c.productB.name} — do not use on the same night.
                  </p>
                ))}
                <p className="mt-2 text-xs" style={{ color: P.muted }}>
                  Usage reminders will appear on your order confirmation.
                </p>
              </div>
            )}

            <div
              className="mb-4 rounded-2xl border bg-white p-5"
              style={{ borderColor: P.border }}
            >
              <h3 className="mb-4" style={{ color: P.text }}>
                Delivery Address
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Full Name", value: "Sarah Chen" },
                  { label: "Address", value: "123 Nguyen Hue, District 1" },
                  { label: "City", value: "Ho Chi Minh City" },
                  { label: "Phone", value: "+84 90 123 4567" },
                ].map((field) => (
                  <div key={field.label}>
                    <label
                      className="mb-1 block text-xs"
                      style={{ color: P.muted }}
                    >
                      {field.label}
                    </label>
                    <input
                      defaultValue={field.value}
                      className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none"
                      style={{
                        background: P.light,
                        border: `1px solid ${P.border}`,
                        color: P.text,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mb-6 rounded-2xl border bg-white p-5"
              style={{ borderColor: P.border }}
            >
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: P.muted }}>Subtotal</span>
                  <span style={{ color: P.text }}>${subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: P.muted }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? P.success : P.text }}>
                    {shipping === 0 ? "Free" : `$${shipping}`}
                  </span>
                </div>
                <div
                  className="border-t pt-2"
                  style={{ borderColor: P.border }}
                >
                  <div className="flex justify-between font-bold">
                    <span style={{ color: P.text }}>Total</span>
                    <span style={{ color: P.text }}>${total.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("confirm")}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-sm text-white"
              style={{ background: P.blue }}
            >
              <CreditCard className="h-4 w-4" /> Continue to Confirm Purchase
            </button>
          </div>
        )}

        {step === "confirm" && (
          <div>
            <h1 className="mb-2" style={{ color: P.text }}>
              Confirm Your Purchase
            </h1>
            <p className="mb-6 text-sm" style={{ color: P.muted }}>
              Review the summary below and confirm your order.
            </p>

            <div
              className="mb-4 rounded-2xl border bg-white p-5"
              style={{ borderColor: P.border }}
            >
              <h3 className="mb-3" style={{ color: P.text }}>
                Order Summary
              </h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {cart.map((item) => (
                  <span
                    key={item.product.id}
                    className="rounded-xl px-3 py-1.5 text-sm"
                    style={{ background: P.light, color: P.text }}
                  >
                    {item.product.emoji} {item.product.name} ×{item.qty}
                  </span>
                ))}
              </div>
              <div
                className="flex justify-between border-t pt-3 text-sm font-bold"
                style={{ borderColor: P.border, color: P.text }}
              >
                <span>Total</span>
                <span>${total.toFixed(0)}</span>
              </div>
            </div>

            <div
              className="mb-4 rounded-2xl border bg-white p-5"
              style={{ borderColor: P.border }}
            >
              <h3 className="mb-3" style={{ color: P.text }}>
                Payment Method
              </h3>
              <div
                className="flex items-center gap-3 rounded-xl p-3"
                style={{ background: P.light }}
              >
                <CreditCard className="h-5 w-5" style={{ color: P.blue }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: P.text }}>
                    Visa ending in 4242
                  </p>
                  <p className="text-xs" style={{ color: P.muted }}>
                    Demo payment — no charge
                  </p>
                </div>
                <span
                  className="ml-auto rounded-full px-2 py-0.5 text-xs"
                  style={{ background: P.successSoft, color: P.success }}
                >
                  Default
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={placing}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-sm text-white"
              style={{ background: placing ? "#94A3B8" : P.success }}
            >
              {placing ? (
                <>
                  <span className="animate-spin">⟳</span> Processing…
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" /> Confirm & Place Order — $
                  {total.toFixed(0)}
                </>
              )}
            </button>

            <button
              onClick={() => setStep("review")}
              className="mt-3 w-full cursor-pointer rounded-2xl border py-3 text-sm"
              style={{ borderColor: P.border, color: P.text }}
            >
              ← Back to Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
