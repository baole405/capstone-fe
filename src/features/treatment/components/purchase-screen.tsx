"use client";

import { useState } from "react";
import { ArrowLeft, ShoppingBag, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTreatment } from "../context/treatment-context";

type SkincareProduct = {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  brand: string;
};

const RECOMMENDED_PRODUCTS: SkincareProduct[] = [
  {
    name: "Sữa rửa mặt Salicylic Acid (BHA) 2%",
    category: "Làm sạch sâu & Kiềm dầu",
    brand: "GlowScan Derm",
    price: 210000,
    originalPrice: 250000,
  },
  {
    name: "Tinh chất phục hồi Niacinamide 10% + Zinc 1%",
    category: "Trị thâm mụn & Làm dịu",
    brand: "GlowScan Active",
    price: 390000,
  },
  {
    name: "Gel dưỡng ẩm Hydrating Gel không chứa dầu",
    category: "Cấp nước thông thoáng",
    brand: "GlowScan Aqua",
    price: 280000,
  },
  {
    name: "Kem dưỡng ẩm ban đêm phục hồi lipid mỏng nhẹ",
    category: "Khóa ẩm ban đêm",
    brand: "GlowScan Barrier",
    price: 320000,
  },
  {
    name: "Kem chống nắng phổ rộng bảo vệ tối ưu SPF 50",
    category: "Bảo vệ ban ngày",
    brand: "GlowScan Sun",
    price: 420000,
    originalPrice: 480000,
  },
];

export function PurchaseScreen() {
  const { setFlowState } = useTreatment();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"checkout" | "processing">(
    "checkout",
  );

  const totalOriginal = RECOMMENDED_PRODUCTS.reduce(
    (acc, p) => acc + (p.originalPrice || p.price),
    0,
  );
  const totalDiscounted = RECOMMENDED_PRODUCTS.reduce(
    (acc, p) => acc + p.price,
    0,
  );
  const totalSavings = totalOriginal - totalDiscounted;

  const handleCheckout = () => {
    setIsProcessing(true);
    setPaymentStep("processing");

    // Simulate Payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setFlowState("success");
    }, 2000);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  if (paymentStep === "processing") {
    return (
      <div className="animate-in fade-in flex flex-1 flex-col items-center justify-center px-6 text-center duration-300">
        <div className="max-w-sm space-y-6">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-500" />
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
              <CreditCard className="h-6 w-6 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-heading text-foreground text-lg font-bold">
              Đang xử lý giao dịch...
            </h4>
            <p className="text-muted-foreground text-xs">
              Vui lòng không tắt hoặc tải lại trang trong khi hệ thống kết nối
              với Cổng Thanh Toán VNPay.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 flex flex-1 flex-col justify-between px-4 duration-300">
      {/* Header */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFlowState("plan")}
            className="border-border/40 hover:bg-secondary/40 h-9 w-9 rounded-xl border"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Mua Hàng Phác Đồ (Happy Case)
          </span>
          <div className="h-9 w-9" />
        </div>

        <div className="space-y-1 text-center">
          <h3 className="font-heading text-foreground text-xl font-extrabold">
            Sản Phẩm Khuyến Nghị Theo Phác Đồ
          </h3>
          <p className="text-muted-foreground text-[11px]">
            Sản phẩm được tự động map từ các hoạt chất khuyên dùng trong Routine
            của bạn.
          </p>
        </div>
      </div>

      {/* Product List */}
      <div className="my-4 grid max-h-[290px] gap-2.5 overflow-y-auto pr-1">
        {RECOMMENDED_PRODUCTS.map((prod, idx) => (
          <div
            key={idx}
            className="border-border/50 shadow-inner-sm hover:border-primary/20 flex items-center justify-between rounded-2xl border bg-white/60 p-3 transition-all"
          >
            <div className="flex items-center gap-3">
              {/* Mock product thumbnail */}
              <div className="bg-primary/5 border-primary/10 text-primary relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border">
                <ShoppingBag className="h-5 w-5 opacity-70" />
                <span className="bg-primary absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white">
                  1
                </span>
              </div>
              <div className="flex max-w-[190px] flex-col gap-0.5">
                <span className="text-foreground truncate text-xs font-extrabold">
                  {prod.name}
                </span>
                <span className="text-muted-foreground truncate text-[9px]">
                  {prod.brand} • {prod.category}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-foreground block text-xs font-extrabold">
                {formatPrice(prod.price)}
              </span>
              {prod.originalPrice && (
                <span className="text-muted-foreground block text-[9px] line-through">
                  {formatPrice(prod.originalPrice)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Total Breakdown and checkout */}
      <div className="border-border/60 space-y-4 border-t pt-3">
        <div className="space-y-1.5 rounded-2xl border border-white/50 bg-white/40 p-3.5 text-xs shadow-sm">
          <div className="text-muted-foreground flex justify-between">
            <span>Tạm tính (5 sản phẩm):</span>
            <span>{formatPrice(totalOriginal)}</span>
          </div>
          <div className="flex justify-between font-semibold text-emerald-600">
            <span>Giảm giá theo phác đồ combo:</span>
            <span>-{formatPrice(totalSavings)}</span>
          </div>
          <div className="text-muted-foreground flex justify-between">
            <span>Vận chuyển (GHTK):</span>
            <span className="font-semibold text-emerald-600">Miễn phí</span>
          </div>
          <div className="bg-border/50 my-1 h-[1px]" />
          <div className="text-foreground flex justify-between text-sm font-bold">
            <span>Tổng thanh toán:</span>
            <span className="text-primary text-base font-black">
              {formatPrice(totalDiscounted)}
            </span>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="shadow-primary/20 hover:shadow-primary/30 bg-primary hover:bg-primary/95 flex w-full items-center justify-center gap-2 rounded-2xl py-6 text-base font-bold text-white shadow-lg transition-all duration-300"
        >
          <CreditCard className="h-5 w-5" />
          Đặt Mua & Kích Hoạt Tracker
        </Button>
      </div>
    </div>
  );
}
