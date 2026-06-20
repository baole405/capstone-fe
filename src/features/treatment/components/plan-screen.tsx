"use client";

import { Sun, Moon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTreatment } from "../context/treatment-context";

export function PlanScreen() {
  const { setFlowState } = useTreatment();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 flex flex-1 flex-col justify-between px-4 duration-500">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1 text-center">
          <span className="text-primary bg-primary/10 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            PHÁC ĐỒ ĐIỀU TRỊ CỦA BẠN
          </span>
          <h3 className="font-heading text-foreground pt-1 text-2xl font-extrabold tracking-tight">
            Liệu Trình Cá Nhân Hóa
          </h3>
          <p className="text-muted-foreground text-xs">
            Thiết kế riêng cho da:{" "}
            <span className="text-foreground font-bold">Dầu & Nhạy cảm</span>
          </p>
        </div>

        {/* Routine Containers */}
        <div className="max-h-[400px] space-y-4 overflow-y-auto pr-1">
          {/* Morning Routine */}
          <div className="relative space-y-3 overflow-hidden rounded-2xl border border-amber-200/50 bg-amber-50/20 p-4 backdrop-blur">
            <div className="pointer-events-none absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-bl from-amber-200/10 to-transparent" />
            <div className="flex items-center gap-2 text-amber-600">
              <Sun className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wider uppercase">
                Routine Buổi Sáng
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-700">
                  1
                </span>
                <div className="flex flex-col">
                  <span className="text-foreground text-xs font-bold">
                    Sữa rửa mặt Salicylic Acid (BHA)
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    Làm sạch sâu lỗ chân lông, kiềm dầu nhẹ
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-700">
                  2
                </span>
                <div className="flex flex-col">
                  <span className="text-foreground text-xs font-bold">
                    Gel dưỡng ẩm kiểm soát bã nhờn
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    Cấp ẩm dạng nước, không gây bí tắc chân lông
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-700">
                  3
                </span>
                <div className="flex flex-col">
                  <span className="text-foreground text-xs font-bold">
                    Kem chống nắng phổ rộng dịu nhẹ
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    Màng lọc vật lý lai hóa học, bảo vệ tối ưu
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Evening Routine */}
          <div className="relative space-y-3 overflow-hidden rounded-2xl border border-indigo-200/50 bg-indigo-50/20 p-4 backdrop-blur">
            <div className="pointer-events-none absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-gradient-to-bl from-indigo-200/10 to-transparent" />
            <div className="flex items-center gap-2 text-indigo-600">
              <Moon className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wider uppercase">
                Routine Buổi Tối
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                  1
                </span>
                <div className="flex flex-col">
                  <span className="text-foreground text-xs font-bold">
                    Sữa rửa mặt tạo bọt dịu nhẹ phục hồi
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    Lấy sạch bụi bẩn mà không làm mất độ ẩm tự nhiên
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                  2
                </span>
                <div className="flex flex-col">
                  <span className="text-foreground text-xs font-bold">
                    Tinh chất Niacinamide 10% giảm thâm
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    Làm dịu nốt mụn sưng đỏ, làm mờ vết thâm
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                  3
                </span>
                <div className="flex flex-col">
                  <span className="text-foreground text-xs font-bold">
                    Kem dưỡng khóa ẩm đêm mỏng nhẹ
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    Cấp nước phục hồi hàng rào lipid bảo vệ da
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6">
        <Button
          onClick={() => setFlowState("purchase")}
          className="shadow-primary/20 hover:shadow-primary/30 bg-primary hover:bg-primary/95 flex w-full items-center justify-center gap-1.5 rounded-2xl py-6 text-base font-bold text-white shadow-lg transition-all duration-300"
        >
          <span>Chốt Mua Sản Phẩm Liệu Trình</span>
          <Check className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
