# LegalMente — Wave 01A multichannel sprint

Este paquete prepara cuatro carriles sin ejecutar gates humanos: integración candidata en rutas existentes, LinkedIn institucional y Founder, derivados de Instagram y Pinterest masivo. No contiene publicación, carga real, merge sensible ni deploy.

## Estados

| Unidad | Copy | Asset visual | QA visual | Provenance visual | Composición social | Integración | Publicación |
|---|---|---|---|---|---|---|---|
| `LM-PC-013` | `READY_FOR_COPY` | `EXISTS` | `PASS` | `VALID_HUMAN_PROVENANCE` | `REVIEW_REQUIRED` | `PUBLIC_INTEGRATION_APPROVED` | `NOT_PUBLIC` |
| `LM-PC-031` | `READY_FOR_COPY` | `EXISTS` | `PASS` | `VALID_HUMAN_PROVENANCE` | `REVIEW_REQUIRED` | `SEPARATED_PENDING_BINDING` | `NOT_PUBLIC` |
| `LM-PC-065` | `READY_FOR_COPY` | `EXISTS` | `PASS` | `VALID_HUMAN_PROVENANCE` | `REVIEW_REQUIRED` | `SEPARATED_PENDING_BINDING` | `NOT_PUBLIC` |

`PINTEREST_BULK_UPLOAD_AUTHORIZED = NO`. La aprobación Founder del 29 de agosto avanzó los seis claims exactos a `READY_FOR_COPY`; el receipt visual registra producción, QA y provenance humana válida; no autoriza `READY_FOR_VISUAL`. No se inventa esa autorización ni se abre publicación, merge o deploy. La provenance no autoriza integración adicional. LM-PC-031 no se fuerza bajo el capítulo sanitario `deber-profesional`; LM-PC-065 conserva los claims de LGSM, pero la representación aparece únicamente como pregunta relacionada y no como claim soportado por los arts. 1 y 6.

## Entregables

`integration-map.md` y `cross-channel-matrix.csv` documentan el destino y la continuidad sobre el Knowledge Graph existente. `current-state.json` es la capa viva de estado; los bindings históricos no se reescriben. `linkedin-package.md` contiene la cola separada para LegalMente y Founder. `instagram-package.md` contiene feed 4:5, story/reel cover 9:16 y copy vinculado. `pinterest-package.md` y `pinterest_bulk_upload.csv` contienen la preparación masiva base 2:3, con `MEDIA_URL_STATE=TEMPORARY_VALIDATION_URL` y filas separadas sin Link cuando falta un parent semántico seguro. `measurement-plan.md` contiene la instrumentación propuesta sin activar eventos ni campañas. `LM-PC-013-human-product-decision-packet.md` y `LM-PC-013-human-decision-receipt-2026-08-29.md` contienen la decisión humana registrada para la integración educativa en `/proceso/leer-antes-de-aceptar`; no incluye autorización de publicación. `asset-registry.json` y `assets/` contienen los derivados reales con hashes.

## Regla de integración

Una unidad solo puede entrar en una ruta pública cuando el registro conserva `CONTENT_ID`, claims aprobados, fuente y artículos, territorio, qualifier, copy, asset y gate actual. La existencia del asset o del CSV no autoriza su publicación. La aprobación de integración de LM-PC-013 solo abre QA de integración educativa; no resuelve el provenance visual ni autoriza publicación. Una unidad en `SEPARATED_PENDING_BINDING` permanece preservada, pero no se integra, no se promociona y no se carga en Pinterest.
