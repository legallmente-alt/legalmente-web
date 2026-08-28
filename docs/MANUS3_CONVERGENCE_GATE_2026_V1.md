# LEGALMENTE — MANUS 3: CONVERGENCE GATE 2026 COMPLETADO

**Fecha:** 28 de agosto de 2026  
**Dirección evaluada:** `THE EDITORIAL INSTRUMENT`  
**Rama de implementación:** `feat/legalmente-editorial-instrument-preview-v1`  
**Resultado:** `ART_PASS_FOR_ISOLATED_IMPLEMENTATION`  
**Restricción:** no merge, no deploy, no publicación.

## Alcance y criterio

Se revisaron el diagnóstico visual actual, las tres direcciones y su ganador, el comparativo Current vs Proposed Home, los proofs ganadores de Home Desktop y Home 390, el contact sheet de superficies, los 20 verdicts de assets, los 12 símbolos, la guía de mobile/motion y los dos handoffs de Manus 3. También se inspeccionó la rama aislada y se ejecutaron `typecheck` y `build` sin modificar producción. La evidencia está indexada en el folder de revisión de Drive [1] y la rama aislada está disponible en GitHub [2].

El gate juzga los proofs reales, no la calidad de la documentación por sí sola. El pass significa que la dirección y los proofs suficientes autorizan la **implementación aislada de Home Desktop y Home 390**. No significa que el scaffold actual sea UI pública aprobada ni que el código pueda fusionarse o publicarse.

## 1. CURRENT vs EDITORIAL INSTRUMENT

| Criterio | Current Experience | The Editorial Instrument | Veredicto Manus 3 |
|---|---|---|---|
| Entrada | Hero centrado y clasificación temprana por opciones equivalentes. | Pregunta grande, una acción inmediata y un evento visual con continuidad. | Gana Editorial Instrument. |
| Composición | Centro, filas iguales, módulos repetidos y shells uniformes. | Split asimétrico, densidad variable y superficies con ritmos distintos. | Gana Editorial Instrument. |
| Arte | El arte está subordinado a tarjetas o paneles. | El arte es campo, ancla, portada de capítulo u objeto de herramienta. | Gana Editorial Instrument. |
| Utilidad | La herramienta se mezcla con chrome de dashboard. | Una tarea, una evidencia, un siguiente paso y límites accesibles. | Gana Editorial Instrument, con guardrail de utilidad. |
| Descubrimiento | Selección de secciones. | Un feature principal, un peek visible y continuidad causal. | Gana Editorial Instrument. |
| Confianza | Pass, source, territory y límites aparecen como módulos administrativos. | Source, territory y limits aparecen como contexto en el momento de incertidumbre. | Gana Editorial Instrument. |
| Mobile | Compresión del mismo sistema de desktop. | 360, 390 y 430 son ritmos de lectura deliberados. | Gana Editorial Instrument; 360/430 requieren proof de implementación. |

La diferencia es estructural, no cosmética: el challenger elimina el default de tarjetas iguales sin abandonar la base crema/papel, tinta, azul moderado, brass controlado, lógica de producto ni separación entre arte y copy [3] [4].

## 2. Qué acepta

Se acepta **The Editorial Instrument como sistema principal único**. La regla operativa queda fijada como **una acción enfocada + un evento visual memorable + una razón visible para continuar**. Se aceptan la Home asimétrica, la entrada por pregunta/contexto, las superficies de densidad variable, el uso selectivo de los 20 assets, la navegación editorial estrecha y la progresión `question → context → bounded tool → source/territory/limits → saved next step` [3] [5].

Se acepta **The Living Archive** únicamente como inspiración subordinada para History, Sources y provenance. Se acepta **The Threshold in Motion** únicamente como inspiración subordinada para la entrada y las transiciones. No se aceptan como sistemas paralelos ni como tres marcas visuales coexistentes.

## 3. Qué rechaza

Se rechazan el hero centrado con filas de opciones iguales, el shell repetido de tarjetas, los contenedores redondeados universales, la navegación basada en badges circulares, el brass decorativo, el navy rutinario, los swaps de página sin relación padre-hijo, el zoom/parallax genérico, los carruseles infinitos y el mobile como desktop comprimido. También se rechazan una cuarta dirección, un nuevo logo, una nueva biblioteca de iconos, otra auditoría genérica y cualquier merge, deploy o publicación en esta fase [4] [6].

