import assert from "node:assert/strict";
import test from "node:test";
import {
  type EditorialCandidate,
  editorialContentFingerprint,
  editorialFingerprint,
  editorialPresentationFingerprint,
  editorialSemanticSimilarity,
  prioritizeBasicFirst,
  validateEditorialBatch,
} from "./index";

const formats = [
  "MEMORABLE_PHRASE", "REFLECTION", "CONCEPT", "GUIDE", "STEPS",
  "CHECKLIST", "COMPARISON", "LEGAL_MYTH", "HUMAN_SCENE", "HISTORY_CULTURE",
] as const;
const grammars = [
  "CINEMATIC_PHOTOGRAPHY", "EDITORIAL_STILL_LIFE", "CLASSICAL_REINTERPRETATION",
  "ARCHITECTURAL_MINIMALISM", "HISTORICAL_DOCUMENTARY", "CONCEPTUAL_SYMBOLISM",
] as const;

function candidate(index: number): EditorialCandidate {
  return {
    id: `LM-TEST-${index}`,
    topic: `Tema ${index}`,
    angle: `Angulo ${index}`,
    legalRelation: `Relacion ${index}`,
    audience: "publico general",
    depth: index < 4 ? "FOUNDATIONS" : "CORE_INSTITUTIONS",
    format: formats[index % formats.length],
    visualGrammar: grammars[index % grammars.length],
    visualMetaphor: `Metafora ${index}`,
    legalValue: 9,
    practicalUtility: 8,
    humanRelevance: 8,
    narrativePotential: 8,
    visualPotential: 9,
  };
}

test("a diverse ten-piece batch passes", () => {
  const result = validateEditorialBatch(Array.from({ length: 10 }, (_, index) => candidate(index)));
  assert.equal(result.ok, true);
});

test("semantic combination blocks repetition from history", () => {
  const item = candidate(1);
  const result = validateEditorialBatch([item], [{ ...item }]);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /already exists in history/);
  assert.equal(editorialFingerprint(item), result.fingerprints[0]);
});

test("changing format or art direction does not turn repeated knowledge into a new topic", () => {
  const original = candidate(2);
  const adaptation = {
    ...original,
    id: "LM-ADAPTATION",
    format: "GUIDE" as const,
    visualGrammar: "ARCHITECTURAL_MINIMALISM" as const,
    visualMetaphor: "una puerta y un umbral",
  };

  assert.equal(editorialContentFingerprint(original), editorialContentFingerprint(adaptation));
  assert.notEqual(editorialPresentationFingerprint(original), editorialPresentationFingerprint(adaptation));
  const result = validateEditorialBatch([adaptation], [original]);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /substance already exists/);
});

test("renaming a substantially identical idea is detected as a near-duplicate", () => {
  const original: EditorialCandidate = {
    ...candidate(3),
    topic: "Consentimiento antes de firmar un contrato",
    angle: "Qué significa aceptar y por qué importa antes de obligarse",
    legalRelation: "consentimiento obligacion contrato",
  };
  const renamed: EditorialCandidate = {
    ...candidate(4),
    id: "LM-RENAMED",
    topic: "Contrato y consentimiento antes de firmar",
    angle: "Por qué aceptar importa antes de asumir una obligación",
    legalRelation: "obligacion contrato consentimiento",
    format: "COMPARISON",
    visualGrammar: "EDITORIAL_STILL_LIFE",
    visualMetaphor: "dos documentos enfrentados",
  };

  assert.ok(editorialSemanticSimilarity(original, renamed) >= 0.82);
  const result = validateEditorialBatch([renamed], [original]);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /Near-duplicate/);
});

test("procedural depth requires explicit jurisdiction", () => {
  const item = { ...candidate(1), depth: "JURISDICTION_AND_PROCEDURE" as const };
  const result = validateEditorialBatch([item]);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /Jurisdiction is required/);
});

test("basic-first ordering prefers foundations", () => {
  const deep = { ...candidate(8), depth: "SPECIALTIES" as const };
  const basic = { ...candidate(2), depth: "RIGHTS_AND_DUTIES" as const };
  assert.equal(prioritizeBasicFirst([deep, basic])[0].id, basic.id);
});
