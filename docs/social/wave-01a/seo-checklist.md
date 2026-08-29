# SEO / Discovery — Wave 01A

**Estado actual:** no se modifica el sitemap ni se crea una taxonomía nueva. Las tres unidades permanecen en `PRODUCT_REVIEW_REQUIRED` y `NOT_PUBLIC`; por tanto, este sprint no añade URLs nuevas al sitemap público.

| Control | Estado actual | Condición para avanzar |
|---|---|---|
| Sitemap existente | `PASS / SIN CAMBIO` | Las rutas candidatas ya pertenecen a familias existentes. |
| Robots | `PASS / SIN CAMBIO` | No se abre ninguna superficie interna. |
| Canonical | `DEFERRED` | Verificar por ruta solo después de aprobar integración pública. |
| Open Graph / social preview | `DEFERRED` | Crear metadata por ruta solamente con aprobación de producto. |
| Structured data | `DEFERRED` | No añadir schema si no existe una correspondencia editorial clara. |
| 404 | `PASS` | Las tres URLs candidatas responden 200 en el dominio educativo verificado. |
| Internal leakage | `PASS` | El build público elimina rutas, assets y chunks internos. |

## Regla de publicación

No indexar, enlazar desde campañas ni publicar una unidad Wave 01A hasta que exista `PUBLIC_INTEGRATION_APPROVED`, se ejecute QA de integración y se tome una decisión separada de publicación. La preparación social utiliza el dominio educativo canónico verificado, pero el CSV no autoriza carga ni publicación.
