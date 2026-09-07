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
  framing: string;
  composition: string;
  brandObject: string;
  visibleBrand: string;
  brandIntegration: BrandIntegrationMode;
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
};

export type ProductionPolicyResult = {
  ok: boolean;
  errors: readonly string[];
  contentFingerprints: readonly string[];
  visualFingerprints: readonly string[];
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
const GENERAL_MAX_DIGITAL_PIECES = 1;
const DIGITAL_DOMAIN_ID = "DIGITAL_DATA_AI";

const normalize = (value: string): string => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const nonEmpty = (value: string | undefined): value is string => typeof value === "string" && value.trim().length > 0;
const nonEmptyList = (value: readonly string[] | undefined): value is readonly string[] => Array.isArray(value) && value.length > 0 && value.every(nonEmpty);

export function productionContentFingerprint(piece: ProductionPiece): string {
  return [
    piece.legalDomainIds.join(","),
    piece.entryDoor,
    piece.topic,
    piece.angle,
    piece.legalRelation,
    piece.hook,
  ].map(normalize).join("|");
}

export function productionVisualFingerprint(piece: ProductionPiece): string {
  return [
    piece.artisticStyle,
    piece.visualMetaphor,
    piece.scenario,
    piece.material,
    piece.lighting,
    piece.framing,
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
  // Invalid timestamps fail conservatively: a recent generated/discarded item
  // should not silently disappear from anti-repetition memory.
  if (age === null) return true;
  return age <= shortMemoryDays;
}

function primaryDomain(piece: ProductionPiece): string {
  return piece.legalDomainIds[0] ?? "";
}

function validatePiece(piece: ProductionPiece, mode: ProductionMode, errors: string[]): void {
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
    framing: piece.framing,
    composition: piece.composition,
    brandObject: piece.brandObject,
  })) {
    if (!nonEmpty(value)) errors.push(`${piece.id || "UNKNOWN"}: ${field} is required.`);
  }

  if (piece.visibleBrand !== "LegalMente") {
    errors.push(`${piece.id}: visible brand must be exactly LegalMente.`);
  }
  if (piece.brandIntegration !== "PHYSICAL_SCENE") {
    errors.push(`${piece.id}: LegalMente must be physically integrated into the scene, never overlay/watermark/floating.`);
  }
  if (/entretenimiento/i.test(piece.matterLabel) || /entretenimiento/i.test(piece.topicLabel) || /entretenimiento/i.test(piece.visibleBrand)) {
    errors.push(`${piece.id}: entretenimiento is not part of the visible LegalMente brand.`);
  }

  if ((mode === "LINKEDIN_LEGALMENTE" || mode === "LINKEDIN_FOUNDER") && !nonEmptyList(piece.sourceIds)) {
    errors.push(`${piece.id}: LinkedIn production requires at least one source binding before review.`);
  }
}

function validateGeneralBatch(pieces: readonly ProductionPiece[], expectedSize: number, errors: string[]): void {
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
  if (digitalCount > GENERAL_MAX_DIGITAL_PIECES) {
    errors.push(`General batch overweights ${DIGITAL_DOMAIN_ID}: maximum ${GENERAL_MAX_DIGITAL_PIECES} unless explicitly requested.`);
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
  const expectedSize = policy.expectedSize ?? 10;
  const now = policy.now ?? new Date().toISOString();
  const shortMemoryDays = policy.shortMemoryDays ?? DEFAULT_SHORT_MEMORY_DAYS;

  if (pieces.length !== expectedSize) {
    errors.push(`Expected ${expectedSize} pieces; received ${pieces.length}.`);
  }

  pieces.forEach((piece) => validatePiece(piece, policy.mode, errors));

  if (policy.mode === "LEGALMENTE_GENERAL") validateGeneralBatch(pieces, expectedSize, errors);

  if (policy.mode === "SPECIFIC_DOMAIN") {
    if (!nonEmpty(policy.requestedDomainId)) {
      errors.push("SPECIFIC_DOMAIN mode requires requestedDomainId.");
    } else {
      pieces.forEach((piece) => {
        if (!piece.legalDomainIds.includes(policy.requestedDomainId!)) {
          errors.push(`${piece.id}: does not belong to requested domain ${policy.requestedDomainId}.`);
        }
      });
    }
  }

  const contentFingerprints = pieces.map(productionContentFingerprint);
  const visualFingerprints = pieces.map(productionVisualFingerprint);

  if (new Set(contentFingerprints).size !== contentFingerprints.length) {
    errors.push("Batch contains repeated editorial substance.");
  }
  if (new Set(visualFingerprints).size !== visualFingerprints.length) {
    errors.push("Batch contains a repeated visual composition fingerprint.");
  }

  if (pieces.length === 10 && new Set(pieces.map((piece) => normalize(piece.artisticStyle))).size !== 10) {
    errors.push("A 10-piece batch must use 10 distinct dominant artistic styles.");
  }

  const activeHistory = history.filter((item) => historyItemIsActive(item, now, shortMemoryDays));
  const activeContent = new Set(activeHistory.map(productionContentFingerprint));
  const activeVisual = new Set(activeHistory.map(productionVisualFingerprint));

  pieces.forEach((piece, index) => {
    if (activeContent.has(contentFingerprints[index])) {
      errors.push(`${piece.id}: editorial substance is still active in anti-repetition memory.`);
    }
    if (activeVisual.has(visualFingerprints[index])) {
      errors.push(`${piece.id}: visual solution is still active in anti-repetition memory.`);
    }
  });

  return {
    ok: errors.length === 0,
    errors,
    contentFingerprints,
    visualFingerprints,
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

/**
 * Agents may propose improvements, but the proposal must be traceable and
 * reversible. This validates the minimum receipt required by the Founder rule.
 */
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
  generalTenMaximumDigitalPieces: GENERAL_MAX_DIGITAL_PIECES,
  tenDistinctArtStyles: true,
  artStyleRegistryIsOpen: true,
  logoMustBePhysicalScene: true,
  visibleBrandExact: "LegalMente",
  improvementReceiptsMustBeReversible: true,
  publicationGatesRemainExternal: true,
});
