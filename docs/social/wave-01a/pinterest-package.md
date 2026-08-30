# Pinterest — Preparación masiva Wave 01A

**Estado:** `ART_BASE_STATE=READY` / `SOCIAL_COMPOSITION_STATE=REVIEW_REQUIRED` / `MEDIA_URL_STATE=TEMPORARY_VALIDATION_URL`; CSV con esquema oficial; `READY_FOR_BULK_UPLOAD = NO`; `BULK_UPLOAD_AUTHORIZED = NO`; publicación: `NOT_PUBLIC`. La composición final aún no existe. Las filas de LM-PC-031 y LM-PC-065 no tienen `Link` porque permanecen `SEPARATED_PENDING_BINDING`.

Se prepara un Pin base 2:3 por unidad, vinculado a un asset real mediante una URL pública directa. El CSV usa la plantilla de Pinterest (`Title`, `Media URL`, `Pinterest board`, `Thumbnail`, `Description`, `Link`, `Publish date`, `Keywords`). No se simula publicación ni se asigna una ruta candidata inexistente. Los derivados 9:16 se reservan para Instagram.

Archivo: `pinterest_bulk_upload.csv`

| Validación | Regla | Resultado esperado |
|---|---|---|
| Asset | Cada fila apunta a un PNG existente | PASS |
| Media URL | URL pública directa al PNG, estado 200 y content-type de imagen | PASS |
| Alt | No vacío en matriz y paquetes de canal; el CSV oficial no incluye columna alt | PASS |
| Title | No vacío y ≤ 100 caracteres | PASS |
| Board | Usa agrupación humana compatible | PASS |
| CONTENT_ID | Conservado en la matriz y manifiesto interno | PASS |
| HOLD_SOURCE | No permitido | PASS |
| Claim | Solo claims en READY_FOR_COPY | PASS |
| Link | Solo se completa cuando existe ruta aprobada; LM-PC-031/065 queda vacío | PASS |
| Publication | Nunca `PUBLISHED`; carga real no autorizada | PASS |
