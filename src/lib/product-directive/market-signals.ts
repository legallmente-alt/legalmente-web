import { scoreOpportunity, type KnowledgeOpportunity } from "@/lib/opportunity-engine";

export const MARKET_SIGNAL_KINDS = [
  "UTILITY",
  "INTEREST",
  "VIRALITY",
  "RETENTION",
  "MONETIZATION",
  "SEARCH_DEMAND",
] as const;
export type MarketSignalKind = (typeof MARKET_SIGNAL_KINDS)[number];

export const MARKET_EVIDENCE_CLASSES = [
  "HYPOTHESIS",
  "QUALITATIVE",
  "MEASURED_FIRST_PARTY",
  "EXTERNAL_RESEARCH",
] as const;
export type MarketEvidenceClass = (typeof MARKET_EVIDENCE_CLASSES)[number];

export type MarketSignal = {
  kind: MarketSignalKind;
  value: number;
  evidenceClass: MarketEvidenceClass;
  sourceLabel: string;
  note: string;
};

export type MarketSignalScore = {
  rawSignalScore: number;
  confidenceMultiplier: number;
  weightedSignalScore: number;
  warnings: readonly string[];
};

export type OpportunityPriorityWithMarket = {
  opportunityId: string;
  baseOpportunityScore: number;
  marketSignalScore: number;
  combinedPriority: number;
  warnings: readonly string[];
  mayOpenLegalGate: false;
};

const confidence: Record<MarketEvidenceClass, number> = {
  HYPOTHESIS: 0.55,
  QUALITATIVE: 0.7,
  EXTERNAL_RESEARCH: 0.82,
  MEASURED_FIRST_PARTY: 1,
};

function validValue(value: number): boolean {
  return Number.isFinite(value) && value >= 0 && value <= 10;
}

export function scoreMarketSignals(signals: readonly MarketSignal[]): MarketSignalScore {
  const warnings: string[] = [];
  if (signals.length === 0) {
    return {
      rawSignalScore: 0,
      confidenceMultiplier: 0,
      weightedSignalScore: 0,
      warnings: ["No market signals supplied; do not infer demand, virality or monetization."],
    };
  }

  const usable = signals.filter((signal) => {
    if (!validValue(signal.value)) {
      warnings.push(`${signal.kind} signal must be between 0 and 10.`);
      return false;
    }
    if (!signal.sourceLabel.trim() || !signal.note.trim()) {
      warnings.push(`${signal.kind} signal requires sourceLabel and note.`);
      return false;
    }
    return true;
  });

  if (usable.length === 0) {
    return { rawSignalScore: 0, confidenceMultiplier: 0, weightedSignalScore: 0, warnings };
  }

  const kindWeights: Record<MarketSignalKind, number> = {
    UTILITY: 0.24,
    INTEREST: 0.18,
    VIRALITY: 0.14,
    RETENTION: 0.18,
    MONETIZATION: 0.12,
    SEARCH_DEMAND: 0.14,
  };

  let weightedValues = 0;
  let usedWeight = 0;
  for (const signal of usable) {
    const weight = kindWeights[signal.kind];
    weightedValues += signal.value * weight;
    usedWeight += weight;
  }
  const rawSignalScore = usedWeight > 0 ? weightedValues / usedWeight : 0;
  const confidenceMultiplier = Math.max(...usable.map((signal) => confidence[signal.evidenceClass]));
  const weightedSignalScore = rawSignalScore * confidenceMultiplier;

  if (usable.every((signal) => signal.evidenceClass !== "MEASURED_FIRST_PARTY")) {
    warnings.push("No measured first-party signal is present; market priority remains provisional.");
  }

  return {
    rawSignalScore: Math.round(rawSignalScore * 100) / 100,
    confidenceMultiplier,
    weightedSignalScore: Math.round(weightedSignalScore * 100) / 100,
    warnings,
  };
}

/**
 * Market evidence can change research/product priority, never legal truth.
 * Base opportunity keeps 80% of the combined priority; market overlay is capped
 * at 20% so a viral topic cannot overwhelm source/strategy constraints.
 */
export function scoreOpportunityWithMarketSignals(
  opportunity: KnowledgeOpportunity,
  signals: readonly MarketSignal[],
): OpportunityPriorityWithMarket {
  const base = scoreOpportunity(opportunity);
  const market = scoreMarketSignals(signals);
  const combined = base.score * 0.8 + market.weightedSignalScore * 0.2;

  return {
    opportunityId: opportunity.id,
    baseOpportunityScore: base.score,
    marketSignalScore: market.weightedSignalScore,
    combinedPriority: Math.round(combined * 100) / 100,
    warnings: [...base.warnings, ...market.warnings],
    mayOpenLegalGate: false,
  };
}
