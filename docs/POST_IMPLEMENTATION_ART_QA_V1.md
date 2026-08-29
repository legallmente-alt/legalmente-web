# LEGALMENTE — MANUS 3:
# POST-IMPLEMENTATION RELATIONAL ART QA COMPLETE

**Dirección:** The Editorial Instrument  
**Gate previo:** `ART_PASS_FOR_ISOLATED_IMPLEMENTATION`  
**Repositorio:** `legallmente-alt/legalmente-web`  
**PR:** [#5](https://github.com/legallmente-alt/legalmente-web/pull/5)  
**Branch:** `feat/legalmente-editorial-instrument-preview-v1`  
**HEAD evaluado:** `67b979cd9251a32fdcbbb5172be336fe1496e445`  
**CI run:** [33220467200](https://github.com/legallmente-alt/legalmente-web/actions/runs/33220467200)  
**Artifact:** `legalmente-implementation-proofs-67b979cd9251a32fdcbbb5172be336fe1496e445`  
**Scope visual:** 32 PNG reales = 8 superficies × 4 viewports: 1440, 430, 390 y 360 px.

> **Nota de método:** El CI ya había verificado HTTP, exactamente un H1, ausencia de overflow horizontal, ausencia de imágenes rotas, reduced-motion context, typecheck, production build y capture/upload. Este documento no repite esas pruebas como veredicto artístico. La evaluación se centra en jerarquía visual, composición, ritmo, simetría, respiración, tipografía, escala/crop de imagen, continuidad relacional, diferenciación de superficies, navegación, breadcrumbs, previous/next, contexto de confianza y percepción de touch targets.

## VERDICT

# `LOCAL_FIX`

La implementación real **no requiere rework** ni una nueva dirección. The Editorial Instrument está correctamente materializado como una experiencia relacional: Home parte de una pregunta, Explore oculta la complejidad del grafo, World orienta antes del catálogo, Series ordena entradas, Chapter establece posición y continuación, Concept explica conexiones, Process organiza una secuencia y Trust hace visible el contexto de fuente/territorio/límites/correcciones.

Se requiere un conjunto acotado de **cuatro fixes locales**, todos ejecutables sin rediseñar el sistema: reforzar la acción principal de Home, elevar la visibilidad de las acciones relacionales, reforzar la lectura semántica de W03 y cerrar la verificación de los estados de utilidad/continuación en mobile. El máximo permitido era cinco; se usan cuatro.

## TOP FINDINGS

| Área | Finding | Estado |
|---|---|---|
| Dirección | La implementación conserva la regla de una acción enfocada, un evento visual y una razón para continuar. | **Pasa** |
| Arte real | Home utiliza W01/W02/W03 locales; no hay placeholder en la superficie evaluada. | **Pasa** |
| Relación | Las ocho superficies no son la misma página con el título cambiado; cambian función, densidad y secuencia. | **Pasa** |
| Shell compartido | Knowledge Shell aporta continuidad y legibilidad; todavía hay repetición controlada de header, breadcrumbs y footer, pero no domina el contenido. | **Pasa con vigilancia** |
| Mobile | 430, 390 y 360 mantienen una sola columna y nav simplificado; 360 tiene el mayor riesgo de percepción de CTA y longitud. | **Local fix** |
| Trust | `/confianza` es serio, claro y no teatral; fuentes, territorio, límites y correcciones están separados. | **Pasa** |
| Semántica W03 | El crop y el copy contextual hacen que “Cine y Derecho” no se lea como tribunal, culpabilidad o resultado legal. | **Pasa con guardrail** |
| Utilidad | La experiencia es editorial sin perder orientación, pero la CTA principal y algunos enlaces de continuación son demasiado discretos. | **Local fix** |

## MOBILE

### 360 px

El principio **one focus + one peek** se cumple especialmente en Home: W01 sobrevive al crop, la navegación queda reducida a LegalMente + Explorar y el bloque de continuidad aparece después del primer recorrido. World, Series, Chapter, Concept, Process y Trust se apilan sin comprimir columnas de desktop. La secuencia de Process es particularmente legible en móvil porque separa pasos, evidencia y territorio/límites.

La debilidad es perceptual, no estructural: la CTA “¿Qué quieres entender?” es relativamente pequeña frente al titular y a las cuatro entradas posteriores. Además, en páginas largas, “Volver a explorar” y otras acciones de continuación pueden perderse al final del recorrido. Esto es un **LOCAL_FIX**, no una violación de la dirección.

### 390 px

El objeto focal y el siguiente paso sobreviven. Home mantiene arte → pregunta → CTA → rutas → continuidad, y la navegación no se convierte en un desktop comprimido. World, Series, Chapter y Concept conservan sus relaciones; Process sigue siendo una secuencia; Trust mantiene su cierre navy como evento de confianza.

La CTA debe ganar claridad y contraste de prioridad sin introducir una segunda acción principal. En Chapter y Trust, los enlaces de avance/retorno son correctos semánticamente, pero demasiado quietos para un usuario que escanea.

### 430 px

El ancho adicional se usa principalmente para respiración y no para añadir módulos, cumpliendo la regla aprobada. Home conserva W01 y el bloque W02/W03; el nav simplificado funciona. Debe mantenerse esta disciplina: no llenar el aire con más cards en una iteración posterior.

## HOME

Home es la superficie más lograda de la implementación real. A 1440 px, el split entre copy y W01 es claro, el titular “Entender el Derecho empieza por una pregunta” responde al principio de producto y las cuatro entradas expresan situación, concepto, proceso y explorar sin presentarse como un menú de base de datos. La sección de rutas destacadas introduce orientación antes de catálogo y la sección navy convierte W02/W03 en continuidad editorial visible.

A 430, 390 y 360 px, el focal survival de W01 es bueno: se preservan libro, umbral y profundidad. W02 mantiene una entrada de Historia y W03 una entrada de Cine y Derecho. El crop no introduce conflictos semánticos. El problema exacto es que la CTA “¿Qué quieres entender?” se lee como un botón pequeño dentro de una columna ya cargada, mientras que las cuatro filas de entrada tienen casi la misma saliencia. La acción principal debería ser la puerta inequívoca y las filas, sus rutas alternativas relacionadas.

**Home verdict:** visualmente aprobado; **CTA hierarchy = local fix**.

## RELATIONAL SURFACES

| Superficie | Evaluación visual | Decisión |
|---|---|---|
| **Explore** | Pregunta única, cuatro modos de entrada y mundos conectados. Oculta complejidad sin eliminar contexto. | **PASS** |
| **World** | Orientación de mundo antes de conexiones; una serie principal y dos conexiones posteriores. No es Explore renombrado. | **PASS** |
| **Series** | Título, orden y entradas de consentimiento/obligaciones con lectura secuencial. La relación es inequívoca. | **PASS** |
| **Chapter** | Breadcrumb, “Capítulo 1 de 2”, concepto en capítulo, proceso relacionado y siguiente capítulo. Cumple previous/next conceptual. | **PASS con local fix de affordance** |
| **Concept** | Definición más “dónde aparece”, contexto, territorio/límites y conexiones. No parece ficha técnica. | **PASS** |
| **Process** | Seis pasos ordenados, tipos de evidencia, territorio/límite y conexiones. La secuencia se lee realmente como proceso. | **PASS** |

El uso compartido de Knowledge Shell no crea homogeneidad excesiva porque el cuerpo de cada superficie tiene una tarea distinta: catálogo relacional en Explore, orientación en World, orden en Series, posición en Chapter, explicación en Concept y secuencia en Process. La única vigilancia necesaria es no añadir en el futuro un mismo bloque de “Conecta con” con igual peso en todas las rutas.

## TRUST

`/confianza` se siente parte del mismo producto, pero no como otra página editorial genérica. La jerarquía es directa: una capa de confianza, cuatro preguntas que no deben mezclarse, explicación de Fuentes/Territorio/Límites/Correcciones y un cierre navy que afirma que la confianza es información visible, no un sello.

No hay legal-theater: no aparece autoridad ornamental, badge de cumplimiento ni alarma roja como sustituto de procedencia. La seriedad viene de la claridad. A 360 px, el bloque inicial y las cuatro filas permanecen legibles; “Volver a explorar” es correcto pero debe conservar un target y foco perceptibles. Trust **pasa**; no necesita rework.

## FIXES SI EXISTEN

Se requieren cuatro fixes locales, todos limitados a la implementación existente. No se autoriza otra dirección, rebrand, nuevo sistema ni ampliación de scope.

| # | SURFACE | VIEWPORT | PROBLEM | EXACT CHANGE | WHY | SEVERITY |
|---:|---|---|---|---|---|---|
| 1 | Home | 1440 / 430 / 390 / 360 | La CTA principal “¿Qué quieres entender?” compite con cuatro filas casi igual de visibles y se percibe compacta en mobile. | Mantener una sola CTA, aumentar su saliencia visual y semántica con label accionable consistente; reducir ligeramente el peso visual de las cuatro filas sin ocultarlas ni eliminarlas. Mantener `/explorar` como destino de la CTA. | Hace inequívoca la primera acción sin romper la regla de una acción enfocada ni convertir las rutas relacionadas en cards. | **P1 — alto impacto, bajo alcance** |
| 2 | Home + rutas relacionales | 360 / 390 / 430 | La página es larga y algunos next/return links quedan demasiado discretos al final del recorrido. | Reforzar affordance de enlaces “Volver a explorar”, “Siguiente”, “Ver todas las rutas” y equivalentes con target mínimo, underline/border/focus visible y una señal direccional consistente. No añadir módulos ni sticky nav adicional. | Mejora qué sigue y el retorno al grafo sin aumentar densidad ni crear un nuevo sistema. | **P1 — claridad de navegación** |
| 3 | W03 / Cine y Derecho | 1440 / 430 / 390 / 360 | W03 pasa visualmente y está etiquetado, pero su lectura semántica debe quedar blindada contra interpretaciones de conflicto literal, tribunal, culpabilidad o resultado judicial. | Conservar W03 solo en Cine y Derecho o continuación Evidencia/Proceso con contexto; asegurar alt text y copy UI explícitos alrededor de “Cine y Derecho”; no usarlo como icono o estado legal. | Mantiene el guardrail `PASS_WITH_CONTEXT` ya aprobado y evita que una imagen editorial cargue una claim no pretendida. | **P2 — riesgo semántico** |
| 4 | Chapter / Concept / Process / Trust | 360 / 390 / 430 | Las relaciones son correctas, pero el primer siguiente paso o retorno puede quedar enterrado en páginas altas y los enlaces son visualmente sobrios. | Aplicar una jerarquía de acción contextual: hacer más visible el next/return principal de cada superficie y, en Process, mantener explícita la transición a una herramienta solo si existe una ruta real. No inventar CTA en superficies educativas. | Refuerza utilidad y continuidad sin convertir todas las páginas en Home ni repetir una plantilla de CTA. | **P2 — continuidad y utilidad** |

No se recomiendan fixes de color, rebrand, tipografía global, arquitectura, asset regeneration, nueva iconografía ni rediseño de Knowledge Shell.

## FINAL GATE STATE

# `LOCAL_FIX`

La implementación real de `67b979cd9251a32fdcbbb5172be336fe1496e445` **pasa dirección, composición relacional, mobile estructural, confianza y diferenciación de superficies**, pero necesita los cuatro ajustes locales anteriores antes de considerarse `IMPLEMENTATION_ART_PASS`.

El estado posterior recomendado es volver a capturar los mismos 32 proofs, comparar especialmente Home CTA, next/return affordance, W03 context y mobile 360/390/430, y entonces emitir el único gate permitido siguiente. No se debe abrir una cuarta dirección ni hacer master.

**No merge. No deploy. No publicación.**

## References

[1]: https://github.com/legallmente-alt/legalmente-web/pull/5 "LegalMente PR #5"
[2]: https://github.com/legallmente-alt/legalmente-web/tree/67b979cd9251a32fdcbbb5172be336fe1496e445 "Exact target HEAD evaluated"
[3]: https://github.com/legallmente-alt/legalmente-web/actions/runs/33220467200 "Verified CI run 33220467200"
[4]: https://github.com/legallmente-alt/legalmente-web/tree/feat/legalmente-editorial-instrument-preview-v1 "Isolated implementation branch"
