---
name: Next Content Architecture
title: "Next.js: Arquitectura de Contenido Escalable"
owner: vercel-labs/agent-skills
description: Estructura proyectos Next con app router, MDX y edge rendering para documentación dinámica lista para agentes.
installs: 263700
position: 2
level: foundation
stack:
  - Next.js
  - MDX
  - Edge
updatedAt: "2026-01-28"
rating: 4.6
trending: true
hot: false
---

# Next.js: Arquitectura de Contenido Escalable

App Router + MDX + Edge para que agentes sirvan docs/skills con caching y rutas limpias.

## Cuándo usar
- Necesitas servir contenido (docs, skills, changelogs) generado por LLMs con metadata fuerte.
- Requieres rutas estáticas + fallback ISR y APIs ligeras en Route Handlers.
- Quieres que agentes puedan leer/editar MDX manteniendo tipado y validación.

## Playbook rápido
1) **Carpeta `/content`** con MDX y frontmatter validado por Zod.  
2) **Server Components** para lectura/render; **Client Islands** solo en filtros/búsqueda.  
3) **Route Handlers** (`app/api/skills/[slug]/route.ts`) para exponer JSON a agentes.  
4) **ISR**: `revalidate` por skill con fallback `blocking` para nuevos slugs.  
5) **Edge runtime** para páginas públicas; Node sólo cuando requieras SDKs no edge-safe.

## Anti‑patrones a bloquear
- Parsear Markdown en cada request sin cache.
- Meter SDKs pesados (SDK AWS) en server components; envolverlos en helpers server-only.
- Duplicar layouts para mobile/desktop; usa CSS responsivo.

## Observabilidad y pruebas
- Añade `next build --profile` y `next-bundle-analyzer` para mantener el JS inicial <200kb.
- Monitorea ISR con logs (`x-middleware-cache`) y métricas de revalidación.
- Integra `@next/font` para evitar FOUT y reducir solicitudes.

## Snippet guía

```ts
export const skillSchema = z.object({
  title: z.string(),
  stack: z.array(z.string()),
  level: z.enum(["foundation", "advanced", "expert"]),
  updatedAt: z.string(),
});
```

## Checklist para el agente
- [ ] Frontmatter validado con Zod.
- [ ] Rutas en App Router con SSG + ISR.
- [ ] Búsqueda/filtros como client island, resto server components.
- [ ] API JSON en Route Handler para consumo de bots.

## Fuentes
- Next.js App Router
- MDX best practices
