# Plan MVP — Marketplace de Servicios con Impacto Social

## Stack Técnico

## Frontend + App Shell

## Next.js 15 (App Router) + TypeScript

## Tailwind CSS + shadcn/ui para componentes consistentes y rápidos de

## iterar

## Deploy en Vercel (previews por branch, edge network, analytics

## integrado)

## Backend (todo-en-uno)

## Supabase como core:

## Postgres (base de datos real, migraciones SQL versionadas)

## Auth (registro/login con email, OAuth Google/GitHub)

## Storage (imágenes, portfolios, entregables)

## Row Level Security (RLS) para permisos granulares

## Edge Functions para webhooks, lógica sensible y jobs programados

## Realtime (reservado para fase 2: notificaciones, chat)

## Pagos y Monetización

## Stripe Checkout para cobros simples en MVP

## Stripe Billing / Subscriptions para planes premium

## Stripe Connect (fase 2) para splits automáticos marketplace

## Herramientas de desarrollo

## Supabase CLI para entorno local y migraciones

## GitHub Actions para CI/CD básico (lint + deploy)

## Zod para validación de formularios y datos en servidor

## Por qué este stack

## El producto necesita tres cosas: salir rápido, operar barato y no bloquearse

## si crece. Este stack lo logra porque:

### Next.js con App Router unifica frontend y lógica de servidor en un solo

### repo. Server Actions manejan formularios y mutaciones sin necesidad de un

### backend separado. Route Handlers cubren webhooks de Stripe y endpoints

### internos.

### Supabase resuelve Auth, DB, Storage y funciones sin montar infraestructura,

### pero todo corre sobre Postgres real con migraciones SQL. Si mañana hay que

### migrar a otro Postgres o sacar un backend dedicado, el esquema y los datos

### se llevan tal cual.

### Stripe es el estándar para marketplaces. El MVP arranca con cobros simples

### (la plataforma cobra y distribuye manualmente), y cuando se valide el modelo

### se activa Connect para automatizar splits.

## MVP Funcional — Alcance Exacto

### 1. Área Pública

### Landing page con propuesta de valor: marketplace de servicios + impacto

### social

### Listado de servicios con filtros por categoría, precio y rating

### Página individual de servicio (estilo Fiverr): descripción, precio base,

### tiempo de entrega, portfolio del proveedor, extras opcionales, reviews

### Página pública de causas apoyadas con total recaudado y distribución

### Indicador visible en cada servicio: "10% de esta compra se destina a

### [causa]"

### Barra de impacto global en el footer o header: total donado por la

### plataforma

### 2. Roles del Sistema

```
Rol Descripción Permisos clave
```

```
Cliente Compra servicios, deja
reviews
```

```
Ver servicios, crear órdenes, ver sus
órdenes, dejar review
```

```
Proveedor Ofrece servicios,
entrega trabajo
```

```
CRUD servicios propios, ver/gestionar
órdenes asignadas, subir entregables
```

```
Admin Opera la plataforma Todo: gestión de usuarios, causas, payouts,
disputas básicas, métricas
```

```
Gestor de
causa
```

```
(Fase 2) Representa
una fundación
```

```
Ver fondos acumulados, subir reportes de
impacto
```

### 3. Autenticación y Perfiles

### Registro / Login:

### Email + contraseña (Supabase Auth)

### OAuth con Google (opcional pero recomendado desde día 1 por conversión)

### Flujo de onboarding post-registro para elegir rol (cliente o proveedor)

### Perfil básico (todos los usuarios):

### Nombre, avatar, email, país, idioma

### Perfil profesional (proveedores):

### Bio, categorías, skills (tags), portfolio (imágenes/links), tarifa base,

### tiempos de entrega estimados, redes sociales, badge de plan premium (si

### aplica), rating promedio

### 4. Dashboard del Proveedor

### Crear/editar anuncios de servicios (título, descripción, categoría,

### precio, extras, tiempo de entrega)

