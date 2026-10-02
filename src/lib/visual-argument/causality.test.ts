import test from "node:test";
import assert from "node:assert/strict";
import { causalFixture } from "./test-fixtures";
import { validateCausalScene, representationFingerprint, validateVisualArgumentBatch, type VisualArgumentPlan } from "./index";

function plan(id: string): VisualArgumentPlan {
  return { contentId: id, legalBindingId: id, audience: "PUBLIC", realQuestion: "¿Qué demuestra el cierre?", conflict: "acceso no documentado", consequence: "integridad cuestionada", learningGoal: "distinguir cierre de trazabilidad", visualFunction: "REVEAL", sceneStrategy: "DOCUMENT_EVIDENCE", imageArgument: "el sello roto revela apertura", dominantVisualLogic: "evidencia material", expectedPerception: "acceso altera el cierre", subjectMode: "LEGAL_OBJECT", sceneSignature: id, legalAnchorKeys: ["sello"], causalScene: causalFixture() };
}
test("valid physical relation passes preflight without claiming image approval", () => {
  assert.deepEqual(validateCausalScene(causalFixture(), "LEGAL_OBJECT"), []);
});
for (const [label, mutate, code] of [
  ["beautiful but generic art", (s: ReturnType<typeof causalFixture>) => { s.review.sceneSpecific = false; }, "SCENE_SPECIFICITY"],
  ["advertising", (s: ReturnType<typeof causalFixture>) => { s.review.commercial = true; }, "NO_COMMERCIAL_ART"],
  ["decorative document", (s: ReturnType<typeof causalFixture>) => { s.review.decorativeDocuments = true; }, "NO_DECORATIVE_DOCUMENTS"],
  ["filler people", (s: ReturnType<typeof causalFixture>) => { s.review.genericCastFiller = true; }, "NO_GENERIC_CAST_FILLER"],
  ["absent legal anchor", (s: ReturnType<typeof causalFixture>) => { s.anchorElementIds = []; }, "LEGAL_ANCHOR_CLARITY"],
  ["unhelpful representation", (s: ReturnType<typeof causalFixture>) => { s.review.explainsLearning = false; }, "CONCEPT_VISUAL_CAUSALITY"],
  ["text-dependent scene", (s: ReturnType<typeof causalFixture>) => { s.comprehensionWithoutText = ""; }, "CONCEPT_VISUAL_CAUSALITY"],
  ["interchangeable scene", (s: ReturnType<typeof causalFixture>) => { s.counterfactuals = s.counterfactuals.map(c => ({ ...c, reusableByChangingTextOnly: true })); }, "INTERCHANGEABILITY_TEST"],
] as const) test(`rejects ${label}`, () => {
  const scene = causalFixture(); mutate(scene);
  assert.match(validateCausalScene(scene, "LEGAL_OBJECT").join(), new RegExp(code));
});
test("rejects disconnected objects even when the self-declared review says PASS", () => {
  const scene = causalFixture(); scene.elements = [...scene.elements, { id: "paper", kind: "DOCUMENT", physicalIdentity: "contrato", legalFunction: "decorar escritorio", observableAction: "ninguna", necessary: false }];
  assert.match(validateCausalScene(scene, "LEGAL_OBJECT").join(), /disconnected decoration/);
});
test("different concepts cannot reuse the same physical scene with different style or cast labels", () => {
  const a = plan("a"), b = plan("b");
  b.causalScene = { ...b.causalScene, concept: "otro concepto" };
  b.imageArgument = "otra redacción"; b.conflict = "otro conflicto"; b.dominantVisualLogic = "óleo"; b.castPattern = "otra ropa y género";
  assert.equal(representationFingerprint(a.causalScene), representationFingerprint(b.causalScene));
  const result = validateVisualArgumentBatch([a, b], { minimumDistinctFunctions: 1, minimumDistinctSceneStrategies: 1 });
  assert.match(result.errors.join(), /REPRESENTATIONAL_NOVELTY/);
});
test("renaming nodes and reordering them cannot evade the physical fingerprint", () => {
  const a = causalFixture(), b = causalFixture();
  b.elements = b.elements.map((e, i) => ({ ...e, id: `new-${i}` })).reverse();
  b.relations = [{ from: "new-1", to: "new-0", action: "une el cierre" }];
  assert.equal(representationFingerprint(a), representationFingerprint(b));
});
test("the explicit General mode enforces the people limit even for PUBLIC audience", () => {
  const plans = Array.from({ length: 10 }, (_, i) => ({ ...plan(String(i)), subjectMode: "HUMAN_INTERACTION" as const, castPattern: `cast-${i}`, causalScene: causalFixture(String(i), "HUMAN_INTERACTION") }));
  const result = validateVisualArgumentBatch(plans, { mode: "LEGALMENTE_GENERAL", minimumDistinctFunctions: 1, minimumDistinctSceneStrategies: 1, minimumDistinctSubjectModes: 1 });
  assert.match(result.errors.join(), /overuses people-centered/);
});
test("LinkedIn continuity does not force six subject modes", () => {
  const plans = Array.from({ length: 10 }, (_, i) => ({ ...plan(String(i)), channel: "linkedin-legalmente" as const, imageArgument: `distinta evidencia ${i}`, causalScene: causalFixture(String(i)) }));
  const result = validateVisualArgumentBatch(plans, { mode: "LINKEDIN_LEGALMENTE" });
  assert.equal(result.ok, true, result.errors.join());
});
