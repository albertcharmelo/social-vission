import { Check, Clock, Package, Star, XCircle } from "lucide-react";
import type { ClientDealStatus } from "@/lib/mock/client-data";
import { dealStatusSteps } from "@/lib/mock/client-data";

interface DealTimelineProps {
  status: ClientDealStatus;
}

const stepIcons: Partial<Record<ClientDealStatus, typeof Clock>> = {
  paid: Clock,
  in_progress: Package,
  delivered: Package,
  completed: Star,
};

const stepLabels: Partial<Record<ClientDealStatus, string>> = {
  paid: "Pago confirmado",
  in_progress: "En progreso",
  delivered: "Entregado",
  completed: "Completado",
};

export function DealTimeline({ status }: DealTimelineProps) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blush/10">
        <XCircle className="w-4 h-4 text-blush" />
        <span className="text-sm text-dusk font-medium">Trato cancelado</span>
      </div>
    );
  }

  const currentIndex = dealStatusSteps.indexOf(status);

  return (
    <div className="flex items-center gap-0">
      {dealStatusSteps.map((step, i) => {
        const isDone = i < currentIndex;
        const isCurrent = i === currentIndex;
        const Icon = stepIcons[step] ?? Clock;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${isDone ? "bg-sky text-white" : isCurrent ? "bg-warmth text-white" : "bg-sage/20 text-stone"}
                `}
              >
                {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`
                  text-[10px] font-medium mt-1 text-center max-w-[64px] leading-tight
                  ${isCurrent ? "text-warmth" : isDone ? "text-sky" : "text-stone"}
                `}
              >
                {stepLabels[step]}
              </span>
            </div>
            {i < dealStatusSteps.length - 1 && (
              <div
                className={`
                  h-0.5 w-12 sm:w-20 mx-1 mb-4
                  ${i < currentIndex ? "bg-sky" : "bg-sage/20"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
