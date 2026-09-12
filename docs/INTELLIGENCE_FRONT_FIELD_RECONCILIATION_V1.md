# LegalMente — Reconciliación del frente de inteligencia V1

**Estado:** `IMPLEMENTATION_CANDIDATE` · `NOT_MERGED` · `NOT_DEPLOYED` · `NOT_PUBLISHED`

## Propósito

Este documento convierte el diagnóstico del mapa de capa de inteligencia en una primera implementación funcional y reversible. Unifica los tres objetos del frente: señal, clasificación de necesidad y candidato de tema. Radar deja de ser un contrato aislado y se representa como una proyección trazable del candidato, sin convertirse en autoridad jurídica.

## Flujo implementado

```text
Signal -> NeedClassification -> TopicCandidate -> RadarSignal
```

Cada salto conserva el identificador del objeto anterior. La cadena puede validarse, persistirse en un archivo JSON local y reconstruirse sin inferir relaciones por similitud textual.

## Campos canónicos compartidos

| Campo | Definición | Tipo | Procedencia | Obligatorio |
|---|---|---|---|---|
| `concern` | Problema, duda o tensión observable que origina la señal | string | Captura o clasificación humana/editorial | Sí |
| `functionalContext` | Situación funcional en la que aparece la necesidad | string | Captura editorial o clasificación | Sí |
| `scope` | Alcance inicial, territorio o límite conocido | string | Captura y revisión | Sí |
| `subject` | Materia o sujeto de trabajo, sin convertirlo en claim | string | Captura y clasificación | Sí |

Estos campos son descriptivos y no sustituyen los `legalDomainIds`, fuentes, claims o bindings canónicos de Psyche-creation.

## Objetos y estados

| Objeto | Identificador | Estado | Función |
|---|---|---|---|
| `Signal` | `SIG-*` | `CAPTURED` | Registra una señal no sensible y su fuente. |
| `NeedClassification` | `NEED-*` | `CLASSIFIED` | Clasifica el tipo de necesidad, audiencia y confianza de la clasificación. |
| `TopicCandidate` | `TOPIC-*` | `CANDIDATE` | Convierte una necesidad en una pregunta investigable, aún sin autoridad jurídica. |
| `RadarSignal` | `RADAR-*` | `ROUTED` | Proyecta frescura y prioridad editorial; no representa demanda medida salvo que exista un registro de medición explícito. |

## Reglas de seguridad y autoridad

La captura rechaza correo electrónico, teléfono, expediente, folio, CLABE, cuenta y patrones equivalentes. El almacén inicial contiene cero registros. No hay captura pública ni `localStorage`; esta primera entrega es una librería de servidor y archivo auditable.

El motor no crea claims, fuentes, jurisdicciones definitivas ni gates legales. `legalReadiness` empieza en `NOT_ASSESSED`; el candidato debe pasar por investigación y binding canónico antes de adaptación concluyente. `MEASURED_FIRST_PARTY` está bloqueado en Radar hasta que se implemente un registro de medición separado con identidad canónica y procedencia.

## Persistencia

`FileIntelligenceFrontRepository` guarda `data/intelligence/front-store.json` mediante archivo temporal y `rename`, valida todo el documento antes de escribir y produce un digest SHA-256. El archivo es deliberadamente pequeño y reemplazable por una base de datos cuando exista un requisito de concurrencia o volumen; no se crea una arquitectura paralela en esta fase.

## Evidencia y siguiente integración

La implementación demuestra captura, validación, trazabilidad y recarga local. No demuestra todavía captura de señales reales, rendimiento de Radar ni mejora de audiencia. El siguiente paso seguro es conectar una fuente explícitamente autorizada y no sensible mediante `appendSignal`, registrar su procedencia y mantener la revisión humana antes de generar claims o contenido.

## Rollback

Eliminar `src/lib/intelligence-front/`, `data/intelligence/front-store.json` y este documento revierte la contribución sin tocar la autoridad legal, los contratos editoriales existentes, la publicación ni los datos de usuarios.
