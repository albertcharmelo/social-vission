"use client";

import Link from "next/link";
import {
  DollarSign,
  Handshake,
  Star,
  Trophy,
  Plus,
  Briefcase,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { MiniChart } from "@/components/dashboard/mini-chart";
import { NotificationItem } from "@/components/dashboard/notification-item";
import {
  mockProvider,
  mockDeals,
  mockNotifications,
  mockWeeklyRevenue,
  formatCurrency,
  formatDate,
  timeAgo,
} from "@/lib/mock/dashboard-data";

const dealStatusBadge: Record<string, { variant: "completed" | "pending" | "cancelled"; label: string }> = {
  in_progress: { variant: "pending", label: "En progreso" },
  completed: { variant: "completed", label: "Completado" },
  cancelled: { variant: "cancelled", label: "Cancelado" },
};

export default function DashboardOverview() {
  const p = mockProvider;
  const recentDeals = mockDeals.slice(0, 5);
  const recentNotifs = mockNotifications.slice(0, 3);

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
              {greeting()}, {p.name.split(" ")[0]}
            </h1>
            <p className="text-stone text-sm mt-0.5">
              Aqui tienes un resumen de tu actividad
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/servicios/nuevo">
              <Button>
                <Plus className="w-4 h-4 mr-1.5" />
                Crear servicio
              </Button>
            </Link>
            <Link href="/dashboard/oportunidades">
              <Button variant="secondary">
                <Briefcase className="w-4 h-4 mr-1.5" />
                Oportunidades
              </Button>
            </Link>
          </div>
        </div>
      </Animate>

      {/* Stats */}
      <Animate animation="staggerUp" staggerDelay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatCard
            label="Ingresos del mes"
            value={p.stats.monthlyRevenue}
            prefix="$"
            icon={DollarSign}
            trend={{ value: 18, positive: true }}
          />
          <DashboardStatCard
            label="Tratos activos"
            value={p.stats.activeDeals}
            icon={Handshake}
            trend={{ value: 12, positive: true }}
          />
          <DashboardStatCard
            label="Valoracion"
            value={p.stats.averageRating}
            decimals={1}
            icon={Star}
          />
          <DashboardStatCard
            label="Ranking"
            value={p.stats.rankPosition}
            prefix="#"
            icon={Trophy}
            trend={{ value: 3, positive: true }}
          />
        </div>
      </Animate>

      {/* Chart + Notifications */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Animate animation="fadeUp" delay={200} className="lg:col-span-2">
          <DashboardCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-deep font-semibold">Ingresos ultimos 7 dias</h2>
              <Link
                href="/dashboard/ingresos"
                className="text-sky text-xs font-medium hover:text-terra transition-colors flex items-center gap-1"
              >
                Ver todo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <MiniChart
              data={mockWeeklyRevenue}
              labels={["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]}
              height={140}
            />
          </DashboardCard>
        </Animate>

        <Animate animation="fadeUp" delay={300}>
          <DashboardCard padding={false} className="overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-3">
              <h2 className="text-deep font-semibold">Notificaciones</h2>
              <Link
                href="/dashboard/notificaciones"
                className="text-sky text-xs font-medium hover:text-terra transition-colors"
              >
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

      {/* Recent deals */}
      <Animate animation="fadeUp" delay={400}>
        <DashboardCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-deep font-semibold">Ultimos tratos</h2>
            <Link
              href="/dashboard/tratos"
              className="text-sky text-xs font-medium hover:text-terra transition-colors flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sage/20">
                  <th className="text-left text-stone font-medium py-2 px-3">Cliente</th>
                  <th className="text-left text-stone font-medium py-2 px-3 hidden sm:table-cell">Servicio</th>
                  <th className="text-left text-stone font-medium py-2 px-3">Monto</th>
                  <th className="text-left text-stone font-medium py-2 px-3">Estado</th>
                  <th className="text-left text-stone font-medium py-2 px-3 hidden md:table-cell">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentDeals.map((d) => {
                  const status = dealStatusBadge[d.status];
                  return (
                    <tr key={d.id} className="border-b border-sage/10">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-sage/20 flex items-center justify-center text-xs font-semibold text-dusk">
                            {d.clientName.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-dusk font-medium">{d.clientName}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-stone hidden sm:table-cell">{d.serviceTitle}</td>
                      <td className="py-2.5 px-3 text-deep font-semibold">{formatCurrency(d.amount)}</td>
                      <td className="py-2.5 px-3">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="py-2.5 px-3 text-stone hidden md:table-cell">{formatDate(d.date)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </Animate>

      {/* Impact summary */}
      <Animate animation="fadeUp" delay={500}>
        <DashboardCard className="bg-gradient-to-br from-white to-sprout/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sprout/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-meadow" />
            </div>
            <div className="flex-1">
              <h3 className="text-deep font-semibold">Tu impacto social</h3>
              <p className="text-stone text-sm mt-0.5">
                Has donado {formatCurrency(p.stats.donatedTotal)} a causas sociales a traves de tus servicios.
              </p>
            </div>
            <Link href="/dashboard/causas">
              <Button variant="secondary">
                Ver causas <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </DashboardCard>
      </Animate>
    </div>
  );
}
