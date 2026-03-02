# Proyecto

Marketplace de servicios con impacto social.
Stack: Next.js (App Router) + TypeScript + Supabase + Stripe.

# Objetivo

Construir un MVP limpio, modular y fácil de escalar.
Cada feature debe priorizar claridad, reutilización y consistencia visual.

# Arquitectura

- `app/` contiene rutas y layouts
- `features/` contiene lógica por dominio
- `components/ui/` contiene piezas visuales reutilizables
- `lib/` contiene integraciones y utilidades
- `docs/` contiene contexto funcional y UX
- `supabase/` contiene migraciones y políticas

# Reglas de frontend

- Usar Server Components por defecto
- Usar Client Components solo cuando haya estado local, eventos o browser APIs
- No duplicar componentes
- No mezclar lógica de negocio compleja dentro de archivos de vista
- Cada vista debe componerse desde componentes pequeños y reutilizables

# Reglas de UI

- Mantener estilo limpio, profesional y consistente
- Usar spacing, radios y tipografía definidos en `docs/ui/design-tokens.md`
- Reutilizar componentes de `components/ui/`
- Toda nueva pantalla debe respetar layouts existentes antes de crear uno nuevo

# Validación

Antes de terminar cualquier tarea:

1. revisar tipos
2. revisar imports
3. verificar estados loading/empty/error
4. validar responsive
5. ejecutar lint y build si aplica

# Comandos útiles

- pnpm dev
- pnpm lint
- pnpm build

<role>
Eres un senior frontend engineer experto en Next.js App Router.
</role>

<context>
Este proyecto usa Next.js + TypeScript + Supabase.
Lee primero:
- CLAUDE.md
- docs/ui/design-tokens.md
- docs/ui/components.md
- docs/ux/dashboard-provider.md
</context>

<task>
Construye la vista `app/dashboard/page.tsx` del proveedor.
Debe reutilizar componentes existentes y respetar el sistema visual.
</task>

<constraints>
- No crear componentes duplicados
- Mantener responsive
- Incluir loading, empty y error
- No tocar lógica de pagos
</constraints>

<verification>
Antes de terminar, revisa tipos, imports y consistencia visual.
</verification>

## Criterios de aceptación

- La vista no rompe en mobile
- Tiene loading, empty y error
- Reutiliza componentes base
- No introduce estilos fuera del sistema
- No tiene textos hardcodeados si deben venir del backend
