# LegalMente — Production Asset Import V1

## Alcance

Se importaron los 20 PNG del paquete vinculado de Drive `LEGALMENTE_PRODUCTION_ASSET_PACK_V1.zip` al directorio interno `public/internal-assets/legalmente/production-assets/`. El paquete contiene cuatro assets por cada rol: `WORLD_CATEGORY`, `SERIES`, `TOOL_PREPARATION`, `TRUST_SOURCE_TERRITORY` y `EDITORIAL_CONTENT`.

## Verificación

El proof `scripts/production-asset-file-proof.mjs` lee los nombres declarados en `src/lib/visual-system/assets.ts`, exige 20 archivos únicos, comprueba firma PNG, tamaño mínimo y registra bytes, dimensiones y SHA-256 observados. El resultado actual es `PASS` para los 20 assets.

La disponibilidad del registro visual pasó de `PENDING_BINARY_IMPORT` a `LOCAL`; `productionAssetPack.binaryImportPending` es `false`. Esto significa que el binario está en el repositorio interno y coincide con el paquete importado. No significa aprobación de copy, autorización de publicación ni QA artística final: `artQaPending` permanece `true` y `publicationReady` permanece `false`.

## Límites

Los assets viven bajo `public/internal-assets` y el build público los elimina junto con las rutas, chunks y superficies internas. No se añadió copy jurídico incrustado en las imágenes, no se añadieron claims, fechas, montos, URLs, PII o jurisdicciones al arte y no se modificó el texto canónico. La importación no activa publicación, merge, deploy, servicios profesionales, documentos reales, pagos ni analytics.

## Proveniencia

| Campo | Valor |
|---|---|
| Carpeta Drive | `1LWz9iYtXb-gkvCSWnxpSAVugFZVpIFJP` |
| Manifest Drive | `1s_NTt_0dlAPsuAYBlpATjzVi-JPwsur_` |
| Paquete | `LEGALMENTE_PRODUCTION_ASSET_PACK_V1.zip` |
| Assets importados | 20 |
| Estado binario | `LOCAL` |
| QA artístico | Pendiente de revisión humana |
| Publicación | No autorizada |

## Siguiente gate

La revisión humana debe confirmar el mapping asset→surface→crop, la accesibilidad, la lectura visual y la conveniencia de usar cada recurso. El proof técnico sólo demuestra integridad y disponibilidad binaria; no sustituye esa revisión.
