"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

interface MiniChartProps {
  data: number[];
  labels?: string[];
  height?: number;
  className?: string;
}

export function MiniChart({ data, labels, height = 120, className = "" }: MiniChartProps) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animated = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const max = Math.max(...data);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || animated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          barsRef.current.forEach((bar, i) => {
            if (!bar) return;
            anime({
              targets: bar,
              height: `${(data[i] / max) * 100}%`,
              duration: 800,
              delay: i * 80,
              easing: "easeOutExpo",
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [data, max]);

  return (
    <div ref={containerRef} className={className}>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full relative flex-1 flex items-end">
              <div
                ref={(el) => { barsRef.current[i] = el; }}
                className="w-full rounded-t-md bg-gradient-to-t from-warmth to-warmth/60"
                style={{ height: 0 }}
              />
            </div>
          </div>
        ))}
      </div>
      {labels && (
        <div className="flex gap-2 mt-2">
          {labels.map((label, i) => (
            <span key={i} className="flex-1 text-center text-[11px] text-stone">
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
