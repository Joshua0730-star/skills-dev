---
name: Supabase Realtime Monitoring
title: "Supabase: Monitoreo en tiempo real para skills de datos"
owner: supabase-community/skills
description: Habilita canales realtime y funciones edge para que agentes observen métricas sin saturar la base.
installs: 212900
position: 4
level: advanced
stack:
  - Supabase
  - SQL
  - Edge Functions
updatedAt: "2026-02-11"
rating: 4.7
trending: false
hot: false
---

# Supabase: Monitoreo en tiempo real para skills de datos

Canales realtime filtrados y funciones edge para que LLMs observen métricas sin sobrecargar la base.

## Activación rápida
- Empléala al construir feeds en vivo o auditorías para agentes, con Supabase Realtime + Edge Functions.
- Confirma: claves de segmentación (`skill_id`, `agent_id`), políticas RLS, límites por canal y dónde mandar métricas (Prometheus/Grafana).

## Mapa de cobertura (prioridad → prefijo)
| Prioridad | Categoría | Impacto | Prefijo |
| --- | --- | --- | --- |
| 1 | Seguridad (RLS) | Protege datos por skill/usuario | `sec-` |
| 2 | Canales realtime | Ruido mínimo y baja latencia | `rt-` |
| 3 | Edge processing | Normaliza y reduce carga | `edge-` |
| 4 | Performance SQL | Índices y particiones | `sql-` |
| 5 | Observabilidad | Métricas y trazas | `obs-` |

## Referencia rápida
- `sec-rls` — Políticas por `auth.uid()` + `skill_id`; JWT claims en `request.jwt.claims`.
- `rt-filter` — Canales filtrados por `skill_id`; limitar mensajes/min y conexiones.
- `edge-normalize` — Funciones Edge para limpiar payloads y escribir snapshots en Storage.
- `sql-index` — Índices compuestos (`skill_id, created_at desc`); evita full scans.
- `obs-metrics` — Conexiones activas, msgs/seg, tiempos en Prometheus; OTEL para functions.

## Cómo usar
1) Configura `sec-rls`.  
2) Crea `rt-filter` por skill/owner.  
3) Pasa eventos por `edge-normalize`.  
4) Afina `sql-index`.  
5) Activa `obs-metrics` antes de exponer a agentes.

## Cuándo usar
- Dashboards/live feeds consumidos por agentes que necesitan mínima latencia.
- Auditoría de eventos por skill o por agente con trazabilidad.
- Necesidad de normalizar/filtrar payloads antes de publicarlos.

## Playbook rápido
1) **Tablas auditables** con columnas `jsonb` para payload rico + `skill_id`.  
2) **RLS estricta**: políticas por `auth.uid()` y `skill_id`.  
3) **Canales realtime** filtrados por `skill_id` para reducir ruido.  
4) **Edge Functions** para normalizar eventos y agregar snapshots en Storage.  
5) **Backpressure**: emite en lotes pequeños y limita streams por conexión.

## Anti‑patrones a bloquear
- Publicar sin RLS o sin `select` policy explícita.
- Queries sin índices compuestos (ej. `skill_id`, `created_at desc`).
- Streams continuos sin límites de mensajes por minuto.

## Observabilidad y pruebas
- Trazar funciones edge con OTEL; exportar a Grafana/Tempo.
- Métricas de canales (conexiones activas, mensajes/seg) en Prometheus.
- Tests SQL de políticas RLS con `postgrest` y JWTs simulados.

## Snippet guía

```sql
create policy "agent-skill-access" on realtime_logs
for select using (
  auth.uid() = owner_id
  and skill_id = current_setting('request.jwt.claims'::text)::json->>'skill'
);
```

## Checklist para el agente
- [ ] Política RLS por skill_id y usuario.
- [ ] Canal realtime filtrado.
- [ ] Edge function normalizando eventos.
- [ ] Índices para filtros frecuentes.

## Fuentes
- Supabase Realtime
- Edge Functions
