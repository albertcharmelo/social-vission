# Serene Impact — Sistema de Colores UI

Paleta diseñada para transmitir calma, confianza y propósito social. Tonos suaves que invitan a quedarse, con acentos cálidos que comunican acción e impacto.

---

## Base — Fondos y superficies

| Token           | Nombre | Hex       | RGB           | Uso                               |
| --------------- | ------ | --------- | ------------- | --------------------------------- |
| `--color-cloud` | Cloud  | `#F7F5F2` | 247, 245, 242 | Fondo principal de la app         |
| `--color-mist`  | Mist   | `#EDE9E3` | 237, 233, 227 | Fondo de cards, secciones, modals |

## Neutros — Texto y estructura

| Token           | Nombre | Hex       | RGB           | Uso                                      |
| --------------- | ------ | --------- | ------------- | ---------------------------------------- |
| `--color-sage`  | Sage   | `#C5D1CA` | 197, 209, 202 | Bordes, dividers, tags inactivos         |
| `--color-stone` | Stone  | `#9BA8A2` | 155, 168, 162 | Texto secundario, placeholders, captions |
| `--color-dusk`  | Dusk   | `#5C6B66` | 92, 107, 102  | Texto body, iconos, labels               |
| `--color-deep`  | Deep   | `#2D3B36` | 45, 59, 54    | Títulos, texto principal, headings       |

## Acentos — Elementos decorativos

| Token           | Nombre | Hex       | RGB           | Uso                                         |
| --------------- | ------ | --------- | ------------- | ------------------------------------------- |
| `--color-calm`  | Calm   | `#B8D4E3` | 184, 212, 227 | Info states, badges neutros, fondos suaves  |
| `--color-sky`   | Sky    | `#7BAAC4` | 123, 170, 196 | Links, CTA secundarios, iconos interactivos |
| `--color-petal` | Petal  | `#E8C4B8` | 232, 196, 184 | Highlights, notificaciones suaves, tooltips |

## Primarios — Acciones principales

| Token            | Nombre | Hex       | RGB           | Uso                                 |
| ---------------- | ------ | --------- | ------------- | ----------------------------------- |
| `--color-warmth` | Warmth | `#D4956B` | 212, 149, 107 | Botón primario, CTA principal       |
| `--color-terra`  | Terra  | `#C17A4E` | 193, 122, 78  | Hover/active de CTA, énfasis fuerte |

## Semánticos — Estados y significado

| Token            | Nombre | Hex       | RGB           | Uso                                     |
| ---------------- | ------ | --------- | ------------- | --------------------------------------- |
| `--color-sprout` | Sprout | `#A7C4A0` | 167, 196, 160 | Éxito, impacto social, badges verdes    |
| `--color-meadow` | Meadow | `#7BA074` | 123, 160, 116 | Impacto social destacado, progress bars |
| `--color-blush`  | Blush  | `#D4A0A0` | 212, 160, 160 | Errores suaves, alertas destructivas    |
| `--color-honey`  | Honey  | `#D4C48A` | 212, 196, 138 | Warnings, badge Pro/Premium             |

---

## CSS Variables

```css
:root {
  /* Base */
  --color-cloud: #f7f5f2;
  --color-mist: #ede9e3;

  /* Neutros */
  --color-sage: #c5d1ca;
  --color-stone: #9ba8a2;
  --color-dusk: #5c6b66;
  --color-deep: #2d3b36;

  /* Acentos */
  --color-calm: #b8d4e3;
  --color-sky: #7baac4;
  --color-petal: #e8c4b8;

  /* Primarios */
  --color-warmth: #d4956b;
  --color-terra: #c17a4e;

  /* Semánticos */
  --color-sprout: #a7c4a0;
  --color-meadow: #7ba074;
  --color-blush: #d4a0a0;
  --color-honey: #d4c48a;
}
```

## Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        cloud: "#F7F5F2",
        mist: "#EDE9E3",
        sage: "#C5D1CA",
        stone: "#9BA8A2",
        dusk: "#5C6B66",
        deep: "#2D3B36",
        calm: "#B8D4E3",
        sky: "#7BAAC4",
        petal: "#E8C4B8",
        warmth: "#D4956B",
        terra: "#C17A4E",
        sprout: "#A7C4A0",
        meadow: "#7BA074",
        blush: "#D4A0A0",
        honey: "#D4C48A",
      },
    },
  },
};
```

---

## Reglas de aplicación

### Fondos

- Fondo general de la app: `cloud`
- Cards, sidebars, modals: `mist`
- Secciones destacadas o alternadas: `mist` sobre `cloud`
- Nunca usar blanco puro (`#FFFFFF`); siempre `cloud` o `mist`

### Texto

