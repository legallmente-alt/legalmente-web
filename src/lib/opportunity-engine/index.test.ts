import assert from "node:assert/strict";
import test from "node:test";
import {
  DEMO_OPPORTUNITIES,
  scoreOpportunity,
  selectOpportunityPortfolio,
  validateOpportunity,
  type KnowledgeOpportunity,
} from "./index";

test("all two-agent demo opportunities are structurally valid", () => {
  for (const opportunity of DEMO_OPPORTUNITIES) {
    assert.deepEqual(validateOpportunity(opportunity), [], opportunity.id);
  }
});

test("qualitative opportunity is explicitly confidence-discounted", () => {
  const score = scoreOpportunity(DEMO_OPPORTUNITIES[0]);
  assert.equal(score.confidenceMultiplier, 0.72);
  assert.ok(score.warnings.some((warning) => warning.includes("measured SEO demand")));
});

test("non-measured evidence cannot masquerade as a measured SEO metric", () => {
  const invalid: KnowledgeOpportunity = {
    ...DEMO_OPPORTUNITIES[0],
    id: "LM-OPP-BAD-METRIC",
    evidence: [{
      evidenceClass: "INTERNAL_QUALITATIVE",
      sourceLabel: "demo",
      observedMetric: "monthly_search_volume",
      observedValue: 5000,
      note: "Invented metric should be rejected.",
    }],
  };
  assert.ok(validateOpportunity(invalid).some((error) => error.includes("MEASURED_FIRST_PARTY")));
});

test("portfolio prevents the real-estate demo cluster from hijacking the roadmap", () => {
  const portfolio = selectOpportunityPortfolio(DEMO_OPPORTUNITIES, {
    size: 6,
    maxPerCluster: 2,
    minDistinctPillars: 3,
    requirePublicAndProfessional: true,
  });
  const realEstateCount = portfolio.selected.filter((item) => item.clusterId === "desarrollos-inmobiliarios").length;
  assert.ok(realEstateCount <= 2);
  assert.ok(new Set(portfolio.selected.map((item) => item.pillar)).size >= 3);
  assert.equal(portfolio.warnings.length, 0);
});

test("portfolio includes public and professional paths when required", () => {
  const portfolio = selectOpportunityPortfolio(DEMO_OPPORTUNITIES, {
    size: 5,
    maxPerCluster: 2,
    minDistinctPillars: 3,
    requirePublicAndProfessional: true,
  });
  const hasPublic = portfolio.selected.some((item) => item.audienceScope === "PUBLIC" || item.audienceScope === "BOTH");
  const hasProfessional = portfolio.selected.some((item) => item.audienceScope === "PROFESSIONAL" || item.audienceScope === "BOTH");
  assert.equal(hasPublic, true);
  assert.equal(hasProfessional, true);
});

test("low source readiness produces a research warning rather than publication confidence", () => {
  const permissions = DEMO_OPPORTUNITIES.find((item) => item.id === "LM-OPP-008");
  assert.ok(permissions);
  const score = scoreOpportunity(permissions);
  assert.ok(score.warnings.some((warning) => warning.includes("research before production")));
  assert.ok(score.warnings.some((warning) => warning.includes("jurisdiction")));
});
