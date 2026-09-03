import type { LegalDomainId } from "@/lib/ecosystem-kernel";
import {
  LEGAL_DEPTH_LEVELS,
  editorialUtility,
  requiresJurisdiction,
  type EditorialCandidate,
  type LegalDepthLevel,
} from "./index";

/**
 * Distribution is intentionally separate from legal taxonomy.
 * The same knowledge node may support multiple surfaces without becoming a
 * duplicate topic or creating a parallel classification system.
 */
export const EDITORIAL_LANES = [
  "PUBLIC_GENERAL",
  "FOUNDER_LINKEDIN",
  "RADAR_CURRENT",
  "PRODUCT_PREPARATION",
] as const;

export type EditorialLane = (typeof EDITORIAL_LANES)[number];

export const DEMAND_CLASSES = ["MASS", "PROFESSIONAL", "NICHE"] as const;
export type DemandClass = (typeof DEMAND_CLASSES)[number];

export const TEMPORAL_CLASSES = ["EVERGREEN", "CURRENT", "VOLATILE"] as const;
export type TemporalClass = (typeof TEMPORAL_CLASSES)[number];

/**
 * Describes the kind of legal source or normative context involved.
 * It deliberately does NOT encode a universal rank. Normative precedence must
 * be resolved by a jurisdiction-aware adapter, never by this global engine.
 */
export const NORMATIVE_SOURCE_KINDS = [
  "FOUNDATIONAL_PRINCIPLE",
  "INTERNATIONAL_OR_SUPRANATIONAL",
  "CONSTITUTIONAL",
  "LEGISLATION",
  "REGULATION",
  "JUDICIAL_INTERPRETATION",
  "ADMINISTRATIVE_GUIDANCE",
  "PRIVATE_INSTRUMENT",
  "DOCTRINE",
  "NOT_APPLICABLE",
] as const;

export type NormativeSourceKind = (typeof NORMATIVE_SOURCE_KINDS)[number];

/** The 9-layer human-to-law formula already present in LegalMente's architecture. */
export type HumanLegalFrame = {
  situation: string;
  observableConduct: string;
  legalRelation: string;
  objectOrPerformance: string;
  timeContext: string;
  evidence: string;
  verifiableRule: string;
  limit: string;
  nextQuestion: string;
};

/** Bind editorial work back to the existing LegalMente graph/kernel. */
export type EditorialKnowledgeBindings = {
  worldIds: readonly string[];
  legalDomainIds: readonly LegalDomainId[];
  conceptIds: readonly string[];
  relatedNodeIds?: readonly string[];
};

/**
 * Signals are editorial/business prioritization metadata, not legal truth.
 * All values use a 0-10 scale.
 */
export type EditorialSignals = {
  massAppeal: number;
  professionalValue: number;
  currentRelevance: number;
  productPotential: number;
  sourceRobustness: number;
};

export type EditorialPlanningCandidate = EditorialCandidate & {
  lane?: EditorialLane;
  demandClass: DemandClass;
  temporalClass: TemporalClass;
  normativeSourceKinds: readonly NormativeSourceKind[];
  humanFrame: HumanLegalFrame;
  bindings: EditorialKnowledgeBindings;
  signals: EditorialSignals;
};

export type CandidateValidation = {
  ok: boolean;
  errors: string[];
};

export type EditorialRoute = {
  primary: EditorialLane;
  secondary: readonly EditorialLane[];
  scores: Readonly<Record<EditorialLane, number>>;
};

const DEPTH_INDEX = new Map(LEGAL_DEPTH_LEVELS.map((level, index) => [level, index]));
const nonEmpty = (value: string) => value.trim().length > 0;
const inRange = (value: number) => Number.isFinite(value) && value >= 0 && value <= 10;

const CORPORATE_PROFESSIONAL_DOMAINS = new Set<LegalDomainId>([
  "CORPORATE",
  "MERCANTILE",
  "CONTRACTS",
  "LABOR",
  "TAX",
  "ADMINISTRATIVE",
  "DIGITAL_DATA_AI",
  "INTELLECTUAL_PROPERTY",
  "REAL_ESTATE_PROPERTY",
]);

