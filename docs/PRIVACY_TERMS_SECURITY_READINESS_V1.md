# LEGALMENTE — PRIVACY / TERMS / SECURITY READINESS V1

Estado: `INTERNAL_READINESS / NOT LEGAL_APPROVAL / NOT RELEASE_AUTHORIZATION`.

Este documento no es aviso de privacidad, términos de uso ni dictamen jurídico. Es un contrato técnico de cierre para impedir que el producto avance a release sin resolver privacidad, términos, seguridad y operación.

## 1. Estado técnico observado en la rama aislada

El primer privacy smoke reveló una superficie legacy que contradecía la intención fail-closed: `/contacto` contenía nombre, correo y texto libre aunque el propio formulario indicaba que todavía no estaba conectado a backend.

Ese formulario fue retirado. `/contacto` ahora es una superficie informativa cerrada que no acepta datos y advierte expresamente no enviar nombres, documentos, expedientes, datos de salud ni detalles identificables de una situación jurídica.

En el runtime corregido no se introducen deliberadamente formularios de usuario, autenticación, pagos, PII, almacenamiento local de datos del usuario ni SDK de analítica/telemetría de terceros como parte de la experiencia relacional.

CI incorpora `scripts/privacy-surface-smoke.mjs`, que falla si detecta nuevas superficies sensibles conocidas en `src/app`, `src/components` o `src/lib`, incluyendo formularios/inputs, localStorage/sessionStorage, client cookies, sendBeacon y trackers comunes.

Esto es una guardia de regresión técnica, no una garantía de privacidad ni una revisión normativa completa.

## 2. Gate de privacidad — sigue BLOQUEADO

Antes de cualquier release público debe existir aprobación explícita sobre:

- qué datos se recolectan realmente, si alguno;
- finalidad y base/justificación aplicable por territorio cuando corresponda;
- retención y eliminación;
- encargados/proveedores y transferencias;
- cookies/telemetría/analytics;
- canal para solicitudes de privacidad;
- manejo de incidentes;
- tratamiento diferenciado si posteriormente se habilitan herramientas que acepten información de casos o documentos.

Regla V1: ninguna superficie debe aceptar PII o texto libre de un caso real hasta que exista un diseño de privacidad/seguridad expresamente aprobado.

## 3. Gate de términos y disclosure — sigue BLOQUEADO

Debe aprobarse texto público coherente con la Constitución de LegalMente que deje claro, como mínimo:

- naturaleza educativa y de preparación;
- ausencia de asesoría jurídica individual automática;
- límites territoriales;
- fuentes y fecha/contexto cuando aplique;
- necesidad de profesional cuando el nivel de riesgo lo exija;
- reglas de corrección/actualización;
- condiciones específicas para herramientas de cálculo o preparación.

No publicar texto legal generado automáticamente como “términos definitivos” sin revisión humana autorizada.

## 4. Gate de seguridad / operación — sigue BLOQUEADO

Antes de deploy público deben cerrarse al menos:

- entorno y proveedor de hosting aprobados;
- secretos fuera de repositorio;
- headers de seguridad y política de contenido según arquitectura final;
- estrategia de logs sin PII innecesaria;
- rollback verificable;
- monitoreo de disponibilidad/errores;
- procedimiento de corrección/incidente;
- backups si posteriormente aparece estado persistente;
- dependencias revisadas y política de actualización;
- separación clara entre preview/internal y público.

## 5. Regla fail-closed

Hasta que los gates anteriores tengan aceptación explícita:

`PUBLIC_RELEASE = BLOCKED`

`PII_COLLECTION = BLOCKED`

`CASE_TEXT_INPUT = BLOCKED`

`DOCUMENT_UPLOAD = BLOCKED`

`PAYMENTS = BLOCKED`

`PROFESSIONAL_SERVICE_ACTIVATION = BLOCKED`

`THIRD_PARTY_ANALYTICS = BLOCKED_UNLESS_EXPLICITLY_REVIEWED`

## 6. Lo que este documento sí permite

Puede continuar:

- desarrollo aislado;
- contenido sintético/no personal;
- navegación relacional;
- QA visual/responsive/accesibilidad;
- herramientas fail-closed ya congeladas para implementación interna;
- pruebas automáticas;
- preparación del microlote sin publicación.

## 7. Próximo criterio de cierre

Este gate solo cambia cuando existan artefactos revisables y responsables humanos para:

1. privacidad/retención/eliminación;
2. términos/disclosure;
3. seguridad/deploy/rollback/logging;
4. autorización de release.

Hasta entonces, mantener PR #5 aislado y sin merge/deploy/publicación.
