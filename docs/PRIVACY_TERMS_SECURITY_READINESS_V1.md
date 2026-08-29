# LEGALMENTE — PRIVACY / TERMS / SECURITY READINESS V1

> **STATUS RECONCILIATION — 2026-08-29:** the static, non-PII educational release is now live in an isolated Cloudflare Pages project. Therefore the historical blanket state `PUBLIC_RELEASE = BLOCKED` is superseded for that narrow educational surface by `docs/CURRENT_RELEASE_STATE_V2.md`. All sensitive-capability gates in this document remain fail-closed.

Estado actual del alcance sensible: `NO_PII / NO_CASE_TEXT / NO_DOCUMENT_UPLOAD / NO_PAYMENTS / PROFESSIONAL_SERVICES_DISABLED / NOT_LEGAL_APPROVAL_FOR_SENSITIVE_CAPABILITIES`.

Este documento no es aviso de privacidad, términos de uso ni dictamen jurídico. Es un contrato técnico de cierre para impedir que las capacidades sensibles avancen sin resolver privacidad, términos, seguridad y operación.

## 1. Estado técnico observado

El primer privacy smoke reveló una superficie legacy: `/contacto` contenía nombre, correo y texto libre aunque no estaba conectada a backend. Ese formulario fue retirado. `/contacto` es ahora una superficie informativa cerrada.

En el release educativo no se introducen deliberadamente autenticación, pagos, PII, texto libre de casos, almacenamiento local de datos del usuario ni SDK de analítica/telemetría de terceros. CI incorpora `scripts/privacy-surface-smoke.mjs`, que falla si detecta superficies sensibles conocidas.

Esto es una guardia de regresión técnica, no una garantía de privacidad ni una revisión normativa completa.

## 2. PII / case / document privacy gate — BLOQUEADO

Antes de habilitar cualquier captura real debe existir aprobación explícita sobre:

- inventario de datos y finalidad;
- base/justificación aplicable por territorio cuando corresponda;
- retención y eliminación;
- encargados/proveedores y transferencias;
- cookies/telemetría/analytics;
- canal para solicitudes de privacidad;
- manejo de incidentes;
- tratamiento específico para casos, contratos y documentos.

Regla: ninguna superficie debe aceptar PII o texto libre de un caso real hasta que exista un diseño de privacidad/seguridad expresamente aprobado.

## 3. Términos y disclosure

El release educativo necesita texto público coherente con la Constitución de LegalMente que deje claro naturaleza educativa/preparatoria, ausencia de asesoría jurídica individual automática, límites territoriales, fuentes/contexto cuando corresponda, correcciones y condiciones de uso de herramientas.

Cualquier término definitivo o política aplicable a futuras capacidades sensibles requiere revisión humana autorizada. No promover texto generado automáticamente a términos definitivos.

## 4. Seguridad / operación

La superficie estática ya dispone de headers básicos, sanitizer de `/internal/` y build estático. Aun así, el cierre operativo debe documentar y mantener:

- proveedor y rama/fuente de hosting;
- rollback verificable;
- política de logs sin PII innecesaria;
- monitoreo de disponibilidad/errores;
- procedimiento de corrección/incidente;
- política de dependencias;
- CSP u otra decisión explícita sobre política de contenido según arquitectura;
- separación entre laboratorio/internal y público;
- backups cuando exista estado persistente.

## 5. Regla fail-closed actual

`EDUCATIONAL_STATIC_RELEASE = LIVE_CONTROLLED`

`PII_COLLECTION = BLOCKED`

`CASE_TEXT_INPUT = BLOCKED`

`DOCUMENT_UPLOAD = BLOCKED`

`PAYMENTS = BLOCKED`

`PROFESSIONAL_SERVICE_ACTIVATION = BLOCKED`

`REAL_CONTRACT_DRAFT = BLOCKED`

`THIRD_PARTY_ANALYTICS = BLOCKED_UNLESS_EXPLICITLY_REVIEWED`

## 6. Lo que puede continuar

Puede continuar desarrollo de contenido/no-PII, navegación relacional, QA visual/responsive/accesibilidad, herramientas deterministas sin intake, pruebas automáticas, preparación de microlote y prototipos sintéticos del Contract Engine.

## 7. Próximo criterio de cierre

Antes de activar cualquier capacidad sensible deben existir artefactos revisables y responsables humanos para privacidad/retención/eliminación, términos/disclosure, seguridad/rollback/logging/incidentes y autorización de la capacidad concreta.

El estado operativo global del release se consulta en `docs/CURRENT_RELEASE_STATE_V2.md`.
