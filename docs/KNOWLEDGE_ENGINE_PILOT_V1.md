# LegalMente — Knowledge Engine Pilot V1

Status: executable pilot / no automatic publication.

## Decision

LegalMente will use a single linked knowledge core with two audience projections rather than separate public and professional knowledge bases.

The architecture separates five questions that must never be collapsed:

1. **What is the knowledge?** Existing world, concept, process and legal-domain bindings.
2. **How deep is it?** The editorial depth spine defined by the Editorial Pyramid Engine.
3. **What legal authority exists?** Canon emitted only by `Psyche-creation` through its versioned Canonical Envelope.
4. **What should happen next?** `resolveNextAction` decides the next safe control or learning/preparation step.
5. **Where should it be expressed?** Public LegalMente, Founder LinkedIn, Web Knowledge or a Product Tool.

## Improvement over the original proposal

The original architecture described `Concept`, `Source` and `Claim` as objects in the same conceptual plan. The pilot intentionally does **not** create a second canonical Source/Claim registry inside `legalmente-web`.

`Psyche-creation` remains the legal authority producer. `legalmente-web` consumes a strict binding and may only consume, adapt and present. It must not approve claims, recompute sources, upgrade jurisdiction, change canonical hashes or open legal gates.

This avoids two competing truths while preserving a fully coded workflow.

## Runtime flow

```text
QUESTION
  → privacy check
  → territory requirement
  → relevant-date requirement
  → canonical Psyche binding
  → source/claim/legal-gate readiness
  → prerequisite concept
  → preparation process
  → linked concept / relation
  → audience-specific adaptation
```

A missing prerequisite is a next action, not a reason to invent an answer.

## Next-action priority

1. `STOP_PRIVACY`
2. `ASK_TERRITORY`
3. `ASK_RELEVANT_DATE`
4. `REQUEST_CANONICAL_BINDING`
5. `REQUEST_SOURCE_REVIEW`
6. `LEARN_CONCEPT`
7. `PREPARE_PROCESS`
8. `EXPLORE_RELATION`
9. `READY_FOR_ADAPTATION`

## Public and professional projections

Both projections keep the same question ID, concept IDs, domain IDs and canonical content ID.

They may differ in:

- voice;
- depth of explanation;
- examples;
- editorial treatment;
- destination surface;
- call to action.

They may **not** change the canonical legal claim.

Public voice: `CLEAR_EDUCATIONAL`.

Professional voice: `PROFESSIONAL_DECISION_ORIENTED`.

Professional-only questions cannot be projected to the public surface.

## Pilot set — contracts and representation

The first 20 questions are intentionally split between mass-useful and professional decision-oriented problems:

1. What to review before signing a contract.
2. What should be clear about price, delivery and responsibilities.
3. Quote vs offer vs contract.
4. Acceptance through WhatsApp.
5. Electronic signature sufficiency.
6. Evidence to preserve around a contract.
7. Who may sign for a company.
8. How to verify representation.
9. What a power is and why scope matters.
10. Representative acting outside authority.
11. Owner vs administrator vs representative.
12. Counterparty review before contracting.
13. Annexes and related documents.
14. Ambiguous service scope.
15. Delay vs breach.
16. Internal contracting-authority matrix.
17. Connecting approvals, signature and accountability.
18. Expected output of counterparty due diligence.
19. Contracting authority across companies in a group.
20. Evidence trail for a corporate authorization chain.

The set reuses the existing LegalMente graph and processes. It does not introduce a parallel legal taxonomy.

## Safety characteristics

- PII/sensitive-looking input stops before territorial or legal work.
- Jurisdiction-sensitive questions require territory.
- Time-sensitive questions require a relevant date.
- No canonical envelope means no web-created legal claim.
- Pending, insufficient or closed canonical states remain blocked.
- Public and professional outputs share legal identity but not necessarily copy.
- No publication is opened by this pilot.

## Success condition for V1

The pilot is successful when all 20 questions:

- resolve only to known graph concepts/processes;
- fail closed when required context or canon is missing;
- preserve the Psyche/legalmente-web authority boundary;
- support public and professional projections without duplicating canonical claims;
- pass repository tests, typecheck, lint and existing public/privacy gates.

## Next expansion after V1

Do not add hundreds of questions immediately. First bind a small subset of these questions to real versioned Psyche envelopes and test the full loop:

`question → context → canon → learning/preparation → public adaptation + professional adaptation → history`.

Only after that should the system add persistent semantic memory and performance learning.