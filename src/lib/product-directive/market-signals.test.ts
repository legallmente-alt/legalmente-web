import assert from "node:assert/strict";
import test from "node:test";

import { DEMO_OPPORTUNITIES } from "@/lib/opportunity-engine";

import { scoreMarketSignals, scoreOpportunityWithMarketSignals } from "./market-signals";

test("market signal scoring distinguishes measured evidence from hypothesis", () => {
  const result = scoreMarketSignals([
    {
      kind: "UTILITY",
      value: 9,
      evidenceClass: "MEASURED_FIRST_PARTY",
      sourceLabel: "first-party analytics",
      note: "Users completed the related preparation route.",
    },
    {
      kind: "VIRALITY",
      value: 8,
      evidenceClass: "QUALITATIVE",
      sourceLabel: "editorial observation",
      note: "Topic repeatedly produces shares and discussion.",
    },
  ]);

  assert.equal(result.confidenceMultiplier, 1);
  assert.ok(result.weightedSignalScore > 0);
  assert.equal(result.warnings.some((warning) => warning.includes("No measured")), false);
});

test("market overlay may change priority but can never open a legal gate", () => {
  const result = scoreOpportunityWithMarketSignals(DEMO_OPPORTUNITIES[0], [
    {
      kind: "MONETIZATION",
      value: 10,
      evidenceClass: "HYPOTHESIS",
      sourceLabel: "founder product hypothesis",
      note: "Potential paid preparation tool; not yet measured.",
    },
    {
      kind: "INTEREST",
      value: 10,
      evidenceClass: "HYPOTHESIS",
      sourceLabel: "founder product hypothesis",
      note: "Expected broad interest; not yet measured.",
    },
  ]);

  assert.equal(result.mayOpenLegalGate, false);
  assert.ok(result.combinedPriority > 0);
  assert.ok(result.warnings.some((warning) => warning.includes("provisional")));
});

test("absence of signals never becomes invented demand", () => {
  const result = scoreMarketSignals([]);
  assert.equal(result.weightedSignalScore, 0);
  assert.ok(result.warnings[0].includes("do not infer"));
});
