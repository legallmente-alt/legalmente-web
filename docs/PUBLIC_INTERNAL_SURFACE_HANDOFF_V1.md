# Public Internal Surface Handoff V1

## Purpose

This change hardens the public educational artifact against accidental exposure of internal Product Lab routes and assets.

## Finding

The public build generated an internal route chunk under `out/_next/static/chunks/app/internal/product-lab/` even though the public preparation step removed the `out/internal` route directory. A directory-only check was therefore insufficient.

## Implemented change

The public preparation step now removes `out/_next/static/chunks/app/internal` together with the existing internal route and internal asset directories. The public route proof also scans all generated files and fails closed if it finds internal path markers, `product-lab`, or `wave01a`.

## Verification

The public build must complete successfully and the resulting artifact must contain no file matching the protected internal markers. The public route proof must pass with the required educational routes, valid internal links, a present 404 page and security files. Legal-core tests, knowledge-safety tests, typecheck, lint and `git diff --check` remain separate technical gates.

## Limits

This is an artifact-integrity and privacy-surface gate. It does not establish legal validity, content approval, publication authorization, release ownership or production deployment approval. The Product Lab remains an internal-only surface.

## Next gate

Run the complete CI on the current-main rebased branch. If green, return this PR as a technical merge candidate for explicit human decision. No public content or professional service activation is introduced by this change.
