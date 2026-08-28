export type PreflightRoute = "ACCEPT" | "CLARIFY" | "REVIEW" | "STOP";
export type TriState = "YES" | "NO" | "UNKNOWN";
export type Territory = "MX" | "OTHER" | "UNKNOWN";
export type DocumentType = "NDA" | "NOT_NDA" | "UNKNOWN";
export type Language = "ES" | "OTHER" | "UNKNOWN";
export type Urgency = "NORMAL" | "URGENT" | "UNKNOWN";
export type ExcludedMatter =
  | "NONE"
  | "LABOR"
  | "PENAL"
  | "FISCAL"
  | "REGULATED"
  | "UNKNOWN";

export type ReasonCode =
  | "UNSUPPORTED_TERRITORY"
  | "NOT_AN_NDA"
  | "UNSUPPORTED_LANGUAGE"
  | "OVER_PAGE_LIMIT"
  | "MULTI_COUNTRY"
  | "ACTIVE_DISPUTE"
  | "EXCLUDED_MATTER"
  | "MATERIAL_NON_COMPETE"
  | "OBJECTIVE_OUT_OF_SCOPE"
  | "MISSING_REQUIRED_INFO"
  | "MISSING_ANNEXES"
  | "ALREADY_SIGNED"
  | "URGENT"
  | "MATERIAL_IP"
  | "SENSITIVE_DATA"
  | "ATYPICAL_TERM"
  | "WITHIN_PILOT_SCOPE";

export interface NdaPreflightInput {
  territory: Territory;
  documentType: DocumentType;
  language: Language;
  pagesApprox: number | null;
  signed: TriState;
  urgency: Urgency;
  multiCountry: TriState;
  activeDispute: TriState;
  excludedMatter: ExcludedMatter;
  materialIp: TriState;
  sensitiveData: TriState;
  materialNonCompete: TriState;
  atypicalTerm: TriState;
  annexesComplete: TriState;
  objectiveCompatible: TriState;
}

export interface PreflightResult {
  route: PreflightRoute;
  reasonCodes: ReasonCode[];
  humanReviewRequired: boolean;
  documentUploadAllowed: false;
  businessGate: "G2_BLOCKED";
}

export const EMPTY_NDA_PREFLIGHT: NdaPreflightInput = {
  territory: "UNKNOWN",
  documentType: "UNKNOWN",
  language: "UNKNOWN",
  pagesApprox: null,
  signed: "UNKNOWN",
  urgency: "UNKNOWN",
  multiCountry: "UNKNOWN",
  activeDispute: "UNKNOWN",
  excludedMatter: "UNKNOWN",
  materialIp: "UNKNOWN",
  sensitiveData: "UNKNOWN",
  materialNonCompete: "UNKNOWN",
  atypicalTerm: "UNKNOWN",
  annexesComplete: "UNKNOWN",
  objectiveCompatible: "UNKNOWN",
};

const unique = <T,>(items: T[]): T[] => [...new Set(items)];

export function evaluateNdaPreflight(input: NdaPreflightInput): PreflightResult {
  const stopReasons: ReasonCode[] = [];

  if (input.territory === "OTHER") stopReasons.push("UNSUPPORTED_TERRITORY");
  if (input.documentType === "NOT_NDA") stopReasons.push("NOT_AN_NDA");
  if (input.language === "OTHER") stopReasons.push("UNSUPPORTED_LANGUAGE");
  if (input.pagesApprox !== null && input.pagesApprox > 10)
    stopReasons.push("OVER_PAGE_LIMIT");
  if (input.multiCountry === "YES") stopReasons.push("MULTI_COUNTRY");
  if (input.activeDispute === "YES") stopReasons.push("ACTIVE_DISPUTE");
  if (
    input.excludedMatter !== "NONE" &&
    input.excludedMatter !== "UNKNOWN"
  )
    stopReasons.push("EXCLUDED_MATTER");
  if (input.materialNonCompete === "YES")
    stopReasons.push("MATERIAL_NON_COMPETE");
  if (input.objectiveCompatible === "NO")
    stopReasons.push("OBJECTIVE_OUT_OF_SCOPE");

  if (stopReasons.length > 0) {
    return {
      route: "STOP",
      reasonCodes: unique(stopReasons),
      humanReviewRequired: true,
      documentUploadAllowed: false,
      businessGate: "G2_BLOCKED",
    };
  }

  const missingCritical =
    input.territory === "UNKNOWN" ||
    input.documentType === "UNKNOWN" ||
    input.language === "UNKNOWN" ||
    input.pagesApprox === null ||
    input.pagesApprox < 1 ||
    input.signed === "UNKNOWN" ||
    input.urgency === "UNKNOWN" ||
    input.multiCountry === "UNKNOWN" ||
    input.activeDispute === "UNKNOWN" ||
    input.excludedMatter === "UNKNOWN" ||
    input.materialIp === "UNKNOWN" ||
    input.sensitiveData === "UNKNOWN" ||
    input.materialNonCompete === "UNKNOWN" ||
    input.atypicalTerm === "UNKNOWN" ||
    input.annexesComplete === "UNKNOWN" ||
    input.objectiveCompatible === "UNKNOWN";

  if (missingCritical || input.annexesComplete === "NO") {
    return {
      route: "CLARIFY",
      reasonCodes: unique([
        ...(missingCritical ? (["MISSING_REQUIRED_INFO"] as ReasonCode[]) : []),
        ...(input.annexesComplete === "NO"
          ? (["MISSING_ANNEXES"] as ReasonCode[])
          : []),
      ]),
      humanReviewRequired: false,
      documentUploadAllowed: false,
      businessGate: "G2_BLOCKED",
    };
  }

  const reviewReasons: ReasonCode[] = [];
  if (input.signed === "YES") reviewReasons.push("ALREADY_SIGNED");
  if (input.urgency === "URGENT") reviewReasons.push("URGENT");
  if (input.materialIp === "YES") reviewReasons.push("MATERIAL_IP");
  if (input.sensitiveData === "YES") reviewReasons.push("SENSITIVE_DATA");
  if (input.atypicalTerm === "YES") reviewReasons.push("ATYPICAL_TERM");

  if (reviewReasons.length > 0) {
    return {
      route: "REVIEW",
      reasonCodes: unique(reviewReasons),
      humanReviewRequired: true,
      documentUploadAllowed: false,
      businessGate: "G2_BLOCKED",
    };
  }

  return {
    route: "ACCEPT",
    reasonCodes: ["WITHIN_PILOT_SCOPE"],
    humanReviewRequired: false,
    documentUploadAllowed: false,
    businessGate: "G2_BLOCKED",
  };
}

