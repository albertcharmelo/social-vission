"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ServiceCard } from "@/components/ui/service-card";
import { Animate } from "@/components/ui/animate";

const service = {
  title: "Diseño de marca completo",
  description:
    "Incluye diseño de logo, paleta de colores, tipografía y guía de estilo completa para tu marca. Recibirás archivos editables en todos los formatos necesarios, junto con un manual de uso de marca para mantener consistencia en todos tus canales.",
  rating: 4.8,
  reviews: 47,
  image:
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1000&h=600&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1000&h=600&fit=crop",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1586717799252-bd134571d035?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&h=200&fit=crop",
  ],
  provider: {
    name: "María González",
    role: "Diseñadora Gráfica",
    rating: 4.9,
    location: "Buenos Aires, Argentina",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  cause: {
    name: "Fundación Educación Para Todos",
    icon: "school",
    description: "Becas y materiales para niños en comunidades vulnerables.",
    goalPercent: 72,
  },
};

type PlanKey = "basic" | "standard" | "premium";

const plans: Record<
  PlanKey,
  {
    name: string;
    price: string;
    priceNum: number;
    description: string;
    delivery: string;
    revisions: string;
    features: string[];
  }
> = {
  basic: {
    name: "Basic",
    price: "$250",
    priceNum: 250,
    description: "Logo y paleta de colores básica para tu marca.",
    delivery: "10 días",
    revisions: "1 revisión",
    features: ["1 Concepto de logo", "Paleta de colores", "Archivos PNG/JPG"],
  },
  standard: {
    name: "Standard",
    price: "$450",
    priceNum: 450,
    description:
      "Identidad visual completa con logo, paleta, tipografía y guía de estilo.",
    delivery: "7 días",
    revisions: "3 revisiones",
    features: [
      "3 Conceptos de logo",
      "Paleta de colores completa",
      "Tipografía principal y secundaria",
      "Guía de estilo de marca",
      "Archivos editables (AI, PSD, Figma)",
    ],
  },
  premium: {
    name: "Premium",
    price: "$750",
    priceNum: 750,
    description:
      "Branding completo con estrategia, aplicaciones y kit de redes sociales.",
    delivery: "5 días",
    revisions: "Revisiones ilimitadas",
    features: [
      "5 Conceptos de logo",
      "Paleta y tipografía completas",
      "Guía de estilo de marca",
      "Kit de redes sociales",
      "Papelería corporativa",
      "Archivos editables + vectores",
      "Soporte prioritario 30 días",
    ],
  },
};

