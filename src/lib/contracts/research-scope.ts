export type ContractResearchStatus = "RESEARCH_AUTHORIZED";
export type ContractDraftStatus = "REAL_DRAFT_BLOCKED";

export type ContractPilotId =
  | "SERVICES_B2B"
  | "NDA"
  | "SUPPLIER_RELATIONSHIP"
  | "SIMPLE_B2B_SALE";

export interface ContractResearchScope {
  territoryCode: "MX";
  territoryStatus: ContractResearchStatus;
  pilotIds: readonly ContractPilotId[];
  draftStatus: ContractDraftStatus;
  piiAllowed: false;
  realDocumentsAllowed: false;
  paymentsAllowed: false;
  professionalServiceActivationAllowed: false;
}

/**
 * Founder decision of 2026-08-28.
 *
 * This is a research authorization only. It MUST NOT be interpreted as
 * territorial legal coverage, clause verification, publication approval,
 * service activation, or permission to generate a real contract draft.
 */
export const founderApprovedContractResearchScope: ContractResearchScope = {
  territoryCode: "MX",
  territoryStatus: "RESEARCH_AUTHORIZED",
  pilotIds: [
    "SERVICES_B2B",
    "NDA",
    "SUPPLIER_RELATIONSHIP",
    "SIMPLE_B2B_SALE",
  ],
  draftStatus: "REAL_DRAFT_BLOCKED",
  piiAllowed: false,
  realDocumentsAllowed: false,
  paymentsAllowed: false,
  professionalServiceActivationAllowed: false,
};

export function isPilotAuthorizedForResearch(pilotId: string): pilotId is ContractPilotId {
  return founderApprovedContractResearchScope.pilotIds.includes(pilotId as ContractPilotId);
}

export function canGenerateRealDraft(): false {
  return false;
}
