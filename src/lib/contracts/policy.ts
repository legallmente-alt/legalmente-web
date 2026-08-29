import type { ContractMode } from "./model";

export const BASIC_MODE_FIELD_GROUPS = [
  "AGREEMENT_TYPE",
  "PARTIES",
  "SIGNER_REPRESENTATION",
  "OBJECT",
  "PRIMARY_OBLIGATIONS",
  "CONSIDERATION",
  "TIMELINE",
  "CHANGES_TERMINATION",
  "TERRITORY",
  "REVIEW_SUMMARY",
] as const;

export const DETAILED_MODE_FIELD_GROUPS = [
  "REPRESENTATION_DETAIL",
  "MULTIPLE_OBLIGATIONS",
  "MILESTONES",
  "PAYMENT_CONDITIONS",
  "ANNEXES",
  "CONFIDENTIALITY",
  "INTELLECTUAL_PROPERTY",
  "RISK_ALLOCATION",
  "RENEWAL_TERMINATION_DETAIL",
  "NOTIFICATIONS",
  "DISPUTE_MECHANISM",
  "DEPENDENCIES_EXCEPTIONS",
] as const;

export function getContractModePolicy(mode: ContractMode) {
  return {
    mode,
    visibleGroups:
      mode === "BASIC"
        ? [...BASIC_MODE_FIELD_GROUPS]
        : [...BASIC_MODE_FIELD_GROUPS, ...DETAILED_MODE_FIELD_GROUPS],
    sameContractRecord: true as const,
    realPiiAllowed: false as const,
  };
}

export type TimelineConflictCode =
  | "END_BEFORE_START"
  | "PAYMENT_BEFORE_TRIGGER"
  | "NOTICE_LONGER_THAN_REMAINING_TERM"
  | "MILESTONE_OUTSIDE_TERM"
  | "EFFECTIVE_DATE_AMBIGUOUS"
  | "DELIVERY_WITHOUT_OBLIGATION"
  | "RENEWAL_WITHOUT_NOTICE_RULE"
  | "TERMINATION_WITHOUT_EFFECTS";

export interface TimelineConflict {
  code: TimelineConflictCode;
  message: string;
}

