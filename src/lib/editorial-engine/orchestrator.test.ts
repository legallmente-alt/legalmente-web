import assert from "node:assert/strict";
import test from "node:test";
import {
  MULTI_AXIS_EDITORIAL_RULES,
  prioritizeForLane,
  routeEditorialCandidate,
  validatePlanningCandidate,
  type EditorialPlanningCandidate,
} from "./orchestrator";

function planningCandidate(overrides: Partial<EditorialPlanningCandidate> = {}): EditorialPlanningCandidate {
  return {
    id: "LM-PLAN-001",
    topic: "Consentimiento",
    angle: "Por qué una decisión cotidiana puede producir efectos jurídicos",
    legalRelation: "manifestación de voluntad y obligación",
    audience: "publico general",
    depth: "RIGHTS_AND_DUTIES",
    format: "CONCEPT",
    visualGrammar: "CONCEPTUAL_SYMBOLISM",
    visualMetaphor: "una puerta que cambia de estado al cruzarla",
    legalValue: 9,
    practicalUtility: 8,
    humanRelevance: 9,
    narrativePotential: 8,
    visualPotential: 8,
    demandClass: "MASS",
    temporalClass: "EVERGREEN",
    normativeSourceKinds: ["FOUNDATIONAL_PRINCIPLE"],
    humanFrame: {
      situation: "Una persona acepta una condición antes de continuar.",
      observableConduct: "Acepta, firma o ejecuta una conducta equivalente.",
      legalRelation: "Puede aparecer una relación entre voluntad, derechos y deberes.",
      objectOrPerformance: "La conducta o prestación que se acepta.",
      timeContext: "Importa qué se sabía y qué ocurrió antes y después de aceptar.",
      evidence: "Documento, registro, mensaje o conducta observable.",
      verifiableRule: "La regla aplicable debe verificarse antes de afirmar efectos concretos.",
      limit: "Los requisitos y efectos pueden variar por materia y jurisdicción.",
      nextQuestion: "¿Qué se aceptó exactamente y cómo puede demostrarse?",
    },
    bindings: {
      worldIds: ["vida-cotidiana"],
      legalDomainIds: ["CIVIL"],
      conceptIds: ["consentimiento"],
    },
    signals: {
      massAppeal: 9,
      professionalValue: 4,
      currentRelevance: 2,
      productPotential: 5,
      sourceRobustness: 8,
    },
    ...overrides,
  };
}

test("a mass evergreen concept routes to the public lane", () => {
  const route = routeEditorialCandidate(planningCandidate());
  assert.equal(route.primary, "PUBLIC_GENERAL");
});

test("specialized corporate knowledge routes to founder LinkedIn", () => {
  const candidate = planningCandidate({
    id: "LM-PLAN-CORP",
    topic: "Facultades de representación en una operación corporativa",
    audience: "directivos y profesionales",
    depth: "SPECIALTIES",
    demandClass: "PROFESSIONAL",
    bindings: {
      worldIds: ["empresa-comercio"],
      legalDomainIds: ["CORPORATE", "CONTRACTS"],
      conceptIds: ["representacion", "poder"],
    },
    signals: {
      massAppeal: 3,
      professionalValue: 10,
      currentRelevance: 5,
      productPotential: 7,
      sourceRobustness: 9,
    },
  });

  const route = routeEditorialCandidate(candidate);
  assert.equal(route.primary, "FOUNDER_LINKEDIN");
  assert.ok(route.scores.FOUNDER_LINKEDIN > route.scores.PUBLIC_GENERAL);
});

test("current mass-interest content routes to Radar when sources are robust", () => {
  const candidate = planningCandidate({
    id: "LM-PLAN-RADAR",
    temporalClass: "CURRENT",
    depth: "CONCRETE_PROBLEMS",
    signals: {
      massAppeal: 9,
      professionalValue: 5,
      currentRelevance: 10,
      productPotential: 4,
      sourceRobustness: 10,
    },
  });

  assert.equal(validatePlanningCandidate(candidate).ok, true);
  assert.equal(routeEditorialCandidate(candidate).primary, "RADAR_CURRENT");
});

test("time-sensitive content with weak sourcing fails before routing", () => {
  const result = validatePlanningCandidate(planningCandidate({
    temporalClass: "VOLATILE",
    signals: {
      massAppeal: 8,
      professionalValue: 5,
      currentRelevance: 9,
      productPotential: 4,
      sourceRobustness: 4,
    },
  }));

  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /sourceRobustness/);
});

test("founder LinkedIn may intentionally prioritize specialized content", () => {
  const basic = planningCandidate({ id: "LM-BASIC", depth: "FOUNDATIONS" });
  const specialist = planningCandidate({
    id: "LM-SPECIALIST",
    depth: "SPECIALTIES",
    bindings: {
      worldIds: ["empresa-comercio"],
      legalDomainIds: ["CORPORATE"],
      conceptIds: ["representacion"],
    },
    signals: {
      massAppeal: 2,
      professionalValue: 10,
      currentRelevance: 5,
      productPotential: 7,
      sourceRobustness: 9,
    },
  });

  assert.equal(prioritizeForLane([basic, specialist], "FOUNDER_LINKEDIN")[0].id, "LM-SPECIALIST");
});

test("normative hierarchy remains jurisdiction-aware rather than universally ranked", () => {
  assert.equal(MULTI_AXIS_EDITORIAL_RULES.universalNormativeRankingForbidden, true);
  assert.equal(MULTI_AXIS_EDITORIAL_RULES.normativePrecedenceRequiresJurisdictionAdapter, true);
});
