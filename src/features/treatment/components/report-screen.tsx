"use client";

import { Droplet, Heart, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTreatment } from "../context/treatment-context";

export function ReportScreen() {
  const { setFlowState } = useTreatment();

  // Circular progress calculations for score 78
  const score = 78;
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-1 flex-col justify-between px-4 duration-500">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1 text-center">
          <span className="text-primary bg-primary/10 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            KẾT QUẢ PHÂN TÍCH
          </span>
          <h3 className="font-heading text-foreground pt-1 text-2xl font-extrabold tracking-tight">
            Báo Cáo Sức Khỏe Da
          </h3>
          <p className="text-muted-foreground text-xs">
            Báo cáo được tổng hợp dựa trên hồ sơ da Baumann của bạn.
          </p>
        </div>

        {/* Premium Score Gauge */}
        <div className="relative mx-auto flex w-full max-w-sm flex-col items-center justify-center rounded-3xl border border-white/50 bg-white/40 py-6 shadow-sm backdrop-blur">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform">
              {/* Background circle */}
              <circle
                stroke="oklch(var(--primary) / 0.15)"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="translate-x-6 translate-y-6"
              />
              {/* Foreground progress circle */}
              <circle
                stroke="oklch(var(--primary))"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="translate-x-6 translate-y-6 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="font-heading text-foreground text-4xl font-extrabold tracking-tight">
                {score}
              </span>
              <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                Điểm Sức Khỏe
              </span>
            </div>
          </div>
          <div className="mt-3 px-4 text-center">
            <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
              Loại da dự đoán: Oily-Sensitive (Dầu Nhạy Cảm)
            </span>
          </div>
        </div>

        {/* Detail Metric Cards */}
        <div className="space-y-3">
          <h4 className="text-foreground pl-1 text-xs font-bold tracking-wider uppercase">
            Chỉ số chi tiết:
          </h4>

          {/* Hydration */}
          <div className="border-border/60 flex items-center justify-between rounded-2xl border bg-white/50 p-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2 text-blue-500">
                <Droplet className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground text-xs font-semibold">
                  Độ ẩm tế bào
                </span>
                <span className="text-muted-foreground text-[11px]">
                  Mức nước bề mặt và biểu bì
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-blue-600">65%</span>
              <span className="text-muted-foreground text-[10px] font-medium">
                Tạm ổn (Cần bù ẩm)
              </span>
            </div>
          </div>

          {/* Sensitivity */}
          <div className="border-border/60 flex items-center justify-between rounded-2xl border bg-white/50 p-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2 text-emerald-500">
                <Heart className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground text-xs font-semibold">
                  Độ nhạy cảm
                </span>
                <span className="text-muted-foreground text-[11px]">
                  Phản ứng với ngoại chất & kích ứng
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-emerald-600">
                Thấp
              </span>
              <span className="text-muted-foreground text-[10px] font-medium">
                Ít phản ứng
              </span>
            </div>
          </div>

          {/* Acne Risk */}
          <div className="border-border/60 flex items-center justify-between rounded-2xl border bg-white/50 p-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-2 text-amber-500">
                <AlertTriangle className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground text-xs font-semibold">
                  Nguy cơ mụn
                </span>
                <span className="text-muted-foreground text-[11px]">
                  Độ bít tắc và vi khuẩn P.Acnes
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-amber-600">
                Trung bình
              </span>
              <span className="text-muted-foreground text-[10px] font-medium">
                Cần kiểm soát dầu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Button footer */}
      <div className="pt-6">
        <Button
          onClick={() => setFlowState("plan")}
          className="shadow-primary/20 hover:shadow-primary/30 bg-primary hover:bg-primary/95 flex w-full items-center justify-center gap-1.5 rounded-2xl py-6 text-base font-bold text-white shadow-lg transition-all duration-300"
        >
          Xem Phác Đồ Điều Trị
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
