import assert from "node:assert/strict";
import test from "node:test";

import {
  ContractPreparationRecord,
  evaluateContractPreparation,
} from "./model";

const baseRecord = (): ContractPreparationRecord => ({
  contractId: "contract-demo-001",
  contractType: "SERVICES",
  mode: "BASIC",
  dataMode: "SYNTHETIC_ONLY",
  parties: [
    { partyId: "party-a", role: "Cliente", kind: "LEGAL_ENTITY", displayLabel: "Parte A" },
    { partyId: "party-b", role: "Proveedor", kind: "NATURAL_PERSON", displayLabel: "Parte B" },
  ],
  representatives: [],
  object: {
    summary: "Servicios editoriales sintéticos",
    scope: ["Entregar una pieza editorial"],
    exclusions: [],
    deliverables: ["Entrega sintética"],
  },
  obligations: [
    {
      obligationId: "obl-1",
      actorPartyId: "party-b",
      beneficiaryPartyId: "party-a",
      action: "Entregar el servicio descrito",
      timing: "Según el hito acordado",
      evidenceExpected: "Constancia sintética de entrega",
    },
  ],
  consideration: {
    description: "Contraprestación sintética",
    amounts: [
      {
        amountId: "amt-1",
        description: "Precio",
        value: null,
        currency: null,
        paymentTiming: "Pendiente de definición",
      },
    ],
    taxTreatmentStatus: "NOT_EVALUATED",
  },
  timeline: {
    signatureDate: null,
    effectiveDate: null,
    obligationStartDate: null,
    endDate: null,
    termDescription: "Pendiente de fechas concretas",
    renewal: "No evaluada",
    noticePeriod: "No evaluado",
    milestones: [],
  },
  termination: "Pendiente de revisión territorial",
  territory: { status: "UNSELECTED", sourceRefs: [] },
  clauseComponents: [],
  reviewFlags: [],
});

test("synthetic prototype fails closed before territory and clause verification", () => {
  const result = evaluateContractPreparation(baseRecord());
  assert.equal(result.status, "TERRITORIAL_RESEARCH_REQUIRED");
  assert.equal(result.draftEligible, false);
  assert.equal(
    result.issues.some((issue) => issue.code === "TERRITORIAL_RESEARCH_REQUIRED"),
    true,
  );
  assert.equal(
    result.issues.some((issue) => issue.code === "CLAUSE_VERIFICATION_REQUIRED"),
    true,
  );
});

test("representation does not become sufficient merely because a representative exists", () => {
  const record = baseRecord();
  record.territory = { status: "SELECTED", countryCode: "MX", sourceRefs: ["synthetic-source"] };
  record.clauseComponents = [
    {
      clauseId: "synthetic-clause",
      purpose: "Synthetic test component",
      status: "VERIFIED_FOR_TERRITORY",
      territory: "MX",
      sourceRefs: ["synthetic-source"],
      requiresHumanReview: false,
    },
  ];
  record.representatives = [
    {
      representativeId: "rep-1",
      partyId: "party-a",
      basis: "POWER",
      displayLabel: "Representante sintético",
      authorityReview: "REVIEW_REQUIRED",
      instrumentReference: "instrumento-sintetico",
    },
  ];

  const result = evaluateContractPreparation(record);
  assert.equal(result.status, "PROFESSIONAL_REVIEW_REQUIRED");
  assert.equal(result.draftEligible, false);
  assert.equal(result.issues.some((issue) => issue.code === "POWER_REVIEW_REQUIRED"), true);
});

test("obligations require actor, timing and expected evidence", () => {
  const record = baseRecord();
  record.obligations[0] = {
    ...record.obligations[0],
    actorPartyId: "unknown-party",
    timing: "",
    evidenceExpected: "",
  };

  const result = evaluateContractPreparation(record);
  assert.equal(result.status, "MISSING_INPUT");
  assert.equal(result.draftEligible, false);
  assert.equal(result.issues.some((issue) => issue.code === "MISSING_INPUT"), true);
});

test("draft eligibility requires territory, verified components and resolved representation", () => {
  const record = baseRecord();
  record.territory = { status: "SELECTED", countryCode: "MX", sourceRefs: ["synthetic-source"] };
  record.clauseComponents = [
    {
      clauseId: "synthetic-clause",
      purpose: "Synthetic test component",
      status: "VERIFIED_FOR_TERRITORY",
      territory: "MX",
      sourceRefs: ["synthetic-source"],
      requiresHumanReview: false,
    },
  ];

  const result = evaluateContractPreparation(record);
  assert.equal(result.status, "STRUCTURED_BRIEF_READY");
  assert.equal(result.draftEligible, true);
});
