# Public Route Proof V1

**Branch:** `agent/public-route-proof-v1`  
**Commit:** `1c27936`  
**Scope:** educational static artifact only.

## Purpose

This gate verifies that the public artifact contains the critical educational routes required for the current LegalMente learning journey and that internal routes are not exposed in the prepared public output.

## Checks

`npm run test:public-routes` verifies:

- the public artifact exists after `build:public`;
- Home, Explore, Before Signing, Cases, Trust, About, one world, one concept and one process route are present;
- the `/internal/` directory is absent from the public artifact;
- `robots.txt` and `_headers` are present;
- Home contains the expected educational entry signals.

## Verification

The gate passed locally after:

- `npm run build:public`;
- `npm run test:public-routes`;
- `npm run test:legal-core` — 13/13;
- `npm run test:knowledge-safety` — 3/3;
- `npm run typecheck`;
- `npm run lint`;
- `git diff --check`.

The build generated the static educational pages and the public preparation script removed internal routes. The worktree was clean after commit.

## CI integration note

The original workflow restricted `pull_request` events to PRs targeting `main`. Because this proof is carried on a stacked integration branch, PR #11 did not receive a remote check. This branch removes that destination restriction only for `pull_request`; the `push` trigger remains limited to `main`. The change is intended to make the validation gate observable for stacked PRs without broadening public release permissions.

## Limits

This proof does not establish legal validity, content approval, privacy approval, publication authorization, release ownership, or production deployment. It is a technical artifact-integrity gate and must remain separate from `LEGAL_PASS`, `CONTENT_PASS` and `RELEASE_PASS`.

## Next gate

Review the commit on the current convergence lineage. If accepted, integrate it only through the authorized PR/review flow and rerun the proof on `main` after the relevant convergence decision. Do not use this gate to open PII, document upload, payments, professional services or real contract drafting.
