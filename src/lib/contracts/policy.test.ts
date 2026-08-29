import assert from "node:assert/strict";
import test from "node:test";

import {
  DETAILED_MODE_FIELD_GROUPS,
  evaluateContractTimeline,
  evaluateRepresentationPrecheck,
  getContractModePolicy,
  validateClauseComponent,
} from "./policy";

test("detailed mode expands the same record policy without enabling PII", () => {
  const basic = getContractModePolicy("BASIC");
  const detailed = getContractModePolicy("DETAILED");

  assert.equal(basic.sameContractRecord, true);
  assert.equal(detailed.sameContractRecord, true);
  assert.equal(detailed.realPiiAllowed, false);
  for (const group of DETAILED_MODE_FIELD_GROUPS) {
    assert.equal(detailed.visibleGroups.includes(group), true, group);
    assert.equal(basic.visibleGroups.includes(group), false, group);
  }
});

test("timeline evaluator reports data conflicts without legal conclusions", () => {
  const conflicts = evaluateContractTimeline({
    effectiveDate: null,
    obligationStartDate: "2026-09-10",
    endDate: "2026-09-01",
    renewal: "AUTOMATIC",
    noticePeriodDays: null,
    terminationDate: "2026-08-30",
    terminationEffectsDefined: false,
    obligationIds: ["obl-1"],
    deliveryDates: [{ obligationId: "missing-obl", date: "2026-09-02" }],
    paymentDates: [{ paymentId: "pay-1", date: "2026-09-01", triggerDate: "2026-09-05" }],
    milestones: [{ milestoneId: "ms-1", date: "2026-10-01" }],
  });

  const codes = new Set(conflicts.map((item) => item.code));
  assert.equal(codes.has("EFFECTIVE_DATE_AMBIGUOUS"), true);
  assert.equal(codes.has("END_BEFORE_START"), true);
  assert.equal(codes.has("PAYMENT_BEFORE_TRIGGER"), true);
  assert.equal(codes.has("DELIVERY_WITHOUT_OBLIGATION"), true);
  assert.equal(codes.has("RENEWAL_WITHOUT_NOTICE_RULE"), true);
  assert.equal(codes.has("TERMINATION_WITHOUT_EFFECTS"), true);
});

test("representation precheck never concludes authority sufficiency", () => {
  const result = evaluateRepresentationPrecheck({
    partyType: "LEGAL_ENTITY",
    signerRole: "Representante",
    representationBasis: "POWER",
    instrumentReference: "synthetic-power-ref",
    instrumentDate: "2026-08-01",
    validityIfApplicable: "pending-review",
    authorityScope: ["synthetic-scope"],
    limitations: [],
    specialAuthorityFlags: [],
    territoryCode: "MX",
  });

  assert.equal(result.status, "INFORMATION_COMPLETE");
  assert.equal(result.canConcludeAuthoritySufficient, false);
});

test("representation precheck fails closed when territory or instrument is missing", () => {
  const noTerritory = evaluateRepresentationPrecheck({
    partyType: "LEGAL_ENTITY",
    signerRole: "Representante",
    representationBasis: "POWER",
    instrumentReference: "synthetic-power-ref",
    instrumentDate: "2026-08-01",
    validityIfApplicable: null,
    authorityScope: [],
    limitations: [],
    specialAuthorityFlags: [],
    territoryCode: null,
  });
  assert.equal(noTerritory.status, "TERRITORIAL_REVIEW_REQUIRED");

  const noInstrument = evaluateRepresentationPrecheck({
    partyType: "LEGAL_ENTITY",
    signerRole: "Representante",
    representationBasis: "POWER",
    instrumentReference: null,
    instrumentDate: null,
    validityIfApplicable: null,
    authorityScope: [],
    limitations: [],
    specialAuthorityFlags: [],
    territoryCode: "MX",
  });
  assert.equal(noInstrument.status, "MISSING_DOCUMENT");
});

test("clause components are usable only when metadata and scope are verified", () => {
  const verified = validateClauseComponent(
    {
      clauseId: "clause-synthetic-001",
      purpose: "Synthetic test clause",
      contractTypes: ["SERVICES_B2B"],
      jurisdictionLayer: "TERRITORIAL",
      territory: ["MX"],
      variablesRequired: ["object.summary"],
      legalSourceRefs: ["source-synthetic-001"],
      riskLevel: "LOW",
      compatibleWith: [],
      conflictsWith: [],
      requiresHumanReview: false,
      version: "1.0.0",
      lastVerified: "2026-08-28",
      status: "VERIFIED_FOR_TERRITORY",
    },
    { contractType: "SERVICES_B2B", territoryCode: "MX" },
  );

  assert.equal(verified.validMetadata, true);
  assert.equal(verified.usableForDraftAssembly, true);

  const researchRequired = validateClauseComponent(
    {
      clauseId: "clause-synthetic-002",
      purpose: "Synthetic research clause",
      contractTypes: ["SERVICES_B2B"],
      jurisdictionLayer: "TERRITORIAL",
      territory: ["MX"],
      variablesRequired: [],
      legalSourceRefs: ["source-synthetic-002"],
      riskLevel: "LOW",
      compatibleWith: [],
      conflictsWith: [],
      requiresHumanReview: false,
      version: "0.1.0",
      lastVerified: "2026-08-28",
      status: "RESEARCH_REQUIRED",
    },
    { contractType: "SERVICES_B2B", territoryCode: "MX" },
  );
  assert.equal(researchRequired.validMetadata, true);
  assert.equal(researchRequired.usableForDraftAssembly, false);
});
