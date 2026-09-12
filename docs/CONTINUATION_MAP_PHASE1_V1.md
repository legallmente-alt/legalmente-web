# LegalMente — Continuation Map Fase 1 V1

**Propósito:** dejar una ruta reproducible para que otro agente continúe el trabajo vinculado entre GitHub, Drive y los gates de LegalMente.

## Estado de entrada

| Campo | Valor |
|---|---|
| Repositorio | `legallmente-alt/legalmente-web` |
| Stack | Next.js 14.2.35 · App Router · TypeScript · Tailwind |
| Base de trabajo | `main` en `23a9ce0209579a9b85c049b628e2a2c86fb0c5d7` |
| Rama actual | `feat/phase1-before-signing-safe-tool` |
| HEAD actual | `6b9c075b375c073039b54d1136a14e533491c69a` |
| PR | [#32](https://github.com/legallmente-alt/legalmente-web/pull/32) |
| Estado PR | `OPEN / DRAFT / READY_FOR_REVIEW` |
| CI | `validate` PASS |
| Publicación | No publicada |
| Deploy | No ejecutado |
| Canon | No modificado |

## Qué se construyó

La ruta existente `src/app/antes-de-firmar/page.tsx` fue endurecida sin crear una segunda aplicación. Conserva el flujo educativo y territorializado como México, no recibe documentos ni texto libre y sólo mantiene selecciones booleanas en memoria. La salida añade preguntas preparatorias, estado explicable y un resumen imprimible con `window.print()`.

`src/app/globals.css` contiene reglas `@media print` que ocultan formulario, navegación, enlaces y controles; el resumen impreso evita IDs internos y metadatos operativos. `scripts/before-signing-privacy-proof.mjs` protege la frontera Cero-PII y está registrado como `npm run test:before-signing-safe`.

## Readiness de la primera ola

| Tool | Estado | Regla para continuar |
|---|---|---|
| Antes de firmar | `EXISTING_ROUTE_REFACTOR_ONLY` | Se puede revisar; no publicar automáticamente |
| Finiquito / terminación laboral | `PARTIAL_SPEC` | No agregar una calculadora pública hasta cerrar adapter de fórmula, territorio, fecha efectiva, salario base y excepciones |
| Ley Silla | `BLOCKED_SOURCE` | No implementar sin claim/source/research/territory packet verificable |
| Renuncia en blanco | `BLOCKED_SOURCE` | No implementar sin claim/source/evidence packet verificable; documentoscopía nunca es prueba concluyente por inferencia |

## Documentos de referencia en Drive

La carpeta auxiliar no canónica es `LEGALMENTE — EXECUTION SPRINT MASTER PACK V1 — AUXILIARY / NON-CANONICAL`.

El handoff principal es [Implementation Handoff V1](https://drive.google.com/open?id=1TxqBi3TgAjnll2oVbv46kFnEnPUzaMsa). La readiness de herramientas está en [PHASE1_TOOL_READINESS_V1](https://drive.google.com/open?id=1KxP43q97J-C6J8s6hWUnk7wAVA6wd5cA). El diagnóstico independiente está en [Revisión independiente de mejora V1](https://drive.google.com/open?id=1-Qo-T7cjPpt--Sjxa-ICMIaNvu8SWUwV).

Para Before Signing, revisar `03_Before_Signing_Build_Pack.md`, `03_Before_Signing_RC0_Spec.md`, `07_BEFORE_SIGNING_TRUST_CONTRACT.md`, `03A_BEFORE_SIGNING_RULE_MATRIX.csv`, `03B_BEFORE_SIGNING_SYNTHETIC_VALIDATION_20.csv`, `02A_BEFORE_SIGNING_SCHEMA.json`, `02B_BEFORE_SIGNING_RULES.md` y `02C_BEFORE_SIGNING_COPY_UX.md`.

Para Finiquito, revisar `06_FINIQUITO_SEARCH_TO_SAFE_SCOPE_FLOW.md`, `08_FINIQUITO_ACQUISITION_SAFETY_PLAN.md`, `16_FINIQUITO_TRUST_STRESS_TEST.md`, `03C_SETTLEMENT_CALCULATOR_ARCHITECTURE.md`, `04B_MEXICO_SETTLEMENT_RESEARCH_NOTES.md` y `05_CALCULATOR_DEMAND_REPORT.md`. Estos documentos no autorizan por sí solos un cálculo público universal.

## Orden de continuación

Primero leer la Constitución, el Manual Operativo, Knowledge Integrity, Ecosystem Kernel, Agent Contribution Contract, el Build Pack de Before Signing y este mapa. Después comprobar `git status`, branch, HEAD, scripts reales y el CI del PR. No asumir que documentos auxiliares describen el código actual.

La única siguiente acción recomendada es **revisar el PR draft #32** con el Founder o responsable humano. Si se aprueba técnicamente, se puede considerar una autorización separada de merge. Merge, publicación y deploy son decisiones distintas.

## Comandos de verificación

```bash
npm run test:before-signing-safe
npm run lint
npm run typecheck
npm run test:legal-core
npm run test:knowledge-safety
npm run test:knowledge-integrity
npm run test:ecosystem-kernel
npm run test:agent-contribution
npm run build:public
npm run test:public-routes
git diff --check
gh pr checks 32 --repo legallmente-alt/legalmente-web
```

## Límites no negociables

No modificar Constitución. No inventar claims, sources, territory decisions o copy jurídico. No introducir Astro, Nano Stores, Redux, Zustand o un segundo frontend. No enviar inputs fuera del navegador. No usar `fetch`, API routes, server actions, database, storage, cookies, analytics con respuestas, logs de valores, uploads u OCR. No publicar, desplegar, activar servicios legales, pagar proveedores ni mergear sin el gate correspondiente.

> Principio de continuidad: canon → input contract → lógica determinista → UI → explicación → pregunta siguiente. Nunca prompt → JSX → falsa certeza.
