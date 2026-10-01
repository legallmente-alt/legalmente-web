import assert from "node:assert/strict";
import test from "node:test";
import { validateVisualArgumentBatch, validateVisualArgumentPlan, visualFunctionChannelFit, type VisualArgumentPlan } from "./index";

const strategies: VisualArgumentPlan["sceneStrategy"][] = ["REAL_SITUATION", "HUMAN_DECISION", "CONSEQUENCE", "PROCESS", "ASSET_STRUCTURE", "GOVERNANCE_OPERATION", "DOCUMENT_EVIDENCE", "ARCHITECTURE", "MATERIAL_CONTRAST", "METAPHOR"];
const subjectModes: VisualArgumentPlan["subjectMode"][] = [
  "DOCUMENT_OBJECT", "LEGAL_OBJECT", "ARCHITECTURE_SPACE", "PROCESS_MECHANISM", "FORENSIC_EVIDENCE",
  "MATERIAL_ABSTRACTION", "ENVIRONMENT_CONTEXT", "HUMAN_INTERACTION", "HUMAN_SOLITARY", "DOCUMENT_OBJECT",
];

const plan = (
  contentId: string,
  visualFunction: VisualArgumentPlan["visualFunction"],
  suffix: string,
  sceneStrategy: VisualArgumentPlan["sceneStrategy"] = "REAL_SITUATION",
  subjectMode: VisualArgumentPlan["subjectMode"] = "LEGAL_OBJECT",
): VisualArgumentPlan => ({
  contentId, legalBindingId: `CLAIM-${suffix}`, audience: "LegalMente general", realQuestion: `question-${suffix}`,
  conflict: `conflict-${suffix}`, consequence: `consequence-${suffix}`, learningGoal: `learning-${suffix}`,
  visualFunction, sceneStrategy, imageArgument: `A visible relation that makes ${suffix} understandable before reading the copy.`,
  dominantVisualLogic: `logic-${suffix}`, expectedPerception: `Viewer recognizes ${suffix} as a legal relation, not decoration.`,
  subjectMode, sceneSignature: `${subjectMode}-scene-${suffix}`, legalAnchorKeys: [`anchor-${suffix}`],
  ...(subjectMode === "HUMAN_INTERACTION" || subjectMode === "HUMAN_SOLITARY" ? { castPattern: `cast-${suffix}` } : {}),
  ...(sceneStrategy === "METAPHOR" ? { motifKeys: [`motif-${suffix}`] } : {}),
});

test("accepts a ten-piece batch with functional and scene-strategy diversity", () => {
  const functions: VisualArgumentPlan["visualFunction"][] = ["EXPLAIN", "SEPARATE", "COMPARE", "REVEAL", "WARN", "TENSION", "HUMANIZE", "SHOW_PROCESS", "SHOW_CONSEQUENCE", "MATERIALIZE_ABSTRACTION"];
  const result = validateVisualArgumentBatch(functions.map((fn, index) => plan(`LM-${index + 1}`, fn, String(index + 1), strategies[index], subjectModes[index])), { expectedSize: 10 });
  assert.equal(result.ok, true); assert.equal(result.distinctFunctions, 10); assert.equal(result.distinctSceneStrategies, 10); assert.ok(result.distinctSubjectModes >= 6);
});

test("rejects nominal variety when the visual argument is duplicated", () => {
  const a = plan("LM-1", "EXPLAIN", "one"); const b: VisualArgumentPlan = { ...a, contentId: "LM-2" };
  const result = validateVisualArgumentBatch([a, b], { expectedSize: 2, minimumDistinctFunctions: 1, minimumDistinctSceneStrategies: 1 });
  assert.equal(result.ok, false); assert.match(result.errors.join("\n"), /repeats the same visual argument/i);
});

test("requires a canonical legal binding before visual interpretation", () => {
  const candidate = plan("LM-1", "EXPLAIN", "one"); candidate.legalBindingId = "";
  assert.match(validateVisualArgumentPlan(candidate).join("\n"), /legalBindingId is required/i);
});

test("rejects a learning goal copied verbatim into imageArgument", () => {
  const candidate = plan("LM-1", "EXPLAIN", "one"); candidate.imageArgument = candidate.learningGoal;
  assert.match(validateVisualArgumentPlan(candidate).join("\n"), /translate the learning goal/i);
});

