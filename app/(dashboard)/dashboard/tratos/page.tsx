"use client";

import { useState } from "react";
import { Handshake, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import {
  mockDeals,
  formatCurrency,
  formatDate,
  type Deal,
  type DealStatus,
} from "@/lib/mock/dashboard-data";

const filters: { label: string; value: DealStatus | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "En progreso", value: "in_progress" },
  { label: "Completados", value: "completed" },
  { label: "Cancelados", value: "cancelled" },
];

const statusBadge: Record<DealStatus, { variant: "completed" | "pending" | "cancelled"; label: string }> = {
  in_progress: { variant: "pending", label: "En progreso" },
  completed: { variant: "completed", label: "Completado" },
  cancelled: { variant: "cancelled", label: "Cancelado" },
};

const columns: Column<Deal>[] = [
  {
    key: "clientName",
    label: "Cliente",
    sortable: true,
    render: (d) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-sage/20 flex items-center justify-center text-xs font-semibold text-dusk flex-shrink-0">
          {d.clientName.split(" ").map((n) => n[0]).join("")}
        </div>
        <span className="text-dusk font-medium">{d.clientName}</span>
      </div>
    ),
  },
  {
    key: "serviceTitle",
    label: "Servicio",
    render: (d) => <span className="text-stone">{d.serviceTitle}</span>,
    className: "hidden sm:table-cell",
  },
  {
    key: "amount",
    label: "Monto",
    sortable: true,
    render: (d) => <span className="text-deep font-semibold">{formatCurrency(d.amount)}</span>,
  },
  {
    key: "status",
    label: "Estado",
    render: (d) => {
      const s = statusBadge[d.status];
      return <Badge variant={s.variant}>{s.label}</Badge>;
    },
  },
  {
    key: "date",
    label: "Fecha",
    sortable: true,
    render: (d) => <span className="text-stone">{formatDate(d.date)}</span>,
    className: "hidden md:table-cell",
  },
];

export default function TratosPage() {
  const [activeFilter, setActiveFilter] = useState<DealStatus | "all">("all");

  const filtered =
    activeFilter === "all"
      ? mockDeals
      : mockDeals.filter((d) => d.status === activeFilter);

  const inProgress = mockDeals.filter((d) => d.status === "in_progress").length;
  const completed = mockDeals.filter((d) => d.status === "completed").length;
  const cancelled = mockDeals.filter((d) => d.status === "cancelled").length;

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader title="Tratos" subtitle="Gestiona tus ordenes y entregas" />
      </Animate>

      <Animate animation="staggerUp" staggerDelay={80}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatCard label="Total" value={mockDeals.length} icon={Handshake} />
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
                  ? "bg-deep text-cloud"
                  : "bg-white text-dusk border border-sage/30 hover:bg-sage/10"
                }
              `}
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
          <DashboardCard padding={false} className="overflow-hidden">
            <DataTable
              columns={columns}
              data={filtered}
              keyExtractor={(d) => d.id}
            />
          </DashboardCard>
        )}
      </Animate>
    </div>
  );
}
