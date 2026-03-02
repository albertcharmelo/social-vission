"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Package, MoreVertical, Pencil, Pause, Trash2, Play } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import {
  mockServices,
  formatCurrency,
  type ServiceStatus,
} from "@/lib/mock/dashboard-data";

const filters: { label: string; value: ServiceStatus | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Activos", value: "active" },
  { label: "Borradores", value: "draft" },
  { label: "Pausados", value: "paused" },
];

const statusBadge: Record<ServiceStatus, { variant: "completed" | "pending" | "cancelled"; label: string }> = {
  active: { variant: "completed", label: "Activo" },
  draft: { variant: "pending", label: "Borrador" },
  paused: { variant: "cancelled", label: "Pausado" },
};

export default function ServiciosPage() {
  const [activeFilter, setActiveFilter] = useState<ServiceStatus | "all">("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered =
    activeFilter === "all"
      ? mockServices
      : mockServices.filter((s) => s.status === activeFilter);

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader
          title="Servicios"
          subtitle={`${mockServices.length} servicios en total`}
          action={
            <Link href="/dashboard/servicios/nuevo">
              <Button>
                <Plus className="w-4 h-4 mr-1.5" />
                Nuevo servicio
              </Button>
            </Link>
          }
        />
      </Animate>

      {/* Filters */}
      <Animate animation="fadeUp" delay={100}>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => {
            const count =
              f.value === "all"
                ? mockServices.length
                : mockServices.filter((s) => s.status === f.value).length;
            return (
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
                <span className="ml-1.5 text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </Animate>

      {/* Services list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No hay servicios"
          description="No tienes servicios en esta categoria. Crea uno nuevo para empezar."
          action={
            <Link href="/dashboard/servicios/nuevo">
              <Button>
                <Plus className="w-4 h-4 mr-1.5" />
                Crear servicio
              </Button>
            </Link>
          }
        />
      ) : (
        <Animate animation="staggerUp" staggerDelay={80}>
          <div className="space-y-3">
            {filtered.map((service) => {
              const status = statusBadge[service.status];
              return (
                <DashboardCard key={service.id} className="hover:shadow-[var(--shadow-md)] transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Icon/image placeholder */}
                    <div className="w-12 h-12 rounded-xl bg-sage/15 flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-stone" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-deep font-semibold truncate">{service.title}</h3>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <p className="text-stone text-sm truncate">{service.description}</p>
                      <div className="flex items-center gap-4 mt-1.5 text-xs text-stone">
                        <span>{service.sales} ventas</span>
                        {service.rating > 0 && <span>{service.rating} estrellas</span>}
                        <span className="text-meadow">{service.donationPercent}% a {service.causeName}</span>
                      </div>
                    </div>

                    {/* Price + actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-deep font-bold text-lg">
                        {formatCurrency(service.price)}
                      </span>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === service.id ? null : service.id)}
                          className="p-2 rounded-lg hover:bg-sage/10 transition-colors cursor-pointer text-stone"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openMenu === service.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenu(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 z-20 bg-white rounded-xl border border-sage/20 shadow-[var(--shadow-md)] py-1 min-w-[160px]">
                              <Link
                                href={`/dashboard/servicios/${service.id}/editar`}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-dusk hover:bg-sage/10 transition-colors"
                                onClick={() => setOpenMenu(null)}
                              >
                                <Pencil className="w-3.5 h-3.5" /> Editar
                              </Link>
                              <button className="flex items-center gap-2 px-4 py-2 text-sm text-dusk hover:bg-sage/10 transition-colors w-full cursor-pointer">
                                {service.status === "paused" ? (
                                  <><Play className="w-3.5 h-3.5" /> Activar</>
                                ) : (
                                  <><Pause className="w-3.5 h-3.5" /> Pausar</>
                                )}
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 text-sm text-blush hover:bg-blush/10 transition-colors w-full cursor-pointer">
                                <Trash2 className="w-3.5 h-3.5" /> Eliminar
                              </button>
                            </div>
                          </>
                        )}
                      </div>
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
