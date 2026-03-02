"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Handshake,
  Bell,
  Briefcase,
  Leaf,
  User,
  X,
  LogOut,
  Heart,
} from "lucide-react";
import { useDashboard } from "./dashboard-context";

const navItems = [
  { href: "/cliente", label: "Overview", icon: LayoutDashboard },
  { href: "/cliente/servicios", label: "Mis servicios", icon: ShoppingBag },
  { href: "/cliente/tratos", label: "Tratos", icon: Handshake },
  { href: "/cliente/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/cliente/oportunidades", label: "Oportunidades", icon: Briefcase },
  { href: "/cliente/impacto", label: "Mi impacto", icon: Leaf },
  { href: "/cliente/perfil", label: "Perfil", icon: User },
];

export function ClientSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useDashboard();

  const isActive = (href: string) => {
    if (href === "/cliente") return pathname === "/cliente";
    return pathname.startsWith(href);
  };

  const nav = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-sky/80 flex items-center justify-center">
          <Heart className="w-4 h-4 text-white" />
        </div>
        <span className="text-cloud font-bold text-lg tracking-tight">
          Social Vission
        </span>
      </div>

      {/* Role badge */}
      <div className="px-5 mb-4">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider bg-sky/20 text-calm px-2.5 py-1 rounded-full">
          <ShoppingBag className="w-3 h-3" />
          Cliente
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
                  ? "bg-sky/20 text-sky"
                  : "text-cloud/50 hover:text-cloud hover:bg-white/5"
                }
              `}
            >
              <Icon className="w-[18px] h-[18px]" />
              {label}
              {href === "/cliente/notificaciones" && (
                <span className="ml-auto bg-sky text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  2
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sky/20 flex items-center justify-center text-calm text-xs font-semibold">
            JP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-cloud text-sm font-medium truncate">Juan Perez</p>
            <p className="text-cloud/40 text-xs truncate">juan@empresa.com</p>
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
          className="absolute top-4 right-4 text-cloud/40 hover:text-cloud cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        {nav}
      </aside>
    </>
  );
}
