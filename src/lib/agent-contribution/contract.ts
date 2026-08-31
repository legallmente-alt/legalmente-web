import {
  KERNEL_STATUSES,
  LEGAL_DOMAIN_IDS,
  TERRITORY_REQUIREMENTS,
  type CrossDomainRelation,
  type KernelStatus,
  type LegalDomainId,
  type VisualSemantics,
} from "@/lib/ecosystem-kernel";

export const CONTRIBUTION_STATES = [
  "RECEIVED",
  "VALIDATED",
  "WORK_IN_PROGRESS",
  "READY_FOR_REVIEW",
  "BLOCKED",
  "REJECTED",
] as const;

export type ContributionState = (typeof CONTRIBUTION_STATES)[number];

export type AssetProvenance = {
  provenanceId: string;
  basis: string;
  observedAt: string;
};

export type AgentAsset = {
  assetId: string;
  kind: string;
  provenance: AssetProvenance;
  fingerprint: string;
};

export type AgentQA = {
  check: string;
  result: "PASS" | "FAIL" | "BLOCKED";
  note: string;
};

export type ContributionProvenance = {
  provenanceId: string;
  sourceRefs: readonly string[];
  upstreamState: KernelStatus;
  recordedAt: string;
};

export type AgentContributionInput = {
  inputId: string;
  agentId: string;
  contentIds: readonly string[];
  worldIds: readonly string[];
  legalDomainIds: readonly LegalDomainId[];
  conceptIds: readonly string[];
  claimIds: readonly string[];
  sourceIds: readonly string[];
  territory?: string;
  limits: readonly string[];
  requestedWork: string;
  priorAssetFingerprints: readonly string[];
  upstreamState: KernelStatus;
};

export type AgentContributionOutput = {
  outputId: string;
  agentId: string;
  inputId: string;
  state: ContributionState;
  decisions: readonly string[];
  relations: readonly CrossDomainRelation[];
  visualSemantics: readonly VisualSemantics[];
  prompts: readonly string[];
  assets: readonly AgentAsset[];
  qa: readonly AgentQA[];
  fingerprints: readonly string[];
  blockers: readonly string[];
  nextAction: string;
  handoff: string;
  provenance: ContributionProvenance;
};

export type AgentContribution = {
  input: AgentContributionInput;
  output: AgentContributionOutput;
};

export type ContributionIssue = { path: string; message: string };
export type ContributionValidation = { ok: true; issues: readonly [] } | { ok: false; issues: readonly ContributionIssue[] };

const stateSet = new Set<string>(CONTRIBUTION_STATES);
const qaResultSet = new Set<string>(["PASS", "FAIL", "BLOCKED"]);
const kernelStatusSet = new Set<string>(KERNEL_STATUSES);
const legalDomainSet = new Set<string>(LEGAL_DOMAIN_IDS);
const territoryRequirementSet = new Set<string>(TERRITORY_REQUIREMENTS);
const contextRiskSet = new Set<string>(["LOW", "MEDIUM", "HIGH"]);
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const nonEmpty = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const nonEmptyList = (value: unknown): value is readonly string[] => Array.isArray(value) && value.length > 0 && value.every(nonEmpty);
const stringList = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(nonEmpty);
const isState = (value: unknown): value is ContributionState => typeof value === "string" && stateSet.has(value);
const isKernelStatus = (value: unknown): value is KernelStatus => typeof value === "string" && kernelStatusSet.has(value);
const isLegalDomainId = (value: unknown): value is LegalDomainId => typeof value === "string" && legalDomainSet.has(value);
const isQAResult = (value: unknown): value is AgentQA["result"] => typeof value === "string" && qaResultSet.has(value);
const issue = (path: string, message: string): ContributionIssue => ({ path, message });

const legallyDependentWork = (value: string) => /legal|juríd|derecho|claim|source|territor|contract|family|civil|tax|penal|data|evidence|prueba/i.test(value);
const forbiddenOutputKey = /^(published|publication|deploy|deployed|merge|merged|approved|approval|legalApproval|gate)$/i;
const forbiddenOutputIntent = /\b(PUBLISHED|DEPLOYED|MERGED|APPROVED|PUBLICATION|DEPLOY|MERGE|LEGAL_APPROVAL)\b/i;

