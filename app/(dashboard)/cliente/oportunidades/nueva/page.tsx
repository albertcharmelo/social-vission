"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, Plus, X } from "lucide-react";
import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard/dashboard-card";

const categories = [
  "Diseno",
  "Desarrollo",
  "Marketing",
  "Consultoria",
  "Video",
  "Fotografia",
  "Redaccion",
  "Otro",
];

export default function ClienteNuevaOportunidadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newReq, setNewReq] = useState("");

  const addRequirement = () => {
    const trimmed = newReq.trim();
    if (trimmed && !requirements.includes(trimmed)) {
      setRequirements((prev) => [...prev, trimmed]);
      setNewReq("");
    }
  };

  const removeRequirement = (req: string) => {
    setRequirements((prev) => prev.filter((r) => r !== req));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addRequirement();
    }
  };

  const isValid = title.trim() && description.trim() && budget && deadline && category;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Animate animation="fadeUp" duration={500}>
        <div className="flex items-center gap-3">
          <Link href="/cliente/oportunidades">
            <Button variant="ghost" className="p-2 rounded-lg">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-deep text-xl font-bold">Publicar oportunidad</h1>
            <p className="text-stone text-sm mt-0.5">Describe el servicio que necesitas</p>
          </div>
        </div>
      </Animate>

      <Animate animation="fadeUp" delay={100}>
        <DashboardCard>
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-dusk text-sm font-medium mb-1.5">
                Titulo de la oportunidad <span className="text-blush">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Logo para startup de tecnologia"
                className="w-full bg-white border border-sage rounded-xl px-4 py-2.5 text-sm text-deep placeholder:text-stone outline-none focus:ring-2 focus:ring-calm/30 focus:border-sky transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-dusk text-sm font-medium mb-1.5">
                Descripcion <span className="text-blush">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe en detalle el servicio que necesitas, el contexto y los resultados esperados..."
                rows={4}
                className="w-full bg-white border border-sage rounded-xl px-4 py-2.5 text-sm text-deep placeholder:text-stone outline-none focus:ring-2 focus:ring-calm/30 focus:border-sky transition-all resize-none"
              />
            </div>

            {/* Budget + Deadline */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-dusk text-sm font-medium mb-1.5">
                  Presupuesto (USD) <span className="text-blush">*</span>
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="300"
                  min={1}
                  className="w-full bg-white border border-sage rounded-xl px-4 py-2.5 text-sm text-deep placeholder:text-stone outline-none focus:ring-2 focus:ring-calm/30 focus:border-sky transition-all"
                />
              </div>
              <div>
                <label className="block text-dusk text-sm font-medium mb-1.5">
                  Fecha limite <span className="text-blush">*</span>
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-white border border-sage rounded-xl px-4 py-2.5 text-sm text-deep outline-none focus:ring-2 focus:ring-calm/30 focus:border-sky transition-all"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-dusk text-sm font-medium mb-1.5">
                Categoria <span className="text-blush">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border
                      ${category === cat
                        ? "border-sky text-sky bg-calm/10"
                        : "border-sage/40 text-dusk hover:border-sky/40 hover:bg-calm/5"
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-dusk text-sm font-medium mb-1.5">
                Requisitos (opcional)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newReq}
                  onChange={(e) => setNewReq(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ej: Entrega en formato vectorial"
                  className="flex-1 bg-white border border-sage rounded-xl px-4 py-2.5 text-sm text-deep placeholder:text-stone outline-none focus:ring-2 focus:ring-calm/30 focus:border-sky transition-all"
                />
                <Button
                  variant="secondary"
                  className="px-3 rounded-xl"
                  onClick={addRequirement}
                  disabled={!newReq.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {requirements.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {requirements.map((req) => (
                    <span
                      key={req}
                      className="flex items-center gap-1.5 bg-calm/15 text-sky text-sm px-3 py-1.5 rounded-full"
                    >
                      {req}
                      <button
                        onClick={() => removeRequirement(req)}
                        className="text-sky/60 hover:text-sky transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DashboardCard>
      </Animate>

      {/* Info notice */}
      <Animate animation="fadeUp" delay={150}>
        <div className="bg-calm/10 border border-sky/20 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Briefcase className="w-4 h-4 text-sky mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-deep text-sm font-medium">Como funciona</p>
              <p className="text-stone text-xs mt-0.5">
                Los proveedores verificados recibiran tu solicitud y podran enviarte propuestas con su precio y tiempo de entrega. Podras revisar cada propuesta y elegir la que mas te convenga.
              </p>
            </div>
          </div>
        </div>
      </Animate>

      {/* Actions */}
      <Animate animation="fadeUp" delay={200}>
        <div className="flex gap-3 justify-end">
          <Link href="/cliente/oportunidades">
            <Button variant="secondary">Cancelar</Button>
          </Link>
          <Button disabled={!isValid}>
            <Briefcase className="w-4 h-4 mr-1.5" />
            Publicar oportunidad
          </Button>
        </div>
      </Animate>
    </div>
  );
}
