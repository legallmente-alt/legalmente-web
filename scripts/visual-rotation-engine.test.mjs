import test from "node:test";
import assert from "node:assert/strict";
import { combinationKey, evaluateCandidate } from "./visual-rotation-engine.mjs";

const base = {
  world: "vida-cotidiana",
  legalDomain: "laboral",
  concept: "objeto y alcance",
  visualSchool: "fotografía cinematográfica de foco único",
  scenario: "mercado al amanecer",
  revelation: "luz que cruza una grieta",
  framing: "plano medio",
  humanPresence: "detalle de manos",
  brandObject: "placa de latón",
  dominantPalette: "marfil editorial y azul petróleo",
};

const next = { ...base, visualSchool: "xilografía de gubia", scenario: "taller mecánico", revelation: "sedimento que se asienta", framing: "cenital", humanPresence: "objeto sin rostro" };

 test("combinationKey is stable and changes when an axis changes", () => {
  assert.equal(combinationKey(base), combinationKey({ ...base }));
  assert.notEqual(combinationKey(base), combinationKey({ ...base, scenario: "azotea urbana" }));
});

test("rejects exact combination collisions", () => {
  const history = [{ ...base, combinationKey: combinationKey(base), assetId: "LM-VIS-001" }];
  assert.equal(evaluateCandidate(base, history).state, "REJECTED_EXACT_COLLISION");
});

test("rejects a visual school used within the last five entries", () => {
  const history = [
    { ...base, visualSchool: "otra escuela", combinationKey: "a" },
    { ...base, visualSchool: "escuela dos", combinationKey: "b" },
    { ...base, visualSchool: "escuela tres", combinationKey: "c" },
    { ...base, visualSchool: "escuela cuatro", combinationKey: "d" },
    { ...base, visualSchool: base.visualSchool, combinationKey: "e" },
  ];
  assert.equal(evaluateCandidate({ ...next, visualSchool: base.visualSchool }, history).state, "REJECTED_SCHOOL_RECENCY");
});

test("requires at least three changed axes from the previous entry", () => {
  const history = [{ ...base, combinationKey: combinationKey(base) }];
  assert.equal(evaluateCandidate({ ...base, visualSchool: "escuela nueva", scenario: "obra parada" }, history).state, "REJECTED_INSUFFICIENT_VARIATION");
  assert.equal(evaluateCandidate(next, history).state, "READY");
});

test("fails closed when the prior record lacks enough comparable axes", () => {
  const sparse = [{ contentId: "LM-PC-999", visualSchool: "otra escuela", scenario: "obra parada", combinationKey: "sparse" }];
  const candidate = { ...base, visualSchool: "escuela nueva", scenario: "azotea urbana", revelation: "humo de un sello" };
  assert.equal(evaluateCandidate(candidate, sparse).state, "HOLD_INSUFFICIENT_HISTORY");
});
