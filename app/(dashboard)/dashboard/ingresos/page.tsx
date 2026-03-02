"use client";

import { DollarSign, TrendingUp, Clock, Heart } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { MiniChart } from "@/components/dashboard/mini-chart";
import { PageHeader } from "@/components/dashboard/page-header";
import {
  mockProvider,
  mockMonthlyRevenue,
  mockTransactions,
  formatCurrency,
  formatDate,
} from "@/lib/mock/dashboard-data";

const typeBadge: Record<string, { variant: "completed" | "pending" | "cancelled"; label: string }> = {
  income: { variant: "completed", label: "Ingreso" },
  donation: { variant: "impact" as "completed", label: "Donacion" },
  fee: { variant: "cancelled", label: "Comision" },
};

export default function IngresosPage() {
  const p = mockProvider.stats;

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader title="Ingresos" subtitle="Revisa tus ganancias y transacciones" />
      </Animate>

      <Animate animation="staggerUp" staggerDelay={80}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatCard
            label="Total acumulado"
            value={p.totalRevenue}
            prefix="$"
            icon={DollarSign}
          />
          <DashboardStatCard
            label="Este mes"
            value={p.monthlyRevenue}
            prefix="$"
            icon={TrendingUp}
            trend={{ value: 18, positive: true }}
          />
          <DashboardStatCard
            label="Pendiente"
            value={p.pendingRevenue}
            prefix="$"
            icon={Clock}
          />
          <DashboardStatCard
            label="Donado a causas"
            value={p.donatedTotal}
            prefix="$"
            icon={Heart}
          />
        </div>
      </Animate>

      <Animate animation="fadeUp" delay={200}>
        <DashboardCard>
          <h2 className="text-deep font-semibold mb-4">Ingresos por mes</h2>
          <MiniChart
            data={mockMonthlyRevenue.map((m) => m.amount)}
            labels={mockMonthlyRevenue.map((m) => m.month)}
            height={180}
          />
        </DashboardCard>
      </Animate>

      <Animate animation="fadeUp" delay={300}>
        <DashboardCard>
          <h2 className="text-deep font-semibold mb-4">Transacciones recientes</h2>
          <div className="space-y-0">
            {mockTransactions.map((tx) => {
              const badge = typeBadge[tx.type];
              const isNegative = tx.amount < 0;
              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between py-3 border-b border-sage/10 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge variant={badge?.variant ?? "category"}>
                      {badge?.label ?? tx.type}
                    </Badge>
                    <span className="text-dusk text-sm truncate">{tx.description}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span
                      className={`font-semibold text-sm ${
                        isNegative ? "text-stone" : "text-meadow"
                      }`}
                    >
                      {isNegative ? "-" : "+"}
                      {formatCurrency(Math.abs(tx.amount))}
                    </span>
                    <span className="text-stone text-xs hidden sm:block">
                      {formatDate(tx.date)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>
      </Animate>
    </div>
  );
}