test("rejects a ten-piece batch with too little functional or scene diversity", () => {
  const plans = Array.from({ length: 10 }, (_, i) => plan(`LM-${i}`, i % 2 ? "EXPLAIN" : "SEPARATE", String(i), i % 2 ? "REAL_SITUATION" : "PROCESS"));
  const result = validateVisualArgumentBatch(plans, { expectedSize: 10 });
  assert.equal(result.ok, false); assert.match(result.errors.join("\n"), /only 2 visual functions; at least 5/i); assert.match(result.errors.join("\n"), /only 2 scene strategies; at least 5/i);
});

test("rejects metaphor as the default grammar and repeated motifs", () => {
  const plans = Array.from({ length: 4 }, (_, i) => plan(`LM-${i}`, ["EXPLAIN", "SEPARATE", "COMPARE", "REVEAL"][i] as VisualArgumentPlan["visualFunction"], String(i), "METAPHOR"));
  plans[1].motifKeys = plans[0].motifKeys;
  const result = validateVisualArgumentBatch(plans, { expectedSize: 4, minimumDistinctSceneStrategies: 1 });
  assert.equal(result.ok, false); assert.match(result.errors.join("\n"), /metaphor is overused/i); assert.match(result.errors.join("\n"), /repeats a motif key/i);
});

test("requires an explicit motif key for every metaphor", () => {
  const candidate = plan("LM-1", "REVEAL", "one", "METAPHOR"); candidate.motifKeys = [];
  assert.match(validateVisualArgumentPlan(candidate).join("\n"), /metaphor requires motifKeys/i);
});

test("keeps LinkedIn LegalMente operational instead of allegorical", () => {
  const plans = Array.from({ length: 4 }, (_, i) => ({ ...plan(`LI-${i}`, "EXPLAIN", String(i), i < 2 ? "METAPHOR" : "PROCESS"), channel: "linkedin-legalmente" as const }));
  const result = validateVisualArgumentBatch(plans, { expectedSize: 4, minimumDistinctFunctions: 1, minimumDistinctSceneStrategies: 1, maximumMetaphorShare: 1 });
  assert.equal(result.ok, false); assert.match(result.errors.join("\n"), /at least 75% operational scenes/i);
});

test("channel profiles guide without forbidding compatible choices", () => {
  assert.equal(visualFunctionChannelFit("TENSION", "instagram"), "PREFERRED");
  assert.equal(visualFunctionChannelFit("SEPARATE", "linkedin-legalmente"), "PREFERRED");
  assert.equal(visualFunctionChannelFit("TENSION", "linkedin-legalmente"), "COMPATIBLE");
});


test("rejects a general batch dominated by the same people-centered grammar", () => {
  const modes: VisualArgumentPlan["subjectMode"][] = [
    "HUMAN_INTERACTION", "HUMAN_SOLITARY", "HUMAN_INTERACTION", "HUMAN_SOLITARY", "HUMAN_INTERACTION",
    "DOCUMENT_OBJECT", "LEGAL_OBJECT", "ARCHITECTURE_SPACE", "PROCESS_MECHANISM", "FORENSIC_EVIDENCE",
  ];
  const plans = Array.from({ length: 10 }, (_, i) => plan(
    `PEOPLE-${i}`,
    ["EXPLAIN","SEPARATE","COMPARE","REVEAL","WARN","TENSION","HUMANIZE","SHOW_PROCESS","SHOW_CONSEQUENCE","MATERIALIZE_ABSTRACTION"][i] as VisualArgumentPlan["visualFunction"],
    String(i),
    strategies[i],
    modes[i],
  ));
  const result = validateVisualArgumentBatch(plans, { expectedSize: 10, minimumDistinctSubjectModes: 5 });
  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /overuses people-centered scenes/i);
});

test("rejects repeating the same pair or trio arrangement", () => {
  const a = plan("CAST-1", "HUMANIZE", "a", "HUMAN_DECISION", "HUMAN_INTERACTION");
  const b = plan("CAST-2", "TENSION", "b", "REAL_SITUATION", "HUMAN_INTERACTION");
  b.castPattern = a.castPattern;
  const result = validateVisualArgumentBatch([a, b], {
    expectedSize: 2,
    minimumDistinctFunctions: 1,
    minimumDistinctSceneStrategies: 1,
    minimumDistinctSubjectModes: 1,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /repeats a human cast pattern/i);
});
