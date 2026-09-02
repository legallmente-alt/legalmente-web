# LegalMente — Revenue and Content Sprint V1

**Scope:** 30-day preparation for revenue experiments through LegalMente and Raymundo Acevedo Martínez on LinkedIn.  
**Publication state:** `NOT_PUBLISHED`.  
**Automation state:** `NO_AUTO_SEND`, `NO_AUTO_CHARGE`, `NO_PII`.

## Objective

Turn LegalMente into a trust and education asset connected to one or two clearly bounded human-delivered offers. Do not assume that traffic, images, followers, or a new feature will create revenue within 30 days. The system must help the owner explain, package and sell a real service without making legal conclusions, collecting sensitive information or automating commitments.

## Two-channel architecture

| Channel | Job | Content style | Conversion action |
|---|---|---|---|
| LegalMente | Explain the method and build trust | Human conduct → concept → source → territory → limit → next question | Request an educational session or workshop |
| Raymundo Acevedo Martínez / LinkedIn | Establish professional authority and start conversations | One idea, one example, one boundary, one question | Direct message or scheduled conversation handled by a human |

The channels are related but not identical. LegalMente is the system and educational identity; LinkedIn is the person-led distribution and conversation channel.

## Initial offers

Use one offer at a time until there is evidence of demand. Suggested bounded offers are: a 45-minute session to organize questions before accepting an agreement; a 60-minute session to turn a complex legal topic into a source-bound educational structure; or a 60–75-minute workshop for a small team or creator group. Each offer must state what it includes, what it does not include, the delivery date, the fee, the payment condition and the handoff to a qualified professional when a legal opinion or representation is required.

Do not claim to determine validity, guarantee an outcome, replace legal advice or resolve an individual case. If the owner is not authorized to provide legal services in a jurisdiction, describe the offers as education, organization and communication, not legal advice.

## Content formula

The current graph is strong for navigation but lacks a formal depth layer. Claude Code must add a typed internal contract, not a second frontend:

```text
HUMAN_CONDUCT
→ HUMAN_QUESTION
→ LEGAL_OBJECT
→ CONCEPT_GRAPH
→ DEPTH_BAND
→ LEGAL_SPECIFICITY
→ EVIDENCE_BURDEN
→ TERRITORIAL_SCOPE
→ NARRATIVE_MODE
→ FORMAT_FIT
→ CLAIM_BINDING
→ VISUAL_SEMANTICS
→ CONTENT_FINGERPRINT
→ VISUAL_FINGERPRINT
→ QA
```

Required depth bands:

| Band | Use |
|---|---|
| `D0_ENTRY` | Everyday question and one initial distinction |
| `D1_GUIDED` | Practical explanation with a small concept set and next question |
| `D2_MECHANISM` | Subjects, act, obligation, condition and possible consequence |
| `D3_PROCESS_EVIDENCE` | Facts, chronology, evidence, gaps, procedure and territory |
| `D4_COMPARATIVE` | Comparison across territories, periods or institutions with non-equivalence warnings |
| `D5_COMPLEX_BOUNDARY` | Developed topic with branches, exceptions, uncertainty and professional-review route |

Required narrative modes are `QUESTION_LED`, `SCENARIO_LED`, `CONTRAST`, `PROCESS_TRACE`, `EVIDENCE_TRACE`, `HISTORY_COMPARISON`, `MYTH_VS_RULE` and `DECISION_TREE`.

## Complexity budget

Every composition must record `conceptCount`, `edgeCount`, `sourceCount`, `territoryCount`, `evidenceCount`, `exceptionCount`, `uncertaintyCount` and `formatCapacity`. If the selected format cannot carry the budget, the selector must return `HOLD_FORMAT_CAPACITY`; it must not silently delete relationships or flatten a developed topic into a slogan.

## Variety rules

Keep the existing visual rotation engine, but add a separate content fingerprint:

```text
CONTENT_FINGERPRINT = hash(world, legalObject, conceptIds, edgeKinds, depth, narrativeMode, formatId, territoryScope)
VISUAL_FINGERPRINT = hash(world, legalDomain, concept, visualSchool, scenario, revelation, framing, humanPresence, brandObject, dominantPalette)
```

Penalize repeated concept roots, process routes, CTA structures, slide architectures, depth bands and narrative modes. Unknown values never count as diversity. If historical coverage is insufficient, return `HOLD_INSUFFICIENT_VARIETY`.

## Claude Code implementation order

First add the contract and deterministic tests. Then add depth-band fixtures for one simple topic, one mechanism topic and one developed process/evidence topic. Then add content fingerprint and variety scoring. Only after these tests pass may the selector be connected to the existing visual rotation engine. Do not generate images, change claims, activate sources, add payments, add a database, collect PII, publish, deploy or merge automatically.

Required tests include: `D0` versus `D3` distinction; format capacity blocking; semantic repetition penalty despite different images; territorial comparison blocking without bound sources; unknown values not counting as variety; public runtime not importing internal composition contracts; and preservation of `NOT_PUBLISHED`.

## 30-day publishing preparation

Prepare, but do not auto-send, eight LinkedIn drafts: the question before the answer; a contract beyond the signature; simple-to-complex legal explanation; the sale as a system; evidence versus possession of a document; territorial variation; the LegalMente method; and an invitation to a bounded pilot conversation. Each draft must contain one idea, one practical example, one limit and one human CTA.

Prepare one LegalMente landing-page draft for the chosen offer. It must show: audience, problem, deliverable, duration, fee, exclusions, privacy boundary, contact method and human review. It must not contain a checkout, automatic legal intake, upload field, legal conclusion or unverified country claim.

## Gates

```text
CONTENT_DEPTH_PASS
FORMAT_CAPACITY_PASS
CONTENT_VARIETY_PASS
VISUAL_VARIETY_PASS
SOURCE_BINDING_PASS
TERRITORY_PASS
LIMITS_PASS
NO_PII_PASS
NO_AUTO_SEND_PASS
NOT_PUBLISHED
```

Any missing source, territory, limit, exact copy, capacity or human approval produces `HOLD`.
