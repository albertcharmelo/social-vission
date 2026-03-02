"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function ProgressRing({
  value,
  max = 5,
  size = 140,
  strokeWidth = 10,
  label,
  sublabel,
  className = "",
}: ProgressRingProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const animated = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(value / max, 1);
  const targetOffset = circumference * (1 - percent);

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;
    if (!container || !circle || animated.current) return;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          anime({
            targets: circle,
            strokeDashoffset: targetOffset,
            duration: 1400,
            easing: "easeOutExpo",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [circumference, targetOffset]);

  return (
    <div ref={containerRef} className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-sage)"
          strokeWidth={strokeWidth}
          opacity={0.25}
        />
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-warmth)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="text-deep text-2xl font-bold">{label}</span>}
        {sublabel && <span className="text-stone text-xs">{sublabel}</span>}
      </div>
    </div>
  );
}
