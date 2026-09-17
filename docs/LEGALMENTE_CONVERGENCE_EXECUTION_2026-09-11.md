# LegalMente — Convergence Execution — 2026-09-11

Status: `IMPLEMENTATION_CANDIDATE` · `NOT_DEPLOYED` · `NOT_PUBLISHED` · `NO_AUTO_MERGE`

This document turns the Founder-authorized four-point execution into one reversible sequence. It does not create a second canon.

## 1. Technical convergence and authority boundary

LegalMente has three different kinds of truth and they must remain separate:

| Layer | Authority | What it governs |
|---|---|---|
| Legal verification / claims / gates | `contratoslegales848-design/Psyche-creation` | sources, jurisdiction, claim packets, legal gates, canonical legal handoff |
| Product / web / editorial routing | `legallmente-alt/legalmente-web` | public product, navigation, editorial strategy, production policy, launch surfaces |
| Strategy / living memory / production documentation | Google Drive | operational index, human feedback, metrics, visual/editorial playbooks, receipts |

Providers execute generation. They never become an authority layer.

### Existing work to converge, not duplicate

- Psyche PR #34 (`claude/convergencia-superset`) is the legal-authority convergence candidate. It remains a separate legal review/merge decision.
- Web PR #43 defines the living production policy.
- Web PR #45 applies adaptive visual-distance validation on top of #43.
- This branch (`chatgpt/legalmente-convergence-v1`) is based on #45 and absorbs the provider-neutral Visual Factory behavior from historical PR #24 instead of rewriting another generator abstraction.
- Web PR #46 hardens the public legal surface (terms, privacy, disclosure, scope notice, provenance) and remains the launch-surface lane.

### Recommended review order

1. Review Psyche PR #34 as legal authority work. Do not subordinate it to web.
2. Review web PR #43, then #45.
3. Review this convergence branch as the bridge from policy to execution and learning.
4. Reconcile PR #46 onto the accepted web convergence head before any release decision.
5. Only then present a release candidate for explicit Founder authorization.

No step in this sequence authorizes merge or deploy by itself.

## 2. Close the visual execution circuit

The missing link identified in PR #45 was real: the adaptive production validator had no production caller.

This branch adds/reuses:

- `src/lib/visual-factory/index.ts`: provider-neutral generation routing and QA state machine, absorbed from the existing Visual Factory work rather than reinvented.
- `src/lib/production-runtime/index.ts`: end-to-end boundary:

```text
PRODUCTION POLICY
→ CONTENT/VISUAL BINDING
→ LEGAL STATE
→ PROVIDER ROUTE
→ GENERATE BASE/COMPOSITE ASSET
→ IMAGE_READY_FOR_QA
```

The runtime is atomic before provider calls: a policy failure, visual drift or legal HOLD prevents every provider call. Generation never sets `PUBLISHED` and never authorizes publication.

A real provider can be connected only through `ImageGeneratorAdapter`; the branch does not embed vendor credentials or a vendor-specific SDK.

## 3. Metrics become memory, not authority

`src/lib/production-learning/index.ts` separates two inputs that had been conflated conceptually:

- human curation (`GENERATED`, `PRESELECTED`, `APPROVED`, `PUBLISHED`, `DISCARDED`);
- audience performance (reach, views, interactions, shares, saves).

Performance can add rates and ranking evidence to memory. It cannot promote a curation state, change a legal state, open a gate or authorize publication.

Missing metrics remain `null`; they are never interpreted as zero. Shares/saves are useful optimization signals, not proof of legal correctness or causal performance.

This is the code-level bridge required to convert the 2026-09-11 Instagram audit into machine-readable learning without teaching the system to chase engagement at the expense of truth.

## 4. Minimum real launch preparation

The public product already contains the existing `/antes-de-firmar` educational tool on `main`. PR #46 supplies the missing public legal surface and provenance hardening.

This branch adds `src/lib/release-readiness/index.ts`, a fail-closed preparation gate. A minimum launch package must prove:

- public terms;
- privacy;
- disclosure;
- educational-scope notice;
- source / territory / date / limit contract;
- asset provenance register;
- accessibility contract;
- human review contract;
- production runtime connected;
- performance learning connected;
- a minimum reviewed initial library;
- at least one useful bounded tool ready.

Even when all conditions are true, the only possible result is `READY_FOR_HUMAN_RELEASE_DECISION`. `deploymentAuthorized` and `publicationAuthorized` remain `false`.

## CI / mechanical proof

The convergence gate is:

```bash
npm run test:convergence
npm run typecheck
npm run lint
```

`Production policy CI` is expanded to cover production policy, Visual Factory, production learning, production runtime and release readiness.

A green CI proves code contracts only. It does not prove image quality, source validity, audience causality, human approval, deploy readiness or publication authorization.

## What remains human / external

- Review and decision on Psyche PR #34.
- Review and sequence of web PRs #43, #45 and #46 plus this convergence branch.
- Connection of an authorized real image provider and inspection of rendered assets.
- Human visual QA and Founder curation.
- Minimum reviewed content-library threshold decision.
- Final release/deploy authorization.

## Rollback

This branch is additive and stacked on PR #45. Rollback is branch deletion or commit reversion; it does not require modifying `main`, Drive or Psyche. No historical PR is deleted or force-pushed.
