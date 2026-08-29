# LegalMente — Launch Candidate Readiness V1

**Estado:** `EDUCATIONAL_STATIC_CANDIDATE / NOT_DEPLOYED / NOT_LEGAL_APPROVAL`  
**Rama:** `agent/legalmente-educational-launch-v1`  
**Pull request:** [PR #7](https://github.com/legallmente-alt/legalmente-web/pull/7)  
**Corte:** 29 de agosto de 2026.

## Alcance que sí está preparado

La candidata concentra el primer ciclo en una experiencia educativa panhispánica con foco inicial en México. La home conduce a `/antes-de-firmar`, una herramienta determinista que solo revisa señales estructurales: identificación de partes, contraprestación, vigencia/terminación, espacios o anexos pendientes y ley/foro aplicable. No acepta texto libre, nombres, correos, documentos, expedientes, pagos ni casos reales.

La experiencia editorial existente del branch visual permanece disponible en `/explorar`, `/confianza`, `/catalogo`, `/sobre` y las rutas relacionales de mundos, conceptos, procesos, series y capítulos. La dirección visual se conserva; la mejora aplicada a la entrada es de jerarquía, navegación, legibilidad y calidad técnica, no de sustitución arbitraria del sistema.

## Evidencia técnica

| Control | Resultado | Evidencia |
|---|---|---|
| Producción Next.js | PASS | `npm run build` genera export estático con 56 rutas |
| TypeScript | PASS | `npm run typecheck` |
| ESLint | PASS | `npm run lint`, sin warnings ni errores |
| Legal core | PASS | 13 pruebas, incluyendo rechazo de dictamen de validez |
| Knowledge safety | PASS | 3 pruebas de límites territoriales y no automatización |
| Privacy smoke | PASS | 36 archivos revisados; sin formularios, texto libre, almacenamiento o trackers bloqueados |
| Static export | PASS | `out/` contiene `_headers`, `robots.txt` y las rutas educativas |
| Internal lab | FAIL-CLOSED | El sanitizer `build:public` elimina `/internal/` del artefacto público; la ruta permanece en el código para el laboratorio interno |
| CI GitHub | PASS | workflow de validación de PR #7: [run 33251213202](https://github.com/legallmente-alt/legalmente-web/actions/runs/33251213202) |

## Cambios aplicados

Se añadió `/antes-de-firmar` con controles transient/no-PII y salida estructural; la home y la navegación ahora lo presentan como CTA principal; `/confianza` declara el alcance de datos de esta versión; se añadió `robots.txt`; el branch se configuró para `output: export` y `trailingSlash`; los headers se trasladaron a `public/_headers`, que sí acompaña el artefacto estático de Cloudflare Pages; y el smoke de privacidad distingue controles checkbox transitorios de captura de datos.

## Lo que sigue bloqueado

Este documento no aprueba el release público ni sustituye revisión jurídica. Continúan bloqueados `PUBLIC_RELEASE`, `PII_COLLECTION`, `CASE_TEXT_INPUT`, `DOCUMENT_UPLOAD`, `PAYMENTS` y `PROFESSIONAL_SERVICE_ACTIVATION` hasta que exista aprobación humana explícita sobre privacidad/retención/eliminación, términos y disclosure, proveedor de hosting, rollback, logs, correcciones/incidentes y autorización final de publicación.

El repositorio no tiene GitHub Pages ni homepage de producción. Existe un proyecto Pages aislado para el candidato educativo. La creación de un proyecto de hosting y el deploy a una URL real deben ocurrir solo después de confirmar proveedor, dominio/URL canónica, rama de producción y estrategia de rollback. El sitio histórico revisado exige inicio de sesión y no debe considerarse el destino del nuevo lanzamiento.

## Decisión operativa

La candidata está lista para **revisión de release y publicación educativa controlada**, no para presentarse como un servicio profesional activo. El siguiente paso irreversible es uno solo: aprobar la configuración de hosting y autorizar el deploy del commit `7316a94` o de su descendiente validado. Si se autoriza, el deploy debe ser estático, sin analítica de terceros, sin captura de datos y con verificación pública de las rutas, headers, robots y 404 interno.
