"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Clock,
  XCircle,
  ArrowRight,
  Users,
} from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { mockPublishedOpportunities } from "@/lib/mock/client-data";
import { formatCurrency, formatDate } from "@/lib/mock/dashboard-data";

const filters = [
  { label: "Todas", value: "all" },
  { label: "Abiertas", value: "open" },
  { label: "En revision", value: "in_review" },
  { label: "Cerradas", value: "closed" },
];

const statusConfig = {
  open: { variant: "completed" as const, label: "Abierta" },
  in_review: { variant: "pending" as const, label: "En revision" },
  closed: { variant: "cancelled" as const, label: "Cerrada" },
};

export default function ClienteOportunidadesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = mockPublishedOpportunities.filter((o) => {
    if (activeFilter === "all") return true;
    return o.status === activeFilter;
  });

  const openCount = mockPublishedOpportunities.filter((o) => o.status === "open").length;
  const inReviewCount = mockPublishedOpportunities.filter((o) => o.status === "in_review").length;
  const closedCount = mockPublishedOpportunities.filter((o) => o.status === "closed").length;

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader
          title="Mis oportunidades"
          subtitle="Solicitudes de servicio publicadas"
          action={
            <Link href="/cliente/oportunidades/nueva">
              <Button>
                <Plus className="w-4 h-4 mr-1.5" />
                Publicar oportunidad
              </Button>
            </Link>
          }
        />
      </Animate>

      {/* Stats */}
      <Animate animation="staggerUp" staggerDelay={80}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total", value: mockPublishedOpportunities.length, icon: Briefcase, color: "bg-sky/10 text-sky" },
            { label: "Abiertas", value: openCount, icon: Clock, color: "bg-sprout/15 text-meadow" },
            { label: "En revision", value: inReviewCount, icon: Users, color: "bg-honey/15 text-terra" },
            { label: "Cerradas", value: closedCount, icon: XCircle, color: "bg-sage/15 text-dusk" },
          ].map(({ label, value, icon: Icon, color }) => (
            <DashboardCard key={label}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-stone text-xs">{label}</p>
                  <p className="text-deep font-bold text-xl">{value}</p>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      </Animate>

      {/* Filters */}
      <Animate animation="fadeUp" delay={150}>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                ${activeFilter === f.value
                  ? "text-white"
                  : "bg-white text-dusk border border-sage/30 hover:bg-calm/10"
                }
              `}
              style={activeFilter === f.value ? { backgroundColor: "var(--color-sky)" } : {}}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Animate>

      {/* List */}
      <Animate animation="fadeUp" delay={200}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="Sin oportunidades"
            description="No tienes oportunidades en esta categoria."
            action={
              <Link href="/cliente/oportunidades/nueva">
                <Button>Publicar oportunidad</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((opp) => {
              const cfg = statusConfig[opp.status];
              return (
                <DashboardCard
                  key={opp.id}
                  className="hover:shadow-[var(--shadow-md)] transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-sky/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-sky" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3 className="text-deep font-semibold">{opp.title}</h3>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </div>
                      <p className="text-stone text-sm line-clamp-1">{opp.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-stone flex-wrap">
                        <span>{opp.category}</span>
                        <span>Plazo: {formatDate(opp.deadline)}</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {opp.proposals} propuesta{opp.proposals !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-deep font-bold text-lg">{formatCurrency(opp.budget)}</p>
                        <p className="text-stone text-xs">presupuesto</p>
                      </div>
                      <Link href={`/cliente/oportunidades/${opp.id}`}>
                        <Button variant="secondary" className="text-xs px-3 py-2 rounded-lg">
                          Ver <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </DashboardCard>
              );
            })}
          </div>
        )}
      </Animate>
    </div>
  );
}
