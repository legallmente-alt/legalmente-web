# LegalMente — Wave 01A multichannel sprint

Este paquete prepara cuatro carriles sin ejecutar gates humanos: integración candidata en rutas existentes, LinkedIn institucional y Founder, derivados de Instagram y Pinterest masivo. No contiene publicación, carga real, merge sensible ni deploy.

## Estados

| Unidad | Copy | Visual | Integración | Publicación |
|---|---|---|---|---|
| `LM-PC-013` | `READY_FOR_COPY` | `READY_FOR_VISUAL` | `PRODUCT_REVIEW_REQUIRED` | `NOT_PUBLIC` |
| `LM-PC-031` | `READY_FOR_COPY` | `READY_FOR_VISUAL` | `SEPARATED_PENDING_BINDING` | `NOT_PUBLIC` |
| `LM-PC-065` | `READY_FOR_COPY` | `READY_FOR_VISUAL` | `SEPARATED_PENDING_BINDING` | `NOT_PUBLIC` |

`PINTEREST_BULK_UPLOAD_AUTHORIZED = NO`. La aprobación Founder del 29 de agosto solo avanzó los seis claims exactos a `READY_FOR_COPY`; no autorizó `READY_FOR_VISUAL`, integración, publicación, merge ni deploy. LM-PC-031 no se fuerza bajo el capítulo sanitario `deber-profesional`; LM-PC-065 conserva los claims de LGSM, pero la representación aparece únicamente como pregunta relacionada y no como claim soportado por los arts. 1 y 6.

## Entregables

`integration-map.md` y `cross-channel-matrix.csv` documentan el destino y la continuidad sobre el Knowledge Graph existente. `current-state.json` es la capa viva de estado; los bindings históricos no se reescriben. `linkedin-package.md` contiene la cola separada para LegalMente y Founder. `instagram-package.md` contiene feed 4:5, story/reel cover 9:16 y copy vinculado. `pinterest-package.md` y `pinterest_bulk_upload.csv` contienen la preparación masiva base 2:3, incluyendo el estado separado de las filas que aún carecen de un parent semántico seguro. `asset-registry.json` y `assets/` contienen los derivados reales con hashes.

## Regla de integración

Una unidad solo puede entrar en una ruta pública cuando el registro conserva `CONTENT_ID`, claims aprobados, fuente y artículos, territorio, qualifier, copy, asset y gate actual. La existencia del asset o del CSV no autoriza su publicación. Una unidad en `SEPARATED_PENDING_BINDING` permanece preservada, pero no se integra, no se promociona y no se carga en Pinterest.
