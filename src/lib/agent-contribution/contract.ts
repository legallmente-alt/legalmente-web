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
export type BindingRequirement = (typeof TERRITORY_REQUIREMENTS)[number];

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
  bindingRequirement: BindingRequirement;
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
  nextAction?: string;
  handoff?: string;
  provenance: ContributionProvenance;
};

export type AgentContribution = {
  input: AgentContributionInput;
  output: AgentContributionOutput;
};

export type ContributionIssue = { path: string; message: string };
export type ContributionValidation = { ok: true; issues: readonly [] } | { ok: false; issues: readonly ContributionIssue[] };

const inputKeys = new Set(["inputId", "agentId", "contentIds", "worldIds", "legalDomainIds", "conceptIds", "claimIds", "sourceIds", "territory", "limits", "requestedWork", "priorAssetFingerprints", "upstreamState", "bindingRequirement"]);
const outputKeys = new Set(["outputId", "agentId", "inputId", "state", "decisions", "relations", "visualSemantics", "prompts", "assets", "qa", "fingerprints", "blockers", "nextAction", "handoff", "provenance"]);
const assetKeys = new Set(["assetId", "kind", "provenance", "fingerprint"]);
const provenanceKeys = new Set(["provenanceId", "basis", "observedAt"]);
const qaKeys = new Set(["check", "result", "note"]);
const contributionProvenanceKeys = new Set(["provenanceId", "sourceRefs", "upstreamState", "recordedAt"]);
const relationKeys = new Set(["from", "to", "whyRelated", "sharedThemes", "territoryRequirement", "contextRisk"]);
const visualSemanticsKeys = new Set(["visualGravity", "tensions", "preferredMetaphorFamilies", "materialCues", "spatialCues", "avoid"]);
const rootKeys = new Set(["input", "output"]);
const stateSet = new Set<string>(CONTRIBUTION_STATES);
const qaResultSet = new Set<string>(["PASS", "FAIL", "BLOCKED"]);
const kernelStatusSet = new Set<string>(KERNEL_STATUSES);
const legalDomainSet = new Set<string>(LEGAL_DOMAIN_IDS);
const territoryRequirementSet = new Set<string>(TERRITORY_REQUIREMENTS);
const contextRiskSet = new Set<string>(["LOW", "MEDIUM", "HIGH"]);
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const nonEmpty = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const stringList = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(nonEmpty);
const nonEmptyList = (value: unknown): value is readonly string[] => stringList(value) && value.length > 0;
const isState = (value: unknown): value is ContributionState => typeof value === "string" && stateSet.has(value);
const isKernelStatus = (value: unknown): value is KernelStatus => typeof value === "string" && kernelStatusSet.has(value);
const isLegalDomainId = (value: unknown): value is LegalDomainId => typeof value === "string" && legalDomainSet.has(value);
const isBindingRequirement = (value: unknown): value is BindingRequirement => typeof value === "string" && territoryRequirementSet.has(value);
const isQAResult = (value: unknown): value is AgentQA["result"] => typeof value === "string" && qaResultSet.has(value);
const issue = (path: string, message: string): ContributionIssue => ({ path, message });

function rejectUnknownKeys(value: Record<string, unknown>, allowed: Set<string>, path: string, issues: ContributionIssue[]) {
  for (const key of Object.keys(value)) if (!allowed.has(key)) issues.push(issue(`${path}.${key}`, "unknown key is not allowed by the closed schema"));
}

function validateVisualSemantics(value: unknown, path: string, issues: ContributionIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue(path, "must be an object"));
    return;
  }
  rejectUnknownKeys(value, visualSemanticsKeys, path, issues);
  if (!nonEmpty(value.visualGravity)) issues.push(issue(`${path}.visualGravity`, "required"));
  for (const field of ["tensions", "preferredMetaphorFamilies", "materialCues", "spatialCues", "avoid"] as const) {
    if (!stringList(value[field])) issues.push(issue(`${path}.${field}`, "must be an array of strings"));
  }
}

