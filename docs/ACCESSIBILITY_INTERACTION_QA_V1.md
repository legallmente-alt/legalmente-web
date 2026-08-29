# LEGALMENTE — ACCESSIBILITY & INTERACTION QA V1

**PR:** #5  
**Branch:** `feat/legalmente-editorial-instrument-preview-v1`  
**Art gate:** `IMPLEMENTATION_ART_PASS`  
**Scope:** 8 assembled product surfaces × 4 viewports (1440 / 430 / 390 / 360)  
**Final runtime head tested:** `dd6682b758d08a80e1d0988222c7eaeeca997f4a`  
**CI run:** `33224232955`  
**Artifact:** `9706293858` — `legalmente-implementation-proofs-dd6682b758d08a80e1d0988222c7eaeeca997f4a`

## Final state

`ACCESSIBILITY_INTERACTION_SMOKE_PASS`

The existing browser proof pipeline was extended with a dedicated accessibility/interaction smoke test. The first run correctly failed and exposed three concrete issues repeated across the assembled surfaces:

1. the LegalMente home link in the global navigation measured 97×23 px, below the 24 px minimum smoke threshold;
2. the footer link to `/confianza` had no perceptible programmatic-focus indicator;
3. the footer link to `/sobre` had no perceptible programmatic-focus indicator.

Those issues were corrected locally:

- the LegalMente home link is now `inline-flex`, vertically centered and at least 44 px high;
- footer links are now `inline-flex`, at least 44 px high and expose an explicit focus ring.

The follow-up CI run completed successfully.

## Final automated coverage

The accessibility/interaction smoke now checks each of the 32 route/viewport combinations for:

- Spanish document language;
- exactly one `h1`;
- exactly one `main` landmark;
- footer landmark present;
- navigation landmarks labelled;
- no duplicate IDs;
- no heading-level jumps in the rendered heading sequence;
- every rendered image has an `alt` attribute;
- every visible interactive control has an accessible name;
- every visible interactive target is at least 24×24 px;
- every visible interactive control exposes an outline, focus ring/shadow or underline when focused.

## Final result

**32 / 32 route × viewport combinations PASS.**

Aggregate final failures:

- unnamed interactive controls: `0`;
- interactive targets below 24 px: `0`;
- controls without perceptible focus indication: `0`;
- duplicate IDs: `0`;
- heading-level jumps: `0`;
- unlabelled navigation landmarks: `0`;
- images missing `alt`: `0`.

This is a deterministic smoke gate, not a claim of full WCAG conformance. Manual assistive-technology testing, color-contrast review, real-device interaction and any release-specific accessibility acceptance remain separate activities.

## Gate interpretation

This result closes the current **automated accessibility/interaction smoke** blocker for the isolated implementation. It does not authorize merge, deployment, publication or public legal content. Legal, privacy, security, release and founder gates remain separate.
