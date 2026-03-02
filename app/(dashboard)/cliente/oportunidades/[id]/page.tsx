"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/dashboard/empty-state";
import { OpportunityDetail } from "@/components/dashboard/opportunity-detail";
import {
  mockPublishedOpportunities,
  mockOpportunityProposals,
} from "@/lib/mock/client-data";

export default function ClienteOportunidadDetailPage() {
  const params = useParams();
  const opportunity = mockPublishedOpportunities.find((o) => o.id === params.id);
  const proposals = mockOpportunityProposals.filter(
    (p) => p.opportunityId === params.id
  );

  if (!opportunity) {
    return (
      <EmptyState
        icon={Briefcase}
        title="Oportunidad no encontrada"
        description="Esta oportunidad no existe o fue eliminada."
        action={
          <Link href="/cliente/oportunidades">
            <Button variant="secondary">Volver a oportunidades</Button>
          </Link>
        }
      />
    );
  }

  return (
    <OpportunityDetail
      opportunity={opportunity}
      proposals={proposals}
      role="client"
      backHref="/cliente/oportunidades"
    />
  );
}
