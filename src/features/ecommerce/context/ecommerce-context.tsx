"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export const P = {
  blue: "#5B8DEF",
  blueMid: "#4070D4",
  blueSoft: "#EEF3FD",
  blueLight: "#D6E4FF",
  success: "#2BB673",
  successSoft: "#E8F8F1",
  warning: "#F59E0B",
  warningSoft: "#FEF3C7",
  danger: "#EF4444",
  dangerSoft: "#FEF2F2",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#1E293B",
  muted: "#64748B",
  light: "#F1F5F9",
};

export interface ShopProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  ingredientLabels: string[];
  usage: string;
  warnings: string;
  price: number;
  emoji: string;
  tag?: string;
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "retinol-serum",
    name: "Retinol Night Serum",
    brand: "DermActiv",
    category: "Treatment Serum",
    description:
      "Vitamin A derivative that accelerates cell turnover and visibly reduces fine lines overnight.",
    longDescription:
      "Formulated with 0.3% encapsulated retinol for gradual, tolerable delivery. Reduces wrinkle depth, smooths texture, and fades post-acne marks with consistent use. Suitable for first-time retinol users.",
    ingredients: ["Retinol"],
    ingredientLabels: [
      "Retinol 0.3% (encapsulated)",
      "Squalane",
      "Vitamin E",
      "Ceramide NP",
    ],
    usage:
      "Apply 2–3 drops to clean, dry skin on PM routine. Start 2×/week; increase as tolerated.",
    warnings:
      "⚠️ Do not combine with AHA, BHA, or Vitamin C on the same night. Avoid during pregnancy.",
    price: 38,
    emoji: "🌙",
    tag: "Anti-Aging",
  },
  {
    id: "aha-toner",
    name: "AHA Exfoliating Toner",
    brand: "PeelPro",
    category: "Exfoliant",
    description:
      "Glycolic acid toner that resurfaces skin, refines texture, and brightens dull complexion.",
    longDescription:
      "Contains 7% Glycolic Acid (AHA) with aloe vera and panthenol to minimise irritation. Unclogs pores, improves skin tone, and enhances absorption of subsequent products. Use 2–3×/week.",
    ingredients: ["Glycolic Acid"],
    ingredientLabels: [
      "Glycolic Acid 7%",
      "Aloe Vera",
      "Panthenol",
      "Sodium PCA",
    ],
    usage:
      "Apply to clean skin with a cotton pad after cleansing. Do not rinse. Follow with moisturiser.",
    warnings:
      "⚠️ Do not use same night as Retinol or BHA. Increases sun sensitivity — always follow with SPF.",
    price: 22,
    emoji: "⚗️",
    tag: "Exfoliant",
  },
  {
    id: "niacinamide-serum",
    name: "Niacinamide 10% + Zinc Serum",
    brand: "Dermafix",
    category: "Brightening Serum",
    description:
      "High-strength niacinamide that controls sebum, minimises pores, and fades dark spots.",
    longDescription:
      "Combines 10% niacinamide with 1% zinc PCA for dual sebum and pigmentation control. Suitable for oily and combination skin. Compatible with most actives except direct Vitamin C mixing.",
    ingredients: ["Niacinamide"],
    ingredientLabels: [
      "Niacinamide 10%",
      "Zinc PCA 1%",
      "Hyaluronic Acid",
      "Glycerin",
    ],
    usage:
      "Apply 2–3 drops to face after cleansing. Use AM and/or PM. Compatible with most routines.",
    warnings:
      "Avoid direct mixing with pure Vitamin C. Apply separately with a few minutes gap.",
    price: 24,
    emoji: "💧",
    tag: "Best Seller",
  },
  {
    id: "oil-free-moisturiser",
    name: "Oil-Free Hydrating Moisturiser",
    brand: "AquaBalance",
    category: "Moisturiser",
    description:
      "Lightweight gel-cream that delivers deep hydration without adding shine or clogging pores.",
    longDescription:
      "Non-comedogenic formula with ceramides and hyaluronic acid. Strengthens the skin barrier, locks in moisture, and creates a smooth canvas for SPF. Ideal for oily, combination, and sensitive skin types.",
    ingredients: ["Ceramide", "Hyaluronic Acid"],
    ingredientLabels: [
      "Ceramide NP",
      "Hyaluronic Acid",
      "Allantoin",
      "Panthenol",
    ],
    usage:
      "Apply a pea-sized amount AM and PM after serums. Use as final step before SPF.",
    warnings:
      "For external use only. Patch test recommended for sensitive skin.",
    price: 28,
    emoji: "🌿",
    tag: "Fragrance-Free",
  },
  {
    id: "spf50",
    name: "SPF 50 PA++++ Fluid Sunscreen",
    brand: "SunGuard",
    category: "Sunscreen",
    description:
      "Ultra-light mineral-chemical hybrid SPF with no white cast and no fragrance.",
    longDescription:
      "Provides broad-spectrum protection with Zinc Oxide and Tinosorb S. Water-resistant for 80 minutes. Leaves a dewy, non-greasy finish. Suitable for all skin tones — zero white cast formula.",
    ingredients: ["UV Filters"],
    ingredientLabels: [
      "Zinc Oxide 10%",
      "Tinosorb S",
      "Vitamin E",
      "Niacinamide 2%",
    ],
    usage:
      "Apply generously 15 minutes before sun exposure. Reapply every 2 hours outdoors.",
    warnings: "Keep out of eyes. If irritation occurs, discontinue use.",
    price: 32,
    emoji: "☀️",
    tag: "PA++++",
  },
];

