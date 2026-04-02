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
