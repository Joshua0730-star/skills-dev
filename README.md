# Skills Web

Web ultra-rápida construida con **Astro + Tailwind** para catalogar Skills.md con buenas prácticas de stacks como React, Next.js, FastAPI y más. Pensada para que agentes de IA naveguen un leaderboard compacto y abran cada skill en su ficha Markdown renderizada con Content Collections.

## Características actuales

- Leaderboard en 3 columnas (posición, nombre/owner, installs) inspirado en skills.sh.
- Filtro por pestañas (All / Trending / Hot) y búsqueda instantánea sin recargar.
- Cada skill vive en `src/content/skills/*.md` y se valida con schema Zod en Content Collections.
- Ruta de detalle `/skills/[slug]/` que muestra el Markdown con metadatos (stack, nivel, installs).
- Paleta pastel clara optimizada para lectura en modo light.

## Configuración

```bash
npm install
npm run dev    # servidor en http://localhost:4321
npm run build  # compila a ./dist
npm run preview
```

## Estructura relevante

```
src/
 ├─ content/config.ts        # Schema de Content Collections
 ├─ content/skills/*.md      # Skills en Markdown + frontmatter
 ├─ pages/index.astro        # Leaderboard y filtros
 ├─ pages/skills/[slug].astro# Ficha individual renderizando Markdown
 ├─ layouts/Layout.astro     # Shell y metadatos
 └─ styles/global.css        # Tema claro pastel y tokens globales
```

## Cómo agregar nuevas Skills

1. Crea un archivo markdown en `src/content/skills/` (ej. `mi-skill.md`). Usa el frontmatter:

```yaml
---
name: Mi Skill
title: Título descriptivo
owner: mi-org/skills
description: Resumen corto
installs: 1200
position: 7
level: advanced # foundation | advanced | expert
stack: [React, TypeScript]
updatedAt: "2026-04-01"
rating: 4.7
trending: true
hot: false
---
## Haz
- ...
```

2. El leaderboard y la ficha se generan automáticamente; no se requiere código adicional.

## Roadmap sugerido

1. Conectar contenido con un repo/cms (ej. GitHub + MDX) y pipelines de publicación.
2. Añadir métricas reales para installs y trending (Supabase, Tinybird, etc.).
3. Implementar autenticación ligera para colaboradores / contribuciones.
4. Exponer API para agentes (REST/GraphQL) con throttling y métricas.
5. Internacionalización y tema oscuro opcional.

## Referencias visuales

- https://agents.md/
- https://ui.shadcn.com/
- https://vercel.com/templates

---

Contribuciones y sugerencias son bienvenidas. Mantén el enfoque en documentación clara, rápida y lista para agentes de IA.
