"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegistroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div>
      <h1 className="text-deep font-bold text-3xl tracking-tight">
        Crea tu cuenta
      </h1>
      <p className="text-stone mt-2 mb-8">
        Únete y genera impacto con cada compra
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
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
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
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

        <label className="flex items-start gap-2 cursor-pointer mt-1">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-sage text-warmth focus:ring-warmth/30 accent-warmth"
          />
          <span className="text-dusk text-sm leading-tight">
            Acepto los{" "}
            <button type="button" className="text-sky hover:text-sky/80 transition-colors">
              Términos de servicio
            </button>{" "}
            y la{" "}
            <button type="button" className="text-sky hover:text-sky/80 transition-colors">
              Política de privacidad
            </button>
          </span>
        </label>

        <Button fullWidth type="submit" className="mt-2">
          <span className="flex items-center justify-center gap-2">
            Crear cuenta
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              arrow_forward
            </span>
          </span>
        </Button>
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
        <p className="text-stone mt-1.5">
          ¿Eres profesional?{" "}
          <Link
            href="/auth/registro-proveedor"
            className="text-warmth font-medium hover:text-terra transition-colors"
          >
            Regístrate como proveedor
          </Link>
        </p>
      </div>
    </div>
  );
}
