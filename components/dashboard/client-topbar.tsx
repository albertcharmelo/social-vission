"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { useDashboard } from "./dashboard-context";

const breadcrumbMap: Record<string, string> = {
  "/cliente": "Overview",
  "/cliente/servicios": "Mis servicios",
  "/cliente/tratos": "Tratos",
  "/cliente/notificaciones": "Notificaciones",
  "/cliente/oportunidades": "Oportunidades",
  "/cliente/oportunidades/nueva": "Nueva oportunidad",
  "/cliente/impacto": "Mi impacto",
  "/cliente/perfil": "Perfil",
};

export function ClientTopbar() {
  const pathname = usePathname();
  const { toggleSidebar } = useDashboard();

  const currentPage = breadcrumbMap[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-sky/15">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-dusk hover:text-deep transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-stone">Cliente</span>
            {currentPage !== "Overview" && (
              <>
                <span className="text-stone">/</span>
                <span className="text-deep font-medium">{currentPage}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative text-dusk hover:text-deep transition-colors cursor-pointer p-2">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-sky/20 flex items-center justify-center text-deep text-xs font-semibold">
            JP
          </div>
        </div>
      </div>
    </header>
  );
}
