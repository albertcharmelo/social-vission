"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Clock, CheckCircle, XCircle, Package, ArrowRight } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
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
  { label: "Activos", value: "active" },
  { label: "Completados", value: "completed" },
  { label: "Cancelados", value: "cancelled" },
];

const activeStatuses: ClientDealStatus[] = ["in_progress", "paid", "delivered", "revision_requested"];

export default function ClienteServiciosPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = mockHiredServices.filter((s) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return activeStatuses.includes(s.status);
    if (activeFilter === "completed") return s.status === "completed";
    if (activeFilter === "cancelled") return s.status === "cancelled";
    return true;
  });

  const counts = {
    all: mockHiredServices.length,
    active: mockHiredServices.filter((s) => activeStatuses.includes(s.status)).length,
    completed: mockHiredServices.filter((s) => s.status === "completed").length,
    cancelled: mockHiredServices.filter((s) => s.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader
          title="Mis servicios"
          subtitle={`${mockHiredServices.length} servicios contratados en total`}
          action={
            <Link href="/marketplace">
              <Button>
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                Explorar marketplace
              </Button>
            </Link>
          }
        />
      </Animate>

      {/* Stats row */}
      <Animate animation="staggerUp" staggerDelay={80}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total", value: counts.all, icon: Package, color: "bg-sky/10 text-sky" },
            { label: "Activos", value: counts.active, icon: Clock, color: "bg-honey/15 text-terra" },
            { label: "Completados", value: counts.completed, icon: CheckCircle, color: "bg-sprout/15 text-meadow" },
            { label: "Cancelados", value: counts.cancelled, icon: XCircle, color: "bg-blush/15 text-blush" },
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
              {f.label} <span className="ml-1 opacity-60">({counts[f.value as keyof typeof counts]})</span>
            </button>
          ))}
        </div>
      </Animate>

      {/* Services list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Sin servicios"
          description="No tienes servicios en esta categoria."
          action={
            <Link href="/marketplace">
              <Button>Explorar servicios</Button>
            </Link>
          }
        />
      ) : (
        <Animate animation="staggerUp" staggerDelay={70}>
          <div className="space-y-3">
            {filtered.map((service) => {
              const cfg = clientDealStatusConfig[service.status];
              return (
                <DashboardCard
                  key={service.id}
                  className="hover:shadow-[var(--shadow-md)] transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-sky/10 flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-sky" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3 className="text-deep font-semibold">{service.title}</h3>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </div>
                      <p className="text-stone text-sm">
                        Proveedor: {service.providerName} · {service.category}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-stone">
                        <span>Inicio: {formatDate(service.startDate)}</span>
                        <span>Plazo: {formatDate(service.dueDate)}</span>
                        <span className="text-meadow font-medium">10% → {service.causeName}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-deep font-bold text-lg">{formatCurrency(service.amount)}</p>
                        <p className="text-meadow text-xs">+{formatCurrency(service.impactAmount)} impacto</p>
                      </div>
                      <Link href={`/cliente/tratos/${service.dealId}`}>
                        <Button variant="secondary" className="text-xs px-3 py-2 rounded-lg">
                          Ver trato <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </DashboardCard>
              );
            })}
          </div>
        </Animate>
      )}
    </div>
  );
}
