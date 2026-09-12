import assert from "node:assert/strict";
import test from "node:test";

import {
  continuityFingerprintKey,
  validateContinuityRule,
} from "./continuity-rule";

test("continuity rule passes only with an explicit complete chain", () => {
  const result = validateContinuityRule({
    contentId: "LM-TEST-001",
    claimIds: ["CL-001"],
    sourceIds: ["SRC-001"],
    state: "READY_FOR_PRODUCT",
    authority: "CONDITIONAL",
    humanLife: "A person is deciding whether to sign.",
    observableConduct: "They review and compare terms.",
    relation: "Potential contracting parties.",
    object: "A proposed exchange of obligations.",
    time: "Before signature.",
    evidence: "Draft, messages and payment terms.",
    territory: "Explicit upstream territory.",
    rule: "Bound upstream source-backed rule.",
    scope: "Conditional educational explanation.",
    limit: "No validity conclusion for a concrete document.",
    question: "What still needs verification before acting?",
    prudentAction: "Verify the unresolved point before proceeding.",
  });

  assert.equal(result.ok, true);
  assert.equal(result.state, "READY_FOR_CONTINUATION");
  assert.deepEqual(result.missing, []);
});

test("continuity rule fails closed on unknown or missing links", () => {
  const result = validateContinuityRule({
    contentId: "LM-TEST-002",
    claimIds: ["CL-002"],
    sourceIds: ["SRC-002"],
    state: "UNKNOWN",
    authority: "UNKNOWN",
    humanLife: "A person has a legal question.",
  });

  assert.equal(result.ok, false);
  assert.equal(result.state, "HOLD");
  assert.ok(result.missing.includes("observableConduct"));
  assert.ok(result.issues.some((issue) => issue.includes("UNKNOWN")));
});

test("visual continuity fingerprint is deterministic and provider-neutral", () => {
  const key = continuityFingerprintKey({
    world: "Vida cotidiana",
    legalDomain: "Contracts",
    concept: "Consent",
    visualSchool: "Editorial photography",
    scenario: "Transit station",
    revelation: "Two paths diverge",
    framing: "Wide low angle",
    humanPresence: "Two adults",
    brandObject: "Brass luggage tag",
    dominantPalette: "Petroleum blue",
  });

  assert.equal(
    key,
    "vida cotidiana::contracts::consent::editorial photography::transit station::two paths diverge::wide low angle::two adults::brass luggage tag::petroleum blue",
  );
});
