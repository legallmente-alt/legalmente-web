import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  FileIntelligenceFrontRepository,
  captureSignal,
  classifySignal,
  createTopicCandidate,
  emptyStore,
  routeToRadar,
  validateStore,
} from "./index";

const input = {
  channel: "EDITORIAL" as const,
  rawText: "La audiencia confunde representación con ocupar un cargo.",
  sourceLabel: "editorial-review-2026-09-12",
  fields: {
    concern: "confusión sobre representación",
    functionalContext: "decisión profesional",
    scope: "panhispánico; requiere revisión territorial",
    subject: "representación societaria",
  },
};

test("builds a traceable signal -> classification -> topic -> radar chain", () => {
  const signal = captureSignal(input);
  const classification = classifySignal(signal, {
    signalId: signal.id,
    needType: "CONFUSION",
    audience: "PROFESSIONAL",
    confidence: 0.9,
    rationale: "La pregunta pide distinguir cargo formal, poder y alcance de representación.",
  });
  const topic = createTopicCandidate(signal, classification, {
    signalId: signal.id,
    classificationId: classification.id,
    question: "¿Cuándo un cargo permite representar a una sociedad y cuándo hace falta poder?",
  });
  const radar = routeToRadar(signal, topic, {
    signalId: signal.id,
    candidateId: topic.id,
    freshness: "EVERGREEN",
    priorityHint: "HIGH",
    evidenceClass: "INTERNAL_QUALITATIVE",
  });
  const store = { schemaVersion: "1.0" as const, signals: [signal], classifications: [classification], topicCandidates: [topic], radarSignals: [radar] };
  assert.deepEqual(validateStore(store), []);
  assert.equal(radar.candidateId, topic.id);
  assert.equal(topic.classificationId, classification.id);
});

test("rejects sensitive signal text before persistence", () => {
  assert.throws(() => captureSignal({ ...input, rawText: "Escríbeme en raymundo@example.com sobre mi expediente 123456." }), /empty or contains sensitive data/i);
});

test("does not allow measured evidence without a measurement record", () => {
  const signal = captureSignal(input);
  const classification = classifySignal(signal, { signalId: signal.id, needType: "QUESTION", audience: "BOTH", confidence: 0.5, rationale: "Hipótesis editorial." });
  const topic = createTopicCandidate(signal, classification, { signalId: signal.id, classificationId: classification.id, question: "¿Qué conviene entender?" });
  const radar = routeToRadar(signal, topic, { signalId: signal.id, candidateId: topic.id, freshness: "UNKNOWN", priorityHint: "LOW", evidenceClass: "MEASURED_FIRST_PARTY" });
  const errors = validateStore({ schemaVersion: "1.0", signals: [signal], classifications: [classification], topicCandidates: [topic], radarSignals: [radar] });
  assert.match(errors.join("\n"), /cannot claim measured evidence/i);
});

test("persists atomically and reloads the same traceable store", async () => {
  const directory = await mkdtemp(join(tmpdir(), "legalmente-intelligence-"));
  const path = join(directory, "front.json");
  const repository = new FileIntelligenceFrontRepository(path);
  const signal = await repository.appendSignal(input);
  const classification = await repository.appendClassification(signal.id, {
    needType: "QUESTION",
    audience: "BOTH",
    confidence: 0.7,
    rationale: "La señal requiere una explicación inicial.",
  });
  const topic = await repository.appendTopicCandidate(signal.id, classification.id, {
    question: "¿Qué conviene entender primero?",
  });
  await repository.appendRadarSignal(signal.id, topic.id, {
    freshness: "EVERGREEN",
    priorityHint: "MEDIUM",
    evidenceClass: "EDITORIAL_HYPOTHESIS",
  });
  const loaded = await repository.read();
  assert.equal(loaded.signals[0]?.id, signal.id);
  assert.equal(loaded.classifications[0]?.id, classification.id);
  assert.equal(loaded.topicCandidates[0]?.id, topic.id);
  assert.equal(loaded.radarSignals[0]?.candidateId, topic.id);
  assert.deepEqual(JSON.parse(await readFile(path, "utf8")), loaded);
});

test("empty store is valid and safe as the initial state", () => {
  assert.deepEqual(validateStore(emptyStore()), []);
});
