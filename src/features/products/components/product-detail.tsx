"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { useProduct, useProducts } from "../hooks/use-products";
import { ProductDetailSkeleton } from "./product-detail-skeleton";

const T = {
  ink: "#2B2228",
  ink2: "#5C5258",
  muted: "#8E8086",
  faint: "#A99CA2",
  faint2: "#C0B2B8",
  bg: "var(--color-background)",
  line: "var(--color-border)",
  line2: "var(--color-border)",
  rose: "var(--color-primary)",
  roseInk: "var(--color-primary)",
  amberBg: "#FBEFD9",
  amberInk: "#B07B2C",
  amberDot: "#E0A23C",
  mintBg: "#E4F1E9",
  mintInk: "#5E9579",
  mintText: "#3F7355",
  lavBg: "#ECE8F6",
  lavInk: "#8175B0",
  lavText: "#4A4060",
  mono: "var(--font-mono), ui-monospace, monospace",
};

const stripe = (a = 0.022, gap = 13) =>
  `repeating-linear-gradient(135deg, rgba(43,34,40,${a}) 0px, rgba(43,34,40,${a}) 1px, transparent 1px, transparent ${gap}px)`;

const eyebrow = (color = T.faint2): CSSProperties => ({
  fontFamily: T.mono,
  fontSize: 10,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color,
  marginBottom: 9,
});

const HOW_TO_USE = [
  { n: "01", text: "Rửa mặt sạch, để da còn hơi ẩm." },
  { n: "02", text: "Nhấn nhẹ 3–4 giọt lên mặt và cổ." },
  { n: "03", text: "Tiếp theo dùng kem dưỡng để giữ ẩm." },
  { n: "04", text: "Luôn dùng kem chống nắng vào buổi sáng." },
];

const SIMILAR_TINTS: [string, string][] = [
  ["#ECE8F6", "#8175B0"],
  ["#F7F0E9", "#B0916E"],
  ["#E4F1E9", "#5E9579"],
  ["#FBEDF1", "#B5728B"],
];

type Props = {
  slug: string;
};

