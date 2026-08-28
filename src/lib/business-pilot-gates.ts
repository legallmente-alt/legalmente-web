export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";
export type ApprovalRole =
  | "FOUNDER"
  | "PROFESSIONAL_RESPONSIBLE"
  | "PRIVACY_REVIEW"
  | "FISCAL_REVIEW";

export type EvidenceItem = {
  status: ApprovalStatus;
  approvalRecordId: string | null;
  approvedByRole: ApprovalRole | null;
  approvedAt: string | null;
};

const pending = (): EvidenceItem => ({
  status: "PENDING",
  approvalRecordId: null,
  approvedByRole: null,
  approvedAt: null,
});

// Este repositorio es público. Nunca guardar aquí nombres, cédulas, RFC,
// domicilios, URLs privadas ni documentos de evidencia. El detalle probatorio
// vive fuera del repo; el código solo puede referenciar un ID opaco de aprobación.
export const POWERS_D_R2_03_DECISION = pending();

export const POWERS_G2_EVIDENCE = {
  providerIdentity: pending(),
  professionalCredential: pending(),
  mexicoTerritorialScope: pending(),
  contractingParty: pending(),
  conflictProtocol: pending(),
  privacyNotice: pending(),
  secureDocumentChannel: pending(),
  qaResponsibility: pending(),
  taxAndInvoicingModel: pending(),
} as const;

export const POWERS_G4_ACTIVATION_EVIDENCE = {
  publicPrice: pending(),
  serviceTerms: pending(),
  cancellationAndRefund: pending(),
  transactionEvidence: pending(),
  paymentMechanism: pending(),
} as const;

// Gate humano final. Incluso con D-R2-03, G2 y G4-B completos, ninguna capacidad
// real se habilita hasta registrar una autorización expresa para casos reales.
export const POWERS_REAL_CASE_AUTHORIZATION = pending();

type EvidenceMap = Record<string, EvidenceItem>;

function isApproved(item: EvidenceItem): boolean {
  return (
    item.status === "APPROVED" &&
    Boolean(item.approvalRecordId?.trim()) &&
    Boolean(item.approvedByRole) &&
    Boolean(item.approvedAt?.trim())
  );
}

function pendingKeys(items: EvidenceMap): string[] {
  return Object.entries(items)
    .filter(([, item]) => !isApproved(item))
    .map(([key]) => key);
}

export type PowersActivationState = {
  definitionReady: boolean;
  g2Ready: boolean;
  g4ActivationReady: boolean;
  preparedForClosedPilot: boolean;
  realCaseAuthorizationReady: boolean;
  missingG2: string[];
  missingG4: string[];
  capabilities: {
    canCollectServicePII: boolean;
    canReceiveDocuments: boolean;
    canShowActiveCommercialOffer: boolean;
    canAcceptPayment: boolean;
    canStartRealCase: boolean;
  };
};

export function evaluatePowersActivation(
  definitionDecision: EvidenceItem = POWERS_D_R2_03_DECISION,
  g2: EvidenceMap = POWERS_G2_EVIDENCE,
  g4: EvidenceMap = POWERS_G4_ACTIVATION_EVIDENCE,
  realCaseAuthorization: EvidenceItem = POWERS_REAL_CASE_AUTHORIZATION,
): PowersActivationState {
  const definitionReady = isApproved(definitionDecision);
  const missingG2 = pendingKeys(g2);
  const missingG4 = pendingKeys(g4);
  const g2Ready = missingG2.length === 0;
  const g4ActivationReady = missingG4.length === 0;
  const preparedForClosedPilot = definitionReady && g2Ready && g4ActivationReady;
  const realCaseAuthorizationReady = isApproved(realCaseAuthorization);
  const realCapabilitiesReady =
    preparedForClosedPilot && realCaseAuthorizationReady;

  return {
    definitionReady,
    g2Ready,
    g4ActivationReady,
    preparedForClosedPilot,
    realCaseAuthorizationReady,
    missingG2,
    missingG4,
    capabilities: {
      canCollectServicePII: realCapabilitiesReady,
      canReceiveDocuments: realCapabilitiesReady,
      canShowActiveCommercialOffer: realCapabilitiesReady,
      canAcceptPayment: realCapabilitiesReady,
      canStartRealCase: realCapabilitiesReady,
    },
  };
}

export const POWERS_ACTIVATION = evaluatePowersActivation();

