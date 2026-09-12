export const CONTINUITY_SEQUENCE = [
  "humanLife",
  "observableConduct",
  "relation",
  "object",
  "time",
  "evidence",
  "territory",
  "rule",
  "scope",
  "limit",
  "question",
  "prudentAction",
] as const;

export type ContinuityField = (typeof CONTINUITY_SEQUENCE)[number];

export type ContinuityAuthority =
  | "IMPERATIVE"
  | "AVAILABLE"
  | "CONDITIONAL"
  | "TERRITORIAL"
  | "UNKNOWN"
  | "PROFESSIONAL";

export type ContinuityInput = Partial<Record<ContinuityField, string>> & {
  contentId?: string;
  claimIds?: string[];
  sourceIds?: string[];
  state?: string;
  authority?: ContinuityAuthority;
};

export type ContinuityValidation = {
  ok: boolean;
  state: "READY_FOR_CONTINUATION" | "HOLD";
  missing: ContinuityField[];
  issues: string[];
  nextQuestion?: string;
};

const clean = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

/**
 * Auxiliary, fail-closed continuity adapter.
 *
 * This helper does not create legal claims, choose sources, infer territory,
 * resolve validity, authorize publication, or open product/deploy/merge gates.
 * It only checks whether the human-juridical continuity chain is explicit
 * enough to be handed to the next subsystem or agent.
 */
export function validateContinuityRule(input: ContinuityInput): ContinuityValidation {
  const missing = CONTINUITY_SEQUENCE.filter((field) => !clean(input[field]));
  const issues: string[] = [];

  if (!clean(input.contentId)) issues.push("CONTENT_ID is required for traceable continuation.");
  if (!input.claimIds?.length) issues.push("At least one CLAIM_ID is required; claims cannot be inferred here.");
  if (!input.sourceIds?.length) issues.push("At least one SOURCE_ID is required; sources cannot be created here.");

  if (input.authority === "UNKNOWN") {
    issues.push("UNKNOWN must remain explicit and be converted into a question, not filled by inference.");
  }

  if (input.state === "HOLD_SOURCE" || input.state === "UNKNOWN") {
    issues.push(`${input.state} is fail-closed for downstream continuation.`);
  }

  const ok = missing.length === 0 && issues.length === 0;

  return {
    ok,
    state: ok ? "READY_FOR_CONTINUATION" : "HOLD",
    missing,
    issues,
    nextQuestion: ok
      ? undefined
      : missing.length
        ? `What is the missing ${missing[0]} link?`
        : "What evidence or authority is still missing before continuation?",
  };
}

export type VisualContinuityFingerprint = {
  world: string;
  legalDomain: string;
  concept: string;
  visualSchool: string;
  scenario: string;
  revelation: string;
  framing: string;
  humanPresence: string;
  brandObject: string;
  dominantPalette: string;
};

export function continuityFingerprintKey(fingerprint: VisualContinuityFingerprint): string {
  return [
    fingerprint.world,
    fingerprint.legalDomain,
    fingerprint.concept,
    fingerprint.visualSchool,
    fingerprint.scenario,
    fingerprint.revelation,
    fingerprint.framing,
    fingerprint.humanPresence,
    fingerprint.brandObject,
    fingerprint.dominantPalette,
  ]
    .map((part) => part.trim().toLowerCase())
    .join("::");
}
