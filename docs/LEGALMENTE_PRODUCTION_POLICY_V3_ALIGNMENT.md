# LegalMente — Production Policy V3 Alignment

Status: proposed repository alignment on an unmerged branch.
Date: 2026-09-07.

## Purpose

Make the repository understand the same production rules that govern the current LegalMente Drive canon without turning implementation details into a second source of truth.

The current operational order is:

`KNOWLEDGE → CANDIDATE → LEGAL VALIDATION → COPY → ART DIRECTION → ASSET → QA → CURATION → MEMORY`

Generation is not publication.

## 1. Four production modes

- `LEGALMENTE_GENERAL`: broad exploration. A generic LegalMente request does not force LinkedIn, a digital topic, or any historical channel quota.
- `SPECIFIC_DOMAIN`: the requested legal domain remains fixed while angle, entry door, depth, metaphor and art can vary.
- `LINKEDIN_LEGALMENTE`: institutional/professional LegalMente output with source binding before review.
- `LINKEDIN_FOUNDER`: founder/professional output, separate from institutional LinkedIn and subject to the same truth/source gates.

## 2. General batch of ten

The production-policy module now encodes the intended minimums for a generic 10-piece batch:

- exactly 10 candidates when the policy expects 10;
- at least 8 distinct primary legal domains;
- no primary domain more than twice;
- `DIGITAL_DATA_AI` at most once unless a different policy is explicitly requested;
- at least five distinct entry doors;
- ten distinct dominant artistic-style strings;
- no repeated content fingerprint;
- no repeated visual fingerprint.

These checks measure candidate diversity. They do not prove that legal claims are true and do not replace source review.

## 3. Brand and copy invariants

Every candidate requires:

- visible brand exactly `LegalMente`;
- brand integration mode `PHYSICAL_SCENE`;
- matter label;
- topic label;
- central idea;
- art direction fields for style, metaphor, scenario, material, light, framing, composition and brand object.

Overlay, watermark and floating-logo modes fail validation. The word `entretenimiento` is not accepted as part of the visible brand.

## 4. Curation memory

The code distinguishes:

`GENERATED → PRESELECTED → APPROVED → PUBLISHED`

with `DISCARDED` as a separate state.

`PRESELECTED`, `APPROVED` and `PUBLISHED` are strong anti-repetition memory. `GENERATED` and `DISCARDED` are short memory with a configurable cooldown (30 days by default). This prevents one exploratory batch from permanently exhausting the knowledge space while still preventing immediate repetition.

## 5. Art is an open registry

`artisticStyle` is deliberately an open string rather than a closed enum. The legal-domain registry and the art registry have different responsibilities. A legal matter does not own one visual language.

The code validates diversity of output; it does not prescribe a finite list of acceptable schools.

## 6. Agent improvement receipt

Agents may propose improvements, but the minimum receipt is:

`problem → evidence → hypothesis → proposed change → test plan → result → decision → rollback → affected artifacts`

The module includes a validator for this receipt. A proposal without evidence or reversibility is incomplete.

## 7. Relationship to existing engines

This module is an operational policy adapter. It does not replace:

- ecosystem-kernel legal-domain authority;
- knowledge graph;
- source/territory gates;
- editorial-engine utility and depth scoring;
- Founder approval;
- publication/deploy gates.

The current image-generation/remotion repository described in Drive is not available through the connected GitHub installation used for this change. Therefore this branch does **not** claim that provider-side image generation or remotion selection code has been repaired. The Drive canon records that as an implementation gap until that repository is accessible and reconciled.

## 8. CI

This branch adds:

- `src/lib/production-policy/index.ts`;
- `src/lib/production-policy/index.test.ts`;
- `npm run test:production-policy`;
- `.github/workflows/production-policy-ci.yml`.

The branch is intentionally unmerged. CI, review and Founder authorization remain separate gates.
