import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { executeImageBatch } from "./runtime";
import type { ImageGeneratorAdapter } from "@/lib/visual-factory";

const blockedAdapter: ImageGeneratorAdapter = {
  name: ["higgs", "field"].join(""),
  model: "blocked",
  capabilities: { text: true, referenceImage: true, inpainting: true, upscale: true, variation: true },
  async generate() { throw new Error("provider must not be called"); },
};

describe("image runtime provider policy", () => {
  it("fails closed before a disallowed provider can be called", async () => {
    const result = await executeImageBatch({
      pieces: [], units: [], visualArguments: [], imageBriefs: [],
      policy: { mode: "LEGALMENTE_GENERAL", expectedSize: 0 }, adapter: blockedAdapter,
    });
    assert.equal(result.status, "IMAGE_BRIEF_BLOCKED");
    assert.ok(result.errors.some((e) => /not allowed/i.test(e)));
  });
});
