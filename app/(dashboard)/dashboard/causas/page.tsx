"use client";

import { Heart, DollarSign, Link2 } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { CauseImpactCard } from "@/components/dashboard/cause-impact-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { mockProvider, mockCauses, formatCurrency, formatDate } from "@/lib/mock/dashboard-data";

// Mock donation timeline
const donationTimeline = [
  { date: "2026-02-28", amount: 45, cause: "Educacion Digital" },
  { date: "2026-02-25", amount: 15, cause: "Educacion Digital" },
  { date: "2026-02-20", amount: 80, cause: "Medio Ambiente" },
  { date: "2026-02-10", amount: 35, cause: "Salud Comunitaria" },
  { date: "2026-01-28", amount: 45, cause: "Educacion Digital" },
  { date: "2026-01-15", amount: 80, cause: "Medio Ambiente" },
];

export default function CausasPage() {
  const totalDonated = mockProvider.stats.donatedTotal;
  const causesSupported = mockCauses.length;

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader
          title="Causas sociales"
          subtitle="Tu contribucion al impacto social"
        />
      </Animate>

      <Animate animation="staggerUp" staggerDelay={80}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DashboardStatCard
            label="Total donado"
            value={totalDonated}
            prefix="$"
            icon={DollarSign}
          />
          <DashboardStatCard
            label="Causas apoyadas"
            value={causesSupported}
            icon={Heart}
          />
          <DashboardStatCard
            label="Servicios vinculados"
            value={mockCauses.reduce((acc, c) => acc + c.servicesLinked, 0)}
            icon={Link2}
          />
        </div>
      </Animate>

      {/* Cause cards */}
      <Animate animation="staggerUp" staggerDelay={100}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCauses.map((cause) => (
            <CauseImpactCard
              key={cause.id}
              name={cause.name}
              description={cause.description}
              category={cause.category}
              totalRaised={cause.totalRaised}
              goal={cause.goal}
              yourContribution={cause.yourContribution}
              servicesLinked={cause.servicesLinked}
            />
          ))}
        </div>
      </Animate>

      {/* Donation timeline */}
      <Animate animation="fadeUp" delay={300}>
        <DashboardCard>
          <h3 className="text-deep font-semibold mb-4">Historial de donaciones</h3>
          <div className="space-y-0">
            {donationTimeline.map((d, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3 border-b border-sage/10 last:border-0"
              >
                <div className="w-8 h-8 rounded-lg bg-sprout/15 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-meadow" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-dusk text-sm">Donacion a {d.cause}</p>
                  <p className="text-stone text-xs">{formatDate(d.date)}</p>
                </div>
                <span className="text-meadow font-semibold text-sm">
                  {formatCurrency(d.amount)}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </Animate>
    </div>
  );
}
