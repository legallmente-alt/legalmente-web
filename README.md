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

### Primera vía comercial adoptada — Powers Review

La primera vía comercial adoptada es **Corporate Powers / Representation Review — México corporativo**. Está en preparación y permanece inactiva.

- `/servicios/poderes-mexico` — landing de preparación y estado del candidato comercial.
- D-R2-03 permanece `OPEN`: falta aprobación humana de alcance fijo, límite documental, exclusiones, precio fijo y SLA.
- G2 permanece `BLOCKED` hasta cerrar identidad/credencial profesional, territorio, parte contratante, conflictos, privacidad, canal seguro, QA y modelo fiscal.
- G4-B permanece bloqueado hasta cerrar precio público, términos, cancelación/reembolso, evidencia de transacción y mecanismo de pago.
- `POWERS_REAL_CASE_AUTHORIZATION` permanece pendiente incluso después de los gates anteriores y exige aprobación humana expresa.
- No hay intake real, documentos, PII, checkout, pago ni casos reales.

La recomendación de alcance/precio puede prepararse en código o Drive, pero **D-R2-03 no puede cerrarse por CI ni por una inferencia del asistente**. Tampoco un estado técnico `READY` autoriza casos reales.

### Laboratorio sintético — NDA México

El flujo NDA no es la primera vía comercial. Se conserva como laboratorio interno/sintético de Document Review para probar admisibilidad sin datos reales.

- `/preparar/nda-mexico` — preflight determinista `ACCEPT / CLARIFY / REVIEW / STOP`.
- `/servicios/nda-mexico` — redirige al preflight sintético; no es una landing comercial.
- Sin PII, archivos, almacenamiento, email, checkout ni IA jurídica.
- `ACCEPT` solo significa que las respuestas declaradas encajan en el contrato sintético; no crea relación profesional ni autoriza envío o pago.

## Gates de activación comercial

El archivo `src/lib/business-pilot-gates.ts` aplica únicamente a Powers Review y distingue cuatro capas humanas/operativas:

1. `POWERS_D_R2_03_DECISION` — definición cerrada de oferta.
2. `POWERS_G2_EVIDENCE` — responsabilidad profesional/legal.
3. `POWERS_G4_ACTIVATION_EVIDENCE` — contratación/pago.
4. `POWERS_REAL_CASE_AUTHORIZATION` — autorización humana final para capacidades reales.

El repositorio es público: nunca debe almacenar nombres, cédulas, RFC, domicilios, documentos o URLs privadas de evidencia.

Git solo conserva:

- `status`
- `approvalRecordId` opaco
- `approvedByRole`
- `approvedAt`

La evidencia completa permanece en el sistema documental controlado del proyecto.

`preparedForClosedPilot` puede llegar a `true` cuando D-R2-03 + G2 + G4-B estén completos, pero **todas las capacidades reales permanecen OFF** hasta que exista `POWERS_REAL_CASE_AUTHORIZATION` aprobada.

Mientras falta cualquier gate:

- PII del servicio: OFF.
- Recepción documental: OFF.
- Oferta comercial activa: OFF.
- Pago: OFF.
- Caso real: OFF.

El módulo ejecuta pruebas sintéticas fail-closed durante el build para comprobar esta secuencia.

## Stack

Next.js 14 + React 18 + TypeScript + Tailwind.

Scripts:

```bash
npm run dev
npm run build
npm run lint
```

## Rama de trabajo

`feat/business-pilot-preflight-nda-mx`

El nombre histórico de la rama conserva el origen del trabajo NDA; no redefine la vía comercial. El PR debe permanecer revisable y no debe fusionarse como oferta comercial activa mientras D-R2-03/G2/G4-B/GO humano permanezcan abiertos o bloqueados.

## Regla de cierre

Antes de habilitar Powers Review para casos reales se requiere un cambio separado y verificable que cierre, como mínimo: D-R2-03, identidad del prestador, credencial/territorio, conflicto, privacidad/retención, canal seguro, términos, precio total, cancelación/reembolso, fiscalidad/facturación, QA y una autorización humana final de caso real.