/**
 * Depth preferences are lane-specific. This prevents the public basic-first
 * rule from suppressing intentionally specialized founder/professional work.
 */
const LANE_DEPTH_PREFERENCE: Record<EditorialLane, readonly LegalDepthLevel[]> = {
  PUBLIC_GENERAL: [
    "FOUNDATIONS",
    "PERSON_AND_DIGNITY",
    "RIGHTS_AND_DUTIES",
    "CORE_INSTITUTIONS",
    "CONCRETE_PROBLEMS",
    "LEGAL_BRANCHES",
    "SPECIALTIES",
    "JURISDICTION_AND_PROCEDURE",
  ],
  FOUNDER_LINKEDIN: [
    "CORE_INSTITUTIONS",
    "LEGAL_BRANCHES",
    "SPECIALTIES",
    "CONCRETE_PROBLEMS",
    "JURISDICTION_AND_PROCEDURE",
    "RIGHTS_AND_DUTIES",
    "FOUNDATIONS",
    "PERSON_AND_DIGNITY",
  ],
  RADAR_CURRENT: [
    "CONCRETE_PROBLEMS",
    "LEGAL_BRANCHES",
    "SPECIALTIES",
    "JURISDICTION_AND_PROCEDURE",
    "CORE_INSTITUTIONS",
    "RIGHTS_AND_DUTIES",
    "PERSON_AND_DIGNITY",
    "FOUNDATIONS",
  ],
  PRODUCT_PREPARATION: [
    "CORE_INSTITUTIONS",
    "CONCRETE_PROBLEMS",
    "LEGAL_BRANCHES",
    "SPECIALTIES",
    "RIGHTS_AND_DUTIES",
    "PERSON_AND_DIGNITY",
    "FOUNDATIONS",
    "JURISDICTION_AND_PROCEDURE",
  ],
};

function depthFit(depth: LegalDepthLevel, lane: EditorialLane): number {
  const position = LANE_DEPTH_PREFERENCE[lane].indexOf(depth);
  return position < 0 ? 0 : Math.max(0, 10 - position * 1.15);
}

function corporateDomainFit(candidate: EditorialPlanningCandidate): number {
  return candidate.bindings.legalDomainIds.some((domain) => CORPORATE_PROFESSIONAL_DOMAINS.has(domain)) ? 10 : 3;
}

function roundScore(value: number): number {
  return Math.round(value * 100) / 100;
}

export function scoreCandidateForLane(candidate: EditorialPlanningCandidate, lane: EditorialLane): number {
  const utility = editorialUtility(candidate);
  const depth = depthFit(candidate.depth, lane);
  const { massAppeal, professionalValue, currentRelevance, productPotential, sourceRobustness } = candidate.signals;

  switch (lane) {
    case "PUBLIC_GENERAL":
      return roundScore(
        utility * 0.30
        + massAppeal * 0.30
        + depth * 0.20
        + sourceRobustness * 0.10
        + Math.max(candidate.humanRelevance, candidate.narrativePotential) * 0.10,
      );
    case "FOUNDER_LINKEDIN":
      return roundScore(
        professionalValue * 0.30
        + candidate.legalValue * 0.15
        + candidate.practicalUtility * 0.15
        + sourceRobustness * 0.15
        + corporateDomainFit(candidate) * 0.10
        + depth * 0.10
        + currentRelevance * 0.05,
      );
    case "RADAR_CURRENT":
      return roundScore(
        currentRelevance * 0.35
        + sourceRobustness * 0.25
        + candidate.legalValue * 0.15
        + Math.max(massAppeal, professionalValue) * 0.15
        + depth * 0.10,
      );
    case "PRODUCT_PREPARATION":
      return roundScore(
        productPotential * 0.30
        + candidate.practicalUtility * 0.25
        + candidate.legalValue * 0.15
        + sourceRobustness * 0.15
        + depth * 0.10
        + candidate.humanRelevance * 0.05,
      );
  }
}

