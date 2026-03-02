"use client";

import type { LucideIcon } from "lucide-react";
import { DashboardCard } from "./dashboard-card";
import { AnimatedCounter } from "./animated-counter";

interface DashboardStatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  decimals?: number;
}

export function DashboardStatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  icon: Icon,
  trend,
  decimals = 0,
}: DashboardStatCardProps) {
  return (
    <DashboardCard>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-stone text-sm mb-1">{label}</p>
          <p className="text-deep text-2xl font-bold">
            <AnimatedCounter
              value={value}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
            />
          </p>
          {trend && (
            <p
              className={`text-xs mt-1 font-medium ${
                trend.positive ? "text-meadow" : "text-blush"
              }`}
            >
              {trend.positive ? "+" : ""}
              {trend.value}% vs mes anterior
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-warmth/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-warmth" />
        </div>
      </div>
    </DashboardCard>
  );
}
