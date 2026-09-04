export type ContractMode = "BASIC" | "DETAILED";
export type ContractDataMode = "SYNTHETIC_ONLY";
export type ContractTerritoryStatus = "UNSELECTED" | "SELECTED";
export type ContractPreparationStatus =
  | "MISSING_INPUT"
  | "TERRITORIAL_RESEARCH_REQUIRED"
  | "PROFESSIONAL_REVIEW_REQUIRED"
  | "STRUCTURED_BRIEF_READY"
  | "DRAFT_ELIGIBILITY_PENDING";

export type PartyKind = "NATURAL_PERSON" | "LEGAL_ENTITY" | "OTHER_ENTITY";
export type RepresentationBasis = "SELF" | "POWER" | "ORGANIC" | "OTHER";
export type AuthorityReviewStatus =
  | "NOT_REQUIRED"
  | "NOT_REVIEWED"
  | "REVIEW_REQUIRED"
  | "REVIEWED_FOR_TERRITORY";

export type ClauseComponentStatus =
  | "UNVERIFIED"
  | "VERIFIED_FOR_TERRITORY"
  | "PROFESSIONAL_ONLY";

export type ReviewFlagCode =
  | "MISSING_INPUT"
  | "TERRITORIAL_RESEARCH_REQUIRED"
  | "PROFESSIONAL_REVIEW_REQUIRED"
  | "POWER_REVIEW_REQUIRED"
  | "CLAUSE_VERIFICATION_REQUIRED"
  | "PII_DISABLED";

export type ReviewFlagSeverity = "INFO" | "BLOCKING";

export interface ContractParty {
  partyId: string;
  role: string;
  kind: PartyKind;
  /** Synthetic display label only. Real identity intake is intentionally not modelled in V1. */
  displayLabel: string;
}

export interface ContractRepresentative {
  representativeId: string;
  partyId: string;
  basis: RepresentationBasis;
  displayLabel: string;
  authorityReview: AuthorityReviewStatus;
  instrumentReference?: string;
}

export interface ContractObject {
  summary: string;
  purpose?: string;
  scope: string[];
  exclusions: string[];
  deliverables: string[];
}

export interface ContractObligation {
  obligationId: string;
  actorPartyId: string;
  beneficiaryPartyId?: string;
  action: string;
  timing: string;
  evidenceExpected: string;
  nonPerformanceHandling?: string;
}

export interface ContractAmount {
  amountId: string;
  description: string;
  value: number | null;
  currency: string | null;
  paymentTiming: string;
}

export interface ContractConsideration {
  description: string;
  amounts: ContractAmount[];
  taxTreatmentStatus: "NOT_EVALUATED" | "TERRITORIAL_REVIEW_REQUIRED";
}

export interface ContractTimeline {
  signatureDate: string | null;
  effectiveDate: string | null;
  obligationStartDate: string | null;
  endDate: string | null;
  termDescription: string;
  renewal: string;
  noticePeriod: string;
  milestones: Array<{
    milestoneId: string;
    description: string;
    due: string;
    evidenceExpected: string;
  }>;
}

export interface ContractTerritory {
  status: ContractTerritoryStatus;
  countryCode?: string;
  subdivision?: string;
  sourceRefs: string[];
}

export interface ContractClauseComponent {
  clauseId: string;
  purpose: string;
  status: ClauseComponentStatus;
  territory?: string;
  sourceRefs: string[];
  requiresHumanReview: boolean;
}

export interface ContractReviewFlag {
  code: ReviewFlagCode;
  severity: ReviewFlagSeverity;
  message: string;
}

export interface ContractPreparationRecord {
  contractId: string;
  contractType: string;
  mode: ContractMode;
  dataMode: ContractDataMode;
  parties: ContractParty[];
  representatives: ContractRepresentative[];
  object: ContractObject;
  obligations: ContractObligation[];
  consideration: ContractConsideration;
  timeline: ContractTimeline;
  termination: string;
  territory: ContractTerritory;
  clauseComponents: ContractClauseComponent[];
  reviewFlags: ContractReviewFlag[];
}

export interface ContractPreparationEvaluation {
  status: ContractPreparationStatus;
  draftEligible: boolean;
  issues: ContractReviewFlag[];
}

const nonEmpty = (value: string | null | undefined) => Boolean(value?.trim());

const unique = (values: string[]) => new Set(values).size === values.length;

