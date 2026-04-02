---
name: API Security OWASP
title: "APIs seguras: OWASP Top 10 para agentes"
owner: owasp/skills
description: Patrón operativo para que agentes diseñen y auditen APIs REST/GraphQL alineadas a OWASP API Top 10.
installs: 198400
position: 8
level: foundation
stack:
  - API
  - Security
  - OWASP
updatedAt: "2026-04-02"
rating: 4.6
trending: true
hot: false
---

# APIs seguras: OWASP Top 10 para agentes

Guía concreta para diseñar, revisar y probar APIs generadas por agentes contra las principales categorías OWASP.

## Activación rápida
- Usa esta skill antes de exponer endpoints creados por un agente o al auditar APIs existentes.
- Confirma: mecanismo de auth (JWT/OAuth), límites de uso, datos sensibles involucrados y entorno (prod/pre).

## Mapa de cobertura (prioridad → prefijo)
| Prioridad | Riesgo OWASP API | Impacto | Prefijo |
| --- | --- | --- | --- |
| 1 | Broken Object Level Auth (BOLA) | Fuga de datos cruzando IDs | `auth-` |
| 2 | Excessive Data Exposure | Datos sensibles filtrados | `data-` |
| 3 | Lack of Rate Limiting | DoS/abuso | `limit-` |
| 4 | Injection & Mass Assignment | Corrupción de datos | `inj-` |
| 5 | Security Misconfiguration | Config frágil | `cfg-` |
| 6 | Logging & Monitoring | Detección tardía | `obs-` |

## Referencia rápida
- `auth-object` — Autorización a nivel de recurso (owner/tenant); nunca confiar en IDs del cliente.
- `data-min` — Campos mínimos en respuestas; filtra por DTO; cifra en tránsito y en reposo; enmascara logs.
- `limit-quota` — Rate limit por IP/key/tenant; protección de burst y soft quotas.
- `inj-validate` — Validación de entrada (schema); parámetros preparados; bloquear mass assignment con whitelists.
- `cfg-sec` — HTTPS forzado, CORS restrictivo, HSTS, headers de seguridad, deshabilitar listado de rutas en prod.
- `obs-audit` — Logs estructurados con `trace_id`, `user`, `ip`, resultado; alertas de 401/403/429; revisa tokens expirados.

## Playbook rápido
1) Implementa `auth-object` y validación de identidad por recurso.  
2) Aplica `data-min` en responses; revisa campos sensibles.  
3) Añade `limit-quota` en gateways y rutas críticas.  
4) Habilita `inj-validate` y bloquea mass assignment.  
5) Verifica `cfg-sec` (headers, TLS, CORS).  
6) Conecta `obs-audit` con alertas de abuso.

## Snippet guía
```ts
// Express middleware de autorización por recurso
app.use("/api/projects/:id", async (req, res, next) => {
  const allowed = await canAccess(req.user.id, req.params.id);
  if (!allowed) return res.status(403).json({ error: "forbidden" });
  next();
});
```

## Checklist para el agente
- [ ] Autorización por recurso (BOLA) implementada.
- [ ] DTOs filtran datos sensibles.
- [ ] Rate limits configurados.
- [ ] Validación y sanitización activas.
- [ ] Headers de seguridad presentes.
- [ ] Logs auditables con trazas.

## Fuentes
- OWASP API Top 10
- RFC 9110 (HTTP Semantics)
