import { canonicalEnvelopeV1Fixture } from "@/data/canonical-envelope-v1.fixture";
import { validateCanonicalEnvelope } from "./validate";

const baseEnvelope = canonicalEnvelopeV1Fixture;

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
