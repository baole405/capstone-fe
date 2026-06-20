"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type SkinConcern = "acne" | "pigmentation" | "aging" | "redness" | "";
export type SkinType =
  | "dry"
  | "oily"
  | "combination"
  | "normal"
  | "sensitive"
  | "";
export type BreakoutFrequency =
  | "rarely"
  | "occasionally"
  | "frequently"
  | "constantly"
  | "";
export type SkinSensitivity = "none" | "products" | "redness" | "eczema" | "";

export type SurveyAnswers = {
  skinConcern: SkinConcern;
  skinType: SkinType;
  breakoutFrequency: BreakoutFrequency;
  sensitivities: SkinSensitivity;
};

export type RoutineItem = {
  id: string;
  text: string;
  completed: boolean;
};

export type FlowState =
  | "intro"
  | "survey"
  | "analyzing"
  | "report"
  | "plan"
  | "purchase"
  | "success"
  | "dashboard";

export type DashboardTab = "home" | "report" | "history" | "profile";

export type TreatmentData = {
  surveyAnswers: SurveyAnswers;
  surveyStep: number;
  flowState: FlowState;
  dashboardTab: DashboardTab;
  morningRoutine: RoutineItem[];
  eveningRoutine: RoutineItem[];
};

const DEFAULT_ANSWERS: SurveyAnswers = {
  skinConcern: "",
  skinType: "",
  breakoutFrequency: "",
  sensitivities: "",
};

const DEFAULT_MORNING_ROUTINE: RoutineItem[] = [
  { id: "m1", text: "Sữa rửa mặt Salicylic Acid (BHA)", completed: true },
  { id: "m2", text: "Gel dưỡng ẩm kiểm soát dầu & bã nhờn", completed: true },
  {
    id: "m3",
    text: "Kem chống nắng phổ rộng dịu nhẹ SPF 50",
    completed: false,
  },
];

const DEFAULT_EVENING_ROUTINE: RoutineItem[] = [
  { id: "e1", text: "Sữa rửa mặt tạo bọt dịu nhẹ phục hồi", completed: false },
  { id: "e2", text: "Tinh chất Niacinamide 10% giảm thâm", completed: false },
  { id: "e3", text: "Kem dưỡng đêm mỏng nhẹ khoá ẩm", completed: false },
];

const LOCAL_STORAGE_KEY = "glowscan_treatment_data_v1";

type TreatmentContextType = {
  state: TreatmentData;
  updateAnswers: (answers: Partial<SurveyAnswers>) => void;
  setSurveyStep: (step: number) => void;
  setFlowState: (flowState: FlowState) => void;
  setDashboardTab: (tab: DashboardTab) => void;
  toggleRoutine: (id: string, type: "morning" | "evening") => void;
  resetAll: () => void;
};

const TreatmentContext = createContext<TreatmentContextType | undefined>(
  undefined,
);

export function TreatmentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TreatmentData>(() => {
    // Read from localStorage in the lazy initializer to avoid setState-in-effect
    const defaultState: TreatmentData = {
      surveyAnswers: DEFAULT_ANSWERS,
      surveyStep: 1,
      flowState: "intro",
      dashboardTab: "home",
      morningRoutine: DEFAULT_MORNING_ROUTINE,
      eveningRoutine: DEFAULT_EVENING_ROUTINE,
    };
    if (typeof window === "undefined") return defaultState;
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) return JSON.parse(stored) as TreatmentData;
    } catch {
      // ignore malformed storage
    }
    return defaultState;
  });

  // Persist changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save treatment data to localStorage", e);
    }
  }, [state]);

  const updateAnswers = (newAnswers: Partial<SurveyAnswers>) => {
    setState((prev) => ({
      ...prev,
      surveyAnswers: { ...prev.surveyAnswers, ...newAnswers },
    }));
  };

  const setSurveyStep = (step: number) => {
    setState((prev) => ({ ...prev, surveyStep: step }));
  };

  const setFlowState = (flowState: FlowState) => {
    setState((prev) => ({ ...prev, flowState }));
  };

  const setDashboardTab = (dashboardTab: DashboardTab) => {
    setState((prev) => ({ ...prev, dashboardTab }));
  };

  const toggleRoutine = (id: string, type: "morning" | "evening") => {
    setState((prev) => {
      const key = type === "morning" ? "morningRoutine" : "eveningRoutine";
      const updated = prev[key].map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      );
      return { ...prev, [key]: updated };
    });
  };

  const resetAll = () => {
    setState({
      surveyAnswers: DEFAULT_ANSWERS,
      surveyStep: 1,
      flowState: "intro",
      dashboardTab: "home",
      morningRoutine: DEFAULT_MORNING_ROUTINE.map((item) => ({
        ...item,
        completed: false,
      })),
      eveningRoutine: DEFAULT_EVENING_ROUTINE.map((item) => ({
        ...item,
        completed: false,
      })),
    });
  };

  return (
    <TreatmentContext.Provider
      value={{
        state,
        updateAnswers,
        setSurveyStep,
        setFlowState,
        setDashboardTab,
        toggleRoutine,
        resetAll,
      }}
    >
      {children}
    </TreatmentContext.Provider>
  );
}

export function useTreatment() {
  const context = useContext(TreatmentContext);
  if (!context) {
    throw new Error("useTreatment must be used within a TreatmentProvider");
  }
  return context;
}
