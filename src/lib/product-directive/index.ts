export const KNOWLEDGE_LEVELS = [
  "FOUNDATION",
  "MATTER",
  "NEED_PROCESS",
  "COMPARATIVE",
  "TERRITORIAL_SPECIALIZED",
] as const;
export type KnowledgeLevel = (typeof KNOWLEDGE_LEVELS)[number];

export const ENTRY_DOORS = [
  "NEED",
  "QUESTION",
  "COMMON_ERROR",
  "MYTH",
  "CONCEPT",
  "REQUIREMENTS",
  "STEPS",
  "HUMAN_SITUATION",
  "PREVENTION",
  "HISTORY_CULTURE",
  "PROFESSIONAL_DEPTH",
] as const;
export type EntryDoor = (typeof ENTRY_DOORS)[number];

export const SOURCE_TIERS = [
  "STABLE_GENERAL",
  "MATTER_INSTITUTIONAL",
  "EXPLICIT_COMPARATIVE",
  "PRIMARY_CURRENT",
] as const;
export type SourceTier = (typeof SOURCE_TIERS)[number];

export const TERRITORY_MODES = [
  "PANHISPANIC_GENERAL",
  "VARIES_BY_TERRITORY",
  "EXPLICIT_TERRITORY",
] as const;
export type TerritoryMode = (typeof TERRITORY_MODES)[number];

export const PRODUCT_LAYERS = [
  "LEGALMENTE_BASIC",
  "LEGALMENTE_NEEDS",
  "LEGALMENTE_COMPARATIVE",
  "LEGALMENTE_PROFESSIONAL",
  "LEGALMENTE_CORPORATE",
] as const;
export type ProductLayer = (typeof PRODUCT_LAYERS)[number];

export const OUTPUT_SURFACES = [
  "SOCIAL",
  "WEB",
  "TOOL",
  "GAME",
  "FOUNDER_LINKEDIN",
] as const;
export type OutputSurface = (typeof OUTPUT_SURFACES)[number];

export type SourceReference = {
  id: string;
  tier: SourceTier;
  label: string;
  isPrimary: boolean;
  verifiedAt?: string;
  territory?: string;
};

export type VisualContract = {
  communicatesConcept: boolean;
  physicalBrandIntegration: boolean;
  approvedSampleReferenceChecked: boolean;
  generatedBaseArtHasZeroCharacters?: boolean;
  deterministicTypographyAfterGeneration?: boolean;
  metaphor: string;
  visualSchool: string;
  recentSimilarity?: number;
};

export type KnowledgeUnitDescriptor = {
  id: string;
  title: string;
  matter: string;
  knowledgeLevel: KnowledgeLevel;
  productLayer: ProductLayer;
  entryDoor: EntryDoor;
  needOrQuestion: string;
  conceptIds: readonly string[];
  commonErrorOrTension: string;
  explanationOrApplication: string;
  territoryMode: TerritoryMode;
  territories: readonly string[];
  sources: readonly SourceReference[];
  relatedMatterIds: readonly string[];
  outputSurfaces: readonly OutputSurface[];
  visual?: VisualContract;
  founderProfileEvidenceIds?: readonly string[];
  priorFingerprints?: readonly string[];
  angle: string;
  format: string;
};

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

function sourceTierAllowed(level: KnowledgeLevel, tier: SourceTier): boolean {
  if (level === "FOUNDATION") return tier === "STABLE_GENERAL" || tier === "MATTER_INSTITUTIONAL";
  if (level === "MATTER" || level === "NEED_PROCESS") {
    return tier === "MATTER_INSTITUTIONAL" || tier === "PRIMARY_CURRENT" || tier === "STABLE_GENERAL";
  }
  if (level === "COMPARATIVE") return tier === "EXPLICIT_COMPARATIVE" || tier === "PRIMARY_CURRENT";
  return tier === "PRIMARY_CURRENT" || tier === "MATTER_INSTITUTIONAL";
}

/**
 * Founder directive validator. This validates product/editorial invariants only.
 * It never declares a legal claim true and never opens a legal/publication gate.
 */
