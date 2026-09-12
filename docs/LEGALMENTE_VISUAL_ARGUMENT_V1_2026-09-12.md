# LegalMente — Visual Argument Layer V1 — 2026-09-12

Status: `IMPLEMENTATION_CANDIDATE` · `NOT_MERGED` · `NOT_DEPLOYED` · `NOT_PUBLISHED`

## Problem

The current adaptive production policy can prove metadata distance, but metadata variety does not prove that an image carries a distinct idea. A batch may rotate style, scene, material, camera and light while still behaving like the same visual template.

## Evidence

- The living Drive bitácora dated 2026-09-12 defines the next improvement as an expansive artistic engine centered on `imagen-argumento`, functional visual roles and perceptual variety.
- The existing policy explicitly warns that metadata checks do not prove visual quality or semantic novelty.
- The current runtime validates policy, exact binding and legal state before calling a provider, but it does not formalize the visual function or the intended perception before style selection.

## Hypothesis

If each candidate must declare what the image does before selecting its artistic family, the system can reject nominal variety earlier and reserve stylistic exploration for concepts with distinct visual meaning.

## Change

Added `src/lib/visual-argument/` with a provider-neutral preflight contract:

- visual functions: explain, separate, compare, reveal, warn, tension, humanize, show process, show consequence, materialize abstraction and provoke reflection;
- required audience, conflict, learning goal, image argument and expected perception;
- a fingerprint that treats repeated visual arguments as duplicates even when style could later change;
- batch-level minimum functional diversity (5 visual functions for a 10-piece preflight by default);
- an invariant that rendered QA and human curation remain mandatory.

`test:visual-argument` is included in `test:convergence` so the new contract cannot silently regress on this branch.

## Test plan

1. Accept ten unique visual arguments spanning ten functions.
2. Reject the same visual argument under a different content ID.
3. Reject an image argument that merely repeats the learning goal.
4. Reject a 10-piece batch using only two functional roles.
5. Run the existing convergence, typecheck and lint gates in CI.

## Result

Code and tests are committed on branch `chatgpt/visual-argument-v1-2026-09-12`. CI result must be read from the draft PR before this candidate is described as mechanically passing.

## Decision boundary

This is not evidence of better rendered images. It is an upstream intent gate. Real improvement requires a provider-authorized batch, visual QA and Founder curation.

## Rollback

Remove `src/lib/visual-argument/` and revert the `package.json` test-script addition. No Drive state, legal claim, publication state or provider configuration depends on this candidate.

## Affected artifacts

- `src/lib/visual-argument/index.ts`
- `src/lib/visual-argument/index.test.ts`
- `package.json`
- this receipt
