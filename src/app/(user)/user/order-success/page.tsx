"use client";

import Link from "next/link";
import type { Route } from "next";
import {
  CheckCircle,
  AlertTriangle,
  Moon,
  Sun,
  Package,
  Sparkles,
} from "lucide-react";
import {
  useEcommerce,
  P,
} from "@/features/ecommerce/context/ecommerce-context";

export default function ShopOrderSuccessPage() {
  const { orderId, completedCart, completedConflicts, clearOrder } =
    useEcommerce();

  if (!orderId) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center"
        style={{ background: P.bg }}
      >
        <p style={{ color: P.muted }}>No order found.</p>
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

  const subtotal = completedCart.reduce(
    (s, i) => s + i.product.price * i.qty,
    0,
  );
  const orderTotal = subtotal + (subtotal > 60 ? 0 : 5);

  const usageReminders = completedConflicts.map((c) => ({
    label: c.rule.label,
    reminder: `Avoid using ${c.productA.name} and ${c.productB.name} in the same evening routine. Alternate nights for best results.`,
  }));

  return (
    <div className="min-h-screen py-8" style={{ background: P.bg }}>
      <div className="mx-auto max-w-xl px-4">
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full"
            style={{ background: P.successSoft }}
          >
            <CheckCircle className="h-12 w-12" style={{ color: P.success }} />
          </div>
          <h1 style={{ color: P.text }}>Order Placed!</h1>
          <p className="mt-1 text-sm" style={{ color: P.muted }}>
            Your skincare products are on their way.
          </p>
          <div
            className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2"
            style={{ background: P.light }}
          >
            <Package className="h-4 w-4" style={{ color: P.blue }} />
            <span className="text-sm font-bold" style={{ color: P.text }}>
              Order #{orderId}
            </span>
          </div>
        </div>

        <div
          className="mb-4 rounded-2xl border bg-white p-5"
          style={{ borderColor: P.border }}
        >
          <h3 className="mb-4" style={{ color: P.text }}>
            Purchased Products
          </h3>
          <div className="space-y-3">
            {completedCart.map((item) => {
              const conflicted = completedConflicts.some(
                (c) =>
                  c.productA.id === item.product.id ||
                  c.productB.id === item.product.id,
              );
              return (
                <div key={item.product.id} className="flex items-center gap-3">
                  <span className="text-2xl">{item.product.emoji}</span>
                  <div className="flex-1">
                    <p
                      className="text-sm font-medium"
                      style={{ color: P.text }}
                    >
                      {item.product.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs" style={{ color: P.muted }}>
                        {item.product.brand} · Qty {item.qty}
                      </p>
                      {item.addedFrom === "recommendation" && (
                        <span className="text-xs" style={{ color: P.blue }}>
                          ✦ Recommended
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: P.text }}
                    >
                      ${(item.product.price * item.qty).toFixed(0)}
                    </p>
                    {conflicted ? (
                      <span className="text-xs" style={{ color: P.warning }}>
                        ⚠ See reminders
                      </span>
                    ) : (
                      <span className="text-xs" style={{ color: P.success }}>
                        ✓ Compatible
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="border-t pt-3" style={{ borderColor: P.border }}>
              <div className="flex justify-between text-sm font-bold">
                <span style={{ color: P.text }}>Order Total</span>
                <span style={{ color: P.text }}>${orderTotal.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {completedConflicts.length > 0 && (
          <div
            className="mb-4 rounded-2xl p-5"
            style={{
              borderLeft: `4px solid ${P.warning}`,
              background: P.warningSoft,
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" style={{ color: P.warning }} />
              <h3 style={{ color: P.text }}>
                Conflict Summary & Usage Reminders
              </h3>
            </div>
            <p className="mb-4 text-xs" style={{ color: P.muted }}>
              Your order contains products with known ingredient interactions.
              Follow these reminders to use them safely.
            </p>
            {usageReminders.map((r, i) => (
              <div key={i} className="mb-3 rounded-xl bg-white p-4 last:mb-0">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-bold"
                    style={{ background: P.warningSoft, color: P.warning }}
                  >
                    {r.label}
                  </span>
                </div>
                <p className="text-sm" style={{ color: P.text }}>
                  {r.reminder}
                </p>
                <div className="mt-3 flex gap-3">
                  <div
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: P.blue }}
                  >
                    <Sun className="h-3 w-3" /> AM — use one product
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "#6366F1" }}
                  >
                    <Moon className="h-3 w-3" /> PM — alternate nights
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {completedConflicts.length === 0 && (
          <div
            className="mb-4 flex items-center gap-3 rounded-2xl p-4"
            style={{ background: P.successSoft }}
          >
            <CheckCircle
              className="h-5 w-5 shrink-0"
              style={{ color: P.success }}
            />
            <div>
              <p className="text-sm font-semibold" style={{ color: P.success }}>
                No Ingredient Conflicts
              </p>
              <p className="text-xs" style={{ color: P.muted }}>
                All products in your order are compatible with each other.
              </p>
            </div>
          </div>
        )}

        <div
          className="mb-6 rounded-2xl border bg-white p-5"
          style={{ borderColor: P.border }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4" style={{ color: P.blue }} />
            <h3 style={{ color: P.text }}>What&apos;s Next?</h3>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={"/user/routine" as Route}
              className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm text-white"
              style={{ background: P.blue }}
            >
              <Sparkles className="h-4 w-4" /> View Your Routine
            </Link>
            <Link
              href={"/user/treatment-survey" as Route}
              className="flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm"
              style={{ borderColor: P.border, color: P.text }}
            >
              Start a New Treatment Survey
            </Link>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href={"/user/shop" as Route}
            onClick={clearOrder}
            className="flex-1 cursor-pointer rounded-2xl border py-3 text-center text-sm"
            style={{ borderColor: P.border, color: P.text }}
          >
            Continue Shopping
          </Link>
          <Link
            href={"/user" as Route}
            onClick={clearOrder}
            className="flex-1 cursor-pointer rounded-2xl py-3 text-center text-sm text-white"
            style={{ background: P.blue }}
          >
            Finish Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
