import {
  evaluateContractPreparation,
  type ContractPreparationEvaluation,
  type ContractPreparationRecord,
  type ContractReviewFlag,
} from "./model";

export type ContractOutputState = "STRUCTURED_PREPARATION_ONLY";

export interface ContractBriefOutput {
  contractId: string;
  contractType: string;
  mode: ContractPreparationRecord["mode"];
  territoryCode: string | null;
  summary: string;
  preparationStatus: ContractPreparationEvaluation["status"];
  outputState: ContractOutputState;
}

export interface ContractPartyMapRow {
  partyId: string;
  role: string;
  kind: ContractPreparationRecord["parties"][number]["kind"];
  displayLabel: string;
  signerLabels: string[];
  representationBases: string[];
  authorityReviewStates: string[];
}

export interface ContractRepresentationMapRow {
  representativeId: string;
  partyId: string;
  partyLabel: string;
  representativeLabel: string;
  basis: string;
  authorityReview: string;
  instrumentReference: string | null;
}

export interface ContractObligationMatrixRow {
  obligationId: string;
  actorPartyId: string;
  actorLabel: string;
  beneficiaryPartyId: string | null;
  beneficiaryLabel: string | null;
  action: string;
  timing: string;
  evidenceExpected: string;
  nonPerformanceHandling: string | null;
}

export interface ContractTimelineEvent {
  eventType: "SIGNATURE" | "EFFECTIVE" | "OBLIGATION_START" | "END" | "MILESTONE";
  label: string;
  value: string | null;
  evidenceExpected: string | null;
}

export interface ContractPaymentScheduleRow {
  amountId: string;
  description: string;
  value: number | null;
  currency: string | null;
  paymentTiming: string;
}

export interface ContractAnnexChecklistOutput {
  state: "NOT_MODELLED_IN_V1";
  items: readonly [];
  message: string;
}

export interface ContractPreparationOutputs {
  brief: ContractBriefOutput;
  partyMap: ContractPartyMapRow[];
  representationMap: ContractRepresentationMapRow[];
  obligationMatrix: ContractObligationMatrixRow[];
  timeline: ContractTimelineEvent[];
  paymentSchedule: ContractPaymentScheduleRow[];
  missingInformation: ContractReviewFlag[];
  preparationRedFlags: ContractReviewFlag[];
  annexChecklist: ContractAnnexChecklistOutput;
  professionalReviewQuestions: string[];
  realDraftAllowed: false;
  draftPreview: null;
}

function partyLabel(record: ContractPreparationRecord, partyId: string | undefined): string | null {
  if (!partyId) return null;
  return record.parties.find((party) => party.partyId === partyId)?.displayLabel ?? null;
}

function buildProfessionalReviewQuestions(flags: ContractReviewFlag[]): string[] {
  const questions: string[] = [];
  const add = (question: string) => {
    if (!questions.includes(question)) questions.push(question);
  };

  for (const flag of flags) {
    switch (flag.code) {
      case "POWER_REVIEW_REQUIRED":
        add("¿Qué facultades y limitaciones deben revisarse antes de confiar en la representación declarada?");
        break;
      case "TERRITORIAL_RESEARCH_REQUIRED":
        add("¿Qué reglas del territorio seleccionado cambian esta preparación contractual?");
        break;
      case "CLAUSE_VERIFICATION_REQUIRED":
        add("¿Qué componentes contractuales necesitan fuente y verificación territorial antes de utilizarse?");
        break;
      case "PROFESSIONAL_REVIEW_REQUIRED":
        add("¿Qué punto requiere revisión profesional y qué información debe prepararse para esa revisión?");
        break;
      default:
        break;
    }
  }

  return questions;
}

/**
 * Builds preparation outputs from structured data only.
 *
 * This adapter intentionally cannot produce contractual prose or a signable draft.
 * Even if an upstream evaluation later reports technical draft eligibility, V1 remains
 * restricted to preparation outputs until a separate founder/release gate changes that policy.
 */