export interface ContractTimelinePolicyInput {
  effectiveDate: string | null;
  obligationStartDate: string | null;
  endDate: string | null;
  renewal: "NONE" | "MANUAL" | "AUTOMATIC" | null;
  noticePeriodDays: number | null;
  terminationDate: string | null;
  terminationEffectsDefined: boolean;
  obligationIds: string[];
  deliveryDates: Array<{ obligationId: string; date: string | null }>;
  paymentDates: Array<{ paymentId: string; date: string | null; triggerDate: string | null }>;
  milestones: Array<{ milestoneId: string; date: string | null }>;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function asUtcDay(value: string | null): number | null {
  if (!value || !ISO_DATE.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return Math.floor(date.getTime() / 86_400_000);
}

export function evaluateContractTimeline(input: ContractTimelinePolicyInput): TimelineConflict[] {
  const conflicts: TimelineConflict[] = [];
  const add = (code: TimelineConflictCode, message: string) => {
    if (!conflicts.some((item) => item.code === code && item.message === message)) {
      conflicts.push({ code, message });
    }
  };

  const startDay = asUtcDay(input.obligationStartDate);
  const effectiveDay = asUtcDay(input.effectiveDate);
  const endDay = asUtcDay(input.endDate);

  if (effectiveDay === null) {
    add("EFFECTIVE_DATE_AMBIGUOUS", "The effective date is missing or cannot be interpreted as a concrete date.");
  }

  if (startDay !== null && endDay !== null && endDay < startDay) {
    add("END_BEFORE_START", "The end date is earlier than the obligation start date.");
  }

  for (const payment of input.paymentDates) {
    const paymentDay = asUtcDay(payment.date);
    const triggerDay = asUtcDay(payment.triggerDate);
    if (paymentDay !== null && triggerDay !== null && paymentDay < triggerDay) {
      add("PAYMENT_BEFORE_TRIGGER", `Payment ${payment.paymentId} is scheduled before its trigger.`);
    }
  }

  if (
    startDay !== null &&
    endDay !== null &&
    input.noticePeriodDays !== null &&
    input.noticePeriodDays > endDay - startDay
  ) {
    add(
      "NOTICE_LONGER_THAN_REMAINING_TERM",
      "The notice period is longer than the currently modelled contract term.",
    );
  }

  for (const milestone of input.milestones) {
    const milestoneDay = asUtcDay(milestone.date);
    if (
      milestoneDay !== null &&
      ((startDay !== null && milestoneDay < startDay) || (endDay !== null && milestoneDay > endDay))
    ) {
      add("MILESTONE_OUTSIDE_TERM", `Milestone ${milestone.milestoneId} falls outside the modelled term.`);
    }
  }

  const obligationIds = new Set(input.obligationIds);
  for (const delivery of input.deliveryDates) {
    if (!obligationIds.has(delivery.obligationId)) {
      add(
        "DELIVERY_WITHOUT_OBLIGATION",
        `Delivery references unknown obligation ${delivery.obligationId}.`,
      );
    }
  }

  if (input.renewal === "AUTOMATIC" && input.noticePeriodDays === null) {
    add("RENEWAL_WITHOUT_NOTICE_RULE", "Automatic renewal is modelled without a notice rule.");
  }

  if (input.terminationDate && !input.terminationEffectsDefined) {
    add("TERMINATION_WITHOUT_EFFECTS", "A termination date exists but its effects are not defined.");
  }

  return conflicts;
}

export type RepresentationPrecheckStatus =
  | "INFORMATION_COMPLETE"
  | "MISSING_DOCUMENT"
  | "AUTHORITY_SCOPE_REVIEW_REQUIRED"
  | "TERRITORIAL_REVIEW_REQUIRED"
  | "PROFESSIONAL_REVIEW_REQUIRED";

export interface RepresentationPrecheckInput {
  partyType: "NATURAL_PERSON" | "LEGAL_ENTITY" | "OTHER_ENTITY";
  signerRole: string;
  representationBasis: "SELF" | "POWER" | "ORGANIC" | "OTHER";
  instrumentReference: string | null;
  instrumentDate: string | null;
  validityIfApplicable: string | null;
  authorityScope: string[];
  limitations: string[];
  specialAuthorityFlags: string[];
  territoryCode: string | null;
  forceProfessionalReview?: boolean;
}

export interface RepresentationPrecheckResult {
  status: RepresentationPrecheckStatus;
  blockers: string[];
  canConcludeAuthoritySufficient: false;
}

export function evaluateRepresentationPrecheck(
  input: RepresentationPrecheckInput,
): RepresentationPrecheckResult {
  const blockers: string[] = [];

  if (!input.territoryCode?.trim()) {
    return {
      status: "TERRITORIAL_REVIEW_REQUIRED",
      blockers: ["Territory is required before reviewing representation rules."],
      canConcludeAuthoritySufficient: false,
    };
  }

  if (input.forceProfessionalReview) {
    return {
      status: "PROFESSIONAL_REVIEW_REQUIRED",
      blockers: ["The declared representation scenario is outside the educational precheck boundary."],
      canConcludeAuthoritySufficient: false,
    };
  }

  if (input.representationBasis !== "SELF") {
    if (!input.instrumentReference?.trim()) {
      blockers.push("Representation instrument or declared basis evidence is missing.");
    }
    if (!input.instrumentDate?.trim()) {
      blockers.push("Representation instrument date is missing.");
    }
    if (blockers.length > 0) {
      return { status: "MISSING_DOCUMENT", blockers, canConcludeAuthoritySufficient: false };
    }
  }

  if (
    input.representationBasis !== "SELF" &&
    (input.authorityScope.length === 0 || input.limitations.length > 0 || input.specialAuthorityFlags.length > 0)
  ) {
    return {
      status: "AUTHORITY_SCOPE_REVIEW_REQUIRED",
      blockers: [
        "Authority scope, limitations or special-authority flags require review; the precheck cannot declare sufficiency.",
      ],
      canConcludeAuthoritySufficient: false,
    };
  }

  return { status: "INFORMATION_COMPLETE", blockers: [], canConcludeAuthoritySufficient: false };
}

export type ClauseLibraryStatus =
  | "RESEARCH_REQUIRED"
  | "VERIFIED_FOR_TERRITORY"
  | "PROFESSIONAL_ONLY"
  | "RETIRED";

export type ClauseJurisdictionLayer = "TRANSVERSAL" | "COMPARATIVE" | "TERRITORIAL";
export type ClauseRiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface ClauseComponentContract {
  clauseId: string;
  purpose: string;
  contractTypes: string[];
  jurisdictionLayer: ClauseJurisdictionLayer;
  territory: string[];
  variablesRequired: string[];
  legalSourceRefs: string[];
  riskLevel: ClauseRiskLevel;
  compatibleWith: string[];
  conflictsWith: string[];
  requiresHumanReview: boolean;
  version: string;
  lastVerified: string;
  status: ClauseLibraryStatus;
}

export interface ClauseComponentValidation {
  validMetadata: boolean;
  usableForDraftAssembly: boolean;
  issues: string[];
}

export function validateClauseComponent(
  component: ClauseComponentContract,
  context: { contractType: string; territoryCode: string | null },
): ClauseComponentValidation {
  const issues: string[] = [];
  const requiredText: Array<[string, string]> = [
    ["clauseId", component.clauseId],
    ["purpose", component.purpose],
    ["version", component.version],
    ["lastVerified", component.lastVerified],
  ];
  for (const [field, value] of requiredText) {
    if (!value.trim()) issues.push(`${field} is required.`);
  }
  if (!ISO_DATE.test(component.lastVerified)) issues.push("lastVerified must be an ISO date.");
  if (component.contractTypes.length === 0) issues.push("contractTypes must not be empty.");
  if (component.legalSourceRefs.length === 0) issues.push("legalSourceRefs must not be empty.");
  if (component.jurisdictionLayer === "TERRITORIAL" && component.territory.length === 0) {
    issues.push("Territorial clauses require at least one territory.");
  }
  if (!component.contractTypes.includes(context.contractType)) {
    issues.push("Clause is not declared compatible with the requested contract type.");
  }
  if (
    component.jurisdictionLayer === "TERRITORIAL" &&
    (!context.territoryCode || !component.territory.includes(context.territoryCode))
  ) {
    issues.push("Clause is not verified for the requested territory.");
  }

  const usableForDraftAssembly =
    issues.length === 0 &&
    component.status === "VERIFIED_FOR_TERRITORY" &&
    !component.requiresHumanReview &&
    component.riskLevel !== "HIGH";

  return { validMetadata: issues.length === 0, usableForDraftAssembly, issues };
}
