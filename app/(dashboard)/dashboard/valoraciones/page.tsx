"use client";

import { Star } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import {
  mockProvider,
  mockReviews,
  formatDate,
} from "@/lib/mock/dashboard-data";

export default function ValoracionesPage() {
  const avg = mockProvider.stats.averageRating;
  const total = mockProvider.stats.totalReviews;

  // Star distribution
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = mockReviews.filter((r) => r.rating === stars).length;
    return { stars, count, percent: total > 0 ? (count / total) * 100 : 0 };
  });

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader title="Valoraciones" subtitle={`${total} resenas en total`} />
      </Animate>

      {/* Rating overview */}
      <div className="grid md:grid-cols-2 gap-4">
        <Animate animation="fadeUp" delay={100}>
          <DashboardCard className="flex flex-col items-center py-8">
            <ProgressRing
              value={avg}
              max={5}
              label={avg.toFixed(1)}
              sublabel={`de ${total} resenas`}
            />
            <div className="flex items-center gap-1 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(avg) ? "text-honey fill-honey" : "text-sage"
                  }`}
                />
              ))}
            </div>
          </DashboardCard>
        </Animate>

        <Animate animation="fadeUp" delay={200}>
          <DashboardCard>
            <h3 className="text-deep font-semibold mb-4">Distribucion</h3>
            <div className="space-y-3">
              {distribution.map((d) => (
                <div key={d.stars} className="flex items-center gap-3">
                  <span className="text-sm text-dusk w-14 flex items-center gap-1">
                    {d.stars} <Star className="w-3.5 h-3.5 text-honey fill-honey" />
                  </span>
                  <div className="flex-1 h-2.5 bg-sage/15 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-honey transition-all duration-700"
                      style={{ width: `${d.percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-stone w-8 text-right">{d.count}</span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </Animate>
      </div>

      {/* Reviews list */}
      <Animate animation="fadeUp" delay={300}>
        <DashboardCard>
          <h3 className="text-deep font-semibold mb-4">Resenas recientes</h3>
          {mockReviews.length === 0 ? (
            <EmptyState
              icon={Star}
              title="Sin resenas"
              description="Aun no tienes resenas. Completa tratos para recibir valoraciones."
            />
          ) : (
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex gap-3 pb-4 border-b border-sage/10 last:border-0 last:pb-0"
                >
                  <div className="w-9 h-9 rounded-full bg-sage/20 flex items-center justify-center text-xs font-semibold text-dusk flex-shrink-0">
                    {review.clientName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-deep font-medium text-sm">{review.clientName}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? "text-honey fill-honey" : "text-sage"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-stone text-xs mb-1">{review.serviceTitle} · {formatDate(review.date)}</p>
                    <p className="text-dusk text-sm">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashboardCard>
      </Animate>
    </div>
  );
}
