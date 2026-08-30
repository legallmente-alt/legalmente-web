# Wave 01A — Auditoría de dependencias y release gate

**Fecha de revisión:** 2026-08-30 UTC  
**Resultado funcional:** el paquete, el grafo, el tipado, lint, build y artefacto público pasan.  
**Resultado de seguridad:** `RELEASE_BLOCKED_PENDING_DEPENDENCY_REVIEW`.

## Hallazgos

`npm audit --omit=dev --audit-level=high` reportó dos vulnerabilidades de severidad alta en el runtime: `next@14.2.35` y el `postcss` anidado que instala Next. La auditoría completa reportó cinco vulnerabilidades altas al incluir herramientas de desarrollo, entre ellas `@next/eslint-plugin-next`, `eslint-config-next` y `glob`.

El remedio automático disponible propone `next@16.3.3` y se marca como actualización mayor. No se aplicó `npm audit fix --force` porque podría cambiar el contrato de Next, React y `next lint`; una actualización mayor requiere una rama de dependencia separada, revisión de compatibilidad y un ciclo de pruebas propio.

| Control | Resultado | Evidencia |
|---|---|---|
| Auditoría runtime | `FAIL / HIGH` | 2 vulnerabilidades altas en `npm audit --omit=dev`. |
| Auditoría total | `FAIL / HIGH` | 5 vulnerabilidades altas en `npm audit`. |
| Actualización automática | `NOT_APPLIED` | El remedio propuesto es `next@16.3.3`, cambio mayor. |
| Lint y tipado actuales | `PASS` | `npm run lint` y `npm run typecheck`. |
| Build de producción | `PASS` | `npm run build`. |
| Artefacto público | `PASS` | `npm run build:public` y `npm run test:public-routes`. |

## Gate requerido

Antes de cualquier deploy de producción debe crearse una rama de actualización de dependencias, comprobar compatibilidad con Next/React y repetir pruebas legales, conocimiento, tipado, lint, build público, proof de rutas y revisión visual. Este gate es independiente de `READY_FOR_COPY`, `PRODUCT_REVIEW_REQUIRED`, `SEPARATED_PENDING_BINDING` y `NOT_PUBLIC`.
