# LegalMente

## Active isolated product direction

This branch implements **The Editorial Instrument** as an isolated product/visual preview and now includes a relational learning layer. It is not approved for merge, deploy or publication.

### Current status

- Legal core: deterministic internal implementation under review.
- Knowledge graph: implemented as navigation/learning structure, not as a source of legal claims.
- Home: recomposed around one simple entry question and relational continuation.
- Relational surfaces: `/explorar`, `/mundo/[worldId]`, `/serie/[seriesId]`, `/capitulo/[chapterId]`, `/concepto/[conceptId]`, `/proceso/[processId]`.
- Manus 2 production images: `PRODUCTION_PROOF`; W01/W02/W03 binary import and crop QA still pending.
- Manus 3: `ART_PASS_FOR_ISOLATED_IMPLEMENTATION`; post-implementation art QA still pending.
- Publication/deploy: blocked.

## Relational product rule

LegalMente is not a flat catalogue. The product should let a user enter through a situation, concept, process or world and then understand where they are, why the current item matters, what it connects to and what comes next.

The canonical learning journey is:

`SITUATION → CONCEPT → BRANCH → PROCESS → EVIDENCE → TERRITORY → SOURCE → TOOL`

History, disciplines, series and chapters are contextual layers. Similarity between legal systems is not treated as legal equivalence without territorial evidence.

### Visual acceptance principles

LegalMente must feel like a premium, explorable editorial/product experience, not a legacy legal portal, generic SaaS dashboard, school slide deck or grid of identical cards. Complexity belongs in the graph, not on the first screen.

Do not promote any scaffold to public UI until art/UX review explicitly passes desktop and 360/390/430 mobile surfaces. Do not treat compliance with symbol, color or card tokens as sufficient visual acceptance.

### Hard anti-patterns

- centered marketing hero + equal outlined cards as the whole Home structure;
- repeated equal-width card grids for every content family;
- generic gradient placeholders where approved art is expected;
- decorative glassmorphism, excessive borders or shadows;
- dashboard-like presentation of editorial worlds;
- unordered chapters or orphan concepts;
- motion without information value;
- content density that hides the primary user action;
- treating `PRODUCTION_PROOF` or `VECTOR_CANDIDATE` as final/public art.

### Engineering rule

Keep legal logic, source data, territory, copy, graph relationships and image assets separate. The graph can organize learning and navigation but cannot manufacture legal rules. Feature flags remain fail-closed. No merge, deployment or publication is authorized by this branch.