function validateRelation(value: unknown, path: string, issues: ContributionIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue(path, "must be an object"));
    return;
  }
  rejectUnknownKeys(value, relationKeys, path, issues);
  if (!isLegalDomainId(value.from)) issues.push(issue(`${path}.from`, "unknown LegalDomainId"));
  if (!isLegalDomainId(value.to)) issues.push(issue(`${path}.to`, "unknown LegalDomainId"));
  if (value.from === value.to) issues.push(issue(path, "self-relations are not allowed"));
  if (!nonEmpty(value.whyRelated)) issues.push(issue(`${path}.whyRelated`, "required"));
  if (!nonEmptyList(value.sharedThemes)) issues.push(issue(`${path}.sharedThemes`, "required"));
  if (!isBindingRequirement(value.territoryRequirement)) issues.push(issue(`${path}.territoryRequirement`, "unknown territory requirement"));
  if (typeof value.contextRisk !== "string" || !contextRiskSet.has(value.contextRisk)) issues.push(issue(`${path}.contextRisk`, "unknown contextual risk"));
}

function validateAsset(value: unknown, path: string, issues: ContributionIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue(path, "must be an object"));
    return;
  }
  rejectUnknownKeys(value, assetKeys, path, issues);
  if (!nonEmpty(value.assetId)) issues.push(issue(`${path}.assetId`, "required"));
  if (!nonEmpty(value.kind)) issues.push(issue(`${path}.kind`, "required"));
  if (!nonEmpty(value.fingerprint)) issues.push(issue(`${path}.fingerprint`, "required for every asset"));
  if (!isRecord(value.provenance)) {
    issues.push(issue(`${path}.provenance`, "required for every asset"));
    return;
  }
  rejectUnknownKeys(value.provenance, provenanceKeys, `${path}.provenance`, issues);
  if (!nonEmpty(value.provenance.provenanceId)) issues.push(issue(`${path}.provenance.provenanceId`, "required"));
  if (!nonEmpty(value.provenance.basis)) issues.push(issue(`${path}.provenance.basis`, "required"));
  if (!nonEmpty(value.provenance.observedAt)) issues.push(issue(`${path}.provenance.observedAt`, "required"));
}

function validateInput(value: unknown, issues: ContributionIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue("input", "must be an object"));
    return;
  }
  rejectUnknownKeys(value, inputKeys, "input", issues);
  for (const field of ["inputId", "agentId", "requestedWork"] as const) {
    if (!nonEmpty(value[field])) issues.push(issue(`input.${field}`, "required"));
  }
  for (const field of ["contentIds", "worldIds", "conceptIds", "limits", "priorAssetFingerprints", "claimIds", "sourceIds"] as const) {
    if (!stringList(value[field])) issues.push(issue(`input.${field}`, "must be an array of non-empty strings"));
  }
  if (!Array.isArray(value.legalDomainIds) || !value.legalDomainIds.every(isLegalDomainId)) issues.push(issue("input.legalDomainIds", "must contain only known LegalDomainId values"));
  if (value.territory !== undefined && !nonEmpty(value.territory)) issues.push(issue("input.territory", "must be non-empty when provided"));
  if (!isKernelStatus(value.upstreamState)) issues.push(issue("input.upstreamState", "unknown KernelStatus fails closed"));
  if (!isBindingRequirement(value.bindingRequirement)) issues.push(issue("input.bindingRequirement", "must be REQUIRED, OPTIONAL or NOT_APPLICABLE"));
  if (value.bindingRequirement === "REQUIRED") {
    if (!nonEmptyList(value.claimIds)) issues.push(issue("input.claimIds", "claim IDs are required by upstream bindingRequirement"));
    if (!nonEmptyList(value.sourceIds)) issues.push(issue("input.sourceIds", "source IDs are required by upstream bindingRequirement"));
  }
  if (value.bindingRequirement === "NOT_APPLICABLE" && (nonEmptyList(value.claimIds) || nonEmptyList(value.sourceIds))) issues.push(issue("input.bindingRequirement", "NOT_APPLICABLE cannot carry claim/source bindings"));
}

