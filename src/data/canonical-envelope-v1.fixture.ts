/**
 * Contract fixture only. Psyche-creation remains the producer and authority;
 * this file models the minimum versioned envelope consumed by the web tests.
 */
export const canonicalEnvelopeV1Fixture = {
  contractVersion: "canonical-envelope.v1",
  sourceSystem: "Psyche-creation" as const,
  sourceRevision: "3dd358b72a79b3aa26e46c9a1844a682dcb7e09a",
  provenanceDigest: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  canonicalPayloadRef: "psyche://claim-packet/example",
  canonicalStatus: "PENDIENTE",
  receivedAt: "2026-08-31T03:00:00.000Z",
} as const;
