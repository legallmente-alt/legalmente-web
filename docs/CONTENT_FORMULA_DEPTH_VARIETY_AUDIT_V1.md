# LegalMente — Auditoría de fórmula de contenido y variedad

**Fecha:** 2026-09-02  
**Alcance:** revisión interna del repositorio `legalmente-web` y de la documentación de producción automática.  
**Estado:** `AUDIT_ONLY` · `NOT_PUBLISHED` · no se generaron piezas.

## Conclusión

LegalMente sí tiene una base sólida para no repetir imágenes, pero todavía no tiene un **motor automático de contenido** plenamente modelado. El repositorio contiene un grafo de aprendizaje, contratos de seguridad, un paquete editorial de ejemplo y un motor de rotación visual. La fórmula jurídica existente organiza la navegación como `SITUATION → CONCEPT → BRANCH → PROCESS → EVIDENCE → TERRITORY → SOURCE → TOOL`, pero no asigna una profundidad explícita a cada pieza ni decide cuándo un tema requiere explicación simple, desarrollo doctrinal, comparación territorial, proceso o límites probatorios.

Por ello, el sistema puede producir piezas formalmente distintas y, al mismo tiempo, demasiado parecidas en su **carga intelectual**. El problema no es únicamente que una imagen se repita: es que la selección no diferencia todavía entre una entrada breve y un tema desarrollado.

## Qué está funcionando

| Área | Evidencia observada | Evaluación |
|---|---|---|
| Grafo relacional | `World`, `Series`, `Chapter`, `Concept` y `Process` están definidos y conectados | Base correcta para una progresión educativa |
| Seguridad jurídica | El grafo exige fuentes territoriales para consecuencias concretas y evita conclusiones universales | `PASS` conceptual |
| Privacidad | Before Signing mantiene estado efímero y no transporta PII | `PASS` según proof existente |
| Rotación exacta | SHA-256 de diez ejes; colisión exacta, ventana de escuela y cambio mínimo de tres ejes | `PASS` como control de repetición técnica |
| Preflight visual | Comprueba objetos, cámara, luz, elemento frío y nota antirepetición | `PASS` para lotes pequeños |
| Exclusión pública | Build elimina rutas, assets y chunks internos | `PASS` según prueba pública |

## Qué está incompleto o produce homogeneidad

| Hallazgo | Evidencia | Riesgo |
|---|---|---|
| No existe un generador automático de contenido versionado | No se encontró `content-engine`, `content-generator` ni contrato equivalente; la automatización está principalmente documentada | Alto: Claude Code no tiene una fórmula ejecutable única |
| No existe campo de complejidad o profundidad | `World`, `Series`, `Chapter`, `Concept` y `Process` tienen resumen, pero no `complexity`, `depth`, `reasoningLoad` o `formatIntent` | Alto: temas complejos pueden comprimirse al mismo molde |
| La variedad visual no demuestra variedad semántica | El registro tiene 20 entradas, pero `world` y `legalDomain` son `unknown` en las 20; `visualSchool` y `dominantPalette` también son `unknown` | Alto: la matemática puede declarar diferencia sin demostrarla |
| Ejes visuales fijos | `framing` tiene una sola variante en las 20 entradas y `brandObject` una sola regla común | Medio-alto: cambia la escena, pero no la arquitectura visual completa |
| El preflight no evalúa contenido | Comprueba diversidad de atributos visuales, no diversidad de pregunta, mecanismo jurídico, evidencia, formato o nivel de desarrollo | Alto: evita repetición de imagen, no repetición de explicación |
| No hay presupuesto de repetición conceptual | El motor detecta colisión de combinación completa, pero no penaliza reutilizar el mismo concepto, proceso, CTA, estructura narrativa o secuencia de ocho slides | Medio-alto |
| El paquete editorial de ejemplo es rico, pero monomodal | `content-pack.md` ofrece carrusel de 8 slides y derivados, con una dirección visual muy específica | Medio: sirve como referencia, no como plantilla universal |

## Diagnóstico de la fórmula actual

La fórmula actual funciona como una **ruta de aprendizaje** y como un **selector visual**, pero no como un compositor editorial completo. La parte relacional explica cómo conectar conducta, concepto, proceso, evidencia, territorio y fuente. La parte visual explica cómo evitar que dos imágenes tengan la misma combinación. Falta una capa intermedia que transforme el conocimiento jurídico en una pieza proporcional a su complejidad.