El scaffold de la rama aislada permanece **funcional pero no aprobado como composición final**: el root y el product lab todavía contienen la gramática de cards/grid y los placeholders del sistema previo. Eso no invalida el pass artístico de los proofs; define el trabajo de implementación que queda por hacer en la rama aislada [2].

## 4. Home Desktop verdict

**PASS.** `01_HOME_DESKTOP_WINNER.png` presenta una composición split clara: titular y explicación a la izquierda, W01 como evento visual dominante a la derecha, una CTA aislada y dos peeks de continuidad. La navegación superior e inferior permanece silenciosa, y Source · Territory · Limits siguen accesibles sin competir con el primer paso [7].

La Home Desktop cumple composición, integración de arte, jerarquía, tipo, profundidad, utilidad, discovery, navegación, continuidad, fit de marca y aspiración 2026. La implementación debe conservar el vínculo entre la CTA “ABRIR EL INSTRUMENTO”, el destino real y los peeks etiquetados; el texto “ELIGE UNA PUERTA, NO UN MENÚ.” no puede quedarse como decoración sin affordance.

## 5. Home 390 verdict

**PASS.** `02_HOME_390_WINNER.png` cambia deliberadamente el orden: header, arte focal, etiqueta Editorial Instrument, titular, verbos, CTA, cue de continuación y navegación tranquila. El libro y el umbral sobreviven al crop, la acción es obvia y la composición no reintroduce un grid igualitario [8].

La única condición es de implementación: el cue “DESLIZA PARA EXPLORAR” debe tener equivalente accesible y accionable, el menú necesita label/focus correctos y la CTA debe seguir alcanzable sin depender de un gesto no anunciado. La prueba de 390 autoriza la implementación inicial; no reemplaza la validación posterior en 360 y 430.

## 6. Surfaces verdict

| Surface | Proof revisado | Veredicto | Razón de gate |
|---|---|---|---|
| Discovery / Worlds | `03_DISCOVERY_WORLD_WINNER.png` | **PASS** | Feature de History, CTA única y peek de Cinema; no es un grid de tarjetas. |
| Series | `04_SERIES_WINNER.png` | **PASS** | Dos entradas visuales y panel explícito de siguiente paso; ritmo distinto de Home y Discovery. |
| Tool / Prepare | `05_TOOL_WINNER.png` | **PASS WITH UTILITY GUARDRAIL** | Una pregunta, un objeto de evidencia, una CTA y Source · Territory · Limits visibles. |
| Trust / Confidence | `06_TRUST_WINNER.png` | **PASS** | Source y Territory son capas contextuales separadas; Limits/Corrections es un siguiente paso. |
| Cinema & Law | `07_CINEMA_WINNER.png` | **PASS** | Split cover full-height con evento navy reservado para capítulo y una entrada inequívoca. |
| Evidence | `08_EVIDENCE_WINNER.png` | **PASS** | Un objeto focal, explicación secuencial, entrada y rail de confianza; no es una tarjeta maquillada. |

La respuesta crítica es **sí: son composiciones realmente distintas**. Discovery prioriza un mundo y un capítulo; Series alterna dos entradas con un panel; Tool concentra una operación; Trust explica contexto; Cinema & Law crea un capítulo cinematográfico; Evidence organiza una secuencia objeto → explicación → procedencia. El riesgo no está en los proofs, sino en reimplementar todos con el `EditorialCard` del scaffold.

## 7. Asset disagreements only

**No hay desacuerdos con los 20 verdicts de Manus 2-R.** Se mantienen `KEEP`, `KEEP_WITH_CROP` y `SPECIALIZED_ONLY`; no se añade `REWORK` ni `REJECT`. En particular, W01 permanece `KEEP_WITH_CROP` para Home, W02/W03 se mantienen como entradas de mundo/continuidad, E01/E03/E04 siguen como piezas editoriales fuertes y T01/T03/T04/R03 permanecen restringidos a sus contextos especializados [9].

| ASSET_ID | MANUS2_VERDICT | MANUS3_VERDICT | WHY |
|---|---|---|---|
| — | — | **Sin desacuerdos** | La revisión de los 20 verdicts confirma que el problema es de colocación, crop y ritmo, no de calidad o necesidad de regenerar el asset pack. |

## 8. Symbol disagreements only

