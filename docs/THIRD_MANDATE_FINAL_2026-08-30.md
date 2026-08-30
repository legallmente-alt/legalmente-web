# LegalMente — Tercer Mandato: cierre técnico y continuidad

## 1. HEAD

Branch `feat/knowledge-engine-dictionary-v1`; último commit `c9e6374`; PR [#23](https://github.com/legallmente-alt/legalmente-web/pull/23) abierto contra `main`. No se hizo merge ni deploy.

## 2. CI y causa del fallo anterior

El primer CI remoto falló en `Privacy surface smoke` porque el Diccionario Vivo había introducido un input libre sin registro explícito. No se desactivó el gate. Se corrigió la superficie y se disparó una nueva ejecución de CI; el resultado definitivo queda asociado al último workflow del PR.

## 3. Corrección de privacidad

Se creó `EPHEMERAL_LOCAL_SEARCH_V1`: búsqueda sólo local en navegador, sin request, submit, backend, analytics, log, storage, cookie, beacon, persistencia ni historial. La entrada usa `type=search`, `autocomplete=off`, `maxLength=160`, `data-privacy-surface=ephemeral-local-search` y una advertencia visible contra nombres, datos personales e información de casos reales. El privacy smoke global sólo permite esa entrada explícitamente marcada.

## 4. Tests

`test:engine` pasa con 4 pruebas, incluido `HUMAN_QUERY_GOLDEN_SET_V1` de 36 consultas y casos no-result. `test:ephemeral-search-privacy` devuelve `NO_COLLECTION_TECHNICAL_PASS`. También pasan privacy smoke, typecheck, legal-core 13/13, knowledge-safety 3/3, lint, build público sanitizado, public route proof y diff check. El build produce 58 páginas; el artefacto público elimina superficie interna y public-route proof confirma 10 rutas, 55 HTML y 52 URLs.

## 5. Source binding y fichas

Se añadió `SourceBinding` con clases separadas: `PRIMARY_LEGAL_SOURCE`, `CANONICAL_VERIFIED_CLAIM`, `INTERNAL_GRAPH_PROVENANCE`, `CULTURAL_REFERENCE` y `BACKGROUND_REFERENCE`. Las ocho fichas actuales sólo tienen provenance interna y quedan `SOURCE_BINDING_REQUIRED`, no `PUBLIC_DICTIONARY_ELIGIBLE`, hasta que Founder/legal aporte o apruebe binding jurídico suficiente. No se inventó cobertura para propiedad, posesión, culpabilidad ni casos individuales.

## 6. UX y calidad de búsqueda

La ruta `/diccionario` funciona como puerta universal por lenguaje cotidiano. Las fichas muestran término, explicación, técnica, ejemplo, no confundir, preguntas, relaciones, provenance, territorio, límites, revisión y siguiente aprendizaje. El algoritmo aplica normalización de acentos, stopwords, variantes seguras, aliases exactos, señales de intención, umbral de confianza y no-result para lenguaje de caso.

## 7. Producción y next work

`operating-contract.ts` mantiene las catorce etapas y estados especializados separados. `production-registry.ts` representa las tres unidades Wave 01A con estados reales: `LM-PC-013` en `VISUAL_QA`, `LM-PC-031` y `LM-PC-065` en `CHANNEL_ADAPTATION`, todas con `PRODUCT_REVIEW_REQUIRED`/`NOT_PUBLIC`. `getExecutableNextWork()` devuelve cero unidades porque el siguiente paso disponible requiere revisión humana; excluye publicación, deploy, merge protegido, PII, servicio y source-blocked.

## 8. LinkedIn, Founder, cultura y contratos

`LINKEDIN_AND_SOURCE_REVIEW_PACKET_V1.md` contiene cinco publicaciones institucionales completas, diez publicaciones Founder completas, sus fuentes, territorios, límites, alt text y dirección visual. Incluye Founder Profile basado sólo en hechos verificables del addendum anonimizado y el bridge hacia contratos, representación, evidencia, gobierno y LegalMente. `cultural-bridge.ts` contiene ocho relaciones machine-readable en cine, literatura, música, arte e historia. `formula.ts` contiene `ContractFormula` con dieciséis nodos y preguntas, requisitos de fuente, dependencias, stop conditions y escalamiento profesional.

## 9. Deuda reducida

Se cerró la fuga de privacidad que detectó el CI mediante un contrato explícito. Se separó provenance interna de fuente jurídica. Se incorporó un golden set real. Se evitó un falso positivo de cobertura para conceptos no respaldados. Se dejó el deploy y la publicación cerrados. Se identificó el apilamiento técnico de PR #22 sobre #21 y no se fusionaron ramas incoherentes.

## 10. Gates cerrados

Continúan cerrados: publicación, deploy, merge protegido, PII, documentos reales, pagos, servicios profesionales, analytics, claims nuevos no revisados y cambio constitucional.

## 11. Drive y continuidad

Entregables guardados: `BUILD_AND_EXPAND_HANDOFF`, `ACTIVE_CANON_INDEX_AND_HANDOFF`, `LINKEDIN_AND_SOURCE_REVIEW_PACKET_V1` y este informe final. La continuación correcta es revisar el resultado del nuevo CI, luego tomar una decisión humana única sobre los bindings jurídicos de las ocho fichas y la secuencia de integración de PR #18/#21/#22/#23.

## 12. Aportación estratégica nivel 2: Human Language Map

**Thesis:** el activo difícil de copiar no es el volumen de posts, sino la relación acumulativa entre cómo la gente describe una experiencia, qué concepto jurídico necesita, qué fuente lo respalda, qué límite se aplica, qué pregunta sigue y qué herramienta educativa corresponde.

**Usuario y problema:** personas que no conocen el nombre jurídico y equipos que pierden tiempo traduciendo preguntas cotidianas a categorías legales. **Experiencia:** pregunta humana → concepto preciso → diferencia → fuente y territorio → límite → siguiente pregunta/herramienta. **Why now:** la entrada generativa sin trazabilidad aumenta el valor de una capa determinista y verificable. **Why LegalMente:** el proyecto ya posee Knowledge Graph, fuentes, arte, fórmulas y gates humanos. **Engine reuse:** aliases, claims, source bindings, relaciones, Content IDs, visual provenance y change events. **Tech:** registro versionado de consultas anonimizadas y relaciones, sin guardar texto sensible ni convertir el buscador en intake. **Business:** mejores rutas educativas, retención, preflight y eventual producto profesional separado. **Risk:** datos sensibles, falsa precisión, sesgo territorial y dependencia de revisión Founder; se mitigan con no-collection, threshold, source binding y fail-closed.

**Smallest experiment:** 50 consultas sintéticas revisadas por humanos, medir top-1 correcto, no-result correcto y falsos positivos por territorio. **Success metric:** al menos 90% de top-1 correcto y 100% de casos de alto riesgo sin diagnóstico. **Failure signal:** el sistema devuelve una coincidencia mediocre para un caso personal o no puede explicar fuente, límite y siguiente paso.

## 13. Siguiente decisión humana real

Aprobar, devolver o excluir cada uno de los ocho source bindings del paquete de revisión. Hasta esa decisión, el sistema queda técnicamente robusto pero no se presenta como fuente jurídica pública ni se publica.

## 14. Corrección final de responsive/accessibility

El CI corrigió el contrato de privacidad y todos los gates previos, pero falló en responsive/accessibility porque el enlace “Siguiente aprendizaje” de la ficha de concepto medía 88×21 px y carecía de focus indicator detectable. Se corrigió sin relajar el smoke: el enlace tiene `min-h-6`, padding y `focus:ring`. También se hizo autocontenido el smoke creando `implementation-proofs` antes de escribir su reporte. Proof local final: 52 combinaciones responsive PASS y 52 combinaciones accessibility/interaction PASS.
