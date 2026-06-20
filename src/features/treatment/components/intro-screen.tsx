"use client";

import { Sparkles, Activity, ShieldCheck, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTreatment } from "../context/treatment-context";

export function IntroScreen() {
  const { setFlowState } = useTreatment();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-1 flex-col justify-center px-4 duration-500">
      <div className="space-y-8 py-8 text-center">
        {/* Brand Icon */}
        <div className="bg-primary/10 text-primary relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl shadow-inner">
          <Sparkles className="h-10 w-10 animate-pulse" />
          <div className="absolute -top-1 -right-1 flex h-4 w-4 animate-ping rounded-full bg-emerald-500" />
          <div className="absolute -top-1 -right-1 flex h-4 w-4 rounded-full bg-emerald-500" />
        </div>

        {/* Text info */}
        <div className="space-y-3">
          <h2 className="font-heading text-foreground text-3xl font-extrabold tracking-tight">
            Bắt đầu Liệu trình Mới
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xs text-sm leading-relaxed">
            Khám phá phác đồ điều trị cá nhân hóa y khoa dựa trên khảo sát da
            Baumann và thuật toán AI tiên tiến.
          </p>
        </div>

        {/* Perks / Features info */}
        <div className="mx-auto max-w-sm space-y-4 rounded-2xl border border-white/50 bg-white/40 p-4 text-left shadow-sm backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 text-primary mt-0.5 rounded-lg p-2">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-foreground text-sm font-semibold">
                Phân tích chuẩn y khoa
              </h4>
              <p className="text-muted-foreground text-xs">
                Định dạng loại da chính xác dựa trên 16 nhóm da Baumann.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary/10 text-primary mt-0.5 rounded-lg p-2">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-foreground text-sm font-semibold">
                Cá nhân hóa Routine
              </h4>
              <p className="text-muted-foreground text-xs">
                Thiết lập các bước chăm sóc da Sáng/Tối tối ưu hóa cho da bạn.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary/10 text-primary mt-0.5 rounded-lg p-2">
              <HeartPulse className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-foreground text-sm font-semibold">
                Theo dõi tiến trình
              </h4>
              <p className="text-muted-foreground text-xs">
                Ghi nhận tiến độ chăm sóc hàng ngày và đánh giá hiệu quả.
              </p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4">
          <Button
            onClick={() => setFlowState("survey")}
            className="shadow-primary/20 hover:shadow-primary/30 bg-primary hover:bg-primary/95 group flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl py-6 text-base font-bold text-white shadow-lg transition-all duration-300"
          >
            <Sparkles className="h-5 w-5 transition-transform group-hover:scale-110" />
            Bắt Đầu Liệu Trình Mới
          </Button>
        </div>
      </div>
    </div>
  );
}