export function ProductDetail({ slug }: Props) {
  const { data: product, isLoading, isError } = useProduct(slug);
  const { data: allProducts = [] } = useProducts();
  const [quantity, setQuantity] = useState(1);

  const formatVND = (price: number) => `${price.toLocaleString("vi-VN")}₫`;

  if (isLoading) return <ProductDetailSkeleton />;

  if (isError || !product) {
    return (
      <div
        className="mx-auto max-w-2xl text-center"
        style={{
          padding: "48px 0",
          fontFamily: "var(--font-sans), sans-serif",
        }}
      >
        <div
          style={{
            background: "#FBEDEC",
            border: "1px solid #F3D9D6",
            borderRadius: 18,
            padding: 32,
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: T.ink,
              marginBottom: 8,
            }}
          >
            Không tìm thấy sản phẩm
          </h2>
          <p style={{ color: T.muted, marginBottom: 24 }}>
            Sản phẩm này không tồn tại hoặc đã bị gỡ.
          </p>
          <Link
            href="/shop"
            style={{
              background: T.rose,
              color: "#fff",
              borderRadius: 12,
              padding: "12px 22px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Xem sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const isLowStock = product.stock <= 5;
  const similar = allProducts.filter((p) => p.slug !== slug).slice(0, 4);
  const thumbnails = product.images?.length
    ? product.images.slice(0, 4)
    : (Array(4).fill(product.image) as string[]);

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 24px 40px",
        fontFamily: "var(--font-sans), sans-serif",
        color: T.ink,
      }}
    >
      <div
        style={{
          background: T.bg,
          borderRadius: 18,
          overflow: "hidden",
          border: `1px solid ${T.line2}`,
        }}
      >
        <div style={{ padding: "32px 40px 16px" }}>
          <Link
            href="/shop"
            className="group inline-flex items-center transition-colors hover:text-[var(--color-primary)]"
            style={{
              gap: 8,
              fontFamily: T.mono,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: T.muted,
              textDecoration: "none",
            }}
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />{" "}
            Quay lại cửa hàng
          </Link>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            padding: "8px 40px 44px",
          }}
        >
          {/* Image column */}
          <div>
            <div
              className="group"
              style={{
                aspectRatio: "1 / 1",
                borderRadius: 18,
                overflow: "hidden",
                background: "#F7F0E9",
                backgroundImage: stripe(),
                marginBottom: 14,
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="transition-transform duration-500 group-hover:scale-105"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              className="grid"
              style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}
            >
              {thumbnails.map((src, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: 12,
                    overflow: "hidden",
                    border:
                      i === 0 ? `2px solid ${T.rose}` : `1px solid ${T.line}`,
                  }}
                >
                  <img
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    className="transition-all duration-200 hover:scale-105 hover:opacity-100"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: i === 0 ? 1 : 0.6,
                      cursor: "pointer",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info column */}
          <div>
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: T.faint,
                marginBottom: 11,
              }}
            >
              {product.brand}
            </div>
            <h1
              style={{
                margin: "0 0 16px",
                fontSize: 34,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                fontWeight: 700,
                color: T.ink,
              }}
            >
              {product.name}
            </h1>

            <div
              className="flex items-center"
              style={{ gap: 14, marginBottom: 22 }}
            >
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 24,
                  fontWeight: 500,
                  color: T.ink,
                }}
              >
                {formatVND(product.price)}
              </span>
              {isLowStock && (
                <span
                  className="inline-flex items-center"
                  style={{
                    gap: 7,
                    background: T.amberBg,
                    color: T.amberInk,
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "6px 13px",
                    borderRadius: 999,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: T.amberDot,
                    }}
                  />{" "}
                  Chỉ còn {product.stock} sản phẩm
                </span>
              )}
            </div>

            {/* Pairing hint */}
            <div
              className="flex items-start"
              style={{ gap: 9, marginBottom: 26 }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: T.amberDot,
                  marginTop: 6,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, lineHeight: 1.5, color: T.muted }}>
                Không nên dùng cùng lúc với retinol — các xung đột thành phần sẽ
                được kiểm tra tự động trong{" "}
                <Link
                  href="/cart"
                  style={{
                    color: T.roseInk,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  giỏ hàng
                </Link>
                .
              </span>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 26 }}>
              <div style={eyebrow()}>Mô tả</div>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: T.ink2,
                }}
              >
                {product.description}
              </p>
            </div>

            {/* Key ingredients */}
            <div
              style={{
                border: `1px solid ${T.line}`,
                borderRadius: 15,
                padding: 20,
                marginBottom: 18,
              }}
            >
              <div style={{ ...eyebrow(T.faint), marginBottom: 13 }}>
                Thành phần chính
              </div>
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    style={{
                      fontFamily: T.mono,
                      fontSize: 12,
                      color: T.ink2,
                      background: "#F7F1F3",
                      padding: "7px 13px",
                      borderRadius: 8,
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Concerns */}
            <div
              style={{
                background: T.mintBg,
                borderRadius: 15,
                padding: 18,
                marginBottom: 18,
              }}
            >
              <div style={{ ...eyebrow(T.mintInk) }}>Phù hợp với</div>
              <div className="flex flex-wrap" style={{ gap: 6 }}>
                {product.concerns.map((c) => (
                  <span
                    key={c}
                    style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: T.mintText,
                      background: "#fff",
                      padding: "5px 11px",
                      borderRadius: 999,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Routine placement */}
            <div
              style={{
                background: T.lavBg,
                borderRadius: 15,
                padding: 18,
                marginBottom: 28,
              }}
            >
              <div style={{ ...eyebrow(T.lavInk) }}>Bước trong routine</div>
              <div
                style={{ fontSize: 14.5, fontWeight: 500, color: T.lavText }}
              >
                {product.routineSlot}
              </div>
            </div>

            {/* Quantity */}
            <div
              className="flex items-center"
              style={{ gap: 14, marginBottom: 14 }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>
                Số lượng
              </span>
              <div
                className="flex items-center"
                style={{
                  border: `1px solid ${T.line}`,
                  borderRadius: 11,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="bg-white transition-colors duration-150 hover:bg-gray-50"
                  style={{
                    border: "none",
                    width: 38,
                    height: 40,
                    fontSize: 17,
                    color: T.ink2,
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    fontFamily: T.mono,
                    width: 44,
                    textAlign: "center",
                    fontSize: 15,
                    color: T.ink,
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  disabled={quantity >= product.stock}
                  className="bg-white transition-colors duration-150 hover:bg-gray-50"
                  style={{
                    border: "none",
                    width: 38,
                    height: 40,
                    fontSize: 17,
                    color: T.ink2,
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
              <span style={{ fontSize: 13, color: T.muted }}>
                còn {product.stock} sản phẩm
              </span>
            </div>

            {/* Actions */}
            <div className="flex" style={{ gap: 12, marginBottom: 30 }}>
              <button
                disabled={product.stock === 0}
                className="transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                style={{
                  flex: 1,
                  border: "none",
                  cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  background: T.rose,
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: 15,
                  fontWeight: 600,
                  padding: 15,
                  borderRadius: 13,
                  opacity: product.stock === 0 ? 0.5 : 1,
                }}
              >
                Thêm vào giỏ
              </button>
              <button
                className="inline-flex items-center bg-white transition-all duration-150 hover:bg-gray-50 active:scale-[0.98]"
                style={{
                  gap: 8,
                  border: `1px solid ${T.line}`,
                  cursor: "pointer",
                  color: T.ink,
                  fontFamily: "inherit",
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "15px 22px",
                  borderRadius: 13,
                }}
              >
                <Calendar className="h-4 w-4" /> Thêm vào routine
              </button>
            </div>

            {/* How to use */}
            <div>
              <div style={{ ...eyebrow(T.faint2), marginBottom: 14 }}>
                Cách sử dụng
              </div>
              <div className="flex flex-col" style={{ gap: 12 }}>
                {HOW_TO_USE.map((s) => (
                  <div
                    key={s.n}
                    className="flex items-start"
                    style={{ gap: 14 }}
                  >
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: 12,
                        color: T.rose,
                        fontWeight: 500,
                        paddingTop: 1,
                      }}
                    >
                      {s.n}
                    </span>
                    <span
                      style={{ fontSize: 14, lineHeight: 1.45, color: T.ink2 }}
                    >
                      {s.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar products */}
        {similar.length > 0 && (
          <div
            style={{
              borderTop: `1px solid ${T.line2}`,
              padding: "34px 40px 44px",
              background: "#fff",
            }}
          >
            <div
              className="flex items-baseline justify-between"
              style={{ marginBottom: 22 }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: T.ink,
                }}
              >
                Kết hợp tốt với
              </h2>
              <Link
                href="/shop"
                style={{
                  fontFamily: T.mono,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: T.muted,
                  textDecoration: "none",
                }}
              >
                Xem tất cả →
              </Link>
            </div>
            <div
              className="grid"
              style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}
            >
              {similar.map((p, i) => {
                const [bg] = SIMILAR_TINTS[i % SIMILAR_TINTS.length];
                return (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    className="group"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md"
                      style={{
                        aspectRatio: "1 / 1",
                        borderRadius: 14,
                        overflow: "hidden",
                        backgroundColor: bg,
                        marginBottom: 12,
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="transition-transform duration-500 group-hover:scale-105"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontFamily: T.mono,
                        fontSize: 9.5,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: T.faint,
                        marginBottom: 5,
                      }}
                    >
                      {p.brand}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: T.ink,
                        lineHeight: 1.3,
                        marginBottom: 6,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{ fontFamily: T.mono, fontSize: 13, color: T.ink }}
                    >
                      {formatVND(p.price)}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
