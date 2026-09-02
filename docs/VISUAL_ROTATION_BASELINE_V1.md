# LegalMente — Visual Rotation Baseline V1

**Fuente analizada:** `top20_visual_ready_for_prompt.csv` del inventario de producción visual.  
**Clasificación:** AUXILIAR / NO CANÓNICO.

## Hallazgos medidos

| Dimensión | Resultado observado | Lectura operativa |
|---|---:|---|
| Piezas en el manifest | 20 | Existe una base suficiente para comenzar un registro vivo |
| `VISUAL_ID` únicos | 20 | No hay IDs duplicados en este lote |
| `CONTENT_ID` únicos | 20 | El lote no repite contenido editorial |
| `CORE_CONCEPT` únicos | 20 | El concepto declarado no se repite en el lote |
| `SPECIFIC_SCENE` únicas | 19 | Hay al menos una escena repetida; el selector debe bloquearla cuando sea equivalente |
| `CORE_METAPHOR` únicas | 20 | Las metáforas declaradas son nominalmente distintas |
| `SPECIFIC_OBJECTS` únicas | 19 | Hay al menos un conjunto de objetos repetido |
| `CAMERA` únicas | 1 | El manifest usa una misma plantilla de cámara para todo el lote; no prueba diversidad de encuadre |
| `LIGHT` únicas | 1 | El manifest usa una misma plantilla de luz; no prueba diversidad de iluminación |
| `BRAND_INTEGRATION` únicas | 1 | La integración de marca está descrita con una fórmula común; falta registrar el objeto concreto |
| `visualSchool` demostrada | 0/20 | El campo no está en el manifest consultado; se conserva como `unknown` |
| `dominantPalette` demostrada | 0/20 | El campo no está en el manifest consultado; se conserva como `unknown` |
| `world` y `legalDomain` demostrados | 0/20 | No deben inferirse desde el concepto; se mantienen como `unknown` |

## Diagnóstico

El lote tiene variedad nominal en concepto, metáfora y escena, pero no tiene suficiente evidencia estructurada para demostrar variedad artística, de encuadre, luz, objeto de marca, paleta, mundo o dominio legal. Por eso el registro inicial conserva esos campos como `unknown` y el motor devuelve `HOLD_INSUFFICIENT_HISTORY` cuando la comparación no puede demostrar tres variaciones.

Esto evita un falso positivo frecuente: dos prompts pueden mencionar escenas diferentes y terminar visualmente iguales porque comparten la misma escuela, luz, cámara, material y arquitectura tipográfica. En el sistema nuevo, una pieza no se considera “no repetida” sólo porque cambie el tema.

## Regla de producción resultante

Antes de generar una pieza nueva se debe completar el candidate record con los diez ejes. La imagen no se genera si la huella exacta ya existe, si la escuela visual aparece en las últimas cinco piezas o si no se pueden demostrar al menos tres cambios frente a la pieza anterior. Después de la generación, QA debe confirmar la diferencia perceptual y sólo entonces registrar el asset final.

## Acción para mejorar la cobertura histórica

Reconstruir `visualSchool`, `framing`, `humanPresence`, `brandObject`, `dominantPalette`, `world` y `legalDomain` únicamente desde manifests, receipts, briefs o assets con evidencia verificable. Los campos ausentes deben seguir siendo `unknown`. No rellenarlos mediante visión subjetiva retrospectiva ni por inferencia del prompt.
