# LegalMente — Review Registry V2 Hardening

## Current capability

The Review Registry is a **manifest adapter and structural gate** for the internal Wave 01A review surface. It normalizes three units and six existing binary assets for Product Lab. It does not provide cross-run signal transport, change history, recovery, or approval memory. Those capabilities remain explicitly `NOT_IMPLEMENTED` or `NOT_PRESENT` in `wave01aReviewSnapshot.evidence`.

The registry distinguishes five facts that must not be conflated: Drive IDs are provenance references; local paths show where a repository asset is expected; SHA-256 matching verifies the observed binary against the manifest snapshot; CI verifies code and build behavior; and a human decision receipt records approval. Only the last one is approval evidence, and this registry does not contain it.

## Red-team findings and corrections

| Probe | V1 behavior | V2 correction |
|---|---|---|
| `//dominio.example`, traversal, spaces, query, hash, repeated separators | Accepted when the string started with `/`. | Rejects host-like, traversal, malformed, spaced, query, hash, and repeated-separator paths. |
| `../asset`, `subdir/asset`, another Content ID’s asset name, backslash | Accepted by suffix-based format detection. | Requires a basename and an exact `${contentId}_visual.png` or `${contentId}_visual_4x5.png` name. |
| Reused Drive ID or local asset association | Accepted. | Rejects duplicate Drive IDs and local paths in Wave 01A; shared use requires a separate explicit contract. |
| `assets` plus contradictory `vertical`/`feed` | `assets` silently won. | Rejects contradictory representations. |
| Availability omitted | Returned `ok: true`. | Returns a blocking issue until local path and SHA-256 availability is supplied. |
| Empty or public manifest | Returned `ok: true`. | Rejects empty content and visibility other than `internal-review-only`. |
| Width changed but ratio still close | Accepted within a loose ratio tolerance. | Enforces the current Wave 01A dimension contract and manifest hash. |
| File content changed after manifest creation | No digest existed to detect it. | SHA-256 is stored in the manifest and compared against the actual local binary. |
| TypeScript `readonly` assignment | Runtime mutation succeeded. | Deep-freezes registry, units, assets, and evidence at runtime. |

A reused asset can be legitimate in a future version if the model explicitly defines a shared-asset entity with its own provenance and association semantics. Wave 01A has no such contract, so V2 fails closed rather than inferring shared ownership.

## End-to-end integration

The current path is:

`manifest → getLocalAssetAvailability() → validateReviewRegistry() → wave01aReviewSnapshot → wave01aReviewRegistry → Product Lab → internal review surface proof`.

The actual consumer is `src/app/internal/product-lab/page.tsx`. It reads candidate routes, territory, state and local asset paths from the registry. The page remains internal-only and the separate copy layer is no longer used by the claim-free Product Lab variant from PR #21. The new `test:internal-review-surface` proof prevents claims, source labels, source URLs, source versions and “Fuente oficial” markers from returning to that surface.

The registry can report structural issues, but it does not yet transmit an issue to Drive, a human inbox, or a continuity service. That absence is intentional in V2: no second Command Center, no parallel source of truth, and no unverified persistence mechanism was justified by the evidence.

## Gates preserved

The registry accepts only `HUMAN_REVIEW_REQUIRED` and `PENDING_MAPPING`. It never emits `APPROVED`, `READY_FOR_COPY`, `READY_FOR_VISUAL`, publication authorization, merge authorization, deploy authorization, a legal conclusion, or professional-service activation. No PII, free-text case, real document, payment, analytics, or publishing path is involved.

The PR #21 compatibility work is deliberately limited to the claim-free internal consumer and its proof. It does not ingest the Founder decision receipt, alter canonical claim packets, open `gate_arte`, or treat CI as legal approval.

## Evidence contract

| Evidence field | Meaning in V2 |
|---|---|
| `provenance` | Drive IDs copied from the existing manifest; not approval. |
| `fileVerification` | Local path exists and SHA-256 equals the manifest snapshot. |
| `changeHistory` | `NOT_IMPLEMENTED`; no prior-version log exists. |
| `signalTransport` | `NOT_IMPLEMENTED`; no cross-run inbox or event transport exists. |
| `approvalEvidence` | `NOT_PRESENT`; no human decision is manufactured by this registry. |

## Verification

The regression suite covers the healthy manifest, all defects listed above, runtime freezing, and unknown lookup. CI runs the registry test, claim-free Product Lab proof, legal-core, knowledge-safety, typecheck, lint, privacy, sanitized public build, public route proof and browser evidence checks. The internal route and six assets remain removed from the public artifact.
