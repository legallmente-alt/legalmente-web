# Wave 01A — Mapa de integración candidata

**Estado del paquete:** `CONTENT_PREPARED` → `CHANNEL_ADAPTED` → `QA_CHANNEL_PASS` → `READY_FOR_PUBLICATION_DECISION`

**Integración pública:** por unidad; `LM-PC-013 = PRODUCT_REVIEW_REQUIRED`, `LM-PC-031/065 = SEPARATED_PENDING_BINDING`

**Publicación:** `NOT_PUBLIC`

La integración se prepara sobre rutas existentes y no crea una familia de páginas nueva. Cada unidad conserva sus claims aprobados, fuente, artículos, territorio México, qualifier, asset real, texto seleccionable y siguiente aprendizaje. El mapa no equivale a autorización de integración ni de publicación.

| Unidad | Mundo existente | Parent existente seguro | Proceso o relación | Ruta candidata | Estado | Ajuste de producto requerido |
|---|---|---|---|---|---|---|
| LM-PC-013 | Vida cotidiana | Consentimiento y obligaciones → Consentir no es solamente firmar | Consentimiento → Leer antes de aceptar | `/proceso/leer-antes-de-aceptar` | `PRODUCT_REVIEW_REQUIRED` | Decisión humana de producto por unidad; luego QA de integración. |
| LM-PC-031 | Empresa y comercio | Ningún capítulo o serie laboral específico en el grafo actual | Organizar hechos y prueba como proceso genérico; no usar `deber-profesional` | — | `SEPARATED_PENDING_BINDING` | Founder/Editor debe asignar un parent existente semánticamente correcto o aceptar una relación de nivel mundo; no se integra bajo la serie sanitaria. |
| LM-PC-065 | Empresa y comercio | Ningún parent societario específico en el grafo actual | La representación es una relación posible, no un claim soportado por LGSM arts. 1 y 6 | — | `SEPARATED_PENDING_BINDING` | Crear o aprobar un binding societario específico, o conservar la unidad como relación educativa separada; no se integra en `/concepto/representacion` por inercia. |

## Contrato de integración

La ficha candidata debe usar HTML seleccionable para el copy educativo, una imagen como apoyo visual y bloques visibles de fuente, artículos, territorio, qualifier y siguiente aprendizaje. El componente no debe solicitar documentos, nombres, texto libre ni activar servicios. Solo LM-PC-013 tiene actualmente una ruta candidata que puede mostrar el preview bajo el flag interno; LM-PC-031 y LM-PC-065 permanecen fuera de rutas públicas hasta cerrar su binding.

## Reglas de separación

Un `CONTENT_ID` aprobado para copy no queda automáticamente integrado en el grafo. Si falta un parent semántico seguro, la unidad conserva su fuente y sus claims, pero no se le inventan breadcrumbs, ruta, serie, concepto o proceso. La representación de LM-PC-065 puede aparecer como continuidad o relación futura, nunca como afirmación respaldada por los arts. 1 y 6 de la LGSM.
