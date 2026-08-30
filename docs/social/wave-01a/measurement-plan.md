# Wave 01A — Medición y UTM

**Estado:** plan preparado; instrumentación y campañas no activadas.

## Principios

La medición debe conservar `CONTENT_ID`, `CLAIM_IDS`, canal, territorio, ruta de origen y versión del asset, sin enviar nombres, documentos, textos libres ni cualquier dato personal. El paquete no introduce un proveedor de analítica porque el repositorio no tiene una integración de medición activa y no se debe inventar un endpoint.

## Eventos propuestos

| Evento | Cuándo | Parámetros mínimos | Estado |
|---|---|---|---|
| `lm_wave01a_view` | La unidad se renderiza en una superficie autorizada | `content_id`, `channel`, `integration_state`, `publication_state`, `asset_id` | Preparado; no instrumentado. |
| `lm_wave01a_source_open` | La persona abre la fuente oficial | `content_id`, `claim_ids`, `source_domain`, `territory` | Preparado; no instrumentado. |
| `lm_wave01a_cta` | Se activa un CTA editorial no transaccional | `content_id`, `channel`, `cta_type`, `route` | Preparado; no instrumentado. |
| `lm_wave01a_save_intent` | La plataforma o superficie informa una acción de guardado | `content_id`, `channel`, `asset_id` | Preparado; no instrumentado. |

## UTM base

El destino solo se puede completar cuando existe una ruta aprobada. Para LM-PC-013, la plantilla autorizable es:

`https://ef9882a7.legalmente-educativo.pages.dev/proceso/leer-antes-de-aceptar?utm_source={channel}&utm_medium=organic_social&utm_campaign=wave_01a&utm_content=lm-pc-013`

`{channel}` debe ser `linkedin`, `instagram` o `pinterest`. No se asignan enlaces UTM a LM-PC-031 ni LM-PC-065 mientras permanezcan `SEPARATED_PENDING_BINDING`; sus filas de Pinterest dejan `Link` vacío y no se enlazan desde campañas.

## Criterios de lectura

Durante los primeros 30 días posteriores a una publicación humana, revisar alcance, visitas al destino, aperturas de fuente, guardados y proporción de tráfico por canal. No tratar una impresión o un clic como validación jurídica, ni comparar contenidos de territorios distintos. Cualquier decisión de iteración debe conservar la versión del copy, asset, fuente, qualifier y estado de publicación.

La existencia de este plan no autoriza instrumentación, campaña, carga de Pinterest, publicación en LinkedIn o publicación en Instagram.
