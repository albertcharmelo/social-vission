"use client";

import { AnimatedCounter } from "./animated-counter";

interface RankingPositionProps {
  position: number;
  total: number;
  trend?: number; // positive = subió, negative = bajó
}

export function RankingPosition({ position, total, trend }: RankingPositionProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-baseline gap-1">
        <span className="text-stone text-3xl font-bold">#</span>
        <AnimatedCounter
          value={position}
          className="text-deep text-6xl font-bold"
          duration={1500}
        />
      </div>
      <p className="text-stone text-sm">
        de {total} proveedores
      </p>
      {trend !== undefined && trend !== 0 && (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            trend > 0
              ? "bg-sprout/20 text-meadow"
              : "bg-blush/20 text-blush"
          }`}
        >
          {trend > 0 ? `Subiste ${trend} posiciones` : `Bajaste ${Math.abs(trend)} posiciones`}
        </span>
      )}
    </div>
  );
}
