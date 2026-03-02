"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClienteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blush/15 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-blush" />
      </div>
      <h2 className="text-deep font-bold text-xl mb-2">Algo salio mal</h2>
      <p className="text-stone text-sm max-w-sm mb-6">
        Hubo un error al cargar esta seccion. Intenta nuevamente.
      </p>
      <Button onClick={reset}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Reintentar
      </Button>
    </div>
  );
}
