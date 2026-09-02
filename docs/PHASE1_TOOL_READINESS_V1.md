# LegalMente — Fase 1 Tool Readiness V1

**Base SHA:** `23a9ce0209579a9b85c049b628e2a2c86fb0c5d7`  
**Branch:** `feat/phase1-before-signing-safe-tool`  
**Clasificación:** implementación técnica auxiliar; no canónica; no publicada.

## Eligibility table

| TOOL | READINESS | REASON | BLOCKER | ACTION |
|---|---|---|---|---|
| Before Signing | `EXISTING_ROUTE_REFACTOR_ONLY` | Existe ruta, lógica determinista, paquete vigente, 20 fixtures sintéticos y límites claros | No debe recibir documentos ni PII; no emite validez | Mejorar UX/explicabilidad/impresión reutilizando la ruta |
| Finiquito / terminación laboral | `PARTIAL_SPEC` | Drive contiene adquisición segura, stress test, arquitectura y notas México; la investigación declara `PARTIALLY_BUILDABLE` | Fórmula territorial completa, effective-date, salario base, excepciones y facts aún no suficientemente cerrados para una calculadora pública | No construir calculadora; dejar pendiente hasta cerrar adapter de fuentes |
| Ley Silla | `BLOCKED_SOURCE` | No se localizó paquete verificable de claim/source/research/territory en la reconciliación Drive↔Git | No existe binding demostrable para afirmaciones y estados | No implementar |
| Renuncia en blanco | `BLOCKED_SOURCE` | No se localizó paquete verificable de claim/source/research/evidence en la reconciliación Drive↔Git | No existe binding demostrable; documentoscopía no puede presentarse como prueba concluyente | No implementar |

## Input Contract — Before Signing

| Campo | Valor |
|---|---|
| `TOOL_ID` | `before-signing-structural-guide` |
| `ROUTE` | `/antes-de-firmar/` |
| `CONTENT_ID / CLAIM_IDS` | Ruta existente; claim packet de Before Signing ligado al Build Pack vigente; no se crea claim nuevo |
| `LEGAL_DOMAIN` | Preparación estructural de documentos |
| `TERRITORY` | México, visible en la UI |
| `SOURCE_IDS` | `CCF-1792-1859`, `CCOM-77-88`, `LFT-5`, `LFT-33`, según la lógica existente |
| `SOURCE_STATUS` | Congelado en la lógica existente; no se agregan fuentes ni URLs no verificadas |
| `LIMITS` | No lee documentos, no recibe uploads, no diagnostica, no determina validez, no recomienda firmar/no firmar y no presta asesoría individual |
| `PURPOSE` | Preparar una revisión estructural abstracta antes de una decisión |
| `USER_QUESTION` | “¿Qué elementos básicos puedo identificar y qué debería preguntar antes de continuar?” |
| `INPUTS` | Tipo de instrumento y cinco selecciones booleanas; sólo en memoria |
| `DERIVED_VALUES` | Hallazgos de estructura y preguntas preparatorias |
| `OUTPUTS` | Estado educativo, puntos de atención, resumen imprimible y tres preguntas |
| `ALLOWED_STATEMENTS` | Guía estructural, punto de atención, pregunta preparatoria, revisión profesional cuando corresponda |
| `FORBIDDEN_STATEMENTS` | Es válido, no es válido, firma, no firmes, te corresponde, ganarás/perderás, conclusión individual |
| `STOP_CONDITIONS` | Solicitud de validez, documentos reales, PII, preguntas individuales o asuntos fuera de alcance |
| `PII_POLICY` | Cero PII; sin fetch, API route, server action, storage, cookies, analytics con respuestas o logs de valores |
| `PRINT_POLICY` | `window.print()` y `@media print`; oculta navegación, botones, enlaces y metadatos internos |
| `SOURCE_DISPLAY_POLICY` | Mostrar sólo territorio y límites en UI; no fabricar URLs ni exponer IDs internos |
| `EXISTING_CODE` | `src/app/antes-de-firmar/page.tsx`, `src/lib/legal-core/before-signing.ts`, tests de `legal-core` |
| `DRIVE_EVIDENCE` | `03_Before_Signing_Build_Pack.md`, `03_Before_Signing_RC0_Spec.md`, trust contract y 20 casos sintéticos |
| `GIT_EVIDENCE` | Next.js App Router, TypeScript, Tailwind; ruta y lógica existentes |
| `BLOCKERS` | Ninguno para refactor seguro de la ruta; publicación y servicio siguen bloqueados |
| `READINESS_STATE` | `EXISTING_ROUTE_REFACTOR_ONLY` |

## Implementación realizada en esta rama

Se amplió únicamente la ruta existente de Before Signing para añadir preguntas preparatorias, resumen imprimible “Resumen de hechos y preguntas”, ocultación de controles al imprimir, copy explícito de cero-PII y reutilización de tokens visuales existentes. No se añadieron dependencias, no se creó un segundo framework, no se añadió analytics y no se tocó la lógica jurídica fuente.

## Siguiente acción segura

Ejecutar la suite completa y revisar el diff. Si todo pasa, abrir un PR draft para revisión técnica; no mergear ni desplegar.
