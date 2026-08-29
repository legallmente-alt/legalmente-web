# Pinterest — Preparación masiva Wave 01A

**Estado:** CSV y assets `READY_FOR_BULK_UPLOAD`; autorización real de carga: `BULK_UPLOAD_AUTHORIZED = NO`; publicación: `NOT_PUBLIC`.

Se prepara un Pin base 2:3 por unidad, vinculado a un asset real y a un destino único. No se simula publicación ni se duplica destino. Los derivados 9:16 se reservan para Instagram.

Archivo: `pinterest_bulk_upload.csv`

| Validación | Regla | Resultado esperado |
|---|---|---|
| Asset | Cada fila apunta a un PNG existente | PASS |
| Destination | Una URL única por fila | PASS |
| Alt | No vacío | PASS |
| Title | No vacío | PASS |
| Board | Usa agrupación humana compatible | PASS |
| CONTENT_ID | Presente y estable | PASS |
| HOLD_SOURCE | No permitido | PASS |
| Claim | Solo claims en READY_FOR_COPY | PASS |
| URL | Ruta candidata y no endpoint sensible | PASS |
| Publication | Nunca `PUBLISHED` | PASS |
