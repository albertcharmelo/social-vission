"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/marketplace", label: "Marketplace", icon: "storefront" },
  { href: "/causas", label: "Causas", icon: "volunteer_activism" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cloud/90 backdrop-blur-md border-b border-sage/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-meadow" style={{ fontSize: "28px" }}>
            eco
          </span>
          <span className="text-deep font-bold text-xl hidden sm:block tracking-tight">
            Social Vission
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-dusk hover:text-deep hover:bg-mist text-sm font-medium transition-all px-4 py-2 rounded-[var(--radius-full)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost">Iniciar sesión</Button>
          </Link>
          <Link href="/auth/registro">
            <Button>Registrarse</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-dusk hover:bg-mist rounded-[var(--radius-sm)] transition-colors cursor-pointer"
          aria-label="Menú"
        >
          <span className="material-symbols-outlined">
            {open ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-mist border-t border-sage/30 px-4 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-dusk hover:text-deep text-sm font-medium py-3 px-3 rounded-[var(--radius-sm)] hover:bg-cloud transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3 border-t border-sage/30">
            <Link href="/auth/login" className="flex-1" onClick={() => setOpen(false)}>
              <Button variant="ghost" fullWidth>
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/auth/registro" className="flex-1" onClick={() => setOpen(false)}>
              <Button fullWidth>Registrarse</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
