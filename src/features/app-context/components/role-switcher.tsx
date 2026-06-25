"use client";

import { useState } from "react";
import { UserRole } from "@/lib/domain-types";
import { useApp } from "@/features/app-context/context/app-context";
import { GlowBadge } from "@/components/glow/badge";
import { Users, ChevronDown, ChevronUp } from "lucide-react";

export function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const roles: {
    value: UserRole;
    label: string;
    color: "default" | "info" | "warning" | "purple";
  }[] = [
    { value: "user", label: "User", color: "default" },
    { value: "admin", label: "Admin", color: "warning" },
    { value: "staff", label: "Staff", color: "info" },
    { value: "expert", label: "Expert", color: "purple" },
  ];

  const currentRoleData = roles.find((r) => r.value === currentRole);

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-primary flex items-center gap-2 rounded-full px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          <Users className="h-5 w-5" />
          <span className="hidden font-medium sm:inline">
            {currentRoleData?.label}
          </span>
          <ChevronUp className="h-4 w-4" />
        </button>
      ) : (
        <div className="border-border animate-in slide-in-from-bottom min-w-[280px] rounded-xl border bg-white p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="text-primary h-5 w-5" />
              <span className="font-semibold">Demo Mode</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
          <p className="text-muted-foreground mb-3 text-xs">
            Switch between user roles:
          </p>
          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => {
                  setCurrentRole(role.value);
                  setIsExpanded(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg p-3 transition-all ${
                  currentRole === role.value
                    ? "bg-primary text-white shadow-md"
                    : "bg-muted hover:bg-accent"
                }`}
              >
                <span className="font-medium">{role.label}</span>
                {currentRole === role.value && (
                  <GlowBadge
                    variant="success"
                    className="text-primary bg-white"
                  >
                    Active
                  </GlowBadge>
                )}
              </button>
            ))}
          </div>
          <div className="border-border mt-3 border-t pt-3">
            <p className="text-muted-foreground text-center text-xs">
              Role switching for demo purposes only
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
