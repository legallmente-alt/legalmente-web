export const PRODUCTION_MODES = [
  "LEGALMENTE_GENERAL",
  "SPECIFIC_DOMAIN",
  "LINKEDIN_LEGALMENTE",
  "LINKEDIN_FOUNDER",
] as const;

export const CURATION_STATES = [
  "GENERATED",
  "PRESELECTED",
  "APPROVED",
  "PUBLISHED",
  "DISCARDED",
] as const;

export const BRAND_INTEGRATION_MODES = [
  "PHYSICAL_SCENE",
  "OVERLAY",
  "WATERMARK",
  "FLOATING",
] as const;

export type ProductionMode = (typeof PRODUCTION_MODES)[number];
export type CurationState = (typeof CURATION_STATES)[number];
export type BrandIntegrationMode = (typeof BRAND_INTEGRATION_MODES)[number];

/**
 * Production-domain IDs are intentionally opaque strings here.
 * The ecosystem kernel remains the canonical domain registry; this policy must
 * be able to accept newly added domains without creating a second closed taxonomy.
 */
export type ProductionPiece = {
  id: string;
  legalDomainIds: readonly string[];
  entryDoor: string;
  topic: string;
  angle: string;
  legalRelation: string;
  hook: string;
  format: string;
  matterLabel: string;
  topicLabel: string;
  centralIdea: string;
  sourceIds?: readonly string[];
  artisticStyle: string;
  visualMetaphor: string;
  scenario: string;
  material: string;
  lighting: string;
  /** Explicit absence (e.g. "none") is valid; unknown/missing is not evidence. */
  humanPresence?: string;
  framing: string;
  composition: string;
  brandObject: string;
  visibleBrand: string;
  brandIntegration: BrandIntegrationMode;
  artBaseIsClean: boolean;
  typographyCompositor: "CANONICAL";
};

export type ProductionHistoryItem = ProductionPiece & {
  state: CurationState;
  recordedAt: string;
};

export type ProductionBatchPolicy = {
  mode: ProductionMode;
  expectedSize?: number;
  requestedDomainId?: string;
  now?: string;
  shortMemoryDays?: number;
  allowDigitalTopics?: boolean;
  formatOverride?: string;
  unit?: "INDEPENDENT_PUBLICATIONS" | "CAROUSEL_PAGES";
  collectionId?: string;
};

export type ProductionPolicyResult = {
  ok: boolean;
  errors: readonly string[];
  contentFingerprints: readonly string[];
  visualFingerprints: readonly string[];
  visualComparisons: readonly VisualComparison[];
  warnings: readonly string[];
};

export type VisualComparison = {
  pieceId: string;
  comparedId: string;
  scope: "BATCH" | "HISTORY";
  changedDimensions: number;
  knownDimensions: number;
};

export type ImprovementRecord = {
  problem: string;
  evidence: readonly string[];
  hypothesis: string;
  proposedChange: string;
  testPlan: string;
  result: string;
  decision: string;
  rollback: string;
  affectedArtifacts: readonly string[];
};

const STRONG_MEMORY_STATES = new Set<CurationState>(["PRESELECTED", "APPROVED", "PUBLISHED"]);
const SHORT_MEMORY_STATES = new Set<CurationState>(["GENERATED", "DISCARDED"]);
const DEFAULT_SHORT_MEMORY_DAYS = 30;
const GENERAL_MIN_DISTINCT_DOMAINS_FOR_TEN = 8;
const GENERAL_MAX_PER_PRIMARY_DOMAIN = 2;
const DIGITAL_DOMAIN_ID = "DIGITAL_DATA_AI";
const GENERAL_FORMAT = "9:16";
const LINKEDIN_FORMAT = "4:5";

const normalize = (value: string): string => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const nonEmpty = (value: string | undefined): value is string => typeof value === "string" && value.trim().length > 0;
const nonEmptyList = (value: readonly string[] | undefined): value is readonly string[] => Array.isArray(value) && value.length > 0 && value.every(nonEmpty);

