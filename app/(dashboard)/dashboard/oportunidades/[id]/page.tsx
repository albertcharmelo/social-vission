"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/dashboard/empty-state";
import { OpportunityDetail } from "@/components/dashboard/opportunity-detail";
import { mockOpportunities } from "@/lib/mock/dashboard-data";
import type { PublishedOpportunity, OpportunityProposal } from "@/lib/mock/client-data";

// Inline mock proposals for opportunities the provider has applied to
const mockProviderProposals: Record<string, OpportunityProposal[]> = {
  "opp-006": [
    {
      id: "prop-p1",
      opportunityId: "opp-006",
      providerName: "Tu",
      providerRating: 4.8,
      providerPlan: "pro",
      message: "He diseñado newsletters para mas de 20 organizaciones sin fines de lucro. Puedo entregarlo en 5 dias con 2 revisiones incluidas.",
      price: 140,
      deliveryDays: 5,
      submittedAt: "2026-02-18T10:00:00",
    },
  ],
};

export default function ProviderOportunidadDetailPage() {
  const params = useParams();
  const providerOpp = mockOpportunities.find((o) => o.id === params.id);

  if (!providerOpp) {
    return (
      <EmptyState
        icon={Briefcase}
        title="Oportunidad no encontrada"
        description="Esta oportunidad no existe o fue eliminada."
        action={
          <Link href="/dashboard/oportunidades">
            <Button variant="secondary">Volver a oportunidades</Button>
          </Link>
        }
      />
    );
  }

  // Adapt provider Opportunity → PublishedOpportunity shape for the shared component
  const opportunity: PublishedOpportunity = {
    id: providerOpp.id,
    title: providerOpp.title,
    description: providerOpp.description,
    budget: providerOpp.budget,
    deadline: providerOpp.deadline,
    category: providerOpp.category,
    status: "open",
    proposals: providerOpp.proposals,
    createdAt: "2026-02-15",
    requirements: [],
  };

  const proposals = mockProviderProposals[providerOpp.id] ?? [];
  const alreadyApplied = providerOpp.applied === true;

  return (
    <OpportunityDetail
      opportunity={opportunity}
      proposals={proposals}
      role="provider"
      backHref="/dashboard/oportunidades"
      alreadyApplied={alreadyApplied}
    />
  );
}
