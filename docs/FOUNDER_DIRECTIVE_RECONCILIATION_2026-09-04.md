# LegalMente — Reconciliation of Founder Directive — 2026-09-04

Status: `IMPLEMENTATION_REVIEW / REVERSIBLE / NO_DEPLOY / NO_PUBLICATION`

Base reviewed: `legalmente-web/main` at `46948a0cd0db1a1d1fd2e914e00c616cd4bd82d0`.

## What already existed and is preserved

The current repository already contains a substantial knowledge architecture and should not be replaced by a second canon:

- `knowledge-graph` for relations and knowledge safety/integrity;
- `knowledge-pilot` for human questions, territory requirements, canonical bindings and public/professional projections;
- `editorial-engine` for distribution lanes and orchestration;
- `opportunity-engine` for evidence-aware prioritization and portfolio diversity;
- `visual-system` for visual assets/tokens;
- `ecosystem-kernel` and `legal-core` for shared boundaries and legal-safe product behavior.

The Founder directive therefore adds missing product invariants rather than rebuilding these systems.

## Gaps identified

### 1. Need + matter + level were not one explicit unit contract

The repository had questions, domains, concepts and opportunity journeys, but no single small validator requiring a unit to declare all of: matter, knowledge level, product layer, entry door, human need, common confusion/tension, application, territory mode and source tier.

**Action:** added `src/lib/product-directive/index.ts`.

### 2. Panhispanic vs comparative vs specialized territory needed an explicit product-level guard

Existing canonical/legal territory controls remain authoritative. The product layer now adds a non-legal guard that rejects silent national binding in panhispanic-general units and requires explicit territories for comparative/specialized descriptors.

**Boundary:** this validator cannot approve jurisdictional truth or open a legal gate.

### 3. Visual production rules needed machine-checkable brief invariants

The visual system existed, but the Founder rules “art communicates”, “brand physically integrated” and “approved sample references checked” were not encoded as a brief-level validation contract.

**Action:** social visual descriptors now require these three booleans plus metaphor and visual school. This is not image understanding and does not certify final art; it prevents an incomplete brief from being treated as ready.

### 4. Anti-repetition needed a portable candidate fingerprint

The opportunity engine already prevents portfolio concentration, but an explicit content fingerprint at the unit level was missing.

**Action:** added a deterministic fingerprint using matter, level, entry door, need/question, concepts, angle, format, metaphor and visual school. Exact prior fingerprints are blocked before brief generation.

**Next expansion:** similarity beyond exact fingerprints should reuse existing inventory/metrics rather than create an independent memory database.

### 5. Founder LinkedIn provenance needed a hard product requirement

The system already separates public and professional projection. The new product validator requires documented professional evidence IDs when a unit includes `FOUNDER_LINKEDIN`.

**Boundary:** an evidence ID proves provenance linkage exists; it does not prove a legal proposition or authorize disclosure.

### 6. Source strategy needed a level-aware product check

The legal-governance system remains the authority for claims and sources. The product descriptor now rejects obviously mismatched source tiers (for example comparative content without explicit comparative/primary support, or `PRIMARY_CURRENT` declared on a non-primary reference).

### 7. Gemini status was being discussed without repository evidence

At the reviewed base, `package.json` declares no supported Gemini SDK package. No Gemini dependency is added in this change because adding a provider before deciding adapter/API shape and credentials would create unnecessary coupling.

**Action:** added `scripts/check-image-provider.mjs` and `npm run check:image-provider`.

The preflight reports:

- `NOT_INSTALLED` when no supported SDK is declared;
- `INSTALLED_NOT_CONFIGURED` when an SDK exists but no supported credential variable is present;
- `CONFIGURED_NOT_PROVEN_USABLE` when package + credential variable exist.

It never prints credential values and deliberately does not call an external API. A live capability test remains a separate future gate.

## Source-of-truth boundaries

1. **Psyche/legal governance:** legal claim truth, primary-source binding, legal review and legal gates.
2. **legalmente-web product layer:** classification, discovery, projection, product constraints, tools, public-safe interfaces and prioritization.
3. **Drive:** Founder decisions, protocols, approved visual references, operational memory and evidence/handoffs that should not be hardcoded into a public repository.

## What this change intentionally does not do

- no merge to `main`;
- no deployment;
- no public content publication;
- no legal claim approval;
- no opening of legal/publication gates;
- no PII intake;
- no contract generation;
- no payment/service activation;
- no secret creation or secret inspection;
- no Gemini API installation or live call;
- no copying of private Drive IDs into public source code.

## Validation added

`test:product-directive` covers:

- need-first descriptor readiness;
- panhispanic boundary;
- comparative-territory requirement;
- art/brand/sample-reference brief invariants;
- Founder LinkedIn provenance;
- exact anti-repetition fingerprint;
- missing sources becoming research work instead of filler content.

`check:image-provider` provides a fail-closed provider preflight.

## Next implementation steps after review

1. Integrate the product descriptor into candidate generation in `opportunity-engine`/`knowledge-pilot` rather than creating parallel candidate stores.
2. Bind production inventory fingerprints to the existing content/asset registry.
3. Build need-first web routes from the same graph: e.g. used-vehicle purchase, land purchase, contract signing, consumer, criminal-process entry points.
4. Add a source-policy adapter that reads canonical legal envelopes rather than duplicating legal source authority.
5. Add a private/external visual-reference receipt proving the Founder-approved sample set was actually consulted for each image batch.
6. Evaluate provider adapters only after preflight and provider-neutral interface are accepted.
7. Measure content/product performance and feed first-party evidence back into `opportunity-engine` without allowing popularity to override legal gates.