const knownVisualValue = (value: string | undefined): boolean => nonEmpty(value)
  && normalize(value).length > 0
  && !["unknown", "desconocido", "pendiente", "tbd", "null", "n a"].includes(normalize(value));

/** Eight policy dimensions; camera + composition count once, not twice. */
function visualDimensions(piece: ProductionPiece): (string | undefined)[] {
  return [piece.artisticStyle, piece.visualMetaphor, piece.scenario, piece.material,
    piece.lighting, piece.humanPresence,
    knownVisualValue(piece.framing) && knownVisualValue(piece.composition)
      ? `${piece.framing}|${piece.composition}` : undefined,
    piece.brandObject];
}

export function productionVisualDistance(a: ProductionPiece, b: ProductionPiece): {
  changedDimensions: number; knownDimensions: number;
} {
  const left = visualDimensions(a);
  const right = visualDimensions(b);
  let changedDimensions = 0;
  let knownDimensions = 0;
  left.forEach((value, i) => {
    if (knownVisualValue(value) && knownVisualValue(right[i])) {
      knownDimensions++;
      if (normalize(value!) !== normalize(right[i]!)) changedDimensions++;
    }
  });
  return { changedDimensions, knownDimensions };
}

/**
 * Substance fingerprint deliberately excludes hook, labels and format.
 * Those are presentation choices and must not make the same legal idea look new.
 */
export function productionContentFingerprint(piece: ProductionPiece): string {
  return [
    [...piece.legalDomainIds].sort().join(","),
    piece.entryDoor,
    piece.topic,
    piece.angle,
    piece.legalRelation,
    piece.centralIdea,
  ].map(normalize).join("|");
}

/**
 * Visual identity deliberately excludes lighting and framing. A crop or lighting
 * adjustment is not enough to turn the same artistic solution into a new one.
 */
export function productionVisualFingerprint(piece: ProductionPiece): string {
  return [
    piece.artisticStyle,
    piece.visualMetaphor,
    piece.scenario,
    piece.material,
    piece.composition,
    piece.brandObject,
  ].map(normalize).join("|");
}

function ageInDays(recordedAt: string, now: string): number | null {
  const recorded = Date.parse(recordedAt);
  const current = Date.parse(now);
  if (!Number.isFinite(recorded) || !Number.isFinite(current)) return null;
  return Math.max(0, (current - recorded) / 86_400_000);
}

export function historyItemIsActive(
  item: ProductionHistoryItem,
  now = new Date().toISOString(),
  shortMemoryDays = DEFAULT_SHORT_MEMORY_DAYS,
): boolean {
  if (STRONG_MEMORY_STATES.has(item.state)) return true;
  if (!SHORT_MEMORY_STATES.has(item.state)) return false;
  const age = ageInDays(item.recordedAt, now);
  if (age === null) return true;
  return age <= shortMemoryDays;
}

function primaryDomain(piece: ProductionPiece): string {
  return piece.legalDomainIds[0] ?? "";
}

function expectedFormatForMode(mode: ProductionMode): string {
  return mode === "LINKEDIN_LEGALMENTE" || mode === "LINKEDIN_FOUNDER" ? LINKEDIN_FORMAT : GENERAL_FORMAT;
}

