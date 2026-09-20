# Protocol reconciliation — 2026-09-20
Drive remains editorial authority. This branch targets the existing PR #49 integration branch, never main.
Sources:
- Gateway: https://docs.google.com/document/d/1Aby_uhs_cuHJCsszKbyveN13qFzbG9gMSLzEoELRabA/edit
- Art contract: https://docs.google.com/document/d/1lRWHheyLHuTbPC6oTi3QESHquc45vWQ4v4qgyBsGEYE/edit
- Memory: https://drive.google.com/file/d/1ISuXre1tVsSPNC3b6Tzjz-eAiOmv1FFr/view

Implemented: general digital maximum one unless requested; domain breadth preference with concentration cap retained; ENTREGADO as short-term memory distinct from approval.
Preserved: LinkedIn medium coherence and carousel continuity already implemented in #49. The initial audit inspected #43 for that point; its global style restriction is already superseded on #49.
Validation: 21 focused Node tests passed locally using Node 24 type stripping; no full integration/CI success claimed.
Drive: 18 targeted corrections across gateway, v4, index v18 and protocol v3. No historical artifacts deleted.

Remaining Psyche work (read access only verified; NOT implemented here):
- visual_fingerprint_batch.py: align seven media and ten principal directions for independent general/specific-domain batches; channel/carousel exceptions explicit.
- banco_maestro.py: consume an explicit versioned export of canonical Drive memory; record source ID/revision/time and reject stale or absent memory before claiming novelty.
- distinguish candidate/prompt delivery from image delivery; do not equate automatic selection with showing an image.
- safe_zone.py remains textual preflight. Actual image and central crop QA still required.
- retain physical brand integration through final compositor inspection.
No imagery was generated or visually accepted in this reconciliation.
No merge, deployment or publication authorization.
Rollback: revert this branch's commits; restore individual Drive replacements through document version history.
