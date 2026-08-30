# LegalMente — Wave 01A multichannel sprint

Este paquete prepara cuatro carriles sin ejecutar gates humanos: integración candidata en rutas existentes, LinkedIn institucional y Founder, derivados de Instagram y Pinterest masivo. No contiene publicación, carga real, merge sensible ni deploy.

## Estados

| Unidad | Copy | Asset visual | QA visual | Provenance visual | Composición social | Integración | Publicación |
|---|---|---|---|---|---|---|---|
| `LM-PC-013` | `READY_FOR_COPY` | `EXISTS` | `PASS` | `UNRESOLVED` | `REVIEW_REQUIRED` | `PRODUCT_REVIEW_REQUIRED` | `NOT_PUBLIC` |
| `LM-PC-031` | `READY_FOR_COPY` | `EXISTS` | `PASS` | `UNRESOLVED` | `REVIEW_REQUIRED` | `SEPARATED_PENDING_BINDING` | `NOT_PUBLIC` |
| `LM-PC-065` | `READY_FOR_COPY` | `EXISTS` | `PASS` | `UNRESOLVED` | `REVIEW_REQUIRED` | `SEPARATED_PENDING_BINDING` | `NOT_PUBLIC` |

`PINTEREST_BULK_UPLOAD_AUTHORIZED = NO`. La aprobación Founder del 29 de agosto avanzó los seis claims exactos a `READY_FOR_COPY`; el receipt visual registra producción y QA, pero no autoriza `READY_FOR_VISUAL`. No se inventa esa autorización, ni se abre integración, publicación, merge o deploy. LM-PC-031 no se fuerza bajo el capítulo sanitario `deber-profesional`; LM-PC-065 conserva los claims de LGSM, pero la representación aparece únicamente como pregunta relacionada y no como claim soportado por los arts. 1 y 6.

## Entregables

`integration-map.md` y `cross-channel-matrix.csv` documentan el destino y la continuidad sobre el Knowledge Graph existente. `current-state.json` es la capa viva de estado; los bindings históricos no se reescriben. `linkedin-package.md` contiene la cola separada para LegalMente y Founder. `instagram-package.md` contiene feed 4:5, story/reel cover 9:16 y copy vinculado. `pinterest-package.md` y `pinterest_bulk_upload.csv` contienen la preparación masiva base 2:3, con `MEDIA_URL_STATE=TEMPORARY_VALIDATION_URL` y filas separadas sin Link cuando falta un parent semántico seguro. `measurement-plan.md` contiene la instrumentación propuesta sin activar eventos ni campañas. `asset-registry.json` y `assets/` contienen los derivados reales con hashes.

## Regla de integración

Una unidad solo puede entrar en una ruta pública cuando el registro conserva `CONTENT_ID`, claims aprobados, fuente y artículos, territorio, qualifier, copy, asset y gate actual. La existencia del asset o del CSV no autoriza su publicación. Una unidad en `SEPARATED_PENDING_BINDING` permanece preservada, pero no se integra, no se promociona y no se carga en Pinterest.