function validatePiece(piece: ProductionPiece, mode: ProductionMode, policy: ProductionBatchPolicy, errors: string[]): void {
  if (!nonEmpty(piece.id)) errors.push("Every piece requires an id.");
  if (!nonEmptyList(piece.legalDomainIds)) errors.push(`${piece.id || "UNKNOWN"}: at least one legal domain is required.`);

  for (const [field, value] of Object.entries({
    entryDoor: piece.entryDoor,
    topic: piece.topic,
    angle: piece.angle,
    legalRelation: piece.legalRelation,
    hook: piece.hook,
    format: piece.format,
    matterLabel: piece.matterLabel,
    topicLabel: piece.topicLabel,
    centralIdea: piece.centralIdea,
    artisticStyle: piece.artisticStyle,
    visualMetaphor: piece.visualMetaphor,
    scenario: piece.scenario,
    material: piece.material,
    lighting: piece.lighting,
    humanPresence: piece.humanPresence,
    framing: piece.framing,
    composition: piece.composition,
    brandObject: piece.brandObject,
  })) {
    if (!nonEmpty(value)) errors.push(`${piece.id || "UNKNOWN"}: ${field} is required.`);
  }
  if (!visualDimensions(piece).every(knownVisualValue)) {
    errors.push(`${piece.id}: all eight visual dimensions require explicit known values.`);
  }

  const requiredFormat = policy.formatOverride ?? expectedFormatForMode(mode);
  if (piece.format !== requiredFormat) {
    errors.push(`${piece.id}: format must be ${requiredFormat} for ${mode}${policy.formatOverride ? " under the explicit batch override" : ""}.`);
  }

  if (piece.visibleBrand !== "LegalMente") {
    errors.push(`${piece.id}: visible brand must be exactly LegalMente.`);
  }
  if (piece.brandIntegration !== "PHYSICAL_SCENE") {
    errors.push(`${piece.id}: LegalMente must be physically integrated into the scene, never overlay/watermark/floating.`);
  }
  if (!piece.artBaseIsClean) {
    errors.push(`${piece.id}: base art must remain clean; editorial typography is composed after image generation.`);
  }
  if (piece.typographyCompositor !== "CANONICAL") {
    errors.push(`${piece.id}: final typography must use the canonical compositor.`);
  }
  if (/entretenimiento/i.test(piece.matterLabel) || /entretenimiento/i.test(piece.topicLabel) || /entretenimiento/i.test(piece.visibleBrand)) {
    errors.push(`${piece.id}: entretenimiento is not part of the visible LegalMente brand.`);
  }

  if ((mode === "LINKEDIN_LEGALMENTE" || mode === "LINKEDIN_FOUNDER") && !nonEmptyList(piece.sourceIds)) {
    errors.push(`${piece.id}: LinkedIn production requires at least one source binding before review.`);
  }
}

function validateGeneralBatch(pieces: readonly ProductionPiece[], expectedSize: number, policy: ProductionBatchPolicy, errors: string[]): void {
  if (expectedSize !== 10 || pieces.length !== 10) return;

  const primaryDomains = pieces.map(primaryDomain).filter(Boolean);
  const domainCounts = new Map<string, number>();
  primaryDomains.forEach((domain) => domainCounts.set(domain, (domainCounts.get(domain) ?? 0) + 1));

  if (domainCounts.size < GENERAL_MIN_DISTINCT_DOMAINS_FOR_TEN) {
    errors.push(`A general 10-piece batch requires at least ${GENERAL_MIN_DISTINCT_DOMAINS_FOR_TEN} distinct primary legal domains.`);
  }
  for (const [domain, count] of domainCounts) {
    if (count > GENERAL_MAX_PER_PRIMARY_DOMAIN) {
      errors.push(`General batch overweights ${domain}: maximum ${GENERAL_MAX_PER_PRIMARY_DOMAIN} pieces per primary domain.`);
    }
  }

  const digitalCount = pieces.filter((piece) => piece.legalDomainIds.includes(DIGITAL_DOMAIN_ID)).length;
  if (digitalCount > 0 && !policy.allowDigitalTopics) {
    errors.push(`General LegalMente production has ${DIGITAL_DOMAIN_ID} paused unless explicitly enabled for the batch.`);
  }

  if (new Set(pieces.map((piece) => normalize(piece.entryDoor))).size < 5) {
    errors.push("A general 10-piece batch requires at least 5 distinct entry doors; ten definitions are not variety.");
  }
}

