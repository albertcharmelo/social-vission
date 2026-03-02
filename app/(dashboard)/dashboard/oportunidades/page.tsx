"use client";

import { useState } from "react";
import { Briefcase } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { PageHeader } from "@/components/dashboard/page-header";
import { OpportunityCard } from "@/components/dashboard/opportunity-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { mockOpportunities } from "@/lib/mock/dashboard-data";

const tabs = [
  { label: "Disponibles", value: "available" },
  { label: "Aplicadas", value: "applied" },
];

export default function OportunidadesPage() {
  const [activeTab, setActiveTab] = useState("available");

  const filtered =
    activeTab === "available"
      ? mockOpportunities.filter((o) => !o.applied)
      : mockOpportunities.filter((o) => o.applied);

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader
          title="Oportunidades"
          subtitle="Solicitudes de clientes que buscan proveedores"
        />
      </Animate>

      <Animate animation="fadeUp" delay={100}>
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveTab(t.value)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                ${activeTab === t.value
                  ? "bg-deep text-cloud"
                  : "bg-white text-dusk border border-sage/30 hover:bg-sage/10"
                }
              `}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Animate>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="Sin oportunidades"
          description={
            activeTab === "applied"
              ? "No has aplicado a ninguna oportunidad aun."
              : "No hay oportunidades disponibles en este momento."
          }
        />
      ) : (
        <Animate animation="staggerUp" staggerDelay={100}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((opp) => (
              <OpportunityCard key={opp.id} {...opp} />
            ))}
          </div>
        </Animate>
      )}
    </div>
  );
}
