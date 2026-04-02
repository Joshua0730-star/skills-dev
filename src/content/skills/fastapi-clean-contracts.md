---
name: FastAPI Clean Contracts
title: "FastAPI: Contratos limpios para agentes"
owner: tiangolo/fastapi-skills
description: Expone servicios con FastAPI listos para agentes, enfatizando validación, caching y observabilidad.
installs: 222200
position: 3
level: expert
stack:
  - FastAPI
  - Python
updatedAt: "2026-02-05"
rating: 4.9
trending: false
hot: true
---

# FastAPI: Contratos limpios para agentes

APIs tipadas, cacheables y trazables para que LLMs consuman y creen recursos sin sorpresas.

## Activación rápida
- Activa esta skill cuando un agente expone/consume endpoints FastAPI y necesitas **contratos estables + observabilidad + límites**.
- Confirma insumos: dominios/recursos, políticas de rate limit, origen de autenticación (API key/JWT), backend de cache (Redis/Memcached) y stack de tracing (OTEL/Jaeger).

## Mapa de cobertura (prioridad → prefijo)
| Prioridad | Categoría | Impacto | Prefijo |
| --- | --- | --- | --- |
| 1 | Contratos y validación | Evita inputs ambiguos y respuestas frágiles | `contract-` |
| 2 | Límite y protección | Protege infra y agentes ruidosos | `limit-` |
| 3 | Caching y performance | Reduce latencia y carga de DB | `cache-` |
| 4 | Observabilidad | Aísla fallos y cuellos de botella | `obs-` |
| 5 | Entregables de agente | Checklist y ejemplos listos para LLM | `ship-` |

## Referencia rápida
- `contract-dto` — DTOs separados `SkillIn/SkillOut`, `response_model` y ejemplos en OpenAPI.
- `limit-rate` — `fastapi-limiter` con Redis, llaves por `agent-id` o API key.
- `cache-idempotent` — GET críticos cacheados con TTL + invalidación por `skill_id`.
- `obs-otel` — Middleware OTEL + logs JSON; propaga `trace_id` a respuestas.
- `ship-health` — Endpoints `/health`, `/metrics`, `/readiness`; tests de contrato con `httpx.AsyncClient`.

## Cómo usar
1) Arranca con `contract-dto` y ejemplos de request/response.  
2) Añade `limit-rate` y `cache-idempotent` para los endpoints de lectura.  
3) Conecta `obs-otel` (traces + logs) y expón `ship-health`.  
4) Ejecuta la checklist del agente y valida en `/docs` que todo está tipado.

## Cuándo usar
- Requieres exponer endpoints estables a agentes (create/update skill, fetch metrics).
- Necesitas validación fuerte y ejemplos en OpenAPI para generación automática de clientes.
- Debes añadir cuotas/ratelimiting por agente o API key.

## Playbook rápido
1) **DTOs separados**: `SkillIn` / `SkillOut` con Pydantic; no expongas modelos ORM.  
2) **Rate limiting**: `fastapi-limiter` con Redis y llave por `agent-id`.  
3) **Observabilidad**: middleware OTEL + logs estructurados (JSON) por request.  
4) **Caching**: `redis.asyncio` para GET críticos; invalida por `skill_id`.  
5) **Health & metrics**: `/health` y `/metrics` Prometheus listos para scraping.

## Anti‑patrones a bloquear
- Endpoints que aceptan blobs JSON sin schema.
- Dependencias globales que se inicializan en runtime y no por DI.
- Respuestas mezclando dominio y ORM (`.dict()` directo de modelos).

## Observabilidad y pruebas
- Tests de contrato con `httpx.AsyncClient` + snapshots de payloads.
- Traza cada request con `opentelemetry-instrumentation-fastapi` y exporta a Jaeger.
- Activa `response_model_exclude_none` y valida ejemplos en `/docs`.

## Snippet guía

```py
@router.post("/skills", response_model=SkillOut, status_code=201)
async def create_skill(payload: SkillIn, svc: SkillService = Depends()):
    skill = await svc.upsert(payload)
    return SkillOut.from_domain(skill)
```

## Checklist para el agente
- [ ] DTOs separados request/response.
- [ ] Rate limit por agente.
- [ ] Cache Redis para GET.
- [ ] Métricas y health checks expuestos.

## Fuentes
- FastAPI Docs
- OpenTelemetry Python
