import assert from "node:assert/strict";
import test from "node:test";
import {
  historyItemIsActive,
  productionContentFingerprint,
  productionVisualFingerprint,
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
    format: "9:16",
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
    artBaseIsClean: true,
    typographyCompositor: "CANONICAL",
    ...overrides,
  };
}

test("a broad 10-piece LegalMente batch passes with domain and art diversity", () => {
  const result = validateProductionBatch(Array.from({ length: 10 }, (_, index) => piece(index)));
  assert.equal(result.ok, true, result.errors.join("\n"));
});

test("general mode keeps digital topics paused unless explicitly enabled", () => {
  const batch = Array.from({ length: 10 }, (_, index) => piece(index));
  batch[0] = piece(0, { legalDomainIds: ["DIGITAL_DATA_AI"] });

  const blocked = validateProductionBatch(batch);
  assert.equal(blocked.ok, false);
  assert.match(blocked.errors.join(" "), /paused/);

  const allowed = validateProductionBatch(batch, [], { mode: "LEGALMENTE_GENERAL", allowDigitalTopics: true });
  assert.equal(allowed.ok, true, allowed.errors.join("\n"));
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

test("base art stays clean and typography is reserved for the canonical compositor", () => {
  const dirty = validateProductionBatch([piece(0, { artBaseIsClean: false })], [], {
    mode: "SPECIFIC_DOMAIN",
    expectedSize: 1,
    requestedDomainId: "CIVIL",
  });
  assert.equal(dirty.ok, false);
  assert.match(dirty.errors.join(" "), /base art must remain clean/);
});

test("format follows channel defaults unless a concrete batch override is explicit", () => {
  const linkedin = validateProductionBatch([piece(0, { format: "4:5" })], [], {
    mode: "LINKEDIN_FOUNDER",
    expectedSize: 1,
  });
  assert.equal(linkedin.ok, true, linkedin.errors.join("\n"));

  const wrongLinkedin = validateProductionBatch([piece(0, { format: "9:16" })], [], {
    mode: "LINKEDIN_FOUNDER",
    expectedSize: 1,
  });
  assert.equal(wrongLinkedin.ok, false);
  assert.match(wrongLinkedin.errors.join(" "), /format must be 4:5/);

  const overridden = validateProductionBatch([piece(0, { format: "1:1" })], [], {
    mode: "SPECIFIC_DOMAIN",
    expectedSize: 1,
    requestedDomainId: "CIVIL",
    formatOverride: "1:1",
  });
  assert.equal(overridden.ok, true, overridden.errors.join("\n"));
});

test("changing only the hook does not create a new editorial identity", () => {
  const original = piece(0);
  const repackaged = piece(0, { id: "LM-POLICY-NEW", hook: "Otro gancho para la misma idea" });
  assert.equal(productionContentFingerprint(original), productionContentFingerprint(repackaged));

  const result = validateProductionBatch([original, repackaged], [], {
    mode: "SPECIFIC_DOMAIN",
    expectedSize: 2,
    requestedDomainId: "CIVIL",
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /repeated editorial substance/);
});

test("changing only crop or lighting does not create a new visual identity", () => {
  const original = piece(0);
  const cosmeticVariant = piece(0, {
    id: "LM-POLICY-VISUAL-NEW",
    topic: "Tema visual alterno",
    angle: "Ángulo visual alterno",
    legalRelation: "Relación visual alterna",
    centralIdea: "Idea visual alterna",
    lighting: "Otra luz",
    framing: "Otro encuadre",
  });
  assert.equal(productionVisualFingerprint(original), productionVisualFingerprint(cosmeticVariant));

  const result = validateProductionBatch([original, cosmeticVariant], [], {
    mode: "SPECIFIC_DOMAIN",
    expectedSize: 2,
    requestedDomainId: "CIVIL",
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /repeated visual identity/);
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
  const result = validateProductionBatch([piece(0, { sourceIds: [], format: "4:5" })], [], {
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
    affectedArtifacts: ["production-policy", "Drive v16"],
  });
  assert.equal(valid.ok, true, valid.errors.join("\n"));

  const invalid = validateImprovementRecord({
    problem: "Cambio sin reversibilidad",
    evidence: ["una observación"],
  });
  assert.equal(invalid.ok, false);
  assert.match(invalid.errors.join(" "), /rollback is required/);
});
