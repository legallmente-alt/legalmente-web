import assert from "node:assert/strict";
import test from "node:test";
import { concepts, processes, worlds } from "@/lib/knowledge-graph/content";
import {
  KNOWLEDGE_PILOT_RULES,
  PILOT_QUESTIONS,
  projectQuestion,
  resolveNextAction,
  validateCanonicalBinding,
  type CanonicalEnvelopeBinding,
  type QuestionContext,
} from "./index";

const openBinding: CanonicalEnvelopeBinding = {
  schemaVersion: "1.0",
  contentId: "LM-CANON-TEST-001",
  claimState: "APTO_PARA_NARRATIVA",
  sourceState: "VERIFICADA",
  legalGateState: "ABIERTO",
  jurisdictionLayer: "CAPA_C_NACIONAL",
  territories: ["MX"],
  claimIds: ["CLAIM-TEST-001"],
  sourceSystem: "Psyche-creation",
  sourceRevision: "test-revision",
  provenanceDigest: "a".repeat(64),
};

function withContext(id: string, overrides: Partial<QuestionContext> = {}): QuestionContext {
  const found = PILOT_QUESTIONS.find((question) => question.id === id);
  assert.ok(found, `Missing pilot question ${id}`);
  return { ...found, ...overrides };
}

test("pilot contains exactly 20 unique questions and branches", () => {
  assert.equal(PILOT_QUESTIONS.length, 20);
  assert.equal(new Set(PILOT_QUESTIONS.map((question) => question.id)).size, 20);
  assert.equal(new Set(PILOT_QUESTIONS.map((question) => question.branch.id)).size, 20);
  assert.equal(KNOWLEDGE_PILOT_RULES.pilotQuestionCount, 20);
});

test("pilot reuses existing graph worlds, concepts and processes instead of inventing a parallel taxonomy", () => {
  const worldIds = new Set(worlds.map((world) => world.id));
  const conceptIds = new Set(concepts.map((concept) => concept.id));
  const processIds = new Set(processes.map((process) => process.id));

  for (const question of PILOT_QUESTIONS) {
    for (const worldId of question.worldIds) assert.ok(worldIds.has(worldId), `${question.id} unknown world ${worldId}`);
    for (const conceptId of question.conceptIds) assert.ok(conceptIds.has(conceptId), `${question.id} unknown concept ${conceptId}`);
    assert.ok(conceptIds.has(question.branch.primaryConceptId), `${question.id} unknown primary concept`);
    for (const conceptId of question.branch.destinationConceptIds) assert.ok(conceptIds.has(conceptId), `${question.id} unknown destination concept ${conceptId}`);
    for (const processId of question.branch.destinationProcessIds) assert.ok(processIds.has(processId), `${question.id} unknown process ${processId}`);
  }
});

test("required jurisdiction blocks before any canonical or editorial work", () => {
  const result = resolveNextAction(withContext("LM-Q-007"));
  assert.equal(result.kind, "ASK_TERRITORY");
  assert.deepEqual(result.blockers, ["MISSING_TERRITORY"]);
});

test("after required territory the web requests Psyche canon rather than creating a claim", () => {
  const result = resolveNextAction(withContext("LM-Q-007", { territory: "MX" }));
  assert.equal(result.kind, "REQUEST_CANONICAL_BINDING");
  assert.match(result.reason, /Psyche/);
  assert.equal(KNOWLEDGE_PILOT_RULES.webMayApproveClaims, false);
  assert.equal(KNOWLEDGE_PILOT_RULES.webMayRecomputeSources, false);
  assert.equal(KNOWLEDGE_PILOT_RULES.webMayOpenLegalGate, false);
});

test("time-sensitive question asks for date after territory and before legal interpretation", () => {
  const result = resolveNextAction(withContext("LM-Q-004", { territory: "MX" }));
  assert.equal(result.kind, "ASK_RELEVANT_DATE");
});

test("privacy stop has priority over territory, date and source work", () => {
  const result = resolveNextAction(withContext("LM-Q-004", {
    question: "Mi correo es persona@example.com y acepté por WhatsApp, ¿qué pasa?",
  }));
  assert.equal(result.kind, "STOP_PRIVACY");
});

test("closed or pending canon never becomes a conclusive web adaptation", () => {
  const result = resolveNextAction(withContext("LM-Q-007", {
    territory: "MX",
    canonicalBinding: {
      ...openBinding,
      claimState: "PENDIENTE",
      sourceState: "PENDIENTE",
      legalGateState: "CERRADO",
    },
  }));
  assert.equal(result.kind, "REQUEST_SOURCE_REVIEW");
  assert.ok(result.blockers.some((blocker) => blocker.includes("PENDIENTE")));
});

test("open canon still respects concept-first learning when the question needs a primer", () => {
  const result = resolveNextAction(withContext("LM-Q-009", {
    territory: "MX",
    canonicalBinding: openBinding,
  }));
  assert.equal(result.kind, "LEARN_CONCEPT");
});

test("open canon can move to a bounded preparation process without becoming legal advice", () => {
  const result = resolveNextAction(withContext("LM-Q-001", { canonicalBinding: openBinding }));
  assert.equal(result.kind, "PREPARE_PROCESS");
});

test("public and professional projections share canonical identity but not voice or destination", () => {
  const question = withContext("LM-Q-008", {
    territory: "MX",
    canonicalBinding: openBinding,
  });
  const publicView = projectQuestion(question, "PUBLIC");
  const professionalView = projectQuestion(question, "PROFESSIONAL");

  assert.equal(publicView.questionId, professionalView.questionId);
  assert.equal(publicView.canonicalContentId, professionalView.canonicalContentId);
  assert.deepEqual(publicView.conceptIds, professionalView.conceptIds);
  assert.equal(publicView.mayChangeCanonicalClaim, false);
  assert.equal(professionalView.mayChangeCanonicalClaim, false);
  assert.equal(publicView.voice, "CLEAR_EDUCATIONAL");
  assert.equal(professionalView.voice, "PROFESSIONAL_DECISION_ORIENTED");
  assert.ok(!publicView.surfaces.includes("FOUNDER_LINKEDIN"));
  assert.ok(professionalView.surfaces.includes("FOUNDER_LINKEDIN"));
});

test("professional-only questions cannot leak into a public projection", () => {
  assert.throws(() => projectQuestion(withContext("LM-Q-016"), "PUBLIC"));
});

test("canonical adapter fails closed on wrong authority or fake digest", () => {
  const errors = validateCanonicalBinding({
    ...openBinding,
    sourceSystem: "Psyche-creation",
    provenanceDigest: "not-a-digest",
    legalGateState: "ABIERTO",
    claimState: "PENDIENTE",
  });
  assert.ok(errors.some((error) => /sha256/.test(error)));
  assert.ok(errors.some((error) => /APTO_PARA_NARRATIVA/.test(error)));
});
