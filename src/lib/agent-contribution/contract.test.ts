import { strict as assert } from "node:assert";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { type CrossDomainRelation, type VisualSemantics } from "@/lib/ecosystem-kernel";
import { type AgentContribution, validateAgentContribution } from "./contract";

const visualSemantics: VisualSemantics = {
  visualGravity: "care, formality and changing obligations",
  tensions: ["care", "formality"],
  preferredMetaphorFamilies: ["thresholds", "woven documents"],
  materialCues: ["paper", "wood"],
  spatialCues: ["layers", "crossings"],
  avoid: ["generic legal clichés"],
};

const relation: CrossDomainRelation = {
  from: "CONTRACTS",
  to: "TAX",
  whyRelated: "A commercial agreement may create a question requiring separate tax review.",
  sharedThemes: ["obligation", "evidence"],
  territoryRequirement: "REQUIRED",
  contextRisk: "MEDIUM",
};

const validContribution: AgentContribution = {
  input: {
    inputId: "input-001",
    agentId: "agent-neutral-001",
    contentIds: ["content-001"],
    worldIds: ["empresa-comercio"],
    legalDomainIds: ["CONTRACTS", "TAX"],
    conceptIds: ["obligacion"],
    claimIds: ["claim-opaque-001"],
    sourceIds: ["source-opaque-001"],
    territory: "MX",
    limits: ["No concluir una obligación fiscal sin fuente y territorio aplicables."],
    requestedWork: "Proponer una relación contextual CONTRACTS ↔ TAX y una dirección visual.",
    priorAssetFingerprints: ["sha256:prior-001"],
    upstreamState: "ACTIVE",
  },
  output: {
    outputId: "output-001",
    agentId: "agent-neutral-001",
    inputId: "input-001",
    state: "READY_FOR_REVIEW",
    decisions: ["La relación es contextual y no crea un claim."],
    relations: [relation],
    visualSemantics: [visualSemantics],
    prompts: ["Representar tensión entre acuerdo y consecuencia sin texto jurídico inventado."],
    assets: [{
      assetId: "asset-001",
      kind: "concept-board",
      provenance: { provenanceId: "prov-001", basis: "input-001 and approved internal reference", observedAt: "2026-08-31" },
      fingerprint: "sha256:asset-001",
    }],
    qa: [{ check: "no claim creation", result: "PASS", note: "No legal conclusion added." }],
    fingerprints: ["sha256:asset-001"],
    blockers: [],
    nextAction: "Human review of contextual relation and visual direction.",
    handoff: "Review relation, semantics and asset provenance before any downstream work.",
    provenance: { provenanceId: "prov-output-001", sourceRefs: ["source-opaque-001"], upstreamState: "ACTIVE", recordedAt: "2026-08-31" },
  },
};

test("valid provider-neutral contribution passes", () => {
  const result = validateAgentContribution(validContribution);
  assert.equal(result.ok, true);
});

test("malformed input fails without uncontrolled exception", () => {
  for (const value of [null, "bad", [], { input: null, output: null }, { input: {}, output: {} }]) {
    assert.doesNotThrow(() => validateAgentContribution(value));
    assert.equal(validateAgentContribution(value).ok, false);
  }
});

test("provider-agnostic agent IDs and opaque content bindings pass", () => {
  const result = validateAgentContribution({
    ...validContribution,
    input: { ...validContribution.input, agentId: "agent-any-provider", contentIds: ["opaque-content"], claimIds: ["opaque-claim"], sourceIds: ["opaque-source"] },
    output: { ...validContribution.output, agentId: "agent-any-provider" },
  });
  assert.equal(result.ok, true);
});

test("unknown domain, upstream state and lifecycle state fail closed", () => {
  const unknownDomain = validateAgentContribution({ ...validContribution, input: { ...validContribution.input, legalDomainIds: ["UNKNOWN" as never] } });
  const unknownUpstream = validateAgentContribution({ ...validContribution, input: { ...validContribution.input, upstreamState: "UNKNOWN" } });
  const unknownLifecycle = validateAgentContribution({ ...validContribution, output: { ...validContribution.output, state: "PUBLISHED" as never } });
  assert.equal(unknownDomain.ok, false);
  assert.equal(unknownUpstream.ok, false);
  assert.equal(unknownLifecycle.ok, false);
});

test("legally dependent work requires claim and source IDs", () => {
  const result = validateAgentContribution({ ...validContribution, input: { ...validContribution.input, claimIds: [], sourceIds: [] } });
  assert.equal(result.ok, false);
  assert.ok(result.issues.some((item) => item.path === "input.claimIds"));
  assert.ok(result.issues.some((item) => item.path === "input.sourceIds"));
});

test("HOLD_SOURCE and UNKNOWN upstream states require BLOCKED output", () => {
  const result = validateAgentContribution({ ...validContribution, input: { ...validContribution.input, upstreamState: "HOLD_SOURCE" }, output: { ...validContribution.output, state: "READY_FOR_REVIEW" } });
  assert.equal(result.ok, false);
  assert.ok(result.issues.some((item) => item.path === "output.state"));
});

test("publication, deploy, merge and legal approval intent is rejected", () => {
  const withIntent = { ...validContribution, output: { ...validContribution.output, decisions: ["PUBLISHED and MERGED after legal approval"] } };
  const result = validateAgentContribution(withIntent);
  assert.equal(result.ok, false);
});

test("assets require provenance and fingerprints", () => {
  const noProvenance = { ...validContribution, output: { ...validContribution.output, assets: [{ assetId: "asset-002", kind: "image", fingerprint: "sha256:asset-002" }] } };
  const noFingerprint = { ...validContribution, output: { ...validContribution.output, assets: [{ assetId: "asset-003", kind: "image", provenance: { provenanceId: "prov-003", basis: "input", observedAt: "2026-08-31" }, fingerprint: "" }] } };
  assert.equal(validateAgentContribution(noProvenance).ok, false);
  assert.equal(validateAgentContribution(noFingerprint).ok, false);
});

test("handoff requires nextAction for non-final work", () => {
  const result = validateAgentContribution({ ...validContribution, output: { ...validContribution.output, state: "WORK_IN_PROGRESS", nextAction: "", handoff: "Pending review." } });
  assert.equal(result.ok, false);
  assert.ok(result.issues.some((item) => item.path === "output.nextAction"));
});

test("relation remains contextual and does not create a claim", () => {
  const result = validateAgentContribution(validContribution);
  assert.equal(result.ok, true);
  assert.deepEqual(validContribution.input.claimIds, ["claim-opaque-001"]);
  assert.equal(validContribution.output.relations[0].whyRelated.includes("claim"), false);
});

test("public runtime has zero imports of agent-contribution and ecosystem-kernel", () => {
  const roots = [join(process.cwd(), "src", "app"), join(process.cwd(), "src", "components")];
  const files: string[] = [];
  const walk = (directory: string) => {
    const stat = statSafe(directory);
    if (!stat?.isDirectory()) return;
    for (const entry of readdirSync(directory)) {
      const path = join(directory, entry);
      const child = statSafe(path);
      if (!child) continue;
      if (child.isDirectory()) walk(path);
      else if (/\.(ts|tsx|js|jsx)$/.test(entry)) files.push(path);
    }
  };
  roots.forEach(walk);
  const imports = files.filter((path) => /agent-contribution|ecosystem-kernel/.test(readFileSync(path, "utf8")));
  assert.deepEqual(imports, []);
});

function statSafe(path: string) {
  try {
    return statSync(path);
  } catch {
    return undefined;
  }
}
