# LegalMente — Receipt de auditoría dirigida

**Fecha:** 2026-09-02  
**Rama auditada:** `origin/feat/phase1-before-signing-safe-tool`  
**Estado de publicación:** `NOT_PUBLISHED`  
**Alcance:** contratos, continuidad, seguridad, rotación visual y artefacto público.

## Resultado ejecutivo

La auditoría dirigida terminó con **gates técnicos en PASS** después de instalar las dependencias declaradas mediante `npm ci`. La primera ejecución quedó bloqueada únicamente porque el checkout no tenía `node_modules`; esa discrepancia fue corregida sin modificar el código ni los contratos. La segunda ejecución no presentó marcadores de fallo y `git diff --check` pasó.

Las fuentes jurídicas conservan los estados documentados previamente: `MX_LFT` y `ES_ET` están `VERIFIED`; `AR_LCT`, `CO_CST` y `ES_STS_6207_2012` permanecen en `HOLD`. Esta auditoría no activa claims, no modifica el canon legal, no genera visuales y no cambia ningún estado de publicación.

## Gates ejecutados

| Gate | Resultado | Evidencia |
|---|---|---|
| `npm run lint` | `PASS` | Sin advertencias ni errores ESLint |
| `npm run typecheck` | `PASS` | `tsc --noEmit` sin errores |
| `npm run test:legal-core` | `PASS` | 13 tests |
| `npm run test:knowledge-safety` | `PASS` | 3 tests |
| `npm run test:knowledge-integrity` | `PASS` | 5 tests |
| `npm run test:ecosystem-kernel` | `PASS` | 10 tests |
| `npm run test:agent-contribution` | `PASS` | 19 tests |
| `npm run test:before-signing-safe` | `PASS` | Privacy proof pasado; sin red, storage, logging, upload o transporte de PII |
| `npm run test:visual-rotation` | `PASS` | 5 tests; colisiones, recencia, ejes y fail-closed cubiertos |
| `npm run test:content-visual-preflight` | `PASS` | 2 tests; bloqueo de repetición y aceptación de variación |
| `npm run test:rule-master` | `PASS` | 7 archivos de continuidad, 20 fingerprints, exclusión pública interna |
| `npm run build:public` | `PASS` | Next.js 14.2.35 compiló; rutas y assets internos retirados |
| `npm run test:public-routes` | `PASS` | 10 rutas, 54 HTML, 52 URLs sitemap, internas ausentes |
| `git diff --check` | `PASS` | Sin errores de whitespace |

## Invariantes confirmadas

El runtime público no expone rutas internas ni assets de revisión. El contrato de preparación antes de firmar permanece estructural y no emite opiniones de validez. El motor visual rechaza colisiones exactas, escuelas visuales recientes y registros con ejes insuficientes. El Rule Master conserva la exclusión pública y los estados internos de revisión.

Los tres `HOLD` jurídicos no deben utilizarse para `EXACT_COPY`, claims, `READY_FOR_VISUAL`, `CURATION_READY`, `APPROVED`, `FINAL` o `PUBLISHED`. No se realizó bypass de CAPTCHA, no se completaron fuentes desde memoria y no se publicaron cambios.

## Artefactos de trazabilidad

Las salidas completas están en `/home/ubuntu/legalmente_directed_audit_2026-09-02/`. El handoff de fuentes está en `docs/CLAUDE_CODE_PDF_SOURCE_HANDOFF_V1.md`. Este receipt debe subirse a `00 — Manifests` y conservarse junto con los receipts de fuentes, sin sobrescribirlos.

## Siguiente acción autorizada

La siguiente acción es exclusivamente humana: obtener los PDFs oficiales faltantes de Argentina, Colombia y la STS 6207/2012, o proporcionar una entrega manual autorizada. Después deberán verificarse con MIME, `pdfinfo`, apertura local y SHA-256. Hasta entonces, mantener `NOT_PUBLISHED`.
