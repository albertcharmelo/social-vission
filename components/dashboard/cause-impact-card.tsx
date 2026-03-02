import { Heart } from "lucide-react";
import { DashboardCard } from "./dashboard-card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/mock/dashboard-data";

interface CauseImpactCardProps {
  name: string;
  description: string;
  category: string;
  totalRaised: number;
  goal: number;
  yourContribution: number;
  servicesLinked: number;
}

export function CauseImpactCard({
  name,
  description,
  category,
  totalRaised,
  goal,
  yourContribution,
  servicesLinked,
}: CauseImpactCardProps) {
  const percent = Math.min((totalRaised / goal) * 100, 100);

  return (
    <DashboardCard>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-lg bg-sprout/20 flex items-center justify-center">
          <Heart className="w-4 h-4 text-meadow" />
        </div>
        <div className="flex-1">
          <h3 className="text-deep font-semibold text-sm">{name}</h3>
          <Badge variant="category">{category}</Badge>
        </div>
      </div>
      <p className="text-stone text-sm mb-4">{description}</p>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="h-2 bg-sage/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sprout to-meadow transition-all duration-1000"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1.5">
          <span className="text-meadow font-semibold">{formatCurrency(totalRaised)}</span>
          <span className="text-stone">Meta: {formatCurrency(goal)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-sage/20">
        <div>
          <p className="text-xs text-stone">Tu contribucion</p>
          <p className="text-deep font-bold">{formatCurrency(yourContribution)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-stone">Servicios vinculados</p>
          <p className="text-deep font-bold">{servicesLinked}</p>
        </div>
      </div>
    </DashboardCard>
  );
}
