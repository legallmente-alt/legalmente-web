import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  assertPublishBlocked,
  createEmptyQa,
  evaluateQa,
  routeGeneration,
  selectAsset,
  type ImageGeneratorAdapter,
  type VisualProductionUnit,
} from "./index";

const unit: VisualProductionUnit = {
  CONTENT_ID: "LM-PC-B1-01",
  SERIES: "Bloque 1",
  TOPIC: "10 cosas que tu jefe no puede exigirte",
  SOURCE_REFS: ["drive://block1.txt#01"],
  CLAIM_REFS: ["drive://block1.txt#01"],
  TERRITORY: "Capa B panhispánica; plazos y montos varían por país",
  LEGAL_STATE: "APROBADO",
  COPY_EXACT: "copy aprobado",
  CHANNEL: "SOCIAL",
  FORMAT: "9:16",
  WIDTH: 1080,
  HEIGHT: 1920,
  ART_DIRECTION: "Fotografía documental de calle",
  VISUAL_METAPHOR: "cinta métrica que se detiene",
  SCENE: "taller mecánico",
  CAMERA: "plano medio",
  LIGHT: "luz natural única",
  PALETTE: ["#2B1B17", "#FCFAF2", "#0F2537", "#C5A059"],
  BRAND_OBJECT: "chapa integrada",
  TEXT_ZONE: "mitad inferior",
  SAFE_AREA: "x 80-1000; y 290-1630",
  GENERATION_PROMPT: "prompt",
  NEGATIVE_PROMPT: "collage, grid, watermark",
  GENERATOR: "test",
  MODEL: "test-model",
  GENERATION_DATE: "2026-08-30",
  REGEN_COUNT: 0,
  STATE: "IMAGE_READY",
  PROVENANCE: { promptVersion: "v1", referenceAssets: [], copySource: "Drive", createdBy: "Manus AI" },
};

const adapter: ImageGeneratorAdapter = {
  name: "test",
  model: "test-model",
  capabilities: { text: false, referenceImage: true, inpainting: true, upscale: true, variation: true },
  async generate() { return { asset: "asset", provenance: {} }; },
};

describe("VisualProductionUnit", () => {
  it("routes clean-copy providers to full composite and fallback providers to programmatic text", () => {
    assert.equal(routeGeneration({ ...adapter, capabilities: { ...adapter.capabilities, text: false } }, unit), "PROGRAMMATIC_TEXT_COMPOSITION");
    assert.equal(routeGeneration({ ...adapter, capabilities: { ...adapter.capabilities, text: true } }, unit), "FULL_COMPOSITE_GENERATION");
  });

  it("blocks content that is not approved", () => {
    assert.equal(routeGeneration(adapter, { ...unit, LEGAL_STATE: "HOLD_SOURCE" }), "COPY_BLOCK");
  });

  it("fails closed for publication", () => {
    assert.throws(() => assertPublishBlocked(unit), /PUBLICATION_GATE_CLOSED/);
  });

  it("keeps a failed QA result out of publication candidates", () => {
    const qa = createEmptyQa();
    const evaluated = evaluateQa(unit, qa);
    assert.equal(evaluated.STATE, "REWORK_REQUIRED");
    assert.equal(evaluated.QA_RESULTS?.classification, "C_REWORK");
  });

  it("selects assets through registry fields instead of W01-style constants", () => {
    const found = selectAsset([{ CONTENT_ID: "LM-PA-W01", CHANNEL: "WEB", FORMAT: "16:9", STATE: "IMAGE_READY" }], { CHANNEL: "WEB", STATE: "IMAGE_READY" });
    assert.equal(found?.CONTENT_ID, "LM-PA-W01");
  });
});