### Subir media: imágenes (hasta 5 por servicio), PDFs, links de portfolio

### Vista de órdenes: pendientes, en progreso, completadas, canceladas

### Vista de ingresos: total ganado, pendiente de pago, historial de

### transacciones

### Impacto social generado: cuánto han contribuido sus ventas a causas

### Métricas básicas: vistas de perfil, vistas de servicios, tasa de

### conversión

### 5. Flujo de Compra / Contratación

### Estados de la orden: pending_payment → paid → in_progress → delivered →

### revision_requested (max 1 revisión en MVP) → completed → cancelled

### Entregables: archivos subidos a Supabase Storage (bucket privado),

### accesibles solo por cliente, proveedor y admin mediante signed URLs con

### expiración.

### 6. Módulo Social (Impacto — versión MVP)

### En la primera versión NO se implementan campañas abiertas tipo GoFundMe. Se

### hace algo más simple y verificable:

```
Cliente navega → Elige servicio → Completa brief/requerimientos
→ Paga (Stripe Checkout) → Se crea orden con estado "pagada"
→ Proveedor recibe notificación (email) → Acepta y trabaja
→ Sube entregable (archivo/link) → Cliente revisa
→ Cliente aprueba → Orden "completada" → Se registra transacción
→ 10% se asigna al ledger de impacto social
→ Cliente puede dejar review
```

### Catálogo de causas/fundaciones verificadas por admin (nombre,

### descripción, logo, sitio web, país)

### Ledger interno de impacto: cada orden completada registra el 10%

### asignado a la causa seleccionada

### Página pública de transparencia: total recaudado, desglose por causa,

### historial de desembolsos

### Panel admin para: aprobar/editar causas, registrar desembolsos reales,

### marcar periodos de conciliación

### Cada causa tiene su página con: descripción, monto acumulado, historial

### de aportes

### Esto comunica impacto real sin meterse en la complejidad de crowdfunding

### abierto.

### 7. Suscripciones Premium (Proveedores)

### Plan Free:

### Hasta 3 servicios activos

### Portfolio básico (3 imágenes por servicio)

### Aparece en listados normales

### Plan Pro (precio a definir, mensual):

### Servicios activos ilimitados

### Portfolio extendido (10 imágenes + video embed por servicio)

### Badge "Pro" visible en perfil y listados

### Prioridad en resultados de búsqueda (boost en ranking)

### Estadísticas avanzadas (fuentes de tráfico, comparativas)

### Soporte prioritario

### Implementación: Stripe Billing con Checkout Session para suscripción.

### Webhook customer.subscription.updated / customer.subscription.deleted actualiza

### el estado en tabla subscriptions.

### 8. Reviews y Reputación

### Review de 1-5 estrellas + comentario de texto

### Solo clientes con orden completada pueden dejar review

### Un review por orden

### Rating promedio calculado y mostrado en servicio y perfil del proveedor

### Admin puede moderar reviews reportados

## Manejo del 10% Social en Pagos

### MVP (implementación simple)

### 1. Cliente paga el total a la plataforma vía Stripe Checkout

### 2. La plataforma registra internamente en la tabla transactions:

### Monto total cobrado

### Comisión de plataforma (% a definir)

### 10% reservado para causa

### Neto del proveedor

### 3. En donation_ledger se registra el 10% vinculado a la causa del servicio

### 4. Los desembolsos a proveedores se hacen manualmente (transferencia

### bancaria o Stripe payout) con conciliación en admin_payouts

### 5. Las donaciones a causas se acumulan y se desembolsan periódicamente

### (mensual), registrando cada desembolso

### Fase 2 (automatizado con Stripe Connect)

### Con Stripe Connect (separate charges and transfers), un solo cobro se puede

### dividir en múltiples transferencias: parte al proveedor (cuenta conectada),

### parte retenida por la plataforma, y potencialmente parte a la fundación.

### Esto requiere que proveedores y fundaciones tengan cuentas Stripe Connect

