"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { clsx } from "clsx";

interface GlowToast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface GlowToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const GlowToastContext = createContext<GlowToastContextType | undefined>(
  undefined,
);

export function GlowToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<GlowToast[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    [],
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <GlowToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed right-4 bottom-4 z-50 max-w-md space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={clsx(
              "animate-in slide-in-from-right flex items-center gap-3 rounded-lg border p-4 shadow-lg",
              {
                "border-green-200 bg-green-50": toast.type === "success",
                "border-red-200 bg-red-50": toast.type === "error",
                "border-blue-200 bg-blue-50": toast.type === "info",
              },
            )}
          >
            {toast.type === "success" && (
              <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            )}
            {toast.type === "info" && (
              <Info className="h-5 w-5 shrink-0 text-blue-600" />
            )}
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </GlowToastContext.Provider>
  );
}

export function useGlowToast() {
  const context = useContext(GlowToastContext);
  if (!context)
    throw new Error("useGlowToast must be used within GlowToastProvider");
  return context;
}