export function validateProductionBatch(
  pieces: readonly ProductionPiece[],
  history: readonly ProductionHistoryItem[] = [],
  policy: ProductionBatchPolicy = { mode: "LEGALMENTE_GENERAL" },
): ProductionPolicyResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const visualComparisons: VisualComparison[] = [];
  const expectedSize = policy.expectedSize ?? 10;
  const now = policy.now ?? new Date().toISOString();
  const shortMemoryDays = policy.shortMemoryDays ?? DEFAULT_SHORT_MEMORY_DAYS;
  const carousel = policy.unit === "CAROUSEL_PAGES";
  const linkedin = policy.mode === "LINKEDIN_LEGALMENTE" || policy.mode === "LINKEDIN_FOUNDER";

  if (carousel && !nonEmpty(policy.collectionId)) errors.push("Carousel pages require a collectionId.");
  if (new Set(pieces.map((piece) => piece.id)).size !== pieces.length) errors.push("Piece ids must be unique within a batch.");

  if (pieces.length !== expectedSize) {
    errors.push(`Expected ${expectedSize} pieces; received ${pieces.length}.`);
  }

  pieces.forEach((piece) => validatePiece(piece, policy.mode, policy, errors));

  if (policy.mode === "LEGALMENTE_GENERAL" && !carousel) validateGeneralBatch(pieces, expectedSize, policy, errors);

  if (policy.mode === "SPECIFIC_DOMAIN") {
    if (!nonEmpty(policy.requestedDomainId)) {
      errors.push("SPECIFIC_DOMAIN mode requires requestedDomainId.");
    } else {
      pieces.forEach((piece) => {
        if (!piece.legalDomainIds.includes(policy.requestedDomainId!)) {
          errors.push(`${piece.id}: does not belong to requested domain ${policy.requestedDomainId}.`);
        }
      });
      if (policy.requestedDomainId === DIGITAL_DOMAIN_ID && !policy.allowDigitalTopics) {
        errors.push(`${DIGITAL_DOMAIN_ID} is paused unless explicitly enabled for the batch.`);
      }
    }
  }

  const contentFingerprints = pieces.map(productionContentFingerprint);
  const visualFingerprints = pieces.map(productionVisualFingerprint);

  if (new Set(contentFingerprints).size !== contentFingerprints.length) {
    errors.push("Batch contains repeated editorial substance.");
  }
  if (!carousel && new Set(visualFingerprints).size !== visualFingerprints.length) {
    errors.push("Batch contains a repeated visual identity; changing crop or lighting does not make it new.");
  }

  if (!carousel && !linkedin && pieces.length === 10 && new Set(pieces.map((piece) => normalize(piece.artisticStyle))).size !== 10) {
    errors.push("A 10-piece batch must use 10 distinct dominant artistic styles.");
  }

  const activeHistory = history.filter((item) => historyItemIsActive(item, now, shortMemoryDays));
  const activeContent = new Set(activeHistory.map(productionContentFingerprint));
  const activeVisual = new Set(activeHistory.map(productionVisualFingerprint));
  warnings.push("Metadata checks do not prove visual quality, semantic novelty or complete historical coverage; inspect rendered images.");
  if (history.length === 0) warnings.push("No history supplied: historical repetition has not been verified.");

  pieces.forEach((piece, index) => {
    const candidates = [
      ...(!carousel ? pieces.filter((_, i) => i !== index).map((other) => ({ other, scope: "BATCH" as const })) : []),
      ...activeHistory.map((other) => ({ other, scope: "HISTORY" as const })),
    ].map(({ other, scope }) => ({ pieceId: piece.id, comparedId: other.id, scope,
      ...productionVisualDistance(piece, other) }));
    // Review closest peers in each scope so a large history cannot hide batch repeats.
    for (const scope of ["BATCH", "HISTORY"] as const) {
      const nearest = candidates.filter((item) => item.scope === scope)
        .sort((a, b) => a.changedDimensions - b.changedDimensions || a.comparedId.localeCompare(b.comparedId))
        .slice(0, 3);
      visualComparisons.push(...nearest);
      for (const comparison of nearest) {
        if (comparison.knownDimensions < 8) {
          errors.push(`${piece.id}: incomplete visual evidence against ${comparison.comparedId} (${scope}); review history before claiming novelty.`);
        } else if (comparison.changedDimensions < 5) {
          errors.push(`${piece.id}: visual distance from ${comparison.comparedId} (${scope}) is ${comparison.changedDimensions}/8; at least 5/8 required for initial review.`);
        }
      }
    }
  });

  pieces.forEach((piece, index) => {
    if (activeContent.has(contentFingerprints[index])) {
      errors.push(`${piece.id}: editorial substance is still active in anti-repetition memory.`);
    }
    if (activeVisual.has(visualFingerprints[index])) {
      errors.push(`${piece.id}: visual identity is still active in anti-repetition memory.`);
    }
  });

  return {
    ok: errors.length === 0,
    errors,
    contentFingerprints,
    visualFingerprints,
    visualComparisons,
    warnings,
  };
}

