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