> La unidad que falta no es otro prompt. Es un contrato de composición que sepa cuánto debe explicar una pieza, qué relaciones debe mostrar, qué evidencia necesita y qué formato puede soportar esa carga sin simplificarla falsamente.

## Fórmula propuesta para la siguiente versión

Claude Code debe implementar primero el contrato y sus pruebas; no debe generar piezas durante esta auditoría. La fórmula propuesta es:

```text
HUMAN_CONDUCT
→ HUMAN_QUESTION
→ LEGAL_OBJECT
→ CONCEPT_GRAPH
→ DEPTH_BAND
→ LEGAL_SPECIFICITY
→ EVIDENCE_BURDEN
→ TERRITORIAL_SCOPE
→ NARRATIVE_MODE
→ FORMAT_FIT
→ CLAIM_BINDING
→ VISUAL_SEMANTICS
→ DIVERSITY_SCORE
→ QA
```

### Bandas de profundidad

| Banda | Propósito | Estructura mínima | Requisito de fuente |
|---|---|---|---|
| `D0_ENTRY` | Abrir una pregunta cotidiana sin resolverla | conducta, pregunta, concepto inicial, límite | Fuente general o estado explícitamente educativo |
| `D1_GUIDED` | Enseñar una distinción práctica | pregunta, 2–4 conceptos, ejemplo no concluyente, siguiente pregunta | Fuente aprobada si aparece regla concreta |
| `D2_MECHANISM` | Explicar cómo funciona una relación jurídica | sujetos, acto, obligación, condición, consecuencia posible, límites | Claim y fuente territorial vinculados |
| `D3_PROCESS_EVIDENCE` | Mostrar cómo una cuestión se prueba o tramita | hechos, cronología, evidencia, vacíos, proceso, territorio | Packet de evidencia y territorio obligatorio |
| `D4_COMPARATIVE` | Comparar sistemas, épocas o territorios | objeto comparable, diferencias, no equivalencias, fuentes por territorio | Fuentes verificadas por cada jurisdicción |
| `D5_COMPLEX_BOUNDARY` | Tratar un tema desarrollado con tensiones y excepciones | varias ramas, límites, contraejemplo, incertidumbre, ruta de revisión | No puede pasar sin binding completo y revisión humana |

La banda no es una etiqueta decorativa. Debe gobernar la longitud, el número de conceptos, la cantidad de relaciones visibles, el formato permitido y el estado de publicación. Una pieza `D3` o superior no debe comprimirse automáticamente a un hook y una conclusión.

### Modos narrativos que deben rotar

El motor debe seleccionar de forma explícita entre `QUESTION_LED`, `SCENARIO_LED`, `CONTRAST`, `PROCESS_TRACE`, `EVIDENCE_TRACE`, `HISTORY_COMPARISON`, `MYTH_VS_RULE` y `DECISION_TREE`. El modo narrativo es independiente de la escuela visual: dos imágenes distintas no cuentan como contenido distinto si ambas siguen la misma secuencia de hook, lista y CTA.

### Presupuesto de complejidad

Cada pieza debe registrar `conceptCount`, `edgeCount`, `sourceCount`, `territoryCount`, `evidenceCount`, `exceptionCount`, `uncertaintyCount` y `formatCapacity`. El compositor debe bloquear cuando el formato no puede contener la complejidad mínima requerida, en vez de eliminar relaciones silenciosamente.

## Contrato mínimo sugerido

```ts
type ContentDepth = "D0_ENTRY" | "D1_GUIDED" | "D2_MECHANISM" | "D3_PROCESS_EVIDENCE" | "D4_COMPARATIVE" | "D5_COMPLEX_BOUNDARY";
type NarrativeMode = "QUESTION_LED" | "SCENARIO_LED" | "CONTRAST" | "PROCESS_TRACE" | "EVIDENCE_TRACE" | "HISTORY_COMPARISON" | "MYTH_VS_RULE" | "DECISION_TREE";

type ContentComposition = {
  contentId: string;
  humanQuestion: string;
  legalObject: string;
  depth: ContentDepth;
  narrativeMode: NarrativeMode;
  worldId: string;
  conceptIds: string[];
  edgeKinds: string[];
  claimIds: string[];
  sourceIds: string[];
  territories: string[];
  limits: string[];
  evidenceBurden: "NONE" | "CONTEXTUAL" | "REQUIRED" | "MULTI_SOURCE";
  formatCapacity: "SHORT" | "STANDARD" | "DEEP" | "SERIES";
  formatId: string;
  exactCopy: string;
  status: "DRAFT" | "HOLD" | "READY_FOR_REVIEW";
};
```

