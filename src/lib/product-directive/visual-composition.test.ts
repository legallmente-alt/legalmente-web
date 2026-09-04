import assert from "node:assert/strict";
import test from "node:test";

import {
  BASE_ART_CHARACTER_POLICY,
  resolveVisualCompositionDecision,
  validateVisualCompositionPlan,
  type VisualCompositionPlan,
} from "./visual-composition";

function plan(overrides: Partial<VisualCompositionPlan> = {}): VisualCompositionPlan {
  return {
    contentId: "LM-PILOT-VISUAL-001",
    baseArt: {
      generatedByVisualProvider: true,
      characterPolicy: BASE_ART_CHARACTER_POLICY,
      containsLetters: false,
      containsNumbers: false,
      containsPseudoText: false,
      reservedBrandSurface: "PLAQUE",
    },
    deterministicComposition: {
      required: true,
      brandText: "LegalMente",
      brandPhysicallyIntegrated: true,
      arbitraryOverlayForbidden: true,
      watermarkForbidden: true,
      editorialText: [
        {
          role: "QUESTION",
          exactText: "¿Qué debería revisar antes de firmar?",
          contentPackField: "EXACT_COPY.question",
          sourceBound: false,
        },
      ],
    },
    qa: {
      exactTextAgainstApprovedContent: true,
      mobileReadable: true,
      perspectiveCoherent: true,
      materialCoherent: true,
      lightCoherent: true,
      noCollage: true,
      noImproperRepetition: true,
      humanReviewRequired: true,
    },
    ...overrides,
  };
}

test("base art must remain character-free while final asset may contain composed editorial text", () => {
  const candidate = plan();
  assert.deepEqual(validateVisualCompositionPlan(candidate), []);
  assert.equal(candidate.deterministicComposition.editorialText.length, 1);
  assert.equal(candidate.baseArt.containsLetters, false);
});

test("provider-generated letters are blocked", () => {
  const candidate = plan({
    baseArt: {
      generatedByVisualProvider: true,
      characterPolicy: BASE_ART_CHARACTER_POLICY,
      containsLetters: true as false,
      containsNumbers: false,
      containsPseudoText: false,
      reservedBrandSurface: "PLAQUE",
    },
  });
  assert.ok(validateVisualCompositionPlan(candidate).includes("BASE_ART_CONTAINS_LETTERS"));
});

test("brand spelling and physical integration are fail-closed", () => {
  const candidate = plan({
    deterministicComposition: {
      required: true,
      brandText: "LEGALMENTE" as "LegalMente",
      brandPhysicallyIntegrated: false,
      arbitraryOverlayForbidden: true,
      watermarkForbidden: true,
      editorialText: [],
    },
  });
  const errors = validateVisualCompositionPlan(candidate);
  assert.ok(errors.includes("BRAND_TEXT_MUST_BE_EXACT_LEGALMENTE"));
  assert.ok(errors.includes("BRAND_MUST_BE_PHYSICALLY_INTEGRATED"));
});

test("quote, author and source labels require approved source binding", () => {
  const candidate = plan({
    deterministicComposition: {
      required: true,
      brandText: "LegalMente",
      brandPhysicallyIntegrated: true,
      arbitraryOverlayForbidden: true,
      watermarkForbidden: true,
      editorialText: [
        { role: "QUOTE", exactText: "Texto", contentPackField: "quote", sourceBound: false },
      ],
    },
  });
  assert.ok(validateVisualCompositionPlan(candidate).includes("SOURCE_BINDING_REQUIRED:QUOTE"));
});

test("pipeline advances base art -> composition -> human QA and never auto-publishes", () => {
  const candidate = plan();
  assert.equal(resolveVisualCompositionDecision(candidate, "BEFORE_BASE_ART").state, "READY_FOR_BASE_ART");
  assert.equal(resolveVisualCompositionDecision(candidate, "AFTER_BASE_ART").state, "READY_FOR_COMPOSITION");
  assert.equal(resolveVisualCompositionDecision(candidate, "AFTER_COMPOSITION").state, "READY_FOR_HUMAN_QA");
});

test("failed final QA blocks the asset", () => {
  const candidate = plan({
    qa: {
      exactTextAgainstApprovedContent: false,
      mobileReadable: true,
      perspectiveCoherent: true,
      materialCoherent: true,
      lightCoherent: true,
      noCollage: true,
      noImproperRepetition: true,
      humanReviewRequired: true,
    },
  });
  const decision = resolveVisualCompositionDecision(candidate, "AFTER_COMPOSITION");
  assert.equal(decision.state, "BLOCKED");
  assert.ok(decision.reasons.includes("TEXT_EXACT_QA"));
});
