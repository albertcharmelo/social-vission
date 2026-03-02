"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categorias = [
  { label: "Diseño", icon: "palette" },
  { label: "Desarrollo", icon: "code" },
  { label: "Marketing", icon: "campaign" },
  { label: "Consultoría", icon: "psychology" },
  { label: "Fotografía", icon: "photo_camera" },
];

const causas = [
  "Educación Para Todos",
  "Reforestemos Juntos",
  "Salud Comunitaria",
  "Tech para Todos",
  "Alimentos Solidarios",
  "Arte y Cultura",
];

export default function RegistroProveedorPage() {
  const [step, setStep] = useState(1);

  // Step 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");

  // Step 2
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [causa, setCausa] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  return (
    <div>
      <h1 className="text-deep font-bold text-3xl tracking-tight">
        Únete como proveedor
      </h1>
      <p className="text-stone mt-2 mb-8">
        Ofrece tus servicios y genera impacto social
      </p>

      {/* Stepper */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                transition-colors
                ${
                  step >= s
                    ? "bg-warmth text-white"
                    : "bg-sage/30 text-stone"
                }
              `}
            >
              {step > s ? (
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  check
                </span>
              ) : (
                s
              )}
            </div>
            <span
              className={`text-sm font-medium transition-colors ${
                step >= s ? "text-deep" : "text-stone"
              }`}
            >
              {s === 1 ? "Datos personales" : "Perfil profesional"}
            </span>
            {s === 1 && (
              <div
                className={`flex-1 h-0.5 rounded-full transition-colors ${
                  step > 1 ? "bg-warmth" : "bg-sage/30"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        {step === 1 && (
          <>
            <Input
              label="Nombre completo"
              type="text"
              icon="person"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName((e.target as HTMLInputElement).value)}
              required
            />

            <Input
              label="Email"
              type="email"
              icon="mail"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              required
            />

            <Input
              label="Contraseña"
              type="password"
              icon="lock"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) =>
                setPassword((e.target as HTMLInputElement).value)
              }
              helper="Usa al menos 8 caracteres con letras y números"
              required
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              icon="lock"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword((e.target as HTMLInputElement).value)
              }
              error={
                confirmPassword && confirmPassword !== password
                  ? "Las contraseñas no coinciden"
                  : undefined
              }
              required
            />

            <Input
              label="Ubicación"
              type="text"
              icon="location_on"
              placeholder="Ciudad, País"
              value={location}
              onChange={(e) =>
                setLocation((e.target as HTMLInputElement).value)
              }
            />

            <Button
              fullWidth
              type="button"
              className="mt-2"
              onClick={() => setStep(2)}
            >
              <span className="flex items-center justify-center gap-2">
                Continuar
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  arrow_forward
                </span>
              </span>
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            {/* Category chips */}
            <div>
              <label className="block text-dusk text-sm font-medium mb-2">
                Categoría profesional
              </label>
              <div className="flex flex-wrap gap-2">
                {categorias.map((cat) => (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => toggleCategory(cat.label)}
                    className={`
                      flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-full)]
                      text-sm font-medium transition-all cursor-pointer
                      ${
                        selectedCategories.includes(cat.label)
                          ? "bg-warmth text-white"
                          : "bg-mist text-dusk border border-sage/40 hover:border-sky"
                      }
                    `}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "16px" }}
                    >
                      {cat.icon}
                    </span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <Input
              as="textarea"
              label="Descripción corta"
              placeholder="Cuéntanos sobre tu experiencia y servicios..."
              value={description}
              onChange={(e) =>
                setDescription((e.target as HTMLTextAreaElement).value)
              }
              rows={3}
              helper="Máximo 200 caracteres"
            />

            <Input
              label="Portfolio URL"
              type="url"
              icon="link"
              placeholder="https://tu-portfolio.com"
              value={portfolio}
              onChange={(e) =>
                setPortfolio((e.target as HTMLInputElement).value)
              }
            />

            {/* Causa social */}
            <div>
              <label className="block text-dusk text-sm font-medium mb-1.5">
                Causa social preferida
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
                  style={{ fontSize: "20px" }}
                >
                  volunteer_activism
                </span>
                <select
                  value={causa}
                  onChange={(e) => setCausa(e.target.value)}
                  className="
                    w-full bg-white border border-sage text-deep text-[15px]
                    rounded-[var(--radius-sm)] pl-11 pr-4 py-2.5
                    transition-all outline-none appearance-none cursor-pointer
                    focus:ring-2 focus:ring-calm/30 focus:border-sky
                  "
                >
                  <option value="" disabled>
                    Selecciona una causa
                  </option>
                  {causas.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span
                  className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
                  style={{ fontSize: "20px" }}
                >
                  expand_more
                </span>
              </div>
              <p className="text-stone text-xs mt-1">
                El 10% de tus ventas irá a esta causa
              </p>
            </div>

            <label className="flex items-start gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-sage text-warmth focus:ring-warmth/30 accent-warmth"
              />
              <span className="text-dusk text-sm leading-tight">
                Acepto los{" "}
                <button
                  type="button"
                  className="text-sky hover:text-sky/80 transition-colors"
                >
                  Términos de servicio
                </button>{" "}
                y la{" "}
                <button
                  type="button"
                  className="text-sky hover:text-sky/80 transition-colors"
                >
                  Política de privacidad
                </button>
              </span>
            </label>

            <div className="flex gap-3 mt-2">
              <Button
                variant="secondary"
                type="button"
                onClick={() => setStep(1)}
              >
                <span className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                  >
                    arrow_back
                  </span>
                  Atrás
                </span>
              </Button>
              <Button fullWidth type="submit">
                <span className="flex items-center justify-center gap-2">
                  Crear cuenta de proveedor
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                  >
                    arrow_forward
                  </span>
                </span>
              </Button>
            </div>
          </>
        )}
      </form>

      {/* Login link */}
      <div className="mt-8 text-center text-sm">
        <p className="text-stone">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/auth/login"
            className="text-sky font-medium hover:text-sky/80 transition-colors"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
