# LegalMente — Claude Code Continuation Guide: Visual Content V1

## Objetivo

Continuar el motor visual de LegalMente sin generar imágenes repetidas, sin inventar claims y sin publicar. El repositorio es `legallmente-alt/legalmente-web`. La rama de trabajo es `feat/phase1-before-signing-safe-tool`. El PR de revisión es el número 32.

## Lectura obligatoria

Antes de modificar código o producir una imagen, leer:

1. `docs/CONTINUATION_MAP_PHASE1_V1.md`
2. `docs/VISUAL_ROTATION_SYSTEM_V1.md`
3. `docs/VISUAL_ROTATION_BASELINE_V1.md`
4. `docs/PHASE1_TOOL_READINESS_V1.md`
5. `scripts/visual-rotation-engine.mjs`
6. `scripts/content-visual-preflight.mjs`
7. El prompt y el manifest vigentes en la carpeta de producción de Drive

Drive de producción: `https://drive.google.com/drive/folders/18xOOLvwBMnNafiBLNB7YAOlPhYBfguBk`

## Comprobación inicial

Ejecutar:

```bash
git status --short
git log -5 --oneline --decorate
npm run test:rule-master
npm run test:visual-rotation
npm run test:content-visual-preflight
```

Si alguna prueba falla, detenerse en `HOLD` y registrar la causa. No desactivar el gate.

## Regla de no repetición

No basta con cambiar el concepto o la metáfora. El preflight bloquea un lote cuando conserva la misma gramática visual. En el inventario auditado, `CAMERA`, `LIGHT`, `COLD_ELEMENT`, `BRAND_INTEGRATION` y `TEXT_SAFE_AREA` eran idénticos en las 20 filas. Esa es la causa de la repetición perceptual.

Antes de generar una pieza, construir su propuesta completa:

`CONTENT_ID → HUMAN_QUESTION → WORLD → LEGAL_DOMAIN → CONCEPT → CLAIM_IDS → SOURCE_IDS → TERRITORY → LIMITS → VISUAL_SCHOOL → SCENARIO → REVELATION → FRAMING → HUMAN_PRESENCE → BRAND_OBJECT → DOMINANT_PALETTE → LIGHT → COLD_ELEMENT → FINGERPRINT`

La propuesta debe pasar `npm run test:content-visual-preflight` y el motor de huellas antes de invocar generación.

## Reglas de selección

Cada lote de hasta cinco piezas debe cambiar de forma perceptible cámara, luz, elemento frío y objeto central. Debe variar además escuela visual, escenario, revelación, encuadre y presencia humana. La nota anti-duplicación debe nombrar el cambio concreto; “no repetir el pack anterior” por sí solo no sirve.

Los ejes visuales deben tener relación causal con la conducta y el dominio. No usar cámara macro, luz cálida lateral, elemento azul petróleo, madera/nogal y marca grabada como defaults globales.

La marca LegalMente debe integrarse físicamente en un objeto real de la escena. No usar watermark, logo flotante ni overlay genérico. El texto jurídico crítico no debe inventarse dentro de una imagen.

## Regla jurídica y editorial

La imagen no se genera si el `CONTENT_ID`, mapping de claim, fuente, territorio o límite están incompletos. La creatividad visual no corrige una fuente faltante. `READY_FOR_VISUAL` no significa `LIVE`.

Si falta evidencia, usar `HOLD_SOURCE`, `HOLD_LEGAL` o `NO_IMAGE_REQUEST`. Nunca cambiar a `APPROVED`, `PUBLISHED` o `FINAL`.

## Procedimiento para una nueva pieza

Primero localizar el paquete existente en Drive. Después leer el manifest, la matriz de fuentes, el claim prep, los límites y el asset history. Crear un brief visual con la combinación propuesta. Ejecutar el preflight. Si pasa, generar una sola imagen independiente y hacer una comprobación ligera de formato, escena única, legibilidad, marca integrada y ausencia de repetición obvia. Registrar la huella y el estado.

Guardar el resultado en la carpeta de producción indicada por el prompt vigente. No sobrescribir archivos existentes. No mover archivos a carpetas de aprobados. No publicar.

## Comando de validación final

```bash
npm run lint
npm run typecheck
npm run test:rule-master
npm run test:visual-rotation
npm run test:content-visual-preflight
npm run test:before-signing-safe
npm run build:public
npm run test:public-routes
git diff --check
```

## Prompt de arranque para Claude Code

> Trabaja sobre `legallmente-alt/legalmente-web` en la rama `feat/phase1-before-signing-safe-tool`. Lee primero `docs/CLAUDE_CODE_CONTINUATION_GUIDE_VISUAL_V1.md`, `docs/VISUAL_ROTATION_SYSTEM_V1.md`, `docs/VISUAL_ROTATION_BASELINE_V1.md`, `docs/CONTINUATION_MAP_PHASE1_V1.md`, el prompt de producción y el manifest de Drive. Tu tarea es sólo seleccionar o preparar combinaciones visuales que no repitan cámara, luz, elemento frío, objeto, escuela, escenario, encuadre ni presencia humana. Ejecuta `npm run test:content-visual-preflight` antes de generar. Si falta claim, fuente, territorio, límite o historial visual, detente en `HOLD` y no generes. No hagas merge, deploy, publicación, apertura de gates ni cambios en el canon. Al terminar, registra archivos, huella, estado, pruebas y siguiente acción en el handoff.

## Entrega esperada

La entrega debe decir exactamente: qué combinación se propuso, qué entradas del historial evitó, qué preflight pasó, qué archivo se creó, dónde se guardó en Drive, qué estado tiene y cuál es el siguiente gate. No afirmar aprobación humana ni publicación si no existe evidencia explícita.
