# LegalMente — Ecosystem Kernel V1

## Propósito

El **Ecosystem Kernel** conecta mundos de experiencia humana, dominios jurídicos, conocimiento, arte y herramientas sin convertir esas conexiones en claims. `World` aporta contexto humano; `LegalDomain` aporta gravedad jurídica; `Claim + Source + Territory` conserva la verdad verificable; el grafo conecta; el arte vuelve memorable; la herramienta vuelve útil.

Este kernel es una capa auxiliar de contexto y navegación. No rehace el Knowledge Graph existente, no modifica claims, sources, territorio o gates y no crea un segundo canon.

## Modelo

`LegalDomainId` contiene los 15 dominios iniciales: `CIVIL`, `FAMILY`, `MERCANTILE`, `CORPORATE`, `CONTRACTS`, `PENAL`, `TAX`, `NOTARIAL`, `AGRARIAN`, `LABOR`, `ADMINISTRATIVE`, `PROCEDURE_EVIDENCE`, `DIGITAL_DATA_AI`, `REAL_ESTATE_PROPERTY` e `INTELLECTUAL_PROPERTY`.

`LegalDomainProfile` contiene `id`, `label`, `status`, `description` y `visualSemantics`. Los dominios `ACTIVE` deben declarar semántica visual completa. Esta semántica es una gramática de dirección artística, no un estilo fijo por materia.

`CrossDomainRelation` contiene `from`, `to`, `whyRelated`, `sharedThemes`, `territoryRequired` y `risk`. Una relación describe contexto y navegación. No es verdad jurídica por sí misma y no autoriza una conclusión sobre una persona, una operación o un territorio.

`VisualSemantics` contiene `gravity`, `tensions`, `preferredMetaphorFamilies`, `materialCues`, `spatialCues` y `avoid`. Sus familias de metáforas orientan, pero no obligan a una plantilla visual.

`VisualProductionEnvelope` es provider-neutral. Transporta `CONTENT_ID`, `HUMAN_QUESTION`, `WORLD_IDS`, `LEGAL_DOMAIN_IDS`, `CONCEPT_IDS`, `CLAIM_IDS`, `SOURCE_IDS`, `TERRITORY`, `LIMITS`, `FORMAT`, `EXACT_COPY`, `VISUAL_TENSION`, `METAPHOR_CANDIDATES`, `RECENT_ASSET_FINGERPRINTS` y `OUTPUT_STATE`.

## Fail-closed

`READY_FOR_VISUAL` falla si falta `CONTENT_ID`, claim, source, territory cuando aplica, limits, world/domain binding, exact copy, visual tension o metaphor candidate. `HOLD_SOURCE` y `UNKNOWN` fallan siempre. Los dominios desconocidos, las relaciones a dominios desconocidos, los self-relations, los dominios duplicados y los dominios activos sin `VisualSemantics` también fallan.

El envelope prepara el contrato para futuros agentes visuales. No implementa todavía el generador de imágenes, no llama a proveedores, no elige assets, no publica, no despliega y no abre gates.

## Ejemplos cross-domain

**CONTRACTS ↔ TAX.** Una operación contractual puede tener una dimensión fiscal relevante sin afirmar automáticamente una consecuencia fiscal. La relación abre contexto y revisión; cualquier claim debe conservar sus propios sources y territorio.

**FAMILY ↔ CIVIL ↔ NOTARIAL.** Una situación puede cruzar relaciones familiares, patrimonio o actos civiles y formalización notarial sin que la relación entre materias se convierta en una regla jurídica.

**PENAL ↔ PROCEDURE_EVIDENCE ↔ DIGITAL_DATA_AI.** Conducta, procedimiento/prueba y evidencia digital pueden relacionarse sin confundir materias ni producir una conclusión individualizada.

## Contrato para agentes

Cada contribución debe dejar `INPUT`, `SOURCE_IDS`, `OUTPUT`, `STATE`, `DECISIONS`, `WORLD_IDS`, `LEGAL_DOMAIN_IDS`, `CONCEPT_IDS`, `CLAIM_IDS`, `RELATIONS`, `ASSETS`, `PROMPTS`, `FINGERPRINTS`, `TESTS`, `BLOCKERS`, `NEXT_ACTION` y `HANDOFF`.

Los agentes pueden proponer conceptos, relaciones, research, `VisualSemantics`, metáforas, prompts, assets internos, QA y provenance. No pueden crear claims por inferencia, convertir una relación entre materias en una regla jurídica, abrir publicación, abrir deploy, abrir merge ni crear un segundo canon.

## Compatibilidad y límites

La capa convive con `World`, `Series`, `Chapter`, `Concept` y `Process` existentes. La implementación es provider-agnostic y no introduce dependencias de Review Registry, Product Lab, internal assets, pilot briefs, Before Signing o del carril `CanonicalEnvelope` de PR #27.

La siguiente etapa humana debe decidir si este contrato auxiliar puede entrar en un PR separado. Este Draft PR no autoriza integración, publicación ni generación visual masiva.
