# LegalMente — Contribución: argumento visual por canal — 12 SEP 2026

**Estado:** `IMPLEMENTATION_CANDIDATE` · `NOT_MERGED` · `NOT_DEPLOYED` · `NOT_PUBLISHED`

## Problema

La nueva capa de argumento visual exige definir la función de la imagen antes del estilo, pero todavía no expresaba el contexto de destino. Una misma función puede ser adecuada para Instagram, LinkedIn LegalMente, LinkedIn Founder o el sitio, pero no tiene la misma prioridad narrativa en cada superficie.

## Evidencia

- La instrucción maestra vigente distingue LegalMente general, LinkedIn LegalMente, LinkedIn Raymundo y sitio.
- La bitácora del 12 de septiembre exige imagen-argumento, variedad perceptiva y una biblioteca artística expansiva, sin convertir la variedad nominal en prueba de calidad.
- El preflight visual activo ya bloquea argumentos duplicados y exige diversidad funcional, pero no ofrece una señal de compatibilidad por canal.
- Los PRs #47 y #49 están verdes y siguen sin merge, deploy ni publicación; por eso esta contribución se mantiene aislada.

## Hipótesis

Si el preflight registra el canal y distingue entre función preferida y función compatible, el motor podrá proponer imágenes más pertinentes para cada superficie sin crear una prohibición rígida ni cambiar la autoridad jurídica.

## Cambio

- Se añadió `channel` opcional a `VisualArgumentPlan`.
- Se añadieron preferencias funcionales por canal:
  - Instagram: tensión, revelación, humanización y consecuencia.
  - LinkedIn LegalMente: explicación, separación, comparación, proceso, consecuencia y advertencia.
  - LinkedIn Founder: reflexión, humanización, revelación, tensión y consecuencia.
  - Website: explicación, proceso, separación, comparación y materialización de abstracciones.
- Se añadió `visualFunctionChannelFit()`.
- Las funciones compatibles pero no preferidas producen advertencia para revisión humana, no un bloqueo automático.
- Se preservan los gates existentes: QA visual renderizado, curación humana, claims, merge, deploy y publicación permanecen separados.

## Validación

Pruebas esperadas: función preferida por canal, función compatible con advertencia, duplicados y diversidad funcional. La contribución no afirma mejora de rendimiento ni calidad visual renderizada; solo mejora la intención upstream.

## Rollback

Revertir este commit elimina el campo opcional, las preferencias y sus pruebas. No requiere cambios en Drive, proveedores, claims, publicación ni configuración de cuentas.

## Artefactos afectados

- `src/lib/visual-argument/index.ts`
- `src/lib/visual-argument/index.test.ts`
- Este receipt
