# LEGALMENTE — POST_IMPLEMENTATION_FIX_LIST_V1

**Estado:** `LOCAL_FIX`  
**HEAD evaluado:** `67b979cd9251a32fdcbbb5172be336fe1496e445`  
**Límite:** cuatro fixes locales; no rediseño, no nueva dirección, no rebrand, no merge, no deploy, no publicación.

| # | SURFACE | VIEWPORT | PROBLEM | EXACT CHANGE | WHY | SEVERITY |
|---:|---|---|---|---|---|---|
| 1 | Home | 1440 / 430 / 390 / 360 | La CTA “¿Qué quieres entender?” compite con cuatro filas de entrada y es compacta en mobile. | Mantener una sola CTA, elevar su saliencia visual y semántica, usar label accionable consistente y conservar `/explorar` como destino; reducir ligeramente el peso visual de las filas sin eliminarlas. | Hace inequívoca la primera acción y conserva las rutas relacionadas. | P1 — alto impacto, bajo alcance |
| 2 | Home + rutas relacionales | 360 / 390 / 430 | Next/return links quedan discretos al final de páginas largas. | Reforzar “Volver a explorar”, “Siguiente”, “Ver todas las rutas” y equivalentes con target mínimo, underline/border/focus visible y señal direccional consistente; no añadir sticky nav. | Hace visible qué sigue sin aumentar densidad ni crear otro sistema. | P1 — claridad de navegación |
| 3 | W03 / Cine y Derecho | 1440 / 430 / 390 / 360 | El asset pasa, pero debe blindarse contra lectura de tribunal, culpabilidad o resultado judicial. | Usar W03 solo en Cine y Derecho o continuación Evidencia/Proceso; asegurar alt text y copy UI contextual; nunca usarlo como estado legal. | Preserva `PASS_WITH_CONTEXT` y mantiene el significado editorial. | P2 — riesgo semántico |
| 4 | Chapter / Concept / Process / Trust | 360 / 390 / 430 | Las relaciones son correctas, pero next/return puede quedar enterrado y los enlaces son demasiado sobrios. | Elevar la jerarquía del next/return contextual; en Process, ofrecer transición a herramienta solo si existe ruta real; no inventar CTA en superficies educativas. | Mejora continuidad y utilidad sin convertir cada página en Home. | P2 — continuidad y utilidad |

## Criterio de cierre

Volver a capturar los mismos 32 proofs y comprobar específicamente CTA de Home, affordances de next/return, contexto de W03 y legibilidad/alcance en 360/390/430. Si pasan, emitir el siguiente gate explícito. Hasta entonces, mantener la rama aislada sin merge, deploy ni publicación.
