"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div>
      <h1 className="text-deep font-bold text-3xl tracking-tight">
        Bienvenido de vuelta
      </h1>
      <p className="text-stone mt-2 mb-8">
        Inicia sesión para acceder a tu cuenta
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
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
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 rounded border-sage text-warmth focus:ring-warmth/30 accent-warmth"
            />
            <span className="text-dusk text-sm">Recordarme</span>
          </label>
          <button
            type="button"
            className="text-sky text-sm font-medium hover:text-sky/80 transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <Button fullWidth type="submit" className="mt-2">
          <span className="flex items-center justify-center gap-2">
            Iniciar sesión
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              arrow_forward
            </span>
          </span>
        </Button>
      </form>

      {/* Separator */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-sage/40" />
        <span className="text-stone text-xs">o continúa con</span>
        <div className="flex-1 h-px bg-sage/40" />
      </div>

      {/* Social login */}
      <div className="flex gap-3">
        <Button variant="secondary" fullWidth type="button">
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#5C6B66"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#5C6B66"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#5C6B66"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#5C6B66"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </span>
        </Button>
        <Button variant="secondary" fullWidth type="button">
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#5C6B66">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </span>
        </Button>
      </div>

      {/* Register links */}
      <div className="mt-8 text-center text-sm">
        <p className="text-stone">
          ¿No tienes cuenta?{" "}
          <Link
            href="/auth/registro"
            className="text-sky font-medium hover:text-sky/80 transition-colors"
          >
            Regístrate como cliente
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
