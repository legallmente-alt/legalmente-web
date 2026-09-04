import type { DistributionSurface, EditorialLane } from "@/lib/editorial-engine/orchestrator";
import type { QuestionContext } from "@/lib/knowledge-pilot";
import type { KnowledgeOpportunity } from "@/lib/opportunity-engine";

import type {
  EntryDoor,
  KnowledgeLevel,
  KnowledgeUnitDescriptor,
  OutputSurface,
  ProductLayer,
  SourceReference,
  TerritoryMode,
  VisualContract,
} from "./index";

function laneToSurfaces(lane: EditorialLane): OutputSurface[] {
  if (lane === "FOUNDER_LINKEDIN") return ["FOUNDER_LINKEDIN", "WEB"];
  if (lane === "PRODUCT_PREPARATION") return ["WEB", "TOOL"];
  return ["SOCIAL", "WEB"];
}

function distributionToSurface(surface: DistributionSurface): OutputSurface | null {
  if (surface === "FOUNDER_LINKEDIN") return "FOUNDER_LINKEDIN";
  if (surface === "PRODUCT_TOOL") return "TOOL";
  if (surface === "WEB_KNOWLEDGE") return "WEB";
  if (surface === "LEGALMENTE_PUBLIC") return "SOCIAL";
  return null;
}

function unique<T>(items: readonly T[]): T[] {
  return [...new Set(items)];
}

export type OpportunityDirectivePlanning = {
  knowledgeLevel: KnowledgeLevel;
  productLayer: ProductLayer;
  entryDoor: EntryDoor;
  needOrQuestion?: string;
  commonErrorOrTension: string;
  explanationOrApplication: string;
  territoryMode: TerritoryMode;
  territories?: readonly string[];
  sources: readonly SourceReference[];
  relatedMatterIds?: readonly string[];
  visual?: VisualContract;
  founderProfileEvidenceIds?: readonly string[];
  priorFingerprints?: readonly string[];
  angle?: string;
  format?: string;
};

/**
 * Converts an existing opportunity-engine hypothesis into the Founder product
 * descriptor. It requires explicit planning inputs rather than inventing legal
 * sources, territory or professional provenance.
 */
export function opportunityToKnowledgeUnit(
  opportunity: KnowledgeOpportunity,
  planning: OpportunityDirectivePlanning,
): KnowledgeUnitDescriptor {
  return {
    id: `UNIT:${opportunity.id}`,
    title: opportunity.title,
    matter: opportunity.legalDomainIds.join(" / "),
    knowledgeLevel: planning.knowledgeLevel,
    productLayer: planning.productLayer,
    entryDoor: planning.entryDoor,
    needOrQuestion: planning.needOrQuestion ?? opportunity.nextQuestion,
    conceptIds: opportunity.conceptIds,
    commonErrorOrTension: planning.commonErrorOrTension,
    explanationOrApplication: planning.explanationOrApplication,
    territoryMode: planning.territoryMode,
    territories: planning.territories ?? [],
    sources: planning.sources,
    relatedMatterIds: planning.relatedMatterIds ?? opportunity.legalDomainIds,
    outputSurfaces: laneToSurfaces(opportunity.recommendedLane),
    visual: planning.visual,
    founderProfileEvidenceIds: planning.founderProfileEvidenceIds,
    priorFingerprints: planning.priorFingerprints,
    angle: planning.angle ?? opportunity.clusterId,
    format: planning.format ?? opportunity.recommendedArtifact,
  };
}

export type QuestionDirectivePlanning = {
  knowledgeLevel: KnowledgeLevel;
  productLayer: ProductLayer;
  entryDoor: EntryDoor;
  commonErrorOrTension: string;
  explanationOrApplication: string;
  territoryMode: TerritoryMode;
  sources: readonly SourceReference[];
  relatedMatterIds?: readonly string[];
  visual?: VisualContract;
  founderProfileEvidenceIds?: readonly string[];
  priorFingerprints?: readonly string[];
  angle: string;
  format: string;
};

/**
 * Bridges knowledge-pilot questions to the same product descriptor used by
 * opportunity candidates. Canonical bindings remain untouched and authoritative
 * in their own system; this adapter only carries product classification.
 */
export function questionToKnowledgeUnit(
  context: QuestionContext,
  planning: QuestionDirectivePlanning,
): KnowledgeUnitDescriptor {
  const mappedSurfaces = context.intendedSurfaces
    .map(distributionToSurface)
    .filter((surface): surface is OutputSurface => surface !== null);

  return {
    id: `UNIT:${context.id}`,
    title: context.question,
    matter: context.legalDomainIds.join(" / "),
    knowledgeLevel: planning.knowledgeLevel,
    productLayer: planning.productLayer,
    entryDoor: planning.entryDoor,
    needOrQuestion: context.question,
    conceptIds: context.conceptIds,
    commonErrorOrTension: planning.commonErrorOrTension,
    explanationOrApplication: planning.explanationOrApplication,
    territoryMode: planning.territoryMode,
    territories: context.territory ? [context.territory] : [],
    sources: planning.sources,
    relatedMatterIds: planning.relatedMatterIds ?? context.legalDomainIds,
    outputSurfaces: unique(mappedSurfaces),
    visual: planning.visual,
    founderProfileEvidenceIds: planning.founderProfileEvidenceIds,
    priorFingerprints: planning.priorFingerprints,
    angle: planning.angle,
    format: planning.format,
  };
}
