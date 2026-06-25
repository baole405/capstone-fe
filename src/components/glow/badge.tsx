"use client";

import { ReactNode } from "react";
import { clsx } from "clsx";

interface GlowBadgeProps {
  children: ReactNode;
  variant?: "default" | "warning" | "success" | "info" | "danger" | "purple";
  className?: string;
}

export function GlowBadge({
  children,
  variant = "default",
  className,
}: GlowBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-block rounded-full px-2 py-0.5 text-xs",
        {
          "bg-secondary text-secondary-foreground": variant === "default",
          "bg-yellow-100 text-yellow-800": variant === "warning",
          "bg-green-100 text-green-800": variant === "success",
          "bg-blue-100 text-blue-800": variant === "info",
          "bg-red-100 text-red-700": variant === "danger",
          "bg-purple-100 text-purple-800": variant === "purple",
        },
        className,
      )}
    >
      {children}
    </span>
  );
}
