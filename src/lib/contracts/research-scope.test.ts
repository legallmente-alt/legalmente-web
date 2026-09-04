import assert from "node:assert/strict";
import test from "node:test";

import {
  canGenerateRealDraft,
  founderApprovedContractResearchScope,
  isPilotAuthorizedForResearch,
} from "./research-scope";

test("founder research scope is Mexico plus exactly four authorized pilots", () => {
  assert.equal(founderApprovedContractResearchScope.territoryCode, "MX");
  assert.equal(founderApprovedContractResearchScope.territoryStatus, "RESEARCH_AUTHORIZED");
  assert.deepEqual(founderApprovedContractResearchScope.pilotIds, [
    "SERVICES_B2B",
    "NDA",
    "SUPPLIER_RELATIONSHIP",
    "SIMPLE_B2B_SALE",
  ]);
});

test("research authorization does not open draft, PII, documents, payments or professional services", () => {
  assert.equal(founderApprovedContractResearchScope.draftStatus, "REAL_DRAFT_BLOCKED");
  assert.equal(founderApprovedContractResearchScope.piiAllowed, false);
  assert.equal(founderApprovedContractResearchScope.realDocumentsAllowed, false);
  assert.equal(founderApprovedContractResearchScope.paymentsAllowed, false);
  assert.equal(founderApprovedContractResearchScope.professionalServiceActivationAllowed, false);
  assert.equal(canGenerateRealDraft(), false);
});

test("unapproved contract types do not inherit research authorization", () => {
  assert.equal(isPilotAuthorizedForResearch("SERVICES_B2B"), true);
  assert.equal(isPilotAuthorizedForResearch("LEASE"), false);
  assert.equal(isPilotAuthorizedForResearch("LOAN"), false);
});
