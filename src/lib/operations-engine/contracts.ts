import { z } from "zod";

/**
 * Transport DTO only. Psyche-creation owns claims, sources, jurisdiction,
 * workflow states, hashes and legal gates. The web receives an opaque
 * canonical reference and never re-implements those rules.
 */
export const CanonicalEnvelopeSchema = z.object({
  contractVersion: z.string().min(1),
  sourceSystem: z.literal("Psyche-creation"),
  sourceRevision: z.string().min(1),
  provenanceDigest: z.string().regex(/^[0-9a-fA-F]{64}$/, "Digest SHA-256 requerido"),
  canonicalPayloadRef: z.string().min(1),
  canonicalStatus: z.string().min(1),
  receivedAt: z.string().datetime({ offset: true }),
}).strict();

export type CanonicalEnvelope = z.infer<typeof CanonicalEnvelopeSchema>;