function validateInput(value: unknown, issues: ContributionIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue("input", "must be an object"));
    return;
  }
  for (const field of ["inputId", "agentId", "requestedWork"] as const) {
    if (!nonEmpty(value[field])) issues.push(issue(`input.${field}`, "required"));
  }
  for (const field of ["contentIds", "worldIds", "conceptIds", "limits", "priorAssetFingerprints"] as const) {
    if (!stringList(value[field])) issues.push(issue(`input.${field}`, "must be an array of non-empty strings"));
  }
  if (!Array.isArray(value.legalDomainIds) || !value.legalDomainIds.every(isLegalDomainId)) issues.push(issue("input.legalDomainIds", "must contain only known LegalDomainId values"));
  if (!stringList(value.claimIds)) issues.push(issue("input.claimIds", "must be an array of non-empty strings"));
  if (!stringList(value.sourceIds)) issues.push(issue("input.sourceIds", "must be an array of non-empty strings"));
  if (value.territory !== undefined && !nonEmpty(value.territory)) issues.push(issue("input.territory", "must be non-empty when provided"));
  if (!isKernelStatus(value.upstreamState)) issues.push(issue("input.upstreamState", "unknown KernelStatus fails closed"));
  if (nonEmpty(value.requestedWork) && (legallyDependentWork(value.requestedWork) || (Array.isArray(value.legalDomainIds) && value.legalDomainIds.length > 0))) {
    if (!nonEmptyList(value.claimIds)) issues.push(issue("input.claimIds", "claim IDs are required for legally dependent work"));
    if (!nonEmptyList(value.sourceIds)) issues.push(issue("input.sourceIds", "source IDs are required for legally dependent work"));
  }
}

function validateRelation(value: unknown, path: string, issues: ContributionIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue(path, "must be an object"));
    return;
  }
  if (!isLegalDomainId(value.from)) issues.push(issue(`${path}.from`, "unknown LegalDomainId"));
  if (!isLegalDomainId(value.to)) issues.push(issue(`${path}.to`, "unknown LegalDomainId"));
  if (value.from === value.to) issues.push(issue(path, "self-relations are not allowed"));
  if (!nonEmpty(value.whyRelated)) issues.push(issue(`${path}.whyRelated`, "required"));
  if (!nonEmptyList(value.sharedThemes)) issues.push(issue(`${path}.sharedThemes`, "required"));
  if (typeof value.territoryRequirement !== "string" || !territoryRequirementSet.has(value.territoryRequirement)) issues.push(issue(`${path}.territoryRequirement`, "unknown territory requirement"));
  if (typeof value.contextRisk !== "string" || !contextRiskSet.has(value.contextRisk)) issues.push(issue(`${path}.contextRisk`, "unknown contextual risk"));
}

function validateVisualSemantics(value: unknown, path: string, issues: ContributionIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue(path, "must be an object"));
    return;
  }
  if (!nonEmpty(value.visualGravity)) issues.push(issue(`${path}.visualGravity`, "required"));
  for (const field of ["tensions", "preferredMetaphorFamilies", "materialCues", "spatialCues", "avoid"] as const) {
    if (!stringList(value[field])) issues.push(issue(`${path}.${field}`, "must be an array of strings"));
  }
}

function validateAsset(value: unknown, path: string, issues: ContributionIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue(path, "must be an object"));
    return;
  }
  if (!nonEmpty(value.assetId)) issues.push(issue(`${path}.assetId`, "required"));
  if (!nonEmpty(value.kind)) issues.push(issue(`${path}.kind`, "required"));
  if (!nonEmpty(value.fingerprint)) issues.push(issue(`${path}.fingerprint`, "required for every asset"));
  if (!isRecord(value.provenance)) {
    issues.push(issue(`${path}.provenance`, "required for every asset"));
    return;
  }
  if (!nonEmpty(value.provenance.provenanceId)) issues.push(issue(`${path}.provenance.provenanceId`, "required"));
  if (!nonEmpty(value.provenance.basis)) issues.push(issue(`${path}.provenance.basis`, "required"));
  if (!nonEmpty(value.provenance.observedAt)) issues.push(issue(`${path}.provenance.observedAt`, "required"));
}

