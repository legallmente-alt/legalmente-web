import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { ProductionPiece } from "@/lib/production-policy";
import type { ImageGeneratorAdapter, VisualProductionUnit } from "@/lib/visual-factory";
import { executeVisualBatch } from "./index";

const piece: ProductionPiece = {
  id: "LM-RUNTIME-001",
  legalDomainIds: ["PROCESS"],
  entryDoor: "garantia",
  topic: "imparcialidad",
  angle: "tension",
  legalRelation: "garantia-limite",
  hook: "¿Qué protege la imparcialidad?",
  format: "9:16",
  matterLabel: "Procesal",
  topicLabel: "Imparcialidad",
  centralIdea: "Distinguir garantía, decisión y límite.",
  sourceIds: ["SRC-1"],
  artisticStyle: "fotografia editorial",
  visualMetaphor: "umbral simetrico",
  scenario: "pasillo institucional",
  material: "piedra y papel",
  lighting: "lateral de umbral",
  humanPresence: "silueta parcial",
  framing: "plano medio",
  composition: "simetria tensionada",
  brandObject: "placa fisica",
  visibleBrand: "LegalMente",
  brandIntegration: "PHYSICAL_SCENE",
  artBaseIsClean: true,
  typographyCompositor: "CANONICAL",
};

const unit: VisualProductionUnit = {
  CONTENT_ID: piece.id,
  SERIES: "Garantias",
  TOPIC: piece.topic,
  SOURCE_REFS: ["SRC-1"],
  CLAIM_REFS: ["CLAIM-1"],
  TERRITORY: "general-principle",
  LEGAL_STATE: "APROBADO",
  COPY_EXACT: "Copy aprobado para prueba interna.",
  CHANNEL: "SOCIAL",
  FORMAT: "9:16",
  WIDTH: 1080,
  HEIGHT: 1920,
  ART_DIRECTION: piece.artisticStyle,
  VISUAL_METAPHOR: piece.visualMetaphor,
  SCENE: piece.scenario,
  CAMERA: piece.framing,
  LIGHT: piece.lighting,
  PALETTE: ["#000000", "#ffffff"],
  BRAND_OBJECT: piece.brandObject,
  TEXT_ZONE: "safe",
  SAFE_AREA: "mobile-safe",
  GENERATION_PROMPT: "single scene, clean base art, no pseudotext",
  NEGATIVE_PROMPT: "collage, grid, floating logo, pseudotext",
  GENERATOR: "unassigned",
  MODEL: "unassigned",
  GENERATION_DATE: "2026-09-11",
  REGEN_COUNT: 0,
  STATE: "DRAFT",
  PROVENANCE: { promptVersion: "v1", referenceAssets: [], copySource: "claim-packet", createdBy: "system" },
};

function fakeAdapter(text = false) {
  let calls = 0;
  const adapter: ImageGeneratorAdapter = {
    name: "fake-provider",
    model: "fake-model",
    capabilities: { text, referenceImage: true, inpainting: true, upscale: true, variation: true },
    async generate() {
      calls += 1;
      return { asset: `asset-${calls}.png`, provenance: { fake: "true" } };
    },
  };
  return { adapter, getCalls: () => calls };
}

const policy = {
  mode: "SPECIFIC_DOMAIN" as const,
  expectedSize: 1,
  requestedDomainId: "PROCESS",
  now: "2026-09-11T12:00:00Z",
};

describe("production runtime", () => {
  it("blocks policy failures before the provider is called", async () => {
    const fake = fakeAdapter();
    const result = await executeVisualBatch({ pieces: [{ ...piece, visibleBrand: "Other" }], units: [unit], policy, adapter: fake.adapter });
    assert.equal(result.status, "POLICY_BLOCKED");
    assert.equal(fake.getCalls(), 0);
  });

  it("blocks legal HOLD before the provider is called", async () => {
    const fake = fakeAdapter();
    const result = await executeVisualBatch({ pieces: [piece], units: [{ ...unit, LEGAL_STATE: "HOLD_SOURCE" }], policy, adapter: fake.adapter });
    assert.equal(result.status, "LEGAL_BLOCKED");
    assert.equal(fake.getCalls(), 0);
  });

  it("blocks post-validation visual drift before generation", async () => {
    const fake = fakeAdapter();
    const result = await executeVisualBatch({ pieces: [piece], units: [{ ...unit, VISUAL_METAPHOR: "changed later" }], policy, adapter: fake.adapter });
    assert.equal(result.status, "BINDING_BLOCKED");
    assert.equal(fake.getCalls(), 0);
  });

  it("calls the provider only after policy, binding and legal gates pass", async () => {
    const fake = fakeAdapter(false);
    const result = await executeVisualBatch({ pieces: [piece], units: [unit], policy, adapter: fake.adapter });
    assert.equal(result.status, "IMAGE_READY_FOR_QA");
    assert.equal(fake.getCalls(), 1);
    assert.equal(result.publicationAuthorized, false);
    if (result.status === "IMAGE_READY_FOR_QA") {
      assert.equal(result.receipts[0].route, "PROGRAMMATIC_TEXT_COMPOSITION");
      assert.equal(result.units[0].BASE_ASSET, "asset-1.png");
      assert.equal(result.units[0].STATE, "IMAGE_READY");
    }
  });

  it("still stops at QA even when a provider can render text", async () => {
    const fake = fakeAdapter(true);
    const result = await executeVisualBatch({ pieces: [piece], units: [unit], policy, adapter: fake.adapter });
    assert.equal(result.status, "IMAGE_READY_FOR_QA");
    if (result.status === "IMAGE_READY_FOR_QA") {
      assert.equal(result.receipts[0].route, "FULL_COMPOSITE_GENERATION");
      assert.equal(result.units[0].COMPOSED_ASSET, "asset-1.png");
      assert.notEqual(result.units[0].STATE, "PUBLISHED");
    }
  });
});
