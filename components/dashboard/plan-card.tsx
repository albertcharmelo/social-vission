import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/lib/mock/dashboard-data";

interface PlanCardProps {
  plan: Plan;
  isCurrent: boolean;
}

export function PlanCard({ plan, isCurrent }: PlanCardProps) {
  return (
    <div
      className={`
        rounded-2xl p-6 border-2 transition-shadow
        ${plan.highlighted
          ? "border-warmth bg-white shadow-[var(--shadow-md)]"
          : "border-sage/30 bg-white"
        }
      `}
    >
      {plan.highlighted && (
        <span className="inline-block bg-warmth/10 text-warmth text-xs font-semibold px-3 py-1 rounded-full mb-3">
          Recomendado
        </span>
      )}
      <h3 className="text-deep text-xl font-bold">{plan.name}</h3>
      <div className="mt-2 mb-3">
        {plan.price === 0 ? (
          <span className="text-deep text-3xl font-bold">Gratis</span>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-deep text-3xl font-bold">${plan.price}</span>
            <span className="text-stone text-sm">/mes</span>
          </div>
        )}
      </div>
      <p className="text-stone text-sm mb-5">{plan.description}</p>
      <ul className="space-y-2.5 mb-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-dusk">
            <Check className="w-4 h-4 text-meadow flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        variant={isCurrent ? "secondary" : "primary"}
        fullWidth
        disabled={isCurrent}
      >
        {isCurrent ? "Plan actual" : "Mejorar a Pro"}
      </Button>
    </div>
  );
}