export function validateKnowledgeUnit(unit: KnowledgeUnitDescriptor): string[] {
  const errors: string[] = [];

  if (!hasText(unit.id)) errors.push("Knowledge unit id is required.");
  if (!hasText(unit.title)) errors.push("Title is required.");
  if (!hasText(unit.matter)) errors.push("A legal matter/domain is required for classification.");
  if (!hasText(unit.needOrQuestion)) errors.push("A human need or question is required.");
  if (unit.conceptIds.length === 0) errors.push("At least one legal concept is required.");
  if (!hasText(unit.commonErrorOrTension)) errors.push("A real confusion, tension or practical reason to care is required.");
  if (!hasText(unit.explanationOrApplication)) errors.push("The unit must teach or help apply something concrete.");
  if (unit.sources.length === 0) errors.push("At least one source reference is required before production.");

  if (unit.territoryMode === "PANHISPANIC_GENERAL" && unit.territories.length > 0) {
    errors.push("Panhispanic-general units must not silently bind themselves to a national territory.");
  }
  if (unit.territoryMode === "EXPLICIT_TERRITORY" && unit.territories.length === 0) {
    errors.push("Explicit-territory units require at least one named territory.");
  }
  if (unit.knowledgeLevel === "COMPARATIVE" && unit.territoryMode !== "EXPLICIT_TERRITORY") {
    errors.push("Comparative content must identify the compared territories explicitly.");
  }
  if (unit.knowledgeLevel === "TERRITORIAL_SPECIALIZED" && unit.territoryMode !== "EXPLICIT_TERRITORY") {
    errors.push("Territorial-specialized content must use an explicit territory.");
  }

  for (const source of unit.sources) {
    if (!hasText(source.id) || !hasText(source.label)) errors.push("Every source requires id and label.");
    if (!sourceTierAllowed(unit.knowledgeLevel, source.tier)) {
      errors.push(`Source ${source.id} uses tier ${source.tier}, which is not appropriate for ${unit.knowledgeLevel}.`);
    }
    if (source.tier === "PRIMARY_CURRENT" && !source.isPrimary) {
      errors.push(`Source ${source.id} is marked PRIMARY_CURRENT but is not primary.`);
    }
  }

  if (unit.outputSurfaces.includes("SOCIAL") && unit.visual) {
    if (!unit.visual.communicatesConcept) errors.push("Social visual must communicate the concept, not merely decorate it.");
    if (!unit.visual.physicalBrandIntegration) errors.push("LegalMente brand must be physically integrated into the scene/object.");
    if (!unit.visual.approvedSampleReferenceChecked) errors.push("Founder-approved sample images must be checked before visual production.");
    if (unit.visual.generatedBaseArtHasZeroCharacters !== true) {
      errors.push("Visual-provider base art must contain zero letters, numbers or pseudotext; typography is post-generation.");
    }
    if (unit.visual.deterministicTypographyAfterGeneration !== true) {
      errors.push("LegalMente brand and approved editorial copy must be composed deterministically after base-art generation.");
    }
    if (!hasText(unit.visual.metaphor)) errors.push("Visual metaphor is required for social visual production.");
    if (!hasText(unit.visual.visualSchool)) errors.push("Visual school/style must be declared for anti-repetition memory.");
    if (unit.visual.recentSimilarity !== undefined && (unit.visual.recentSimilarity < 0 || unit.visual.recentSimilarity > 1)) {
      errors.push("recentSimilarity must be between 0 and 1.");
    }
  }

  if (unit.outputSurfaces.includes("FOUNDER_LINKEDIN") && (unit.founderProfileEvidenceIds?.length ?? 0) === 0) {
    errors.push("Founder LinkedIn projection requires documented professional evidence ids.");
  }

  return errors;
}

export function contentFingerprint(unit: KnowledgeUnitDescriptor): string {
  return [
    unit.matter,
    unit.knowledgeLevel,
    unit.entryDoor,
    unit.needOrQuestion,
    unit.conceptIds.slice().sort().join("+"),
    unit.angle,
    unit.format,
    unit.visual?.metaphor ?? "NO_VISUAL",
    unit.visual?.visualSchool ?? "NO_VISUAL_SCHOOL",
  ]
    .map((value) => value.trim().toLocaleLowerCase("es"))
    .join("::");
}

export function isRepeatedCandidate(unit: KnowledgeUnitDescriptor): boolean {
  const fingerprint = contentFingerprint(unit);
  return (unit.priorFingerprints ?? []).includes(fingerprint);
}

export type ProductionDecision = {
  state: "READY_FOR_RESEARCH" | "READY_FOR_BRIEF" | "BLOCKED";
  reasons: readonly string[];
};

/**
 * A candidate with classification but incomplete evidence becomes research work,
 * never filler content. A fully valid descriptor can move to a brief, not to publication.
 */
export function resolveProductionDecision(unit: KnowledgeUnitDescriptor): ProductionDecision {
  if (isRepeatedCandidate(unit)) {
    return { state: "BLOCKED", reasons: ["DUPLICATE_CONTENT_FINGERPRINT"] };
  }

  const errors = validateKnowledgeUnit(unit);
  const sourceOnly = errors.length > 0 && errors.every((error) => error.includes("source") || error.includes("Source"));
  if (sourceOnly) return { state: "READY_FOR_RESEARCH", reasons: errors };
  if (errors.length > 0) return { state: "BLOCKED", reasons: errors };
  return { state: "READY_FOR_BRIEF", reasons: [] };
}
