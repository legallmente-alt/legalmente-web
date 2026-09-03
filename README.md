# LegalMente

## Active isolated product direction

This branch implements **The Editorial Instrument** as an isolated educational release with a relational learning layer. The validated public release is available at https://ef9882a7.legalmente-educativo.pages.dev/. It is not a professional legal service and does not collect personal data.

### Current status

- Legal core: deterministic internal implementation under review.
- Knowledge graph: implemented as navigation/learning structure, not as a source of legal claims.
- Home: recomposed around one simple entry question and relational continuation.
- Relational surfaces: `/explorar`, `/mundo/[worldId]`, `/serie/[seriesId]`, `/capitulo/[chapterId]`, `/concepto/[conceptId]`, `/proceso/[processId]`.
- Visual system: published-format editorial assets are preserved; representative vertical art was restored/upscaled without changing its 9:16 composition.
- Public educational tool: `/antes-de-firmar` is live, deterministic and non-PII.
- Publication/deploy: educational release live on isolated Cloudflare Pages project; professional-service activation remains out of scope.

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

Keep legal logic, source data, territory, copy, graph relationships and image assets separate. The graph can organize learning and navigation but cannot manufacture legal rules. Feature flags remain fail-closed. The public artifact excludes `/internal/`, uses no PII/document/payment surfaces, and must pass the legal-core, knowledge-safety, privacy, typecheck and static-build gates before each publication.

## Content Factory Engine

The deterministic, provider-neutral content factory is documented in [`docs/CONTENT_FACTORY_ENGINE_V1.md`](docs/CONTENT_FACTORY_ENGINE_V1.md). It validates strict Zod packets for four editorial archetypes and writes `copy_social.md`, `visual_prompt.json` and `handshake_web.json` without elevating legal or publication authority.
