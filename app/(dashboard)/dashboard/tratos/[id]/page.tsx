"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  Handshake,
  Send,
  Upload,
  CheckCircle,
  Download,
  Link2,
} from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { DealTimeline } from "@/components/dashboard/deal-timeline";
import {
  mockDeals,
  formatCurrency,
  formatDate,
  timeAgo,
  type DealStatus,
} from "@/lib/mock/dashboard-data";
import type { ClientDealStatus } from "@/lib/mock/client-data";

// Map provider deal status → shared timeline status
const statusMap: Record<DealStatus, ClientDealStatus> = {
  in_progress: "in_progress",
  completed: "completed",
  cancelled: "cancelled",
};

const statusConfig: Record<DealStatus, { variant: "completed" | "pending" | "cancelled"; label: string }> = {
  in_progress: { variant: "pending", label: "En progreso" },
  completed: { variant: "completed", label: "Completado" },
  cancelled: { variant: "cancelled", label: "Cancelado" },
};

// Inline mock messages per deal (provider perspective)
const mockMessages: Record<string, { id: string; author: "client" | "provider" | "system"; authorName: string; text: string; timestamp: string }[]> = {
  "deal-001": [
    { id: "m1", author: "system", authorName: "Sistema", text: "Trato iniciado. Puedes comenzar a trabajar.", timestamp: "2026-02-20T10:00:00" },
    { id: "m2", author: "provider", authorName: "Tu", text: "Hola Carlos! He recibido tu brief. Empezare con los conceptos esta semana.", timestamp: "2026-02-20T11:30:00" },
    { id: "m3", author: "client", authorName: "Carlos Ruiz", text: "Perfecto. El logo debe transmitir tecnologia e innovacion.", timestamp: "2026-02-20T12:00:00" },
    { id: "m4", author: "provider", authorName: "Tu", text: "Anotado. Esta semana te envio los primeros 3 conceptos.", timestamp: "2026-02-21T09:15:00" },
  ],
  "deal-002": [
    { id: "m1", author: "system", authorName: "Sistema", text: "Trato iniciado.", timestamp: "2026-02-18T14:00:00" },
    { id: "m2", author: "provider", authorName: "Tu", text: "Hola Ana! He revisado tu sitio actual y tengo ideas para modernizarlo.", timestamp: "2026-02-19T10:00:00" },
    { id: "m3", author: "client", authorName: "Ana Torres", text: "Excelente! Cuando podrias tener un primer borrador?", timestamp: "2026-02-20T09:00:00" },
  ],
};

// Inline mock deliverables
const mockDeliverables: Record<string, { id: string; name: string; type: "file" | "link"; url: string; uploadedAt: string }[]> = {
  "deal-002": [
    { id: "d1", name: "Sitio web rediseñado (preview)", type: "link", url: "https://preview.webdev.com/v2", uploadedAt: "2026-03-01T16:00:00" },
    { id: "d2", name: "Archivos fuente (Figma + código)", type: "file", url: "/deliverables/v2.zip", uploadedAt: "2026-03-01T16:00:00" },
  ],
};

type Tab = "mensajes" | "entregables";

