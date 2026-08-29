# LegalMente — Launch Candidate Readiness V1

> **HISTORICAL STATUS NOTICE — 2026-08-29:** this document describes the pre-deployment candidate state. The isolated static educational release was subsequently deployed and merged into `main`. For current operational state use `docs/CURRENT_RELEASE_STATE_V2.md`. The sensitive-capability restrictions below remain applicable to PII, case text, document upload, payments and professional services.

**Estado histórico:** `EDUCATIONAL_STATIC_CANDIDATE / PRE-DEPLOYMENT / NOT_LEGAL_APPROVAL`  
**Rama histórica:** `agent/legalmente-educational-launch-v1`  
**Pull request:** [PR #7](https://github.com/legallmente-alt/legalmente-web/pull/7)  
**Corte:** 29 de agosto de 2026.

## Alcance que sí estaba preparado

La candidata concentra el primer ciclo en una experiencia educativa panhispánica con foco inicial en México. La home conduce a `/antes-de-firmar`, una herramienta determinista que solo revisa señales estructurales: identificación de partes, contraprestación, vigencia/terminación, espacios o anexos pendientes y ley/foro aplicable. No acepta texto libre, nombres, correos, documentos, expedientes, pagos ni casos reales.

La experiencia editorial existente del branch visual permanece disponible en `/explorar`, `/confianza`, `/catalogo`, `/sobre` y las rutas relacionales de mundos, conceptos, procesos, series y capítulos. La dirección visual se conserva; la mejora aplicada a la entrada es de jerarquía, navegación, legibilidad y calidad técnica, no de sustitución arbitraria del sistema.

## Evidencia técnica histórica

| Control | Resultado | Evidencia |
|---|---|---|
| Producción Next.js | PASS | `npm run build` generaba export estático con 56 rutas |
| TypeScript | PASS | `npm run typecheck` |
| ESLint | PASS | `npm run lint`, sin warnings ni errores |
| Legal core | PASS | 13 pruebas, incluyendo rechazo de dictamen de validez |
| Knowledge safety | PASS | 3 pruebas de límites territoriales y no automatización |
| Privacy smoke | PASS | 36 archivos revisados; sin formularios, texto libre, almacenamiento o trackers bloqueados |
| Static export | PASS | `out/` contenía `_headers`, `robots.txt` y las rutas educativas |
| Internal lab | FAIL-CLOSED | El sanitizer `build:public` elimina `/internal/` del artefacto público |
| CI GitHub | PASS | workflow de validación de PR #7: run `33251213202` |

## Cambios aplicados

Se añadió `/antes-de-firmar` con controles transient/no-PII y salida estructural; la home y la navegación lo presentan como CTA principal; `/confianza` declara el alcance de datos de esta versión; se añadió `robots.txt`; el branch se configuró para `output: export` y `trailingSlash`; los headers se trasladaron a `public/_headers`; y el smoke de privacidad distingue controles checkbox transitorios de captura de datos.

## Restricciones que siguen vigentes

La existencia de un release educativo estático no autoriza capacidades sensibles. Siguen bloqueados `PII_COLLECTION`, `CASE_TEXT_INPUT`, `DOCUMENT_UPLOAD`, `PAYMENTS` y `PROFESSIONAL_SERVICE_ACTIVATION` hasta que existan los artefactos, revisión y autorización correspondientes.

La activación de nuevas capacidades sensibles requiere privacidad/retención/eliminación, términos y disclosure, seguridad/operación, rollback, logs, correcciones/incidentes y autorización humana separada.

## Estado posterior

El paso irreversible descrito originalmente en este documento ya ocurrió para la superficie educativa estática aislada. Eso no convierte a LegalMente en un servicio profesional ni habilita intake. Consultar `docs/CURRENT_RELEASE_STATE_V2.md` para la separación vigente entre release educativo y capacidades sensibles/profesionales.
