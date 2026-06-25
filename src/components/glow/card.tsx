"use client";

import { ReactNode, HTMLAttributes } from "react";
import { clsx } from "clsx";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?:
    | "white"
    | "peach"
    | "rose"
    | "mint"
    | "lavender"
    | "sky"
    | "yellow"
    | "cream";
  padding?: "sm" | "md" | "lg";
}

export function GlowCard({
  children,
  className,
  variant = "white",
  padding = "md",
  ...rest
}: GlowCardProps) {
  return (
    <div
      className={clsx(
        "border-border rounded-xl border shadow-sm",
        {
          "bg-card": variant === "white",
          "bg-orange-50": variant === "peach",
          "bg-rose-50": variant === "rose",
          "bg-green-50": variant === "mint",
          "bg-purple-50": variant === "lavender",
          "bg-blue-50": variant === "sky",
          "bg-yellow-50": variant === "yellow",
          "bg-amber-50": variant === "cream",
          "p-3": padding === "sm",
          "p-4 md:p-6": padding === "md",
          "p-6 md:p-8": padding === "lg",
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
