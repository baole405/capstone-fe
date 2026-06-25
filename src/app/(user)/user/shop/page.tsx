"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import {
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import {
  useEcommerce,
  SHOP_PRODUCTS,
  ConflictModal,
  P,
} from "@/features/ecommerce/context/ecommerce-context";

export default function ShopCatalogPage() {
  const { cart, conflicts, addToCart, pendingAdd } = useEcommerce();
  const [justAdded, setJustAdded] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const handleAdd = (productId: string) => {
    const product = SHOP_PRODUCTS.find((p) => p.id === productId)!;
    const result = addToCart(product, "catalog");
    if (result === "added") {
      setJustAdded((p) => ({ ...p, [productId]: true }));
      setTimeout(
        () => setJustAdded((p) => ({ ...p, [productId]: false })),
        1800,
      );
    }
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const isInCart = (id: string) => cart.some((i) => i.product.id === id);
  const hasConflictWith = (id: string) =>
    conflicts.some((c) => c.productA.id === id || c.productB.id === id);

  return (
    <div className="min-h-screen py-8" style={{ background: P.bg }}>
      {pendingAdd && <ConflictModal />}

      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 style={{ color: P.text }}>Skincare Catalogue</h1>
            <p className="mt-1 text-sm" style={{ color: P.muted }}>
              Browse and add products — conflicts are detected automatically.
            </p>
          </div>
          <Link
            href={"/user/cart" as Route}
            className="relative flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-2.5 text-white"
            style={{ background: P.blue }}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-sm">Cart</span>
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: P.danger }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div
          className="mb-6 flex items-start gap-2 rounded-xl p-3 text-sm"
          style={{ background: P.warningSoft }}
        >
          <AlertTriangle
            className="mt-0.5 h-4 w-4 shrink-0"
            style={{ color: P.warning }}
          />
          <div style={{ color: P.text }}>
            <strong>Demo Scenario:</strong> Retinol Night Serum is already in
            your cart. Add the <strong>AHA Exfoliating Toner</strong> to trigger
            the conflict detection warning.
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ background: P.blueSoft, color: P.blue }}
          >
            Flow B — Direct Shopping
          </span>
          <Link
            href={"/user/treatment-survey" as Route}
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ background: "#E0F2FE", color: "#0369A1" }}
          >
            ← Flow A — From Recommendations
          </Link>
        </div>

        {conflicts.length > 0 && (
          <div
            className="mb-5 flex items-center gap-2 rounded-xl p-3 text-sm"
            style={{ background: P.dangerSoft }}
          >
            <AlertTriangle
              className="h-4 w-4 shrink-0"
              style={{ color: P.danger }}
            />
            <span style={{ color: P.danger }}>
              {conflicts.length} conflict{conflicts.length > 1 ? "s" : ""}{" "}
              detected in your cart.{" "}
              <Link
                href={"/user/cart" as Route}
                className="font-semibold underline"
              >
                View cart →
              </Link>
            </span>
          </div>
        )}

        <div className="mb-8 space-y-4">
          {SHOP_PRODUCTS.map((product) => {
            const inCart = isInCart(product.id);
            const hasConflict = inCart && hasConflictWith(product.id);

            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                style={{ borderColor: hasConflict ? P.warning : P.border }}
              >
                <div className="flex items-start gap-4 p-5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl"
                    style={{ background: P.light }}
                  >
                    {product.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold" style={{ color: P.text }}>
                          {product.name}
                        </p>
                        <p className="text-xs" style={{ color: P.muted }}>
                          {product.brand} · {product.category}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className="font-bold" style={{ color: P.text }}>
                          ${product.price}
                        </span>
                        {product.tag && (
                          <span
                            className="rounded-full px-2 py-0.5 text-xs"
                            style={{ background: P.blueSoft, color: P.blue }}
                          >
                            {product.tag}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mb-3 text-sm" style={{ color: P.muted }}>
                      {product.description}
                    </p>

                    <div className="mb-3 flex flex-wrap gap-1">
                      {product.ingredientLabels.map((ing) => (
                        <span
                          key={ing}
                          className="rounded-full px-2 py-0.5 text-xs"
                          style={{ background: P.light, color: P.text }}
                        >
                          {ing}
                        </span>
                      ))}
                    </div>

                    {hasConflict && (
                      <div
                        className="mb-2 flex items-center gap-1.5 text-xs"
                        style={{ color: P.warning }}
                      >
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        <span>Conflict detected in cart</span>
                      </div>
                    )}
                    {inCart && !hasConflict && (
                      <div
                        className="mb-2 flex items-center gap-1.5 text-xs"
                        style={{ color: P.success }}
                      >
                        <CheckCircle className="h-3 w-3 shrink-0" />
                        <span>In cart — no conflicts</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link
                        href={`/user/shop/${product.id}` as Route}
                        className="cursor-pointer rounded-xl border px-4 py-2 text-sm"
                        style={{ borderColor: P.border, color: P.text }}
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleAdd(product.id)}
                        disabled={justAdded[product.id]}
                        className="flex-1 cursor-pointer rounded-xl py-2 text-sm text-white transition-all"
                        style={{
                          background: justAdded[product.id]
                            ? P.success
                            : inCart
                              ? "#64748B"
                              : P.blue,
                        }}
                      >
                        {justAdded[product.id]
                          ? "✓ Added"
                          : inCart
                            ? "Add Another"
                            : "+ Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {cartCount > 0 && (
          <div className="fixed right-0 bottom-6 left-0 z-40 flex justify-center px-4">
            <button
              onClick={() => router.push("/user/cart" as Route)}
              className="flex items-center gap-3 rounded-2xl px-6 py-3.5 text-white shadow-lg"
              style={{ background: P.blue }}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>
                View Cart — {cartCount} item{cartCount > 1 ? "s" : ""}
              </span>
              {conflicts.length > 0 && (
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-bold"
                  style={{ background: P.warning, color: "#fff" }}
                >
                  {conflicts.length} conflict
                </span>
              )}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
