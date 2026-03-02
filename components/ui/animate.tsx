"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface AnimateProps {
  children: ReactNode;
  animation?: "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleIn" | "staggerUp";
  delay?: number;
  duration?: number;
  className?: string;
  staggerDelay?: number;
}

const initialStyles: Record<string, CSSProperties> = {
  fadeUp: { opacity: 0, transform: "translateY(30px)" },
  fadeIn: { opacity: 0 },
  fadeLeft: { opacity: 0, transform: "translateX(-30px)" },
  fadeRight: { opacity: 0, transform: "translateX(30px)" },
  scaleIn: { opacity: 0, transform: "scale(0.95)" },
  staggerUp: {},
};

export function Animate({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 600,
  className = "",
  staggerDelay = 80,
}: AnimateProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (animation === "staggerUp") {
      // Find the actual items to stagger: direct children, or if there's
      // a single wrapper (like a grid div), use its children instead.
      let items: Element[];
      if (el.children.length === 1 && el.children[0].children.length > 1) {
        items = Array.from(el.children[0].children);
      } else {
        items = Array.from(el.children);
      }

      items.forEach((child) => {
        const h = child as HTMLElement;
        h.style.opacity = "0";
        h.style.transform = "translateY(24px)";
      });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            items.forEach((child, i) => {
              const h = child as HTMLElement;
              h.style.transition = `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1), transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`;
              h.style.transitionDelay = `${delay + i * staggerDelay}ms`;
              h.style.opacity = "1";
              h.style.transform = "translateY(0)";
            });
            observer.disconnect();
          }
        },
        { threshold: 0.08 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }

    // Non-stagger animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1), transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`;
          el.style.transitionDelay = `${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translate(0,0) scale(1)";
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, duration, staggerDelay]);

  const style = animation === "staggerUp" ? undefined : initialStyles[animation];

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
