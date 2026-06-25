"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function GlowButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: GlowButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:opacity-90":
            variant === "primary",
          "bg-secondary text-secondary-foreground hover:bg-accent":
            variant === "secondary",
          "border-border bg-background hover:bg-accent border":
            variant === "outline",
          "hover:bg-accent": variant === "ghost",
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2": size === "md",
          "px-6 py-3 text-lg": size === "lg",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
