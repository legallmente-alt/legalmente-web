# Wave 01A — Medición y UTM

**Estado:** plan preparado; instrumentación, campañas, destinos UTM y analítica no activados.

## Principios

La medición conserva CONTENT_ID, CLAIM_IDS, canal, territorio, ruta de origen y versión del asset, sin nombres, documentos, textos libres ni datos personales. No se introduce proveedor, endpoint ni campaña.

## Eventos propuestos

| Evento | Parámetros mínimos | Estado |
|---|---|---|
| lm_wave01a_view | content_id, channel, integration_state, publication_state, asset_id | Preparado; no instrumentado |
| lm_wave01a_source_open | content_id, claim_ids, source_domain, territory | Preparado; no instrumentado |
| lm_wave01a_cta | content_id, channel, cta_type, route | Preparado; no instrumentado |
| lm_wave01a_save_intent | content_id, channel, asset_id | Preparado; no instrumentado |

## Destinos

No existe una ruta pública aprobada ni una URL UTM activa para Wave 01A. Los destinos se completan únicamente tras evidencia Founder verificable de integración, QA de integración y autorización separada de publicación. LM-PC-065 permanece sin integración pública.

## Criterios de lectura

Después de una publicación humana autorizada, revisar alcance, visitas al destino, aperturas de fuente, guardados y tráfico por canal. Nunca tratar una impresión o clic como validación jurídica. La existencia de este plan no autoriza instrumentación, campaña, carga social ni publicación.
