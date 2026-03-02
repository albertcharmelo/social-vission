"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=1000&fit=crop",
    alt: "Niños recibiendo materiales escolares",
  },
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=1000&fit=crop",
    alt: "Voluntarios plantando árboles",
  },
  {
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&h=1000&fit=crop",
    alt: "Comunidad trabajando junta",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=1000&fit=crop",
    alt: "Atención médica comunitaria",
  },
  {
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=1000&fit=crop",
    alt: "Educación accesible para todos",
  },
];

export function ImpactCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full rounded-[var(--radius-xl)] overflow-hidden">
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-transparent" />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`
              w-2 h-2 rounded-full transition-all duration-500 cursor-pointer
              ${i === current ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"}
            `}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