export function validatePlanningCandidate(candidate: EditorialPlanningCandidate): CandidateValidation {
  const errors: string[] = [];

  if (candidate.bindings.worldIds.length === 0) errors.push("At least one existing world binding is required.");
  if (candidate.bindings.legalDomainIds.length === 0) errors.push("At least one existing legal-domain binding is required.");
  if (candidate.bindings.conceptIds.length === 0) errors.push("At least one existing concept binding is required.");
  if (candidate.normativeSourceKinds.length === 0) errors.push("At least one normative source kind or NOT_APPLICABLE is required.");

  for (const [field, value] of Object.entries(candidate.humanFrame)) {
    if (!nonEmpty(value)) errors.push(`Human/legal frame field is required: ${field}.`);
  }

  for (const [field, value] of Object.entries(candidate.signals)) {
    if (!inRange(value)) errors.push(`Editorial signal ${field} must be between 0 and 10.`);
  }

  if (requiresJurisdiction(candidate) && !candidate.jurisdiction) {
    errors.push("Jurisdiction is required at jurisdiction/procedure depth.");
  }

  if (candidate.temporalClass !== "EVERGREEN" && candidate.signals.sourceRobustness < 7) {
    errors.push("Current or volatile content requires sourceRobustness >= 7 before editorial routing.");
  }

  if (candidate.lane === "FOUNDER_LINKEDIN" && candidate.signals.professionalValue < 6) {
    errors.push("Founder LinkedIn requires professionalValue >= 6.");
  }

  if (candidate.lane === "PRODUCT_PREPARATION" && (candidate.signals.productPotential < 6 || candidate.practicalUtility < 6)) {
    errors.push("Product preparation requires both productPotential and practicalUtility >= 6.");
  }

  if (
    candidate.lane === "PUBLIC_GENERAL"
    && (candidate.depth === "SPECIALTIES" || candidate.depth === "JURISDICTION_AND_PROCEDURE")
    && candidate.signals.massAppeal < 7
  ) {
    errors.push("Deep public content requires massAppeal >= 7 or should be routed to a professional/product lane.");
  }

  return { ok: errors.length === 0, errors };
}

/**
 * Route one knowledge-backed idea to its best surface. A concept may have a
 * secondary surface, but the underlying concept/angle remains one record so
 * adaptations do not masquerade as new topics.
 */
export function routeEditorialCandidate(candidate: EditorialPlanningCandidate): EditorialRoute {
  const scores = Object.fromEntries(
    EDITORIAL_LANES.map((lane) => [lane, scoreCandidateForLane(candidate, lane)]),
  ) as Record<EditorialLane, number>;

  const ranked = [...EDITORIAL_LANES].sort((a, b) => scores[b] - scores[a]);
  const primary = candidate.lane ?? ranked[0];
  const primaryScore = scores[primary];
  const secondary = ranked
    .filter((lane) => lane !== primary && scores[lane] >= 6.5 && primaryScore - scores[lane] <= 1.25)
    .slice(0, 2);

  return { primary, secondary, scores };
}

/** Score + depth preference for an explicitly selected lane. */
export function prioritizeForLane(
  candidates: readonly EditorialPlanningCandidate[],
  lane: EditorialLane,
): EditorialPlanningCandidate[] {
  return [...candidates].sort((a, b) => {
    const scoreDelta = scoreCandidateForLane(b, lane) - scoreCandidateForLane(a, lane);
    if (Math.abs(scoreDelta) > 0.01) return scoreDelta;

    const rankA = LANE_DEPTH_PREFERENCE[lane].indexOf(a.depth);
    const rankB = LANE_DEPTH_PREFERENCE[lane].indexOf(b.depth);
    if (rankA !== rankB) return rankA - rankB;

    return (DEPTH_INDEX.get(a.depth) ?? 99) - (DEPTH_INDEX.get(b.depth) ?? 99);
  });
}

export const MULTI_AXIS_EDITORIAL_RULES = Object.freeze({
  pyramidRole: "KNOWLEDGE_DEPTH_SPINE",
  graphRole: "RELATIONSHIP_AND_REUSE_MEMORY",
  universalNormativeRankingForbidden: true,
  normativePrecedenceRequiresJurisdictionAdapter: true,
  publicLaneIsBasicFirst: true,
  founderLinkedInMayBeSpecialized: true,
  oneKnowledgeRecordMayHaveMultipleDistributionAdaptations: true,
  adaptationsDoNotResetAntiRepetitionHistory: true,
  currentContentNeedsStrongSourceSignal: true,
});
