import assert from "node:assert/strict";
import test from "node:test";

import type { ContractPreparationRecord } from "./model";
import { buildContractPreparationOutputs } from "./outputs";

const baseRecord = (): ContractPreparationRecord => ({
  contractId: "contract-output-demo-001",
  contractType: "SERVICES",
  mode: "BASIC",
  dataMode: "SYNTHETIC_ONLY",
  parties: [
    { partyId: "party-a", role: "Cliente", kind: "LEGAL_ENTITY", displayLabel: "Parte A" },
    { partyId: "party-b", role: "Proveedor", kind: "LEGAL_ENTITY", displayLabel: "Parte B" },
  ],
  representatives: [
    {
      representativeId: "rep-a",
      partyId: "party-a",
      basis: "POWER",
      displayLabel: "Firmante A",
      authorityReview: "REVIEW_REQUIRED",
      instrumentReference: "instrumento-sintetico",
    },
  ],
  object: {
    summary: "Preparación contractual sintética",
    purpose: "Probar salidas estructuradas",
    scope: ["Entregable sintético"],
    exclusions: [],
    deliverables: ["Resultado sintético"],
  },
  obligations: [
    {
      obligationId: "obl-1",
      actorPartyId: "party-b",
      beneficiaryPartyId: "party-a",
      action: "Entregar el resultado sintético",
      timing: "2026-09-15",
      evidenceExpected: "Constancia sintética de entrega",
      nonPerformanceHandling: "Pendiente de revisión",
    },
  ],
  consideration: {
    description: "Contraprestación sintética",
    amounts: [
      {
        amountId: "amt-1",
        description: "Pago sintético",
        value: 1000,
        currency: "MXN",
        paymentTiming: "Después del hito sintético",
      },
    ],
    taxTreatmentStatus: "NOT_EVALUATED",
  },
  timeline: {
    signatureDate: "2026-09-01",
    effectiveDate: "2026-09-01",
    obligationStartDate: "2026-09-02",
    endDate: "2026-10-01",
    termDescription: "Treinta días sintéticos",
    renewal: "No evaluada",
    noticePeriod: "No evaluado",
    milestones: [
      {
        milestoneId: "milestone-1",
        description: "Entrega sintética",
        due: "2026-09-15",
        evidenceExpected: "Constancia sintética",
      },
    ],
  },
  termination: "Pendiente de revisión territorial",
  territory: { status: "UNSELECTED", sourceRefs: [] },
  clauseComponents: [],
  reviewFlags: [],
});

test("builds brief, party, representation, obligation, timeline and payment outputs", () => {
  const output = buildContractPreparationOutputs(baseRecord());

  assert.equal(output.brief.contractId, "contract-output-demo-001");
  assert.equal(output.brief.outputState, "STRUCTURED_PREPARATION_ONLY");
  assert.equal(output.partyMap.length, 2);
  assert.deepEqual(output.partyMap[0].signerLabels, ["Firmante A"]);
  assert.equal(output.representationMap[0].partyLabel, "Parte A");
  assert.equal(output.obligationMatrix[0].actorLabel, "Parte B");
  assert.equal(output.obligationMatrix[0].beneficiaryLabel, "Parte A");
  assert.equal(output.timeline.some((item) => item.eventType === "MILESTONE"), true);
  assert.equal(output.paymentSchedule[0].currency, "MXN");
});

test("surfaces fail-closed review questions without inventing a draft", () => {
  const output = buildContractPreparationOutputs(baseRecord());

  assert.equal(output.realDraftAllowed, false);
  assert.equal(output.draftPreview, null);
  assert.equal(
    output.preparationRedFlags.some((item) => item.code === "TERRITORIAL_RESEARCH_REQUIRED"),
    true,
  );
  assert.equal(
    output.preparationRedFlags.some((item) => item.code === "POWER_REVIEW_REQUIRED"),
    true,
  );
  assert.equal(output.professionalReviewQuestions.length >= 2, true);
  assert.equal(output.annexChecklist.state, "NOT_MODELLED_IN_V1");
});

test("real draft remains blocked even when upstream technical draft eligibility becomes true", () => {
  const record = baseRecord();
  record.representatives[0].authorityReview = "REVIEWED_FOR_TERRITORY";
  record.territory = { status: "SELECTED", countryCode: "MX", sourceRefs: ["synthetic-source"] };
  record.clauseComponents = [
    {
      clauseId: "synthetic-verified-component",
      purpose: "Synthetic technical eligibility test",
      status: "VERIFIED_FOR_TERRITORY",
      territory: "MX",
      sourceRefs: ["synthetic-source"],
      requiresHumanReview: false,
    },
  ];

  const output = buildContractPreparationOutputs(record);
  assert.equal(output.brief.preparationStatus, "STRUCTURED_BRIEF_READY");
  assert.equal(output.realDraftAllowed, false);
  assert.equal(output.draftPreview, null);
});

test("missing inputs are separated from other preparation red flags", () => {
  const record = baseRecord();
  record.object.summary = "";
  record.obligations[0].timing = "";

  const output = buildContractPreparationOutputs(record);
  assert.equal(output.missingInformation.length >= 1, true);
  assert.equal(output.missingInformation.every((item) => item.code === "MISSING_INPUT"), true);
  assert.equal(output.preparationRedFlags.some((item) => item.code === "MISSING_INPUT"), false);
});