- Títulos y headings: `deep`
- Texto body y párrafos: `dusk`
- Texto secundario, captions, timestamps: `stone`
- Placeholders de inputs: `stone`
- Texto sobre fondo oscuro (`deep`): `cloud`

### Bordes y separadores

- Bordes de inputs, cards, tablas: `sage`
- Dividers horizontales: `sage` con opacidad al 60%
- Focus ring de inputs: `sky`

### Botones

| Tipo        | Fondo        | Texto     | Hover                  | Sombra                   |
| ----------- | ------------ | --------- | ---------------------- | ------------------------ |
| Primario    | `warmth`     | `#FFFFFF` | `terra`                | `warmth` al 25% opacidad |
| Secundario  | transparente | `dusk`    | `mist`                 | ninguna                  |
| Ghost       | transparente | `sky`     | `calm` al 20%          | ninguna                  |
| Destructivo | `blush`      | `deep`    | `blush` oscurecido 10% | ninguna                  |

### Badges y tags

| Contexto          | Fondo           | Texto    |
| ----------------- | --------------- | -------- |
| Impacto social    | `sprout` al 20% | `dusk`   |
| Premium / Pro     | `honey` al 25%  | `terra`  |
| Categoría         | `calm` al 25%   | `dusk`   |
| Estado completado | `sprout` al 20% | `meadow` |
| Estado pendiente  | `honey` al 25%  | `dusk`   |
| Estado cancelado  | `blush` al 20%  | `dusk`   |

### Impacto social

- Barra de progreso de donación: gradiente de `sprout` a `meadow`
- Monto recaudado: `meadow` en bold
- Indicador "10% va a causa": badge con fondo `sprout` al 15%
- Página de causas: headers con acento `meadow`

### Alerts y feedback

| Tipo    | Borde izquierdo | Fondo           | Icono              |
| ------- | --------------- | --------------- | ------------------ |
| Info    | `sky`           | `calm` al 15%   | `sky`              |
| Success | `meadow`        | `sprout` al 15% | `meadow`           |
| Warning | `honey`         | `honey` al 15%  | `terra`            |
| Error   | `blush`         | `blush` al 15%  | `blush` oscurecido |

### Inputs y formularios

- Fondo del input: `#FFFFFF` (excepción al "no blanco puro" para contraste con `cloud`)
- Borde default: `sage`
- Borde focus: `sky` con ring `calm` al 30%
- Borde error: `blush`
- Label: `dusk`
- Helper text: `stone`

---

## Tipografía recomendada

| Elemento    | Font    | Peso | Tamaño |
| ----------- | ------- | ---- | ------ |
| H1          | DM Sans | 700  | 36px   |
| H2          | DM Sans | 700  | 28px   |
| H3          | DM Sans | 600  | 20px   |
| Body        | DM Sans | 400  | 15px   |
| Caption     | DM Sans | 500  | 13px   |
| Code / Mono | DM Mono | 400  | 13px   |
| Button      | DM Sans | 600  | 14px   |
| Badge       | DM Sans | 600  | 11px   |

---

## Sombras

```css
--shadow-sm: 0 1px 4px rgba(45, 59, 54, 0.06);
--shadow-md: 0 4px 12px rgba(45, 59, 54, 0.08);
--shadow-lg: 0 8px 30px rgba(45, 59, 54, 0.12);
--shadow-cta: 0 4px 16px rgba(212, 149, 107, 0.25);
```

## Border radius

```css
--radius-sm: 8px; /* Inputs, badges pequeños */
--radius-md: 12px; /* Cards, dropdowns */
--radius-lg: 16px; /* Modals, panels grandes */
--radius-xl: 20px; /* Secciones hero, containers */
--radius-full: 100px; /* Botones pill, avatares */
```

---

## Ejemplo de uso en componentes

### Card de servicio

```jsx
<div className="bg-mist rounded-lg p-6 border border-sage/40 shadow-sm">
  <span className="bg-sprout/20 text-dusk text-xs font-semibold px-2.5 py-1 rounded-full">
    10% impacto social
  </span>
  <h3 className="text-deep font-bold text-lg mt-3">Diseño de marca completo</h3>
  <p className="text-stone text-sm mt-1">Logo, paleta y guía de estilo.</p>
  <div className="flex justify-between items-center mt-4">
    <span className="text-deep font-bold text-xl">$450</span>
    <button className="bg-warmth hover:bg-terra text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-cta">
      Contratar
    </button>
  </div>
</div>
```

### Badge Pro

```jsx
<span className="bg-honey/25 text-terra text-xs font-semibold px-2.5 py-1 rounded-full">
  PRO
</span>
```

### Alert de éxito

```jsx
<div className="bg-sprout/15 border-l-4 border-meadow rounded-md p-4">
  <p className="text-dusk text-sm">
    Orden completada. Se destinó el 10% a la causa.
  </p>
</div>
```
