import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/service-card";
import { CauseCard } from "@/components/ui/cause-card";
import { Animate } from "@/components/ui/animate";
import { ImpactCarousel } from "@/components/ui/impact-carousel";

const featuredServices = [
  {
    title: "Diseño de marca completo",
    description: "Logo, paleta de colores, tipografía y guía de estilo.",
    price: "$450",
    provider: "María González",
    rating: 4.8,
    reviews: 47,
    isPro: true,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
  },
  {
    title: "Desarrollo web a medida",
    description: "Landing page o sitio web profesional con diseño responsive.",
    price: "$800",
    provider: "Carlos Ruiz",
    rating: 4.9,
    reviews: 63,
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
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
  },
];

const featuredCauses = [
  {
    name: "Educación Para Todos",
    description: "Becas y materiales para niños en comunidades vulnerables.",
    category: "Educación",
    raised: 3200,
    goal: 10000,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
  },
  {
    name: "Reforestemos Juntos",
    description: "Plantación de árboles nativos en zonas deforestadas.",
    category: "Medio Ambiente",
    raised: 5800,
    goal: 8000,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
  },
  {
    name: "Salud Comunitaria",
    description: "Jornadas de salud gratuitas en barrios periféricos.",
    category: "Salud",
    raised: 2100,
    goal: 6000,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },
];

