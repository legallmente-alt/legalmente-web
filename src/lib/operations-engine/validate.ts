import { CanonicalEnvelopeSchema, type CanonicalEnvelope } from "./contracts";

export type AdapterValidationResult =
  | { ok: true; data: CanonicalEnvelope }
  | { ok: false; errors: string[] };

/**
 * Validates only the cross-repository envelope. It does not validate legal
 * claims, sources, jurisdiction, hashes, or release state. Those belong to
 * the canonical Psyche-creation validator.
 */
export function validateCanonicalEnvelope(input: unknown): AdapterValidationResult {
  const parsed = CanonicalEnvelopeSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.issues.map((issue) => issue.message) };
  }
  return { ok: true, data: parsed.data };
}

export const V12Policy = {
  owner: "Psyche-creation owns legal truth; legalmente-web owns product/UX.",
  allowedConsumerStates: ["PENDIENTE", "REQUIERE_INVESTIGACION", "APTO_CON_MATICES", "APTO_PARA_NARRATIVA"] as const,
  publication: "BLOCKED",
  images: "NO_IMAGE_REQUEST",
  automation: "INACTIVE",
  analytics: "NO_TRACKING",
  piiPolicy: "No personal data, secrets, free-form case facts, or credentials.",
} as const;
