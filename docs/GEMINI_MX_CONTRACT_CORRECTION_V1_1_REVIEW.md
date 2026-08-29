# LegalMente — Review of Gemini Mexico Contract Correction V1.1

State: `ACCEPTED_WITH_MATERIAL_REMAINING_CORRECTIONS / COMPONENT_VERIFICATION_STILL_BLOCKED / REAL_DRAFT_BLOCKED / NO_PII / NO_MERGE / NO_DEPLOY / NO_PUBLICATION`.

This review records the code-owner/legal-research QA of Gemini's `MEXICO_CONTRACT_LEGAL_RESEARCH_CORRECTION_PASS_V1.1`. It does not approve Mexico legal coverage and does not promote any component to `VERIFIED_FOR_TERRITORY`.

## What V1.1 fixed successfully

1. Corrected the gross LFPPI chapter-number error by moving trade-secret research away from arts. 245–256 and into the current Title Three beginning at art. 163.
2. Removed LFPC art. 10 Bis as the basis for B2B/consumer crossover and rebound the issue to art. 2(I) plus the limited arts. 99/117 pathway.
3. Removed the automatic rule `B2B = mercantile` and introduced a fail-closed mercantility classification step.
4. Removed `FIX` as a hard-coded statutory rule from Ley Monetaria art. 8; the operational USD rate must be bound separately to current Banco de México rules.
5. Corrected the LFDA five-year default term binding to art. 33.
6. Rebound the privacy discussion to the 2025 LFPDPPP and separated statutory `transferencia` from regulatory `remisión` terminology.
7. Removed physical presence at client premises as an automatic REPSE trigger.
8. Reclassified framework agreement + purchase order as a product/model option rather than a universal legal rule.
9. Correctly marked the contractual modifiability of CCom art. 383 periods as unresolved/research-required.

## Material remaining errors / gaps

### 1. Trade-secret article mapping is still materially wrong

The current LFPPI (last reform DOF 03-04-2026) maps the relevant provisions as follows:

- art. 163: definition of `secreto industrial`, media in which it may exist, statutory exclusions/public-domain carve-outs, and definition of misappropriation;
- art. 164: conduct that is **not** misappropriation (independent discovery, lawful observation/testing, lawful acquisition);
- art. 165: transmission/authorized use of a trade secret and confidentiality clauses in technical-knowledge agreements;
- art. 166: duty not to disclose for persons who gain access through work, profession or business relationship after being warned of confidentiality;
- art. 167: responsibility connected to hiring/engaging persons to obtain another's trade secrets and other illicit acquisition;
- art. 168: regulatory-data protection for certain pharma/agrochemical information;
- art. 169: confidentiality protections in judicial/administrative proceedings.

Gemini V1.1 still states in the source register that art. 164 supports material fixation/marking and shifts other functions across 165–168. That binding is incorrect.

More importantly, the current statutory text does **not** establish a universal `marcaje expreso` requirement as represented in V1.1. The core statutory requirement is that the person controlling the secret adopt sufficient means/systems to preserve confidentiality and restricted access. Therefore any component or human-review packet that treats express marking as a statutory condition must be corrected.

Result: `COMP-MX-CONF-STANDALONE-01` and `COMP-MX-CONF-OPER-01` remain `MORE_RESEARCH_REQUIRED_BEFORE_COMPONENT_VERIFICATION` until their exact legal function and evidence bindings are corrected.

### 2. Source-register reform metadata remains unreliable

Gemini V1.1 lists LFPC last reform as `30-12-2025`; the current Cámara de Diputados PDF consulted by the code owner states `Última Reforma DOF 12-12-2025`. Other current Congressional indexes/pages can carry different update metadata, so last-reform fields must be reconciled to the actual current official text / DOF decree before being treated as canonical metadata.

The same caution applies to Código de Comercio metadata: current Congressional sources/indexes observed during review were not internally consistent about the displayed latest-reform date. Do not use `LAST_REFORM` operationally until reconciled to the current DOF publication trail.

### 3. USD foreign-currency operational rule needs a currency-specific adapter

Ley Monetaria art. 8 correctly delegates the applicable rate to Banco de México rules. Banco de México currently states that the published rate used to solvent **USD** obligations payable in Mexico is the rate generated under Title Three, Chapter V of Circular 3/2012 and exposed as the FIX series for that purpose. This does not justify a universal `FIX` rule for every foreign currency.

Implementation consequence: keep the legal rule generic and, if an operational USD rate is later implemented, use a source-bound Banxico USD adapter with date semantics and no silent fallback.

### 4. Services B2B remains too broad for CCF 2606

The authorized pilot is `prestación de servicios B2B`, but CCF art. 2606 is specifically part of the professional-services framework. The product must distinguish professional services from other service families (e.g. supply/operations/software/maintenance/logistics/agency/commission) before territorial legal components can be verified.