export function evaluateContractPreparation(
  record: ContractPreparationRecord,
): ContractPreparationEvaluation {
  const issues: ContractReviewFlag[] = [...record.reviewFlags];
  const add = (code: ReviewFlagCode, message: string) => {
    if (!issues.some((issue) => issue.code === code && issue.message === message)) {
      issues.push({ code, severity: "BLOCKING", message });
    }
  };

  if (record.dataMode !== "SYNTHETIC_ONLY") {
    add("PII_DISABLED", "V1 only permits synthetic, non-identifiable data.");
  }

  if (!nonEmpty(record.contractId) || !nonEmpty(record.contractType)) {
    add("MISSING_INPUT", "Contract identifier and contract type are required.");
  }

  if (record.parties.length < 2) {
    add("MISSING_INPUT", "At least two contract parties are required.");
  }

  const partyIds = record.parties.map((party) => party.partyId);
  if (!unique(partyIds) || partyIds.some((id) => !nonEmpty(id))) {
    add("MISSING_INPUT", "Party IDs must be present and unique.");
  }

  if (record.parties.some((party) => !nonEmpty(party.role) || !nonEmpty(party.displayLabel))) {
    add("MISSING_INPUT", "Each party needs a role and a synthetic display label.");
  }

  for (const representative of record.representatives) {
    if (!partyIds.includes(representative.partyId)) {
      add("MISSING_INPUT", `Representative ${representative.representativeId} references an unknown party.`);
    }
    if (
      representative.basis !== "SELF" &&
      representative.authorityReview !== "REVIEWED_FOR_TERRITORY"
    ) {
      add(
        "POWER_REVIEW_REQUIRED",
        `Representation for ${representative.partyId} must be reviewed for the selected territory before draft eligibility.`,
      );
    }
  }

  if (!nonEmpty(record.object.summary) || record.object.scope.length === 0) {
    add("MISSING_INPUT", "The contract object needs a summary and at least one scope item.");
  }

  if (record.obligations.length === 0) {
    add("MISSING_INPUT", "At least one obligation is required.");
  }

  for (const obligation of record.obligations) {
    if (!partyIds.includes(obligation.actorPartyId)) {
      add("MISSING_INPUT", `Obligation ${obligation.obligationId} has an unknown actor party.`);
    }
    if (obligation.beneficiaryPartyId && !partyIds.includes(obligation.beneficiaryPartyId)) {
      add("MISSING_INPUT", `Obligation ${obligation.obligationId} has an unknown beneficiary party.`);
    }
    if (!nonEmpty(obligation.action) || !nonEmpty(obligation.timing) || !nonEmpty(obligation.evidenceExpected)) {
      add(
        "MISSING_INPUT",
        `Obligation ${obligation.obligationId} must state action, timing and expected evidence.`,
      );
    }
  }

  if (!nonEmpty(record.timeline.termDescription)) {
    add("MISSING_INPUT", "The contract timeline needs a term description.");
  }

  if (record.territory.status !== "SELECTED" || !nonEmpty(record.territory.countryCode)) {
    add(
      "TERRITORIAL_RESEARCH_REQUIRED",
      "A territory must be selected before any local-rule or clause evaluation.",
    );
  }

  if (record.clauseComponents.length === 0) {
    add(
      "CLAUSE_VERIFICATION_REQUIRED",
      "No verified clause components are attached; draft generation remains blocked.",
    );
  }

  for (const clause of record.clauseComponents) {
    if (clause.status !== "VERIFIED_FOR_TERRITORY") {
      add(
        clause.status === "PROFESSIONAL_ONLY"
          ? "PROFESSIONAL_REVIEW_REQUIRED"
          : "CLAUSE_VERIFICATION_REQUIRED",
        `Clause component ${clause.clauseId} is not verified for the selected territory.`,
      );
    }
    if (clause.requiresHumanReview) {
      add(
        "PROFESSIONAL_REVIEW_REQUIRED",
        `Clause component ${clause.clauseId} requires human professional review.`,
      );
    }
  }

  const blocking = issues.filter((issue) => issue.severity === "BLOCKING");
  const has = (code: ReviewFlagCode) => blocking.some((issue) => issue.code === code);

  let status: ContractPreparationStatus = "DRAFT_ELIGIBILITY_PENDING";
  if (has("MISSING_INPUT") || has("PII_DISABLED")) {
    status = "MISSING_INPUT";
  } else if (has("TERRITORIAL_RESEARCH_REQUIRED") || has("CLAUSE_VERIFICATION_REQUIRED")) {
    status = "TERRITORIAL_RESEARCH_REQUIRED";
  } else if (has("PROFESSIONAL_REVIEW_REQUIRED") || has("POWER_REVIEW_REQUIRED")) {
    status = "PROFESSIONAL_REVIEW_REQUIRED";
  } else if (blocking.length === 0) {
    status = "STRUCTURED_BRIEF_READY";
  }

  const draftEligible =
    status === "STRUCTURED_BRIEF_READY" &&
    record.territory.status === "SELECTED" &&
    record.clauseComponents.length > 0 &&
    record.clauseComponents.every(
      (clause) => clause.status === "VERIFIED_FOR_TERRITORY" && !clause.requiresHumanReview,
    ) &&
    record.representatives.every(
      (representative) =>
        representative.basis === "SELF" ||
        representative.authorityReview === "REVIEWED_FOR_TERRITORY",
    );

  return { status, draftEligible, issues };
}
