"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { GlowCard } from "@/components/glow/card";
import { GlowBadge } from "@/components/glow/badge";
import { GlowButton } from "@/components/glow/button";
import { useGlowToast } from "@/components/glow/toast";
import {
  activeIngredients,
  mockProducts,
  mockUser,
  mockAIResult,
} from "@/lib/mock-data";
import {
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Save,
  Sun,
  Moon,
  Clock,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react";

export default function TreatmentPlanPage() {
  const router = useRouter();
  const { showToast } = useGlowToast();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [mappedProducts, setMappedProducts] = useState<typeof mockProducts>([]);
  const [showMapping, setShowMapping] = useState(false);
  const [notes, setNotes] = useState("");
  const [lifestyleNotes, setLifestyleNotes] = useState("");
  const [duration, setDuration] = useState("8");
  const [routineTiming, setRoutineTiming] = useState<
    Record<string, "AM" | "PM" | "Both">
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient],
    );
  };

  const handleMapProducts = () => {
    const mapped = mockProducts.filter((product) =>
      selectedIngredients.some((ing) =>
        product.ingredients.some((pIng) =>
          pIng.toLowerCase().includes(ing.toLowerCase()),
        ),
      ),
    );
    const timing: Record<string, "AM" | "PM" | "Both"> = {};
    mapped.forEach((product) => {
      if (product.routineSlot.includes("Morning")) timing[product.id] = "AM";
      else if (product.routineSlot.includes("Evening"))
        timing[product.id] = "PM";
      else timing[product.id] = "Both";
    });
    setRoutineTiming(timing);
    setMappedProducts(mapped);
    setShowMapping(true);
    showToast(
      `AI mapping completed - ${mapped.length} products matched`,
      "success",
    );
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    showToast("Draft saved successfully", "success");
  };

  const handleSubmitPlan = () => {
    setSubmitted(true);
    setTimeout(() => {
      router.push("/expert" as Route);
    }, 2000);
  };

  const hasConflict =
    selectedIngredients.includes("Retinol") &&
    selectedIngredients.includes("BHA");
  void hasConflict;

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center">
        <GlowCard variant="mint">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-600">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Treatment Plan Sent!</h2>
          <p className="text-muted-foreground mb-6">
            The personalized treatment plan has been sent to {mockUser.name}.
            They will receive updated product recommendations and routine.
          </p>
          <GlowButton onClick={() => router.push("/expert" as Route)}>
            Back to Dashboard
          </GlowButton>
        </GlowCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Treatment Plan Builder</h1>
          <GlowBadge variant="purple">Expert Mode</GlowBadge>
        </div>
        <p className="text-muted-foreground">
          Create a personalized treatment plan for {mockUser.name}
        </p>
      </div>

      <GlowCard variant="sky" className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Customer Skin Summary</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4">
            <p className="text-muted-foreground mb-1 text-sm">Main Concerns</p>
            <div className="flex flex-wrap gap-1">
              {mockUser.concerns.map((concern) => (
                <GlowBadge key={concern} variant="warning">
                  {concern}
                </GlowBadge>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="text-muted-foreground mb-1 text-sm">Skin Type</p>
            <p className="font-semibold capitalize">{mockUser.skinType}</p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="text-muted-foreground mb-1 text-sm">Allergies</p>
            <p className="font-semibold">
              {mockUser.allergies.join(", ") || "None"}
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4">
            <p className="text-muted-foreground mb-1 text-sm">Acne Severity</p>
            <p className="font-semibold capitalize">
              {mockAIResult.acneSeverity}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="text-muted-foreground mb-1 text-sm">Oiliness</p>
            <p className="font-semibold capitalize">{mockAIResult.oiliness}</p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="text-muted-foreground mb-1 text-sm">AI Confidence</p>
            <p className="font-semibold">{mockAIResult.confidence}%</p>
          </div>
        </div>
      </GlowCard>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <GlowCard variant="lavender">
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                1
              </div>
              <h2 className="text-xl font-semibold">
                Select Active Ingredients
              </h2>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Choose ingredients based on skin analysis and treatment goals
            </p>
            <div className="grid grid-cols-2 gap-3">
              {activeIngredients.map((ingredient) => (
                <button
                  key={ingredient}
                  onClick={() => toggleIngredient(ingredient)}
                  className={`rounded-lg border-2 p-3 text-sm transition-all ${selectedIngredients.includes(ingredient) ? "border-primary bg-white shadow-md" : "border-border hover:border-primary/50 bg-white"}`}
                >
                  {ingredient}
                </button>
              ))}
            </div>
            {selectedIngredients.length > 0 && (
              <div className="mt-4 rounded-lg bg-white p-3">
                <p className="mb-2 text-sm font-semibold">
                  Selected ({selectedIngredients.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map((ing) => (
                    <GlowBadge key={ing} variant="purple">
                      {ing}
                    </GlowBadge>
                  ))}
                </div>
              </div>
            )}
            {selectedIngredients.length > 0 && !showMapping && (
              <GlowButton className="mt-4 w-full" onClick={handleMapProducts}>
                <Sparkles className="mr-2 h-4 w-4" />
                Map to Products with AI
                <ArrowRight className="ml-2 h-4 w-4" />
              </GlowButton>
            )}
          </GlowCard>

          {selectedIngredients.length >= 2 && (
            <GlowCard variant="lavender" className="mt-4">
              <div className="mb-3 flex items-start gap-2">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                <div>
                  <p className="mb-1 font-semibold">
                    AI Compatibility Analysis
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Ingredient interaction insights
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {selectedIngredients.includes("Niacinamide") &&
                  selectedIngredients.includes("Hyaluronic Acid") && (
                    <div className="flex items-start gap-2 rounded bg-green-50 p-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <p className="text-xs">
                        <span className="font-semibold">Synergy:</span>{" "}
                        Niacinamide + Hyaluronic Acid work excellently together
                      </p>
                    </div>
                  )}
                {selectedIngredients.includes("Niacinamide") &&
                  (selectedIngredients.includes("BHA") ||
                    selectedIngredients.includes("AHA")) && (
                    <div className="flex items-start gap-2 rounded bg-green-50 p-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <p className="text-xs">
                        <span className="font-semibold">Synergy:</span>{" "}
                        Niacinamide helps reduce irritation from acids
                      </p>
                    </div>
                  )}
                {selectedIngredients.includes("Retinol") &&
                  selectedIngredients.includes("BHA") && (
                    <div className="flex items-start gap-2 rounded bg-yellow-50 p-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                      <p className="text-xs">
                        <span className="font-semibold">Caution:</span> Retinol
                        + BHA - use on alternating nights
                      </p>
                    </div>
                  )}
                {selectedIngredients.includes("Retinol") &&
                  selectedIngredients.includes("AHA") && (
                    <div className="flex items-start gap-2 rounded bg-yellow-50 p-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                      <p className="text-xs">
                        <span className="font-semibold">Caution:</span> Retinol
                        + AHA - alternate nights recommended
                      </p>
                    </div>
                  )}
                {selectedIngredients.includes("Benzoyl Peroxide") &&
                  selectedIngredients.includes("Retinol") && (
                    <div className="flex items-start gap-2 rounded bg-yellow-50 p-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                      <p className="text-xs">
                        <span className="font-semibold">Caution:</span> Benzoyl
                        Peroxide can deactivate Retinol
                      </p>
                    </div>
                  )}
                {mockUser.allergies.includes("Fragrance") &&
                  selectedIngredients.length > 0 && (
                    <div className="flex items-start gap-2 rounded bg-orange-50 p-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                      <p className="text-xs">
                        <span className="font-semibold">Allergy Alert:</span>{" "}
                        Customer has fragrance sensitivity - verify all products
                      </p>
                    </div>
                  )}
              </div>
            </GlowCard>
          )}
        </div>

        <div>
          {showMapping ? (
            <GlowCard variant="mint">
              <div className="mb-4 flex items-center gap-2">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                  2
                </div>
                <h2 className="text-xl font-semibold">AI-Mapped Products</h2>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <GlowBadge variant="info">AI-assisted mapping</GlowBadge>
                <p className="text-muted-foreground text-sm">
                  {mappedProducts.length} products matched
                </p>
              </div>
              <div className="mb-4 rounded-lg bg-purple-50 p-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-600" />
                  <div>
                    <p className="mb-1 text-sm font-semibold">
                      AI Product Intelligence
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Budget alternatives, premium upgrades, and substitutions
                      available below each product
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 max-h-[500px] space-y-3 overflow-y-auto">
                {mappedProducts.map((product) => {
                  const matchedIngredients = product.ingredients.filter(
                    (pIng) =>
                      selectedIngredients.some((sIng) =>
                        pIng.toLowerCase().includes(sIng.toLowerCase()),
                      ),
                  );
                  const isLowStock = product.stock <= 5;
                  return (
                    <div key={product.id} className="rounded-lg bg-white p-4">
                      <div className="mb-3 flex gap-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-muted-foreground text-sm">
                            {product.brand}
                          </p>
                          <p className="font-semibold">{product.name}</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {matchedIngredients.map((ing) => (
                              <GlowBadge
                                key={ing}
                                variant="success"
                                className="text-xs"
                              >
                                {ing}
                              </GlowBadge>
                            ))}
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <p className="text-sm font-semibold">
                              {product.price.toLocaleString()} VNĐ
                            </p>
                            {isLowStock && (
                              <GlowBadge variant="warning" className="text-xs">
                                Low stock
                              </GlowBadge>
                            )}
                          </div>
                          <p className="text-muted-foreground mt-1 text-xs">
                            {product.routineSlot}
                          </p>
                        </div>
                      </div>
                      <div className="bg-muted mb-2 flex items-center gap-2 rounded-lg px-3 py-2">
                        <span className="mr-2 text-sm font-medium">
                          Timing:
                        </span>
                        {(["AM", "PM", "Both"] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() =>
                              setRoutineTiming((prev) => ({
                                ...prev,
                                [product.id]: t,
                              }))
                            }
                            className={`rounded px-3 py-1 text-sm transition-all ${routineTiming[product.id] === t ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:bg-accent bg-white"}`}
                          >
                            {t === "AM" ? (
                              <>
                                <Sun className="mr-1 inline h-3 w-3" />
                                AM
                              </>
                            ) : t === "PM" ? (
                              <>
                                <Moon className="mr-1 inline h-3 w-3" />
                                PM
                              </>
                            ) : (
                              "Both"
                            )}
                          </button>
                        ))}
                      </div>
                      {isLowStock && (
                        <div className="rounded-lg bg-yellow-50 px-3 py-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                            <div className="flex-1">
                              <p className="mb-1 text-xs font-semibold">
                                Low Stock - Alternative Available
                              </p>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-medium">
                                    CeraVe SA Smoothing Cleanser
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    Similar ingredients, 18 in stock
                                  </p>
                                </div>
                                <GlowBadge
                                  variant="success"
                                  className="text-xs"
                                >
                                  320K VNĐ
                                </GlowBadge>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {product.price > 400000 && (
                        <div className="mt-2 rounded-lg bg-blue-50 px-3 py-2">
                          <div className="flex items-start gap-2">
                            <DollarSign className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                            <div className="flex-1">
                              <p className="mb-1 text-xs font-semibold">
                                Budget Alternative
                              </p>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-medium">
                                    Cos-RX BHA Blackhead Power Liquid
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    Contains {matchedIngredients[0]}
                                  </p>
                                </div>
                                <GlowBadge variant="info" className="text-xs">
                                  -35%
                                </GlowBadge>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {mappedProducts.length === 0 && (
                <div className="text-muted-foreground py-8 text-center">
                  <p>No products found matching selected ingredients.</p>
                  <p className="mt-2 text-sm">
                    Try different ingredient combinations.
                  </p>
                </div>
              )}
            </GlowCard>
          ) : (
            <GlowCard className="bg-muted/30">
              <div className="text-muted-foreground py-12 text-center">
                <Sparkles className="mx-auto mb-4 h-12 w-12 opacity-30" />
                <p>Select active ingredients first</p>
                <p className="mt-2 text-sm">
                  AI will map them to available products
                </p>
              </div>
            </GlowCard>
          )}
        </div>
      </div>

      {showMapping && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlowCard>
            <h3 className="mb-4 font-semibold">Treatment Plan Details</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  Treatment Duration (weeks)
                </label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  className="border-border w-full rounded-lg border bg-white px-3 py-2"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                <p className="text-muted-foreground mt-1 text-xs">
                  Recommended: 8-12 weeks for visible results
                </p>
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <DollarSign className="h-4 w-4" />
                  Estimated Cost
                </label>
                <div className="border-border bg-muted rounded-lg border px-3 py-2">
                  <p className="font-semibold">
                    {mappedProducts
                      .reduce((sum, p) => sum + p.price, 0)
                      .toLocaleString()}{" "}
                    VNĐ
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Based on {mappedProducts.length} products
                  </p>
                </div>
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  Expected Improvement
                </label>
                <div className="border-border rounded-lg border bg-green-50 px-3 py-2">
                  <p className="font-semibold text-green-700">
                    {mockUser.concerns.includes("acne")
                      ? "60-75% reduction in breakouts"
                      : "50-70% improvement"}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Based on similar skin profiles
                  </p>
                </div>
              </div>
            </div>
          </GlowCard>
          <GlowCard variant="yellow">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Important Cautions & Precautions
            </h3>
            <textarea
              className="border-border w-full rounded-lg border bg-white px-3 py-2"
              rows={8}
              placeholder="Add important cautions:&#10;- Sensitivity warnings&#10;- Sun protection requirements&#10;- Patch test recommendations"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </GlowCard>
        </div>
      )}

      {showMapping && mappedProducts.length > 0 && (
        <GlowCard variant="sky" className="mt-6">
          <h3 className="mb-4 font-semibold">
            Lifestyle & Routine Recommendations
          </h3>
          <textarea
            className="border-border w-full rounded-lg border bg-white px-3 py-2"
            rows={6}
            placeholder="Add lifestyle guidance:&#10;- Diet and hydration tips&#10;- Sleep recommendations&#10;- Stress management advice"
            value={lifestyleNotes}
            onChange={(e) => setLifestyleNotes(e.target.value)}
          />
        </GlowCard>
      )}

      {showMapping && mappedProducts.length > 0 && (
        <div className="mt-8">
          <div className="mb-3 flex gap-4">
            <GlowButton variant="outline" onClick={() => setShowMapping(false)}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Revise Ingredients
            </GlowButton>
            <GlowButton variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              {isDraft ? "Draft Saved" : "Save Draft"}
            </GlowButton>
            <GlowButton
              variant="outline"
              onClick={() =>
                showToast("PDF export feature coming soon", "info")
              }
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Export PDF (Mock)
            </GlowButton>
          </div>
          <GlowButton className="w-full" onClick={handleSubmitPlan}>
            <CheckCircle className="mr-2 h-5 w-5" />
            Send Treatment Plan to Customer
          </GlowButton>
        </div>
      )}
    </div>
  );
}
