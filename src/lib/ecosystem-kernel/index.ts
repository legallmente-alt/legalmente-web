export const LEGAL_DOMAIN_IDS = [
  "CIVIL",
  "FAMILY",
  "MERCANTILE",
  "CORPORATE",
  "CONTRACTS",
  "PENAL",
  "TAX",
  "NOTARIAL",
  "AGRARIAN",
  "LABOR",
  "ADMINISTRATIVE",
  "PROCEDURE_EVIDENCE",
  "DIGITAL_DATA_AI",
  "REAL_ESTATE_PROPERTY",
  "INTELLECTUAL_PROPERTY",
] as const;

export const KERNEL_STATUSES = ["ACTIVE", "DRAFT", "HOLD_SOURCE", "UNKNOWN"] as const;
export const VISUAL_OUTPUT_STATES = ["DRAFT", "HOLD_SOURCE", "UNKNOWN", "READY_FOR_VISUAL", "CURATION_READY", "NOT_PUBLISHED"] as const;
export const TERRITORY_REQUIREMENTS = ["REQUIRED", "OPTIONAL", "NOT_APPLICABLE"] as const;

export type LegalDomainId = (typeof LEGAL_DOMAIN_IDS)[number];
export type KernelStatus = (typeof KERNEL_STATUSES)[number];
export type VisualOutputState = (typeof VISUAL_OUTPUT_STATES)[number];
export type TerritoryRequirement = (typeof TERRITORY_REQUIREMENTS)[number];
export type KernelRisk = "LOW" | "MEDIUM" | "HIGH";

/** Auxiliary visual direction only; never a legal authority, rule, or source. */
export type VisualSemantics = {
  visualGravity: string;
  tensions: readonly string[];
  preferredMetaphorFamilies: readonly string[];
  materialCues: readonly string[];
  spatialCues: readonly string[];
  avoid: readonly string[];
};

/** Auxiliary domain context only; never a canonical legal taxonomy. */
export type LegalDomainProfile = {
  id: LegalDomainId;
  label: string;
  status: KernelStatus;
  description: string;
  visualSemantics?: VisualSemantics;
};

/** Contextual navigation only; never a claim, source, rule, or legal evaluation. */
export type CrossDomainRelation = {
  from: LegalDomainId;
  to: LegalDomainId;
  whyRelated: string;
  sharedThemes: readonly string[];
  territoryRequirement: TerritoryRequirement;
  contextRisk: KernelRisk;
};

/** Provider-neutral transport envelope; it carries opaque bindings and has no side effects. */
export type VisualProductionEnvelope = {
  contentId: string;
  humanQuestion: string;
  worldIds: readonly string[];
  legalDomainIds: readonly LegalDomainId[];
  conceptIds: readonly string[];
  claimIds: readonly string[];
  sourceIds: readonly string[];
  territory?: string;
  territoryRequirement: TerritoryRequirement;
  limits: readonly string[];
  format: string;
  exactCopy: string;
  visualTension: string;
  metaphorCandidates: readonly string[];
  recentAssetFingerprints: readonly string[];
  outputState: VisualOutputState;
};

export type EcosystemKernelInput = {
  domains: readonly LegalDomainProfile[];
  relations: readonly CrossDomainRelation[];
  envelope?: VisualProductionEnvelope;
};

export type KernelIssue = { path: string; message: string };
export type KernelValidation = { ok: true; issues: readonly [] } | { ok: false; issues: readonly KernelIssue[] };

const legalDomainSet = new Set<string>(LEGAL_DOMAIN_IDS);
const kernelStatusSet = new Set<string>(KERNEL_STATUSES);
const visualOutputStateSet = new Set<string>(VISUAL_OUTPUT_STATES);
const territoryRequirementSet = new Set<string>(TERRITORY_REQUIREMENTS);
const kernelRiskSet = new Set<string>(["LOW", "MEDIUM", "HIGH"]);
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const nonEmpty = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const nonEmptyList = (value: unknown): value is readonly string[] => Array.isArray(value) && value.length > 0 && value.every(nonEmpty);
const stringList = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(nonEmpty);
const isLegalDomainId = (value: unknown): value is LegalDomainId => typeof value === "string" && legalDomainSet.has(value);
const isKernelStatus = (value: unknown): value is KernelStatus => typeof value === "string" && kernelStatusSet.has(value);
const isVisualOutputState = (value: unknown): value is VisualOutputState => typeof value === "string" && visualOutputStateSet.has(value);
const isTerritoryRequirement = (value: unknown): value is TerritoryRequirement => typeof value === "string" && territoryRequirementSet.has(value);
const isKernelRisk = (value: unknown): value is KernelRisk => typeof value === "string" && kernelRiskSet.has(value);
const issue = (path: string, message: string): KernelIssue => ({ path, message });

function validateVisualSemantics(value: unknown, path: string, issues: KernelIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue(path, "active domain requires VisualSemantics"));
    return;
  }
  for (const field of ["tensions", "preferredMetaphorFamilies", "materialCues", "spatialCues", "avoid"] as const) {
    if (!stringList(value[field])) issues.push(issue(`${path}.${field}`, "must be an array of non-empty strings"));
  }
  if (!nonEmpty(value.visualGravity)) issues.push(issue(`${path}.visualGravity`, "must be non-empty"));
}

