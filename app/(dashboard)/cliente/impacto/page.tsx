"use client";

import { Leaf, TrendingUp, Heart, Award } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import {
  mockClient,
  mockImpactByCause,
  mockImpactHistory,
} from "@/lib/mock/client-data";
import { formatCurrency, formatDate } from "@/lib/mock/dashboard-data";

export default function ClienteImpactoPage() {
  const totalImpact = mockClient.stats.totalImpact;
  const totalTransactions = mockImpactHistory.length;
  const topCause = [...mockImpactByCause].sort((a, b) => b.totalContributed - a.totalContributed)[0];

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader
          title="Mi impacto social"
          subtitle="El bien que generan tus compras"
        />
      </Animate>

      {/* Hero stat */}
      <Animate animation="fadeUp" delay={80}>
        <DashboardCard className="bg-gradient-to-br from-white to-sprout/8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-sprout/20 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-8 h-8 text-meadow" />
            </div>
            <div className="flex-1">
              <p className="text-stone text-sm">Total donado a causas sociales</p>
              <p className="text-meadow text-4xl font-bold mt-1">{formatCurrency(totalImpact)}</p>
              <p className="text-dusk text-sm mt-1">
                A traves de {totalTransactions} compras en {mockImpactByCause.length} causas distintas.
              </p>
            </div>
          </div>
        </DashboardCard>
      </Animate>

      {/* Summary stats */}
      <Animate animation="staggerUp" staggerDelay={80}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total donado", value: formatCurrency(totalImpact), icon: Leaf, color: "bg-sprout/15 text-meadow" },
            { label: "Compras con impacto", value: `${totalTransactions}`, icon: Heart, color: "bg-petal/20 text-terra" },
            { label: "Causas apoyadas", value: `${mockImpactByCause.length}`, icon: Award, color: "bg-calm/20 text-sky" },
            { label: "Impacto promedio", value: formatCurrency(totalImpact / totalTransactions), icon: TrendingUp, color: "bg-honey/15 text-terra" },
          ].map(({ label, value, icon: Icon, color }) => (
            <DashboardCard key={label}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-stone text-xs">{label}</p>
                  <p className="text-deep font-bold text-lg">{value}</p>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      </Animate>

      {/* By cause */}
      <Animate animation="fadeUp" delay={200}>
        <DashboardCard>
          <h2 className="text-deep font-semibold mb-4">Por causa social</h2>
          <div className="space-y-4">
            {mockImpactByCause.map((cause) => {
              const percentage = (cause.totalContributed / totalImpact) * 100;
              return (
                <div key={cause.causeId}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div>
                      <p className="text-deep font-medium text-sm">{cause.causeName}</p>
                      <p className="text-stone text-xs">{cause.transactions} donacion{cause.transactions !== 1 ? "es" : ""}</p>
                    </div>
                    <p className="text-meadow font-bold">{formatCurrency(cause.totalContributed)}</p>
                  </div>
                  <div className="h-2.5 bg-sage/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sprout to-meadow rounded-full transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-stone text-xs mt-1">{percentage.toFixed(1)}% del total</p>
                </div>
              );
            })}
          </div>
        </DashboardCard>
      </Animate>

      {/* Timeline */}
      <Animate animation="fadeUp" delay={300}>
        <DashboardCard>
          <h2 className="text-deep font-semibold mb-4">Historial de donaciones</h2>
          {mockImpactHistory.length === 0 ? (
            <EmptyState
              icon={Leaf}
              title="Sin historial"
              description="Tus contribuciones apareceran aqui."
            />
          ) : (
            <div className="space-y-0 divide-y divide-sage/10">
              {mockImpactHistory.map((entry, i) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  <div className="w-9 h-9 rounded-lg bg-sprout/15 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-4 h-4 text-meadow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-deep font-medium text-sm truncate">{entry.dealTitle}</p>
                    <p className="text-stone text-xs">{entry.causeName} · {formatDate(entry.date)}</p>
                  </div>
                  <p className="text-meadow font-bold flex-shrink-0">+{formatCurrency(entry.amount)}</p>
                </div>
              ))}
            </div>
          )}
        </DashboardCard>
      </Animate>

      {/* Top cause highlight */}
      {topCause && (
        <Animate animation="fadeUp" delay={400}>
          <div className="bg-sprout/10 border border-meadow/20 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-meadow/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-meadow" />
              </div>
              <div>
                <p className="text-deep font-semibold">Causa principal apoyada</p>
                <p className="text-meadow font-bold text-lg">{topCause.causeName}</p>
                <p className="text-dusk text-sm mt-0.5">
                  Has contribuido <span className="text-meadow font-semibold">{formatCurrency(topCause.totalContributed)}</span> a traves de {topCause.transactions} compras.
                </p>
              </div>
            </div>
          </div>
        </Animate>
      )}
    </div>
  );
}