const reviewsData = [
  {
    name: "Juan Pérez",
    rating: 5,
    text: "Excelente trabajo. María capturó perfectamente la esencia de mi marca. Muy profesional y puntual.",
    date: "Hace 2 semanas",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Lucia Fernández",
    rating: 5,
    text: "Superó mis expectativas. La guía de estilo es muy completa y fácil de seguir.",
    date: "Hace 1 mes",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Tomás García",
    rating: 4,
    text: "Muy buen resultado final. El proceso fue fluido y las revisiones rápidas.",
    date: "Hace 1 mes",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
];

const related = [
  {
    title: "Ilustración personalizada",
    description: "Ilustraciones digitales únicas para tu marca.",
    price: "$180",
    provider: "Sofía Herrera",
    rating: 4.7,
    reviews: 29,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
  },
  {
    title: "Rediseño de identidad visual",
    description: "Actualización completa de la imagen de tu marca.",
    price: "$600",
    provider: "Pablo Ríos",
    rating: 4.6,
    reviews: 15,
    isPro: true,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
  },
  {
    title: "Diseño de packaging",
    description: "Empaque creativo y funcional para tu producto.",
    price: "$350",
    provider: "Camila Vega",
    rating: 4.8,
    reviews: 33,
    image:
      "https://images.unsplash.com/photo-1586717799252-bd134571d035?w=600&h=400&fit=crop",
  },
];

export default function ServiceDetailPage() {
  const [activePlan, setActivePlan] = useState<PlanKey>("standard");
  const plan = plans[activePlan];
  const donationAmount = (plan.priceNum * 0.1).toFixed(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone mb-6 flex items-center gap-2">
        <a
          href="/marketplace"
          className="hover:text-sky transition-colors flex items-center gap-1"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "16px" }}
          >
            storefront
          </span>
          Marketplace
        </a>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "14px" }}
        >
          chevron_right
        </span>
        <span className="text-dusk">Diseño</span>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "14px" }}
        >
          chevron_right
        </span>
        <span className="text-dusk">{service.title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image gallery */}
          <Animate animation="fadeUp">
            <div className="space-y-3">
              <div className="aspect-video relative rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)]">
                <Image
                  src={service.gallery[0]}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {service.gallery.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-video relative rounded-[var(--radius-sm)] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={img}
                      alt={`${service.title} ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Animate>

          {/* Title + badges */}
          <Animate animation="fadeUp" delay={100}>
            <div>
              <div className="flex gap-2 mb-3">
                <Badge variant="impact">
                  <span
                    className="material-symbols-outlined mr-1"
                    style={{ fontSize: "14px" }}
                  >
                    favorite
                  </span>
                  10% impacto social
                </Badge>
                <Badge variant="pro">PRO</Badge>
              </div>
              <h1 className="text-deep font-bold text-3xl tracking-tight">
                {service.title}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-honey text-sm flex items-center gap-1">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    star
                  </span>
                  {service.rating}
                </span>
                <span className="text-stone text-sm">
                  ({service.reviews} reseñas)
                </span>
                <span className="text-stone text-sm flex items-center gap-1">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    schedule
                  </span>
                  {plan.delivery}
                </span>
              </div>
            </div>
          </Animate>

          {/* Description */}
          <Animate animation="fadeUp" delay={150}>
            <div>
              <h2 className="text-deep font-semibold text-xl mb-3">
                Descripción
              </h2>
              <p className="text-dusk leading-relaxed">
                {service.description}
              </p>
            </div>
          </Animate>

          {/* What's included */}
          <Animate animation="fadeUp" delay={200}>
            <div>
              <h2 className="text-deep font-semibold text-xl mb-3">
                Qué incluye ({plan.name})
              </h2>
              <ul className="space-y-3">
                {plan.features.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className="material-symbols-outlined text-meadow mt-0.5"
                      style={{ fontSize: "20px" }}
                    >
                      check_circle
                    </span>
                    <span className="text-dusk">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Animate>

          {/* Reviews */}
          <Animate animation="fadeUp" delay={250}>
            <div>
              <h2 className="text-deep font-semibold text-xl mb-4 flex items-center gap-2">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "22px" }}
                >
                  reviews
                </span>
                Reseñas
              </h2>
              <div className="space-y-4">
                {reviewsData.map((review) => (
                  <Card key={review.name}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      </div>
                      <div>
                        <p className="text-deep font-medium text-sm">
                          {review.name}
                        </p>
                        <p className="text-stone text-xs">{review.date}</p>
                      </div>
                      <span className="text-honey text-xs ml-auto flex items-center gap-0.5">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "14px" }}
                        >
                          star
                        </span>
                        {review.rating}
                      </span>
                    </div>
                    <p className="text-dusk text-sm leading-relaxed">
                      {review.text}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </Animate>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-1">
          <Animate animation="fadeRight" delay={200}>
            <div className="sticky top-24 space-y-4">
              {/* Provider card */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative shrink-0 ring-2 ring-sage/30">
                    <Image
                      src={service.provider.avatar}
                      alt={service.provider.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="text-deep font-semibold">
                      {service.provider.name}
                    </p>
                    <p className="text-stone text-sm">
                      {service.provider.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-stone">
                  <span className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "16px" }}
                    >
                      star
                    </span>
                    {service.provider.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "16px" }}
                    >
                      location_on
                    </span>
                    {service.provider.location}
                  </span>
                </div>
              </Card>

              {/* Plan tabs + pricing */}
              <div className="bg-mist rounded-[var(--radius-md)] border border-sage/40 shadow-[var(--shadow-sm)] overflow-hidden">
                {/* Plan tabs */}
                <div className="flex border-b border-sage/40">
                  {(["basic", "standard", "premium"] as PlanKey[]).map(
                    (key) => (
                      <button
                        key={key}
                        onClick={() => setActivePlan(key)}
                        className={`
                          flex-1 py-3 text-sm font-medium transition-all cursor-pointer relative
                          ${
                            activePlan === key
                              ? "text-deep font-bold bg-white"
                              : "text-stone hover:text-dusk bg-transparent"
                          }
                        `}
                      >
                        {plans[key].name}
                        {activePlan === key && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-warmth" />
                        )}
                      </button>
                    )
                  )}
                </div>

                {/* Plan content */}
                <div className="p-6 flex flex-col gap-5">
                  <div className="flex justify-between items-end">
                    <h3 className="font-bold text-base text-deep">
                      {plan.name}
                    </h3>
                    <span className="text-2xl font-bold text-deep">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-sm text-dusk">{plan.description}</p>

                  <div className="flex flex-col gap-2.5 text-sm text-deep">
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-sprout"
                        style={{ fontSize: "20px" }}
                      >
                        schedule
                      </span>
                      <span className="font-bold">{plan.delivery}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-sprout"
                        style={{ fontSize: "20px" }}
                      >
                        sync
                      </span>
                      <span className="font-bold">{plan.revisions}</span>
                    </div>
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-sprout"
                          style={{ fontSize: "20px" }}
                        >
                          check
                        </span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Button fullWidth className="mt-1">
                    <span className="flex items-center justify-center gap-2">
                      Continuar ({plan.price})
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "18px" }}
                      >
                        arrow_forward
                      </span>
                    </span>
                  </Button>
                  <div className="text-center">
                    <Button variant="secondary" fullWidth>
                      <span className="flex items-center justify-center gap-2">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "18px" }}
                        >
                          chat
                        </span>
                        Contactar
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Social impact card — improved with animation */}
              <div className="bg-sprout/20 rounded-[var(--radius-md)] ring-1 ring-sprout/40 p-1 relative overflow-hidden group">
                {/* Decorative blur circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/60 rounded-full blur-2xl" />

                <div className="backdrop-blur-sm rounded-[var(--radius-sm)] p-5 h-full flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex items-center gap-2 text-deep">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "22px" }}
                    >
                      volunteer_activism
                    </span>
                    <h4 className="font-bold text-sm uppercase tracking-wider">
                      Impacto Social
                    </h4>
                  </div>

                  <p className="text-sm text-deep/80">
                    Esta compra hace la diferencia.{" "}
                    <span className="text-deep font-bold">10% del total</span>{" "}
                    va directamente a:
                  </p>

                  {/* Cause card */}
                  <div className="bg-white/60 rounded-[var(--radius-sm)] p-3 flex gap-3 items-center hover:bg-white/80 transition-colors cursor-pointer border border-white/40">
                    <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-deep flex items-center justify-center text-white shrink-0">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "24px" }}
                      >
                        {service.cause.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-deep text-sm">
                        {service.cause.name}
                      </p>
                      <p className="text-xs text-dusk/90">
                        {service.cause.description}
                      </p>
                    </div>
                  </div>

                  {/* Donation amount */}
                  <div className="flex items-center justify-between pt-3 border-t border-deep/10">
                    <span className="text-xs text-dusk">
                      Monto de donación:
                    </span>
                    <span className="text-lg font-bold text-deep">
                      ${donationAmount}
                    </span>
                  </div>

                  {/* Animated progress bar */}
                  <div>
                    <div className="w-full bg-white/50 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          background:
                            "linear-gradient(to right, #A7C4A0, #7BA074)",
                          width: `${service.cause.goalPercent}%`,
                          animation: "progressFill 1.5s ease-out forwards",
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-dusk mt-1 text-center">
                      Meta de campaña: {service.cause.goalPercent}% completada
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex justify-center gap-6 opacity-80 hover:opacity-100 transition-all duration-300">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="material-symbols-outlined text-dusk/60"
                    style={{ fontSize: "22px" }}
                  >
                    verified_user
                  </span>
                  <span className="text-[10px] text-dusk/60 font-bold uppercase">
                    Seguro
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="material-symbols-outlined text-dusk/60"
                    style={{ fontSize: "22px" }}
                  >
                    workspace_premium
                  </span>
                  <span className="text-[10px] text-dusk/60 font-bold uppercase">
                    Calidad
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="material-symbols-outlined text-dusk/60"
                    style={{ fontSize: "22px" }}
                  >
                    support_agent
                  </span>
                  <span className="text-[10px] text-dusk/60 font-bold uppercase">
                    Soporte
                  </span>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </div>

      {/* Related services */}
      <section className="mt-20">
        <Animate animation="fadeUp">
          <h2 className="text-deep font-bold text-2xl mb-6 tracking-tight">
            Servicios relacionados
          </h2>
        </Animate>
        <Animate animation="staggerUp" staggerDelay={100}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((s) => (
              <ServiceCard key={s.title} {...s} href="/servicios/1" />
            ))}
          </div>
        </Animate>
      </section>
    </div>
  );
}
