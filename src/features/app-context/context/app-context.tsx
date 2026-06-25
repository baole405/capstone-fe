"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  CartItem,
  UserRole,
  SkinType,
  SkinConcern,
  AIAssessmentResult,
  Product,
} from "@/lib/domain-types";

interface SurveyData {
  skinType: SkinType;
  region: string;
  age: string;
  gender: string;
  allergies: string[];
  currentRoutine: string;
  currentTreatment: string;
  skinGoals: string[];
  expectations: string;
  concerns: SkinConcern[];
}

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  surveyData: Partial<SurveyData> | null;
  setSurveyData: (data: Partial<SurveyData>) => void;
  aiResult: AIAssessmentResult | null;
  setAiResult: (result: AIAssessmentResult) => void;
  photoUploaded: boolean;
  setPhotoUploaded: (uploaded: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>("user");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [surveyData, setSurveyData] = useState<Partial<SurveyData> | null>(
    null,
  );
  const [aiResult, setAiResult] = useState<AIAssessmentResult | null>(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        surveyData,
        setSurveyData,
        aiResult,
        setAiResult,
        photoUploaded,
        setPhotoUploaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