### onboarded.

### Nota importante: validar restricciones de transferencias cross-border de

### Stripe antes de automatizar payouts internacionales, especialmente si hay

### usuarios en múltiples países.

## Estructura de Base de Datos (MVP)

### Tablas principales

### Políticas RLS críticas

### Un proveedor solo puede crear/editar/eliminar sus propios servicios

### Un cliente solo ve sus propias órdenes; un proveedor solo ve órdenes de

### sus servicios

### Los entregables solo son accesibles por el cliente de la orden, el

### proveedor y admin

### El donation_ledger solo lo puede escribir el sistema (service_role);

### lectura pública para transparencia

### admin_payouts solo accesible por admin

### Reviews solo pueden ser creados por el cliente de una orden completada

### Profiles: cada usuario solo edita su propio perfil; lectura pública de

### datos no sensibles

### Storage Buckets

```
profiles — Datos básicos de todo usuario (extends auth.users)
provider_profiles — Datos profesionales del proveedor (1:1 con profiles)
categories — Categorías de servicios
services — Anuncios de servicios publicados
service_media — Imágenes/archivos de cada servicio
service_extras — Extras opcionales por servicio (precio adicional)
orders — Órdenes de compra
order_requirements — Brief/requerimientos del cliente por orden
deliverables — Archivos entregados por el proveedor
transactions — Registro financiero de cada orden
donation_ledger — Registro del 10% social por transacción
causes — Causas/fundaciones verificadas
subscriptions — Suscripciones premium activas
reviews — Reviews de clientes a servicios
admin_payouts — Registro de desembolsos a proveedores y causas
notifications — Notificaciones del sistema (email queue)
```

```
Bucket Acceso Contenido
```

#### avatars Público Fotos de perfil

#### service-media Público Imágenes y muestras de servicios

#### order-deliverables Privado (signed URLs) Archivos entregados

#### verification-docs Privado (solo admin) Documentos de verificación

## Qué queda fuera del MVP

### Para salir rápido, NO se incluye:

### Chat en tiempo real (se usa email para comunicación cliente-proveedor)

### Sistema de disputas avanzado (admin resuelve manualmente)

### Milestones por proyecto (una sola entrega por orden)

### Sistema de propuestas tipo Workana/Upwork

### Campañas abiertas de crowdfunding

### Wallet interna del usuario

### App móvil nativa

### Internacionalización (i18n) — se lanza en un solo idioma

### Sistema de referidos

### Mensajería interna

### El MVP debe validar una sola tesis: "La gente compra servicios aquí, y el

### componente social aumenta conversión y confianza."

## Ruta de Evolución

### Fase 1 — MVP (semanas 1-6) Monolito en Next.js + Supabase + Stripe. Todo en

### un repo, deploy en Vercel.

### Fase 2 — Crecimiento (meses 2-4)

### Stripe Connect para splits automáticos

### Chat básico con Supabase Realtime

### Notificaciones in-app

### Sistema de disputas con flujo definido

### Más Edge Functions para jobs: emails transaccionales, reportes, payouts

### automáticos

### Búsqueda full-text con pg_trgm o Supabase Vector

### Fase 3 — Escala (meses 4-8)

### Si la complejidad lo justifica: extraer backend dedicado (Nest.js / Go)

### Mantener Supabase como Postgres o migrar a otro Postgres administrado

### Frontend sigue en Next.js

### CDN dedicado para media

### Analytics avanzado

### App móvil (React Native o PWA)

### Como el núcleo es Postgres + migraciones SQL, no hay lock-in con ninguna

### plataforma.

## Sprint Planning — Semanas 1 a 6

### Sprint 0 — Setup y Fundamentos (Semana 1)

### Objetivo: Infraestructura lista, esquema base desplegado, auth funcionando.

```
# Tarea Estimación
```

```
1 Crear repo Next.js 15 + TypeScript + Tailwind + shadcn/ui 2h
```