function validateOutput(value: unknown, input: Record<string, unknown>, issues: ContributionIssue[]) {
  if (!isRecord(value)) {
    issues.push(issue("output", "must be an object"));
    return;
  }
  rejectUnknownKeys(value, outputKeys, "output", issues);
  for (const field of ["outputId", "agentId", "inputId"] as const) if (!nonEmpty(value[field])) issues.push(issue(`output.${field}`, "required"));
  if (!isState(value.state)) issues.push(issue("output.state", "unknown ContributionState fails closed"));
  if (!stringList(value.decisions)) issues.push(issue("output.decisions", "must be an array of strings"));
  if (!Array.isArray(value.relations)) issues.push(issue("output.relations", "must be an array"));
  else value.relations.forEach((relation, index) => validateRelation(relation, `output.relations[${index}]`, issues));
  if (!Array.isArray(value.visualSemantics)) issues.push(issue("output.visualSemantics", "must be an array"));
  else value.visualSemantics.forEach((semantics, index) => validateVisualSemantics(semantics, `output.visualSemantics[${index}]`, issues));
  if (!stringList(value.prompts)) issues.push(issue("output.prompts", "must be an array of strings"));
  if (!Array.isArray(value.assets)) issues.push(issue("output.assets", "must be an array"));
  else value.assets.forEach((asset, index) => validateAsset(asset, `output.assets[${index}]`, issues));
  if (!Array.isArray(value.qa)) issues.push(issue("output.qa", "must be an array"));
  else value.qa.forEach((qa, index) => {
    const path = `output.qa[${index}]`;
    if (!isRecord(qa)) issues.push(issue(path, "must be an object"));
    else {
      rejectUnknownKeys(qa, qaKeys, path, issues);
      if (!nonEmpty(qa.check)) issues.push(issue(`${path}.check`, "required"));
      if (!isQAResult(qa.result)) issues.push(issue(`${path}.result`, "unknown QA result fails closed"));
      if (!nonEmpty(qa.note)) issues.push(issue(`${path}.note`, "required"));
    }
  });
  const hasAssets = Array.isArray(value.assets) && value.assets.length > 0;
  if (hasAssets ? !nonEmptyList(value.fingerprints) : !stringList(value.fingerprints)) issues.push(issue("output.fingerprints", hasAssets ? "at least one fingerprint is required when assets exist" : "must be an array of strings"));
  if (!stringList(value.blockers)) issues.push(issue("output.blockers", "must be an array of strings"));
  if (!isRecord(value.provenance)) issues.push(issue("output.provenance", "required"));
  else {
    rejectUnknownKeys(value.provenance, contributionProvenanceKeys, "output.provenance", issues);
    if (!nonEmpty(value.provenance.provenanceId)) issues.push(issue("output.provenance.provenanceId", "required"));
    if (!stringList(value.provenance.sourceRefs)) issues.push(issue("output.provenance.sourceRefs", "must be an array of source references"));
    if (!isKernelStatus(value.provenance.upstreamState)) issues.push(issue("output.provenance.upstreamState", "unknown KernelStatus fails closed"));
    if (!nonEmpty(value.provenance.recordedAt)) issues.push(issue("output.provenance.recordedAt", "required"));
  }
  if (isState(value.state)) {
    const requiresNextAction = value.state !== "REJECTED";
    if (requiresNextAction && !nonEmpty(value.nextAction)) issues.push(issue("output.nextAction", "required for this lifecycle state"));
    if ((value.state === "BLOCKED" || value.state === "REJECTED") && !nonEmptyList(value.blockers)) issues.push(issue("output.blockers", "at least one blocker is required for BLOCKED or REJECTED"));
    if (value.state === "READY_FOR_REVIEW" && !nonEmpty(value.handoff)) issues.push(issue("output.handoff", "required when work is ready for another actor to review"));
  }
  if (isKernelStatus(input.upstreamState) && (input.upstreamState === "HOLD_SOURCE" || input.upstreamState === "UNKNOWN") && value.state !== "BLOCKED") issues.push(issue("output.state", "HOLD_SOURCE/UNKNOWN upstream input requires BLOCKED output"));
}

/** Closed trust-boundary entrypoint. Unknown keys and malformed data fail closed. */
export function validateAgentContribution(input: unknown): ContributionValidation {
  const issues: ContributionIssue[] = [];
  if (!isRecord(input)) return { ok: false, issues: [issue("contribution", "must be an object")] };
  rejectUnknownKeys(input, rootKeys, "contribution", issues);
  if (!("input" in input)) issues.push(issue("input", "required"));
  if (!("output" in input)) issues.push(issue("output", "required"));
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
