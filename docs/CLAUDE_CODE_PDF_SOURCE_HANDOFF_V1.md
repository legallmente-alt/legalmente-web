# LegalMente — Handoff operativo para Claude Code

**Versión:** `PDF-SOURCE-HANDOFF-V1`  
**Fecha de corte:** 2026-09-02  
**Alcance:** verificación Nivel 1 para `PIEZA-02` y `PIEZA-04`  
**Estado global:** preparación interna; `NOT_PUBLISHED`; no abrir gates de publicación.

## Instrucción de arranque

Trabaja sobre el repositorio `legallmente-alt/legalmente-web`, preferentemente en una rama de trabajo derivada de `origin/feat/phase1-before-signing-safe-tool`. Antes de modificar código o datos, lee:

```text
docs/CLAUDE_CODE_CONTINUATION_GUIDE_VISUAL_V1.md
docs/CONTINUATION_MAP_PHASE1_V1.md
docs/VISUAL_ROTATION_SYSTEM_V1.md
docs/VISUAL_ROTATION_BASELINE_V1.md
docs/SUPER_PROMPT_MAESTRO_EJECUCION_LEGALMENTE.md
scripts/rule-master-proof.mjs
scripts/visual-rotation-engine.mjs
scripts/content-visual-preflight.mjs
src/lib/legal-core/topic-radar.ts
src/lib/legal-core/cultural-atlas.ts
data/visual-combination-registry.json
```

No cambies el canon legal, no inventes `EXACT_COPY`, no completes fuentes desde memoria y no conviertas una referencia oficial HTML en un PDF oficial. La creatividad visual nunca corrige evidencia jurídica faltante.

## Fuentes verificadas

| `SOURCE_ID` | Territorio | Fuente | Estado | Evidencia técnica |
|---|---:|---|---|---|
| `MX_LFT` | MX | Ley Federal del Trabajo, Cámara de Diputados | `VERIFIED` | PDF directo, 457 páginas, MIME `application/pdf`, `pdfinfo=PASS`, apertura local `PASS` |
| `ES_ET` | ES | Estatuto de los Trabajadores, BOE, texto consolidado | `VERIFIED` | PDF directo, 97 páginas, MIME `application/pdf`, `pdfinfo=PASS`, apertura local `PASS` |

Hashes que deben permanecer inmutables:

```text
MX_LFT.pdf  12f09393a1951a91c3f57f579bf611b034edf1a5f78cdbfb828e23ff3a9acbf7
ES_ET.pdf   fe831486402775aa5c9a487ba9608c658e178ffddf09491c68b58995ae4bce86
```

URLs oficiales:

```text
https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf
https://www.boe.es/buscar/pdf/2015/BOE-A-2015-11430-consolidado.pdf
```

## Fuentes que deben permanecer en HOLD

| `SOURCE_ID` | Territorio | Motivo de bloqueo | Acción permitida |
|---|---:|---|---|
| `AR_LCT` | AR | Infoleg entrega el texto oficial en HTML; no se confirmó un PDF oficial directo | Mantener `HOLD`; no activar claims |
| `CO_CST` | CO | El Ministerio del Trabajo remite a SUIN-Juriscol, pero no se obtuvo un PDF oficial verificable | Mantener `HOLD`; no activar claims |
| `ES_STS_6207_2012` | ES | El enlace oficial del CGPJ/CENDOJ redirige a CAPTCHA | No resolver ni eludir CAPTCHA; mantener `HOLD` |

Referencias oficiales de los bloqueos:

```text
AR: https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm
CO: https://www.mintrabajo.gov.co/normatividad/leyes-y-decretos-ley/codigos
CO: https://www.suin-juriscol.gov.co/viewDocument.asp?ruta=Codigo/30019323
ES: https://www.poderjudicial.es/search/doAction?action=contentpdf&databasematch=TS&reference=6515112&links=&optimize=20121016&publicinterface=true
```

## Reglas fail-closed obligatorias

Si falta cualquiera de `CONTENT_ID`, `EXACT_COPY`, `CLAIM_ID`, `SOURCE_ID`, territorio, límite, artículo exacto o estado de evidencia, el resultado debe ser `BLOCKED` o `HOLD`. Está prohibido inferir o completar el dato.

Una fuente `HOLD` no puede producir `READY_FOR_VISUAL`, `CURATION_READY`, `APPROVED`, `FINAL` ni `PUBLISHED`. `READY_FOR_REVIEW` sólo puede usarse para preparación interna claramente marcada, nunca como aprobación humana.

No subir PII. No guardar nombres, correos, contratos reales ni datos de usuario. Los instrumentos interactivos deben conservar únicamente estado efímero en el navegador.

No hacer deploy, no publicar, no mover archivos a carpetas de aprobados y no abrir gates adicionales. No sobrescribir assets, manifests, receipts ni fingerprints existentes. Toda nueva decisión debe quedar en un archivo de trazabilidad y en el commit correspondiente.

## Procedimiento para cada pieza

Primero localiza en Drive el paquete vigente de la pieza y lee el paquete completo. Confirma literalmente `CONTENT_ID`, `EXACT_COPY`, `CLAIM_ID`, `SOURCE_ID`, territorio, límites y estado. Si el paquete no prueba la fuente y el límite, detente en `HOLD`.

Después consulta el inventario visual, catálogo, manifests, receipts, fingerprints y assets más recientes. Construye la combinación desde:

```text
HUMAN_QUESTION
→ WORLD
→ LEGAL_DOMAIN[]
→ CONCEPT[]
→ CLAIM_IDS
→ SOURCE_IDS
→ TERRITORY
→ LIMITS
→ VISUAL_SEMANTICS
→ VISUAL_TENSION
→ METAPHOR
→ SCENE
→ MATERIAL
→ LIGHT
→ FRAMING
→ TYPOGRAPHIC_ARCHITECTURE
```

