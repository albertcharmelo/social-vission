"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Handshake,
  DollarSign,
  Bell,
  Star,
  Trophy,
  Heart,
  Briefcase,
  Crown,
  User,
  X,
  LogOut,
} from "lucide-react";
import { useDashboard } from "./dashboard-context";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/servicios", label: "Servicios", icon: Package },
  { href: "/dashboard/tratos", label: "Tratos", icon: Handshake },
  { href: "/dashboard/ingresos", label: "Ingresos", icon: DollarSign },
  { href: "/dashboard/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/dashboard/valoraciones", label: "Valoraciones", icon: Star },
  { href: "/dashboard/ranking", label: "Ranking", icon: Trophy },
  { href: "/dashboard/causas", label: "Causas", icon: Heart },
  { href: "/dashboard/oportunidades", label: "Oportunidades", icon: Briefcase },
  { href: "/dashboard/planes", label: "Planes", icon: Crown },
  { href: "/dashboard/perfil", label: "Perfil", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useDashboard();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const nav = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-warmth flex items-center justify-center">
          <Heart className="w-4 h-4 text-white" />
        </div>
        <span className="text-cloud font-bold text-lg tracking-tight">
          Social Vission
        </span>
      </div>

      {/* Nav links */}
      <div className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-colors
                ${active
                  ? "bg-warmth/15 text-warmth"
                  : "text-cloud/60 hover:text-cloud hover:bg-white/5"
                }
              `}
            >
              <Icon className="w-[18px] h-[18px]" />
              {label}
              {href === "/dashboard/notificaciones" && (
                <span className="ml-auto bg-warmth text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Plan badge + user */}
      <div className="px-4 py-4 border-t border-white/10 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="pro">PRO</Badge>
          <span className="text-cloud/50 text-xs">Plan activo</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stone/30 flex items-center justify-center text-cloud text-xs font-semibold">
            MG
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-cloud text-sm font-medium truncate">Maria Gonzalez</p>
            <p className="text-cloud/40 text-xs truncate">maria@studio.com</p>
          </div>
          <button className="text-cloud/40 hover:text-cloud transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-[260px] lg:flex-shrink-0 bg-deep h-screen sticky top-0">
        {nav}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[280px] bg-deep z-50 lg:hidden
          transition-transform duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-cloud/60 hover:text-cloud cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        {nav}
      </aside>
    </>
  );
}
