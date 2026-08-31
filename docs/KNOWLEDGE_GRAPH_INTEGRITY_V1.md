# LegalMente — Knowledge Graph Integrity V1

## Gap cerrado

El Knowledge Engine ya contenía mundos, series, capítulos, conceptos, procesos y rutas de aprendizaje, pero no tenía un gate que comprobara que sus relaciones continuaban resolviendo después de una edición. El riesgo era una ruta huérfana: una página podía apuntar a un concepto, proceso, capítulo o mundo inexistente, o una serie podía declarar un capítulo cuya pertenencia interna no coincidiera.

## Contrato implementado

`src/lib/knowledge-graph/integrity.ts` valida de forma pura y fail-closed las colecciones actuales. Comprueba IDs duplicados, referencias resolubles, pertenencia mundo-serie, pertenencia serie-capítulo, conceptos y procesos vinculados, mundos donde aparecen conceptos y entradas de rutas de aprendizaje contra los nodos fundacionales.

El validador no inventa simetrías que el catálogo no declara: comprueba que las referencias existan, pero no exige que toda relación `process.relatedConceptIds` se repita necesariamente en `concept.processIds`. Esto conserva el modelo actual y evita convertir una hipótesis de diseño en un requisito silencioso.

Al importar el catálogo real, `currentKnowledgeGraphValidation` falla inmediatamente si el contenido canónico queda inconsistente. En pruebas, fixtures sintéticos muestran que una referencia a proceso inexistente, un chapter reasignado a otra serie o un concepto inexistente en un proceso bloquean la validación.

## Integración

| Punto | Resultado |
|---|---|
| Knowledge Engine | El catálogo real se valida al cargar el módulo. |
| Tests | `src/lib/knowledge-graph/integrity.test.ts` cubre estado sano y tres roturas sintéticas. |
| CI | `npm run test:knowledge-integrity` corre junto a `knowledge-safety`, legal-core y los demás gates. |
| Continuidad | Una edición de contenido no puede dejar referencias huérfanas sin fallar el gate. |
| Seguridad | No cambia claims, jurisdicción, PII, documentos, publicación, merge, deploy o servicios. |

## Límites

Este gate verifica consistencia estructural del grafo; no verifica la verdad jurídica de un claim, suficiencia de una fuente, decisión del Founder, demanda de una extremidad ni aprobación de publicación. Tampoco crea historial, transporte de señales o revalidación humana automática. Es evidencia de integridad de relaciones, no evidencia de aprobación jurídica.
