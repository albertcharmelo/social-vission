"use client";

import { useState } from "react";
import { Bell, Handshake, Briefcase, Settings } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { NotificationItem } from "@/components/dashboard/notification-item";
import { PageHeader } from "@/components/dashboard/page-header";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { mockClientNotifications } from "@/lib/mock/client-data";
import { timeAgo } from "@/lib/mock/dashboard-data";

const filters = [
  { label: "Todas", value: "all" },
  { label: "No leidas", value: "unread" },
  { label: "Tratos", value: "deal" },
  { label: "Oportunidades", value: "opportunity" },
  { label: "Sistema", value: "system" },
];

export default function ClienteNotificacionesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = mockClientNotifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  const unreadCount = mockClientNotifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader
          title="Notificaciones"
          subtitle={
            unreadCount > 0
              ? `${unreadCount} notificacion${unreadCount > 1 ? "es" : ""} sin leer`
              : "Todo al dia"
          }
        />
      </Animate>

      <Animate animation="fadeUp" delay={100}>
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
              {f.value === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 bg-white/25 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </Animate>

      <Animate animation="fadeUp" delay={200}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="Sin notificaciones"
            description="No hay notificaciones en esta categoria."
          />
        ) : (
          <DashboardCard padding={false} className="overflow-hidden divide-y divide-sage/10">
            {filtered.map((n) => (
              <NotificationItem
                key={n.id}
                type={n.type}
                title={n.title}
                description={n.description}
                timestamp={timeAgo(n.timestamp)}
                read={n.read}
              />
            ))}
          </DashboardCard>
        )}
      </Animate>

      {/* Summary stats */}
      <Animate animation="fadeUp" delay={300}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Tratos", count: mockClientNotifications.filter((n) => n.type === "deal").length, icon: Handshake, color: "bg-calm/15 text-sky" },
            { label: "Oportunidades", count: mockClientNotifications.filter((n) => n.type === "opportunity").length, icon: Briefcase, color: "bg-petal/20 text-terra" },
            { label: "Sistema", count: mockClientNotifications.filter((n) => n.type === "system").length, icon: Settings, color: "bg-sage/15 text-dusk" },
          ].map(({ label, count, icon: Icon, color }) => (
            <DashboardCard key={label}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-stone text-xs">{label}</p>
                  <p className="text-deep font-bold text-lg">{count}</p>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      </Animate>
    </div>
  );
}