Antes de producir cualquier visual, ejecuta el preflight. La combinación debe cambiar de forma determinista cuando exista colisión o recencia excesiva en cámara, luz, material, objeto, escena, escuela visual, encuadre o presencia humana. Una combinación repetida es `REWORK_REQUIRED`, no una excepción editorial.

Cada imagen válida debe ser independiente, vertical 9:16, 1080×1920, full bleed, una sola escena, sin collage, grid, mosaico, storyboard ni números internos visibles. La marca `LegalMente` debe estar integrada físicamente en un objeto real de la escena; nunca usar watermark, logo flotante u overlay genérico.

El texto jurídico de la imagen sólo puede ser el `EXACT_COPY` validado. Si el generador altera una palabra, puntuación o acento, el asset falla `TEXT_MAIN_EXACT` y debe rehacerse o quedar bloqueado.

## QA mínimo antes de cualquier estado de revisión

Registrar explícitamente cada resultado:

```text
CONCEPT_SINGLE
METAPHOR_CAUSAL
TEXT_MAIN_EXACT
PSEUDOTEXT_ZERO
BRAND_INTEGRATED
MOBILE_READABLE
SAFE_AREA_PASS
PROVENANCE_PASS
LEGAL_COPY_PASS
NO_COLLAGE
NO_DUPLICATE
VISUAL_VARIATION_PASS
```

Si un solo check falla, registrar `REWORK_REQUIRED` y no entregar el asset como final.

## Comandos de verificación

Ejecutar desde la rama de fase 1 y conservar la salida en el receipt:

```bash
npm ci
npm run lint
npm run typecheck
npm run test:rule-master
npm run test:visual-rotation
npm run test:content-visual-preflight
npm run test:before-signing-safe
git diff --check
```

Si un script no existe en `package.json`, no lo inventes ni edites el gate para ocultar el fallo. Ejecuta directamente el archivo `.mjs` o `.test.mjs` correspondiente, documenta la discrepancia y deja el estado en `HOLD` hasta reconciliarla.

## Drive: ubicación y receipts

La estructura vigente de fuentes está bajo:

```text
03 → 01 — Fuentes oficiales Nivel 1 → Laboral → PIEZA-02 y PIEZA-04
```

En el árbol actual, las carpetas territoriales están directamente bajo `PIEZA-02 y PIEZA-04`:

```text
MX: https://drive.google.com/drive/folders/1uU3rKtmol_VhZv-jlw-dGZaPH9313DWh
AR: https://drive.google.com/drive/folders/1c4l0Qa54Xu3K89EdQgu72R-YE_H6ZbgM
CO: https://drive.google.com/drive/folders/15K7UPo8cI4gugcSt0xW-lTSnlQKWWF0A
ES: https://drive.google.com/drive/folders/1HbIiltbi4C9CrHj8PcA-L3T_c1kBFkYg
00 — Manifests: https://drive.google.com/drive/folders/1ljyP4jS4VfH0p6OhVZcrAJIXwR5V5iH9
```

Archivos ya depositados:

```text
SOURCE_MX_LFT.pdf
SOURCE_ES_ET.pdf
SOURCE_VERIFICATION_RECEIPT_2026-09-02.md
source-verification-receipt-2026-09-02.json
SHA256SUMS.txt
MX_LFT.pdfinfo.txt
ES_ET.pdfinfo.txt
LEGALMENTE_PDF_SOURCE_FINDINGS_2026-09-02.md
rerun-verification-2026-09-02.txt
```

Para cualquier nueva ejecución, crea un receipt con fecha/hora y no sobrescribas el existente. El receipt debe contener URL, MIME, tamaño, hash, resultado de `pdfinfo`, resultado de apertura local, estado jurídico, motivo de `HOLD` si aplica y siguiente acción humana.

## Formato de entrega a la persona responsable

Termina con una tabla breve que contenga `CONTENT_ID`, `SOURCE_ID`, territorio, estado, checks, archivos creados, ubicación en Drive y siguiente gate. Declara expresamente `NOT_PUBLISHED`. No afirmes aprobación humana, vigencia sustantiva ni literalidad de artículos que no hayan sido revisadas por una persona autorizada.

> La siguiente acción correcta no es generar imágenes con las tres fuentes bloqueadas. Es conseguir los PDFs oficiales faltantes o una entrega manual autorizada, verificar cada uno con el mismo protocolo y sólo entonces actualizar el grafo de claims.

## References

[1]: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf "Ley Federal del Trabajo — Cámara de Diputados"
[2]: https://www.boe.es/buscar/pdf/2015/BOE-A-2015-11430-consolidado.pdf "Estatuto de los Trabajadores — BOE"
[3]: https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm "Ley de Contrato de Trabajo — Infoleg"
[4]: https://www.mintrabajo.gov.co/normatividad/leyes-y-decretos-ley/codigos "Códigos — Ministerio del Trabajo de Colombia"
[5]: https://www.suin-juriscol.gov.co/viewDocument.asp?ruta=Codigo/30019323 "Código Sustantivo del Trabajo — SUIN-Juriscol"
[6]: https://www.poderjudicial.es/portal/site/cgpj/menuitem.65d2c4456b6ddb628e635fc1dc432ea0/?vgnextoid=0e94294e151ca310VgnVCM1000006f48ac0aRCRD&vgnextchannel=ae0d512f8032a210VgnVCM100000cb34e20aRCRD&vgnextfmt=default&vgnextlocale=es&lang_choosen=es "STS 6207/2012 — Poder Judicial"
