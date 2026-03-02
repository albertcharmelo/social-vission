"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  DollarSign,
  Tag,
  ArrowLeft,
  Star,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Animate } from "@/components/ui/animate";
import { formatCurrency, formatDate } from "@/lib/mock/dashboard-data";
import type { PublishedOpportunity, OpportunityProposal } from "@/lib/mock/client-data";

interface OpportunityDetailProps {
  opportunity: PublishedOpportunity;
  proposals: OpportunityProposal[];
  role: "client" | "provider";
  backHref: string;
  /** If provider: whether this provider already applied */
  alreadyApplied?: boolean;
  onApply?: () => void;
  onSelectProposal?: (proposalId: string) => void;
}

const statusConfig = {
  open: { variant: "completed" as const, label: "Abierta" },
  in_review: { variant: "pending" as const, label: "En revision" },
  closed: { variant: "cancelled" as const, label: "Cerrada" },
};

export function OpportunityDetail({
  opportunity,
  proposals,
  role,
  backHref,
  alreadyApplied = false,
  onApply,
  onSelectProposal,
}: OpportunityDetailProps) {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const status = statusConfig[opportunity.status];

  const handleSelectProposal = (id: string) => {
    setSelectedProposal(id);
    onSelectProposal?.(id);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Animate animation="fadeUp" duration={500}>
        <div className="flex items-center gap-3 mb-2">
          <Link href={backHref}>
            <Button variant="ghost" className="p-2 rounded-lg">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-deep text-xl font-bold">{opportunity.title}</h1>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
            <p className="text-stone text-sm mt-0.5">Oportunidad publicada</p>
          </div>
          {role === "provider" && opportunity.status === "open" && (
            <Button onClick={onApply} disabled={alreadyApplied}>
              {alreadyApplied ? "Ya aplicaste" : "Enviar propuesta"}
            </Button>
          )}
        </div>
      </Animate>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-4">
          <Animate animation="fadeUp" delay={100}>
            <DashboardCard>
              <h2 className="text-deep font-semibold mb-3">Descripcion</h2>
              <p className="text-dusk text-sm leading-relaxed mb-4">{opportunity.description}</p>

              {opportunity.requirements.length > 0 && (
                <>
                  <h3 className="text-deep font-medium text-sm mb-2">Requisitos</h3>
                  <ul className="space-y-1.5">
                    {opportunity.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-dusk">
                        <CheckCircle className="w-4 h-4 text-meadow mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </DashboardCard>
          </Animate>

          {/* Proposals — visible to client always, to provider only after applying */}
          {(role === "client" || alreadyApplied) && proposals.length > 0 && (
            <Animate animation="fadeUp" delay={200}>
              <DashboardCard>
                <h2 className="text-deep font-semibold mb-4">
                  Propuestas recibidas ({proposals.length})
                </h2>
                <div className="space-y-4">
                  {proposals.map((p) => (
                    <div
                      key={p.id}
                      className={`
                        p-4 rounded-xl border-2 transition-colors
                        ${selectedProposal === p.id
                          ? "border-sky bg-calm/5"
                          : "border-sage/20 hover:border-sage/40"
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-sage/20 flex items-center justify-center text-xs font-semibold text-dusk flex-shrink-0">
                          {p.providerName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-deep font-semibold text-sm">{p.providerName}</span>
                            {p.providerPlan === "pro" && <Badge variant="pro">PRO</Badge>}
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3.5 h-3.5 text-honey fill-honey" />
                              <span className="text-xs text-dusk">{p.providerRating}</span>
                            </div>
                          </div>
                          <p className="text-dusk text-sm mt-1.5">{p.message}</p>
                          <div className="flex gap-4 mt-2 text-xs text-stone">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {formatCurrency(p.price)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {p.deliveryDays} dias
                            </span>
                          </div>
                        </div>
                        {role === "client" && opportunity.status === "open" && (
                          <Button
                            variant={selectedProposal === p.id ? "primary" : "secondary"}
                            className="text-xs px-3 py-2 rounded-lg flex-shrink-0"
                            onClick={() => handleSelectProposal(p.id)}
                          >
                            {selectedProposal === p.id ? "Seleccionada" : "Seleccionar"}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {role === "client" && selectedProposal && (
                  <div className="mt-4 pt-4 border-t border-sage/20 flex justify-end">
                    <Button>Contratar propuesta seleccionada</Button>
                  </div>
                )}
              </DashboardCard>
            </Animate>
          )}
        </div>

        {/* Sidebar */}
        <Animate animation="fadeUp" delay={150}>
          <DashboardCard>
            <h3 className="text-deep font-semibold mb-4">Detalles</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-warmth/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-warmth" />
                </div>
                <div>
                  <p className="text-stone text-xs">Presupuesto</p>
                  <p className="text-deep font-semibold">{formatCurrency(opportunity.budget)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-sky" />
                </div>
                <div>
                  <p className="text-stone text-xs">Plazo limite</p>
                  <p className="text-deep font-semibold">{formatDate(opportunity.deadline)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-calm/20 flex items-center justify-center">
                  <Tag className="w-4 h-4 text-sky" />
                </div>
                <div>
                  <p className="text-stone text-xs">Categoria</p>
                  <p className="text-deep font-semibold">{opportunity.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sage/15 flex items-center justify-center">
                  <Users className="w-4 h-4 text-dusk" />
                </div>
                <div>
                  <p className="text-stone text-xs">Propuestas</p>
                  <p className="text-deep font-semibold">{opportunity.proposals}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sage/15 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-dusk" />
                </div>
                <div>
                  <p className="text-stone text-xs">Publicada</p>
                  <p className="text-deep font-semibold">{formatDate(opportunity.createdAt)}</p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </Animate>
      </div>
    </div>
  );
}