```
2 Crear proyecto Supabase, configurar CLI local, seed de categorías 2h
```

(^3) Migración inicial: tablas profiles, provider_profiles,

#### categories, causes

```
3h
```

```
4 Configurar Supabase Auth (email + Google OAuth) 2h
```

```
5 Flujo de registro/login con middleware de Next.js (protección de
rutas)
```

```
4h
```

```
6 Trigger de Supabase: al crear usuario en auth → crear fila en
```

#### profiles

```
1h
```

```
7 Página de onboarding post-registro (elegir rol: cliente/proveedor) 3h
```

```
8 Layout base: navbar, sidebar, footer con navegación por rol 4h
```

```
9 Deploy inicial en Vercel + variables de entorno 1h
```

```
10 Configurar proyecto Stripe (test mode) + claves en env 1h
```

### Entregable: App desplegada con registro, login, selección de rol y layout

### base funcional.

### Sprint 1 — Proveedores y Servicios (Semana 2)

### Objetivo: Un proveedor puede crear su perfil, publicar servicios y subir

### media.

```
# Tarea Estimación
```

#### 1 Migración: tablas services, service_media, service_extras 2h

```
2 RLS para servicios: CRUD solo del proveedor propietario 2h
```

```
3 Formulario de perfil profesional del proveedor (bio, skills, tarifa,
portfolio)
```

```
4h
```

```
4 CRUD de servicios: crear/editar/eliminar anuncio 6h
```

#### 5 Upload de imágenes a bucket service-media con preview 3h

(^6) Upload de avatar a bucket avatars 1h
7 Página pública de servicio (SSR): descripción, precio, media, perfil
del proveedor
4h
8 Listado público de servicios con filtros (categoría, precio) y
paginación
4h

#### 9 RLS y políticas de Storage para buckets service-media y avatars 2h

### Entregable: Proveedores pueden publicar servicios visibles públicamente con

### imágenes.

### Sprint 2 — Compra y Órdenes (Semana 3)

### Objetivo: Un cliente puede contratar un servicio, pagar y se crea la orden.

```
# Tarea Estimación
```

#### 1 Migración: tablas orders, order_requirements, transactions 2h

```
2 RLS para órdenes: cliente ve las suyas, proveedor ve las de sus
servicios
```

```
2h
```

```
3 Formulario de brief/requerimientos al contratar un servicio 3h
```

```
4 Integración Stripe Checkout: crear session, redirect, success/cancel
pages
```

```
4h
```

(^5) Webhook de Stripe (checkout.session.completed): crear orden +
transacción
4h
6 Edge Function para el webhook (verificación de firma, lógica de
negocio)
3h
7 Dashboard del cliente: lista de órdenes con estados 3h
8 Dashboard del proveedor: lista de órdenes recibidas con estados 3h
9 Notificación por email al proveedor cuando recibe orden (Supabase
Edge Function + Resend/SendGrid)
3h

### Entregable: Flujo completo de compra: cliente paga → se crea orden →

### proveedor la ve en su dashboard.

### Sprint 3 — Entregas y Completar Órdenes (Semana 4)

### Objetivo: El proveedor entrega trabajo, el cliente aprueba y la orden se

### completa.

```
# Tarea Estimación
```

#### 1 Migración: tabla deliverables 1h

```
2 RLS para entregables: solo cliente, proveedor y admin 1h
```

(^3) Upload de entregables a bucket privado order-deliverables 3h
4 Vista de detalle de orden para proveedor: ver brief, subir entrega,
cambiar estado
4h
5 Vista de detalle de orden para cliente: ver entrega (signed URL),
aprobar o pedir revisión
4h
(^6) Flujo de estados de orden: paid → in_progress → delivered →

#### completed / revision_requested

```
3h
```

(^7) Al completar orden: registrar en donation_ledger el 10% para la
causa
2h
8 Email al cliente cuando el proveedor entrega 2h
9 Email al proveedor cuando el cliente aprueba o pide revisión 2h

