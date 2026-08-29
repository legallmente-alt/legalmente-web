import assert from "node:assert/strict";
import test from "node:test";

import {
  contractEscalationRules,
  getContractEscalationRule,
} from "./escalation";

test("contract escalation matrix contains the eight product states from the closed spec", () => {
  assert.deepEqual(
    contractEscalationRules.map((rule) => rule.code),
    [
      "MISSING_INPUT",
      "TERRITORIAL_RESEARCH_REQUIRED",
      "POWER_REVIEW_REQUIRED",
      "CLAUSE_VERIFICATION_REQUIRED",
      "PROFESSIONAL_REVIEW_REQUIRED",
      "CONFLICT_REQUIRES_RESOLUTION",
      "PII_DISABLED",
      "DRAFT_ELIGIBLE",
    ],
  );
});

test("every escalation state keeps real draft generation blocked in the current founder-approved V1", () => {
  for (const rule of contractEscalationRules) {
    assert.equal(rule.blocksRealDraft, true, rule.code);
    assert.ok(rule.message.trim().length > 0, rule.code);
    assert.ok(rule.nextStep.trim().length > 0, rule.code);
  }
});

test("draft eligible explicitly does not mean ready to sign", () => {
  const rule = getContractEscalationRule("DRAFT_ELIGIBLE");
  assert.match(rule.message.toLowerCase(), /no significa listo para firmar/);
  assert.equal(rule.blocksRealDraft, true);
});
