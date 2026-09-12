import type { CurationState, ProductionHistoryItem, ProductionPiece } from "@/lib/production-policy";

export type PerformanceObservation = {
  contentId: string;
  channel: string;
  observedAt: string;
  reach: number | null;
  views: number | null;
  interactions: number | null;
  shares: number | null;
  saves: number | null;
  sourceRef: string;
};

export type RawPerformanceObservation = Omit<PerformanceObservation, "contentId"> & {
  contentId: string | null;
  externalContentRef: string;
};

export type HumanCurationSignal = {
  contentId: string;
  state: CurationState;
  recordedAt: string;
  sourceRef: string;
};

export type PerformanceSignal = {
  contentId: string;
  utilityActions: number | null;
  utilityRateByReach: number | null;
  shareRateByReach: number | null;
  saveRateByReach: number | null;
  hasMeasuredReach: boolean;
  warnings: readonly string[];
};

export type LearningMemoryItem = ProductionHistoryItem & {
  performance?: PerformanceSignal;
  evidence: {
    curationSourceRef: string;
    performanceSourceRef?: string;
  };
};

export type PerformanceMappingPartition = {
  mapped: readonly PerformanceObservation[];
  unmapped: readonly RawPerformanceObservation[];
};

function finiteNonNegative(value: number | null): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function rate(numerator: number | null, denominator: number | null): number | null {
  if (!finiteNonNegative(numerator) || !finiteNonNegative(denominator) || denominator <= 0) return null;
  return numerator / denominator;
}

function validContentId(value: string | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Public/platform metrics often arrive without a canonical LegalMente CONTENT_ID.
 * Those observations remain evidence, but are not allowed into production memory
 * until an explicit mapping exists. Topic/title similarity is never a binding.
 */
export function partitionMappedPerformance(observations: readonly RawPerformanceObservation[]): PerformanceMappingPartition {
  const mapped: PerformanceObservation[] = [];
  const unmapped: RawPerformanceObservation[] = [];
  for (const observation of observations) {
    if (!validContentId(observation.contentId)) {
      unmapped.push(observation);
      continue;
    }
    const { externalContentRef: _externalContentRef, contentId, ...rest } = observation;
    mapped.push({ contentId, ...rest });
  }
  return { mapped, unmapped };
}

export function derivePerformanceSignal(observation: PerformanceObservation): PerformanceSignal {
  const warnings: string[] = [
    "Performance is an audience signal, not proof of legal quality, causality, correctness or publication readiness.",
  ];
  const shares = finiteNonNegative(observation.shares) ? observation.shares : null;
  const saves = finiteNonNegative(observation.saves) ? observation.saves : null;
  const utilityActions = shares !== null && saves !== null ? shares + saves : null;
  const hasMeasuredReach = finiteNonNegative(observation.reach) && observation.reach > 0;
  if (!hasMeasuredReach) warnings.push("Reach is missing or zero; rate-based learning remains unavailable.");

  return {
    contentId: observation.contentId,
    utilityActions,
    utilityRateByReach: rate(utilityActions, observation.reach),
    shareRateByReach: rate(shares, observation.reach),
    saveRateByReach: rate(saves, observation.reach),
    hasMeasuredReach,
    warnings,
  };
}

/**
 * Human curation remains the only source of curation state. Performance may
 * enrich memory, but it can never promote GENERATED to PRESELECTED/APPROVED/
 * PUBLISHED or open any legal/publication gate.
 */
export function buildLearningMemoryItem(
  piece: ProductionPiece,
  curation: HumanCurationSignal,
  observation?: PerformanceObservation,
): LearningMemoryItem {
  if (piece.id !== curation.contentId) {
    throw new Error(`CURATION_ID_MISMATCH: ${piece.id} != ${curation.contentId}`);
  }
  if (observation && observation.contentId !== piece.id) {
    throw new Error(`PERFORMANCE_ID_MISMATCH: ${piece.id} != ${observation.contentId}`);
  }

  return {
    ...piece,
    state: curation.state,
    recordedAt: curation.recordedAt,
    performance: observation ? derivePerformanceSignal(observation) : undefined,
    evidence: {
      curationSourceRef: curation.sourceRef,
      performanceSourceRef: observation?.sourceRef,
    },
  };
}

export function rankMeasuredUtility(observations: readonly PerformanceObservation[]): readonly PerformanceSignal[] {
  return observations
    .map(derivePerformanceSignal)
    .filter((signal) => signal.utilityRateByReach !== null)
    .sort((a, b) => (b.utilityRateByReach ?? -1) - (a.utilityRateByReach ?? -1) || a.contentId.localeCompare(b.contentId));
}

export const LEARNING_INVARIANTS = Object.freeze({
  performanceNeverChangesCurationState: true,
  performanceNeverChangesLegalState: true,
  performanceNeverAuthorizesPublication: true,
  missingMetricsRemainNull: true,
  unmappedMetricsNeverEnterProductionMemory: true,
  humanSelectionIsSeparateFromAudiencePerformance: true,
});
