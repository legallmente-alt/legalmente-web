# LegalMente — Contract Engine P1 Structured Outputs V1

State: `IMPLEMENTED / SYNTHETIC_ONLY / REAL_DRAFT_BLOCKED / CI_GREEN`.

## Purpose

Convert the typed Contract Preparation Record into useful preparation outputs without producing contractual prose or a signable document.

## Implemented outputs

`src/lib/contracts/outputs.ts` produces:

- Contract brief;
- Party map;
- Representation map;
- Obligation matrix;
- Contract timeline events;
- Payment schedule;
- Missing-information list;
- Preparation red flags;
- Professional-review questions;
- Annex checklist state (`NOT_MODELLED_IN_V1`).

## Non-negotiable draft boundary

The output adapter always returns:

- `realDraftAllowed: false`;
- `draftPreview: null`.

This remains true even if upstream technical evaluation could otherwise report draft eligibility. Technical eligibility is not founder authorization to generate a real contract.

## Synthetic demo integration

`src/lib/contracts/demo.ts` contains a non-identifiable fixture used by `/preparar/contrato`.

The prototype surface now reads its example state from the actual output adapter instead of hard-coded status copy. It demonstrates unresolved territory and representation review while receiving no PII, documents, cases or payments.

The previous UI copy suggesting that a structural draft might appear once territorial coverage existed was removed. V1 explicitly excludes a real contractual draft.

## Tests and verification

`src/lib/contracts/outputs.test.ts` covers structured output construction, label resolution, fail-closed red flags, separation of missing information and the real-draft invariant.

Verified CI run: `33247723546`

Tested PR head: `fe6139809d931292970c7a1b28395e7b7e0867a1`

Result: `SUCCESS`.

Passed legal-core, knowledge-safety, contract-core, typecheck, privacy smoke, production build, responsive proof capture, accessibility/interaction smoke and artifact upload.

Proof artifact ID: `9713387532`.

The artifact name contains GitHub's generated PR merge-ref SHA; workflow metadata records the tested PR head above.

## Gates unchanged

`LEGAL_COVERAGE = PENDING`

`COMPONENT_VERIFICATION = BLOCKED_PENDING_TARGETED_CORRECTIONS`

`VERIFIED_FOR_TERRITORY = FALSE`

`REAL_DRAFT = BLOCKED`

`PII = DISABLED`

`PROFESSIONAL_SERVICES = DISABLED`

`MERGE = NOT_AUTHORIZED`

`DEPLOY = NOT_AUTHORIZED`

`PUBLICATION = BLOCKED`
