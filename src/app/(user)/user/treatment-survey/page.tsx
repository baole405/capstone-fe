"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Upload,
  Loader2,
  Sun,
  Moon,
  User,
  Shield,
  ArrowRight,
  Info,
  ShoppingCart,
} from "lucide-react";
import {
  useEcommerce,
  SHOP_PRODUCTS,
  ConflictModal,
} from "@/features/ecommerce/context/ecommerce-context";
import { useRouter } from "next/navigation";

const P = {
  blue: "#5B8DEF",
  blueSoft: "#EEF3FD",
  blueLight: "#D6E4FF",
  success: "#2BB673",
  successSoft: "#E8F8F1",
  warning: "#F59E0B",
  warningSoft: "#FEF3C7",
  danger: "#EF4444",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#1E293B",
  muted: "#64748B",
  light: "#F1F5F9",
};

interface DemoSurvey {
  oiliness: "O" | "D" | "";
  sensitivity: "S" | "R" | "";
  pigmentation: "P" | "N" | "";
  aging: "W" | "T" | "";
  hydration: number;
  currentProducts: string;
  currentIngredients: string[];
  morningRoutine: string;
  eveningRoutine: string;
  irritationStatus: string;
  treatmentGoals: string[];
  currentConcern: string;
  pregnant: string;
  breastfeeding: string;
  menstrual: string;
  hormonal: string;
  dermatreatment: string;
  prescription: string;
  hasPhoto: boolean;
}

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  ingredients: string[];
  whyRecommended: string[];
  conflictIngredient?: string;
  emoji: string;
  price: string;
}

const BASE_PROFILE = {
  name: "Sarah Chen",
  age: "28–34",
  gender: "Female",
  location: "Ho Chi Minh City (Humid Tropical)",
  allergies: ["None known"],
  alcoholReaction: "Mild sensitivity",
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Gentle Foaming Cleanser",
    category: "Cleanser",
    brand: "CalmSkin",
    description:
      "Sulfate-free gel cleanser that removes excess oil without stripping moisture barrier.",
    ingredients: ["Glycerin", "Ceramide NP", "Niacinamide 2%"],
    whyRecommended: [
      "Oily Skin (O)",
      "Sensitive Skin (S)",
      "No Allergy Conflict",
      "Acne Goal",
    ],
    emoji: "🧴",
    price: "$18",
  },
  {
    id: "p2",
    name: "Niacinamide 10% + Zinc Serum",
    category: "Treatment Serum",
    brand: "Dermafix",
    description: "Regulates sebum, minimises pores, and fades post-acne marks.",
    ingredients: ["Niacinamide 10%", "Zinc PCA 1%", "Hyaluronic Acid"],
    whyRecommended: [
      "Oily Skin (O)",
      "Acne Goal",
      "Dark Spots Goal",
      "Pigmented Skin (P)",
    ],
    emoji: "💧",
    price: "$24",
  },
  {
    id: "p3",
    name: "AHA 7% + BHA 1% Toning Solution",
    category: "Exfoliant",
    brand: "PeelPro",
    description:
      "Dual-acid weekly exfoliant that unclogs pores and smooths texture.",
    ingredients: ["Glycolic Acid 7%", "Salicylic Acid 1%", "Aloe Vera"],
    whyRecommended: ["Oily Skin (O)", "Visible Pores", "Acne Goal"],
    conflictIngredient: "Retinol",
    emoji: "⚗️",
    price: "$22",
  },
  {
    id: "p4",
    name: "Oil-Free Hydrating Moisturiser",
    category: "Moisturiser",
    brand: "AquaBalance",
    description:
      "Lightweight gel-cream that hydrates without adding shine, ideal for oily skin.",
    ingredients: ["Hyaluronic Acid", "Panthenol", "Allantoin"],
    whyRecommended: [
      "Oily Skin (O)",
      "Sensitive Skin (S)",
      "Low Hydration (25%)",
    ],
    emoji: "🌿",
    price: "$28",
  },
  {
    id: "p5",
    name: "SPF 50 PA++++ Fluid Sunscreen",
    category: "Sunscreen",
    brand: "SunGuard",
    description:
      "Ultra-light mineral-chemical hybrid SPF. No white cast, no fragrance.",
    ingredients: ["Zinc Oxide 10%", "Tinosorb S", "Vitamin E"],
    whyRecommended: [
      "Acne Goal",
      "Dark Spots Goal",
      "Humid Climate Protection",
    ],
    emoji: "☀️",
    price: "$32",
  },
];

const TREATMENT_GOALS = [
  "Reduce Acne Appearance",
  "Reduce Oiliness",
  "Improve Dark Spots",
  "Improve Dryness",
  "Support Skin Recovery",
  "Reduce Visible Pores",
  "Maintain Healthy-looking Skin",
  "Reduce Aging Signs",
];
const CONCERNS = [
  { label: "Acne Appearance", icon: "🔴" },
  { label: "Dark Spots", icon: "🟤" },
  { label: "Dry Skin", icon: "🌵" },
  { label: "Redness", icon: "🌹" },
  { label: "Visible Pores", icon: "🔬" },
  { label: "Excess Oil", icon: "💦" },
  { label: "Aging Signs", icon: "⏰" },
];
const IRRITATION_OPTIONS = [
  "None",
  "Mild Irritation",
  "Redness",
  "Burning",
  "Itching",
];
const INGREDIENT_OPTIONS = [
  "Retinol",
  "AHA",
  "BHA",
  "Vitamin C",
  "Niacinamide",
  "Benzoyl Peroxide",
  "None",
];
const AI_OBSERVATION = {
  acneSeverity: "Moderate",
  darkSpots: "Mild",
  poreSize: "Moderate",
  wrinkleDepth: "Low",
};

