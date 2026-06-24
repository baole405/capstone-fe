import Link from "next/link";
import type { Product } from "../types";

const T = {
  ink: "#2B2228",
  muted: "#8E8086",
  faint: "#A99CA2",
  mono: "var(--font-mono), ui-monospace, monospace",
};

const CATEGORY_TINTS: Record<string, [string, string]> = {
  "Sữa rửa mặt": ["#FBEDF1", "#B5728B"],
  "Serum trị liệu": ["#ECE8F6", "#8175B0"],
  "Serum dưỡng sáng": ["#F7F0E9", "#B0916E"],
  "Tẩy tế bào chết": ["#E4F1E9", "#5E9579"],
  "Kem dưỡng ẩm": ["#E8EFF6", "#6E8AAE"],
  "Kem chống nắng": ["#FBEDF1", "#B5728B"],
};

const tintFor = (category: string): [string, string] =>
  CATEGORY_TINTS[category] ?? ["#F7F0E9", "#B0916E"];

const stripe = (a = 0.022, gap = 12) =>
  `repeating-linear-gradient(135deg, rgba(43,34,40,${a}) 0px, rgba(43,34,40,${a}) 1px, transparent 1px, transparent ${gap}px)`;

const formatVND = (price: number) => `${price.toLocaleString("vi-VN")}₫`;

function pagerRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3)
    return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

type Props = {
  products: Product[];
  activeCategory: string;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ProductGrid({
  products,
  activeCategory,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <main
      style={{
        flex: 1,
        padding: "26px 30px 36px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 18 }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 3px",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: T.ink,
            }}
          >
            {activeCategory === "All" ? "Tất cả sản phẩm" : activeCategory}
          </h1>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: T.faint }}>
            {totalCount} sản phẩm · sắp xếp theo phù hợp nhất
          </span>
        </div>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}
      >
        {products.map((product) => {
          const [bg, labelColor] = tintFor(product.category);
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group"
              style={{ textDecoration: "none" }}
            >
              <div
                className="transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md"
                style={{
                  background: "#fff",
                  border: "1px solid #ECE3E6",
                  borderRadius: 13,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Tile */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    backgroundColor: bg,
                    backgroundImage: stripe(),
                    overflow: "hidden",
                    borderRadius: "13px 13px 0 0",
                  }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="transition-transform duration-500 group-hover:scale-105"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 40,
                      }}
                    >
                      🧴
                    </div>
                  )}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 8,
                      left: 10,
                      fontFamily: T.mono,
                      fontSize: 8,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: labelColor,
                    }}
                  >
                    {product.category}
                  </span>
                </div>

                {/* Body */}
                <div
                  style={{
                    padding: "10px 12px 12px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 8.5,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: T.faint,
                    }}
                  >
                    {product.brand}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.ink,
                      lineHeight: 1.3,
                      margin: "5px 0 8px",
                    }}
                  >
                    {product.name}
                  </div>
                  <div style={{ marginTop: "auto" }}>
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: 12,
                        fontWeight: 500,
                        color: T.ink,
                      }}
                    >
                      {formatVND(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {products.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "48px 0",
              color: T.muted,
            }}
          >
            Không tìm thấy sản phẩm phù hợp.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-center"
          style={{ gap: 6, paddingTop: 32, marginTop: "auto" }}
        >
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              border: `1px solid ${currentPage === 1 ? "#E8E0E4" : "#C8BEC3"}`,
              background: "#fff",
              borderRadius: 9,
              width: 36,
              height: 36,
              cursor: currentPage === 1 ? "default" : "pointer",
              color: currentPage === 1 ? T.faint : T.ink,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>

          {pagerRange(currentPage, totalPages).map((p, i) =>
            p === "…" ? (
              <span
                key={`ellipsis-${i}`}
                style={{
                  fontFamily: T.mono,
                  fontSize: 12,
                  color: T.faint,
                  padding: "0 4px",
                }}
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                style={{
                  border: `1px solid ${p === currentPage ? "var(--color-primary)" : "#E8E0E4"}`,
                  background:
                    p === currentPage ? "var(--color-primary)" : "#fff",
                  color: p === currentPage ? "#fff" : T.ink,
                  borderRadius: 9,
                  width: 36,
                  height: 36,
                  cursor: "pointer",
                  fontFamily: T.mono,
                  fontSize: 12,
                  fontWeight: p === currentPage ? 600 : 400,
                }}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              border: `1px solid ${currentPage === totalPages ? "#E8E0E4" : "#C8BEC3"}`,
              background: "#fff",
              borderRadius: 9,
              width: 36,
              height: 36,
              cursor: currentPage === totalPages ? "default" : "pointer",
              color: currentPage === totalPages ? T.faint : T.ink,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}
