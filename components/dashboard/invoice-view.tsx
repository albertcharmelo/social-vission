"use client";

import { Download, Printer, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClientDeal } from "@/lib/mock/client-data";
import { formatCurrency, formatDate } from "@/lib/mock/dashboard-data";

interface InvoiceViewProps {
  deal: ClientDeal;
  onClose?: () => void;
}

export function InvoiceView({ deal, onClose }: InvoiceViewProps) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-[var(--shadow-lg)] w-full max-w-2xl">
        {/* Invoice header actions */}
        <div className="flex items-center justify-between px-6 pt-5 pb-0">
          <div className="flex gap-2">
            <Button variant="secondary" className="text-xs px-3 py-2 rounded-lg">
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              Imprimir
            </Button>
            <Button variant="secondary" className="text-xs px-3 py-2 rounded-lg">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Descargar PDF
            </Button>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-stone hover:text-deep transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Invoice content */}
        <div className="p-8">
          {/* Brand + invoice title */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-warmth flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-deep font-bold text-lg leading-none">Social Vission</p>
                <p className="text-stone text-xs">Marketplace con impacto social</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-deep font-bold text-2xl">FACTURA</p>
              <p className="text-stone text-sm">{deal.invoiceNumber}</p>
            </div>
          </div>

          {/* Billing info */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-stone text-xs font-semibold uppercase tracking-wide mb-2">Facturar a</p>
              <p className="text-deep font-semibold">Juan Perez</p>
              <p className="text-dusk text-sm">juan@empresa.com</p>
            </div>
            <div className="text-right">
              <p className="text-stone text-xs font-semibold uppercase tracking-wide mb-2">Detalles</p>
              <p className="text-dusk text-sm">
                <span className="text-stone">Fecha:</span> {formatDate(deal.paymentDate)}
              </p>
              <p className="text-dusk text-sm">
                <span className="text-stone">Vence:</span> {formatDate(deal.dueDate)}
              </p>
              <p className="text-dusk text-sm">
                <span className="text-stone">Metodo:</span> {deal.paymentMethod}
              </p>
            </div>
          </div>

          {/* Line items */}
          <div className="rounded-xl overflow-hidden border border-sage/20 mb-6">
            <table className="w-full text-sm">
              <thead className="bg-[#FAFAF9]">
                <tr>
                  <th className="text-left text-stone font-medium py-3 px-4">Descripcion</th>
                  <th className="text-right text-stone font-medium py-3 px-4">Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-sage/10">
                  <td className="py-3.5 px-4">
                    <p className="text-deep font-medium">{deal.serviceTitle}</p>
                    <p className="text-stone text-xs mt-0.5">Proveedor: {deal.providerName}</p>
                  </td>
                  <td className="py-3.5 px-4 text-right text-deep font-medium">
                    {formatCurrency(deal.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone">Subtotal servicio</span>
                <span className="text-dusk">{formatCurrency(deal.amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone">Comision plataforma</span>
                <span className="text-dusk">-{formatCurrency(deal.platformFee)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-sage/20 pt-2">
                <span className="text-stone">Neto al proveedor</span>
                <span className="text-dusk">{formatCurrency(deal.netToProvider)}</span>
              </div>
              <div className="flex justify-between text-sm py-2 px-3 rounded-lg bg-sprout/10">
                <span className="text-meadow font-medium flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" />
                  Impacto social ({deal.causeName})
                </span>
                <span className="text-meadow font-semibold">{formatCurrency(deal.impactAmount)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-sage/30 pt-3">
                <span className="text-deep">Total pagado</span>
                <span className="text-deep">{formatCurrency(deal.amount)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-sage/20 text-center">
            <p className="text-stone text-xs">
              El 10% de esta compra ({formatCurrency(deal.impactAmount)}) fue donado a la causa <strong>{deal.causeName}</strong>
            </p>
            <p className="text-stone text-xs mt-1">
              Gracias por comprar con impacto social — Social Vission
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