const DEMO_DEFAULTS: DemoSurvey = {
  oiliness: "O",
  sensitivity: "S",
  pigmentation: "P",
  aging: "T",
  hydration: 25,
  currentProducts: "Neutrogena Hydro Boost, Cosrx Snail Mucin",
  currentIngredients: ["Retinol"],
  morningRoutine: "Cleanser → Moisturiser → SPF",
  eveningRoutine: "Cleanser → Retinol Serum → Moisturiser",
  irritationStatus: "Mild Irritation",
  treatmentGoals: [
    "Reduce Acne Appearance",
    "Reduce Oiliness",
    "Improve Dark Spots",
  ],
  currentConcern: "Acne Appearance",
  pregnant: "no",
  breastfeeding: "no",
  menstrual: "prefer_not",
  hormonal: "no",
  dermatreatment: "no",
  prescription: "no",
  hasPhoto: false,
};

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(current / total) * 100}%`, background: P.blue }}
        />
      </div>
      <span className="shrink-0 text-xs" style={{ color: P.muted }}>
        Step {current} of {total}
      </span>
    </div>
  );
}

function Tag({
  label,
  selected,
  onClick,
  color,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        borderColor: selected ? color || P.blue : P.border,
        background: selected ? (color ? color + "20" : P.blueSoft) : "#fff",
        color: selected ? color || P.blue : P.text,
      }}
      className="cursor-pointer rounded-xl border-2 px-4 py-2 text-sm transition-all duration-150 select-none"
    >
      {selected && <span className="mr-1">✓</span>}
      {label}
    </button>
  );
}

function RadioCard({
  label,
  sublabel,
  selected,
  onClick,
}: {
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        borderColor: selected ? P.blue : P.border,
        background: selected ? P.blueSoft : "#fff",
      }}
      className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 p-4 transition-all duration-150 select-none"
    >
      <span
        className="font-semibold"
        style={{ color: selected ? P.blue : P.text }}
      >
        {label}
      </span>
      {sublabel && (
        <span className="text-xs" style={{ color: P.muted }}>
          {sublabel}
        </span>
      )}
    </button>
  );
}

function HealthRadio({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-sm" style={{ color: P.text }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "prefer_not", label: "Prefer not to answer" },
        ].map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              borderColor: value === o.value ? P.blue : P.border,
              background: value === o.value ? P.blueSoft : "#fff",
              color: value === o.value ? P.blue : P.text,
            }}
            className="cursor-pointer rounded-xl border px-3 py-1.5 text-sm transition-all duration-150"
          >
            {value === o.value && "✓ "}
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const cardCls = "bg-white rounded-2xl border shadow-sm p-6";

export default function TreatmentSurveyPage() {
  const router = useRouter();
  const { addToCart, cart, pendingAdd } = useEcommerce();
  const [justAddedToCart, setJustAddedToCart] = useState<
    Record<string, boolean>
  >({});
  const [screen, setScreen] = useState(0);
  const [survey, setSurvey] = useState<DemoSurvey>(DEMO_DEFAULTS);
  const [removedProducts] = useState<string[]>([]);
  const [engineLoading, setEngineLoading] = useState(false);

  const goNext = () => setScreen((s) => s + 1);
  const goBack = () => setScreen((s) => s - 1);

  useEffect(() => {
    if (screen === 8) {
      const t = setTimeout(() => goNext(), 3000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  useEffect(() => {
    if (screen === 10) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEngineLoading(true);
      const t = setTimeout(() => {
        setEngineLoading(false);
        goNext();
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const toggleGoal = (g: string) =>
    setSurvey((p) => ({
      ...p,
      treatmentGoals: p.treatmentGoals.includes(g)
        ? p.treatmentGoals.filter((x) => x !== g)
        : [...p.treatmentGoals, g],
    }));
  const toggleIngredient = (ing: string) =>
    setSurvey((p) => ({
      ...p,
      currentIngredients: p.currentIngredients.includes(ing)
        ? p.currentIngredients.filter((x) => x !== ing)
        : [...p.currentIngredients, ing],
    }));

  const baumannCode =
    [survey.oiliness, survey.sensitivity, survey.pigmentation, survey.aging]
      .filter(Boolean)
      .join("") || "—";
  const activeProducts = MOCK_PRODUCTS.filter(
    (p) => !removedProducts.includes(p.id),
  );
  const conflictProduct = MOCK_PRODUCTS.find(
    (p) =>
      p.conflictIngredient &&
      survey.currentIngredients.includes(p.conflictIngredient),
  );
  const hydrationLabel =
    [
      [0, "Very Low"],
      [25, "Low"],
      [50, "Medium"],
      [75, "High"],
      [100, "Very High"],
    ].find(([v]) => v === survey.hydration)?.[1] ?? "Medium";

  return (
    <div className="min-h-screen py-8" style={{ background: P.bg }}>
      <div className="mx-auto max-w-2xl px-4">
        {screen === 0 && (
          <div>
            <div className="mb-8 text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: P.blueLight }}
              >
                <Sparkles className="h-8 w-8" style={{ color: P.blue }} />
              </div>
              <h1 className="mb-2 text-2xl" style={{ color: P.text }}>
                Start New Treatment Cycle
              </h1>
              <p className="text-sm" style={{ color: P.muted }}>
                Complete the Treatment Survey to generate your personalised
                routine.
              </p>
            </div>

            <div className={cardCls + " mb-4"}>
              <div className="mb-4 flex items-center gap-2">
                <User className="h-4 w-4" style={{ color: P.blue }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: P.blue }}
                >
                  Base Profile
                </span>
                <span
                  className="ml-auto rounded-full px-2 py-0.5 text-xs"
                  style={{ background: P.successSoft, color: P.success }}
                >
                  ✓ Complete
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Name", BASE_PROFILE.name],
                  ["Age Range", BASE_PROFILE.age],
                  ["Gender", BASE_PROFILE.gender],
                  ["Location", BASE_PROFILE.location],
                  ["Known Allergies", BASE_PROFILE.allergies.join(", ")],
                  ["Alcohol Sensitivity", BASE_PROFILE.alcoholReaction],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p style={{ color: P.muted }} className="mb-0.5 text-xs">
                      {k}
                    </p>
                    <p style={{ color: P.text }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cardCls + " mb-6"}>
              <div className="flex items-start gap-3">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: P.blue }}
                />
                <p className="text-sm" style={{ color: P.muted }}>
                  Every new Treatment Cycle requires a fresh survey — your skin
                  condition, current products, and concerns may have changed
                  since your last cycle.
                </p>
              </div>
            </div>

            <button
              onClick={goNext}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-white transition-all duration-150"
              style={{ background: P.blue }}
            >
              Begin Treatment Survey <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {screen === 1 && (
          <div>
            <ProgressBar current={1} total={7} />
            <h2 className="mb-1" style={{ color: P.text }}>
              Skin Profile Assessment
            </h2>
            <p className="mb-6 text-sm" style={{ color: P.muted }}>
              Baumann Skin Type — select the option that best describes your
              skin right now.
            </p>

            {[
              {
                title: "Oiliness / Dryness",
                opts: [
                  {
                    label: "Oily (O)",
                    sub: "Shiny, large pores",
                    val: "O" as const,
                  },
                  {
                    label: "Dry (D)",
                    sub: "Flaky, tight feeling",
                    val: "D" as const,
                  },
                ],
                field: "oiliness" as const,
              },
              {
                title: "Sensitivity",
                opts: [
                  {
                    label: "Sensitive (S)",
                    sub: "Reacts easily",
                    val: "S" as const,
                  },
                  {
                    label: "Resistant (R)",
                    sub: "Tolerates most products",
                    val: "R" as const,
                  },
                ],
                field: "sensitivity" as const,
              },
              {
                title: "Pigmentation",
                opts: [
                  {
                    label: "Pigmented (P)",
                    sub: "Dark spots, uneven tone",
                    val: "P" as const,
                  },
                  {
                    label: "Non-Pigmented (N)",
                    sub: "Even skin tone",
                    val: "N" as const,
                  },
                ],
                field: "pigmentation" as const,
              },
              {
                title: "Aging",
                opts: [
                  {
                    label: "Wrinkled (W)",
                    sub: "Fine lines visible",
                    val: "W" as const,
                  },
                  {
                    label: "Tight (T)",
                    sub: "Smooth, minimal lines",
                    val: "T" as const,
                  },
                ],
                field: "aging" as const,
              },
            ].map((section) => (
              <div key={section.title} className={cardCls + " mb-4"}>
                <p
                  className="mb-3 text-sm font-semibold"
                  style={{ color: P.text }}
                >
                  {section.title}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {section.opts.map((o) => (
                    <RadioCard
                      key={o.val}
                      label={o.label}
                      sublabel={o.sub}
                      selected={survey[section.field] === o.val}
                      onClick={() =>
                        setSurvey((p) => ({ ...p, [section.field]: o.val }))
                      }
                    />
                  ))}
                </div>
              </div>
            ))}

            {baumannCode !== "—" && baumannCode.length === 4 && (
              <div
                className="mb-6 flex items-center gap-3 rounded-2xl p-4"
                style={{ background: P.blueSoft }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: P.blue }}
                >
                  <span className="text-xs font-bold text-white">
                    {baumannCode}
                  </span>
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: P.blue }}
                  >
                    Baumann Profile: {baumannCode}
                  </p>
                  <p className="text-xs" style={{ color: P.muted }}>
                    This will be used as a primary recommendation input.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={goBack}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-2.5"
                style={{ borderColor: P.border, color: P.text }}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={goNext}
                disabled={baumannCode.length < 4}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-white"
                style={{
                  background: baumannCode.length < 4 ? "#CBD5E1" : P.blue,
                }}
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {screen === 2 && (
          <div>
            <ProgressBar current={2} total={7} />
            <h2 className="mb-1" style={{ color: P.text }}>
              Hydration Level
            </h2>
            <p className="mb-6 text-sm" style={{ color: P.muted }}>
              How hydrated does your skin currently feel?
            </p>

            <div className={cardCls + " mb-6"}>
              <div
                className="mb-3 flex justify-between text-xs"
                style={{ color: P.muted }}
              >
                <span>Very Low</span>
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Very High</span>
              </div>
              <div className="mb-4 grid grid-cols-5 gap-2">
                {[0, 25, 50, 75, 100].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSurvey((p) => ({ ...p, hydration: val }))}
                    style={{
                      background: survey.hydration === val ? P.blue : P.light,
                      color: survey.hydration === val ? "#fff" : P.text,
                    }}
                    className="cursor-pointer rounded-xl py-3 text-sm font-medium transition-all"
                  >
                    {val}%
                  </button>
                ))}
              </div>
              <div
                className="rounded-xl py-3 text-center"
                style={{ background: P.blueSoft }}
              >
                <p className="text-sm font-semibold" style={{ color: P.blue }}>
                  {hydrationLabel as string} — {survey.hydration}%
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={goBack}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-2.5"
                style={{ borderColor: P.border, color: P.text }}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={goNext}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-white"
                style={{ background: P.blue }}
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {screen === 3 && (
          <div>
            <ProgressBar current={3} total={7} />
            <h2 className="mb-1" style={{ color: P.text }}>
              Current Product Usage
            </h2>
            <p className="mb-6 text-sm" style={{ color: P.muted }}>
              Tell us about products you&apos;re currently using.
            </p>

            <div className={cardCls + " mb-4"}>
              <label
                className="mb-2 block text-sm font-semibold"
                style={{ color: P.text }}
              >
                Current Products
              </label>
              <textarea
                value={survey.currentProducts}
                onChange={(e) =>
                  setSurvey((p) => ({ ...p, currentProducts: e.target.value }))
                }
                rows={2}
                className="w-full resize-none rounded-xl p-3 text-sm focus:outline-none"
                style={{
                  background: P.light,
                  border: `1px solid ${P.border}`,
                  color: P.text,
                }}
                placeholder="e.g. Cerave Moisturiser, Cosrx BHA..."
              />
            </div>

            <div className={cardCls + " mb-4"}>
              <label
                className="mb-3 block text-sm font-semibold"
                style={{ color: P.text }}
              >
                Current Active Ingredients
              </label>
              <div className="flex flex-wrap gap-2">
                {INGREDIENT_OPTIONS.map((ing) => (
                  <Tag
                    key={ing}
                    label={ing}
                    selected={survey.currentIngredients.includes(ing)}
                    onClick={() => {
                      if (ing === "None") {
                        setSurvey((p) => ({ ...p, currentIngredients: [] }));
                      } else {
                        toggleIngredient(ing);
                      }
                    }}
                  />
                ))}
              </div>
              {survey.currentIngredients.includes("Retinol") && (
                <div
                  className="mt-3 rounded-xl p-3 text-sm"
                  style={{ background: P.warningSoft, color: P.text }}
                >
                  ⚠️ <strong>Retinol detected</strong> — we&apos;ll check for
                  AHA/BHA compatibility in your recommendations.
                </div>
              )}
            </div>

            {[
              {
                label: "Morning Routine",
                field: "morningRoutine" as const,
                placeholder: "e.g. Cleanser → Serum → SPF",
              },
              {
                label: "Evening Routine",
                field: "eveningRoutine" as const,
                placeholder: "e.g. Cleanser → Retinol → Moisturiser",
              },
            ].map((item) => (
              <div key={item.field} className={cardCls + " mb-4"}>
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: P.text }}
                >
                  {item.label}
                </label>
                <input
                  value={survey[item.field]}
                  onChange={(e) =>
                    setSurvey((p) => ({ ...p, [item.field]: e.target.value }))
                  }
                  className="w-full rounded-xl p-3 text-sm focus:outline-none"
                  style={{
                    background: P.light,
                    border: `1px solid ${P.border}`,
                    color: P.text,
                  }}
                  placeholder={item.placeholder}
                />
              </div>
            ))}

            <div className={cardCls + " mb-6"}>
              <label
                className="mb-3 block text-sm font-semibold"
                style={{ color: P.text }}
              >
                Current Irritation Status
              </label>
              <div className="flex flex-wrap gap-2">
                {IRRITATION_OPTIONS.map((opt) => (
                  <Tag
                    key={opt}
                    label={opt}
                    selected={survey.irritationStatus === opt}
                    onClick={() =>
                      setSurvey((p) => ({ ...p, irritationStatus: opt }))
                    }
                    color={opt === "None" ? P.success : P.warning}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={goBack}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-2.5"
                style={{ borderColor: P.border, color: P.text }}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={goNext}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-white"
                style={{ background: P.blue }}
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {screen === 4 && (
          <div>
            <ProgressBar current={4} total={7} />
            <h2 className="mb-1" style={{ color: P.text }}>
              Treatment Goals
            </h2>
            <p className="mb-6 text-sm" style={{ color: P.muted }}>
              Select all that apply.
            </p>

            <div className={cardCls + " mb-6"}>
              <div className="flex flex-wrap gap-2">
                {TREATMENT_GOALS.map((g) => (
                  <Tag
                    key={g}
                    label={g}
                    selected={survey.treatmentGoals.includes(g)}
                    onClick={() => toggleGoal(g)}
                  />
                ))}
              </div>
              {survey.treatmentGoals.length > 0 && (
                <div
                  className="mt-4 rounded-xl p-3 text-sm"
                  style={{ background: P.blueSoft, color: P.blue }}
                >
                  {survey.treatmentGoals.length} goal
                  {survey.treatmentGoals.length > 1 ? "s" : ""} selected
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={goBack}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-2.5"
                style={{ borderColor: P.border, color: P.text }}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={goNext}
                disabled={survey.treatmentGoals.length === 0}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-white"
                style={{
                  background:
                    survey.treatmentGoals.length === 0 ? "#CBD5E1" : P.blue,
                }}
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {screen === 5 && (
          <div>
            <ProgressBar current={5} total={7} />
            <h2 className="mb-1" style={{ color: P.text }}>
              Primary Concern
            </h2>
            <p className="mb-6 text-sm" style={{ color: P.muted }}>
              Select your single most urgent skin concern right now.
            </p>

            <div className={cardCls + " mb-6"}>
              <div className="grid grid-cols-2 gap-3">
                {CONCERNS.map((c) => (
                  <button
                    key={c.label}
                    onClick={() =>
                      setSurvey((p) => ({ ...p, currentConcern: c.label }))
                    }
                    style={{
                      borderColor:
                        survey.currentConcern === c.label ? P.blue : P.border,
                      background:
                        survey.currentConcern === c.label ? P.blueSoft : "#fff",
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all"
                  >
                    <span className="text-xl">{c.icon}</span>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color:
                          survey.currentConcern === c.label ? P.blue : P.text,
                      }}
                    >
                      {c.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={goBack}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-2.5"
                style={{ borderColor: P.border, color: P.text }}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={goNext}
                disabled={!survey.currentConcern}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-white"
                style={{
                  background: !survey.currentConcern ? "#CBD5E1" : P.blue,
                }}
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {screen === 6 && (
          <div>
            <ProgressBar current={6} total={7} />
            <h2 className="mb-1" style={{ color: P.text }}>
              Additional Health Information
            </h2>
            <p className="mb-2 text-sm" style={{ color: P.muted }}>
              Optional — improves recommendation safety.
            </p>
            <div
              className="mb-5 flex items-center gap-2 rounded-xl p-3 text-xs"
              style={{ background: P.blueSoft, color: P.blue }}
            >
              <Shield className="h-4 w-4 shrink-0" />
              Your answers are private and used only to exclude unsafe
              ingredients.
            </div>

            <div className={cardCls + " mb-6"}>
              <HealthRadio
                label="Are you currently pregnant?"
                value={survey.pregnant}
                onChange={(v) => setSurvey((p) => ({ ...p, pregnant: v }))}
              />
              <HealthRadio
                label="Are you currently breastfeeding?"
                value={survey.breastfeeding}
                onChange={(v) => setSurvey((p) => ({ ...p, breastfeeding: v }))}
              />
              <HealthRadio
                label="Are you currently in your menstrual cycle?"
                value={survey.menstrual}
                onChange={(v) => setSurvey((p) => ({ ...p, menstrual: v }))}
              />
              <HealthRadio
                label="Have you experienced recent hormonal changes?"
                value={survey.hormonal}
                onChange={(v) => setSurvey((p) => ({ ...p, hormonal: v }))}
              />
              <HealthRadio
                label="Are you currently receiving dermatological treatment?"
                value={survey.dermatreatment}
                onChange={(v) =>
                  setSurvey((p) => ({ ...p, dermatreatment: v }))
                }
              />
              <HealthRadio
                label="Are you using prescription skincare medication?"
                value={survey.prescription}
                onChange={(v) => setSurvey((p) => ({ ...p, prescription: v }))}
              />
            </div>

            {survey.pregnant === "yes" && (
              <div
                className="mb-4 rounded-xl p-4 text-sm"
                style={{
                  background: P.warningSoft,
                  borderLeft: `4px solid ${P.warning}`,
                }}
              >
                <strong>Pregnancy noted.</strong> Retinoids and high-dose
                salicylic acid will be automatically excluded from
                recommendations.
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={goBack}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-2.5"
                style={{ borderColor: P.border, color: P.text }}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={goNext}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-white"
                style={{ background: P.blue }}
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {screen === 7 && (
          <div>
            <ProgressBar current={7} total={7} />
            <h2 className="mb-1" style={{ color: P.text }}>
              Skin Photo (Optional)
            </h2>
            <p className="mb-2 text-sm" style={{ color: P.muted }}>
              An AI-assisted skin observation can improve recommendation
              confidence.
            </p>
            <div
              className="mb-5 rounded-xl p-3 text-xs"
              style={{ background: "#FEF2F2", color: P.danger }}
            >
              ⚠️ AI observation is supplementary only — not a medical diagnosis.
            </div>

            {!survey.hasPhoto ? (
              <div>
                <button
                  onClick={() => setSurvey((p) => ({ ...p, hasPhoto: true }))}
                  className="mb-3 flex w-full cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed py-10 transition-all hover:border-blue-400"
                  style={{ borderColor: P.border, background: "#fafafa" }}
                >
                  <Upload className="h-8 w-8" style={{ color: P.muted }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: P.text }}
                  >
                    Upload Photo
                  </span>
                  <span className="text-xs" style={{ color: P.muted }}>
                    JPEG or PNG, max 10MB
                  </span>
                </button>
                <button
                  onClick={() => setScreen(10)}
                  className="w-full cursor-pointer rounded-2xl border py-3 text-sm"
                  style={{ borderColor: P.border, color: P.muted }}
                >
                  Skip Photo — Continue Without Analysis
                </button>
              </div>
            ) : (
              <div>
                <div
                  className="mb-4 flex items-center justify-center overflow-hidden rounded-2xl"
                  style={{ background: P.blueSoft, height: 200 }}
                >
                  <div className="text-center">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: P.blue }}
                    >
                      Photo uploaded
                    </p>
                    <p className="mt-1 text-xs" style={{ color: P.muted }}>
                      skin_photo_demo.jpg · 2.4MB
                    </p>
                  </div>
                </div>
                <div
                  className="mb-4 rounded-xl p-3 text-sm"
                  style={{ background: P.successSoft, color: P.success }}
                >
                  ✓ Photo quality check passed.
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={goBack}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-2.5"
                    style={{ borderColor: P.border, color: P.text }}
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={goNext}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-white"
                    style={{ background: P.blue }}
                  >
                    Analyse Photo <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {screen === 8 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: P.blueSoft }}
            >
              <Sparkles
                className="h-10 w-10 animate-pulse"
                style={{ color: P.blue }}
              />
            </div>
            <h2 className="mb-2" style={{ color: P.text }}>
              Analysing Your Photo
            </h2>
            <p className="mb-8 text-sm" style={{ color: P.muted }}>
              AI is reviewing visible skin characteristics.
            </p>
            <div className="mb-6 h-1.5 w-64 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full animate-pulse rounded-full"
                style={{ width: "60%", background: P.blue }}
              />
            </div>
            <div className="space-y-2 text-sm" style={{ color: P.muted }}>
              {[
                "Checking photo quality…",
                "Detecting skin regions…",
                "Analysing visible markers…",
              ].map((t) => (
                <p key={t} className="flex items-center justify-center gap-2">
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    style={{ color: P.blue }}
                  />{" "}
                  {t}
                </p>
              ))}
            </div>
          </div>
        )}

        {screen === 9 && (
          <div>
            <div className="mb-6 flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl"
                style={{ background: P.blueSoft }}
              >
                <Sparkles className="h-4 w-4" style={{ color: P.blue }} />
              </div>
              <div>
                <h2 className="text-lg" style={{ color: P.text }}>
                  AI Observation
                </h2>
                <p className="text-xs" style={{ color: P.muted }}>
                  Supplementary only — does not override survey data
                </p>
              </div>
            </div>

            <div className={cardCls + " mb-6"}>
              {[
                {
                  label: "Acne Severity",
                  value: AI_OBSERVATION.acneSeverity,
                  color: P.warning,
                },
                {
                  label: "Dark Spots",
                  value: AI_OBSERVATION.darkSpots,
                  color: P.warning,
                },
                {
                  label: "Pore Size",
                  value: AI_OBSERVATION.poreSize,
                  color: P.blue,
                },
                {
                  label: "Wrinkle Depth",
                  value: AI_OBSERVATION.wrinkleDepth,
                  color: P.success,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b py-3 last:border-0"
                  style={{ borderColor: P.border }}
                >
                  <span className="text-sm" style={{ color: P.text }}>
                    {item.label}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: item.color + "20", color: item.color }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen(10)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-white"
              style={{ background: P.blue }}
            >
              Generate Recommendations <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {screen === 10 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: P.blueSoft }}
            >
              <Loader2
                className="h-10 w-10 animate-spin"
                style={{ color: P.blue }}
              />
            </div>
            <h2 className="mb-2" style={{ color: P.text }}>
              Running Recommendation Engine
            </h2>
            <p className="mb-8 text-sm" style={{ color: P.muted }}>
              Applying allergy rules, ingredient conflicts, safety checks, and
              goal mapping…
            </p>
            <div className="w-64 space-y-2 text-left">
              {[
                ["Goal → Active Ingredient Mapping", true],
                ["Find Suitable Products", true],
                ["Apply Allergy Rules", true],
                ["Apply Conflict Rules", true],
                ["Apply Safety Rules", !engineLoading],
                ["Rank & Generate", !engineLoading],
              ].map(([label, done], i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {done ? (
                    <CheckCircle
                      className="h-4 w-4 shrink-0"
                      style={{ color: P.success }}
                    />
                  ) : (
                    <Loader2
                      className="h-4 w-4 shrink-0 animate-spin"
                      style={{ color: P.blue }}
                    />
                  )}
                  <span style={{ color: done ? P.text : P.muted }}>
                    {label as string}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {screen === 11 && (
          <div>
            {pendingAdd && <ConflictModal />}

            <div className="mb-1 flex items-center gap-2">
              <span
                className="rounded-full px-2 py-0.5 text-xs"
                style={{ background: P.blueSoft, color: P.blue }}
              >
                Step 3 of 4 — Recommendations
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-xs"
                style={{ background: P.light, color: P.muted }}
              >
                Baumann {baumannCode}
              </span>
            </div>
            <h2 className="mb-1" style={{ color: P.text }}>
              Personalised Recommendations
            </h2>
            <p className="mb-4 text-sm" style={{ color: P.muted }}>
              Based on your skin profile and goals.
            </p>

            {conflictProduct &&
              survey.currentIngredients.includes(
                conflictProduct.conflictIngredient ?? "",
              ) && (
                <div
                  className="mb-4 flex items-start gap-2 rounded-xl p-3 text-sm"
                  style={{ background: P.warningSoft }}
                >
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: P.warning }}
                  />
                  <div style={{ color: P.text }}>
                    <strong>Advisory:</strong> Your survey shows current{" "}
                    <strong>Retinol</strong> use. Adding{" "}
                    <strong>{conflictProduct.name}</strong> to your cart will
                    trigger a conflict warning.
                  </div>
                </div>
              )}

            <div className="mb-5 space-y-3">
              {activeProducts.map((p) => {
                const shopIdMap: Record<string, string> = {
                  p1: "niacinamide-serum",
                  p2: "niacinamide-serum",
                  p3: "aha-toner",
                  p4: "oil-free-moisturiser",
                  p5: "spf50",
                };
                const shopProduct = SHOP_PRODUCTS.find(
                  (sp) => sp.id === shopIdMap[p.id],
                );
                const inCart = shopProduct
                  ? cart.some((ci) => ci.product.id === shopProduct.id)
                  : false;
                const justAdded = justAddedToCart[p.id];

                return (
                  <div
                    key={p.id}
                    className={cardCls}
                    style={{
                      borderLeft: inCart ? `3px solid ${P.success}` : undefined,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                        style={{ background: P.light }}
                      >
                        {p.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <div>
                            <p
                              className="text-sm font-semibold"
                              style={{ color: P.text }}
                            >
                              {p.name}
                            </p>
                            <p className="text-xs" style={{ color: P.muted }}>
                              {p.brand} · {p.category}
                            </p>
                          </div>
                          <span
                            className="shrink-0 font-bold"
                            style={{ color: P.text }}
                          >
                            {p.price}
                          </span>
                        </div>
                        <p className="mb-2 text-xs" style={{ color: P.muted }}>
                          {p.description}
                        </p>
                        <div className="mb-2 flex flex-wrap gap-1">
                          {p.ingredients.map((ing) => (
                            <span
                              key={ing}
                              className="rounded-full px-2 py-0.5 text-xs"
                              style={{ background: P.light, color: P.text }}
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                        <div className="mb-3 flex flex-wrap gap-1">
                          {p.whyRecommended.map((r) => (
                            <span
                              key={r}
                              className="rounded-full px-2 py-0.5 text-xs"
                              style={{
                                background: P.successSoft,
                                color: P.success,
                              }}
                            >
                              ✓ {r}
                            </span>
                          ))}
                        </div>
                        {shopProduct ? (
                          <button
                            onClick={() => {
                              const result = addToCart(
                                shopProduct,
                                "recommendation",
                              );
                              if (result === "added") {
                                setJustAddedToCart((prev) => ({
                                  ...prev,
                                  [p.id]: true,
                                }));
                                setTimeout(
                                  () =>
                                    setJustAddedToCart((prev) => ({
                                      ...prev,
                                      [p.id]: false,
                                    })),
                                  1800,
                                );
                              }
                            }}
                            className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm text-white"
                            style={{
                              background: justAdded
                                ? P.success
                                : inCart
                                  ? "#64748B"
                                  : P.blue,
                            }}
                          >
                            <ShoppingCart className="h-4 w-4" />
                            {justAdded
                              ? "✓ Added to Cart"
                              : inCart
                                ? "In Cart"
                                : "+ Add to Cart"}
                          </button>
                        ) : (
                          <span className="text-xs" style={{ color: P.muted }}>
                            Available in-clinic only
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="mb-3 rounded-2xl p-4"
              style={{ background: P.blueSoft }}
            >
              <p
                className="mb-1 text-sm font-semibold"
                style={{ color: P.blue }}
              >
                Next step: Purchase your products
              </p>
              <p className="mb-3 text-xs" style={{ color: P.muted }}>
                {cart.length > 1
                  ? `${cart.reduce((s, i) => s + i.qty, 0)} item(s) in your cart — conflict detection will run at checkout.`
                  : "Add recommended products above, then proceed to cart."}
              </p>
              <Link
                href={"/user/cart" as Route}
                className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm text-white"
                style={{ background: P.blue }}
              >
                <ShoppingCart className="h-4 w-4" />
                Continue to Cart →
              </Link>
            </div>

            <button
              onClick={() => setScreen(12)}
              className="w-full cursor-pointer rounded-2xl border py-2.5 text-sm"
              style={{ borderColor: P.border, color: P.muted }}
            >
              Skip purchase — Generate Routine only
            </button>
          </div>
        )}

        {screen === 12 && (
          <div>
            <h2 className="mb-6 text-lg" style={{ color: P.text }}>
              Your Personalised Routine
            </h2>

            {[
              {
                icon: Sun,
                iconColor: "#F59E0B",
                title: "AM Routine",
                time: "Morning",
                steps: [
                  {
                    step: 1,
                    name: "Gentle Foaming Cleanser",
                    category: "Cleanser",
                    emoji: "🧴",
                    note: "Remove overnight buildup without stripping.",
                  },
                  {
                    step: 2,
                    name: "Niacinamide 10% + Zinc Serum",
                    category: "Treatment Serum",
                    emoji: "💧",
                    note: "Apply to damp skin for best absorption.",
                  },
                  {
                    step: 3,
                    name: "Oil-Free Hydrating Moisturiser",
                    category: "Moisturiser",
                    emoji: "🌿",
                    note: "Seal in hydration before SPF.",
                  },
                  {
                    step: 4,
                    name: "SPF 50 PA++++ Fluid Sunscreen",
                    category: "Sunscreen",
                    emoji: "☀️",
                    note: "Final step — do not skip in humid climates.",
                  },
                ],
                stepColor: P.blue,
              },
              {
                icon: Moon,
                iconColor: P.blue,
                title: "PM Routine",
                time: "Evening",
                steps: [
                  {
                    step: 1,
                    name: "Gentle Foaming Cleanser",
                    category: "Cleanser",
                    emoji: "🧴",
                    note: "Double cleanse if wearing sunscreen.",
                  },
                  {
                    step: 2,
                    name: "Niacinamide 10% + Zinc Serum",
                    category: "Treatment Serum",
                    emoji: "💧",
                    note: "Can layer with AHA on alternate nights.",
                  },
                  ...(!removedProducts.includes("p3")
                    ? [
                        {
                          step: 3,
                          name: "AHA 7% + BHA 1% Toning Solution",
                          category: "Exfoliant (2–3×/week)",
                          emoji: "⚗️",
                          note: "Alternate with Retinol — do not use same night.",
                        },
                      ]
                    : []),
                  {
                    step: !removedProducts.includes("p3") ? 4 : 3,
                    name: "Oil-Free Hydrating Moisturiser",
                    category: "Moisturiser",
                    emoji: "🌿",
                    note: "Lock in active ingredients overnight.",
                  },
                ],
                stepColor: "#6366F1",
              },
            ].map((routine) => (
              <div key={routine.title} className={cardCls + " mb-4"}>
                <div className="mb-4 flex items-center gap-2">
                  <routine.icon
                    className="h-5 w-5"
                    style={{ color: routine.iconColor }}
                  />
                  <h3 className="text-base" style={{ color: P.text }}>
                    {routine.title}
                  </h3>
                  <span className="ml-auto text-xs" style={{ color: P.muted }}>
                    {routine.time}
                  </span>
                </div>
                {routine.steps.map((item) => (
                  <div
                    key={item.step}
                    className="mb-3 flex items-center gap-3 last:mb-0"
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: routine.stepColor }}
                    >
                      {item.step}
                    </div>
                    <span className="text-xl">{item.emoji}</span>
                    <div className="flex-1">
                      <p
                        className="text-sm font-medium"
                        style={{ color: P.text }}
                      >
                        {item.name}
                      </p>
                      <p className="text-xs" style={{ color: P.muted }}>
                        {item.note}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-xs"
                      style={{ background: P.light, color: P.muted }}
                    >
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={() => setScreen(13)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-white"
              style={{ background: P.blue }}
            >
              Activate Routine <CheckCircle className="h-5 w-5" />
            </button>
          </div>
        )}

        {screen === 13 && (
          <div className="text-center">
            <div className="mb-8">
              <div
                className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full"
                style={{ background: P.successSoft }}
              >
                <CheckCircle
                  className="h-12 w-12"
                  style={{ color: P.success }}
                />
              </div>
              <h1 style={{ color: P.text }}>Routine Successfully Activated</h1>
              <p className="mt-2 text-sm" style={{ color: P.muted }}>
                Your personalised skincare routine is ready.
              </p>
            </div>

            <div className={cardCls + " mb-4 text-left"}>
              <p className="mb-3 font-semibold" style={{ color: P.text }}>
                Treatment Summary
              </p>
              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-xs" style={{ color: P.muted }}>
                    Baumann Profile
                  </p>
                  <span
                    className="rounded-full px-3 py-1 text-sm font-bold"
                    style={{ background: P.blueLight, color: P.blue }}
                  >
                    {baumannCode}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs" style={{ color: P.muted }}>
                    Treatment Goals
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {survey.treatmentGoals.map((g) => (
                      <span
                        key={g}
                        className="rounded-full px-2 py-0.5 text-xs"
                        style={{ background: P.blueSoft, color: P.blue }}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs" style={{ color: P.muted }}>
                    Primary Concern
                  </p>
                  <span className="text-sm" style={{ color: P.text }}>
                    {survey.currentConcern}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-xs" style={{ color: P.muted }}>
                    Products in Routine
                  </p>
                  <p className="text-sm" style={{ color: P.text }}>
                    {activeProducts.length} products selected
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/user/routine" as Route)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-5 py-2.5"
                style={{ borderColor: P.blue, color: P.blue }}
              >
                View Routine
              </button>
              <button
                onClick={() => router.push("/user" as Route)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-white"
                style={{ background: P.blue }}
              >
                Finish <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
