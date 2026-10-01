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

## Living production policy — 2026-09-07 alignment

Content/image production must not be inferred from a finite prompt bank, a forced channel quota or a fixed matter-to-art mapping. The repository-side policy adapter lives at `src/lib/production-policy/` and is documented in `docs/LEGALMENTE_PRODUCTION_POLICY_V3_ALIGNMENT.md`.

Operational interpretation follows the current LegalMente Drive canon. The production adapter encodes four distinct modes (`LEGALMENTE_GENERAL`, `SPECIFIC_DOMAIN`, `LINKEDIN_LEGALMENTE`, `LINKEDIN_FOUNDER`), broad-domain diversity for generic batches, open artistic-style strings, physical `LegalMente` brand integration, curation states that separate generated work from approved/published work, short-vs-strong anti-repetition memory, and reversible agent-improvement receipts.

This policy is not a legal source and cannot manufacture claims. Source, territory, legal-review, Founder approval, publication, merge and deploy gates remain separate.

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
