---
name: Core Web Vitals Playbook
title: "Core Web Vitals: Guía operativa para agentes"
owner: webperf/skills
description: Checklist accionable para mejorar LCP, INP y CLS en sitios servidos/creados por agentes con Next.js/React.
installs: 254300
position: 7
level: advanced
stack:
  - Web Perf
  - React
  - Next.js
updatedAt: "2026-04-02"
rating: 4.7
trending: true
hot: false
---

# Core Web Vitals: Guía operativa

Playbook directo para bajar LCP/INP/CLS en builds generados o ajustados por agentes.

## Activación rápida
- Activa cuando un agente crea/optimiza páginas y debes cumplir CWV (LCP <2.5s, INP <200ms, CLS <0.1).
- Pide: hosting (Edge/Node), métricas actuales, tamaño de hero media, fuentes usadas, y si hay anuncios/iframes.

## Mapa de cobertura (prioridad → prefijo)
| Prioridad | Categoría | Métrica | Prefijo |
| --- | --- | --- | --- |
| 1 | Render inicial | LCP | `lcp-` |
| 2 | Interacción | INP | `inp-` |
| 3 | Estabilidad visual | CLS | `cls-` |
| 4 | Delivery & caché | Todas | `net-` |
| 5 | Observabilidad | Todas | `obs-` |

## Referencia rápida
- `lcp-hero` — Hero en HTML inicial (RSC/SSR), `priority` en `<Image>`, precarga de fuente/hero, reducción de CSS crítico.
- `inp-handlers` — Evita trabajo pesado en handlers; usa `useTransition`, `requestIdleCallback`; divide bundles; desactiva listeners globales innecesarios.
- `cls-guards` — Reserva espacio (`aspect-ratio`, `height`) para imágenes/iframes/ads; evita late-loading fonts sin `font-display: swap`.
- `net-cache` — CDN + cache tags, compresión Brotli, HTTP/2 push hints (`rel=preload`) para fuentes y hero.
- `obs-rum` — `web-vitals` + envío a APM; compara lab vs field; alerta si percentil p75 se degrada.

## Playbook rápido
1) **Hero primero:** comprime/optimiza hero, `priority` y tamaño fijo (`aspect-ratio`).  
2) **Fuentes:** `next/font` o preload; evita FOIT.  
3) **JS mínimo:** split por ruta; quita librerías no usadas; evita hydrate inútil en hero.  
4) **Interacción:** handlers ligeros, `useDeferredValue` en inputs de búsqueda.  
5) **Estabilidad:** espacios reservados para medios/ads; sticky con `top`.  
6) **Medir:** `next/script` con `reportWebVitals` a tu endpoint; comparar p75 vs objetivo.

## Snippet guía
```tsx
// reportWebVitals.ts
import type { ReportCallback } from "web-vitals";

export function reportWebVitals(metric: any) {
  fetch("/api/vitals", {
    method: "POST",
    keepalive: true,
    body: JSON.stringify(metric),
  });
}
```

## Checklist para el agente
- [ ] Hero optimizado y prerenderizado.
- [ ] Fonts con preload y `display: swap`.
- [ ] Reservas de espacio para imágenes/iframes.
- [ ] Bundle inicial <200kb y dividido.
- [ ] RUM activo reportando CWV.

## Fuentes
- web.dev/vitals
- Next.js Performance Docs
