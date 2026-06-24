"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { MOCK_PRODUCTS } from "@/features/products/mock";

const T = {
  ink: "#2B2228",
  ink2: "#5C5258",
  muted: "#8E8086",
  faint: "#A99CA2",
  faint2: "#C0B2B8",
  line: "var(--color-border)",
  line2: "var(--color-border)",
  rose: "var(--color-primary)",
  mono: "var(--font-mono), ui-monospace, monospace",
};

type CartItem = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
};

const INITIAL_CART: CartItem[] = [0, 12, 31].map((i) => ({
  id: MOCK_PRODUCTS[i].id,
  slug: MOCK_PRODUCTS[i].slug,
  name: MOCK_PRODUCTS[i].name,
  brand: MOCK_PRODUCTS[i].brand,
  category: MOCK_PRODUCTS[i].category,
  price: MOCK_PRODUCTS[i].price,
  image: MOCK_PRODUCTS[i].image,
  stock: MOCK_PRODUCTS[i].stock,
  quantity: 1,
}));

const FREE_SHIP_THRESHOLD = 500_000;
const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}₫`;

const WRAPPER: React.CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 24px 60px",
  fontFamily: "var(--font-sans), sans-serif",
  color: T.ink,
};

export function CartView() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const setQty = (id: string, qty: number) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, quantity: Math.max(1, Math.min(i.stock, qty)) }
          : i,
      ),
    );

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping =
    subtotal >= FREE_SHIP_THRESHOLD || items.length === 0 ? 0 : 30_000;
  const total = subtotal + shipping;
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  if (items.length === 0) {
    return (
      <div style={WRAPPER}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "96px 0",
            gap: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "#D5EDEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingCart style={{ width: 36, height: 36, color: T.rose }} />
          </div>
          <h2
            style={{ margin: 0, fontSize: 24, fontWeight: 700, color: T.ink }}
          >
            Giỏ hàng trống
          </h2>
          <p style={{ margin: 0, color: T.muted, fontSize: 15 }}>
            Hãy thêm sản phẩm vào giỏ để tiếp tục.
          </p>
          <Link
            href="/shop"
            className="transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{
              marginTop: 8,
              display: "inline-block",
              background: T.rose,
              color: "#fff",
              borderRadius: 13,
              padding: "13px 26px",
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Khám phá sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={WRAPPER}>
      {/* Page header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "32px 0 24px" }}
      >
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
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Tiếp tục mua sắm
        </Link>
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: T.ink,
          }}
        >
          Giỏ hàng
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 14,
              fontWeight: 400,
              color: T.muted,
              marginLeft: 12,
            }}
          >
            {totalQty} sản phẩm
          </span>
        </h1>
      </div>

      {/* Two-column layout */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr 380px",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Left — item list */}
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            border: `1px solid ${T.line2}`,
            overflow: "hidden",
          }}
        >
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center"
              style={{
                padding: "20px 24px",
                gap: 18,
                borderTop: idx > 0 ? `1px solid ${T.line2}` : "none",
              }}
            >
              {/* Thumbnail */}
              <Link href={`/product/${item.slug}`} style={{ flexShrink: 0 }}>
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#F7F0E9",
                    border: `1px solid ${T.line}`,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="transition-transform duration-300 hover:scale-105"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Link>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: T.faint,
                    marginBottom: 5,
                  }}
                >
                  {item.brand}
                </div>
                <Link
                  href={`/product/${item.slug}`}
                  className="transition-colors hover:text-[var(--color-primary)]"
                  style={{
                    display: "block",
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: T.ink,
                    textDecoration: "none",
                    lineHeight: 1.3,
                    marginBottom: 6,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </Link>
                <span
                  style={{
                    fontSize: 11.5,
                    color: T.ink2,
                    background: "#F4F0F2",
                    padding: "3px 9px",
                    borderRadius: 999,
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Quantity stepper */}
              <div
                className="flex items-center"
                style={{
                  border: `1px solid ${T.line}`,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setQty(item.id, item.quantity - 1)}
                  className="bg-white transition-colors duration-150 hover:bg-gray-50"
                  style={{
                    border: "none",
                    width: 34,
                    height: 36,
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
                    width: 38,
                    textAlign: "center",
                    fontSize: 14,
                    color: T.ink,
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => setQty(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  className="bg-white transition-colors duration-150 hover:bg-gray-50 disabled:opacity-40"
                  style={{
                    border: "none",
                    width: 34,
                    height: 36,
                    fontSize: 17,
                    color: T.ink2,
                    cursor:
                      item.quantity >= item.stock ? "not-allowed" : "pointer",
                  }}
                >
                  +
                </button>
              </div>

              {/* Line price */}
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 15,
                  fontWeight: 500,
                  color: T.ink,
                  minWidth: 120,
                  textAlign: "right",
                }}
              >
                {formatVND(item.price * item.quantity)}
              </div>

              {/* Remove */}
              <button
                onClick={() => remove(item.id)}
                className="transition-colors duration-150 hover:text-red-500"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: T.faint2,
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Trash2 style={{ width: 16, height: 16 }} />
              </button>
            </div>
          ))}
        </div>

        {/* Right — order summary */}
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            border: `1px solid ${T.line2}`,
            padding: 28,
            position: "sticky",
            top: 88,
          }}
        >
          <h2
            style={{
              margin: "0 0 22px",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: T.ink,
            }}
          >
            Tóm tắt đơn hàng
          </h2>

          <div className="flex flex-col" style={{ gap: 12, marginBottom: 20 }}>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 14, color: T.ink2 }}>Tạm tính</span>
              <span style={{ fontFamily: T.mono, fontSize: 14, color: T.ink }}>
                {formatVND(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 14, color: T.ink2 }}>Vận chuyển</span>
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 14,
                  color: shipping === 0 ? "#5E9579" : T.ink,
                }}
              >
                {shipping === 0 ? "Miễn phí" : formatVND(shipping)}
              </span>
            </div>
          </div>

          {shipping > 0 && (
            <div
              style={{
                background: "#D5EDEB",
                borderRadius: 10,
                padding: "11px 14px",
                marginBottom: 20,
                fontSize: 13,
                color: "#3F7355",
                lineHeight: 1.5,
              }}
            >
              Mua thêm{" "}
              <strong style={{ fontFamily: T.mono }}>
                {formatVND(FREE_SHIP_THRESHOLD - subtotal)}
              </strong>{" "}
              để được miễn phí vận chuyển.
            </div>
          )}

          <div
            style={{
              borderTop: `1px solid ${T.line2}`,
              paddingTop: 16,
              marginBottom: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 15.5, fontWeight: 700, color: T.ink }}>
              Tổng cộng
            </span>
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 20,
                fontWeight: 600,
                color: T.ink,
              }}
            >
              {formatVND(total)}
            </span>
          </div>

          <button
            className="transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{
              width: "100%",
              border: "none",
              cursor: "pointer",
              background: T.rose,
              color: "#fff",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 15,
              fontWeight: 600,
              padding: "15px 0",
              borderRadius: 13,
            }}
          >
            Tiến hành thanh toán
          </button>

          <p
            style={{
              margin: "14px 0 0",
              textAlign: "center",
              fontSize: 12.5,
              color: T.muted,
            }}
          >
            Bảo mật · Hoàn tiền 30 ngày · Hỗ trợ 24/7
          </p>
        </div>
      </div>
    </div>
  );
}
