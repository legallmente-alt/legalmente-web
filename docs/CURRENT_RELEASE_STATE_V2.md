# LegalMente — Current Release State V2

Cut: 2026-08-29.

Status: `EDUCATIONAL_STATIC_RELEASE_LIVE / NO_PII / NO_CASE_INTAKE / NO_DOCUMENT_UPLOAD / NO_PAYMENTS / PROFESSIONAL_SERVICES_DISABLED / CONTRACT_DRAFT_DISABLED`.

This document reconciles the operational state after merged PRs #7, #8 and #9. It supersedes older blanket statements such as `NOT_DEPLOYED` or `PUBLIC_RELEASE=BLOCKED` **only for the already-live, static, educational, non-PII surface**. It does not authorize any professional, data-collecting, document-processing, paid or individualized legal capability.

## 1. What is live

The repository README records an isolated Cloudflare Pages educational release. The live product is static and educational. It includes the Editorial Instrument home, relational exploration, connected worlds/series/chapters/concepts/processes, trust/context surfaces, catalog/learning scenes and the deterministic `/antes-de-firmar` preparation tool.

`/antes-de-firmar` accepts only transient structural choices. It does not accept names, emails, free text, contracts, files, case facts or payment data, and it does not determine legal validity.

## 2. What remains blocked

The following capabilities remain fail-closed and require separate approval plus implementation evidence:

- `PII_COLLECTION = BLOCKED`
- `CASE_TEXT_INPUT = BLOCKED`
- `DOCUMENT_UPLOAD = BLOCKED`
- `PAYMENTS = BLOCKED`
- `PROFESSIONAL_SERVICE_ACTIVATION = BLOCKED`
- `REAL_CONTRACT_DRAFT = BLOCKED`
- `INDIVIDUALIZED_LEGAL_CONCLUSION = BLOCKED`
- `THIRD_PARTY_ANALYTICS = BLOCKED_UNLESS_EXPLICITLY_REVIEWED`

An educational static deployment must never be interpreted as approval of any item above.

## 3. Current technical release controls

- Next.js exports a static artifact.
- `build:public` removes `/internal/` from the public artifact.
- privacy surface smoke fails on known forms/free-text inputs, browser storage and common third-party trackers.
- `_headers` carries baseline security headers.
- `robots.txt` disallows `/internal/`.
- legal-core and knowledge-safety tests remain release gates.

The convergence work after this document restores responsive/browser and accessibility proof capture to ordinary PRs and `main`; the previous CI configuration incorrectly restricted those proof steps to the historical Editorial Instrument branch.

## 4. Governance correction

Older documents were written before the educational Cloudflare release and may still say `NOT_DEPLOYED`, `PUBLIC_RELEASE=BLOCKED`, or instruct operators to keep PR #5 isolated. Those statements are historical with respect to the educational static release.

They remain directionally valid for **new sensitive capabilities**: privacy/retention/deletion, terms/disclosures, security/operations, PII, documents, payments, professional services and individualized legal work still require explicit closure before activation.

## 5. Current product gaps

The live educational product is a strong structural foundation, not a finished business. Current gaps are:

1. restore current-main responsive/accessibility proof CI and verify the live artifact;
2. reconcile/retire stale branches and status documents;
3. move the Contract Preparation Engine from its old stacked branch onto a fresh branch based on current `main`, while keeping synthetic-only and real draft blocked;
4. deepen relational concept/series content from summaries into source-bound learning pages;
5. turn the first social/content pack into a five-piece measured microlot after editorial approval;
6. add release-quality SEO/discovery metadata (canonical strategy, sitemap, page metadata/social previews) once the canonical public domain is fixed;
7. approve public privacy/terms/disclosure text appropriate to the actual zero-intake educational surface and separately design future PII/service policies;
8. document hosting source, rollback, monitoring/error handling and release ownership;
9. remove or refactor legacy/orphan routes that still use the pre-Editorial-Instrument visual language.

## 6. Contract Engine separation

Mexico is authorized as the first territory for **contract legal research**, and B2B services, NDA, supplier and simple B2B sale are authorized research pilots. This does not mean legal coverage is approved.

The Contract Engine V1 must remain structured preparation only. Its unique implementation currently lives outside `main` and must be ported onto current `main` rather than merging the stale stacked branch lineage wholesale.

Until targeted Mexican legal-source corrections and human review are complete:

- `MEXICO_CONTRACT_RESEARCH = AUTHORIZED`
- `LEGAL_COVERAGE_MX = PENDING`
- `COMPONENT_VERIFICATION = BLOCKED_PENDING_TARGETED_CORRECTIONS`
- `VERIFIED_FOR_TERRITORY = FALSE`
- `REAL_DRAFT = BLOCKED`

## 7. Release principle

LegalMente now has two distinct release states that must never be collapsed into one boolean:

- **Educational static release:** may be live when its non-PII, non-service, non-individualized technical and editorial gates pass.
- **Sensitive/professional capability release:** remains blocked until its own legal, privacy, security, operational, commercial and human-authorization gates pass.

This separation is the operational source of truth for current release discussions.