interface ConflictRule {
  ingredients: string[];
  label: string;
  explanation: string;
}

export const CONFLICT_RULES: ConflictRule[] = [
  {
    ingredients: ["Retinol", "Glycolic Acid"],
    label: "Retinol + AHA",
    explanation:
      "Retinol and AHA (Glycolic Acid) are both potent actives. Using them together in the same routine significantly increases skin irritation, redness, and peeling risk — especially for sensitive skin. Alternate their use on different nights instead.",
  },
  {
    ingredients: ["Retinol", "Salicylic Acid"],
    label: "Retinol + BHA",
    explanation:
      "Retinol and BHA (Salicylic Acid) both promote cell turnover. Combined use can cause over-exfoliation, barrier damage, and excessive dryness. Use on alternate nights.",
  },
  {
    ingredients: ["Vitamin C", "Glycolic Acid"],
    label: "Vitamin C + AHA",
    explanation:
      "High-strength AHA used with Vitamin C can destabilise the Vitamin C and cause unnecessary irritation. Use Vitamin C in the AM and AHA in the PM.",
  },
];

export interface CartItem {
  product: ShopProduct;
  qty: number;
  addedFrom: "catalog" | "recommendation";
}

export interface CartConflict {
  productA: ShopProduct;
  productB: ShopProduct;
  rule: ConflictRule;
}

function detectConflicts(items: CartItem[]): CartConflict[] {
  const conflicts: CartConflict[] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i].product;
      const b = items[j].product;
      for (const rule of CONFLICT_RULES) {
        const aHas = a.ingredients.some((ing) =>
          rule.ingredients.includes(ing),
        );
        const bHas = b.ingredients.some((ing) =>
          rule.ingredients.includes(ing),
        );
        if (aHas && bHas) {
          const alreadyAdded = conflicts.some(
            (c) =>
              (c.productA.id === a.id && c.productB.id === b.id) ||
              (c.productA.id === b.id && c.productB.id === a.id),
          );
          if (!alreadyAdded) conflicts.push({ productA: a, productB: b, rule });
        }
      }
    }
  }
  return conflicts;
}

interface PendingAdd {
  product: ShopProduct;
  from: "catalog" | "recommendation";
  conflict: CartConflict;
}

interface EcommerceContextValue {
  cart: CartItem[];
  conflicts: CartConflict[];
  pendingAdd: PendingAdd | null;
  orderId: string | null;
  completedCart: CartItem[];
  completedConflicts: CartConflict[];
  addToCart: (
    product: ShopProduct,
    from?: "catalog" | "recommendation",
  ) => "added" | "conflict";
  confirmConflictAdd: () => void;
  dismissConflictAdd: () => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  placeOrder: () => void;
  clearOrder: () => void;
}

const EcommerceContext = createContext<EcommerceContextValue | null>(null);

