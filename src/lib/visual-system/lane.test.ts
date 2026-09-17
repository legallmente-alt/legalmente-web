import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveLane } from "./lane";

describe("resolveLane", () => {
  it("selects A only for an unambiguous abstract type", () => {
    assert.equal(resolveLane("máxima", undefined).lane, "A");
  });

  it("selects B for concrete or unknown content", () => {
    assert.equal(resolveLane("proceso", undefined).lane, "B");
    assert.equal(resolveLane("desconocido", undefined).lane, "B");
  });

  it("respects a valid explicit lane", () => {
    assert.equal(resolveLane("proceso", "A").lane, "A");
  });

  it("falls back to B for an invalid explicit lane", () => {
    const result = resolveLane("máxima", "C");
    assert.equal(result.lane, "B");
    assert.equal(result.lane_fallback_applied, true);
  });
});
