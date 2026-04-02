---
name: Remix Streaming UI
title: "Remix: UI streaming para skills colaborativas"
owner: remix-run/skills
description: Implementa rutas Remix que emiten streams parciales para mostrar progreso de tareas largas a agentes.
installs: 146900
position: 6
level: advanced
stack:
  - Remix
  - Tailwind
  - Vercel
updatedAt: "2026-02-08"
rating: 4.4
trending: false
hot: false
---

# Remix: UI streaming para skills colaborativas

Deferred loaders y streams para mostrar progreso en tareas largas a agentes y humanos.

## Activación rápida
- Aplica cuando una ruta Remix debe mostrar progreso incremental (SSE/NDJSON) o combinar datos rápidos con flujos lentos.
- Define: tamaño máximo de stream, formato (NDJSON/SSE), límites de reintento y métricas a exponer.

## Mapa de cobertura (prioridad → prefijo)
| Prioridad | Categoría | Impacto | Prefijo |
| --- | --- | --- | --- |
| 1 | Loader & datos | Dividir payload y priorizar TTFB | `loader-` |
| 2 | Streaming & protocolos | Formatos y backpressure | `stream-` |
| 3 | UX progresiva | Suspense/Boundaries y fallback | `ux-` |
| 4 | Resiliencia | Abortos, timeouts, retries | `res-` |
| 5 | Observabilidad | Métricas y trazas | `obs-` |

## Referencia rápida
- `loader-defer` — `defer()` con `summary` inmediato + stream `timeline`.
- `stream-ndjson` — Logs/progreso como NDJSON/SSE; chunk pequeño y estable.
- `ux-boundary` — Suspense por sección; placeholders livianos.
- `res-abort` — Manejo de `AbortSignal`, cancelación de fetch y propagación al stream.
- `obs-ttfb` — Medir TTFB/primer chunk; tracing OTEL; comprimir con Brotli.

## Cómo usar
1) Diseña el payload con `loader-defer`.  
2) Envía progreso con `stream-ndjson`.  
3) Añade `ux-boundary` y placeholders.  
4) Implementa `res-abort`.  
5) Monitorea con `obs-ttfb`.

## Cuándo usar
- Tareas largas (procesar repo, generar documentación) donde necesitas feedback incremental.
- Mezclar datos rápidos (metadata) con flujos lentos (logs, resultados parciales).
- Publicar progreso en SSE/NDJSON para que un agente observe estados.

## Playbook rápido
1) **Loader dividido**: `defer` con `summary` inmediato y `timeline` stream.  
2) **Suspense boundaries** por sección para evitar bloquear toda la vista.  
3) **NDJSON**: envía logs/progreso como líneas para fácil parseo por LLM.  
4) **AbortSignal**: cancela fetches si el usuario/agente cierra la vista.  
5) **Brotli + cache** en Vercel Edge para objetos grandes.

## Anti‑patrones a bloquear
- Esperar a que termine todo antes de renderizar.
- No comprimir respuestas grandes.
- Ignorar aborts y dejar fetches colgando.

## Observabilidad y pruebas
- Mide TTFB y tiempo hasta primer chunk; reporta con `web-vitals`.
- Testea loaders con `createMemoryRouter` y mocks de streams.
- Traza SSE con OTEL para ver cuellos de botella.

## Snippet guía

```ts
export async function loader() {
  const meta = await getSummary();
  const stream = defer({
    summary: meta,
    timeline: getTimelineStream(),
  });
  return stream;
}
```

## Checklist para el agente
- [ ] `defer` aplicado con payload dividido.
- [ ] Suspense boundaries por sección.
- [ ] NDJSON/SSE para progreso.
- [ ] AbortSignal manejado.

## Fuentes
- Remix Deferred
- Streaming en Vercel
