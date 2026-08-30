# Wave 01A — Integration QA Closure Evidence

**Receipt:** `INTEGRATION_QA_WAVE01A_013_031_2026-08-30`

**Execution environment:** local Next.js development server with `LEGALMENTE_WAVE01A_INTEGRATION_PREVIEW=1`, browser QA at `http://127.0.0.1:3001`.

**Routes and viewports:** `/proceso/leer-antes-de-aceptar` and `/proceso/organizar-hechos-y-prueba`, each tested at desktop 1440×1000 and mobile 390×844.

| # | Check | LM-PC-013 | LM-PC-031 | Result |
|---:|---|---|---|---|
| 1 | Unit appears only on its authorized route | LM-PC-013 only | LM-PC-031 only | PASS |
| 2 | No cross-binding | No LM-PC-031 | No LM-PC-013 | PASS |
| 3 | Exact claims | `LM-PC-013-CL-01`, `LM-PC-013-CL-02` | `LM-PC-031-CL-01`, `LM-PC-031-CL-02` | PASS |
| 4 | Source and articles | CCF arts. 1794, 1824 | LFT arts. 20–21, 25 | PASS |
| 5 | Territory | México | México | PASS |
| 6 | Qualifier visible and correct | Visible; no validity/conclusion claim | Visible; no automatic labor conclusion | PASS |
| 7 | Educational copy complete and selectable | Rendered text; no form control | Rendered text; no form control | PASS |
| 8 | Correct visual asset | Wave preview asset for LM-PC-013 | Wave preview asset for LM-PC-031 | PASS |
| 9 | Correct alt text | Literal scene description | Literal scene description | PASS |
| 10 | Previous/next learning | Both visible and exact | Both visible and exact | PASS |
| 11 | Official source link | Official Diputados CCF PDF | Official Diputados LFT PDF | PASS |
| 12 | No PII/documents/names/free text requested | 0 input/textarea | 0 input/textarea | PASS |
| 13 | No individual advice or case conclusion | Explicit educational boundary | Explicit educational boundary | PASS |
| 14 | Responsive desktop/mobile | No horizontal overflow | No horizontal overflow | PASS |
| 15 | Basic accessibility and keyboard navigation | 1 main/footer; named controls; Tab focus | 1 main/footer; named controls; Tab focus | PASS |
| 16 | Console errors | 0 | 0 | PASS |
| 17 | No regressions in existing public routes | HTTP 200 | HTTP 200 | PASS |
| 18 | LM-PC-031 process is educational, not labor source | Explicitly stated | Explicitly stated | PASS |
| 19 | No automatic labor proof claim | Explicitly not asserted | Explicitly not asserted | PASS |
| 20 | LM-PC-013 no validity/nullity/enforceability assertion | Explicitly disclaimed | N/A | PASS |
| 21 | LM-PC-065 absent from public reviewed routes | Absent | Absent; no candidate route | PASS |
| 22 | Publication remains NOT_PUBLIC | Preserved | Preserved | PASS |

## Technical invariants

The Wave 01A tests and package validator now fail closed if either unit is mapped to the other unit’s route, if LM-PC-065 receives a public route, if `INTEGRATION_QA_STATE=PASS` changes `PUBLICATION_STATE`, if `organizar-hechos-y-prueba` becomes a labor source, or if any technical PASS automatically enables publication.

`INTEGRATION_QA_STATE=PASS` is a technical QA result only. It is separate from visual provenance, human authorization, current integration state and publication state. No human publication decision was requested or recorded by this QA closure.
