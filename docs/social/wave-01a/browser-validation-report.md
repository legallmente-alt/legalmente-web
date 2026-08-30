# PR #19 — evidencia de navegador

## Preview Wave 01A

Ruta verificada: `http://127.0.0.1:3000/proceso/leer-antes-de-aceptar/`.

El primer intento devolvió 500 por un proceso dev heredado de la rama Next 15 con node_modules incompatibles; se cerró el proceso y se reinició el servidor con el árbol limpio del PR #19 y Next 14.2.35.

Tras reiniciar, la navegación devuelve la página con título `LegalMente — conocimiento jurídico para orientarte mejor`, sin error HTTP. El snapshot accesible muestra navegación principal, breadcrumbs de ruta de aprendizaje, encabezado `Proceso educativo`, título `Leer antes de aceptar`, la secuencia de seis pasos y la columna de evidencia. Las cajas tienen dimensiones visibles y no se observó desbordamiento en el viewport 1366 × 2261 del snapshot.

El error de consola previo fue `Module not found: Can't resolve 'private-next-instrumentation-client'`, atribuido al proceso heredado; quedó resuelto al reiniciar con dependencias PR #19.

Pendiente de capturar como evidencia adicional: mensajes de consola después del reinicio y screenshot del preview/Product Lab si el navegador automatizado permanece disponible.

## Verificación posterior

Después del reinicio, la consulta de consola devolvió `Total messages: 1 (Errors: 0, Warnings: 0)`. Se capturó el viewport del proceso en `pr19-process-preview.png` dentro del directorio de resultados del navegador automatizado. La navegación y el render quedaron sin errores de consola en esta pasada.

## Product Lab interno

Ruta verificada: `http://127.0.0.1:3000/internal/product-lab/` con `LEGALMENTE_PRODUCT_LAB_INTERNAL=1`. La página carga con título normal y snapshot accesible sin errores HTTP. El encabezado declara que es laboratorio interno y que no publica claims; el estado visible es `Revisión requerida` con la razón de que arte final, copy jurídico y publicación conservan gates separados. La página contiene la bandeja Wave 01A con tres unidades, assets reales, fuente, territorio, qualifiers y rutas vacías para LM-PC-031/065. El viewport completo medido fue 1366 × 7252, con tarjetas en layout legible y sin indicios de desbordamiento.
