import { validateCanonicalEnvelope } from "./validate";

const baseEnvelope = {
  contractVersion: "canonical-envelope.v1",
  sourceSystem: "Psyche-creation" as const,
  sourceRevision: "3dd358b72a79b3aa26e46c9a1844a682dcb7e09a",
  provenanceDigest: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  canonicalPayloadRef: "psyche://claim-packet/example",
  canonicalStatus: "PENDIENTE",
  receivedAt: "2026-08-31T03:00:00.000Z",
};

export const contractCases = [
  { name: "empty envelope", input: {}, expected: false },
  { name: "valid envelope", input: baseEnvelope, expected: true },
  { name: "LIVE remains opaque to the adapter", input: { ...baseEnvelope, canonicalStatus: "LIVE" }, expected: true },
  { name: "APPROVED remains opaque to the adapter", input: { ...baseEnvelope, canonicalStatus: "APPROVED" }, expected: true },
  { name: "schema drift is rejected", input: { ...baseEnvelope, unexpectedField: true }, expected: false },
  { name: "NO_APLICA is transportable without law/article forcing", input: { ...baseEnvelope, canonicalStatus: "NO_APLICA" }, expected: true },
] as const;

export const contractCaseResults = contractCases.map((testCase) => {
  const result = validateCanonicalEnvelope(testCase.input);
  return {
    ...testCase,
    actual: result.ok,
    errors: result.ok ? [] : result.errors,
  };
});

export const allContractCasesPass = contractCaseResults.every((testCase) => testCase.actual === testCase.expected);
