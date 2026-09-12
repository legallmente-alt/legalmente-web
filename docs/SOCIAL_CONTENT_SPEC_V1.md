# LegalMente — Especificación social y control de calidad V1

**Estado:** `APPROVED_FOR_INTERNAL_USE`  
**Canal inicial:** Instagram `@legalmentees`  
**Alcance:** educación y preparación jurídica; no asesoría individual.

## Contrato mínimo de cada pieza

Una pieza no puede pasar a `READY_FOR_PUBLICATION` si no contiene estos campos:

| Campo | Requisito |
|---|---|
| `contentId` | Identificador único y estable |
| `format` | `reel`, `carousel` o `story` |
| `hook` | Pregunta o tensión concreta |
| `promise` | Qué distinguirá la audiencia |
| `territory` | País o `general-principle` |
| `asOf` | Fecha de referencia |
| `source` | Fuente verificable y versión |
| `certainty` | `general-principle`, `jurisdiction-check` o `verified` |
| `qualifier` | Límite explícito frente a asesoría individual |
| `relatedRoute` | Ruta de LegalMente relacionada |
| `assetProvenance` | Titular, licencia/permiso y evidencia |
| `accessibility` | Subtítulos, alt text, contraste y portada legible |
| `humanReview` | Responsable y fecha de revisión |
| `status` | `DRAFT`, `HUMAN_REVIEW_REQUIRED`, `READY_FOR_PUBLICATION` o `NOT_PUBLIC` |

## Reglas de formato

### Reel

Duración recomendada de 20–35 segundos para descubrimiento y hasta 60 segundos para explicación práctica. La primera escena debe comunicar la pregunta sin depender del audio. Los subtítulos deben ser revisados manualmente y el texto no debe ocupar la zona de interfaz. La portada debe seguir siendo legible en una cuadrícula pequeña.

### Carrusel

Entre 5 y 7 láminas. La primera formula la tensión; las siguientes separan conceptos, presentan un ejemplo hipotético y ofrecen una lista de contraste; la última incluye fuente, territorio, fecha y CTA educativo. Evitar párrafos densos y texto jurídico diminuto.

### Story

Usar para preguntas de comprensión, encuestas no sensibles y dirigir a fuentes o rutas educativas. No usar para solicitar casos, documentos, nombres, diagnósticos ni detalles de conflictos.

## Control de afirmaciones

La publicación debe distinguir entre:

- lo que dice una fuente;
- la explicación educativa de LegalMente;
- la variabilidad territorial o temporal;
- lo que no puede concluirse sobre una persona o documento.

Quedan bloqueadas las frases que prometan resultados, determinen derechos individuales, validen contratos concretos, identifiquen culpabilidad o inviten a compartir información confidencial.

## Métricas sin sobreinterpretación

Registrar alcance, vistas, likes, comentarios, shares y saves. Priorizar shares y saves como señales de utilidad, pero no convertir una métrica en prueba de calidad jurídica. Un alto rendimiento nunca sustituye revisión de fuente, territorio, vigencia, procedencia o derechos.

## Puente con el producto

Cada pieza aprobada debe apuntar, cuando corresponda, a una sola ruta: concepto, proceso, mundo, fuente o herramienta. La red social debe abrir una pregunta; LegalMente debe ofrecer la ruta de comprensión y sus límites. No se debe crear una ruta solo para justificar una publicación.

## Estados

- `DRAFT`: idea sin revisión.
- `HUMAN_REVIEW_REQUIRED`: existe contenido, pero falta verificar fuente, territorio, claims, assets o límites.
- `READY_FOR_PUBLICATION`: todos los campos completos y revisión humana registrada.
- `PUBLISHED`: existe recibo de publicación y URL real.
- `NOT_PUBLIC`: bloqueada por riesgo, licencia, falta de fuente o ausencia de autorización.
