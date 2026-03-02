"use client";

import { useState } from "react";
import Link from "next/link";
import { Handshake, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import {
  mockHiredServices,
  clientDealStatusConfig,
  type ClientDealStatus,
} from "@/lib/mock/client-data";
import { formatCurrency, formatDate } from "@/lib/mock/dashboard-data";

const filters = [
  { label: "Todos", value: "all" },
  { label: "En progreso", value: "in_progress" },
  { label: "Entregados", value: "delivered" },
  { label: "Completados", value: "completed" },
  { label: "Cancelados", value: "cancelled" },
];

const activeStatuses: ClientDealStatus[] = ["in_progress", "paid", "delivered", "revision_requested"];

export default function ClienteTratosPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = mockHiredServices.filter((s) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "in_progress") return activeStatuses.includes(s.status);
    return s.status === activeFilter;
  });

  const inProgress = mockHiredServices.filter((s) => activeStatuses.includes(s.status)).length;
  const completed = mockHiredServices.filter((s) => s.status === "completed").length;
  const cancelled = mockHiredServices.filter((s) => s.status === "cancelled").length;

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader title="Tratos" subtitle="Seguimiento de tus contrataciones" />
      </Animate>

      <Animate animation="staggerUp" staggerDelay={80}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatCard label="Total" value={mockHiredServices.length} icon={Handshake} />
          <DashboardStatCard label="En progreso" value={inProgress} icon={Clock} />
          <DashboardStatCard label="Completados" value={completed} icon={CheckCircle} />
          <DashboardStatCard label="Cancelados" value={cancelled} icon={XCircle} />
        </div>
      </Animate>

      <Animate animation="fadeUp" delay={200}>
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

      <Animate animation="fadeUp" delay={300}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={AlertCircle}
            title="Sin tratos"
            description="No hay tratos en esta categoria."
          />
        ) : (
          <div className="space-y-2">
            {filtered.map((s) => {
              const cfg = clientDealStatusConfig[s.status];
              return (
                <DashboardCard
                  key={s.id}
                  className="hover:shadow-[var(--shadow-md)] transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3 className="text-deep font-semibold text-sm">{s.title}</h3>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </div>
                      <p className="text-stone text-xs">{s.providerName} · Vence {formatDate(s.dueDate)}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-deep font-bold">{formatCurrency(s.amount)}</span>
                      <Link href={`/cliente/tratos/${s.dealId}`}>
                        <Button variant="secondary" className="text-xs px-3 py-2 rounded-lg">
                          Ver <ArrowRight className="w-3 h-3 ml-1" />
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
