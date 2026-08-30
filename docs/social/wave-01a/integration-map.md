# Wave 01A — Mapa de integración candidata

**Estado del paquete:** `CONTENT_PREPARED` → `CHANNEL_ADAPTED` → `COPY_CHANNEL_QA=PASS` → `ART_BASE_STATE=READY` → `SOCIAL_COMPOSITION_STATE=REVIEW_REQUIRED` → `PUBLICATION_STATE=NOT_PUBLIC`

**Integración pública:** por unidad; `LM-PC-013 = PUBLIC_INTEGRATION_APPROVED`, `LM-PC-031/065 = SEMANTIC_BINDING_RESOLVED_INTEGRATION_NOT_APPROVED`

**Publicación:** `NOT_PUBLIC`

La integración se prepara sobre rutas existentes y no crea una familia de páginas nueva. Cada unidad conserva sus claims aprobados, fuente, artículos, territorio México, qualifier, asset real, texto seleccionable y siguiente aprendizaje. El receipt autoriza únicamente la integración educativa de LM-PC-013; el mapa no autoriza publicación, Pinterest bulk upload, deploy, merge, analítica ni resolución del visual gate.

| Unidad | Mundo existente | Parent existente seguro | Proceso o relación | Ruta candidata | Estado | Ajuste de producto requerido |
|---|---|---|---|---|---|---|
| LM-PC-013 | Vida cotidiana | Consentimiento y obligaciones → Consentir no es solamente firmar | Consentimiento → Leer antes de aceptar | `/proceso/leer-antes-de-aceptar` | `PUBLIC_INTEGRATION_APPROVED` | Receipt humano registrado; queda QA de integración educativa y luego decisión separada de publicación. |
| LM-PC-031 | Empresa y comercio | Proceso existente `organizar-hechos-y-prueba` para aprendizaje/navegación, no fuente laboral | Organizar hechos y prueba como proceso genérico; no usar `deber-profesional` | — | `SEMANTIC_BINDING_RESOLVED_INTEGRATION_NOT_APPROVED` | Binding humano resuelto exclusivamente para aprendizaje/navegación; integración pública no aprobada. |
| LM-PC-065 | Empresa y comercio | Sin parent claim→source; relaciones editoriales posibles con representación | La representación es una relación posible, no un claim soportado por LGSM arts. 1 y 6 | — | `SEMANTIC_BINDING_RESOLVED_INTEGRATION_NOT_APPROVED` | `RELATED_ONLY`; relaciones editoriales/navegacionales sin parent jurídico ni integración pública. |

## Contrato de integración

La ficha candidata debe usar HTML seleccionable para el copy educativo, una imagen como apoyo visual y bloques visibles de fuente, artículos, territorio, qualifier y siguiente aprendizaje. El componente no debe solicitar documentos, nombres, texto libre ni activar servicios. Solo LM-PC-013 tiene actualmente una ruta candidata que puede mostrar el preview bajo el flag interno; LM-PC-031 y LM-PC-065 permanecen fuera de rutas públicas porque su integración pública no está aprobada.

## Reglas de separación

Un `CONTENT_ID` aprobado para copy no queda automáticamente integrado en el grafo. Si falta un parent semántico seguro, la unidad conserva su fuente y sus claims, pero no se le inventan breadcrumbs, ruta, serie, concepto o proceso. La representación de LM-PC-065 puede aparecer como continuidad o relación futura, nunca como afirmación respaldada por los arts. 1 y 6 de la LGSM.
