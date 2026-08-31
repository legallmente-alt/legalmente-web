# LegalMente — Review Registry V1 (superseded)

**Estado:** superseded by `docs/REVIEW_REGISTRY_V2_HARDENING.md`.

La V1 normalizó metadata estructural del manifest Wave 01A y permitió que Product Lab consumiera esa metadata. No implementó un transporte de señales entre ejecuciones, historial de cambios, recuperación temporal ni evidencia de aprobación humana. Los nombres “memoria” y “coordinación” de la entrega anterior eran demasiado amplios para la capacidad real y quedan corregidos por la V2.

La provenance de Drive (`driveFileId`), la presencia de un archivo local, la coincidencia de SHA-256 y una aprobación humana son señales distintas. Ninguna de las primeras tres equivale a la última. La V1 tampoco rechazaba de forma suficiente rutas host-like, traversal, nombres de asset ligados a otro Content ID, asociaciones duplicadas, manifest público/vacío, representaciones contradictorias o disponibilidad no verificada.

La V2 conserva la intención y la interfaz del adaptador, pero añade validación de visibilidad y no-vacío, rutas internas estrictas, nombres ligados a Content ID, SHA-256 en el manifest, comprobación real de archivos, rechazo de duplicados y contradicciones, congelación profunda en runtime y un objeto de evidencia que declara de manera explícita que historial, transporte y aprobación no están implementados o presentes.

No se cambia la Constitución, no se simula revisión humana y no se abre publicación, merge, deploy, PII, documentos reales, pagos ni servicios profesionales.
