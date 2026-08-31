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

export type LegalDomainId = (typeof LEGAL_DOMAIN_IDS)[number];
export type KernelStatus = "ACTIVE" | "DRAFT" | "HOLD_SOURCE" | "UNKNOWN";
export type VisualOutputState = "DRAFT" | "HOLD_SOURCE" | "UNKNOWN" | "READY_FOR_VISUAL" | "CURATION_READY" | "NOT_PUBLISHED";
export type KernelRisk = "LOW" | "MEDIUM" | "HIGH";

export type VisualSemantics = {
  gravity: string;
  tensions: readonly string[];
  preferredMetaphorFamilies: readonly string[];
  materialCues: readonly string[];
  spatialCues: readonly string[];
  avoid: readonly string[];
};

export type LegalDomainProfile = {
  id: LegalDomainId;
  label: string;
  status: KernelStatus;
  description: string;
  visualSemantics?: VisualSemantics;
};

export type CrossDomainRelation = {
  from: LegalDomainId;
  to: LegalDomainId;
  whyRelated: string;
  sharedThemes: readonly string[];
  territoryRequired: boolean;
  risk: KernelRisk;
};

export type VisualProductionEnvelope = {
  contentId: string;
  humanQuestion: string;
  worldIds: readonly string[];
  legalDomainIds: readonly LegalDomainId[];
  conceptIds: readonly string[];
  claimIds: readonly string[];
  sourceIds: readonly string[];
  territory?: string;
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
const nonEmpty = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const nonEmptyList = (value: unknown): value is readonly string[] => Array.isArray(value) && value.length > 0 && value.every(nonEmpty);
const isLegalDomainId = (value: unknown): value is LegalDomainId => typeof value === "string" && legalDomainSet.has(value);
const issue = (path: string, message: string): KernelIssue => ({ path, message });

function validateVisualSemantics(value: unknown, path: string, issues: KernelIssue[]) {
  if (!value || typeof value !== "object") {
    issues.push(issue(path, "active domain requires VisualSemantics"));
    return;
  }
  const semantics = value as Partial<VisualSemantics>;
  for (const field of ["tensions", "preferredMetaphorFamilies", "materialCues", "spatialCues", "avoid"] as const) {
    if (!Array.isArray(semantics[field]) || !semantics[field].every(nonEmpty)) {
      issues.push(issue(`${path}.${field}`, "must be an array of non-empty strings"));
    }
  }
  if (!nonEmpty(semantics.gravity)) issues.push(issue(`${path}.gravity`, "must be non-empty"));
}

function validateEnvelope(envelope: VisualProductionEnvelope, issues: KernelIssue[]) {
  if (!nonEmpty(envelope.contentId)) issues.push(issue("envelope.contentId", "required"));
  if (!nonEmpty(envelope.humanQuestion)) issues.push(issue("envelope.humanQuestion", "required"));
  if (!nonEmptyList(envelope.worldIds)) issues.push(issue("envelope.worldIds", "at least one world binding is required"));
  if (!nonEmptyList(envelope.legalDomainIds) || !envelope.legalDomainIds.every(isLegalDomainId)) issues.push(issue("envelope.legalDomainIds", "must contain only known legal domains"));
  if (!nonEmptyList(envelope.conceptIds)) issues.push(issue("envelope.conceptIds", "at least one concept binding is required"));
  if (!nonEmptyList(envelope.claimIds)) issues.push(issue("envelope.claimIds", "claim is required before READY_FOR_VISUAL"));
  if (!nonEmptyList(envelope.sourceIds)) issues.push(issue("envelope.sourceIds", "source is required before READY_FOR_VISUAL"));
  if (!nonEmptyList(envelope.limits)) issues.push(issue("envelope.limits", "limits are required before READY_FOR_VISUAL"));
  if (!nonEmpty(envelope.format)) issues.push(issue("envelope.format", "required"));
  if (!nonEmpty(envelope.exactCopy)) issues.push(issue("envelope.exactCopy", "exact copy is required before READY_FOR_VISUAL"));
  if (!nonEmpty(envelope.visualTension)) issues.push(issue("envelope.visualTension", "required"));
  if (!nonEmptyList(envelope.metaphorCandidates)) issues.push(issue("envelope.metaphorCandidates", "at least one metaphor candidate is required"));
  if (!Array.isArray(envelope.recentAssetFingerprints) || !envelope.recentAssetFingerprints.every(nonEmpty)) issues.push(issue("envelope.recentAssetFingerprints", "must be an array of strings"));
  if (envelope.outputState === "HOLD_SOURCE" || envelope.outputState === "UNKNOWN") issues.push(issue("envelope.outputState", "HOLD_SOURCE and UNKNOWN fail closed"));
  if (envelope.outputState === "READY_FOR_VISUAL" && (!nonEmpty(envelope.territory) && envelope.legalDomainIds.some((domain) => domain === "TAX" || domain === "LABOR" || domain === "PENAL" || domain === "FAMILY"))) {
    issues.push(issue("envelope.territory", "territory is required for this domain context"));
  }
}

export function validateEcosystemKernel(input: EcosystemKernelInput): KernelValidation {
  const issues: KernelIssue[] = [];
  if (!input || !Array.isArray(input.domains) || !Array.isArray(input.relations)) return { ok: false, issues: [issue("kernel", "domains and relations are required arrays")] };

  const seenDomains = new Set<string>();
  input.domains.forEach((domain, position) => {
    const path = `domains[${position}]`;
    if (!isLegalDomainId(domain.id)) issues.push(issue(`${path}.id`, "unknown legal domain"));
    if (seenDomains.has(domain.id)) issues.push(issue(`${path}.id`, "duplicate legal domain"));
    seenDomains.add(domain.id);
    if (!nonEmpty(domain.label)) issues.push(issue(`${path}.label`, "required"));
    if (!nonEmpty(domain.description)) issues.push(issue(`${path}.description`, "required"));
    if (!isLegalDomainId(domain.id)) return;
    if (domain.status === "ACTIVE") validateVisualSemantics(domain.visualSemantics, `${path}.visualSemantics`, issues);
  });

  input.relations.forEach((relation, position) => {
    const path = `relations[${position}]`;
    if (!isLegalDomainId(relation.from)) issues.push(issue(`${path}.from`, "unknown domain"));
    if (!isLegalDomainId(relation.to)) issues.push(issue(`${path}.to`, "unknown domain"));
    if (relation.from === relation.to) issues.push(issue(path, "self-relations are not allowed"));
    if (!nonEmpty(relation.whyRelated)) issues.push(issue(`${path}.whyRelated`, "required"));
    if (!nonEmptyList(relation.sharedThemes)) issues.push(issue(`${path}.sharedThemes`, "at least one shared theme is required"));
  });

  if (input.envelope) validateEnvelope(input.envelope, issues);
  return issues.length === 0 ? { ok: true, issues: [] } : { ok: false, issues };
}

export function assertEcosystemKernel(input: EcosystemKernelInput): asserts input is EcosystemKernelInput {
  const result = validateEcosystemKernel(input);
  if (!result.ok) throw new Error(`Ecosystem Kernel validation failed: ${result.issues.map(({ path, message }) => `${path}: ${message}`).join("; ")}`);
}
