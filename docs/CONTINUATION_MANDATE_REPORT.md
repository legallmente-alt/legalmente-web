# LegalMente — Continuation Mandate Report

**Estado:** staging auxiliar sobre el HEAD actual de PR #25; no merge, no deploy, no publicación.

## LIVE STATE RECONSTRUCTED

| PR | HEAD | Base | Estado | CI / mergeabilidad |
|---|---|---|---|---|
| #25 | `5972ac816f8a031f3e98ca24d38128de1e546746` | `main` | OPEN, no draft | `validate SUCCESS`, CLEAN |
| #26 | `5b809639546de54297f03ca995f89f54caf8ecb7` | antiguo HEAD #25 `6f4c74c860eac6dd7572ef145bd77d0d7f02cdb1` | OPEN, draft | `validate SUCCESS`, DIRTY; no prueba suficiente sobre #25 actual |
| #27 | `52a47d99c526f2fcbf49d3235a74d5c7d842c4e2` | `main` | OPEN, draft | `validate SUCCESS`, CLEAN |

`Psyche-creation` sigue siendo la fuente canónica de claims, fuentes, jurisdicción, hashes, estados jurídicos y gates. `legalmente-web` conserva producto/UX, preparación y consumidores.

## PR #25 CURRENT HEAD

El HEAD actual es `5972ac8…`, no la base histórica usada por #26. Por eso el CI verde de #26 no bastaba para declarar su hardening portado.

## PR #26 CURRENT STATUS

PR #26 es una propuesta válida de hardening, pero está basada en el HEAD anterior `6f4c74c…`, por lo que permanece **DIRTY** frente a su base actual y no debe fusionarse tal cual.

## HARDENING PORT STATUS

El hardening fue portado mediante un worktree separado desde `origin/feat/review-memory-registry-v1`, resolviendo el único conflicto de `src/app/antes-de-firmar/page.tsx` a favor de conservar la orientación educativa y eliminar el estado interno. La rama resultante es `continuation/no-leak-on-pr25-head`.

## PUBLIC BOUNDARY FINDINGS

Antes del portado, `Before Signing` en el HEAD actual de #25 contenía una dependencia directa a `@/lib/review/registry` para mostrar `contentId`, estado y `reviewContentIds`. Esa información es interna y no es necesaria para la superficie pública. El portado elimina la dependencia y conserva únicamente la relación educativa entre conceptos y proceso.

## NO-LEAK PROOF

`public-route-proof.mjs` fue portado y ampliado para inspeccionar `.html`, `.js`, `.css`, `.json`, `.txt` y `.xml` del artefacto público. Busca markers específicos y defendibles: rutas de internal assets, manifest Wave 01A, `DRIVE_IDS_FROM_MANIFEST`, `HUMAN_REVIEW_REQUIRED`, `PENDING_MAPPING`, el módulo de registry y `getInternalReviewUnit`.

El build público eliminó rutas internas, assets internos y chunks internos. El proof pasó con **10 rutas, 54 HTML, 52 URLs de sitemap y 137 archivos textuales inspeccionados**; no apareció ningún marker prohibido.

## PR #25 COHESION FINDINGS

| Grupo | Dependency | Consumer | Risk | Merge independiente | Stacked |
|---|---|---|---|---|---|
| REVIEW REGISTRY | assets/registry interno | Product Lab / review QA | Alto si cruza cliente público | No | Sí |
| PUBLIC BEFORE SIGNING | legal-core + knowledge graph + contracts limb | usuario web | Medio | Sí, después del no-leak proof | No necesariamente |
| CONTRACTS | contract limb + knowledge graph | Before Signing | Medio | Sí | No |
| KNOWLEDGE GRAPH | contenido/procesos | rutas educativas | Medio | Sí, con integrity tests | No |
| PILOT CONTENT | briefs/claims auxiliares | catálogo/pilot surfaces | Alto si se mezcla con publicación | No sin gates | Sí |
| INTERNAL ASSETS | rutas privadas y manifests | Product Lab | Alto | No con superficie pública | Sí |
| PRODUCT LAB | registry + assets | superficie interna | Alto | Solo como módulo interno | Sí |
| QA / PROOFS | scripts de build, privacy y no-leak | CI | Bajo | Sí | No |
| DOCS | documentación | agentes/revisión humana | Bajo | Sí | No |

