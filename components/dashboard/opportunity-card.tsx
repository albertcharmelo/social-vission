import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "./dashboard-card";
import { formatCurrency, formatDate } from "@/lib/mock/dashboard-data";

interface OpportunityCardProps {
  title: string;
  description: string;
  budget: number;
  deadline: string;
  category: string;
  clientName: string;
  proposals: number;
  applied?: boolean;
}

export function OpportunityCard({
  title,
  description,
  budget,
  deadline,
  category,
  clientName,
  proposals,
  applied,
}: OpportunityCardProps) {
  return (
    <DashboardCard>
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="category">{category}</Badge>
        {applied && <Badge variant="pending">Aplicada</Badge>}
      </div>
      <h3 className="text-deep font-semibold mb-1">{title}</h3>
      <p className="text-stone text-sm mb-3 line-clamp-2">{description}</p>
      <p className="text-xs text-stone mb-3">{clientName}</p>
      <div className="flex items-center gap-4 text-xs text-stone mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(deadline)}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {proposals} propuestas
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-deep font-bold text-lg">{formatCurrency(budget)}</span>
        <Button variant={applied ? "secondary" : "primary"} disabled={applied}>
          {applied ? "Aplicada" : "Aplicar"}
        </Button>
      </div>
    </DashboardCard>
  );
}
