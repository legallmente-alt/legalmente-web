# LegalMente — Wave 01A multichannel sprint

Este paquete prepara cuatro carriles sin ejecutar gates humanos: integración candidata en rutas existentes, LinkedIn institucional y Founder, derivados de Instagram y Pinterest masivo. No contiene publicación, carga real, merge sensible ni deploy.

## Estados

- `CURRENT_COPY_STATE = READY_FOR_COPY`
- `CURRENT_VISUAL_STATE = READY_FOR_VISUAL`
- `CURRENT_INTEGRATION_STATE = PRODUCT_REVIEW_REQUIRED`
- `CURRENT_PUBLICATION_STATE = NOT_PUBLIC`
- `PINTEREST_BULK_UPLOAD_AUTHORIZED = NO`

## Entregables

- `integration-map.md` y `cross-channel-matrix.csv`: destino y continuidad sobre el Knowledge Graph existente.
- `current-state.json`: capa viva de estado; los bindings históricos no se reescriben.
- `linkedin-package.md`: cola separada para LegalMente y Founder.
- `instagram-package.md`: feed 4:5, story/reel cover 9:16 y copy vinculado.
- `pinterest-package.md` y `pinterest_bulk_upload.csv`: preparación masiva base 2:3.
- `asset-registry.json` y `assets/`: derivados reales con hashes.