The V1.1 mercantility test is directionally useful and art. 1050 correctly addresses mixed civil/commercial character between parties, but it does not by itself solve the service-type taxonomy.

Result: `COMP-MX-OBJ-SERV-01 = MORE_RESEARCH_REQUIRED` remains correct.

### 5. LFPDPPP rebinding is materially improved but regulatory continuity should be explicit

The current 2025 LFPDPPP defines `persona encargada`, `responsable`, `tercero`, `tratamiento` and `transferencia` in art. 2, and regulates transfers in arts. 35–36. The older Reglamento remains published in the Cámara de Diputados regulations collection, but any use of its `remisión` terminology must be clearly marked as regulatory, subordinate, and subject to harmonization with the 2025 statute and subsequent regulatory updates.

### 6. CCom art. 383 remains research-required for contractual modification

The current text provides the five-day quality/quantity claim period and thirty-day internal-defect claim period. It does not itself state that those periods can be contractually expanded or waived. `COMP-MX-INSPECT-REJECT-01 = MORE_RESEARCH_REQUIRED` is therefore the correct state.

## Accepted component states after V1.1 review

These statuses are research/governance states only, not legal coverage approval:

- `COMP-MX-PARTIES-01` — `CANDIDATE_FOR_VERIFICATION`
- `COMP-MX-REP-ORG-01` — `CANDIDATE_FOR_VERIFICATION`
- `COMP-MX-REP-VOL-01` — `PROFESSIONAL_ONLY`
- `COMP-MX-OBJ-SERV-01` — `MORE_RESEARCH_REQUIRED`
- `COMP-MX-OBJ-SALE-01` — `CANDIDATE_FOR_VERIFICATION`
- `COMP-MX-PRICE-01` — `CANDIDATE_FOR_VERIFICATION` with currency-adapter guardrail
- `COMP-MX-PAYMENT-TERM-01` — `CANDIDATE_FOR_VERIFICATION` subject to exact payment/CFDI claim review
- `COMP-MX-DELIV-SALE-01` — `CANDIDATE_FOR_VERIFICATION`
- `COMP-MX-DELIV-SERV-01` — `CANDIDATE_FOR_VERIFICATION`
- `COMP-MX-INSPECT-REJECT-01` — `MORE_RESEARCH_REQUIRED`
- `COMP-MX-CONF-STANDALONE-01` — `MORE_RESEARCH_REQUIRED_BEFORE_COMPONENT_VERIFICATION`
- `COMP-MX-CONF-OPER-01` — `MORE_RESEARCH_REQUIRED_BEFORE_COMPONENT_VERIFICATION`
- `COMP-MX-IP-SERV-01` — `PROFESSIONAL_ONLY`
- `COMP-MX-LABOR-IND-01` — `PROFESSIONAL_ONLY`
- `COMP-MX-TERM-01` — `CANDIDATE_FOR_VERIFICATION`

Any later components in the correction packet not explicitly reviewed here remain at their prior fail-closed state.

## Pilot state after V1.1

- **B2B services:** `MORE_RESEARCH_REQUIRED_BEFORE_COMPONENT_VERIFICATION` (service taxonomy + labor/REPSE + territorial civil/commercial classification).
- **NDA/confidentiality:** `RETURN_REQUIRED_FOR_EXACT_LFPPI_REBINDING` (persistent article/function and marking errors).
- **Supplier:** `MORE_RESEARCH_REQUIRED_BEFORE_COMPONENT_VERIFICATION` (supplier architecture + art. 383 issue + B2B/consumer crossover).
- **Simple B2B sale:** `RESEARCH_BASE_ACCEPTED / COMPONENT_VERIFICATION_PENDING_TARGETED_REVIEW`.

## Gate state

- `MEXICO_RESEARCH = AUTHORIZED`
- `FOUR_PILOTS_RESEARCH = AUTHORIZED`
- `LEGAL_COVERAGE = PENDING`
- `COMPONENT_VERIFICATION = BLOCKED_PENDING_TARGETED_CORRECTIONS`
- `VERIFIED_FOR_TERRITORY = FALSE`
- `REAL_DRAFT = BLOCKED`
- `PII = DISABLED`
- `PROFESSIONAL_SERVICES = DISABLED`
- `MERGE = NOT_AUTHORIZED`
- `DEPLOY = NOT_AUTHORIZED`
- `PUBLICATION = BLOCKED`

## Next legal task

Do **not** regenerate the full research pack. Perform one narrow correction/verification pass limited to:

1. exact LFPPI 163–169 function map and removal of false universal marking requirement;
2. exact official reform metadata reconciliation for sources that will become evidence records;
3. B2B services taxonomy before applying CCF 2606;
4. currency-specific Banxico adapter boundary for USD vs other currencies;
5. CCom art. 383 dispositive/imperative research;
6. confirm payment/CFDI statements before component verification.

No component may be promoted to `VERIFIED_FOR_TERRITORY` from this review alone.
