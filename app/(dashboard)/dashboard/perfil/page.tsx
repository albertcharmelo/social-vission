"use client";

import { useState } from "react";
import { User, Briefcase, Bell, Shield } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { mockProvider } from "@/lib/mock/dashboard-data";

export default function PerfilPage() {
  const p = mockProvider;

  const [notifications, setNotifications] = useState({
    deals: true,
    reviews: true,
    opportunities: true,
    newsletter: false,
  });

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader title="Perfil" subtitle="Configura tu cuenta y preferencias" />
      </Animate>

      {/* Profile completion */}
      <Animate animation="fadeUp" delay={100}>
        <DashboardCard className="bg-gradient-to-r from-white to-warmth/5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-stone/20 flex items-center justify-center text-deep text-xl font-bold flex-shrink-0">
              MG
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-deep font-bold text-lg">{p.name}</h2>
                <Badge variant="pro">PRO</Badge>
              </div>
              <p className="text-stone text-sm">{p.email}</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-dusk">Perfil completado</span>
                  <span className="text-deep font-semibold">{p.completionPercent}%</span>
                </div>
                <div className="h-2 bg-sage/20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-warmth to-terra transition-all"
                    style={{ width: `${p.completionPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </Animate>

      {/* Personal info */}
      <Animate animation="fadeUp" delay={200}>
        <DashboardCard>
          <h3 className="text-deep font-semibold mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-warmth" />
            Datos personales
          </h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Nombre" defaultValue={p.name.split(" ")[0]} />
              <Input label="Apellido" defaultValue={p.name.split(" ")[1]} />
            </div>
            <Input label="Email" type="email" defaultValue={p.email} icon="mail" />
            <Input
              as="textarea"
              label="Bio"
              rows={3}
              defaultValue={p.bio}
            />
            <Button>Guardar cambios</Button>
          </form>
        </DashboardCard>
      </Animate>

      {/* Professional info */}
      <Animate animation="fadeUp" delay={300}>
        <DashboardCard>
          <h3 className="text-deep font-semibold mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-warmth" />
            Datos profesionales
          </h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="Especialidad principal" defaultValue="Branding e Identidad Visual" />
            <div>
              <label className="block text-dusk text-sm font-medium mb-1.5">
                Habilidades
              </label>
              <div className="flex flex-wrap gap-2">
                {p.specialties.map((s) => (
                  <Badge key={s} variant="category">{s}</Badge>
                ))}
              </div>
            </div>
            <Input label="Sitio web" placeholder="https://..." />
            <Button>Guardar cambios</Button>
          </form>
        </DashboardCard>
      </Animate>

      {/* Notification preferences */}
      <Animate animation="fadeUp" delay={400}>
        <DashboardCard>
          <h3 className="text-deep font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-warmth" />
            Notificaciones
          </h3>
          <div className="space-y-3">
            {[
              { key: "deals" as const, label: "Nuevos tratos y actualizaciones" },
              { key: "reviews" as const, label: "Nuevas resenas" },
              { key: "opportunities" as const, label: "Oportunidades relevantes" },
              { key: "newsletter" as const, label: "Newsletter y novedades" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between py-2">
                <span className="text-dusk text-sm">{label}</span>
                <button
                  onClick={() => toggleNotif(key)}
                  className={`
                    w-11 h-6 rounded-full transition-colors cursor-pointer flex items-center px-0.5
                    ${notifications[key] ? "bg-warmth justify-end" : "bg-sage/40 justify-start"}
                  `}
                >
                  <span className="block w-5 h-5 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            ))}
          </div>
        </DashboardCard>
      </Animate>

      {/* Security */}
      <Animate animation="fadeUp" delay={500}>
        <DashboardCard>
          <h3 className="text-deep font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-warmth" />
            Seguridad
          </h3>
          <div className="space-y-3">
            <Button variant="secondary">Cambiar contrasena</Button>
          </div>
        </DashboardCard>
      </Animate>
    </div>
  );
}
