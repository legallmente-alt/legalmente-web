# LegalMente — Relational Learning Implementation V1

Status: `ISOLATED_IMPLEMENTATION_IN_PROGRESS / NO_MERGE / NO_DEPLOY / NO_PUBLICATION`

## Product thesis

LegalMente is not a flat legal catalogue. It is a navigable learning system that starts from human conduct, situations and concepts, then exposes only the relationships that help the user understand what matters and what can come next.

Canonical learning journey:

`SITUATION → CONCEPT → BRANCH → PROCESS → EVIDENCE → TERRITORY → SOURCE → TOOL`

History, disciplines, series and chapters are contextual layers that may connect to that journey without replacing it.

## Navigation contract

Every visible learning unit should answer:

1. Where am I?
2. What am I learning?
3. Why does it matter?
4. What is it connected to?
5. What can I learn next?

Series must expose ordered chapters. Chapters must expose their parent world and series, chapter position, previous/next when available, related concepts and related process/evidence routes when meaningful.

Concepts are nodes, not folders. A concept may connect to several worlds or disciplines. Similarity across legal systems is never treated as legal equivalence without territorial evidence.

## Current implementation surfaces

- `/` — simplified relational Home.
- `/explorar` — four natural entry modes plus connected worlds.
- `/mundo/[worldId]` — world page with ordered series and related worlds.
- `/serie/[seriesId]` — ordered chapter route.
- `/capitulo/[chapterId]` — chapter position, concepts, processes, previous/next and connected content.
- `/concepto/[conceptId]` — cross-world concept node with context and territorial limits.
- `/proceso/[processId]` — educational process/evidence route with explicit territorial and advice limits.

## Initial worlds

- Vida cotidiana
- Empresa y comercio
- Conflicto, proceso y prueba
- Salud y medicina
- Tecnología e inteligencia artificial
- Movilidad y transporte
- Conducta y derecho penal
- Historia, sistemas y derecho comparado

These are navigation hypotheses for isolated product implementation, not legal claims or publication authorization.

## Legal boundary

The graph may organize navigation, relationships and educational sequencing. It must not manufacture legal rules. Concrete rules, deadlines, territorial effects, liability conclusions, eligibility determinations and individualized legal advice remain data-bound to approved legal sources and human gates.

## Visual boundary

The Editorial Instrument remains the approved art direction, but navigation clarity prevails over decorative composition. Complexity belongs in the graph, not in the first screen. Avoid flat equal-card catalogues, dashboard density and unstructured chapter grids.

## Current blockers

- W01/W02/W03 real binaries and crop QA.
- Real screenshots at 1440 / 430 / 390 / 360.
- Post-implementation Manus 3 art QA.
- Accessibility and mobile interaction QA on real surfaces.
- No merge, deploy or publication authorization.
