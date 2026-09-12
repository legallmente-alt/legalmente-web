import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evaluateReleaseReadiness } from "./index";

const ready = {
  publicTermsPresent: true,
  publicPrivacyPresent: true,
  publicDisclosurePresent: true,
  educationalScopeNoticePresent: true,
  sourceTerritoryDateLimitContractPresent: true,
  assetProvenanceRegisterPresent: true,
  accessibilityContractPresent: true,
  humanReviewContractPresent: true,
  productionRuntimeConnected: true,
  performanceLearningConnected: true,
  initialReviewedLibraryCount: 20,
  minimumReviewedLibraryCount: 20,
  firstUsefulToolReady: true,
} as const;

describe("release readiness", () => {
  it("fails closed when a public legal surface is missing", () => {
    const result = evaluateReleaseReadiness({ ...ready, publicPrivacyPresent: false });
    assert.equal(result.status, "BLOCKED");
    assert.ok(result.missing.includes("PUBLIC_PRIVACY"));
  });

  it("requires an actually reviewed initial library", () => {
    const result = evaluateReleaseReadiness({ ...ready, initialReviewedLibraryCount: 7 });
    assert.equal(result.status, "BLOCKED");
    assert.ok(result.missing.includes("REVIEWED_LIBRARY_7_OF_20"));
  });

  it("can become ready only for a human release decision", () => {
    const result = evaluateReleaseReadiness(ready);
    assert.equal(result.status, "READY_FOR_HUMAN_RELEASE_DECISION");
    assert.equal(result.deploymentAuthorized, false);
    assert.equal(result.publicationAuthorized, false);
  });
});
