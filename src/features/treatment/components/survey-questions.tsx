"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTreatment } from "../context/treatment-context";

type SurveyQuestion = {
  id: number;
  title: string;
  subtitle: string;
  field: "skinConcern" | "skinType" | "breakoutFrequency" | "sensitivities";
  options: {
    label: string;
    description?: string;
    value: string;
  }[];
};

const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    title: "Mối quan tâm chính về da",
    subtitle:
      "Vấn đề nào hiện tại đang khiến bạn lo lắng nhất và cần cải thiện?",
    field: "skinConcern",
    options: [
      {
        label: "Mụn trứng cá & Mụn viêm",
        description: "Bít tắc bã nhờn, viêm sưng, mẩn đỏ dai dẳng",
        value: "acne",
      },
      {
        label: "Sạm nám & Tàn nhang",
        description: "Da không đều màu, vết thâm sau mụn, sắc tố",
        value: "pigmentation",
      },
      {
        label: "Nếp nhăn & Lão hóa da",
        description: "Vết chân chim, giảm đàn hồi, da chảy xệ nhẹ",
        value: "aging",
      },
      {
        label: "Mẩn đỏ & Nhạy cảm kích ứng",
        description: "Rát ngứa khi dùng mỹ phẩm, đỏ ửng do thời tiết",
        value: "redness",
      },
    ],
  },
  {
    id: 2,
    title: "Phân loại tuyến bã nhờn",
    subtitle: "Bạn cảm nhận làn da của mình thuộc nhóm nào dưới đây?",
    field: "skinType",
    options: [
      {
        label: "Da khô (Dry)",
        description: "Luôn cảm thấy khô ráp, bong tróc hoặc căng chặt",
        value: "dry",
      },
      {
        label: "Da dầu (Oily)",
        description: "Bóng nhờn toàn mặt, lỗ chân lông to, nhiều bã nhờn",
        value: "oily",
      },
      {
        label: "Da hỗn hợp (Combination)",
        description: "Nhờn vùng chữ T (trán, mũi, cằm) nhưng khô ở má",
        value: "combination",
      },
      {
        label: "Da thường (Normal)",
        description: "Cân bằng tốt, ít khuyết điểm, mịn màng",
        value: "normal",
      },
      {
        label: "Da nhạy cảm (Sensitive)",
        description: "Hàng rào bảo vệ mỏng, cực kỳ dễ kích ứng",
        value: "sensitive",
      },
    ],
  },
  {
    id: 3,
    title: "Tần suất lên mụn",
    subtitle: "Mụn xuất hiện trên gương mặt bạn với mức độ ra sao?",
    field: "breakoutFrequency",
    options: [
      {
        label: "Hiếm khi hoặc không bao giờ",
        description: "Da trơn láng, hầu như không bị nổi mụn",
        value: "rarely",
      },
      {
        label: "Thỉnh thoảng (khoảng 1 lần/tháng)",
        description: "Thường lên mụn nhẹ khi đến kỳ hoặc stress",
        value: "occasionally",
      },
      {
        label: "Thường xuyên (hàng tuần)",
        description: "Nổi mụn liên tục, hết nốt này lại đến nốt khác",
        value: "frequently",
      },
      {
        label: "Liên tục / Mụn viêm sưng nặng",
        description: "Nhiều ổ mụn hoạt động, mụn bọc, sưng đau",
        value: "constantly",
      },
    ],
  },
  {
    id: 4,
    title: "Tình trạng kích ứng da",
    subtitle: "Bạn có gặp biểu hiện nhạy cảm nào sau đây không?",
    field: "sensitivities",
    options: [
      {
        label: "Không nhạy cảm",
        description: "Da khỏe mạnh, ít bị phản ứng phụ",
        value: "none",
      },
      {
        label: "Dễ kích ứng khi đổi mỹ phẩm",
        description: "Châm chích, nổi mụn nước li ti khi dùng đồ lạ",
        value: "products",
      },
      {
        label: "Dễ ửng đỏ mao mạch (Rosacea)",
        description: "Đỏ bừng má khi đi nắng hoặc ăn đồ cay nóng",
        value: "redness",
      },
      {
        label: "Bị chàm / Viêm da cơ địa / Vẩy nến",
        description: "Các mảng bong vảy đỏ, ngứa ngáy dữ dội",
        value: "eczema",
      },
    ],
  },
];

export function SurveyQuestions() {
  const { state, updateAnswers, setSurveyStep, setFlowState } = useTreatment();
  const currentQuestion = SURVEY_QUESTIONS[state.surveyStep - 1];

  const handleSelect = (value: string) => {
    updateAnswers({ [currentQuestion.field]: value });
  };

  const handleNext = () => {
    if (state.surveyStep < SURVEY_QUESTIONS.length) {
      setSurveyStep(state.surveyStep + 1);
    } else {
      setFlowState("analyzing");
    }
  };

  const handleBack = () => {
    if (state.surveyStep > 1) {
      setSurveyStep(state.surveyStep - 1);
    } else {
      setFlowState("intro");
    }
  };

  const selectedValue = state.surveyAnswers[currentQuestion.field];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 flex flex-1 flex-col justify-between px-4 duration-300">
      {/* Header bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="border-border/40 hover:bg-secondary/40 h-9 w-9 rounded-xl border"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Khảo sát da ({state.surveyStep}/{SURVEY_QUESTIONS.length})
          </span>
          <div className="h-9 w-9" /> {/* Spacer */}
        </div>

        {/* Progress bar */}
        <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{
              width: `${(state.surveyStep / SURVEY_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>

        {/* Question intro */}
        <div className="space-y-1 pt-2">
          <h3 className="font-heading text-foreground text-2xl font-extrabold tracking-tight">
            {currentQuestion.title}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {currentQuestion.subtitle}
          </p>
        </div>
      </div>

      {/* Card Choices */}
      <div className="my-6 grid max-h-[360px] gap-3 overflow-y-auto py-2 pr-1">
        {currentQuestion.options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`flex w-full flex-col gap-1 rounded-2xl border p-4 text-left shadow-sm transition-all duration-200 active:scale-[0.99] ${
                isSelected
                  ? "border-primary/80 bg-primary/5 ring-primary/20 ring-2"
                  : "border-border/70 hover:bg-primary/5 hover:border-primary/40 bg-white/60"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span
                  className={`text-sm font-bold ${isSelected ? "text-primary" : "text-foreground"}`}
                >
                  {opt.label}
                </span>
                {/* Simulated checkbox/radio indicator */}
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <div className="animate-scale-in h-2.5 w-2.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
              {opt.description && (
                <span className="text-muted-foreground line-clamp-2 text-[11px]">
                  {opt.description}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer controls */}
      <div>
        <Button
          onClick={handleNext}
          disabled={!selectedValue}
          className="bg-primary hover:bg-primary/95 flex w-full items-center justify-center gap-1.5 rounded-2xl py-6 text-base font-bold text-white shadow-lg transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
        >
          {state.surveyStep === SURVEY_QUESTIONS.length
            ? "Hoàn thành & Phân tích"
            : "Tiếp theo"}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