export default function ProviderDealDetailPage() {
  const params = useParams();
  const deal = mockDeals.find((d) => d.id === params.id);
  const [activeTab, setActiveTab] = useState<Tab>("mensajes");
  const [newMessage, setNewMessage] = useState("");
  const [currentStatus, setCurrentStatus] = useState<DealStatus>(deal?.status ?? "in_progress");

  if (!deal) {
    return (
      <EmptyState
        icon={Handshake}
        title="Trato no encontrado"
        description="Este trato no existe o fue eliminado."
        action={
          <Link href="/dashboard/tratos">
            <Button variant="secondary">Volver a tratos</Button>
          </Link>
        }
      />
    );
  }

  const messages = mockMessages[deal.id] ?? [];
  const deliverables = mockDeliverables[deal.id] ?? [];
  const cfg = statusConfig[currentStatus];
  const timelineStatus = statusMap[currentStatus];
  const canMarkDelivered = currentStatus === "in_progress";

  const tabs: { id: Tab; label: string; icon: typeof MessageSquare }[] = [
    { id: "mensajes", label: "Mensajes", icon: MessageSquare },
    { id: "entregables", label: "Entregables", icon: FileText },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <Animate animation="fadeUp" duration={500}>
        <div className="flex items-start gap-3">
          <Link href="/dashboard/tratos">
            <Button variant="ghost" className="p-2 rounded-lg mt-1">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-deep text-xl font-bold truncate">{deal.serviceTitle}</h1>
              <Badge variant={cfg.variant}>{cfg.label}</Badge>
            </div>
            <p className="text-stone text-sm mt-0.5">
              Cliente: {deal.clientName} · Plazo: {formatDate(deal.dueDate)}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-deep font-bold text-xl">{formatCurrency(deal.amount)}</p>
            <p className="text-stone text-xs">por cobrar</p>
          </div>
        </div>
      </Animate>

      {/* Timeline */}
      <Animate animation="fadeUp" delay={100}>
        <DashboardCard>
          <div className="overflow-x-auto pb-1">
            <DealTimeline status={timelineStatus} />
          </div>
        </DashboardCard>
      </Animate>

      {/* Mark as delivered CTA */}
      {canMarkDelivered && (
        <Animate animation="fadeUp" delay={150}>
          <div className="bg-warmth/8 border border-warmth/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1">
              <p className="text-deep font-semibold text-sm">Sube tus entregables y marca como entregado</p>
              <p className="text-stone text-xs mt-0.5">
                El cliente recibira una notificacion y podra aprobar o pedir revision.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="secondary" className="text-xs px-3 py-2 rounded-lg">
                <Upload className="w-3.5 h-3.5 mr-1.5" />
                Subir archivo
              </Button>
              <Button
                className="text-xs px-4 py-2 rounded-lg"
                onClick={() => setCurrentStatus("completed")}
              >
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                Marcar como entregado
              </Button>
            </div>
          </div>
        </Animate>
      )}

      {/* Tabs */}
      <Animate animation="fadeUp" delay={200}>
        <DashboardCard padding={false} className="overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-sage/20">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`
                    flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors cursor-pointer
                    ${activeTab === t.id
                      ? "text-warmth border-b-2 border-warmth"
                      : "text-stone hover:text-dusk"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Messages */}
          {activeTab === "mensajes" && (
            <div className="p-5">
              <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-stone text-sm text-center py-8">Sin mensajes aun.</p>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.author === "provider";
                    const isSystem = msg.author === "system";
                    if (isSystem) {
                      return (
                        <div key={msg.id} className="text-center">
                          <span className="text-xs text-stone bg-sage/10 px-3 py-1 rounded-full">
                            {msg.text}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div key={msg.id} className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                        {!isMe && (
                          <div className="w-7 h-7 rounded-full bg-sage/20 flex items-center justify-center text-[10px] font-semibold text-dusk flex-shrink-0">
                            {msg.authorName.split(" ").map((n) => n[0]).join("")}
                          </div>
                        )}
                        <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${isMe ? "bg-warmth/10 text-deep" : "bg-sage/10 text-deep"}`}>
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-[11px] text-stone mt-1">{timeAgo(msg.timestamp)}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              {currentStatus !== "completed" && currentStatus !== "cancelled" && (
                <div className="flex gap-2 border-t border-sage/20 pt-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-white border border-sage rounded-xl px-4 py-2.5 text-sm text-deep placeholder:text-stone outline-none focus:ring-2 focus:ring-calm/30 focus:border-sky transition-all"
                  />
                  <Button className="px-4 rounded-xl">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Deliverables */}
          {activeTab === "entregables" && (
            <div className="p-5">
              {currentStatus === "in_progress" && (
                <div className="mb-4">
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-sage/40 rounded-xl cursor-pointer hover:bg-calm/5 transition-colors">
                    <Upload className="w-6 h-6 text-stone mb-2" />
                    <p className="text-sm text-stone">Haz click para subir un archivo</p>
                    <p className="text-xs text-stone/70 mt-0.5">PDF, ZIP, imágenes o cualquier formato</p>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              )}
              {deliverables.length === 0 ? (
                <p className="text-stone text-sm text-center py-8">
                  Aun no has subido entregables para este trato.
                </p>
              ) : (
                <div className="space-y-2">
                  {deliverables.map((d) => (
                    <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#F5F8FA] hover:bg-calm/10 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-warmth/10 flex items-center justify-center flex-shrink-0">
                        {d.type === "file" ? (
                          <FileText className="w-4 h-4 text-warmth" />
                        ) : (
                          <Link2 className="w-4 h-4 text-warmth" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-deep font-medium text-sm">{d.name}</p>
                        <p className="text-stone text-xs">{formatDate(d.uploadedAt)}</p>
                      </div>
                      <a href={d.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" className="p-2 rounded-lg text-warmth">
                          {d.type === "file" ? <Download className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </DashboardCard>
      </Animate>

      {/* Deal summary */}
      <Animate animation="fadeUp" delay={300}>
        <DashboardCard>
          <h3 className="text-deep font-semibold mb-3 text-sm">Resumen del trato</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {[
              { label: "Monto total", value: formatCurrency(deal.amount) },
              { label: "Inicio", value: formatDate(deal.date) },
              { label: "Plazo", value: formatDate(deal.dueDate) },
              { label: "Cliente", value: deal.clientName },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 rounded-xl bg-[#F5F8FA]">
                <p className="text-stone text-xs mb-1">{label}</p>
                <p className="text-deep font-medium text-sm">{value}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </Animate>
    </div>
  );
}
