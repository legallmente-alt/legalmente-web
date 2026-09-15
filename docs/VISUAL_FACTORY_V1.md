# LegalMente Visual Factory v1

La fábrica visual convierte una unidad de contenido aprobada en una unidad trazable de producción. No autoriza publicación, merge ni deploy; esos estados permanecen bajo gate humano y de repositorio.

## Componentes

`VisualProductionUnit` conserva `CONTENT_ID`, serie, tema, fuentes, claims, territorio, estado legal, copy exacto, canal, formato, dimensiones, dirección artística, metáfora, escena, cámara, luz, paleta, objeto de marca, zona de texto, safe area, prompts, proveedor/modelo, fecha, assets, QA, regeneraciones, estado, Drive ID, hash y provenance.

`ImageGeneratorAdapter` es provider-neutral. Expone capacidades de generación, edición, upscale, variación, texto, imagen de referencia e inpainting. El routing selecciona generación compuesta cuando el proveedor respeta texto limpio; de lo contrario selecciona arte base más composición programática. El contenido no aprobado se bloquea como `COPY_BLOCK`.

`evaluateQa` mantiene separadas las capas de QA artístico y editorial. Los gates fallidos, puntuaciones incompletas, copy no exacto o baja legibilidad llevan a `REWORK_REQUIRED`; nunca a publicación. `assertPublishBlocked` falla cerrado salvo que una autorización explícita haya cambiado el estado a `PUBLICATION_NOT_AUTHORIZED`.

`deriveQaDisposition` y `normalizeQaResult` impiden drift entre el JSON de QA y el estado real del pipeline. Todos los hard gates deben estar explícitamente en `PASS`. Un `FAIL` o `NOT_CHECKED`, una puntuación requerida ausente, QA artístico/editorial incompleto, legibilidad móvil inferior al umbral o copy no íntegro mantienen la pieza en `C_REWORK / REWORK_REQUIRED`. Un artefacto externo no puede elevarse a `B_STATIC`, `A_HERO` ni `HUMAN_REVIEW` por autodeclaración.

El Asset Registry se consulta por `contentId`, `namespace`, `surface`, `role`, `format` y `state`. Los namespaces `LM-PC` (social) y `LM-PA` (web/producto) permanecen separados. Una pieza social no se promociona a la web por una constante arbitraria ni por su mera existencia.

## Flujo

`CONTENT_APPROVED → ROUTE → GENERATE/EDIT/COMPOSE → TECH_QA → VISUAL_ART_QA → EDITORIAL_COMPOSITION_QA → MOBILE_QA → BRAND_QA → HUMAN_VISUAL_REVIEW → PUBLICATION_NOT_AUTHORIZED`.

`HUMAN_VISUAL_REVIEW` solo se alcanza cuando todos los hard gates y QA automáticos previos están completos y en PASS. La revisión humana puede decidir `KEEP / FIX / REGENERATE / REJECT`, pero la mera llegada a revisión humana tampoco autoriza publicación.

Las regeneraciones deben crear una nueva versión y conservar motivo, cambio, QA anterior, QA posterior y versión seleccionada. El pipeline evita loops infinitos y no activa proveedores escasos de video para imágenes estáticas.

## Pruebas

La suite cubre routing, bloqueo por estado legal, publicación fail-closed, QA fallido, drift de artefactos externos, hard gates en `NOT_CHECKED` y consulta por registro. El typecheck debe ejecutarse junto con los tests de producto existentes antes de abrir una PR.