function assertActivationConsistency(state: PowersActivationState): void {
  const realCapabilities = [
    state.capabilities.canCollectServicePII,
    state.capabilities.canReceiveDocuments,
    state.capabilities.canShowActiveCommercialOffer,
    state.capabilities.canAcceptPayment,
    state.capabilities.canStartRealCase,
  ];

  if (
    realCapabilities.some(Boolean) &&
    !(
      state.definitionReady &&
      state.g2Ready &&
      state.g4ActivationReady &&
      state.realCaseAuthorizationReady
    )
  ) {
    throw new Error(
      "Powers activation invariant failed: real capability enabled before all human/operational gates.",
    );
  }
}

assertActivationConsistency(POWERS_ACTIVATION);

const syntheticApproved = (id: string): EvidenceItem => ({
  status: "APPROVED",
  approvalRecordId: `synthetic:${id}`,
  approvedByRole: "FOUNDER",
  approvedAt: "2099-01-01T00:00:00Z",
});

const approveMap = (items: EvidenceMap): EvidenceMap =>
  Object.fromEntries(
    Object.keys(items).map((key) => [key, syntheticApproved(key)]),
  );

const SYNTHETIC_DEFINITION_APPROVED = syntheticApproved("D-R2-03");
const SYNTHETIC_G2_APPROVED = approveMap(POWERS_G2_EVIDENCE);
const SYNTHETIC_G4_APPROVED = approveMap(POWERS_G4_ACTIVATION_EVIDENCE);
const SYNTHETIC_REAL_CASE_APPROVED = syntheticApproved("REAL-CASE-GO");

export const POWERS_ACTIVATION_SELF_TEST = [
  {
    id: "all-pending",
    pass: (() => {
      const state = evaluatePowersActivation();
      return (
        !state.definitionReady &&
        !state.g2Ready &&
        !state.g4ActivationReady &&
        !state.preparedForClosedPilot &&
        !state.realCaseAuthorizationReady &&
        Object.values(state.capabilities).every((value) => !value)
      );
    })(),
  },
  {
    id: "definition-plus-g2-not-enough",
    pass: (() => {
      const state = evaluatePowersActivation(
        SYNTHETIC_DEFINITION_APPROVED,
        SYNTHETIC_G2_APPROVED,
        POWERS_G4_ACTIVATION_EVIDENCE,
        POWERS_REAL_CASE_AUTHORIZATION,
      );
      return (
        state.definitionReady &&
        state.g2Ready &&
        !state.g4ActivationReady &&
        !state.preparedForClosedPilot &&
        Object.values(state.capabilities).every((value) => !value)
      );
    })(),
  },
  {
    id: "prepared-but-not-authorized",
    pass: (() => {
      const state = evaluatePowersActivation(
        SYNTHETIC_DEFINITION_APPROVED,
        SYNTHETIC_G2_APPROVED,
        SYNTHETIC_G4_APPROVED,
        POWERS_REAL_CASE_AUTHORIZATION,
      );
      return (
        state.preparedForClosedPilot &&
        !state.realCaseAuthorizationReady &&
        Object.values(state.capabilities).every((value) => !value)
      );
    })(),
  },
  {
    id: "all-gates-plus-real-case-authorization",
    pass: (() => {
      const state = evaluatePowersActivation(
        SYNTHETIC_DEFINITION_APPROVED,
        SYNTHETIC_G2_APPROVED,
        SYNTHETIC_G4_APPROVED,
        SYNTHETIC_REAL_CASE_APPROVED,
      );
      return (
        state.preparedForClosedPilot &&
        state.realCaseAuthorizationReady &&
        Object.values(state.capabilities).every(Boolean)
      );
    })(),
  },
  {
    id: "malformed-approval-fails-closed",
    pass: (() => {
      const malformedG2: EvidenceMap = {
        ...SYNTHETIC_G2_APPROVED,
        professionalCredential: {
          status: "APPROVED",
          approvalRecordId: null,
          approvedByRole: "PROFESSIONAL_RESPONSIBLE",
          approvedAt: "2099-01-01T00:00:00Z",
        },
      };
      const state = evaluatePowersActivation(
        SYNTHETIC_DEFINITION_APPROVED,
        malformedG2,
        SYNTHETIC_G4_APPROVED,
        SYNTHETIC_REAL_CASE_APPROVED,
      );
      return (
        !state.g2Ready &&
        state.missingG2.includes("professionalCredential") &&
        !state.preparedForClosedPilot &&
        Object.values(state.capabilities).every((value) => !value)
      );
    })(),
  },
] as const;

const failedActivationSelfTests = POWERS_ACTIVATION_SELF_TEST.filter(
  (testCase) => !testCase.pass,
);

if (failedActivationSelfTests.length > 0) {
  throw new Error(
    `Powers activation synthetic contract failed: ${failedActivationSelfTests
      .map((testCase) => testCase.id)
      .join(", ")}`,
  );
}