const baseSyntheticInput: NdaPreflightInput = {
  territory: "MX",
  documentType: "NDA",
  language: "ES",
  pagesApprox: 6,
  signed: "NO",
  urgency: "NORMAL",
  multiCountry: "NO",
  activeDispute: "NO",
  excludedMatter: "NONE",
  materialIp: "NO",
  sensitiveData: "NO",
  materialNonCompete: "NO",
  atypicalTerm: "NO",
  annexesComplete: "YES",
  objectiveCompatible: "YES",
};

export const SYNTHETIC_PREFLIGHT_CASES: ReadonlyArray<{
  id: string;
  expected: PreflightRoute;
  input: NdaPreflightInput;
}> = [
  { id: "nda-simple-mx", expected: "ACCEPT", input: baseSyntheticInput },
  {
    id: "nda-ip-material",
    expected: "REVIEW",
    input: { ...baseSyntheticInput, materialIp: "YES" },
  },
  {
    id: "nda-datos-sensibles",
    expected: "REVIEW",
    input: { ...baseSyntheticInput, sensitiveData: "YES" },
  },
  {
    id: "nda-dos-paises",
    expected: "STOP",
    input: { ...baseSyntheticInput, multiCountry: "YES" },
  },
  {
    id: "nda-laboral",
    expected: "STOP",
    input: { ...baseSyntheticInput, excludedMatter: "LABOR" },
  },
  {
    id: "nda-regulado",
    expected: "STOP",
    input: { ...baseSyntheticInput, excludedMatter: "REGULATED" },
  },
  {
    id: "nda-conflicto-activo",
    expected: "STOP",
    input: {
      ...baseSyntheticInput,
      activeDispute: "YES",
      excludedMatter: "PENAL",
    },
  },
  {
    id: "nda-no-competencia-material",
    expected: "STOP",
    input: { ...baseSyntheticInput, materialNonCompete: "YES" },
  },
  {
    id: "nda-plazo-atipico",
    expected: "REVIEW",
    input: { ...baseSyntheticInput, atypicalTerm: "YES" },
  },
  {
    id: "no-es-nda",
    expected: "STOP",
    input: { ...baseSyntheticInput, documentType: "NOT_NDA" },
  },
  {
    id: "informacion-insuficiente",
    expected: "CLARIFY",
    input: {
      ...baseSyntheticInput,
      pagesApprox: null,
      signed: "UNKNOWN",
      multiCountry: "UNKNOWN",
    },
  },
];

export const SYNTHETIC_PREFLIGHT_STATUS = SYNTHETIC_PREFLIGHT_CASES.map(
  (testCase) => ({
    id: testCase.id,
    expected: testCase.expected,
    actual: evaluateNdaPreflight(testCase.input).route,
  }),
);

const syntheticFailures = SYNTHETIC_PREFLIGHT_STATUS.filter(
  (testCase) => testCase.expected !== testCase.actual,
);

if (syntheticFailures.length > 0) {
  throw new Error(
    `NDA preflight synthetic contract failed: ${syntheticFailures
      .map((item) => `${item.id}:${item.actual}!=${item.expected}`)
      .join(", ")}`,
  );
}
