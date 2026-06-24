"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Search } from "lucide-react";
import { useProducts } from "../hooks/use-products";
import { ProductListSkeleton } from "./product-list-skeleton";
import { ProductGrid } from "./product-grid";

const T = {
  ink: "#2B2228",
  ink2: "#5C5258",
  muted: "#8E8086",
  faint: "#A99CA2",
  faint2: "#C0B2B8",
  card: "var(--color-card)",
  panel: "#FCFAFB",
  line: "var(--color-border)",
  line2: "var(--color-border)",
  rose: "var(--color-primary)",
  roseSoft: "color-mix(in oklab, var(--color-primary) 12%, white)",
  roseInk: "var(--color-primary)",
  mono: "var(--font-mono), ui-monospace, monospace",
};

const monoStyle = (
  size: number,
  spacing = 0.18,
  color = T.faint,
): CSSProperties => ({
  fontFamily: T.mono,
  fontSize: size,
  letterSpacing: `${spacing}em`,
  textTransform: "uppercase",
  color,
});

const STATIC_CATEGORIES = [
  "All",
  "Sữa rửa mặt",
  "Serum trị liệu",
  "Serum dưỡng sáng",
  "Tẩy tế bào chết",
  "Kem dưỡng ẩm",
  "Kem chống nắng",
];

const CONCERNS = ["Xỉn màu", "Mụn", "Khô da", "Kết cấu da"];
const ITEMS_PER_PAGE = 15;

export function ProductList() {
  const { data: products = [], isLoading, isError } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeConcern, setActiveConcern] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.ingredients.some((i) => i.toLowerCase().includes(q));
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesConcern =
        !activeConcern || p.concerns.includes(activeConcern);
      return matchesSearch && matchesCategory && matchesConcern;
    });
  }, [searchQuery, activeCategory, activeConcern, products]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filtered, currentPage],
  );

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: products.length };
    for (const p of products) m[p.category] = (m[p.category] ?? 0) + 1;
    return m;
  }, [products]);

  const setCategory = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };
  const setConcern = (c: string | null) => {
    setActiveConcern(c);
    setCurrentPage(1);
  };
  const setSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  if (isLoading) return <ProductListSkeleton />;

  if (isError) {
    return (
      <div
        style={{
          padding: "80px 0",
          textAlign: "center",
          color: T.muted,
          fontFamily: "var(--font-sans), sans-serif",
        }}
      >
        Không thể tải sản phẩm.
      </div>
    );
  }

  return (
    <div
      style={{
        background: T.card,
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${T.line2}`,
        fontFamily: "var(--font-sans), sans-serif",
        color: T.ink,
      }}
    >
      <div className="flex">
        {/* Filter rail */}
        <aside
          style={{
            width: 236,
            flexShrink: 0,
            borderRight: `1px solid ${T.line2}`,
            padding: "26px 24px",
            background: T.panel,
          }}
        >
          {/* Search */}
          <div
            className="flex items-center"
            style={{
              gap: 9,
              background: "#fff",
              border: `1px solid ${T.line}`,
              borderRadius: 10,
              padding: "9px 12px",
              marginBottom: 24,
            }}
          >
            <Search
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: T.faint2 }}
            />
            <input
              placeholder="Tìm sản phẩm…"
              value={searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontFamily: "inherit",
                fontSize: 13,
                color: T.ink,
                background: "transparent",
              }}
            />
          </div>

          <div style={{ ...monoStyle(10, 0.2), marginBottom: 14 }}>
            Danh mục
          </div>
          <div className="flex flex-col" style={{ gap: 2, marginBottom: 28 }}>
            {STATIC_CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="flex items-center justify-between transition-all duration-150"
                  style={{
                    padding: "8px 11px",
                    borderRadius: 9,
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    background: active ? T.roseSoft : "transparent",
                    fontSize: 13.5,
                    fontWeight: active ? 600 : 400,
                    color: active ? T.roseInk : T.ink2,
                  }}
                >
                  <span>{cat === "All" ? "Tất cả" : cat}</span>
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 11,
                      color: active ? "var(--color-primary)" : T.faint2,
                    }}
                  >
                    {counts[cat] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ ...monoStyle(10, 0.2), marginBottom: 14 }}>
            Mối lo ngại
          </div>
          <div className="flex flex-wrap" style={{ gap: 7 }}>
            {CONCERNS.map((c) => {
              const active = activeConcern === c;
              return (
                <button
                  key={c}
                  onClick={() => setConcern(active ? null : c)}
                  className="transition-all duration-150"
                  style={{
                    fontSize: 12,
                    cursor: "pointer",
                    borderRadius: 999,
                    padding: "6px 12px",
                    background: active ? T.rose : "#fff",
                    color: active ? "#fff" : T.ink2,
                    border: `1px solid ${active ? T.rose : T.line}`,
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </aside>

        <ProductGrid
          products={paginated}
          activeCategory={activeCategory}
          totalCount={filtered.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
