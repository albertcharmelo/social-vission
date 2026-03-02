import Image from "next/image";
import { CauseCard } from "@/components/ui/cause-card";
import { Animate } from "@/components/ui/animate";

const causes = [
  {
    name: "Educación Para Todos",
    description:
      "Becas y materiales escolares para niños en comunidades vulnerables. Brindamos acceso a educación de calidad.",
    category: "Educación",
    raised: 3200,
    goal: 10000,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
  },
  {
    name: "Reforestemos Juntos",
    description:
      "Plantación de árboles nativos en zonas deforestadas. Cada árbol contribuye a restaurar ecosistemas locales.",
    category: "Medio Ambiente",
    raised: 5800,
    goal: 8000,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
  },
  {
    name: "Salud Comunitaria",
    description:
      "Jornadas de salud gratuitas en barrios periféricos. Atención médica y prevención para quienes más lo necesitan.",
    category: "Salud",
    raised: 2100,
    goal: 6000,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },
  {
    name: "Tech para Todos",
    description:
      "Talleres de programación y tecnología para jóvenes de bajos recursos. Cerrando la brecha digital.",
    category: "Tecnología",
    raised: 1800,
    goal: 5000,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
  },
  {
    name: "Alimentos Solidarios",
    description:
      "Red de comedores comunitarios que brindan alimentación nutritiva a familias en situación de vulnerabilidad.",
    category: "Alimentación",
    raised: 4200,
    goal: 7000,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
  },
  {
    name: "Arte y Cultura",
    description:
      "Espacios de arte y expresión cultural en comunidades marginadas. El arte como herramienta de transformación.",
    category: "Arte",
    raised: 950,
    goal: 4000,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop",
  },
];

const steps = [
  {
    icon: "shopping_cart",
    title: "Se contrata un servicio",
    description:
      "Un usuario encuentra y contrata un servicio profesional en nuestro marketplace.",
  },
  {
    icon: "pie_chart",
    title: "Se destina el 10%",
    description:
      "De forma automática, el 10% del pago se separa para causas sociales.",
  },
  {
    icon: "volunteer_activism",
    title: "Llega a la causa",
    description:
      "Los fondos se transfieren directamente a la organización social verificada.",
  },
];

export default function CausasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&h=500&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/75 to-deep/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <Animate animation="fadeUp">
            <h1 className="text-cloud font-bold text-4xl md:text-5xl leading-tight tracking-tight">
              Impacto real,{" "}
              <span className="text-sprout">causas reales</span>
            </h1>
            <p className="text-cloud/70 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              Cada servicio contratado destina un 10% a organizaciones verificadas
              que transforman comunidades.
            </p>
          </Animate>
        </div>
      </section>

      {/* Impact stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <Animate animation="scaleIn">
          <div className="bg-mist rounded-[var(--radius-lg)] border border-sage/30 p-8 shadow-[var(--shadow-md)]">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <span className="material-symbols-outlined text-meadow mb-2 block" style={{ fontSize: "28px" }}>
                  payments
                </span>
                <p className="text-meadow text-3xl md:text-4xl font-bold">$12,450</p>
                <p className="text-stone text-sm mt-1">Total recaudado</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-warmth mb-2 block" style={{ fontSize: "28px" }}>
                  favorite
                </span>
                <p className="text-deep text-3xl md:text-4xl font-bold">8</p>
                <p className="text-stone text-sm mt-1">Causas activas</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-sky mb-2 block" style={{ fontSize: "28px" }}>
                  group
                </span>
                <p className="text-deep text-3xl md:text-4xl font-bold">1,200+</p>
                <p className="text-stone text-sm mt-1">Vidas impactadas</p>
              </div>
            </div>
          </div>
        </Animate>
      </section>

      {/* Causes grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <Animate animation="fadeUp">
          <h2 className="text-deep font-bold text-2xl md:text-3xl mb-8 tracking-tight">
            Causas activas
          </h2>
        </Animate>
        <Animate animation="staggerUp" staggerDelay={100}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {causes.map((cause) => (
              <CauseCard key={cause.name} {...cause} />
            ))}
          </div>
        </Animate>
      </section>

      {/* How donations work */}
      <section className="bg-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <Animate animation="fadeUp">
            <h2 className="text-deep font-bold text-2xl md:text-3xl text-center mb-12 tracking-tight">
              Cómo llegan las donaciones
            </h2>
          </Animate>
          <Animate animation="staggerUp" staggerDelay={150}>
            <div className="grid sm:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-sprout/20 flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-meadow text-3xl">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-deep font-semibold text-lg">{step.title}</h3>
                  <p className="text-stone text-sm mt-2 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>
    </>
  );
}
