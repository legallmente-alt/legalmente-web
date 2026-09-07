import assert from "node:assert/strict";
import test from "node:test";
import {
  historyItemIsActive,
  validateImprovementRecord,
  validateProductionBatch,
  type ProductionHistoryItem,
  type ProductionPiece,
} from "./index";

const domains = [
  "CIVIL",
  "FAMILY",
  "MERCANTILE",
  "PENAL",
  "LABOR",
  "ADMINISTRATIVE",
  "CONSTITUTIONAL",
  "HUMAN_RIGHTS",
  "ENVIRONMENTAL",
  "LEGAL_HISTORY_COMPARATIVE",
] as const;

const doors = ["CONCEPT", "DIFFERENCE", "HISTORY", "PROCESS", "EVIDENCE", "CASE", "MYTH", "TOOL", "CULTURE", "CONSEQUENCE"] as const;

function piece(index: number, overrides: Partial<ProductionPiece> = {}): ProductionPiece {
  return {
    id: `LM-POLICY-${index}`,
    legalDomainIds: [domains[index % domains.length]],
    entryDoor: doors[index % doors.length],
    topic: `Tema ${index}`,
    angle: `Ángulo ${index}`,
    legalRelation: `Relación ${index}`,
    hook: `Pregunta ${index}`,
    format: index % 2 === 0 ? "9:16" : "4:5",
    matterLabel: `Materia ${index}`,
    topicLabel: `Tema ${index}`,
    centralIdea: `Idea central ${index}`,
    sourceIds: [`SRC-${index}`],
    artisticStyle: `Estilo artístico ${index}`,
    visualMetaphor: `Metáfora ${index}`,
    scenario: `Escenario ${index}`,
    material: `Material ${index}`,
    lighting: `Luz ${index}`,
    framing: `Encuadre ${index}`,
    composition: `Composición ${index}`,
    brandObject: `Objeto físico ${index}`,
    visibleBrand: "LegalMente",
    brandIntegration: "PHYSICAL_SCENE",
    ...overrides,
  };
}

test("a broad 10-piece LegalMente batch passes with domain and art diversity", () => {
  const result = validateProductionBatch(Array.from({ length: 10 }, (_, index) => piece(index)));
  assert.equal(result.ok, true, result.errors.join("\n"));
});

test("general mode rejects digital overweighting", () => {
  const batch = Array.from({ length: 10 }, (_, index) => piece(index));
  batch[0] = piece(0, { legalDomainIds: ["DIGITAL_DATA_AI"] });
  batch[1] = piece(1, { legalDomainIds: ["DIGITAL_DATA_AI"] });
  const result = validateProductionBatch(batch);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /DIGITAL_DATA_AI/);
});

test("a 10-piece batch rejects repeated dominant art styles", () => {
  const batch = Array.from({ length: 10 }, (_, index) => piece(index));
  batch[9] = piece(9, { artisticStyle: batch[0].artisticStyle });
  const result = validateProductionBatch(batch);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /10 distinct dominant artistic styles/);
});

test("the LegalMente logo must belong physically to the scene", () => {
  const result = validateProductionBatch([piece(0, { brandIntegration: "OVERLAY" })], [], {
    mode: "SPECIFIC_DOMAIN",
    expectedSize: 1,
    requestedDomainId: "CIVIL",
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /physically integrated/);
});

test("specific-domain mode fails if a candidate drifts into another domain", () => {
  const result = validateProductionBatch([piece(0), piece(1)], [], {
    mode: "SPECIFIC_DOMAIN",
    expectedSize: 2,
    requestedDomainId: "CIVIL",
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /does not belong to requested domain CIVIL/);
});

test("approved history remains strong while old generated history expires from short memory", () => {
  const approved: ProductionHistoryItem = {
    ...piece(0),
    state: "APPROVED",
    recordedAt: "2025-01-01T00:00:00.000Z",
  };
  const oldGenerated: ProductionHistoryItem = {
    ...piece(1),
    state: "GENERATED",
    recordedAt: "2026-01-01T00:00:00.000Z",
  };

  assert.equal(historyItemIsActive(approved, "2026-09-07T19:00:00.000Z", 30), true);
  assert.equal(historyItemIsActive(oldGenerated, "2026-09-07T19:00:00.000Z", 30), false);

  const blocked = validateProductionBatch([piece(0)], [approved], {
    mode: "SPECIFIC_DOMAIN",
    expectedSize: 1,
    requestedDomainId: "CIVIL",
    now: "2026-09-07T19:00:00.000Z",
  });
  assert.equal(blocked.ok, false);
  assert.match(blocked.errors.join(" "), /anti-repetition memory/);

  const allowed = validateProductionBatch([piece(1)], [oldGenerated], {
    mode: "SPECIFIC_DOMAIN",
    expectedSize: 1,
    requestedDomainId: "FAMILY",
    now: "2026-09-07T19:00:00.000Z",
  });
  assert.equal(allowed.ok, true, allowed.errors.join("\n"));
});

test("LinkedIn modes require source bindings before review", () => {
  const result = validateProductionBatch([piece(0, { sourceIds: [] })], [], {
    mode: "LINKEDIN_LEGALMENTE",
    expectedSize: 1,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /source binding/);
});

test("agent improvements require evidence, test, result, decision and rollback", () => {
  const valid = validateImprovementRecord({
    problem: "Los lotes repiten materia y arte.",
    evidence: ["historial del lote", "feedback del Founder"],
    hypothesis: "El selector usa un universo demasiado estrecho.",
    proposedChange: "Separar conocimiento, arte y memoria de curación.",
    testPlan: "Generar una tanda de 10 y medir diversidad real.",
    result: "Pendiente de prueba visual.",
    decision: "Mantener en rama hasta validación.",
    rollback: "Revertir el commit de política.",
    affectedArtifacts: ["production-policy", "Drive v15"],
  });
  assert.equal(valid.ok, true, valid.errors.join("\n"));

  const invalid = validateImprovementRecord({
    problem: "Cambio sin reversibilidad",
    evidence: ["una observación"],
  });
  assert.equal(invalid.ok, false);
  assert.match(invalid.errors.join(" "), /rollback is required/);
});
