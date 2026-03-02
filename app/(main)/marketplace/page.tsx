"use client";

import { useState } from "react";
import Image from "next/image";
import { ServiceCard } from "@/components/ui/service-card";
import { Badge } from "@/components/ui/badge";
import { Animate } from "@/components/ui/animate";

const categories = [
  { label: "Todos", icon: "apps" },
  { label: "Diseño", icon: "palette" },
  { label: "Desarrollo", icon: "code" },
  { label: "Marketing", icon: "campaign" },
  { label: "Consultoría", icon: "psychology" },
  { label: "Fotografía", icon: "photo_camera" },
];

const allServices = [
  {
    title: "Diseño de marca completo",
    description: "Logo, paleta de colores, tipografía y guía de estilo.",
    price: "$450",
    provider: "María González",
    rating: 4.8,
    reviews: 47,
    isPro: true,
    category: "Diseño",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
  },
  {
    title: "Desarrollo web a medida",
    description: "Landing page o sitio web profesional con diseño responsive.",
    price: "$800",
    provider: "Carlos Ruiz",
    rating: 4.9,
    reviews: 63,
    isPro: false,
    category: "Desarrollo",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
  },
  {
    title: "Estrategia de marketing digital",
    description: "Plan completo de redes sociales, contenido y métricas.",
    price: "$350",
    provider: "Ana López",
    rating: 4.7,
    reviews: 31,
    isPro: true,
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
  },
  {
    title: "Consultoría de negocio",
    description: "Análisis estratégico y plan de acción para tu emprendimiento.",
    price: "$200",
    provider: "Diego Martín",
    rating: 4.6,
    reviews: 22,
    isPro: false,
    category: "Consultoría",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
  },
  {
    title: "Fotografía de producto",
    description: "Sesión fotográfica profesional para tu catálogo o ecommerce.",
    price: "$300",
    provider: "Laura Sánchez",
    rating: 4.9,
    reviews: 55,
    isPro: true,
    category: "Fotografía",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
  },
  {
    title: "App móvil React Native",
    description: "Desarrollo de aplicación móvil multiplataforma.",
    price: "$1,500",
    provider: "Pedro Morales",
    rating: 4.8,
    reviews: 38,
    isPro: true,
    category: "Desarrollo",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
  },
  {
    title: "Ilustración personalizada",
    description: "Ilustraciones digitales únicas para tu marca o proyecto.",
    price: "$180",
    provider: "Sofía Herrera",
    rating: 4.7,
    reviews: 29,
    isPro: false,
    category: "Diseño",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
  },
  {
    title: "SEO y posicionamiento",
    description: "Auditoría SEO completa y estrategia de posicionamiento.",
    price: "$400",
    provider: "Roberto Díaz",
    rating: 4.5,
    reviews: 18,
    isPro: false,
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    title: "Video corporativo",
    description: "Producción de video profesional para tu empresa.",
    price: "$600",
    provider: "Valentina Torres",
    rating: 4.8,
    reviews: 41,
    isPro: true,
    category: "Fotografía",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
  },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? allServices
      : allServices.filter((s) => s.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <Animate animation="fadeUp">
        <div className="relative rounded-[var(--radius-xl)] overflow-hidden mb-10">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&h=300&fit=crop"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/80 to-deep/50" />
          <div className="relative px-8 py-12">
            <h1 className="text-cloud font-bold text-3xl md:text-4xl tracking-tight">
              Marketplace
            </h1>
            <p className="text-cloud/70 mt-2 text-lg">
              Encuentra servicios de profesionales comprometidos con el impacto social
            </p>
          </div>
        </div>
      </Animate>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <Animate animation="fadeLeft">
          <aside className="lg:w-64 shrink-0">
            <div className="bg-mist rounded-[var(--radius-md)] border border-sage/40 p-5 sticky top-24">
              {/* Search */}
              <div className="mb-5">
                <label className="text-dusk text-sm font-medium flex items-center gap-1.5 mb-1.5">
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    search
                  </span>
                  Buscar
                </label>
                <input
                  type="text"
                  placeholder="Ej: diseño de logo"
                  className="w-full bg-white border border-sage rounded-[var(--radius-sm)] px-3 py-2.5 text-sm text-dusk placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-calm/30 focus:border-sky transition-all"
                />
              </div>

              {/* Categories */}
              <div className="mb-5">
                <label className="text-dusk text-sm font-medium block mb-2">
                  Categoría
                </label>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategory(cat.label)}
                      className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-[var(--radius-sm)] transition-all cursor-pointer ${
                        activeCategory === cat.label
                          ? "bg-warmth text-white"
                          : "text-dusk hover:bg-cloud"
                      }`}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                        {cat.icon}
                      </span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Impact toggle */}
              <div className="pt-4 border-t border-sage/30">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-warmth"
                  />
                  <span className="text-dusk text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-sprout" style={{ fontSize: "16px" }}>
                      eco
                    </span>
                    Solo con impacto social
                  </span>
                </label>
              </div>
            </div>
          </aside>
        </Animate>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-5">
            <p className="text-stone text-sm">
              {filtered.length} servicios encontrados
            </p>
            {activeCategory !== "Todos" && (
              <Badge variant="category">{activeCategory}</Badge>
            )}
          </div>

          <Animate animation="staggerUp" staggerDelay={80}>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((service) => (
                <ServiceCard
                  key={service.title}
                  {...service}
                  href="/servicios/1"
                />
              ))}
            </div>
          </Animate>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-stone/30 text-6xl mb-4 block">
                search_off
              </span>
              <p className="text-stone text-lg">
                No se encontraron servicios en esta categoría
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