const improvementKeys: readonly (keyof ImprovementRecord)[] = [
  "problem",
  "evidence",
  "hypothesis",
  "proposedChange",
  "testPlan",
  "result",
  "decision",
  "rollback",
  "affectedArtifacts",
];

export function validateImprovementRecord(input: unknown): { ok: boolean; errors: readonly string[] } {
  const errors: string[] = [];
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, errors: ["Improvement record must be an object."] };
  }

  const record = input as Record<string, unknown>;
  const allowed = new Set<string>(improvementKeys);
  for (const key of Object.keys(record)) {
    if (!allowed.has(key)) errors.push(`Unknown improvement field: ${key}.`);
  }

  for (const key of improvementKeys) {
    const value = record[key];
    if (key === "evidence" || key === "affectedArtifacts") {
      if (!Array.isArray(value) || value.length === 0 || !value.every((item) => typeof item === "string" && item.trim().length > 0)) {
        errors.push(`${key} must be a non-empty string array.`);
      }
    } else if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`${key} is required.`);
    }
  }

  return { ok: errors.length === 0, errors };
}

export const PRODUCTION_POLICY_RULES = Object.freeze({
  generalBatchIsBroadByDefault: true,
  genericLegalMenteDoesNotForceLinkedIn: true,
  specificDomainRequestOverridesGeneralBreadth: true,
  institutionalLinkedInIsSeparateFromFounderLinkedIn: true,
  generatedDoesNotEqualPublished: true,
  strongMemoryStates: ["PRESELECTED", "APPROVED", "PUBLISHED"] as const,
  shortMemoryStates: ["GENERATED", "DISCARDED"] as const,
  defaultShortMemoryDays: DEFAULT_SHORT_MEMORY_DAYS,
  generalTenMinimumDistinctDomains: GENERAL_MIN_DISTINCT_DOMAINS_FOR_TEN,
  generalTenMaximumPerPrimaryDomain: GENERAL_MAX_PER_PRIMARY_DOMAIN,
  digitalTopicsPausedByDefault: true,
  generalFormat: GENERAL_FORMAT,
  linkedinFormat: LINKEDIN_FORMAT,
  formatOverrideRequiresExplicitPolicy: true,
  tenDistinctArtStylesForIndependentGeneralPieces: true,
  linkedinMayRepeatArtisticMedium: true,
  carouselPreservesInternalVisualContinuity: true,
  visualDistanceMinimum: 5,
  visualComparisonDimensions: 8,
  nearestComparisonsPerScope: 3,
  artStyleRegistryIsOpen: true,
  contentIdentityIgnoresPresentationOnlyChanges: true,
  visualIdentityIgnoresCropAndLightingOnlyChanges: true,
  artBaseMustBeClean: true,
  typographyUsesCanonicalCompositor: true,
  logoMustBePhysicalScene: true,
  visibleBrandExact: "LegalMente",
  improvementReceiptsMustBeReversible: true,
  publicationGatesRemainExternal: true,
});
