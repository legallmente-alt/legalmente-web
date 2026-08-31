import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  LEGAL_DOMAIN_IDS,
  type EcosystemKernelInput,
  type VisualProductionEnvelope,
  validateEcosystemKernel,
} from "./index";

const semantics = {
  gravity: "obligations and consequences",
  tensions: ["autonomy", "evidence"],
  preferredMetaphorFamilies: ["thresholds", "interlocking documents"],
  materialCues: ["paper", "wood"],
  spatialCues: ["crossings", "layers"],
  avoid: ["gavel clichés", "generic stock imagery"],
};

const domains = LEGAL_DOMAIN_IDS.map((id) => ({
  id,
  label: id,
  status: "ACTIVE" as const,
  description: `Context for ${id}`,
  visualSemantics: semantics,
}));

const relation = (from: EcosystemKernelInput["relations"][number]["from"], to: EcosystemKernelInput["relations"][number]["to"]) => ({
  from,
  to,
  whyRelated: "The same human situation can cross these legal contexts.",
  sharedThemes: ["responsibility", "evidence"],
  territoryRequired: true,
  risk: "MEDIUM" as const,
});

const validEnvelope: VisualProductionEnvelope = {
  contentId: "content-contract-tax-001",
  humanQuestion: "¿Qué cambia cuando un contrato también tiene una dimensión fiscal?",
  worldIds: ["empresa-comercio"],
  legalDomainIds: ["CONTRACTS", "TAX"],
  conceptIds: ["obligation"],
  claimIds: ["claim-opaque-001"],
  sourceIds: ["source-opaque-001"],
  territory: "MX",
  limits: ["No inferir una consecuencia fiscal automática."],
  format: "4:5",
  exactCopy: "Una operación contractual puede tener una dimensión fiscal relevante.",
  visualTension: "agreement versus consequence",
  metaphorCandidates: ["interlocking ledger and contract"],
  recentAssetFingerprints: ["sha256:prior-asset-001"],
  outputState: "READY_FOR_VISUAL",
};

const validKernel: EcosystemKernelInput = {
  domains,
  relations: [
    relation("CONTRACTS", "TAX"),
    relation("FAMILY", "CIVIL"),
    relation("CIVIL", "NOTARIAL"),
    relation("PENAL", "PROCEDURE_EVIDENCE"),
    relation("PROCEDURE_EVIDENCE", "DIGITAL_DATA_AI"),
  ],
  envelope: validEnvelope,
};

test("all initial domains are unique and active domains have VisualSemantics", () => {
  const result = validateEcosystemKernel(validKernel);
  assert.equal(result.ok, true);
  assert.equal(new Set(LEGAL_DOMAIN_IDS).size, 15);
});

test("cross-domain relations resolve known domains and reject accidental self-relations", () => {
  assert.equal(validateEcosystemKernel(validKernel).ok, true);
  const invalid = { ...validKernel, relations: [relation("CONTRACTS", "CONTRACTS")] };
  const result = validateEcosystemKernel(invalid);
  assert.equal(result.ok, false);
  assert.match(result.issues.map((item) => item.message).join(" "), /self-relations/);
});

test("CONTRACTS-TAX relation remains contextual and does not become a legal claim", () => {
  const result = validateEcosystemKernel({ ...validKernel, relations: [relation("CONTRACTS", "TAX")] });
  assert.equal(result.ok, true);
  assert.equal(validKernel.envelope?.claimIds[0], "claim-opaque-001");
});

test("FAMILY-CIVIL-NOTARIAL and PENAL-PROCEDURE_EVIDENCE-DIGITAL_DATA_AI examples resolve", () => {
  const result = validateEcosystemKernel(validKernel);
  assert.equal(result.ok, true);
});

test("active domain without VisualSemantics fails closed", () => {
  const invalidDomains = domains.map((domain) => domain.id === "TAX" ? { ...domain, visualSemantics: undefined } : domain);
  const result = validateEcosystemKernel({ ...validKernel, domains: invalidDomains });
  assert.equal(result.ok, false);
  assert.match(result.issues.map((item) => item.message).join(" "), /VisualSemantics/);
});

test("READY_FOR_VISUAL requires claim, source, limits, bindings and exact copy", () => {
  const invalidEnvelope = { ...validEnvelope, claimIds: [], sourceIds: [], limits: [], exactCopy: "" };
  const result = validateEcosystemKernel({ ...validKernel, envelope: invalidEnvelope });
  assert.equal(result.ok, false);
  assert.ok(result.issues.length >= 4);
});

test("HOLD_SOURCE, UNKNOWN and unknown domains fail closed", () => {
  const held = validateEcosystemKernel({ ...validKernel, envelope: { ...validEnvelope, outputState: "HOLD_SOURCE" } });
  assert.equal(held.ok, false);
  const unknown = validateEcosystemKernel({ ...validKernel, envelope: { ...validEnvelope, legalDomainIds: ["UNKNOWN" as never] } });
  assert.equal(unknown.ok, false);
  const invalidDomain = validateEcosystemKernel({ ...validKernel, relations: [relation("CONTRACTS", "TAX"), { ...relation("CIVIL", "FAMILY"), to: "UNKNOWN" as never }] });
  assert.equal(invalidDomain.ok, false);
});
