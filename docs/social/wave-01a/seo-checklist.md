# SEO / Discovery — Wave 01A

**Estado actual:** no se modifica el sitemap ni se crea una taxonomía nueva. `LM-PC-013` conserva una ruta candidata con `PRODUCT_REVIEW_REQUIRED`; `LM-PC-031` y `LM-PC-065` permanecen `SEPARATED_PENDING_BINDING` y `NOT_PUBLIC`. Este sprint no añade URLs nuevas al sitemap público.

| Control | Estado actual | Condición para avanzar |
|---|---|---|
| Sitemap existente | `PASS / SIN CAMBIO` | No se agregan URLs nuevas; la única ruta candidata es existente. |
| Robots | `PASS / SIN CAMBIO` | No se abre ninguna superficie interna. |
| Canonical | `DEFERRED` | Verificar la ruta de LM-PC-013 solo después de aprobar integración pública. |
| Open Graph / social preview | `DEFERRED` | Crear metadata por ruta solamente con aprobación de producto. |
| Structured data | `DEFERRED` | No añadir schema si no existe una correspondencia editorial clara. |
| 404 | `DEFERRED` | No hay rutas candidatas para LM-PC-031/065; la ruta de LM-PC-013 se valida en QA de integración. |
| Internal leakage | `PASS` | El build público elimina rutas, assets y chunks internos. |

## Regla de publicación

No indexar, enlazar desde campañas ni publicar una unidad Wave 01A hasta que exista evidencia Founder verificable de integración, se ejecute QA de integración y se tome una decisión separada de publicación. Ninguna unidad tiene URL, breadcrumbs ni enlaces públicos aprobados. La preparación social conserva assets locales; no existen URLs de media durables y el CSV no autoriza carga ni publicación.