export function buildContractPreparationOutputs(
  record: ContractPreparationRecord,
): ContractPreparationOutputs {
  const evaluation = evaluateContractPreparation(record);
  const blocking = evaluation.issues.filter((issue) => issue.severity === "BLOCKING");
  const missingInformation = blocking.filter((issue) => issue.code === "MISSING_INPUT");

  const partyMap: ContractPartyMapRow[] = record.parties.map((party) => {
    const representatives = record.representatives.filter((item) => item.partyId === party.partyId);
    return {
      partyId: party.partyId,
      role: party.role,
      kind: party.kind,
      displayLabel: party.displayLabel,
      signerLabels: representatives.map((item) => item.displayLabel),
      representationBases: representatives.map((item) => item.basis),
      authorityReviewStates: representatives.map((item) => item.authorityReview),
    };
  });

  const representationMap: ContractRepresentationMapRow[] = record.representatives.map((representative) => ({
    representativeId: representative.representativeId,
    partyId: representative.partyId,
    partyLabel: partyLabel(record, representative.partyId) ?? representative.partyId,
    representativeLabel: representative.displayLabel,
    basis: representative.basis,
    authorityReview: representative.authorityReview,
    instrumentReference: representative.instrumentReference ?? null,
  }));

  const obligationMatrix: ContractObligationMatrixRow[] = record.obligations.map((obligation) => ({
    obligationId: obligation.obligationId,
    actorPartyId: obligation.actorPartyId,
    actorLabel: partyLabel(record, obligation.actorPartyId) ?? obligation.actorPartyId,
    beneficiaryPartyId: obligation.beneficiaryPartyId ?? null,
    beneficiaryLabel: partyLabel(record, obligation.beneficiaryPartyId),
    action: obligation.action,
    timing: obligation.timing,
    evidenceExpected: obligation.evidenceExpected,
    nonPerformanceHandling: obligation.nonPerformanceHandling ?? null,
  }));

  const timeline: ContractTimelineEvent[] = [
    {
      eventType: "SIGNATURE",
      label: "Fecha de firma",
      value: record.timeline.signatureDate,
      evidenceExpected: null,
    },
    {
      eventType: "EFFECTIVE",
      label: "Fecha de efectos",
      value: record.timeline.effectiveDate,
      evidenceExpected: null,
    },
    {
      eventType: "OBLIGATION_START",
      label: "Inicio de obligaciones",
      value: record.timeline.obligationStartDate,
      evidenceExpected: null,
    },
    ...record.timeline.milestones.map((milestone) => ({
      eventType: "MILESTONE" as const,
      label: milestone.description,
      value: milestone.due,
      evidenceExpected: milestone.evidenceExpected,
    })),
    {
      eventType: "END",
      label: "Fin previsto",
      value: record.timeline.endDate,
      evidenceExpected: null,
    },
  ];

  return {
    brief: {
      contractId: record.contractId,
      contractType: record.contractType,
      mode: record.mode,
      territoryCode:
        record.territory.status === "SELECTED" ? record.territory.countryCode ?? null : null,
      summary: record.object.summary,
      preparationStatus: evaluation.status,
      outputState: "STRUCTURED_PREPARATION_ONLY",
    },
    partyMap,
    representationMap,
    obligationMatrix,
    timeline,
    paymentSchedule: record.consideration.amounts.map((amount) => ({
      amountId: amount.amountId,
      description: amount.description,
      value: amount.value,
      currency: amount.currency,
      paymentTiming: amount.paymentTiming,
    })),
    missingInformation,
    preparationRedFlags: blocking.filter((issue) => issue.code !== "MISSING_INPUT"),
    annexChecklist: {
      state: "NOT_MODELLED_IN_V1",
      items: [],
      message: "Los anexos todavía no forman parte del Contract Record V1; no se inventan ni se infieren.",
    },
    professionalReviewQuestions: buildProfessionalReviewQuestions(blocking),
    realDraftAllowed: false,
    draftPreview: null,
  };
}
