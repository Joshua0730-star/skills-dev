---
name: Design Tokens System
title: "Design Tokens: Sistemas temáticos listos para agentes"
owner: design-tokens/skills
description: Plantilla y reglas para que agentes definan, versionen y consuman design tokens (color, tipografía, spacing) en proyectos multi-framework.
installs: 175600
position: 9
level: foundation
stack:
  - Design Systems
  - Tokens
  - CSS
updatedAt: "2026-04-02"
rating: 4.5
trending: false
hot: false
---

# Design Tokens: Sistemas temáticos listos para agentes

Estructura un set de tokens multi-plataforma que agentes puedan leer, versionar y aplicar de forma consistente.

## Activación rápida
- Úsala cuando el agente deba crear o modificar estilos compartidos (web/mobile/email) o migrar de hard-coded CSS a tokens.
- Pide: paleta base, fuentes permitidas, densidad/espaciado preferido, modos (light/dark/high-contrast) y formato de salida (CSS/JSON/Style Dictionary).

## Mapa de cobertura (prioridad → prefijo)
| Prioridad | Categoría | Impacto | Prefijo |
| --- | --- | --- | --- |
| 1 | Estructura y naming | Escalabilidad y coherencia | `core-` |
| 2 | Colores y accesibilidad | Contraste y modo dual | `color-` |
| 3 | Tipografía y ritmo | Jerarquía visual | `type-` |
| 4 | Espaciado y layout | Consistencia y ritmo | `space-` |
| 5 | Distribución/CI | Publicación confiable | `ship-` |

## Referencia rápida
- `core-tree` — Tokens en niveles: **core** (raw), **semantic** (bg/fg/primary), **component** (button/bg). Naming BEM-like `color.surface.primary`.
- `color-contrast` — Paleta con pares light/dark y contraste ≥4.5:1; incluye `neutral`, `accent`, `info`, `warning`, `danger`, `success`.
- `type-scale` — Escala modular (1.25/1.333), tokens `font.family`, `font.size.*`, `line.height.*`, `letter.spacing.*`.
- `space-grid` — Paso base 4/8; tokens `space.xs/sm/md/lg/xl/2xl`; incluye radii y sombras.
- `ship-ci` — Export JSON + CSS variables + TS types; versionado semver; changelog y snapshots visuales.

## Playbook rápido
1) Define `core-tree` y nombres.  
2) Crea `color-contrast` con modos light/dark y tokens semánticos.  
3) Añade `type-scale` y estilos de encabezado/parrafo.  
4) Publica `space-grid` y radii/shadows.  
5) Automatiza `ship-ci` (Style Dictionary/GitHub Actions) para generar salidas múltiples.

## Snippet guía
```css
:root {
  --color-surface: hsl(210 20% 98%);
  --color-surface-contrast: hsl(220 15% 12%);
  --space-md: 16px;
  --radius-md: 12px;
}

.dark {
  --color-surface: hsl(220 15% 12%);
  --color-surface-contrast: hsl(210 20% 98%);
}
```

## Checklist para el agente
- [ ] Tokens core/semantic/component definidos.
- [ ] Modos light/dark con contraste validado.
- [ ] Escala tipográfica documentada.
- [ ] Espaciado/radii/shadows normalizados.
- [ ] Build CI genera JSON + CSS + TS.

## Fuentes
- W3C Design Tokens Community Group
- Style Dictionary Docs
