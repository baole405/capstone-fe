"use client";

import { useEffect, useState } from "react";
import { useTreatment } from "../context/treatment-context";
import { Cpu } from "lucide-react";

export function AnalyzingScreen() {
  const { setFlowState } = useTreatment();
  const [dots, setDots] = useState("");
  const [subText, setSubText] = useState("Đang xử lý kết quả khảo sát...");

  useEffect(() => {
    // Dot animation
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    // Text updates
    const t1 = setTimeout(() => {
      setSubText("Thuật toán AI đang quét dữ liệu da Baumann...");
    }, 700);

    const t2 = setTimeout(() => {
      setSubText("Thiết lập hoạt chất và nồng độ tối ưu...");
    }, 1400);

    // Flow transition
    const flowTimeout = setTimeout(() => {
      setFlowState("report");
    }, 2400);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(flowTimeout);
    };
  }, [setFlowState]);

  return (
    <div className="animate-in fade-in flex flex-1 flex-col items-center justify-center px-6 text-center duration-500">
      <div className="max-w-sm space-y-8">
        {/* Loading Circle & Logo */}
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
          {/* Animated rings */}
          <div className="border-primary/20 border-t-primary absolute inset-0 animate-spin rounded-full border-4" />
          <div className="border-primary/40 absolute inset-2 animate-spin rounded-full border border-dashed [animation-duration:5s]" />
          {/* Center Icon */}
          <div className="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-full">
            <Cpu className="h-8 w-8 animate-pulse" />
          </div>
        </div>

        {/* Text descriptions */}
        <div className="space-y-3">
          <h3 className="font-heading text-foreground text-2xl font-extrabold tracking-tight">
            Đang Phân Tích Da{dots}
          </h3>
          <p className="text-primary text-sm font-medium transition-all duration-300">
            {subText}
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Hệ thống AI đang tổng hợp các câu trả lời của bạn để xây dựng một
            báo cáo da y khoa và phác đồ điều trị chuyên biệt.
          </p>
        </div>

        {/* Floating status checks */}
        <div className="text-muted-foreground flex flex-col gap-2 rounded-2xl border border-white/40 bg-white/30 p-4 text-xs shadow-inner backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
            <span>Tải thông tin người dùng từ Keycloak</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
            <span>Xác thực tính ổn định của Docker stack</span>
          </div>
        </div>
      </div>
    </div>
  );
}
