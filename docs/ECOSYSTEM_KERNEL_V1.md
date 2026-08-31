# LegalMente — Ecosystem Kernel V1

## Propósito

El **Ecosystem Kernel** conecta mundos de experiencia humana, dominios jurídicos, conocimiento, arte y herramientas sin convertir esas conexiones en claims. `World` aporta contexto humano; `LegalDomain` aporta una dimensión temática auxiliar; `Claim + Source + Territory` conserva la verdad verificable en la capa canónica; el grafo conecta; el arte vuelve memorable; la herramienta vuelve útil.

Este kernel es una capa auxiliar de contexto, navegación y dirección semántica. `LegalDomainId`, `LegalDomainProfile`, `CrossDomainRelation` y `VisualSemantics` no son fuente jurídica, claim, decisión territorial, evaluación jurídica ni autoridad canónica. No rehace el Knowledge Graph existente, no modifica claims, sources, territorio o gates y no crea un segundo canon.

## Modelo

`LegalDomainId` contiene los 15 identificadores auxiliares iniciales: `CIVIL`, `FAMILY`, `MERCANTILE`, `CORPORATE`, `CONTRACTS`, `PENAL`, `TAX`, `NOTARIAL`, `AGRARIAN`, `LABOR`, `ADMINISTRATIVE`, `PROCEDURE_EVIDENCE`, `DIGITAL_DATA_AI`, `REAL_ESTATE_PROPERTY` e `INTELLECTUAL_PROPERTY`. Esta lista no es una taxonomía jurídica canónica y no contiene reglas, sources ni claims.

`LegalDomainProfile` contiene `id`, `label`, `status`, `description` y `visualSemantics`. Los perfiles `ACTIVE` deben declarar semántica visual completa. El perfil describe contexto auxiliar; no decide el derecho aplicable.

`CrossDomainRelation` contiene `from`, `to`, `whyRelated`, `sharedThemes`, `territoryRequirement` y `contextRisk`. Una relación describe contexto y navegación. No es verdad jurídica por sí misma, no calcula riesgo jurídico y no autoriza una conclusión sobre una persona, una operación o un territorio.

`VisualSemantics` contiene `visualGravity`, `tensions`, `preferredMetaphorFamilies`, `materialCues`, `spatialCues` y `avoid`. Es dirección semántica auxiliar: no es una plantilla, estilo fijo, paleta obligatoria ni generador de prompts hardcoded. Agentes y modelos distintos pueden producir arte diferente conservando coherencia conceptual.

## Territorio declarativo

La territorialidad nunca se infiere por `LegalDomainId`. `territoryRequirement` debe llegar como señal declarativa upstream con uno de estos valores: `REQUIRED`, `OPTIONAL` o `NOT_APPLICABLE`. El kernel solo valida la señal recibida y exige `territory` cuando la señal es `REQUIRED`; no decide cuándo jurídicamente aplica.

## VisualProductionEnvelope

`VisualProductionEnvelope` es transporte provider-neutral. Lleva `contentId`, `humanQuestion`, `worldIds`, `legalDomainIds`, `conceptIds`, IDs opacos de claims y sources, `territory`, `territoryRequirement`, `limits`, `format`, `exactCopy`, `visualTension`, `metaphorCandidates`, fingerprints recientes y `outputState`.

El envelope no duplica contenido jurídico, no crea claims o sources, no resuelve vigencia, no sustituye a Psyche o al producer canónico, no reemplaza Knowledge Graph y no tiene efectos secundarios. No llama proveedores, no elige assets, no genera imágenes, no publica, no despliega y no abre gates.

La entrada pública del validator acepta `unknown`. JSON malformado, enums desconocidos, dominios inválidos, relaciones inválidas y envelopes incompletos devuelven siempre `{ ok: false, issues: [...] }`; no deben depender de excepciones no controladas. El helper de assertion queda reservado para objetos internos ya tipados.

## Fail-closed

`READY_FOR_VISUAL` falla si falta content ID, claim, source, limits, world/domain binding, exact copy, visual tension o metaphor candidate. Si `territoryRequirement` es `REQUIRED`, también requiere territory. `HOLD_SOURCE` y `UNKNOWN` fallan siempre. Los dominios desconocidos, las relaciones a dominios desconocidos, los self-relations, los dominios duplicados, los estados runtime desconocidos y los dominios activos sin `VisualSemantics` también fallan.

## Ejemplos cross-domain

**FAMILY ↔ CIVIL ↔ NOTARIAL.** Una situación de `vida-cotidiana` puede descubrir conceptos de consentimiento, obligación, propiedad o formalización y relacionarse contextualmente con estas dimensiones. La relación no crea una regla sobre estado civil, patrimonio o acto notarial.

**CONTRACTS ↔ MERCANTILE ↔ CORPORATE ↔ TAX.** El mundo `empresa-comercio` ya contiene representación, sociedades, gobierno y actividad económica. El concepto reusable `representacion` puede recibir relaciones contextuales con contrato, comercio, gobierno corporativo y dimensión fiscal. La relación no afirma obligación tributaria ni sustituye una fuente territorial.

**PENAL ↔ PROCEDURE_EVIDENCE ↔ DIGITAL_DATA_AI.** Los mundos `conducta-penal`, `conflicto-prueba` y `tecnologia-ia` separan conducta, procedimiento, evidencia y datos digitales. El concepto reusable `prueba` atraviesa esos mundos. El kernel no convierte conducta en responsabilidad ni datos en prueba admisible.

## Contrato para agentes

Un agente nuevo puede recibir `CONTENT_ID`, `WORLD`, `LEGAL_DOMAIN`, `CONCEPT`, `CLAIM_ID`, `SOURCE_ID`, `TERRITORY`, `LIMITS` y `COPY`, y producir `RELATIONS`, `VISUAL_SEMANTICS`, `PROMPTS`, `ASSETS`, `QA`, `FINGERPRINTS` y `HANDOFF`.

Cada contribución debe dejar `INPUT`, `SOURCE_IDS`, `OUTPUT`, `STATE`, `DECISIONS`, `WORLD_IDS`, `LEGAL_DOMAIN_IDS`, `CONCEPT_IDS`, `CLAIM_IDS`, `RELATIONS`, `ASSETS`, `PROMPTS`, `FINGERPRINTS`, `TESTS`, `BLOCKERS`, `NEXT_ACTION` y `HANDOFF`. Los agentes pueden proponer contexto, relaciones y dirección; no pueden inventar derecho.

Los agentes no pueden crear claims por inferencia, crear sources, decidir territorio, calcular vigencia, convertir una relación entre materias en una regla jurídica, abrir publicación, abrir deploy, abrir merge ni crear un segundo canon.

## Compatibilidad y límites

La capa convive con `World`, `Series`, `Chapter`, `Concept` y `Process` existentes. La implementación es provider-agnostic y no introduce dependencias de Review Registry, Product Lab, internal assets, pilot briefs, Before Signing o del carril `CanonicalEnvelope` de PR #27.

La implementación tampoco se conecta todavía al runtime público: las rutas públicas no importan `ecosystem-kernel`. Este Draft PR no autoriza integración, publicación, generación visual masiva ni merge.
