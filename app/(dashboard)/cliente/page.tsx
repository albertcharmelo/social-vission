"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Handshake,
  Leaf,
  Briefcase,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { NotificationItem } from "@/components/dashboard/notification-item";
import {
  mockClient,
  mockHiredServices,
  mockClientNotifications,
  mockImpactByCause,
  clientDealStatusConfig,
} from "@/lib/mock/client-data";
import { formatCurrency, timeAgo } from "@/lib/mock/dashboard-data";

function ClientStatCard({
  label,
  value,
  prefix = "",
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: number | string;
  prefix?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: boolean;
}) {
  return (
    <DashboardCard>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-stone text-sm mb-1">{label}</p>
          <p className="text-deep text-2xl font-bold">
            {prefix}{typeof value === "number" ? value.toLocaleString("en-US") : value}
          </p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accent ? "bg-sky/10" : "bg-sky/10"}`}>
          <Icon className="w-5 h-5 text-sky" />
        </div>
      </div>
    </DashboardCard>
  );
}

export default function ClienteOverview() {
  const c = mockClient;
  const activeServices = mockHiredServices.filter((s) =>
    ["in_progress", "delivered", "revision_requested"].includes(s.status)
  );
  const recentNotifs = mockClientNotifications.slice(0, 3);
  const unread = mockClientNotifications.filter((n) => !n.read).length;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Buenos dias";
    if (h < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <Animate animation="fadeUp" duration={500}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-deep text-2xl font-bold">
              {greeting()}, {c.name.split(" ")[0]}
            </h1>
            <p className="text-stone text-sm mt-0.5">
              Aqui tienes el resumen de tus compras e impacto
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/cliente/oportunidades/nueva">
              <Button>
                <Briefcase className="w-4 h-4 mr-1.5" />
                Publicar oportunidad
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="secondary">
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                Explorar servicios
              </Button>
            </Link>
          </div>
        </div>
      </Animate>

      {/* Stats */}
      <Animate animation="staggerUp" staggerDelay={80}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ClientStatCard label="Total gastado" value={c.stats.totalSpent} prefix="$" icon={ShoppingBag} />
          <ClientStatCard label="Tratos activos" value={c.stats.activeDeals} icon={Handshake} />
          <ClientStatCard label="Impacto generado" value={c.stats.totalImpact} prefix="$" icon={Leaf} />
          <ClientStatCard label="Oportunidades abiertas" value={c.stats.openOpportunities} icon={Briefcase} />
        </div>
      </Animate>

      {/* Active services + Notifications */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Animate animation="fadeUp" delay={200} className="lg:col-span-2">
          <DashboardCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-deep font-semibold">Servicios activos</h2>
              <Link href="/cliente/servicios" className="text-sky text-xs font-medium hover:text-terra transition-colors flex items-center gap-1">
                Ver todos <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {activeServices.length === 0 ? (
              <p className="text-stone text-sm text-center py-6">No tienes servicios activos</p>
            ) : (
              <div className="space-y-2">
                {activeServices.map((s) => {
                  const cfg = clientDealStatusConfig[s.status];
                  return (
                    <Link key={s.id} href={`/cliente/tratos/${s.dealId}`}>
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-calm/5 transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-sky/10 flex items-center justify-center flex-shrink-0">
                          {s.status === "delivered" ? (
                            <CheckCircle className="w-4 h-4 text-sky" />
                          ) : (
                            <Clock className="w-4 h-4 text-sky" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-deep font-medium text-sm truncate">{s.title}</p>
                          <p className="text-stone text-xs">{s.providerName}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant={cfg.variant}>{cfg.label}</Badge>
                          <span className="text-deep font-semibold text-sm">{formatCurrency(s.amount)}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </DashboardCard>
        </Animate>

        <Animate animation="fadeUp" delay={300}>
          <DashboardCard padding={false} className="overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-3">
              <h2 className="text-deep font-semibold">
                Notificaciones
                {unread > 0 && (
                  <span className="ml-2 bg-sky text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {unread}
                  </span>
                )}
              </h2>
              <Link href="/cliente/notificaciones" className="text-sky text-xs font-medium hover:text-terra transition-colors">
                Ver todas
              </Link>
            </div>
            <div className="divide-y divide-sage/10">
              {recentNotifs.map((n) => (
                <NotificationItem
                  key={n.id}
                  type={n.type}
                  title={n.title}
                  description={n.description}
                  timestamp={timeAgo(n.timestamp)}
                  read={n.read}
                />
              ))}
            </div>
          </DashboardCard>
        </Animate>
      </div>

      {/* Impact summary */}
      <Animate animation="fadeUp" delay={400}>
        <DashboardCard className="bg-gradient-to-br from-cloud to-sprout/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sprout/20 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-6 h-6 text-meadow" />
            </div>
            <div className="flex-1">
              <h3 className="text-deep font-semibold">Tu impacto social</h3>
              <p className="text-stone text-sm mt-0.5">
                Tus compras han donado <span className="text-meadow font-semibold">{formatCurrency(c.stats.totalImpact)}</span> a {mockImpactByCause.length} causas sociales.
              </p>
              <div className="flex gap-3 mt-2 flex-wrap">
                {mockImpactByCause.map((ic) => (
                  <span key={ic.causeId} className="text-xs bg-sprout/15 text-meadow px-2 py-0.5 rounded-full font-medium">
                    {ic.causeName}: {formatCurrency(ic.totalContributed)}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/cliente/impacto">
              <Button variant="secondary">
                Ver mi impacto <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </DashboardCard>
      </Animate>
    </div>
  );
}
