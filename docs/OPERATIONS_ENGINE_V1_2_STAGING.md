# Operations Engine V1.2 — staging frontend

Esta rama integra únicamente una superficie interna de QA y contratos de validación para Operations Engine V1.2. No es una publicación comercial y no reemplaza las fuentes canónicas.

## Integración

La ruta `/operations-engine` muestra metadatos derivados, conteos y gates. No contiene claims jurídicos listos para publicación, PII ni controles para activar producción.

`src/lib/operations-engine/contracts.ts` contiene los esquemas Zod para `PrimarySource`, `WorkflowState` y `ClaimManifest`. `src/lib/operations-engine/validate.ts` añade la política local: aunque el contrato conserva `APPROVED` y `LIVE` por compatibilidad, V1.2 rechaza ambos estados hasta que exista revisión humana explícita.

## Resultado QA

| Control | Resultado |
|---|---|
| `next build` | Pasó; compilación, lint, tipos y generación estática correctos |
| Ruta nueva | `/operations-engine` prerenderizada |
| `git diff --check` | Pasó |
| PII en la integración nueva | No detectada; la coincidencia de `email` pertenece al formulario preexistente de contacto |
| `publicationState=LIVE` | Bloqueado por política V1.2 |
| n8n / analytics / publicación | No activados |

## Límites

No se fusiona esta rama a `main`, no se crea release y no se marca ningún artefacto como `LIVE`. La aprobación humana final queda fuera de esta ejecución.
