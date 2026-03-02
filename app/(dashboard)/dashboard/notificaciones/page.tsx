"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { NotificationItem } from "@/components/dashboard/notification-item";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import { mockNotifications, timeAgo, type NotificationType } from "@/lib/mock/dashboard-data";

const filters: { label: string; value: NotificationType | "all" | "unread" }[] = [
  { label: "Todas", value: "all" },
  { label: "No leidas", value: "unread" },
  { label: "Tratos", value: "deal" },
  { label: "Pagos", value: "payment" },
  { label: "Resenas", value: "review" },
  { label: "Sistema", value: "system" },
];

export default function NotificacionesPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const filtered = mockNotifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader
          title="Notificaciones"
          subtitle={`${unreadCount} sin leer`}
          action={
            <Button variant="ghost">
              Marcar todas como leidas
            </Button>
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

      <Animate animation="fadeUp" delay={200}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="Sin notificaciones"
            description="No tienes notificaciones en esta categoria."
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
    </div>
  );
}
