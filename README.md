# LegalMente

## Visual quality gate — 2026 product direction

The current public/root scaffold and the first internal product-lab composition are **not** accepted as the final visual target. They are implementation scaffolds only.

### Status

- Legal core: internal deterministic implementation under review.
- Visual tokens/symbols/cards: implementation candidates, not final art.
- Manus 2 production images: `PRODUCTION_PROOF`, binary import pending.
- Root Home composition: `VISUAL_REJECT / LEGACY_SCAFFOLD`.
- Internal product lab composition: `FUNCTIONAL_SCAFFOLD / VISUAL_QA_REQUIRED`.
- Publication/deploy: blocked.

### 2026 acceptance principles

LegalMente must feel like a premium, explorable editorial/product experience, not a legacy legal portal, a generic SaaS dashboard, a school slide deck, or a grid of identical cards. Art direction, hierarchy, motion, editorial pacing and discovery must work together. Visual tokens are constraints, not proof of quality.

Do not promote any scaffold to public UI until art/UX review explicitly passes desktop and 360/390/430 mobile surfaces. Do not treat compliance with symbol, color or card tokens as sufficient visual acceptance.

### Hard anti-patterns

- centered marketing hero + two equal outlined cards as the main Home structure;
- repeated equal-width card grids for every content family;
- generic gradient placeholders where art is expected;
- decorative glassmorphism, excessive borders or shadows;
- serif typography everywhere without role hierarchy;
- dashboard-like presentation of editorial worlds;
- motion without information value;
- content density that hides the primary user action;
- treating `PRODUCTION_PROOF` or `VECTOR_CANDIDATE` as final/public art.

### Engineering rule

The code should keep legal logic, source data, territory, copy and image assets separate. Feature flags remain fail-closed. No merge, deployment or publication is authorized by this branch.

---

Existing scaffold documentation remains in repository history. This README reflects the current quality gate for the active product branch.
