# LegalMente — Review Registry V1

## Purpose

The Review Registry is the first reusable coordination and memory contract for internal review units. It consolidates structural metadata that was previously split between the Wave 01A manifest and the Product Lab page. It does not replace the manifest, the Constitution, the claim system, or human approval.

## Input and provenance

The adapter consumes `public/internal-assets/legalmente/wave-01a/manifest.json`. For every unit it preserves `contentId`, `territory`, `state`, `relatedContent`, `candidateRoute`, Drive file IDs, source names, dimensions, derived local paths, and format. The Drive IDs remain provenance references; the repository binaries remain internal review assets.

## Output

`wave01aReviewRegistry` exposes immutable `InternalReviewUnit` records. `validateReviewRegistry` returns either a valid registry or structured issues. The Product Lab reads this registry for asset paths and review metadata, while educational copy remains a separate page layer until the pending claim-free Product Lab work is integrated.

## Fail-closed rules

The registry rejects malformed Content IDs, missing Drive provenance, missing territory, unsupported review states, mapped content that is not `PENDING_MAPPING`, invalid candidate routes, missing 9:16 or 4:5 assets, incorrect dimensions, duplicate Content IDs, and local asset paths that are unavailable when an availability list is provided. An invalid registry cannot be returned as renderable data through `assertReviewRegistry`.

## Gates and non-capabilities

The only accepted review state in V1 is `HUMAN_REVIEW_REQUIRED`. The registry never emits `APPROVED`, `READY_FOR_COPY`, publication authorization, merge authorization, deploy authorization, a legal conclusion, or a service decision. It does not ingest PII, free-text cases, real documents, payments, or professional-service requests. `PENDING_MAPPING` is preserved when the route relationship is not confirmed.

## Verification

The registry tests cover healthy adaptation, missing provenance, prohibited state transitions, incomplete formats, unavailable local assets, duplicate Content IDs, and unknown-unit lookup. The existing workflow runs `npm run test:review-registry` alongside LegalMente’s legal-core, knowledge-safety, typecheck, lint, privacy, public-build, and route proofs.