### Entregable: Ciclo completo de una orden desde pago hasta entrega aprobada,

### con registro de impacto social.

### Sprint 4 — Impacto Social, Reviews y Landing (Semana 5)

### Objetivo: El módulo social es visible, hay reviews y la landing page está

### lista.

```
# Tarea Estimación
```

#### 1 Migración: tablas reviews, donation_ledger (si no existe),

#### admin_payouts

```
2h
```

```
2 CRUD de causas en panel admin 3h
```

```
3 Página pública de causas: listado con total recaudado por causa 3h
```

```
4 Página individual de causa: descripción, monto acumulado, historial 2h
```

```
5 Indicador de impacto en página de servicio ("10% va a [causa]") 1h
```

```
6 Barra de impacto global (total donado por la plataforma) 1h
```

```
7 Sistema de reviews: formulario post-orden, rating 1-5 + comentario 3h
```

```
8 Mostrar reviews en página de servicio y rating promedio en listados 2h
```

```
9 Landing page: hero, propuesta de valor, cómo funciona, causas
destacadas, CTA
```

```
6h
```

```
10 SEO básico: meta tags, OG images, sitemap 2h
```

### Entregable: Plataforma con identidad social visible, reviews funcionales y

### landing page lista para adquisición.

### Sprint 5 — Suscripciones, Admin y Polish (Semana 6)

### Objetivo: Suscripciones premium activas, panel admin funcional, QA y

### lanzamiento.

```
# Tarea Estimación
```

#### 1 Migración: tabla subscriptions 1h

```
2 Integración Stripe Billing: crear suscripción, portal de cliente 4h
```

(^3) Webhooks de suscripción: customer.subscription.created/updated/

#### deleted

```
3h
```

```
4 Lógica de beneficios Pro: límite de servicios, badge, boost en
ranking
```

```
3h
```

```
5 Panel admin: dashboard con métricas (órdenes, ingresos, impacto
social)
```

```
4h
```

```
6 Panel admin: gestión de usuarios (ver, suspender) 2h
```

```
7 Panel admin: gestión de payouts (registrar desembolsos a
proveedores y causas)
```

```
3h
```

```
8 Responsive: verificar y ajustar todas las páginas en mobile 4h
```

```
9 Error handling global: páginas de error, estados vacíos, loading
states
```

```
3h
```

```
10 QA completo: flujo de compra end-to-end, edge cases, permisos 4h
```

```
11 Migrar Stripe a modo producción, dominio final, DNS 2h
```

### Entregable: MVP completo listo para lanzamiento con suscripciones, admin y

### calidad de producción.

### Resumen de velocidad por sprint

```
Sprint Semana Foco Horas est.
```

```
0 1 Setup, Auth, Layout ~23h
```

```
1 2 Proveedores y Servicios ~28h
```

```
2 3 Compra y Órdenes ~27h
```

```
3 4 Entregas y Completar ~22h
```

```
4 5 Impacto Social, Reviews, Landing ~25h
```

```
5 6 Suscripciones, Admin, QA ~33h
```

```
Total 6 semanas ~158h
```

### Esto asume un desarrollador full-time (~30h productivas/semana). Con dos

### desarrolladores, se puede comprimir a 3-4 semanas paralelizando frontend y

### backend.

### Criterios de "Done" para el MVP

### El MVP está listo para lanzar cuando:

### 1. Un proveedor puede registrarse, crear perfil, publicar servicios con

### imágenes

### 2. Un cliente puede navegar servicios, pagar con Stripe y crear una orden

### 3. El proveedor puede entregar y el cliente puede aprobar

### 4. El 10% social se registra y se muestra públicamente

### 5. Las causas tienen páginas con montos acumulados

### 6. Los reviews funcionan post-orden

### 7. Las suscripciones Pro están activas con beneficios reales

### 8. El admin puede gestionar causas, ver métricas y registrar payouts

### 9. La landing page comunica la propuesta de valor

### 10. Todo funciona en mobile
