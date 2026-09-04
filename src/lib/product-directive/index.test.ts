import assert from "node:assert/strict";
import test from "node:test";

import {
  contentFingerprint,
  isRepeatedCandidate,
  resolveProductionDecision,
  validateKnowledgeUnit,
  type KnowledgeUnitDescriptor,
} from "./index";

function baseUnit(overrides: Partial<KnowledgeUnitDescriptor> = {}): KnowledgeUnitDescriptor {
  return {
    id: "LM-UNIT-TEST-001",
    title: "Comprar un vehículo usado a un particular",
    matter: "CONTRATOS / CONSUMIDOR / BIENES",
    knowledgeLevel: "NEED_PROCESS",
    productLayer: "LEGALMENTE_NEEDS",
    entryDoor: "NEED",
    needOrQuestion: "¿Qué debo revisar antes de comprar un vehículo usado a un particular?",
    conceptIds: ["consentimiento", "propiedad", "prueba"],
    commonErrorOrTension: "Confundir pagar y recibir el vehículo con haber verificado titularidad, documentos y condiciones.",
    explanationOrApplication: "Ordenar qué revisar, qué conservar y qué preguntas cambian según territorio.",
    territoryMode: "VARIES_BY_TERRITORY",
    territories: [],
    sources: [
      {
        id: "SRC-1",
        tier: "MATTER_INSTITUTIONAL",
        label: "Fuente institucional de la materia",
        isPrimary: false,
      },
    ],
    relatedMatterIds: ["PROPERTY", "CONSUMER"],
    outputSurfaces: ["SOCIAL", "WEB", "TOOL"],
    visual: {
      communicatesConcept: true,
      physicalBrandIntegration: true,
      approvedSampleReferenceChecked: true,
      generatedBaseArtHasZeroCharacters: true,
      deterministicTypographyAfterGeneration: true,
      metaphor: "expediente de compra conectado físicamente al vehículo",
      visualSchool: "editorial cinematic realism",
      recentSimilarity: 0.2,
    },
    angle: "particular-vs-agencia",
    format: "checklist",
    ...overrides,
  };
}

test("valid need-first unit can move only to brief", () => {
  const unit = baseUnit();
  assert.deepEqual(validateKnowledgeUnit(unit), []);
  assert.deepEqual(resolveProductionDecision(unit), { state: "READY_FOR_BRIEF", reasons: [] });
});

test("panhispanic general unit cannot silently bind a country", () => {
  const errors = validateKnowledgeUnit(baseUnit({
    knowledgeLevel: "FOUNDATION",
    productLayer: "LEGALMENTE_BASIC",
    territoryMode: "PANHISPANIC_GENERAL",
    territories: ["México"],
    sources: [{ id: "SRC-G", tier: "STABLE_GENERAL", label: "Fuente general estable", isPrimary: false }],
  }));
  assert.ok(errors.some((error) => error.includes("Panhispanic-general")));
});

test("comparative unit requires explicit territories", () => {
  const errors = validateKnowledgeUnit(baseUnit({
    knowledgeLevel: "COMPARATIVE",
    productLayer: "LEGALMENTE_COMPARATIVE",
    territoryMode: "VARIES_BY_TERRITORY",
    sources: [{ id: "SRC-C", tier: "EXPLICIT_COMPARATIVE", label: "Comparación documentada", isPrimary: false }],
  }));
  assert.ok(errors.some((error) => error.includes("Comparative content")));
});

test("social visual enforces meaning, integrated brand, approved samples and split visual pipeline", () => {
  const errors = validateKnowledgeUnit(baseUnit({
    visual: {
      communicatesConcept: false,
      physicalBrandIntegration: false,
      approvedSampleReferenceChecked: false,
      generatedBaseArtHasZeroCharacters: false,
      deterministicTypographyAfterGeneration: false,
      metaphor: "",
      visualSchool: "",
    },
  }));
  assert.ok(errors.some((error) => error.includes("communicate the concept")));
  assert.ok(errors.some((error) => error.includes("physically integrated")));
  assert.ok(errors.some((error) => error.includes("sample images")));
  assert.ok(errors.some((error) => error.includes("zero letters")));
  assert.ok(errors.some((error) => error.includes("composed deterministically")));
});

test("Founder LinkedIn requires documented professional provenance", () => {
  const errors = validateKnowledgeUnit(baseUnit({ outputSurfaces: ["FOUNDER_LINKEDIN"] }));
  assert.ok(errors.some((error) => error.includes("professional evidence")));
});

test("exact content fingerprint repetition is blocked", () => {
  const unit = baseUnit();
  const fingerprint = contentFingerprint(unit);
  const repeated = baseUnit({ priorFingerprints: [fingerprint] });
  assert.equal(isRepeatedCandidate(repeated), true);
  assert.deepEqual(resolveProductionDecision(repeated), {
    state: "BLOCKED",
    reasons: ["DUPLICATE_CONTENT_FINGERPRINT"],
  });
});

test("missing sources routes candidate to research instead of filler", () => {
  const decision = resolveProductionDecision(baseUnit({ sources: [] }));
  assert.equal(decision.state, "READY_FOR_RESEARCH");
});
