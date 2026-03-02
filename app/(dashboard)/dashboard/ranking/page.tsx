"use client";

import { Trophy, TrendingUp, Lightbulb } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { RankingPosition } from "@/components/dashboard/ranking-position";
import {
  mockProvider,
  mockRankingFactors,
  mockLeaderboard,
} from "@/lib/mock/dashboard-data";

const tips = [
  "Completa tu perfil al 100% para subir posiciones.",
  "Responde rapido a los mensajes de clientes.",
  "Vincula mas servicios a causas sociales.",
  "Solicita resenas a clientes satisfechos.",
];

export default function RankingPage() {
  const { rankPosition, rankTotal } = mockProvider.stats;

  return (
    <div className="space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader title="Ranking" subtitle="Tu posicion entre los proveedores" />
      </Animate>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Position */}
        <Animate animation="fadeUp" delay={100}>
          <DashboardCard className="flex flex-col items-center py-10">
            <RankingPosition
              position={rankPosition}
              total={rankTotal}
              trend={3}
            />
          </DashboardCard>
        </Animate>

        {/* Factors */}
        <Animate animation="fadeUp" delay={200}>
          <DashboardCard>
            <h3 className="text-deep font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-warmth" />
              Factores del ranking
            </h3>
            <div className="space-y-3">
              {mockRankingFactors.map((f) => (
                <div key={f.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dusk">{f.label}</span>
                    <span className="text-deep font-semibold">{f.score}%</span>
                  </div>
                  <div className="h-2 bg-sage/15 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-warmth to-terra transition-all duration-700"
                      style={{ width: `${f.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </Animate>
      </div>

      {/* Tips */}
      <Animate animation="fadeUp" delay={300}>
        <DashboardCard>
          <h3 className="text-deep font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-honey" />
            Consejos para mejorar
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-honey/5">
                <span className="text-honey text-sm font-bold mt-0.5">{i + 1}.</span>
                <p className="text-dusk text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </Animate>

      {/* Leaderboard */}
      <Animate animation="fadeUp" delay={400}>
        <DashboardCard>
          <h3 className="text-deep font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-warmth" />
            Top 5
          </h3>
          <div className="space-y-2">
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.position}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  entry.position <= 3 ? "bg-warmth/5" : ""
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    entry.position === 1
                      ? "bg-honey/30 text-terra"
                      : entry.position === 2
                      ? "bg-sage/30 text-dusk"
                      : entry.position === 3
                      ? "bg-petal/30 text-terra"
                      : "bg-sage/10 text-stone"
                  }`}
                >
                  {entry.position}
                </span>
                <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center text-xs font-semibold text-dusk">
                  {entry.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="flex-1 text-dusk font-medium text-sm">{entry.name}</span>
                <span className="text-deep font-bold text-sm">{entry.score}</span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </Animate>
    </div>
  );
}
