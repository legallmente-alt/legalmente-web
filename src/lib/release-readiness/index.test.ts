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
  realVisualBatchQaComplete: true,
  reviewedLibraryThresholdSet: true,
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

  it("requires an explicit reviewed-library threshold decision", () => {
    const result = evaluateReleaseReadiness({
      ...ready,
      reviewedLibraryThresholdSet: false,
      minimumReviewedLibraryCount: 0,
    });
    assert.equal(result.status, "BLOCKED");
    assert.ok(result.missing.includes("REVIEWED_LIBRARY_THRESHOLD_SET"));
    assert.ok(!result.missing.some((item) => /^REVIEWED_LIBRARY_\d+_OF_\d+$/.test(item)));
  });

  it("rejects an invalid threshold after it is declared set", () => {
    const result = evaluateReleaseReadiness({ ...ready, minimumReviewedLibraryCount: 0 });
    assert.equal(result.status, "BLOCKED");
    assert.ok(result.missing.includes("MINIMUM_REVIEWED_LIBRARY_COUNT_INVALID"));
  });

  it("requires an actually reviewed initial library", () => {
    const result = evaluateReleaseReadiness({ ...ready, initialReviewedLibraryCount: 7 });
    assert.equal(result.status, "BLOCKED");
    assert.ok(result.missing.includes("REVIEWED_LIBRARY_7_OF_20"));
  });

  it("does not let simulated provider tests stand in for a real rendered QA batch", () => {
    const result = evaluateReleaseReadiness({ ...ready, realVisualBatchQaComplete: false });
    assert.equal(result.status, "BLOCKED");
    assert.ok(result.missing.includes("REAL_VISUAL_BATCH_QA_COMPLETE"));
  });

  it("can become ready only for a human release decision", () => {
    const result = evaluateReleaseReadiness(ready);
    assert.equal(result.status, "READY_FOR_HUMAN_RELEASE_DECISION");
    assert.equal(result.deploymentAuthorized, false);
    assert.equal(result.publicationAuthorized, false);
  });
});
