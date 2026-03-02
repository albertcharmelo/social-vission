"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { mockCauses } from "@/lib/mock/dashboard-data";

const categories = ["Diseno", "Desarrollo", "Marketing", "Consultoria", "Video", "Otro"];

export default function NuevoServicioPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    causeId: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <PageHeader
          title="Nuevo servicio"
          subtitle="Crea un servicio y vinculalo a una causa social"
          action={
            <Link href="/dashboard/servicios">
              <Button variant="secondary">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Volver
              </Button>
            </Link>
          }
        />
      </Animate>

      <Animate animation="fadeUp" delay={100}>
        <DashboardCard>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Titulo del servicio"
              placeholder="Ej: Diseno de marca completo"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            <Input
              as="textarea"
              label="Descripcion"
              placeholder="Describe tu servicio en detalle..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Precio (USD)"
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
              <div>
                <label className="block text-dusk text-sm font-medium mb-1.5">
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="bg-white border border-sage text-deep text-[15px] rounded-[var(--radius-sm)] px-4 py-2.5 w-full outline-none focus:ring-2 focus:ring-calm/30 focus:border-sky transition-all"
                >
                  <option value="">Selecciona una categoria</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-dusk text-sm font-medium mb-1.5">
                Causa social vinculada
              </label>
              <select
                value={formData.causeId}
                onChange={(e) => handleChange("causeId", e.target.value)}
                className="bg-white border border-sage text-deep text-[15px] rounded-[var(--radius-sm)] px-4 py-2.5 w-full outline-none focus:ring-2 focus:ring-calm/30 focus:border-sky transition-all"
              >
                <option value="">Selecciona una causa</option>
                {mockCauses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <p className="text-stone text-xs mt-1">
                El 10% de cada venta se donara a esta causa.
              </p>
            </div>

            {/* Image upload placeholder */}
            <div>
              <label className="block text-dusk text-sm font-medium mb-1.5">
                Imagen del servicio
              </label>
              <div className="border-2 border-dashed border-sage/40 rounded-xl p-8 text-center hover:border-sky/40 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-stone mx-auto mb-2" />
                <p className="text-dusk text-sm font-medium">
                  Arrastra una imagen o haz clic para subir
                </p>
                <p className="text-stone text-xs mt-1">PNG, JPG hasta 5MB</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" fullWidth>
                Publicar servicio
              </Button>
              <Button type="button" variant="secondary" fullWidth>
                Guardar borrador
              </Button>
            </div>
          </form>
        </DashboardCard>
      </Animate>
    </div>
  );
}
