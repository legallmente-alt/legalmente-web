# LegalMente — Sistema de Rotación Visual V1

## Propósito

El sistema evita que la producción visual dependa de memoria, intuición o prompts aparentemente distintos que terminan generando la misma composición. Cada pieza se registra como una combinación de ejes y obtiene una huella estable. Antes de generar una nueva imagen, el candidato debe pasar el filtro de colisión exacta, ventana de recencia y variación mínima.

> La unidad de control no es el prompt. Es la combinación estructurada de contenido, dominio, escena, mecanismo de revelación, encuadre, presencia humana, objeto de marca y paleta.

## Espacio combinatorio

La huella usa diez ejes: `world`, `legalDomain`, `concept`, `visualSchool`, `scenario`, `revelation`, `framing`, `humanPresence`, `brandObject` y `dominantPalette`. En términos simples, si cada eje tiene cardinalidad `n_i`, el espacio teórico es `Π n_i`; el sistema no trata ese número como garantía de variedad porque las combinaciones no equivalen a diferencias perceptuales. Por eso se aplican restricciones adicionales.

La fórmula operativa exige que una pieza nueva cambie por lo menos **3 de 5 ejes de variación** frente a la pieza anterior: `visualSchool`, `scenario`, `revelation`, `framing` y `humanPresence`. Además, no se repite `visualSchool` dentro de las últimas cinco piezas. `brandObject` y `dominantPalette` rotan como anclas secundarias; la marca sigue integrada físicamente en un objeto real de la escena.

## Estados del selector

| Estado | Significado | Acción |
|---|---|---|
| `READY_FIRST_ENTRY` | No existe historial previo | Se puede registrar, sujeto a QA humano |
| `READY` | La combinación no colisiona y cambia al menos tres ejes comparables | Puede pasar a brief/generación |
| `REJECTED_EXACT_COLLISION` | La huella completa ya existe | Rechazar y proponer otro candidato |
| `REJECTED_SCHOOL_RECENCY` | La escuela visual apareció en las últimas cinco piezas | Rechazar y cambiar escuela |
| `REJECTED_INSUFFICIENT_VARIATION` | Cambian menos de tres ejes frente a la pieza anterior | Rechazar y cambiar escena, revelación, encuadre o presencia |
| `HOLD_INSUFFICIENT_HISTORY` | El historial carece de suficientes atributos demostrables | No inferir; completar inventario o mantener en espera |

## Reglas de fail-closed

Los atributos no demostrados se guardan como `unknown`, nunca se rellenan por inferencia visual. Un manifest que sólo contiene escena y metáfora no autoriza a declarar escuela, paleta, territorio o dominio. Mientras falten ejes necesarios para demostrar la variación mínima, el selector devuelve `HOLD_INSUFFICIENT_HISTORY`.

La colisión exacta se calcula con SHA-256 sobre los ejes normalizados y ordenados. Esto no juzga la calidad artística ni sustituye la revisión visual: sólo impide repetir una combinación registrada. El QA humano debe confirmar que la imagen final conserva una sola escena, legibilidad, marca integrada, safe area, no collage y ausencia de duplicación perceptual.

## Flujo operativo

1. Validar el paquete editorial y el binding jurídico antes del diseño.
2. Construir un candidato con los diez ejes y su contenido exacto.
3. Ejecutar `node scripts/visual-rotation-engine.mjs candidate.json data/visual-combination-registry.json`.
4. Si el estado no es `READY` o `READY_FIRST_ENTRY`, no generar; corregir el candidato o completar el historial.
5. Si es elegible, generar la imagen y hacer QA humano.
6. Sólo después del QA registrar el candidato final, su asset ID, fingerprint de archivo y estado `CURATION_READY` o equivalente.
7. Nunca registrar como usada una pieza que sólo existe como prompt o que no pasó QA.

## Registro actual

`data/visual-combination-registry.json` contiene una semilla derivada del manifest real `top20_visual_ready_for_prompt.csv`. Los campos que el manifest no demuestra permanecen como `unknown`; por lo tanto, la semilla sirve para bloquear coincidencias exactas y mostrar huecos de inventario, pero no permite fingir que las escuelas visuales históricas están completas.

## Archivos

- `scripts/visual-rotation-engine.mjs`: huella, colisión, ventana de recencia y variación mínima.
- `scripts/visual-rotation-engine.test.mjs`: pruebas del motor.
- `data/visual-combination-registry.json`: registro vivo de combinaciones.
- `docs/PHASE1_TOOL_READINESS_V1.md`: readiness de herramientas de producto; no confundir con el registro visual.

## Próxima mejora segura

Completar el registro histórico con atributos demostrables desde manifests y receipts existentes, especialmente `visualSchool`, `world`, `legalDomain` y `dominantPalette`. Si un atributo no se encuentra en una fuente autorizada, mantener `unknown` y no inventarlo. Después se puede construir una consola de selección, pero no antes de que el registro alcance cobertura suficiente.