**No hay desacuerdos con los 12 verdicts de Manus 2-R.** Se conserva la clasificación `STRONG` para Learn, Resolve, Prepare, Source, Contract y Evidence; `USABLE` para Case, Territory, Compare, Alert y Labor; y `REWORK` para Company. Ningún símbolo se exige en cada superficie y ninguno debe aparecer por defecto en un círculo-badge repetido [9] [10].

| SYMBOL_ID | MANUS2_VERDICT | MANUS3_VERDICT | WHY |
|---|---|---|---|
| — | — | **Sin desacuerdos** | El riesgo software-like proviene de repetición, badge treatment y colocación, no de los primitives en sí. |

## 9. Mobile verdict

**APROBADO COMO PRINCIPIO DE COMPOSICIÓN; VALIDACIÓN DE IMPLEMENTACIÓN PENDIENTE EN 360 Y 430.** La regla queda fijada así: 360 muestra un foco, una acción y un peek; 390 conserva el objeto focal y una acción siguiente; 430 añade respiración, no módulos. El proof disponible de 390 cumple la regla y el handoff define las restricciones de 360/430 [8] [10].

No se exige una cuarta dirección ni otra auditoría. La prueba de implementación debe demostrar ausencia de clipping a tamaños de texto mayores, targets táctiles de al menos 44 px, orden de lectura correcto, CTA en reach zone, un peek accionable y no más densidad en 430.

## 10. Utility-risk verdict

**PASS CON GUARDRAIL DE IMPLEMENTACIÓN.** The Editorial Instrument no se convierte en “art-directed magazine with weak utility” en los proofs revisados. La acción principal es visible en Home, Tool y Evidence; los tools se leen como instrumentos enfocados; Source · Territory · Limits aparecen como acceso contextual; y cada superficie indica qué hacer después [7] [11].

El guardrail es obligatorio: los paneles de Tool y Trust deben ser estados reales y data-bound, no imágenes estáticas; source, territory y limits deben abrirse progresivamente sin desaparecer; y el CTA debe llevar a una operación verificable. Si la implementación falla esas condiciones, corresponde un **LOCAL_FIX**, no destruir la dirección completa.

## 11. Maximum five fixes

| # | SURFACE | EXACT_PROBLEM | EXACT_CHANGE | DO_NOT_CHANGE | PROOF_REQUIRED |
|---:|---|---|---|---|---|
| 1 | Home Desktop + Home 390/360/430 | La rama todavía no implementa el split editorial ni las composiciones móviles deliberadas; el scaffold conserva grids/cards. | Construir Home con W01 como hero, W02/W03 como peeks, una CTA y breakpoints explícitos: 360 foco+peek, 390 objeto+acción siguiente, 430 aire adicional. | No cambiar la lógica jurídica, la ruta de producto, el lenguaje crema/ink ni abrir una cuarta dirección. | Screenshots reales de 1440, 390, 360 y 430 con el titular sin clipping y el peek accionable. |
| 2 | Discovery, Series, Tool, Trust, Cinema & Law, Evidence | El `EditorialCard` y los placeholders permiten que todas las superficies vuelvan a parecer la misma tarjeta con maquillaje. | Sustituir el shell dominante por composiciones específicas por surface, importando los proofs y conectando cada layout con su asset/job correspondiente. | No crear una nueva biblioteca visual ni reutilizar un único template con cambios de color. | Contact sheet y capturas full-resolution que demuestren densidades, ritmos y jerarquías distintas. |
| 3 | Assets y crop | El manifest del branch marca `PENDING_BINARY_IMPORT`; sin assets reales no se puede verificar el focal point. | Importar/bindear los assets aprobados con `assetId`, focal point, safe area, text zone y crop metadata; mantener el copy fuera de imágenes. | No regenerar los 20 assets, no añadir claims, fechas, importes, URLs, PII o jurisdicciones al arte. | Matriz asset→surface→crop y capturas donde cada objeto focal sobreviva en desktop/360/390/430. |
| 4 | Tool, Trust, Evidence y navegación contextual | Los proofs muestran utility y confianza, pero la rama debe convertirlos en estados operables y accesibles. | Implementar inputs/acciones reales, source/territory/limits data-bound, disclosures con `aria-expanded`, foco conservado, live states y siguiente paso explícito. | No ocultar límites, no usar iconos como único indicador, no prometer consejo individual automatizado. | QA de teclado/lector de pantalla, estados `PASS/REQUIRE_INPUT/REVIEW_REQUIRED/HOLD/OUT_OF_SCOPE` y prueba de apertura/cierre. |
| 5 | Motion global | Los proofs no pueden validar todavía continuidad causal ni equivalencia reduced-motion. | Implementar container transform world→chapter, trace-back object→source, checklist one-step y fade-through solo para route-level; todo breve, cancelable y opcional. | No autoplay parallax, bounce, looping pulse, generic zoom ni motion-only meaning. | Capturas/video de cada transición y estado `prefers-reduced-motion` donde se conserve el mismo orden y comprensión. |

