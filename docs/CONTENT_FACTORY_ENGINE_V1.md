# Content Factory Engine V1

## Propósito

El Content Factory Engine convierte un paquete de contenido previamente verificado en tres salidas deterministas: copy tipográfico para una pieza social vertical, dirección visual para un motor de imágenes y un handshake de datos para una superficie web. El motor no inventa afirmaciones jurídicas, no verifica fuentes por sí mismo y no autoriza publicación.

## Entrada canónica

La entrada es un JSON con `contentId`, `territory`, `sourceClaims` y un `payload` discriminado por `archetype`: `A` para mito legal, `B` para «no son lo mismo», `C` para concepto jurídico y `D` para listado de prevención. Los esquemas viven en `src/schemas/content-factory.ts`, son estrictos y rechazan campos desconocidos, CTA externas, territorios inconsistentes y fuentes sin autoridad, artículo, fecha, URL y territorio.

Cada afirmación material debe llegar con una fuente primaria exacta y una fecha de verificación. El motor solo transporta ese registro. Un paquete inválido termina con error y no crea archivos parciales.

## Ejecución

```bash
npm run content:build -- --input /ruta/al/claim-packet.json --out output/LM-ID
```

La salida contiene `copy_social.md`, `visual_prompt.json` y `handshake_web.json`. El prompt visual usa dirección editorial fotorrealista 9:16, evita clichés jurídicos, incorpora la placa física grabada «LM LEGALMENTE» y conserva los tokens visuales definidos por el briefing. La composición de texto se mantiene separada del proveedor de imágenes para evitar que una generación imperfecta altere el copy jurídico.

## Cuatro contratos

| Arquetipo | Contrato | Cierre obligatorio |
|---|---|---|
| A | Mito legal | Veredicto, fuente primaria, acción, tres preguntas y CTA interna |
| B | No son lo mismo | Dos conceptos con base jurídica, regla práctica, tres preguntas y CTA |
| C | Concepto jurídico | Definición, interés protegido, límite, fuente primaria, tres preguntas y CTA |
| D | Checklist de prevención | Cinco a diez conductas observables, regla de cierre, tres preguntas y CTA |

## Privacidad y autoridad

El handshake declara `NO_VERIFICADO` y una política de persistencia exclusivamente cliente. El generador no acepta ni escribe nombres, correos, teléfonos, domicilios, identificadores, expedientes ni documentos personales. La existencia de un archivo de salida no equivale a aprobación legal, revisión visual humana o autorización de publicación.

## Integración web

`AdvisorQuestions` y `PrintSummaryButton` viven en `src/components/legalmente/AdvisorQuestions.tsx` como componentes cliente. La ruta `/antes-de-firmar` muestra la tarjeta estándar de tres preguntas y permite abrir el diálogo de impresión del navegador. Las reglas `@media print` ocultan navegación, enlaces y controles, y presentan una hoja de resumen sin dependencia de servidor.

## Verificación

La validación mínima es:

```bash
npm run typecheck
npm run lint
npm run test:legal-core
npm run test:knowledge-safety
npm run test:knowledge-integrity
npm run test:ecosystem-kernel
npm run test:agent-contribution
node --import tsx --test src/schemas/content-factory.test.ts
npm run build:public
```

Este componente permanece provider-neutral y no llama automáticamente a Canva, Midjourney ni a ningún proveedor externo. La selección de proveedor, la generación visual real y cualquier publicación requieren gates independientes y decisión humana.
