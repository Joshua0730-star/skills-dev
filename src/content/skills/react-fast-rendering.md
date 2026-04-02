---
name: React Fast Rendering
title: "React: Fast Rendering & Clean Patterns"
owner: anthropics/skills
description: Optimiza componentes React para agentes de IA con composición clara, memoization medida y división inteligente de UI.
installs: 787500
position: 1
level: advanced
stack:
  - React
  - TypeScript
updatedAt: "2026-02-10"
rating: 4.8
trending: true
hot: true
---

# React: Fast Rendering & Clean Patterns

Optimiza componentes para agentes de IA con composición clara, límites de render y contratos tipados.

## Cuándo usar
- El agente necesita generar/editar componentes sin degradar FPS ni TTI.
- Hay listas o dashboards que cambian frecuentemente y producen re-renders masivos.
- Debes exponer patrones de memoization seguros para tooling automático (codemods, linters).

## Playbook rápido
1) **Contratos claros**: define props con tipos exactos y evita `any`.  
2) **División inteligente**: usa `React.lazy/Suspense` para trocear UI pesada.  
3) **Memo selectivo**: aplica `memo/useMemo/useCallback` solo tras medir (Profiler).  
4) **Estado derivado**: deriva datos caros en `useMemo`; evita objetos inline en props.  
5) **Server Components** (cuando estés en Next.js App Router) para contenido estático.

## Anti‑patrones a bloquear
- Objetos/funciones inline en listas grandes.
- Estado global mutable sin selectores; usa `zustand` + `selector` o Redux Toolkit.
- Hooks que mezclan efectos (fetch + timers + resize) en un solo `useEffect`.

## Observabilidad y pruebas
- Habilita React Profiler en CI para capturar commits lentos (`react-devtools-core` + `--profiler`).
- Añade ESLint con `eslint-plugin-react-hooks` y reglas de exhaustive deps.
- Medir TTFB/CLS con `web-vitals` y reportar a Datadog/New Relic.

## Snippet guía

```tsx
type CardProps = {
  title: string;
  metrics: number[];
};

const MetricsCard = memo(function MetricsCard({ title, metrics }: CardProps) {
  const peak = useMemo(() => Math.max(...metrics), [metrics]);
  return (
    <section className="card">
      <h3>{title}</h3>
      <strong>{peak}</strong>
    </section>
  );
});
```

## Checklist para el agente
- [ ] Props tipadas y documentadas.
- [ ] Sin objetos inline en listas.
- [ ] Suspense en límites de carga pesada.
- [ ] Medición de renders con Profiler antes/después.

## Fuentes
- React Docs – Performance
- Next.js Patterns
