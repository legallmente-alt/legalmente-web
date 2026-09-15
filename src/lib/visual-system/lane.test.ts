import { describe, expect, it } from "vitest";
import { resolveLane } from "./lane";

describe("resolveLane", () => {
  it("selects A only for an unambiguous abstract type", () => {
    expect(resolveLane("máxima", undefined).lane).toBe("A");
  });

  it("selects B for concrete or unknown content", () => {
    expect(resolveLane("proceso", undefined).lane).toBe("B");
    expect(resolveLane("desconocido", undefined).lane).toBe("B");
  });

  it("respects a valid explicit lane", () => {
    expect(resolveLane("proceso", "A").lane).toBe("A");
  });

  it("falls back to B for an invalid explicit lane", () => {
    const result = resolveLane("máxima", "C");
    expect(result.lane).toBe("B");
    expect(result.lane_fallback_applied).toBe(true);
  });
});
