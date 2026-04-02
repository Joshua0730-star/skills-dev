---
name: LangChain Safe Tools
title: "LangChain: Tooling seguro y observable"
owner: langchain-ai/skills
description: Define herramientas controladas con validación fuerte y logging estructurado para agentes LangChain.
installs: 189800
position: 5
level: foundation
stack:
  - LangChain
  - Python
  - OpenAI
updatedAt: "2026-02-09"
rating: 4.5
trending: true
hot: false
---

# LangChain: Tooling seguro y observable

Tools tipadas, con límites y trazas para que los LLMs ejecuten acciones críticas sin riesgos.

## Cuándo usar
- Necesitas exponer acciones (consultar métricas, crear issues, disparar deploy) a un agente.
- Requieres auditoría y límites por agente/entorno.
- Quieres que los argumentos estén validados y documentados para autogenerar UIs/prompts.

## Playbook rápido
1) **Args tipados** con Pydantic (`args_schema`) y ejemplos.  
2) **Gateways**: wrap de clientes HTTP con timeouts, retires y circuit breakers.  
3) **Tracing**: LangSmith u OTEL en cada tool para saber qué hizo el agente.  
4) **Feature flags**: habilita/deshabilita tools por entorno y rol.  
5) **Rate limit**: Redis/Upstash con cuotas por `agent-id`.

## Anti‑patrones a bloquear
- Tools que aceptan prompt libre y lo pasan directo a APIs.
- Exponer secrets en logs o en excepciones.
- Llamar SDKs pesados síncronamente dentro de bucles del agente.

## Observabilidad y pruebas
- Logs estructurados (JSON) con `tool_name`, `agent_id`, `duration_ms`, `args`.
- Tests de contrato con fixtures simulando respuestas externas.
- Replay seguro: guarda inputs/outputs para reproducir decisiones del agente.

## Snippet guía

```py
class MetricsInput(BaseModel):
    project_id: str
    window_minutes: conint(le=60)

@tool("fetch_metrics", args_schema=MetricsInput)
def fetch_metrics(project_id: str, window_minutes: int):
    with tracer.start_as_current_span("metrics"):
        return svc.get(project_id, window_minutes)
```

## Checklist para el agente
- [ ] Args tipados y validados.
- [ ] Timeout y retry definidos.
- [ ] Logging + tracing activo.
- [ ] Rate limit por agente/entorno.

## Fuentes
- LangChain Tools
- LangSmith Tracing
