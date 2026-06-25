"use client";

import Link from "next/link";
import type { Route } from "next";
import { useApp } from "@/features/app-context/context/app-context";
import { useGlowToast } from "@/components/glow/toast";
import { GlowButton } from "@/components/glow/button";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { mockProducts } from "@/lib/mock-data";
import { ShoppingCart, AlertTriangle, Calendar, Sparkles } from "lucide-react";

export default function RecommendationsPage() {
  const { addToCart, surveyData } = useApp();
  const { showToast } = useGlowToast();

  const hasFragranceAllergy = surveyData?.allergies?.some((a) =>
    a.toLowerCase().includes("fragrance"),
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Your Personalized Recommendations
          </h1>
          <GlowBadge variant="purple">AI-assisted</GlowBadge>
        </div>
        <p className="text-muted-foreground">
          Based on your skin assessment and goals
        </p>
      </div>

      {hasFragranceAllergy && (
        <GlowCard variant="yellow" className="mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
            <div className="flex-1">
              <p className="mb-1 font-semibold">Allergy Alert</p>
              <p className="text-muted-foreground text-sm">
                You marked fragrance as an allergy. Some products below may
                contain fragrance. We&apos;ve flagged potential conflicts.
              </p>
            </div>
          </div>
        </GlowCard>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product, index) => {
          const isLowStock = product.stock <= 5;
          const matchesConcerns = product.concerns.some((c) =>
            surveyData?.concerns?.includes(c),
          );

          return (
            <GlowCard
              key={product.id}
              variant={
                index % 4 === 0
                  ? "lavender"
                  : index % 4 === 1
                    ? "mint"
                    : index % 4 === 2
                      ? "peach"
                      : "sky"
              }
            >
              <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground text-sm">
                    {product.brand}
                  </p>
                  <h3 className="font-semibold">{product.name}</h3>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">
                    {product.price.toLocaleString()} VNĐ
                  </p>
                  {isLowStock && (
                    <GlowBadge variant="warning">
                      Low stock: {product.stock}
                    </GlowBadge>
                  )}
                </div>

                {matchesConcerns && (
                  <div className="rounded-lg bg-white p-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Sparkles className="text-primary h-4 w-4" />
                      <span className="font-medium">
                        Matches your concerns:
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {product.concerns
                        .filter((c) => surveyData?.concerns?.includes(c))
                        .map((c) => (
                          <GlowBadge
                            key={c}
                            variant="success"
                            className="text-xs"
                          >
                            {c}
                          </GlowBadge>
                        ))}
                    </div>
                  </div>
                )}

                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Key ingredients:</p>
                  <p className="font-medium">
                    {product.ingredients.slice(0, 2).join(", ")}
                  </p>
                </div>

                <div className="rounded bg-white p-2 text-sm">
                  <p className="text-muted-foreground">Routine slot:</p>
                  <p className="font-medium">{product.routineSlot}</p>
                </div>

                <div className="flex gap-2">
                  <GlowButton
                    className="flex-1"
                    onClick={() => {
                      addToCart(product);
                      showToast(`${product.name} added to cart!`, "success");
                    }}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    Add to Cart
                  </GlowButton>
                  <Link href={`/user/products/${product.id}` as Route}>
                    <GlowButton variant="outline">Details</GlowButton>
                  </Link>
                </div>
              </div>
            </GlowCard>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Link href={"/user/cart" as Route} className="block">
          <GlowCard
            variant="mint"
            className="transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Review Cart</h3>
                <p className="text-muted-foreground text-sm">
                  Proceed to checkout
                </p>
              </div>
            </div>
          </GlowCard>
        </Link>

        <Link href={"/user/routine" as Route} className="block">
          <GlowCard
            variant="lavender"
            className="transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold">Create Routine</h3>
                <p className="text-muted-foreground text-sm">
                  Build your skincare plan
                </p>
              </div>
            </div>
          </GlowCard>
        </Link>

        <Link href={"/user/consultation" as Route} className="block">
          <GlowCard variant="sky" className="transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Book Consultation</h3>
                <p className="text-muted-foreground text-sm">
                  Get expert advice
                </p>
              </div>
            </div>
          </GlowCard>
        </Link>
      </div>
    </div>
  );
}
