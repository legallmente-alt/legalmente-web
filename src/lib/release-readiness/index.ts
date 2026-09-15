export type ReleaseReadinessInput = {
  publicTermsPresent: boolean;
  publicPrivacyPresent: boolean;
  publicDisclosurePresent: boolean;
  educationalScopeNoticePresent: boolean;
  sourceTerritoryDateLimitContractPresent: boolean;
  assetProvenanceRegisterPresent: boolean;
  accessibilityContractPresent: boolean;
  humanReviewContractPresent: boolean;
  productionRuntimeConnected: boolean;
  performanceLearningConnected: boolean;
  realVisualBatchQaComplete: boolean;
  initialReviewedLibraryCount: number;
  minimumReviewedLibraryCount: number;
  firstUsefulToolReady: boolean;
};

export type ReleaseReadinessResult = {
  status: "BLOCKED" | "READY_FOR_HUMAN_RELEASE_DECISION";
  missing: readonly string[];
  deploymentAuthorized: false;
  publicationAuthorized: false;
};

/**
 * This is a preparation gate, never a deploy gate. Passing it means the
 * minimum launch package can be presented for a human release decision.
 * A simulated provider/test double cannot satisfy realVisualBatchQaComplete.
 */
export function evaluateReleaseReadiness(input: ReleaseReadinessInput): ReleaseReadinessResult {
  const missing: string[] = [];
  const checks: readonly [boolean, string][] = [
    [input.publicTermsPresent, "PUBLIC_TERMS"],
    [input.publicPrivacyPresent, "PUBLIC_PRIVACY"],
    [input.publicDisclosurePresent, "PUBLIC_DISCLOSURE"],
    [input.educationalScopeNoticePresent, "EDUCATIONAL_SCOPE_NOTICE"],
    [input.sourceTerritoryDateLimitContractPresent, "SOURCE_TERRITORY_DATE_LIMIT_CONTRACT"],
    [input.assetProvenanceRegisterPresent, "ASSET_PROVENANCE_REGISTER"],
    [input.accessibilityContractPresent, "ACCESSIBILITY_CONTRACT"],
    [input.humanReviewContractPresent, "HUMAN_REVIEW_CONTRACT"],
    [input.productionRuntimeConnected, "PRODUCTION_RUNTIME_CONNECTED"],
    [input.performanceLearningConnected, "PERFORMANCE_LEARNING_CONNECTED"],
    [input.realVisualBatchQaComplete, "REAL_VISUAL_BATCH_QA_COMPLETE"],
    [input.firstUsefulToolReady, "FIRST_USEFUL_TOOL_READY"],
  ];
  for (const [ok, code] of checks) if (!ok) missing.push(code);

  if (!Number.isInteger(input.initialReviewedLibraryCount) || input.initialReviewedLibraryCount < 0) {
    missing.push("INITIAL_REVIEWED_LIBRARY_COUNT_INVALID");
  } else if (input.initialReviewedLibraryCount < input.minimumReviewedLibraryCount) {
    missing.push(`REVIEWED_LIBRARY_${input.initialReviewedLibraryCount}_OF_${input.minimumReviewedLibraryCount}`);
  }

  return {
    status: missing.length === 0 ? "READY_FOR_HUMAN_RELEASE_DECISION" : "BLOCKED",
    missing,
    deploymentAuthorized: false,
    publicationAuthorized: false,
  };
}

export const RELEASE_INVARIANTS = Object.freeze({
  readinessNeverDeploys: true,
  readinessNeverPublishes: true,
  legalAndPrivacySurfaceRequired: true,
  reviewedContentRequired: true,
  usefulToolRequired: true,
  accessibilityRequired: true,
  provenanceRequired: true,
  realVisualQaCannotBeReplacedBySimulatedProviderTests: true,
});
