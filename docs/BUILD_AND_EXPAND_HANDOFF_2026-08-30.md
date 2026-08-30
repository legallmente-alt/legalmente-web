# LegalMente — BUILD_AND_EXPAND HANDOFF

**Clasificación:** OPERATIONAL / CURRENT / NOT CANONICAL. Este documento preserva continuidad; no autoriza merge, deploy, publicación, servicio profesional ni cambio constitucional.

## Capacidades nuevas construidas

El repositorio incorpora `src/lib/knowledge-graph/engine.ts`, una capa mínima y real sobre el Knowledge Graph existente. Contiene ocho entradas del Diccionario Vivo con término, lenguaje cotidiano, definición simple y técnica, ejemplo, relaciones, territorio, fuente, límites, siguiente concepto, preguntas relacionadas y versión. También incorpora `searchHumanQuestion`, una búsqueda determinista que normaliza acentos, compara tokens con aliases y preguntas y devuelve conceptos existentes, sin generar conclusiones jurídicas.

La ruta pública `/diccionario` permite buscar frases como “quién puede firmar por la empresa”, “qué estoy aceptando” y “esto es mío”. La página de concepto muestra ahora la ficha viva con definición, ejemplo, fuente, territorio, límites, preguntas y siguiente aprendizaje. La navegación expone “Diccionario vivo”.

`src/lib/production/operating-contract.ts` define una única cola de catorce etapas, mantiene estados especializados separados y ofrece `validateProductionUnit` para detectar Content IDs duplicados, derivados sin parent, formatos incorrectos, claims ausentes, assets sin provenance y copy sin territorio.

## Derivados y visuales existentes reutilizados

| Unidad | Instagram | Facebook/vertical | LinkedIn | Estado |
|---|---:|---:|---:|---|
| LM-PC-013 | 1080×1350, 4:5 | 1080×1920, 9:16 | 4:5 preparado | VISUAL_QA_PASS / NOT_PUBLIC |
| LM-PC-031 | 1080×1350, 4:5 | 1080×1920, 9:16 | 4:5 preparado | VISUAL_QA_PASS / NOT_PUBLIC |
| LM-PC-065 | 1080×1350, 4:5 | 1080×1920, 9:16 | 4:5 preparado | VISUAL_QA_PASS / NOT_PUBLIC |

Los nueve assets Wave 01A existentes permanecen bajo su registro y provenance originales. No se generaron imágenes nuevas porque no había una unidad nueva con `READY_FOR_VISUAL` que pudiera avanzar sin decisión humana; reutilizar los assets existentes evita duplicación y respeta el gate visual.

## Asset Manifest

El manifiesto fuente vigente continúa en `docs/social/wave-01a/asset-registry.json`. La estructura operativa nueva exige `assetId`, `contentId`, `channel`, `format`, `width`, `height`, `masterPrompt`, `provider`, `model`, `date`, `driveId` opcional, `hash` opcional, `altText`, `qa`, `provenance` y `state`. Los assets existentes sin Drive ID durable no se presentan como alojados durablemente.

## LinkedIn Engine

La raíz jurídica común es `CONTENT_ID → MASTER → CLAIM/SOURCE/TERRITORY → DERIVATIVES`. La salida `LEGALMENTE_INSTITUTIONAL` traduce el concepto para aprendizaje profesional; `RAYMUNDO_FOUNDER` traduce el mismo claim hacia criterio, operación, riesgo y construcción de producto. Las salidas no autorizan publicación ni consultas por DM.

### Cola institucional preparada

1. El puesto no prueba facultades.
2. La firma no cura una representación insuficiente.
3. Evidencia de entrega: la operación real también debe dejar rastro.
4. IA que explica no es IA que aprueba.
5. Antes del contrato: objeto, alcance y quién puede obligar.

### Cola Founder preparada

1. **Criterio profesional:** revisar quién puede obligar antes de discutir sólo el texto.
2. **Legal + business:** una operación documentada de forma deficiente crea fricción después.
3. **Building LegalMente:** el producto debe enseñar a formular mejores preguntas, no ocultar límites.
4. **Legal + technology:** automatizar clasificación no delega el juicio.
5. **Contratos:** el objeto debe entenderse antes de perfeccionar cláusulas.
6. **Representación:** cargo, poder y evidencia son preguntas distintas.
7. **Evidencia:** una decisión operativa sin trazabilidad es difícil de revisar.
8. **Gobierno:** propiedad, administración y firma no son sinónimos.
9. **Risk thinking:** saber cuándo detener la automatización también es capacidad.
10. **Leadership:** proteger el límite del sistema es una decisión de liderazgo.

