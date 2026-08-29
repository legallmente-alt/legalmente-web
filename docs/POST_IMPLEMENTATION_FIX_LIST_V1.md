# LEGALMENTE — POST_IMPLEMENTATION_FIX_LIST_V1

**Estado de QA original:** `LOCAL_FIX`  
**HEAD evaluado por Manus 3:** `67b979cd9251a32fdcbbb5172be336fe1496e445`  
**Límite:** cuatro fixes locales; no rediseño, no nueva dirección, no rebrand, no merge, no deploy, no publicación.

| # | SURFACE | VIEWPORT | PROBLEM | EXACT CHANGE | WHY | SEVERITY |
|---:|---|---|---|---|---|---|
| 1 | Home | 1440 / 430 / 390 / 360 | La CTA “¿Qué quieres entender?” compite con cuatro filas de entrada y es compacta en mobile. | Mantener una sola CTA, elevar su saliencia visual y semántica, usar label accionable consistente y conservar `/explorar` como destino; reducir ligeramente el peso visual de las filas sin eliminarlas. | Hace inequívoca la primera acción y conserva las rutas relacionadas. | P1 — alto impacto, bajo alcance |
| 2 | Home + rutas relacionales | 360 / 390 / 430 | Next/return links quedan discretos al final de páginas largas. | Reforzar “Volver a explorar”, “Siguiente”, “Ver todas las rutas” y equivalentes con target mínimo, underline/border/focus visible y señal direccional consistente; no añadir sticky nav. | Hace visible qué sigue sin aumentar densidad ni crear otro sistema. | P1 — claridad de navegación |
| 3 | W03 / Cine y Derecho | 1440 / 430 / 390 / 360 | El asset pasa, pero debe blindarse contra lectura de tribunal, culpabilidad o resultado judicial. | Usar W03 solo en Cine y Derecho o continuación Evidencia/Proceso; asegurar alt text y copy UI contextual; nunca usarlo como estado legal. | Preserva `PASS_WITH_CONTEXT` y mantiene el significado editorial. | P2 — riesgo semántico |
| 4 | Chapter / Concept / Process / Trust | 360 / 390 / 430 | Las relaciones son correctas, pero next/return puede quedar enterrado y los enlaces son demasiado sobrios. | Elevar la jerarquía del next/return contextual; en Process, ofrecer transición a herramienta solo si existe ruta real; no inventar CTA en superficies educativas. | Mejora continuidad y utilidad sin convertir cada página en Home. | P2 — continuidad y utilidad |

## Implementación de los cuatro fixes

Los cuatro fixes fueron implementados en la misma rama aislada, sin cambiar la dirección visual ni ampliar scope.

| Fix | Implementación | Commit |
|---:|---|---|
| 1 | CTA principal de Home ampliada a una acción inequívoca, responsive y con señal direccional; las cuatro rutas quedan visualmente subordinadas sin desaparecer. | `5ac7f4ac7964eb4561651882c34c4e68b82a1e55` |
| 2 | Previous/next, “Conecta con”, “Ver todas las rutas” y retornos reciben targets más claros, bordes/foco visibles y flechas direccionales consistentes. | `cd56368ab3fd174609e23553ff0aa677121e58a8` + commits específicos de retorno |
| 3 | W03 queda marcado `cinema-law-only`, con alt text contextual y copy visible que declara su uso como escena editorial y niega lectura de caso/tribunal/resultado jurídico. | `5ac7f4ac7964eb4561651882c34c4e68b82a1e55` |
| 4 | Chapter hereda previous/next reforzado; Concept hereda relaciones con affordance “Abrir”; Process y Trust reciben retornos explícitos y visibles sin inventar herramientas ni CTA profesionales. | `cd56368ab3fd174609e23553ff0aa677121e58a8`, `d45a714deb7318d85a131cbdb6f21b767102aada`, `0ef40fb314f2a2999a33c5c41614409b00dd7fb6` |

## Verificación posterior

**HEAD con fixes:** `0ef40fb314f2a2999a33c5c41614409b00dd7fb6`  
**CI run:** `33222765708` — `SUCCESS`  
**Artifact:** `9705788378` — `legalmente-implementation-proofs-0ef40fb314f2a2999a33c5c41614409b00dd7fb6`

Pasaron:

- 13/13 legal-core tests;
- typecheck;
- production build;
- captura Playwright;
- 32/32 combinaciones de superficie/viewport;
- HTTP success;
- exactamente un H1;
- cero overflow horizontal;
- cero imágenes rotas;
- reduced-motion capture context.

La revisión visual interna de las nuevas capturas confirma que la CTA de Home gana jerarquía, Chapter/Concept/Process muestran continuidad más visible, Trust conserva sobriedad con retorno perceptible y W03 mantiene el contexto de Cine y Derecho de forma explícita.

## Estado de cierre técnico

`LOCAL_FIX_IMPLEMENTED / TECHNICALLY_GREEN / FINAL_ART_RECHECK_REQUIRED`

La comprobación técnica no sustituye el gate artístico. El siguiente evento permitido es una revisión breve de Manus 3 sobre el nuevo artifact para decidir si emite `IMPLEMENTATION_ART_PASS` o identifica un ajuste estrictamente local adicional.

**No merge. No deploy. No publicación.**
