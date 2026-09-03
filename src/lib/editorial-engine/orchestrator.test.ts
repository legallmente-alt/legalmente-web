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

test("a mass evergreen concept routes to the public lane and public/web surfaces", () => {
  const route = routeEditorialCandidate(planningCandidate());
  assert.equal(route.primary, "PUBLIC_GENERAL");
  assert.deepEqual(new Set(route.surfaces), new Set(["WEB_KNOWLEDGE", "LEGALMENTE_PUBLIC"]));
});

test("specialized corporate knowledge routes to founder LinkedIn surface", () => {
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
  assert.deepEqual(new Set(route.surfaces), new Set(["WEB_KNOWLEDGE", "FOUNDER_LINKEDIN"]));
});

test("current mass-interest content routes through Radar to public distribution", () => {
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
  const route = routeEditorialCandidate(candidate);
  assert.equal(route.primary, "RADAR_CURRENT");
  assert.ok(route.surfaces.includes("LEGALMENTE_PUBLIC"));
  assert.ok(route.surfaces.includes("WEB_KNOWLEDGE"));
});

test("professional current content can use Radar while distributing to founder LinkedIn", () => {
  const candidate = planningCandidate({
    id: "LM-RADAR-PRO",
    temporalClass: "CURRENT",
    depth: "JURISDICTION_AND_PROCEDURE",
    jurisdiction: "MX",
    bindings: {
      worldIds: ["empresa-comercio"],
      legalDomainIds: ["CORPORATE", "TAX"],
      conceptIds: ["representacion"],
    },
    signals: {
      massAppeal: 3,
      professionalValue: 9,
      currentRelevance: 10,
      productPotential: 5,
      sourceRobustness: 10,
    },
  });

  const route = routeEditorialCandidate(candidate);
  assert.equal(route.primary, "RADAR_CURRENT");
  assert.ok(route.surfaces.includes("FOUNDER_LINKEDIN"));
  assert.ok(!route.surfaces.includes("LEGALMENTE_PUBLIC"));
});

test("product preparation is an internal lane and PRODUCT_TOOL is the destination", () => {
  const candidate = planningCandidate({
    id: "LM-PRODUCT",
    lane: "PRODUCT_PREPARATION",
    depth: "CORE_INSTITUTIONS",
    practicalUtility: 10,
    signals: {
      massAppeal: 8,
      professionalValue: 8,
      currentRelevance: 2,
      productPotential: 10,
      sourceRobustness: 9,
    },
  });

  assert.equal(validatePlanningCandidate(candidate).ok, true);
  const route = routeEditorialCandidate(candidate);
  assert.equal(route.primary, "PRODUCT_PREPARATION");
  assert.ok(route.surfaces.includes("PRODUCT_TOOL"));
  assert.ok(route.surfaces.includes("LEGALMENTE_PUBLIC"));
  assert.ok(route.surfaces.includes("FOUNDER_LINKEDIN"));
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
  assert.equal(MULTI_AXIS_EDITORIAL_RULES.lanesAreInternalOrchestration, true);
  assert.equal(MULTI_AXIS_EDITORIAL_RULES.surfacesAreActualDestinations, true);
});
