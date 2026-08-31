import { ClaimManifestSchema, type ClaimManifest } from "./contracts";

export type ValidationResult =
  | { ok: true; data: ClaimManifest }
  | { ok: false; errors: string[] };

/**
 * Validates a manifest and applies the current LegalMente release policy.
 * The schema retains LIVE/APPROVED for compatibility, but V1.2 keeps them closed.
 */
export function validateClaimManifest(input: unknown): ValidationResult {
  const parsed = ClaimManifestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.issues.map((issue) => issue.message) };
  }

  const errors: string[] = [];
  if (parsed.data.states.publicationState === "LIVE") {
    errors.push("FAIL-CLOSED BLOCK: V1.2 no permite publicationState=LIVE sin gate humano explícito.");
  }
  if (parsed.data.states.copyState === "APPROVED" || parsed.data.states.visualState === "APPROVED") {
    errors.push("FAIL-CLOSED BLOCK: V1.2 conserva APPROVED cerrado hasta revisión humana documentada.");
  }
  if (parsed.data.founderEvidence.trim().length === 0) {
    errors.push("FAIL-CLOSED BLOCK: founderEvidence vacío.");
  }

  return errors.length > 0 ? { ok: false, errors } : { ok: true, data: parsed.data };
}

export const V12Policy = {
  allowedPublicationStates: ["BLOCKED", "QA_ONLY"] as const,
  allowedVisualStates: ["PENDING", "ATTACHED", "NOT_APPLICABLE"] as const,
  allowedCopyStates: ["DRAFT", "REVIEW"] as const,
  allowedIntegrationStates: ["PENDING", "STAGED", "RENDER_READY"] as const,
  piiPolicy: "No personal data, secrets, free-form case facts, or credentials.",
};
