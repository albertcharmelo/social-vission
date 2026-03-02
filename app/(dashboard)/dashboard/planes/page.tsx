"use client";

import { Check, X } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { PlanCard } from "@/components/dashboard/plan-card";
import { mockProvider, mockPlans, mockPlanComparison } from "@/lib/mock/dashboard-data";

export default function PlanesPage() {
  const currentPlan = mockProvider.plan;

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader
          title="Planes"
          subtitle="Elige el plan que mejor se adapte a ti"
          action={
            <Badge variant="pro">{currentPlan === "pro" ? "PRO" : "FREE"}</Badge>
          }
        />
      </Animate>

      {/* Plan cards */}
      <Animate animation="staggerUp" staggerDelay={120}>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
          {mockPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrent={plan.id === currentPlan}
            />
          ))}
        </div>
      </Animate>

      {/* Comparison table */}
      <Animate animation="fadeUp" delay={300}>
        <DashboardCard>
          <h3 className="text-deep font-semibold mb-4">Comparacion detallada</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sage/20">
                  <th className="text-left text-stone font-medium py-3 px-4">Caracteristica</th>
                  <th className="text-center text-stone font-medium py-3 px-4 w-32">Free</th>
                  <th className="text-center text-stone font-medium py-3 px-4 w-32">Pro</th>
                </tr>
              </thead>
              <tbody>
                {mockPlanComparison.map((feature) => (
                  <tr key={feature.name} className="border-b border-sage/10">
                    <td className="py-3 px-4 text-dusk">{feature.name}</td>
                    <td className="py-3 px-4 text-center">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <Check className="w-4 h-4 text-meadow mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-sage mx-auto" />
                        )
                      ) : (
                        <span className="text-dusk">{feature.free}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <Check className="w-4 h-4 text-meadow mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-sage mx-auto" />
                        )
                      ) : (
                        <span className="text-deep font-medium">{feature.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </Animate>
    </div>
  );
}