PR #25 sigue siendo una unidad grande y mezcla responsabilidades de distinto riesgo. La recomendación no es dividir por estética: debe mantenerse apilado lo que depende de registry/assets/pilot, mientras que QA/proofs y Before Signing hardening pueden revisarse de forma independiente. El hardening portado reduce un riesgo real, pero no convierte automáticamente todo #25 en unidad segura de merge.

## PR #27 ARCHITECTURAL FINDINGS

El red-team de #27 quedó corregido previamente: `legalmente-web` usa un `CanonicalEnvelope` estricto como adapter/DTO y no duplica el schema jurídico de Psyche-creation. La web no calcula claims, jurisdicción, hashes ni gates. #27 permanece draft.

## KEEP / EXTEND / CONNECT / REPAIR / REMOVE

| Tratamiento | Elementos |
|---|---|
| KEEP | utilidad educativa de Before Signing; Contract Limb; Knowledge Graph; Review Registry como superficie interna; proofs existentes |
| EXTEND | `public-route-proof.mjs`; `internal-review-surface-proof.mjs`; tests de contract limb |
| CONNECT | proof público con contenido HTML/JS/CSS/JSON/XML/TXT; Before Signing con conceptos/proceso, no registry |
| REPAIR | base de #26 retargeted al HEAD actual de #25; frontera pública/interna |
| REMOVE AS DUPLICATE | import y render de `@/lib/review/registry` en Before Signing; exposición de `reviewContentIds` |
| SUPERSEDE WITH EVIDENCE | CI histórico de #26 como evidencia suficiente sobre #25; queda sustituido por este portado y sus pruebas |

## WORK ACTUALLY EXECUTED

Se portaron cinco cambios funcionales desde la intención de #26: eliminación del Review Registry de Before Signing, proof interno que audita la superficie pública, inspección profunda de archivos textuales del build público, ajuste del Contract Limb para no transportar review IDs y sus pruebas correspondientes. Se resolvió el conflicto de la página sin tocar `main` ni el PR #25 original.

## TESTS

Pasaron typecheck, lint, legal-core, knowledge-safety, knowledge-integrity, pilot-content, Review Registry, Review Registry files, production assets, Contract Limb, internal review surface, Before Signing surface, build público, public-route proof y `git diff --check`. También pasaron los 30 tests canónicos de Psyche-creation.

## FINAL CI

El CI final debe ejecutarse sobre el commit de la rama auxiliar resultante. El CI verde previo de #26 no se reutiliza como evidencia del commit nuevo.

## EVIDENCE

- Rama auxiliar: `continuation/no-leak-on-pr25-head`.
- Base: `5972ac816f8a031f3e98ca24d38128de1e546746`.
- Patch fuente: `/home/ubuntu/legalmente_operations_v1/pr26-hardening-clean.patch`.
- Scripts: `scripts/public-route-proof.mjs`, `scripts/internal-review-surface-proof.mjs`.
- Superficie: `src/app/antes-de-firmar/page.tsx`.
- Documento: este informe.

## WHAT REMAINS BLOCKED

Merge, deploy, publicación, auto-publish, acceso CRM, intake, servicios profesionales, cambios constitucionales, aprobación humana inventada y cualquier claim nuevo para llenar volumen permanecen bloqueados.

## RECOMMENDATION

- **#25: NOT YET.** Es cohesivo en intención de producto, pero demasiado amplio para una sola decisión de merge mientras mezcla registry, assets internos, pilot content, Product Lab, contratos y superficie pública.
- **#26: SUPERSEDE.** No fusionar la rama original; esta rama auxiliar porta su intención sobre el HEAD actual de #25.
- **#27: NOT YET.** La frontera arquitectónica está reparada y el CI pasó, pero requiere revisión humana separada.

## NEXT GATE

El siguiente gate es el CI remoto del commit final de esta rama auxiliar y después una revisión humana de si el hardening debe permanecer como PR stacked sobre #25 o extraerse como cambio independiente antes del merge.

## OWNER OF NEXT IRREDUCIBLE DECISION

El maintainer humano debe decidir la estrategia de integración de #25 y si acepta un PR auxiliar stacked para el hardening no-leak.
