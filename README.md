# legalmente-web

Sitio web de LegalMente — educación jurídica panhispánica con una ruta profesional separada y gobernada.

## Fuente de verdad

- Drive / Constitución vigente: identidad, separación entre educación y servicios, estrategia y decisiones.
- `Psyche-creation`: estado técnico canónico de verificación/gates y controles editoriales.
- Este repositorio: implementación del sitio web.

Una página o copy en este repo no autoriza por sí misma publicación, cobro, recepción de documentos ni prestación profesional.

## Arquitectura de producto

### LegalMente educativo

Contenido jurídico claro, panhispánico y verificable. El contenido educa; no diagnostica casos particulares ni promete resultados.

Rutas actuales:

- `/` — inicio educativo.
- `/sobre` — identidad del proyecto.
- `/areas-de-practica` — áreas cubiertas como contenido educativo.
- `/catalogo` — catálogo editorial.
- `/casos` — casos/ejemplos educativos, sujetos a verificación antes de publicarse.
- `/contacto` — contacto general; actualmente sin backend.

### Ruta profesional separada — Business Pilot

El piloto profesional no se presenta como una extensión automática del contenido educativo.

- `/servicios/nda-mexico` — landing de estado/alcance del futuro piloto de revisión acotada de NDA simple — México.
- `/preparar/nda-mexico` — preflight determinista de alcance, sin PII ni carga documental.

Estado actual del piloto:

- G1 Service Definition: definido en Drive.
- G2 Professional & Legal Responsibility: bloqueado hasta identificar/validar responsable o entidad profesional, contratación, privacidad, conflicto, canal seguro, fiscalidad y QA.
- G3 Preflight: implementación sintética con rutas `ACCEPT / CLARIFY / REVIEW / STOP`.
- G4-A Commercial Design: listo como diseño; precio interno experimental no publicado.
- G4-B Commercial Activation: bloqueado por G2.
- Cobro: deshabilitado.
- Upload: deshabilitado.
- PII del piloto: no se captura.
- OAuth/Drive/Gmail: no implementados para el piloto.

`ACCEPT` en el preflight solo significa que las respuestas declaradas encajan en el alcance sintético. No crea relación profesional, no acepta un documento y no autoriza pago.

## Invariantes del piloto mientras G2 esté bloqueado

- `documentUploadAllowed=false` en todas las rutas.
- `businessGate=G2_BLOCKED`.
- Sin `input[type=file]` para el piloto.
- Sin API/endpoint de envío del preflight.
- Sin checkout.
- Sin almacenamiento de contratos.
- Sin IA jurídica para clasificar el documento.
- Sin precio presentado como oferta vigente.
- Sin CTA “contrata ahora” o equivalente.

## Stack

Next.js 14 + React 18 + TypeScript + Tailwind.

Scripts:

```bash
npm run dev
npm run build
npm run lint
```

## Rama de Business Pilot

`feat/business-pilot-preflight-nda-mx`

El PR correspondiente debe permanecer revisable y no debe fusionarse como oferta comercial activa mientras G2 permanezca bloqueado. Un merge técnico tampoco constituye autorización de publicación o cobro.

## Regla de cierre

Antes de habilitar casos reales se requiere un cambio separado y verificable que demuestre G2 en verde y cierre: identidad del prestador, territorio, conflicto, privacidad/retención, canal seguro, engagement/términos, precio total, cancelación/reembolso, fiscalidad/facturación, QA y autorización humana de activación.