const steps = [
  {
    icon: "search",
    title: "Encuentra un servicio",
    description: "Explora cientos de servicios profesionales en nuestro marketplace.",
  },
  {
    icon: "handshake",
    title: "Contrata al profesional",
    description: "Elige al proveedor ideal y realiza tu compra de forma segura.",
  },
  {
    icon: "favorite",
    title: "Genera impacto social",
    description: "El 10% de cada compra va directo a causas sociales verificadas.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — Full-width immersive */}
      <section className="relative min-h-[92vh] flex flex-col overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&h=1000&fit=crop&q=80"
            alt="Equipo diverso colaborando"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/60 to-deep/90" />
        </div>

        {/* Top bar — subtitle + trust */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
            <Animate animation="fadeUp">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-cloud/50 text-xs sm:text-sm font-medium uppercase tracking-[0.2em]">
                  — marketplace de impacto social
                </p>
                <div className="hidden sm:flex items-center gap-6">
                  <span className="text-cloud/40 text-xs font-medium flex items-center gap-1.5">
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>verified</span>
                    Causas verificadas
                  </span>
                  <span className="text-cloud/40 text-xs font-medium flex items-center gap-1.5">
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>lock</span>
                    Pagos seguros
                  </span>
                  <span className="text-cloud/40 text-xs font-medium flex items-center gap-1.5">
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>eco</span>
                    10% a causas
                  </span>
                </div>
              </div>
            </Animate>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <Animate animation="fadeUp" delay={100}>
              <h1 className="text-cloud font-bold text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-tight max-w-4xl">
                Contrata servicios que{" "}
                <span className="text-warmth">transforman</span>{" "}
                comunidades
              </h1>
            </Animate>

            <Animate animation="fadeUp" delay={250}>
              <p className="text-cloud/60 text-lg sm:text-xl mt-6 max-w-xl leading-relaxed">
                Cada compra destina un 10% a causas sociales verificadas.
                Encuentra profesionales comprometidos con el cambio.
              </p>
            </Animate>

            {/* Search bar */}
            <Animate animation="fadeUp" delay={400}>
              <form
                action="/marketplace"
                className="mt-10 flex flex-col sm:flex-row gap-3 max-w-2xl"
              >
                <div className="flex-1 relative">
                  <span
                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone"
                    style={{ fontSize: "22px" }}
                  >
                    search
                  </span>
                  <input
                    type="text"
                    name="q"
                    placeholder="Busca diseño, desarrollo, marketing..."
                    className="w-full bg-white/10 backdrop-blur-md text-cloud placeholder:text-cloud/40 border border-cloud/15 rounded-[var(--radius-full)] pl-12 pr-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-warmth/40 focus:border-warmth/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-warmth hover:bg-terra text-white font-semibold px-8 py-4 rounded-[var(--radius-full)] transition-all cursor-pointer shadow-[var(--shadow-cta)] flex items-center justify-center gap-2 shrink-0"
                >
                  Explorar servicios
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    arrow_forward
                  </span>
                </button>
              </form>
            </Animate>

            {/* Quick category pills */}
            <Animate animation="fadeUp" delay={550}>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Diseño", "Desarrollo", "Marketing", "Consultoría", "Fotografía"].map((cat) => (
                  <Link
                    key={cat}
                    href="/marketplace"
                    className="text-cloud/50 hover:text-cloud hover:bg-cloud/10 text-xs font-medium border border-cloud/10 px-4 py-2 rounded-[var(--radius-full)] transition-all"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </Animate>
          </div>
        </div>

        {/* Bottom bar — KPIs at same level as brand name */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
            <Animate animation="fadeUp" delay={650}>
              <div className="border-t border-cloud/20 pt-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 items-end">
                  {/* Brand watermark */}
                  <div className="col-span-2 lg:col-span-1">
                    <p className="text-cloud/15 font-bold text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-tighter select-none">
                      Social<br />Vission®
                    </p>
                  </div>

                  {/* KPI 1 */}
                  <div className="lg:border-l lg:border-cloud/15 lg:pl-8">
                    <p className="text-warmth text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-tight">
                      $12,450<span className="text-white/80">+</span>
                    </p>
                    <p className="text-cloud/80 text-sm font-medium mt-2 uppercase tracking-wide">
                      Donados a causas
                    </p>
                  </div>

                  {/* KPI 2 */}
                  <div className="lg:border-l lg:border-cloud/15 lg:pl-8">
                    <p className="text-white text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-tight">
                      156
                    </p>
                    <p className="text-cloud/80 text-sm font-medium mt-2 uppercase tracking-wide">
                      Servicios completados
                    </p>
                  </div>

                  {/* KPI 3 */}
                  <div className="lg:border-l lg:border-cloud/15 lg:pl-8">
                    <p className="text-warmth text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-tight">
                      8
                    </p>
                    <p className="text-cloud/80 text-sm font-medium mt-2 uppercase tracking-wide">
                      Causas apoyadas
                    </p>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-mist overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Heading */}
            <Animate animation="fadeLeft">
              <div>
                <span className="text-warmth text-sm font-semibold uppercase tracking-[0.15em]">
                  Cómo funciona
                </span>
                <h2 className="text-deep font-bold text-3xl md:text-[2.75rem] leading-[1.15] tracking-tight mt-3">
                  Tres pasos para generar{" "}
                  <span className="text-warmth">un cambio real</span>
                </h2>
                <p className="text-stone text-lg mt-4 leading-relaxed max-w-md">
                  Contrata profesionales talentosos y transforma comunidades al mismo tiempo.
                </p>
              </div>
            </Animate>

            {/* Right — Steps */}
            <Animate animation="staggerUp" staggerDelay={150}>
              <div className="flex flex-col gap-5">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="group bg-cloud rounded-[var(--radius-lg)] p-6 flex items-start gap-5 border border-sage/30 hover:border-warmth/30 hover:shadow-[var(--shadow-md)] transition-all"
                  >
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-[var(--radius-md)] bg-warmth/10 group-hover:bg-warmth/20 flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-warmth text-2xl">
                          {step.icon}
                        </span>
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-deep text-cloud text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-deep font-bold text-lg">{step.title}</h3>
                      <p className="text-stone text-sm mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <Animate animation="fadeUp">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-deep font-bold text-2xl md:text-3xl tracking-tight">
                Servicios destacados
              </h2>
              <p className="text-stone mt-1">Los más populares de la semana</p>
            </div>
            <Link
              href="/marketplace"
              className="text-sky hover:text-sky/80 text-sm font-medium transition-colors flex items-center gap-1"
            >
              Ver todos
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                arrow_forward
              </span>
            </Link>
          </div>
        </Animate>

        <Animate animation="staggerUp" staggerDelay={120}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.title}
                {...service}
                href="/servicios/1"
              />
            ))}
          </div>
        </Animate>
      </section>

      {/* Impact — Showcase */}
      <section className="bg-deep overflow-hidden relative">
        {/* Dot pattern background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #F7F5F2 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Subtle glow accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warmth/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sprout/[0.05] rounded-full blur-[100px]" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Content */}
            <div>
              <Animate animation="fadeUp">
                <span className="text-warmth text-sm font-semibold uppercase tracking-[0.15em]">
                  Nuestro impacto
                </span>
                <h2 className="text-white font-bold text-3xl md:text-[2.75rem] lg:text-5xl leading-[1.1] tracking-tight mt-4">
                  Cada servicio contratado{" "}
                  <span className="text-warmth">transforma</span> una comunidad
                </h2>
                <p className="text-cloud/60 text-lg mt-5 leading-relaxed max-w-lg">
                  Tu compra no solo resuelve una necesidad profesional — destina recursos reales a causas que cambian vidas.
                </p>
              </Animate>

              {/* KPIs */}
              <Animate animation="fadeUp" delay={200}>
                <div className="grid grid-cols-3 gap-6 mt-12">
                  <div>
                    <p className="font-mono text-warmth text-[clamp(1.8rem,4vw,3rem)] font-bold leading-none tracking-tight">
                      $12.4k
                    </p>
                    <div className="w-8 h-0.5 bg-warmth/40 rounded-full mt-3 mb-2" />
                    <p className="text-cloud/70 text-sm font-medium">
                      Total donado a causas verificadas
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-white text-[clamp(1.8rem,4vw,3rem)] font-bold leading-none tracking-tight">
                      156
                    </p>
                    <div className="w-8 h-0.5 bg-cloud/20 rounded-full mt-3 mb-2" />
                    <p className="text-cloud/70 text-sm font-medium">
                      Servicios completados con impacto
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-warmth text-[clamp(1.8rem,4vw,3rem)] font-bold leading-none tracking-tight">
                      8
                    </p>
                    <div className="w-8 h-0.5 bg-warmth/40 rounded-full mt-3 mb-2" />
                    <p className="text-cloud/70 text-sm font-medium">
                      Causas activas apoyadas
                    </p>
                  </div>
                </div>
              </Animate>

              {/* CTA */}
              <Animate animation="fadeUp" delay={350}>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Link href="/causas">
                    <Button>
                      <span className="flex items-center gap-2">
                        Ver todas las causas
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                          arrow_forward
                        </span>
                      </span>
                    </Button>
                  </Link>
                  <Link
                    href="/marketplace"
                    className="text-cloud/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
                  >
                    Explorar servicios
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </Animate>
            </div>

            {/* Right — Image carousel */}
            <Animate animation="fadeRight" delay={200}>
              <div className="aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] relative lg:-mr-8">
                <ImpactCarousel />
                {/* Floating impact badge */}
                <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 bg-mist rounded-[var(--radius-md)] p-4 shadow-[var(--shadow-lg)] border border-sage/30 z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-sprout/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-meadow" style={{ fontSize: "22px" }}>
                        volunteer_activism
                      </span>
                    </div>
                    <div>
                      <p className="text-deep font-bold text-sm">10% de cada compra</p>
                      <p className="text-stone text-xs">va directo a causas sociales</p>
                    </div>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* Featured causes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <Animate animation="fadeUp">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-deep font-bold text-2xl md:text-3xl tracking-tight">
                Causas que apoyamos
              </h2>
              <p className="text-stone mt-1">Tu compra transforma comunidades</p>
            </div>
            <Link
              href="/causas"
              className="text-sky hover:text-sky/80 text-sm font-medium transition-colors flex items-center gap-1"
            >
              Ver todas
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                arrow_forward
              </span>
            </Link>
          </div>
        </Animate>

        <Animate animation="staggerUp" staggerDelay={120}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCauses.map((cause) => (
              <CauseCard key={cause.name} {...cause} />
            ))}
          </div>
        </Animate>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <Animate animation="scaleIn">
          <div className="relative rounded-[var(--radius-xl)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=400&fit=crop"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep/90 to-deep/60" />
            <div className="relative px-8 sm:px-12 py-14 text-center sm:text-left">
              <h2 className="text-cloud font-bold text-2xl md:text-3xl tracking-tight">
                ¿Eres profesional? Únete al cambio
              </h2>
              <p className="text-cloud/70 mt-2 max-w-lg text-lg">
                Ofrece tus servicios y genera impacto social con cada venta.
              </p>
              <div className="mt-6">
                <Link href="/auth/registro-proveedor">
                  <Button>
                    <span className="flex items-center gap-2">
                      Registrarme como proveedor
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                        arrow_forward
                      </span>
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Animate>
      </section>
    </>
  );
}
