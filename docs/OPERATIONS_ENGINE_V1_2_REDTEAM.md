# Operations Engine V1.2 — Architectural + Contract Red-Team

**Estado:** staging / draft / no merge
**PR:** #27
**Commit analizado antes de esta corrección:** `b4f2508…`

## Pregunta de red-team

La integración debe ser una superficie que **consume, adapta y observa** la verdad canónica, no un segundo cerebro jurídico. La revisión del repositorio confirma que el riesgo principal estaba en `contracts.ts`: el PR había reimplementado en frontend un subconjunto de los schemas jurídicos y estados que Psyche-creation ya gobierna.

## Frontera de responsabilidades

| Superficie | Propiedad |
|---|---|
| Psyche-creation | Claims, fuentes, registro oficial, jurisdicción, hashes, `estado`, `revision_humana`, `gate_arte`, anti-duplicados jurídicos y validación canónica. |
| legalmente-web | Producto/UX, presentación de metadatos, rutas de QA y adaptación de un envelope de transporte. |
| Contrato entre ambos | `CanonicalEnvelope`: versión de contrato, sistema origen, revisión, digest, referencia al payload canónico, estado opaco y timestamp de recepción. |
| Nunca duplicar | Schema de claim packet, clasificación jurídica, techo jurisdiccional, cálculo de gates, hash canónico, decisión humana y autorización de publicación. |

## Hallazgos y reparación

### Schema y jurisdicción

El schema canónico de Psyche-creation es `schema_version: 4.0` y modela una pieza con uno o varios claims, fuentes por claim, `jurisdicciones_cubiertas`, registro oficial único, verificación de origen/texto/vigencia, revisión humana y gates calculados. La jurisdicción no se reduce a `law + article + territory`: existen `CAPA_A_TRANSVERSAL`, `CAPA_B_VARIABLE`, `CAPA_C_NACIONAL`, `NO_DETERMINADO` y `NO_APLICA`, además de claims con varias fuentes y cobertura por país.

El `PrimarySourceSchema` local se eliminó porque forzaba una representación jurídica incompleta y podía divergir. El frontend ya no valida `law`, `article`, `territory`, claims, hashes ni `LIVE`; recibe una referencia opaca a la salida canónica y rechaza solo un envelope malformado o con drift estructural.

### Datos agregados

Los contadores V1.2 son snapshots derivados de la entrega auxiliar, no estado operativo vivo. La integración los etiqueta como metadatos de QA y no los usa para decidir gates, claims o publicación. Una futura conexión debe transportar `sourceRevision`, `provenanceDigest` y `receivedAt`; si faltan o cambian, el adapter debe fallar cerrado.

### Fail-closed

Se añadieron seis casos contractuales ejecutados por la superficie: envelope vacío falla; envelope válido pasa; estados canónicos `LIVE` y `APPROVED` permanecen opacos y no son autorizados por la web; un campo extra falla por schema drift; y `NO_APLICA` puede transportarse sin forzarlo artificialmente a `law + article`. Las decisiones jurídicas de esos estados siguen perteneciendo a Psyche-creation.

## Clasificación de componentes

| Componente | Clasificación | Justificación |
|---|---|---|
| `src/lib/operations-engine/contracts.ts` | REPAIR | Se redujo de schema jurídico duplicado a DTO de frontera estricto. |
| `src/lib/operations-engine/validate.ts` | REPAIR | Valida solo transporte; delega verdad jurídica al sistema canónico. |
| `src/lib/operations-engine/contract-cases.ts` | EXTEND | Añade pruebas de drift y estados opacos sin claims reales. |
| `/operations-engine` | CONNECT | Consume el adapter y hace observable el resultado de QA. |
| `src/data/operations-engine-v1-2.ts` | KEEP | Se conserva como snapshot editorial explícito; no es estado vivo ni autoridad. |
| PR #27 | EXTEND | Permanece draft, sin merge ni deploy. |

## Failure behavior

Si Psyche-creation no responde, falta el digest, cambia la versión del contrato, aparece un estado desconocido o falta evidencia canónica, la web no debe inferir, completar ni degradar silenciosamente: debe mostrar estado bloqueado y conservar el error para QA. La web no puede convertir un `APPROVED` opaco en autorización ni un `LIVE` opaco en publicación.

## Contract test futuro

El contrato mínimo permite un test entre repositorios: Psyche-creation produce un fixture de envelope con `sourceRevision` y `provenanceDigest`; legalmente-web valida únicamente la forma del envelope y verifica que cualquier cambio de versión, digest, referencia o campo extra falle cerrado. El test no debe reimplementar la semántica de claims ni el cálculo de jurisdicción.

## Resultado

Después de la reparación, Operations Engine es inequívocamente una superficie de producto/QA que consume una frontera canónica, no un segundo sistema jurídico paralelo.
