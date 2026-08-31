# LegalMente — Extremidad Contratos V1

## Alcance

Contratos se incorpora como una **extremidad de utilidad educativa y de preparación**, no como un catálogo jurídico exhaustivo, un generador universal, un revisor de documentos reales ni un servicio profesional. La extremidad reúne tipos contractuales seleccionables, conceptos del Knowledge Engine, una ruta de preparación y —cuando existe— el contenido visual interno que requiere revisión humana.

La implementación no impone una fórmula universal de existencia o validez. Capacidad, representación, consentimiento, objeto, licitud, forma, territorio y consecuencias deben investigarse y explicarse conforme al ordenamiento aplicable; este adaptador sólo organiza relaciones y preguntas de preparación.

## Recorrido directo

El recorrido implementado en `src/app/antes-de-firmar/page.tsx` es:

`tipo contractual → pregunta estructural → conceptos existentes → proceso existente → contenido interno relacionado → evidencia estructural del Review Registry`.

Los IDs no se duplican: `contract-limb.ts` referencia `consentimiento`, `obligacion`, `representacion`, `deber-profesional`, `prueba`, `leer-antes-de-aceptar` y las unidades `LM-PC-013` o `LM-PC-031` del registry existente. La selección de `PROMESA_COMPRAVENTA` y `COMPRAVENTA` se mantiene separada aunque ambas usan la misma ruta educativa inicial; distinguirlas aquí no equivale a afirmar que tengan idénticos requisitos jurídicos.

## Recorrido inverso

`getAffectedContractConsumers()` recibe un cambio sintético de tipo `CONCEPT`, `PROCESS` o `REVIEW_CONTENT` y devuelve los tipos contractuales afectados. Sólo identifica consumidores; no cambia estados, no aprueba, no publica, no persiste y no dispara una revalidación automática. El objetivo es reducir pérdida de contexto cuando cambia una fuente, una relación o un asset.

| Cambio | Efecto comprobado |
|---|---|
| Concepto `consentimiento` | Identifica todas las selecciones contractuales que lo reutilizan. |
| Proceso `leer-antes-de-aceptar` | Identifica todas las selecciones que dependen de la ruta. |
| Review content `LM-PC-031` | Identifica la selección `LABORAL`. |
| ID desconocido | Devuelve una lista vacía; no infiere consumidores. |

## Relación con otras capacidades

| Capacidad | Relación |
|---|---|
| Knowledge Engine | Proporciona títulos, resúmenes, rutas y conceptos canónicos reutilizados por ID. |
| Before Signing | Proporciona la interacción educativa y los hallazgos estructurales sin recibir documentos reales. |
| Review Registry | Proporciona unidades visuales, estado `HUMAN_REVIEW_REQUIRED` y evidencia de archivo; no aprobación. |
| Product Lab | Mantiene la revisión interna de assets separada de la experiencia educativa pública. |
| Continuidad | El índice inverso identifica impacto, pero no implementa historial ni transporte de señales. |

## Límites y gates

La extremidad no recibe PII, texto libre, contratos reales ni documentos. No genera contratos firmables, no dicta validez, no recomienda firmar, no asigna mapping definitivo, no abre `gate_arte` y no activa publicación, merge, deploy o servicios profesionales. Las selecciones sin contenido visual relacionado muestran esa ausencia como `PENDING_MAPPING` conceptual; no se infiere aprobación.

La decisión pendiente es humana: qué contenido y fuentes deben investigarse para cada tipo contractual, cómo distinguir fundamentos de contrato concreto y qué relaciones deben pasar de preparación a una etapa posterior. La implementación deja esas decisiones visibles en lugar de rellenarlas con claims inventados.

## Mejora de experiencia aplicada

La superficie `Antes de firmar` ya no muestra una salida que pueda leerse como aprobación cuando el motor técnico devuelve `PASS`. En su lugar presenta `Puntos de atención encontrados` cuando hay hallazgos y `Guía preliminar disponible` cuando no los hay. El resultado hace visibles cuatro capas: territorio México, versión de regla y cálculo, qué revisó y qué no revisó. También conserva la instrucción de escalar a revisión profesional cuando la pregunta supera la herramienta.

Esta es una traducción de producto de un estado técnico; no cambia el contrato determinista del núcleo ni convierte una guía en dictamen.

## Evidencia

La prueba `src/lib/contracts/contract-limb.test.ts` comprueba que todos los paths tienen conceptos y proceso existentes, que las unidades visuales existen y siguen en `HUMAN_REVIEW_REQUIRED`, que promesa de compraventa y compraventa son selecciones distintas y que el recorrido inverso identifica consumidores sin cambiar estado. La batería general del repositorio debe ejecutarse después de cualquier cambio adicional.