No se autorizan más de estos cinco cambios en este gate.

## 12. FINAL CODE CONTRACT

Se creó `docs/MANUS3_FINAL_2026_CODE_GATE_V1.md` en la rama aislada. El contrato reconcilia los proofs ganadores, el red-team de Manus 2-R y las restricciones de implementación. Por superficie fija `LAYOUT`, `ART_ASSET`, `CROP`, `TYPE`, `DEPTH`, `NAV`, `MOTION`, `MOBILE`, `A11Y` y `DO_NOT_DO`; además fija separación de copy/datos, estados fail-closed, metadata de focal point, equivalencia reduced-motion y la prohibición de merge/deploy/publicación.

La rama existe y permanece aislada. La verificación local de `typecheck` y `build` pasa, pero el build solo demuestra integridad técnica del scaffold actual; no convierte el scaffold en el target visual final. El estado correcto es comenzar la implementación de Home Desktop + Home 390 dentro de la rama y volver a probar 360/430 y las seis superficies antes de solicitar un gate posterior [2].

## 13. FINAL VERDICT

# `ART_PASS_FOR_ISOLATED_IMPLEMENTATION`

El arte y la dirección pasan para implementación aislada. Se autoriza comenzar **Home Desktop + Home 390** en `feat/legalmente-editorial-instrument-preview-v1`, usando los cinco fixes máximos como contrato de trabajo. El root público, el scaffold heredado y producción **no quedan aprobados**.

No merge. No deploy. No publicación.

## Referencias

[1]: https://drive.google.com/drive/folders/1Sr0nVeY5scRgtC2Jp-AWPlubaiOQz4km "LEGALMENTE — Manus 3 review folder"
[2]: https://github.com/legallmente-alt/legalmente-web/tree/feat/legalmente-editorial-instrument-preview-v1 "LegalMente isolated implementation branch"
[3]: https://drive.google.com/file/d/1XiJMnGSYc4r4SQxJRxV3nW7aOYyY6Jh5/view "04_THREE_DIRECTIONS_AND_WINNER.md"
[4]: https://drive.google.com/file/d/1nzsDz1NS7139qVn5mEo2732Wy-d6IhCJ/view "03_CURRENT_VISUAL_DIAGNOSIS.md"
[5]: https://drive.google.com/file/d/1EaDnV0J0uwNw88p14leeI6SUAPbBTABs/view "LEGALMENTE_RED_TEAM_REPORT_2026.md"
[6]: https://drive.google.com/file/d/1Qilb2r0FTx8jjkD1VWsTKIfA__O2D2IJ/view "HANDOFF_MANUS3_REDTEAM_REVIEW_V1.md"
[7]: https://drive.google.com/file/d/1KGts3zZUWmDXG9h8irzk__oOczdbyEat/view "01_HOME_DESKTOP_WINNER.png"
[8]: https://drive.google.com/file/d/1XIP_TCPOP5IKCJsOCTkhpa3jqAGCFk3X/view "02_HOME_390_WINNER.png"
[9]: https://drive.google.com/file/d/1bBHZqrIbMN3Y3Qwpf162cbN-MWsSTc3G/view "06_ASSET_AND_SYMBOL_VERDICTS.csv"
[10]: https://drive.google.com/file/d/1Qcw9PYzGp8fB3_XcjQMFBOODAm_ERIIx/view "07_MOBILE_MOTION_SYMBOLS.md"
[11]: https://drive.google.com/file/d/1MiRvMy8VzM4U9ie2p3l2_LnlHPQoYIxN/view "HANDOFF_CODE_REDTEAM_IMPLEMENTATION_V1.md"