export function EcommerceProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pendingAdd, setPendingAdd] = useState<PendingAdd | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [completedCart, setCompletedCart] = useState<CartItem[]>([]);
  const [completedConflicts, setCompletedConflicts] = useState<CartConflict[]>(
    [],
  );

  const conflicts = detectConflicts(cart);

  const addToCart = (
    product: ShopProduct,
    from: "catalog" | "recommendation" = "catalog",
  ): "added" | "conflict" => {
    if (cart.some((i) => i.product.id === product.id)) {
      setCart((prev) =>
        prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        ),
      );
      return "added";
    }
    const hypothetical = [...cart, { product, qty: 1, addedFrom: from }];
    const newConflicts = detectConflicts(hypothetical).filter(
      (nc) =>
        !conflicts.some(
          (ec) =>
            ec.productA.id === nc.productA.id &&
            ec.productB.id === nc.productB.id,
        ),
    );
    if (newConflicts.length > 0) {
      setPendingAdd({ product, from, conflict: newConflicts[0] });
      return "conflict";
    }
    setCart((prev) => [...prev, { product, qty: 1, addedFrom: from }]);
    return "added";
  };

  const confirmConflictAdd = () => {
    if (!pendingAdd) return;
    setCart((prev) => [
      ...prev,
      { product: pendingAdd.product, qty: 1, addedFrom: pendingAdd.from },
    ]);
    setPendingAdd(null);
  };

  const dismissConflictAdd = () => setPendingAdd(null);

  const removeFromCart = (productId: string) =>
    setCart((prev) => prev.filter((i) => i.product.id !== productId));

  const updateQty = (productId: string, qty: number) => {
    if (qty < 1) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty } : i)),
    );
  };

  const placeOrder = () => {
    setCompletedCart([...cart]);
    setCompletedConflicts([...conflicts]);
    setOrderId(`GS-${Date.now().toString().slice(-6)}`);
    setCart([]);
  };

  const clearOrder = () => {
    setOrderId(null);
    setCompletedCart([]);
    setCompletedConflicts([]);
  };

  return (
    <EcommerceContext.Provider
      value={{
        cart,
        conflicts,
        pendingAdd,
        orderId,
        completedCart,
        completedConflicts,
        addToCart,
        confirmConflictAdd,
        dismissConflictAdd,
        removeFromCart,
        updateQty,
        placeOrder,
        clearOrder,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
}

export function useEcommerce() {
  const ctx = useContext(EcommerceContext);
  if (!ctx)
    throw new Error("useEcommerce must be used inside EcommerceProvider");
  return ctx;
}

export function ConflictModal() {
  const { pendingAdd, confirmConflictAdd, dismissConflictAdd } = useEcommerce();
  const [showLearnMore, setShowLearnMore] = useState(false);

  if (!pendingAdd) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ background: P.warningSoft }}
          >
            <span className="text-xl">⚠️</span>
          </div>
          <div>
            <h3 style={{ color: P.text }}>
              Potential Ingredient Conflict Detected
            </h3>
            <p className="text-xs" style={{ color: P.muted }}>
              {pendingAdd.conflict.rule.label}
            </p>
          </div>
        </div>

        <div
          className="mb-4 rounded-xl p-4"
          style={{
            background: P.warningSoft,
            borderLeft: `4px solid ${P.warning}`,
          }}
        >
          <p className="mb-1 text-sm" style={{ color: P.text }}>
            Your cart contains{" "}
            <strong>{pendingAdd.conflict.productA.name}</strong>.
          </p>
          <p className="text-sm" style={{ color: P.text }}>
            Adding <strong>{pendingAdd.product.name}</strong> (
            {pendingAdd.conflict.rule.label.split("+")[1]?.trim()}) may increase
            irritation risk when used in the same routine.
          </p>
        </div>

        {showLearnMore && (
          <div
            className="mb-4 rounded-xl p-4 text-sm"
            style={{ background: P.blueSoft, color: P.text }}
          >
            <p className="mb-2 font-semibold" style={{ color: P.blue }}>
              Why does this conflict exist?
            </p>
            <p style={{ color: P.muted }}>
              {pendingAdd.conflict.rule.explanation}
            </p>
            <p className="mt-2 text-xs" style={{ color: P.muted }}>
              This warning is informational only and does not prevent purchase.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            onClick={confirmConflictAdd}
            className="w-full cursor-pointer rounded-xl py-2.5 text-sm text-white"
            style={{ background: P.warning }}
          >
            Continue Anyway — Add to Cart
          </button>
          <button
            onClick={dismissConflictAdd}
            className="w-full cursor-pointer rounded-xl border py-2.5 text-sm"
            style={{ borderColor: P.border, color: P.text }}
          >
            Remove Product — Don&apos;t Add
          </button>
          <button
            onClick={() => setShowLearnMore((v) => !v)}
            className="w-full cursor-pointer py-2 text-sm"
            style={{ color: P.blue }}
          >
            {showLearnMore
              ? "Hide explanation"
              : "Learn More about this conflict →"}
          </button>
        </div>
      </div>
    </div>
  );
}
