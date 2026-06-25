"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import {
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  useEcommerce,
  ConflictModal,
  P,
} from "@/features/ecommerce/context/ecommerce-context";

export default function ShopCartPage() {
  const { cart, conflicts, pendingAdd, removeFromCart, updateQty } =
    useEcommerce();
  const router = useRouter();

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 60 ? 0 : 5;
  const total = subtotal + shipping;

  const itemConflicted = (id: string) =>
    conflicts.some((c) => c.productA.id === id || c.productB.id === id);

  if (cart.length === 0) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center py-16"
        style={{ background: P.bg }}
      >
        <div
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: P.light }}
        >
          <ShoppingCart className="h-10 w-10" style={{ color: P.muted }} />
        </div>
        <h2 className="mb-2" style={{ color: P.text }}>
          Your cart is empty
        </h2>
        <p className="mb-6 text-sm" style={{ color: P.muted }}>
          Browse the catalogue to add products.
        </p>
        <Link
          href={"/user/shop" as Route}
          className="rounded-2xl px-6 py-3 text-sm text-white"
          style={{ background: P.blue }}
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ background: P.bg }}>
      {pendingAdd && <ConflictModal />}

      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 style={{ color: P.text }}>Your Cart</h1>
          <Link
            href={"/user/shop" as Route}
            className="text-sm"
            style={{ color: P.blue }}
          >
            ← Continue Shopping
          </Link>
        </div>

        <div
          className="mb-5 rounded-2xl border bg-white p-4"
          style={{ borderColor: P.border }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-lg"
              style={{ background: P.blueSoft }}
            >
              <Sparkles className="h-3.5 w-3.5" style={{ color: P.blue }} />
            </div>
            <span className="text-sm font-semibold" style={{ color: P.text }}>
              Conflict Detection Engine
            </span>
            <span
              className="ml-auto rounded-full px-2 py-0.5 text-xs"
              style={{ background: P.successSoft, color: P.success }}
            >
              Active
            </span>
          </div>
          {conflicts.length === 0 ? (
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: P.success }}
            >
              <CheckCircle className="h-4 w-4" />
              No ingredient conflicts detected — your cart is compatible.
            </div>
          ) : (
            <div className="space-y-2">
              {conflicts.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-xl p-3 text-sm"
                  style={{ background: P.warningSoft }}
                >
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: P.warning }}
                  />
                  <div style={{ color: P.text }}>
                    <strong>{c.rule.label}</strong> — {c.productA.name}{" "}
                    conflicts with {c.productB.name}.
                    <p className="mt-0.5 text-xs" style={{ color: P.muted }}>
                      Do not use on the same night.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-5 space-y-3">
          {cart.map((item) => {
            const conflicted = itemConflicted(item.product.id);
            return (
              <div
                key={item.product.id}
                className="rounded-2xl border bg-white p-4"
                style={{ borderColor: conflicted ? P.warning : P.border }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                    style={{ background: P.light }}
                  >
                    {item.product.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: P.text }}
                        >
                          {item.product.name}
                        </p>
                        <p className="text-xs" style={{ color: P.muted }}>
                          {item.product.brand} · {item.product.category}
                        </p>
                        {item.addedFrom === "recommendation" && (
                          <span
                            className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs"
                            style={{ background: P.blueSoft, color: P.blue }}
                          >
                            From Recommendations
                          </span>
                        )}
                      </div>
                      <p
                        className="shrink-0 font-bold"
                        style={{ color: P.text }}
                      >
                        ${(item.product.price * item.qty).toFixed(0)}
                      </p>
                    </div>

                    <div className="my-2 flex items-center gap-2">
                      {conflicted ? (
                        <span
                          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                          style={{
                            background: P.warningSoft,
                            color: P.warning,
                          }}
                        >
                          <AlertTriangle className="h-3 w-3" /> Conflict
                          Detected
                        </span>
                      ) : (
                        <span
                          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                          style={{
                            background: P.successSoft,
                            color: P.success,
                          }}
                        >
                          <CheckCircle className="h-3 w-3" /> No Conflict
                        </span>
                      )}
                      <span className="text-xs" style={{ color: P.muted }}>
                        ${item.product.price} each
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center gap-2 rounded-xl border px-2 py-1"
                        style={{ borderColor: P.border }}
                      >
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.qty - 1)
                          }
                          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg"
                          style={{ background: P.light }}
                        >
                          <Minus
                            className="h-3 w-3"
                            style={{ color: P.text }}
                          />
                        </button>
                        <span
                          className="w-4 text-center text-sm"
                          style={{ color: P.text }}
                        >
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.qty + 1)
                          }
                          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg"
                          style={{ background: P.light }}
                        >
                          <Plus className="h-3 w-3" style={{ color: P.text }} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="flex cursor-pointer items-center gap-1 text-xs"
                        style={{ color: P.danger }}
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mb-5 rounded-2xl border bg-white p-5"
          style={{ borderColor: P.border }}
        >
          <h3 className="mb-4" style={{ color: P.text }}>
            Order Summary
          </h3>
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: P.muted }}>
                Subtotal ({cart.length} item{cart.length > 1 ? "s" : ""})
              </span>
              <span style={{ color: P.text }}>${subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: P.muted }}>Shipping</span>
              <span style={{ color: shipping === 0 ? P.success : P.text }}>
                {shipping === 0 ? "Free" : `$${shipping}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs" style={{ color: P.muted }}>
                Add ${60 - subtotal} more for free shipping
              </p>
            )}
            <div className="border-t pt-2" style={{ borderColor: P.border }}>
              <div className="flex justify-between font-bold">
                <span style={{ color: P.text }}>Total</span>
                <span style={{ color: P.text }}>${total.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {conflicts.length > 0 && (
            <div
              className="mb-4 rounded-xl p-3 text-xs"
              style={{ background: P.warningSoft, color: P.text }}
            >
              ⚠️ Your cart has {conflicts.length} ingredient conflict
              {conflicts.length > 1 ? "s" : ""}. You can still proceed —
              conflicts are shown on the success screen as usage reminders.
            </div>
          )}

          <button
            onClick={() => router.push("/user/checkout" as Route)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-3.5 text-sm text-white"
            style={{ background: P.blue }}
          >
            Proceed to Checkout <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="text-center">
          <Link
            href={"/user/shop" as Route}
            className="text-sm"
            style={{ color: P.blue }}
          >
            + Add more products from the catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