Todos se basan sólo en patrones generalizables del addendum profesional anonimizado y se mantienen `READY_FOR_HUMAN_REVIEW` / `NOT_PUBLISHED`.

## Founder Profile Raymundo V1

| Fact ID | Hecho verificable | Categoría | Fuente | Confianza | Público seguro | Verificado |
|---|---|---|---|---|---|---|
| RP-001 | Experiencia práctica previa en contratos y asuntos corporativos, usable sólo como patrones anonimizados | experiencia | Drive `1GoNqontLP1qjNe50RBgrsbCUL7y3e553t-KKy79UXIc` | alta documental | sí, en forma general | sí |
| RP-002 | Áreas de patrones: representación, poderes, contratos, obligaciones, evidencia y gobierno corporativo | práctica generalizable | mismo documento, líneas 17–34 | alta documental | sí, sin casos | sí |
| RP-003 | Criterio declarado: nunca exponer nombres, empresas, montos, fechas, clientes, expedientes o cláusulas identificables | límites profesionales | mismo documento, líneas 9–15 | alta documental | sí | sí |

No se agregaron formación, certificaciones, empleadores o cargos porque no existe evidencia suficiente en los documentos consultados.

## Founder Knowledge Bridge

`experiencia contractual anonimizada → contratos → objeto/naturaleza/alcance → representación → evidencia → contenido Founder`.

`experiencia corporativa generalizable → empresa → gobierno → poderes → riesgo → aprendizaje profesional`.

`construcción de LegalMente → legal ops → IA → knowledge systems → human gates → product design`.

## Cultural Discovery Engine — primera prueba

La fórmula implementable es `obra cultural → tensión humana → concepto del graph → preguntas → aprendizaje relacionado`. Una obra cultural nunca es fuente jurídica.

| Obra segura | Tensión humana | Concepto | Pregunta | Aprendizaje |
|---|---|---|---|---|
| *12 Angry Men* | decidir con información incompleta | prueba | ¿Qué diferencia hay entre sospechar y sostener un hecho? | Organizar hechos y prueba |
| *The Trial* | una persona frente a un proceso opaco | proceso/prueba | ¿Qué debe poder entender alguien cuando una institución decide? | Hechos y evidencia |
| *Antígona* | conflicto entre norma, autoridad y conciencia | obligación | ¿Cuándo obedecer una regla no resuelve el conflicto humano? | Obligación y contexto |
| *Pride and Prejudice* | reputación, promesa y expectativa | consentimiento | ¿Qué se dijo, qué se aceptó y qué se puede demostrar? | Leer antes de aceptar |
| *The Social Network* | acuerdos, autoría y memoria de una relación | evidencia/representación | ¿Qué prueba la historia de una conversación o acuerdo? | Organizar hechos y prueba |

## Contract Formula V1

`objeto → naturaleza → propósito → alcance → partes → representación → obligaciones → prestaciones → condiciones → tiempo → cambios → evidencia → riesgos → terminación → territorio → formalidades`.

La representación sirve para aprendizaje, checklist, preflight y revisión profesional posterior. No produce contratos firmables, no recibe documentos reales y no concluye sobre operaciones concretas.

## Deuda reducida o cerrada

Se incorporó un test específico para el motor y el contrato de producción. Se eliminó la ambigüedad de una ruta sin búsqueda cotidiana al exponer el Diccionario Vivo. Se detectó y documentó el apilamiento #22 sobre #21. Se evitó mantener los PRs antiguos #1–#4 como ruta activa porque están conflictivos/superados. Se dejó explícito que el deploy de #20 sólo valida y salta el deploy por gate. Se evitó duplicar el inventario de assets y los Content IDs.

## QA y gates

La nueva batería a ejecutar es `npm run test:engine` además del conjunto existente. La integración pública, publicación, deploy, merge protegido, analytics, PII, documentos reales, pagos, servicios profesionales y claims nuevos no revisados siguen cerrados.

## Siguiente movimiento único

Ejecutar y revisar `npm run test:engine` junto con typecheck, legal-core, knowledge-safety, lint, build público y rutas públicas; después presentar una única decisión de secuencia para #18/#21/#22, sin fusionar ni desplegar automáticamente.

## Entrega GitHub

La capacidad quedó implementada en branch `feat/knowledge-engine-dictionary-v1`, commit `f68a20b`, con PR abierto hacia `main`: https://github.com/legallmente-alt/legalmente-web/pull/23. El PR no fue fusionado ni desplegado. La validación local completa terminó en PASS: motor nuevo, typecheck, legal-core 13/13, knowledge-safety 3/3, lint, build público sanitizado y public-route proof con 10 rutas, 55 HTML, 52 URLs y sin superficie interna pública.
