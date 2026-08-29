# LegalMente — Contract Engine P1 Structured Outputs V1

State: `IMPLEMENTED / SYNTHETIC_ONLY / REAL_DRAFT_BLOCKED / CI_GREEN`.

The typed Contract Preparation Record now produces structured preparation outputs through `src/lib/contracts/outputs.ts`: contract brief, party map, representation map, obligation matrix, timeline, payment schedule, missing information, preparation red flags, professional-review questions, and an explicit annex gap (`NOT_MODELLED_IN_V1`).

The adapter invariant for this V1 scope is `realDraftAllowed: false` and `draftPreview: null`, even if upstream technical evaluation reports eligibility. Technical eligibility is not authorization to generate a real contract.

`src/lib/contracts/demo.ts` provides a non-identifiable fixture for `/preparar/contrato`. The surface reads actual adapter outputs, remains territorially unresolved/fail-closed, and no longer suggests that territorial coverage alone would unlock a draft.

`src/lib/contracts/outputs.test.ts` covers structured output construction, label resolution, fail-closed red flags, missing-information separation and the real-draft invariant.

Verified runtime CI: run `33247723546`, tested PR head `fe6139809d931292970c7a1b28395e7b7e0867a1`, result `SUCCESS`. Legal-core, knowledge-safety, contract-core, typecheck, privacy smoke, build, responsive proof and accessibility/interaction smoke all passed. Proof artifact ID: `9713387532`.

Later documentation-only commits do not change that verified runtime.

Gates remain unchanged: `LEGAL_COVERAGE=PENDING`, `COMPONENT_VERIFICATION=BLOCKED_PENDING_TARGETED_CORRECTIONS`, `VERIFIED_FOR_TERRITORY=FALSE`, `REAL_DRAFT=BLOCKED`, `PII=DISABLED`, `PROFESSIONAL_SERVICES=DISABLED`, `MERGE=NOT_AUTHORIZED`, `DEPLOY=NOT_AUTHORIZED`, `PUBLICATION=BLOCKED`.