El tipo debe vivir junto a los contratos existentes y no crear un segundo frontend ni transportar datos de usuario. `HOLD` debe ser el resultado por defecto si faltan fuente, territorio, límite, capacidad de formato o binding.

## Nueva fórmula de variedad

La selección no debe depender sólo de una huella visual. Debe calcular dos huellas separadas:

```text
CONTENT_FINGERPRINT = hash(world, legalObject, conceptIds, edgeKinds, depth, narrativeMode, formatId, territoryScope)
VISUAL_FINGERPRINT = hash(world, legalDomain, concept, visualSchool, scenario, revelation, framing, humanPresence, brandObject, dominantPalette)
```

El selector debe rechazar o poner en espera cuando ocurra cualquiera de estas condiciones:

1. Colisión exacta de contenido o visual.
2. Mismo `depth` y `narrativeMode` dentro de una ventana configurable sin una razón editorial registrada.
3. Reutilización excesiva del mismo concepto raíz, proceso, CTA o arquitectura de slides.
4. Formato incapaz de contener el presupuesto de complejidad.
5. Historial con campos desconocidos suficientes para impedir demostrar variedad.
6. Fuente, territorio, límite o `EXACT_COPY` incompletos.

La diversidad debe ser **ponderada**, no sólo binaria. Para una ventana histórica, el score puede ponderar de forma independiente contenido, narrativa, formato y visual. Un score bajo debe producir `HOLD_INSUFFICIENT_VARIETY`, no una generación forzada.

## Instrucciones para Claude Code

Lee primero el handoff de fuentes y todos los contratos existentes. No generes imágenes ni cambies estados de publicación. Implementa en este orden: contrato tipado de composición; matriz de bandas de profundidad; función determinista de presupuesto de complejidad; fingerprint de contenido; score de variedad; pruebas de colisión y recencia; fixtures para piezas simples y desarrolladas; y sólo después integración con el selector visual existente.

No reemplaces `visual-rotation-engine.mjs`; extiéndelo o crea un módulo de contenido separado que lo consuma. No inventes claims ni fuentes para llenar fixtures. Usa estados `HOLD` cuando falte evidencia. Mantén `NOT_PUBLISHED` y registra cada decisión en un receipt.

Añade pruebas que demuestren al menos lo siguiente: una pieza `D0` no se trata como `D3`; una pieza `D3` no cabe en un formato `SHORT`; dos piezas con imágenes distintas pero el mismo concepto, modo y estructura reciben penalización; una comparación sin fuentes territoriales queda en `HOLD`; los campos `unknown` no cuentan como variedad; y la salida pública no importa el contrato interno de composición.

## Verificación requerida

```bash
npm run lint
npm run typecheck
npm run test:legal-core
npm run test:knowledge-safety
npm run test:knowledge-integrity
npm run test:ecosystem-kernel
npm run test:agent-contribution
npm run test:before-signing-safe
npm run test:visual-rotation
npm run test:content-visual-preflight
npm run test:rule-master
npm run build:public
npm run test:public-routes
git diff --check
```

Si una prueba falla, el estado es `REWORK_REQUIRED` o `HOLD`; no se debe desactivar el gate ni declarar variedad por inferencia.

## Decisión de fase

La auditoría confirma que el sistema visual está funcionando como **barrera contra repetición técnica**, pero la fórmula de contenido necesita una capa explícita de profundidad y variedad semántica. La siguiente contribución de Claude Code debe ser contractual y testeada; no debe comenzar por producir más imágenes.

**Estado final:** `AUDIT_COMPLETE` · `NOT_PUBLISHED` · `NO_IMAGE_REQUEST`.
