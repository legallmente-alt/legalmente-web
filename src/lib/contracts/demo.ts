import type { ContractPreparationRecord } from "./model";

/**
 * Non-identifiable fixture used by the public prototype surface.
 * It intentionally remains incomplete and territorially unresolved so the UI demonstrates fail-closed behavior.
 */
export const syntheticContractPreparationDemo: ContractPreparationRecord = {
  contractId: "contract-demo-services-001",
  contractType: "SERVICES_RESEARCH_PILOT",
  mode: "BASIC",
  dataMode: "SYNTHETIC_ONLY",
  parties: [
    { partyId: "party-a", role: "Contratante", kind: "LEGAL_ENTITY", displayLabel: "Parte A" },
    { partyId: "party-b", role: "Proveedor", kind: "LEGAL_ENTITY", displayLabel: "Parte B" },
  ],
  representatives: [
    {
      representativeId: "rep-a",
      partyId: "party-a",
      basis: "POWER",
      displayLabel: "Firmante A",
      authorityReview: "REVIEW_REQUIRED",
      instrumentReference: "Referencia sintética de representación",
    },
  ],
  object: {
    summary: "Preparación sintética de un acuerdo de servicios entre empresas",
    purpose: "Demostrar cómo se estructura el acuerdo antes de redactar",
    scope: ["Definir entregables", "Ordenar obligaciones", "Separar fechas y pagos"],
    exclusions: ["No determina régimen jurídico", "No valida representación"],
    deliverables: ["Resultado sintético de ejemplo"],
  },
  obligations: [
    {
      obligationId: "obl-provider-delivery",
      actorPartyId: "party-b",
      beneficiaryPartyId: "party-a",
      action: "Entregar el resultado sintético acordado",
      timing: "Según el hito sintético",
      evidenceExpected: "Constancia sintética de entrega",
      nonPerformanceHandling: "Pendiente de definición y revisión",
    },
  ],
  consideration: {
    description: "Contraprestación sintética pendiente de reglas territoriales",
    amounts: [
      {
        amountId: "amount-demo",
        description: "Monto de ejemplo",
        value: 1000,
        currency: "MXN",
        paymentTiming: "Después del hito sintético",
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
    milestones: [
      {
        milestoneId: "milestone-demo",
        description: "Entrega sintética",
        due: "Pendiente",
        evidenceExpected: "Constancia sintética",
      },
    ],
  },
  termination: "Pendiente de definición y revisión territorial",
  territory: { status: "UNSELECTED", sourceRefs: [] },
  clauseComponents: [],
  reviewFlags: [],
};
