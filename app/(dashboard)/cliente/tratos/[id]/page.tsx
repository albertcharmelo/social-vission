"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  Download,
  Link2,
  CheckCircle,
  RotateCcw,
  Receipt,
  Send,
  Handshake,
} from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DealTimeline } from "@/components/dashboard/deal-timeline";
import { InvoiceView } from "@/components/dashboard/invoice-view";
import { EmptyState } from "@/components/dashboard/empty-state";
import {
  mockClientDeals,
  clientDealStatusConfig,
} from "@/lib/mock/client-data";
import { formatCurrency, formatDate, timeAgo } from "@/lib/mock/dashboard-data";

type Tab = "mensajes" | "entregables" | "factura";

export default function ClienteDealDetailPage() {
  const params = useParams();
  const deal = mockClientDeals.find((d) => d.id === params.id);
  const [activeTab, setActiveTab] = useState<Tab>("mensajes");
  const [showInvoice, setShowInvoice] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  if (!deal) {
    return (
      <EmptyState
        icon={Handshake}
        title="Trato no encontrado"
        description="Este trato no existe o fue eliminado."
        action={
          <Link href="/cliente/tratos">
            <Button variant="secondary">Volver a tratos</Button>
          </Link>
        }
      />
    );
  }

  const cfg = clientDealStatusConfig[deal.status];
  const canApprove = deal.status === "delivered";
  const canRequestRevision = deal.status === "delivered" && deal.revisionsUsed < deal.revisionsAllowed;

  const tabs: { id: Tab; label: string; icon: typeof MessageSquare }[] = [
    { id: "mensajes", label: "Mensajes", icon: MessageSquare },
    { id: "entregables", label: "Entregables", icon: FileText },
    { id: "factura", label: "Factura", icon: Receipt },
  ];

  return (
    <>
      {showInvoice && <InvoiceView deal={deal} onClose={() => setShowInvoice(false)} />}
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <Animate animation="fadeUp" duration={500}>
          <div className="flex items-start gap-3">
            <Link href="/cliente/tratos">
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
                Proveedor: {deal.providerName} · {deal.invoiceNumber}
              </p>
            </div>
            <Button variant="secondary" className="text-xs px-3 py-2 rounded-lg flex-shrink-0" onClick={() => setShowInvoice(true)}>
              <Receipt className="w-3.5 h-3.5 mr-1.5" />
              Factura
            </Button>
          </div>
        </Animate>

        {/* Timeline */}
        <Animate animation="fadeUp" delay={100}>
          <DashboardCard>
            <div className="overflow-x-auto pb-1">
              <DealTimeline status={deal.status} />
            </div>
          </DashboardCard>
        </Animate>

        {/* Actions for delivered deals */}
        {canApprove && (
          <Animate animation="fadeUp" delay={150}>
            <div className="bg-calm/10 border border-sky/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1">
                <p className="text-deep font-semibold text-sm">El proveedor entrego el trabajo</p>
                <p className="text-stone text-xs mt-0.5">Revisa los entregables y aprueba o solicita una revision.</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {canRequestRevision && (
                  <Button variant="secondary" className="text-xs px-3 py-2 rounded-lg">
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    Pedir revision
                  </Button>
                )}
                <Button className="text-xs px-4 py-2 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                  Aprobar y completar
                </Button>
              </div>
            </div>
          </Animate>
        )}

        {/* Tabs + content */}
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
                        ? "text-sky border-b-2 border-sky"
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

            {/* Messages tab */}
            {activeTab === "mensajes" && (
              <div className="p-5">
                <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                  {deal.messages.map((msg) => {
                    const isMe = msg.author === "client";
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
                        <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${isMe ? "bg-sky/10 text-deep" : "bg-sage/10 text-deep"}`}>
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-[11px] text-stone mt-1">{timeAgo(msg.timestamp)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {deal.status !== "completed" && deal.status !== "cancelled" && (
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

            {/* Deliverables tab */}
            {activeTab === "entregables" && (
              <div className="p-5">
                {deal.deliverables.length === 0 ? (
                  <p className="text-stone text-sm text-center py-8">
                    Aun no hay entregables. El proveedor los subira al completar el trabajo.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {deal.deliverables.map((d) => (
                      <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#F5F8FA] hover:bg-calm/10 transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-sky/10 flex items-center justify-center flex-shrink-0">
                          {d.type === "file" ? (
                            <FileText className="w-4 h-4 text-sky" />
                          ) : (
                            <Link2 className="w-4 h-4 text-sky" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-deep font-medium text-sm">{d.name}</p>
                          <p className="text-stone text-xs">{formatDate(d.uploadedAt)}</p>
                        </div>
                        <a href={d.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" className="p-2 rounded-lg text-sky">
                            {d.type === "file" ? <Download className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Invoice tab */}
            {activeTab === "factura" && (
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Numero de factura", value: deal.invoiceNumber },
                    { label: "Fecha de pago", value: formatDate(deal.paymentDate) },
                    { label: "Metodo de pago", value: deal.paymentMethod },
                    { label: "Servicio", value: deal.serviceTitle },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3 rounded-xl bg-[#F5F8FA]">
                      <p className="text-stone text-xs mb-1">{label}</p>
                      <p className="text-deep font-medium">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-sage/20 overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 border-b border-sage/10">
                    <span className="text-dusk text-sm">{deal.serviceTitle}</span>
                    <span className="text-deep font-semibold">{formatCurrency(deal.amount)}</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3 border-b border-sage/10">
                    <span className="text-stone text-sm">Comision plataforma</span>
                    <span className="text-stone text-sm">-{formatCurrency(deal.platformFee)}</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3 bg-sprout/5 border-b border-sage/10">
                    <span className="text-meadow text-sm font-medium">Impacto social ({deal.causeName})</span>
                    <span className="text-meadow font-semibold">{formatCurrency(deal.impactAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-deep font-bold">Total pagado</span>
                    <span className="text-deep font-bold text-lg">{formatCurrency(deal.amount)}</span>
                  </div>
                </div>
                <Button variant="secondary" className="w-full" onClick={() => setShowInvoice(true)}>
                  <Receipt className="w-4 h-4 mr-2" />
                  Ver factura completa
                </Button>
              </div>
            )}
          </DashboardCard>
        </Animate>

        {/* Deal info sidebar */}
        <Animate animation="fadeUp" delay={300}>
          <DashboardCard>
            <h3 className="text-deep font-semibold mb-3 text-sm">Brief del proyecto</h3>
            <p className="text-dusk text-sm leading-relaxed">{deal.brief}</p>
            <div className="flex gap-3 mt-4 text-xs text-stone flex-wrap">
              <span>Inicio: {formatDate(deal.startDate)}</span>
              <span>Plazo: {formatDate(deal.dueDate)}</span>
              <span>Revisiones: {deal.revisionsUsed}/{deal.revisionsAllowed}</span>
            </div>
          </DashboardCard>
        </Animate>
      </div>
    </>
  );
}