function validateEnvelope(value: unknown, issues: KernelIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue("envelope", "must be an object"));
    return;
  }
  if (!nonEmpty(value.contentId)) issues.push(issue("envelope.contentId", "required"));
  if (!nonEmpty(value.humanQuestion)) issues.push(issue("envelope.humanQuestion", "required"));
  if (!nonEmptyList(value.worldIds)) issues.push(issue("envelope.worldIds", "at least one world binding is required"));
  if (!nonEmptyList(value.legalDomainIds) || !value.legalDomainIds.every(isLegalDomainId)) issues.push(issue("envelope.legalDomainIds", "must contain only known legal domains"));
  if (!nonEmptyList(value.conceptIds)) issues.push(issue("envelope.conceptIds", "at least one concept binding is required"));
  if (!nonEmptyList(value.claimIds)) issues.push(issue("envelope.claimIds", "claim binding is required before READY_FOR_VISUAL"));
  if (!nonEmptyList(value.sourceIds)) issues.push(issue("envelope.sourceIds", "source binding is required before READY_FOR_VISUAL"));
  if (!isTerritoryRequirement(value.territoryRequirement)) issues.push(issue("envelope.territoryRequirement", "must be REQUIRED, OPTIONAL or NOT_APPLICABLE"));
  if (value.territoryRequirement === "REQUIRED" && !nonEmpty(value.territory)) issues.push(issue("envelope.territory", "required by upstream territorial signal"));
  if (!nonEmptyList(value.limits)) issues.push(issue("envelope.limits", "limits are required before READY_FOR_VISUAL"));
  if (!nonEmpty(value.format)) issues.push(issue("envelope.format", "required"));
  if (!nonEmpty(value.exactCopy)) issues.push(issue("envelope.exactCopy", "exact copy is required before READY_FOR_VISUAL"));
  if (!nonEmpty(value.visualTension)) issues.push(issue("envelope.visualTension", "required"));
  if (!nonEmptyList(value.metaphorCandidates)) issues.push(issue("envelope.metaphorCandidates", "at least one metaphor candidate is required"));
  if (!stringList(value.recentAssetFingerprints)) issues.push(issue("envelope.recentAssetFingerprints", "must be an array of non-empty strings"));
  if (!isVisualOutputState(value.outputState)) issues.push(issue("envelope.outputState", "unknown VisualOutputState fails closed"));
  else if (value.outputState === "HOLD_SOURCE" || value.outputState === "UNKNOWN") issues.push(issue("envelope.outputState", "HOLD_SOURCE and UNKNOWN fail closed"));
}

/** Public trust-boundary entrypoint. Unknown or malformed data always returns structured issues. */
export function validateEcosystemKernel(input: unknown): KernelValidation {
  const issues: KernelIssue[] = [];
  if (!isRecord(input)) return { ok: false, issues: [issue("kernel", "must be an object")] };
  if (!Array.isArray(input.domains)) issues.push(issue("domains", "must be an array"));
  if (!Array.isArray(input.relations)) issues.push(issue("relations", "must be an array"));
  if (issues.length > 0) return { ok: false, issues };

  const domains = input.domains as unknown[];
  const relations = input.relations as unknown[];
  const seenDomains = new Set<string>();
  domains.forEach((value: unknown, position: number) => {
    const path = `domains[${position}]`;
    if (!isRecord(value)) {
      issues.push(issue(path, "must be an object"));
      return;
    }
    if (!isLegalDomainId(value.id)) issues.push(issue(`${path}.id`, "unknown LegalDomainId"));
    else if (seenDomains.has(value.id)) issues.push(issue(`${path}.id`, "duplicate LegalDomainId"));
    if (typeof value.id === "string") seenDomains.add(value.id);
    if (!isKernelStatus(value.status)) issues.push(issue(`${path}.status`, "unknown KernelStatus"));
    if (!nonEmpty(value.label)) issues.push(issue(`${path}.label`, "required"));
    if (!nonEmpty(value.description)) issues.push(issue(`${path}.description`, "required"));
    if (value.status === "ACTIVE") validateVisualSemantics(value.visualSemantics, `${path}.visualSemantics`, issues);
  });

  relations.forEach((value: unknown, position: number) => {
    const path = `relations[${position}]`;
    if (!isRecord(value)) {
      issues.push(issue(path, "must be an object"));
      return;
    }
    if (!isLegalDomainId(value.from)) issues.push(issue(`${path}.from`, "unknown LegalDomainId"));
    if (!isLegalDomainId(value.to)) issues.push(issue(`${path}.to`, "unknown LegalDomainId"));
    if (value.from === value.to) issues.push(issue(path, "self-relations are not allowed"));
    if (!nonEmpty(value.whyRelated)) issues.push(issue(`${path}.whyRelated`, "required"));
    if (!nonEmptyList(value.sharedThemes)) issues.push(issue(`${path}.sharedThemes`, "at least one shared theme is required"));
    if (!isTerritoryRequirement(value.territoryRequirement)) issues.push(issue(`${path}.territoryRequirement`, "must be REQUIRED, OPTIONAL or NOT_APPLICABLE"));
    if (!isKernelRisk(value.contextRisk)) issues.push(issue(`${path}.contextRisk`, "must be LOW, MEDIUM or HIGH"));
  });

  if (input.envelope !== undefined) validateEnvelope(input.envelope, issues);
  return issues.length === 0 ? { ok: true, issues: [] } : { ok: false, issues };
}

/** Internal convenience helper for callers that already hold a typed object. */
export function assertEcosystemKernel(input: EcosystemKernelInput): void {
  const result = validateEcosystemKernel(input);
  if (!result.ok) throw new Error(`Ecosystem Kernel validation failed: ${result.issues.map(({ path, message }) => `${path}: ${message}`).join("; ")}`);
}
