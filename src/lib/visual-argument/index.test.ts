import assert from "node:assert/strict";
import test from "node:test";
import {
  validateVisualArgumentBatch,
  validateVisualArgumentPlan,
  visualFunctionChannelFit,
  type VisualArgumentPlan,
} from "./index";

const plan = (contentId: string, visualFunction: VisualArgumentPlan["visualFunction"], suffix: string): VisualArgumentPlan => ({
  contentId,
  audience: "LegalMente general",
  conflict: `conflict-${suffix}`,
  learningGoal: `learning-${suffix}`,
  visualFunction,
  imageArgument: `A visible relation that makes ${suffix} understandable before reading the copy.`,
  expectedPerception: `Viewer recognizes ${suffix} as a legal relation, not decoration.`,
});

test("accepts a ten-piece batch with functional diversity and unique visual arguments", () => {
  const functions: VisualArgumentPlan["visualFunction"][] = [
    "EXPLAIN", "SEPARATE", "COMPARE", "REVEAL", "WARN",
    "TENSION", "HUMANIZE", "SHOW_PROCESS", "SHOW_CONSEQUENCE", "MATERIALIZE_ABSTRACTION",
  ];
  const result = validateVisualArgumentBatch(functions.map((fn, index) => plan(`LM-${index + 1}`, fn, String(index + 1))), {
    expectedSize: 10,
  });
  assert.equal(result.ok, true);
  assert.equal(result.distinctFunctions, 10);
});

test("rejects nominal variety when the visual argument is duplicated", () => {
  const a = plan("LM-1", "EXPLAIN", "one");
  const b: VisualArgumentPlan = { ...a, contentId: "LM-2" };
  const result = validateVisualArgumentBatch([a, b], { expectedSize: 2, minimumDistinctFunctions: 1 });
  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /repeats the same visual argument/i);
});

test("rejects a learning goal copied verbatim into imageArgument", () => {
  const candidate = plan("LM-1", "EXPLAIN", "one");
  candidate.imageArgument = candidate.learningGoal;
  const errors = validateVisualArgumentPlan(candidate);
  assert.match(errors.join("\n"), /translate the learning goal into a visual relation/i);
});

test("requires functional variety for a ten-piece preflight", () => {
  const plans = Array.from({ length: 10 }, (_, index) => plan(`LM-${index + 1}`, index % 2 ? "EXPLAIN" : "SEPARATE", String(index + 1)));
  const result = validateVisualArgumentBatch(plans, { expectedSize: 10 });
  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /at least 5/i);
});

test("channel profiles prefer different visual functions without forbidding compatible choices", () => {
  assert.equal(visualFunctionChannelFit("TENSION", "instagram"), "PREFERRED");
  assert.equal(visualFunctionChannelFit("SEPARATE", "linkedin-legalmente"), "PREFERRED");
  assert.equal(visualFunctionChannelFit("TENSION", "linkedin-legalmente"), "COMPATIBLE");
});

test("records a human-review warning when a function is compatible but not preferred for the channel", () => {
  const result = validateVisualArgumentBatch([
    { ...plan("LM-LINKEDIN-01", "TENSION", "one"), channel: "linkedin-legalmente" },
  ], { expectedSize: 1 });
  assert.equal(result.ok, true);
  assert.match(result.warnings.join("\n"), /compatible but not preferred/i);
});
