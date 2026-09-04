import assert from "node:assert/strict";
import test from "node:test";

import { PILOT_QUESTIONS } from "@/lib/knowledge-pilot";
import { DEMO_OPPORTUNITIES } from "@/lib/opportunity-engine";

import { opportunityToKnowledgeUnit, questionToKnowledgeUnit } from "./adapters";
import { validateKnowledgeUnit } from "./index";

const matterSource = {
  id: "SRC-TEST",
  tier: "MATTER_INSTITUTIONAL" as const,
  label: "Institutional matter source",
  isPrimary: false,
};

test("opportunity engine candidate can be projected into one product descriptor", () => {
  const opportunity = DEMO_OPPORTUNITIES[0];
  const unit = opportunityToKnowledgeUnit(opportunity, {
    knowledgeLevel: "NEED_PROCESS",
    productLayer: "LEGALMENTE_NEEDS",
    entryDoor: "NEED",
    commonErrorOrTension: "Firmar sin ordenar obligaciones, evidencia y límites.",
    explanationOrApplication: "Preparar una ruta de revisión previa sin afirmar formalidades universales.",
    territoryMode: "VARIES_BY_TERRITORY",
    sources: [matterSource],
    angle: "preparacion-previa",
    format: "checklist-web",
  });

  assert.equal(unit.id, `UNIT:${opportunity.id}`);
  assert.deepEqual(validateKnowledgeUnit(unit), []);
});

test("knowledge pilot question can use the same descriptor without changing canonical binding", () => {
  const question = PILOT_QUESTIONS[0];
  const unit = questionToKnowledgeUnit(question, {
    knowledgeLevel: "NEED_PROCESS",
    productLayer: "LEGALMENTE_NEEDS",
    entryDoor: "QUESTION",
    commonErrorOrTension: "Confundir firma con comprensión suficiente de lo pactado.",
    explanationOrApplication: "Ordenar conceptos y preguntas antes de aceptar obligaciones.",
    territoryMode: "VARIES_BY_TERRITORY",
    sources: [matterSource],
    angle: "antes-de-firmar",
    format: "ruta-web",
  });

  assert.equal(unit.needOrQuestion, question.question);
  assert.ok(unit.outputSurfaces.includes("WEB"));
  assert.equal(question.canonicalBinding, undefined);
  assert.deepEqual(validateKnowledgeUnit(unit), []);
});
