"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type { Route } from "next";
import {
  ChevronLeft,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import {
  useEcommerce,
  SHOP_PRODUCTS,
  ConflictModal,
  P,
} from "@/features/ecommerce/context/ecommerce-context";

export default function ShopProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { cart, conflicts, addToCart, pendingAdd } = useEcommerce();
  const router = useRouter();
  const [justAdded, setJustAdded] = useState(false);

  const product = SHOP_PRODUCTS.find((p) => p.id === id);
  if (!product) {
    return (
      <div
        className="mx-auto max-w-xl py-16 text-center"
        style={{ color: P.muted }}
      >
        Product not found.{" "}
        <Link href={"/user/shop" as Route} style={{ color: P.blue }}>
          Back to catalogue
        </Link>
      </div>
    );
  }

  const inCart = cart.some((i) => i.product.id === product.id);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const hasConflict = conflicts.some(
    (c) => c.productA.id === product.id || c.productB.id === product.id,
  );
  const relevantConflicts = conflicts.filter(
    (c) => c.productA.id === product.id || c.productB.id === product.id,
  );

  const handleAdd = () => {
    const result = addToCart(product, "catalog");
    if (result === "added") {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    }
  };

  return (
    <div className="min-h-screen py-8" style={{ background: P.bg }}>
      {pendingAdd && <ConflictModal />}

      <div className="mx-auto max-w-xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/user/shop" as Route)}
            className="flex cursor-pointer items-center gap-1 text-sm"
            style={{ color: P.blue }}
          >
            <ChevronLeft className="h-4 w-4" /> Back to Catalogue
          </button>
          <Link
            href={"/user/cart" as Route}
            className="relative flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: P.blueSoft, color: P.blue }}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm">{cartCount}</span>
          </Link>
        </div>

        <div
          className="mb-6 flex items-center justify-center rounded-2xl"
          style={{ background: P.light, height: 220 }}
        >
          <span style={{ fontSize: 96 }}>{product.emoji}</span>
        </div>

        <div className="mb-4">
          <div className="mb-1 flex items-start justify-between gap-3">
            <div>
              <h1 style={{ color: P.text }}>{product.name}</h1>
              <p className="text-sm" style={{ color: P.muted }}>
                {product.brand} · {product.category}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-2xl font-bold" style={{ color: P.text }}>
                ${product.price}
              </p>
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
        </div>

        {inCart && !hasConflict && (
          <div
            className="mb-4 flex items-center gap-2 rounded-xl p-3 text-sm"
            style={{ background: P.successSoft }}
          >
            <CheckCircle
              className="h-4 w-4 shrink-0"
              style={{ color: P.success }}
            />
            <span style={{ color: P.success }}>
              In your cart — no conflicts with other products
            </span>
          </div>
        )}
        {relevantConflicts.map((c, i) => (
          <div
            key={i}
            className="mb-3 flex items-start gap-2 rounded-xl p-3 text-sm"
            style={{ background: P.warningSoft }}
          >
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ color: P.warning }}
            />
            <div style={{ color: P.text }}>
              <strong>Conflict:</strong> {c.rule.label} —{" "}
              {c.rule.explanation.slice(0, 100)}…
            </div>
          </div>
        ))}

        <div
          className="mb-4 rounded-2xl border bg-white p-5"
          style={{ borderColor: P.border }}
        >
          <h3 className="mb-2" style={{ color: P.text }}>
            About This Product
          </h3>
          <p className="text-sm" style={{ color: P.muted }}>
            {product.longDescription}
          </p>
        </div>

        <div
          className="mb-4 rounded-2xl border bg-white p-5"
          style={{ borderColor: P.border }}
        >
          <h3 className="mb-3" style={{ color: P.text }}>
            Key Ingredients
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredientLabels.map((ing) => (
              <span
                key={ing}
                className="rounded-xl px-3 py-1.5 text-sm"
                style={{ background: P.light, color: P.text }}
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        <div
          className="mb-4 rounded-2xl border bg-white p-5"
          style={{ borderColor: P.border }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Info className="h-4 w-4" style={{ color: P.blue }} />
            <h3 style={{ color: P.text }}>How to Use</h3>
          </div>
          <p className="text-sm" style={{ color: P.muted }}>
            {product.usage}
          </p>
        </div>

        <div
          className="mb-6 rounded-2xl p-5"
          style={{
            background: P.warningSoft,
            borderLeft: `4px solid ${P.warning}`,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" style={{ color: P.warning }} />
            <h3 style={{ color: P.text }}>Warnings</h3>
          </div>
          <p className="text-sm" style={{ color: P.text }}>
            {product.warnings}
          </p>
        </div>

        <button
          onClick={handleAdd}
          disabled={justAdded}
          className="w-full cursor-pointer rounded-2xl py-4 text-sm text-white transition-all"
          style={{ background: justAdded ? P.success : P.blue }}
        >
          {justAdded
            ? "✓ Added to Cart"
            : inCart
              ? "Add Another to Cart"
              : "+ Add to Cart"}
        </button>

        {inCart && (
          <button
            onClick={() => router.push("/user/cart" as Route)}
            className="mt-3 w-full cursor-pointer rounded-2xl border py-3 text-sm"
            style={{ borderColor: P.blue, color: P.blue }}
          >
            Go to Cart →
          </button>
        )}
      </div>
    </div>
  );
}
