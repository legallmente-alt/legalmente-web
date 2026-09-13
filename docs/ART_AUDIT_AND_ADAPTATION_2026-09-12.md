# LegalMente — Auditoría de arte y adaptación 2026-09-12

**Estado:** `IMPLEMENTED_ON_BRANCH` · `NOT_MERGED` · `NOT_DEPLOYED` · `NOT_PUBLISHED`

## Alcance

Se contrastaron las nuevas autoridades de Drive —motor único, índice v18, capa canónica de diversidad editorial y bitácora— con el preflight visual v1.3 del repositorio y con el lote visual de diez piezas generado el 12 de septiembre.

## Hallazgos artísticos

El lote anterior tenía buena calidad material y una paleta coherente, pero no acreditaba todavía la nueva dirección adaptativa. Repetía relaciones visuales de umbral, puerta, sombra, arquitectura solemne y objeto documental; varias piezas utilizaban metáfora como lenguaje dominante; el tratamiento de marca era físicamente integrado pero algunos renders introducían texto incidental o lettering no controlado; y la mayoría de las piezas no llevaba un binding jurídico, duda real, consecuencia y familia editorial verificables. Por tanto, era material `GENERATED/CURATION_READY`, no evidencia de mejora jurídica ni de rendimiento.

La auditoría no interpreta los fallos como una razón para abandonar el lenguaje de LegalMente. El ajuste correcto es conservar el rigor material, la luz controlada y la composición editorial, pero aumentar la distancia perceptiva y semántica: situaciones reales, decisiones humanas, procesos, estructuras operativas, evidencia, activos, gobernanza y arquitectura deben competir con la metáfora, no quedar subordinados a ella.

## Adaptación aplicada

El almacén del frente de inteligencia ahora conserva con el candidato:

- `editorialFamily`;
- `readerRole`;
- `angle`;
- `consequence`;
- `questionResolved`;
- `depth`.

La dirección visual se construye mediante `createVisualDirection` y exige un estado de preparación jurídica distinto de `NOT_ASSESSED` y un `legalBindingId` canónico antes de llegar al proveedor. La función visual, el tipo de escena, la lógica dominante, el argumento visual, la percepción esperada y los motivos viajan en el contrato provider-neutral de v1.3.

El preflight v1.3 exige diversidad funcional y de escena, limita la metáfora al 30% del lote normal, rechaza motivos repetidos y exige al menos 75% de escenas operativas cuando el lote sea de LinkedIn LegalMente. Cambiar color, cámara o estilo ya no cuenta como novedad suficiente.

## Resultado

La adaptación transforma la auditoría en controles ejecutables sin crear un canon paralelo. El sistema ahora puede distinguir:

```text
señal → necesidad → familia/lector/ángulo/consecuencia → TopicCandidate
→ binding jurídico → función visual → escena → lógica dominante → QA humano
```

Las pruebas cubren rechazo de datos sensibles, trazabilidad, evidencia medida sin registro, persistencia atómica, bloqueo de arte sin readiness canónico y todas las reglas adversariales del preflight visual v1.3.

## Decisión y límites

No se modificaron claims, fuentes, jurisdicciones, publicación ni deploy. No se declara que el lote anterior tenga rendimiento mejorado. Las imágenes futuras deben conservar estado `GENERATED` hasta la selección humana; el rendimiento sólo entra a memoria cuando exista `contentId` y señal de aceptación verificable.

## Rollback

Revertir los commits de esta rama y retirar este documento elimina la adaptación sin borrar el almacén inicial ni cambiar `main`.