function validateOutput(value: unknown, input: Record<string, unknown>, issues: ContributionIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue("output", "must be an object"));
    return;
  }
  for (const key of Object.keys(value)) if (forbiddenOutputKey.test(key)) issues.push(issue(`output.${key}`, "publication, deploy, merge and legal approval fields are forbidden"));
  for (const field of ["outputId", "agentId", "inputId", "nextAction", "handoff"] as const) {
    if (!nonEmpty(value[field])) issues.push(issue(`output.${field}`, "required"));
  }
  if (!isState(value.state)) issues.push(issue("output.state", "unknown ContributionState fails closed"));
  if (!stringList(value.decisions)) issues.push(issue("output.decisions", "must be an array of strings"));
  if (!Array.isArray(value.relations)) issues.push(issue("output.relations", "must be an array"));
  else value.relations.forEach((relation, index) => validateRelation(relation, `output.relations[${index}]`, issues));
  if (!Array.isArray(value.visualSemantics)) issues.push(issue("output.visualSemantics", "must be an array"));
  else value.visualSemantics.forEach((semantics, index) => validateVisualSemantics(semantics, `output.visualSemantics[${index}]`, issues));
  if (!stringList(value.prompts)) issues.push(issue("output.prompts", "must be an array of strings"));
  if (!Array.isArray(value.assets)) issues.push(issue("output.assets", "must be an array"));
  if (!Array.isArray(value.qa)) issues.push(issue("output.qa", "must be an array"));
  if (!stringList(value.fingerprints)) issues.push(issue("output.fingerprints", "must be an array of strings"));
  if (!stringList(value.blockers)) issues.push(issue("output.blockers", "must be an array of strings"));
  if (!isRecord(value.provenance)) issues.push(issue("output.provenance", "required"));
  else {
    if (!nonEmpty(value.provenance.provenanceId)) issues.push(issue("output.provenance.provenanceId", "required"));
    if (!stringList(value.provenance.sourceRefs)) issues.push(issue("output.provenance.sourceRefs", "must be an array of source references"));
    if (!isKernelStatus(value.provenance.upstreamState)) issues.push(issue("output.provenance.upstreamState", "unknown KernelStatus fails closed"));
    if (!nonEmpty(value.provenance.recordedAt)) issues.push(issue("output.provenance.recordedAt", "required"));
  }
  if (Array.isArray(value.assets)) value.assets.forEach((asset, index) => validateAsset(asset, `output.assets[${index}]`, issues));
  if (Array.isArray(value.qa)) value.qa.forEach((qa, index) => {
    const path = `output.qa[${index}]`;
    if (!isRecord(qa)) issues.push(issue(path, "must be an object"));
    else {
      if (!nonEmpty(qa.check)) issues.push(issue(`${path}.check`, "required"));
      if (!isQAResult(qa.result)) issues.push(issue(`${path}.result`, "unknown QA result fails closed"));
      if (!nonEmpty(qa.note)) issues.push(issue(`${path}.note`, "required"));
    }
  });
  if (isState(value.state) && (value.state === "BLOCKED" || value.state === "REJECTED") && !stringList(value.blockers)) issues.push(issue("output.blockers", "blocked/rejected output requires blockers"));
  if (isState(value.state) && value.state !== "REJECTED" && !nonEmpty(value.nextAction)) issues.push(issue("output.nextAction", "non-final work requires nextAction"));
  if (isKernelStatus(input.upstreamState) && (input.upstreamState === "HOLD_SOURCE" || input.upstreamState === "UNKNOWN") && value.state !== "BLOCKED") issues.push(issue("output.state", "HOLD_SOURCE/UNKNOWN upstream input requires BLOCKED output"));
  for (const field of ["decisions", "prompts", "blockers", "nextAction", "handoff"] as const) {
    const candidate = value[field];
    if (Array.isArray(candidate) && candidate.some((item) => typeof item === "string" && forbiddenOutputIntent.test(item))) issues.push(issue(`output.${field}`, "publication, deploy, merge and approval intent is forbidden"));
    if (typeof candidate === "string" && forbiddenOutputIntent.test(candidate)) issues.push(issue(`output.${field}`, "publication, deploy, merge and approval intent is forbidden"));
  }
}

/** Public trust-boundary entrypoint for external agent contribution data. */
export function validateAgentContribution(input: unknown): ContributionValidation {
  const issues: ContributionIssue[] = [];
  if (!isRecord(input)) return { ok: false, issues: [issue("contribution", "must be an object")] };
  validateInput(input.input, issues);
  validateOutput(input.output, isRecord(input.input) ? input.input : {}, issues);
  if (isRecord(input.input) && isRecord(input.output) && nonEmpty(input.input.inputId) && nonEmpty(input.output.inputId) && input.input.inputId !== input.output.inputId) issues.push(issue("output.inputId", "must match input.inputId"));
  if (isRecord(input.input) && isRecord(input.output) && nonEmpty(input.input.agentId) && nonEmpty(input.output.agentId) && input.input.agentId !== input.output.agentId) issues.push(issue("output.agentId", "must match input.agentId"));
  return issues.length === 0 ? { ok: true, issues: [] } : { ok: false, issues };
}

export function assertAgentContribution(input: AgentContribution): void {
  const result = validateAgentContribution(input);
  if (!result.ok) throw new Error(`Agent Contribution validation failed: ${result.issues.map(({ path, message }) => `${path}: ${message}`).join("; ")}`);
}
