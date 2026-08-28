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
  g2Ready: boolean;
  g4ActivationReady: boolean;
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
  g2: EvidenceMap = POWERS_G2_EVIDENCE,
  g4: EvidenceMap = POWERS_G4_ACTIVATION_EVIDENCE,
): PowersActivationState {
  const missingG2 = pendingKeys(g2);
  const missingG4 = pendingKeys(g4);
  const g2Ready = missingG2.length === 0;
  const g4ActivationReady = missingG4.length === 0;
  const technicalCommercialReady = g2Ready && g4ActivationReady;

  return {
    g2Ready,
    g4ActivationReady,
    missingG2,
    missingG4,
    capabilities: {
      canCollectServicePII: g2Ready,
      canReceiveDocuments: technicalCommercialReady,
      canShowActiveCommercialOffer: technicalCommercialReady,
      canAcceptPayment: technicalCommercialReady,
      canStartRealCase: technicalCommercialReady,
    },
  };
}

export const POWERS_ACTIVATION = evaluatePowersActivation();

function assertActivationConsistency(state: PowersActivationState): void {
  if (!state.g2Ready && state.capabilities.canCollectServicePII) {
    throw new Error("Powers activation invariant failed: PII enabled before G2.");
  }

  const commercialCapabilities = [
    state.capabilities.canReceiveDocuments,
    state.capabilities.canShowActiveCommercialOffer,
    state.capabilities.canAcceptPayment,
    state.capabilities.canStartRealCase,
  ];

  if (
    commercialCapabilities.some(Boolean) &&
    !(state.g2Ready && state.g4ActivationReady)
  ) {
    throw new Error(
      "Powers activation invariant failed: commercial capability enabled before G2 + G4-B.",
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

const SYNTHETIC_G2_APPROVED = approveMap(POWERS_G2_EVIDENCE);
const SYNTHETIC_G4_APPROVED = approveMap(POWERS_G4_ACTIVATION_EVIDENCE);

export const POWERS_ACTIVATION_SELF_TEST = [
  {
    id: "all-pending",
    pass: (() => {
      const state = evaluatePowersActivation();
      return (
        !state.g2Ready &&
        !state.g4ActivationReady &&
        !state.capabilities.canCollectServicePII &&
        !state.capabilities.canReceiveDocuments &&
        !state.capabilities.canAcceptPayment &&
        !state.capabilities.canStartRealCase
      );
    })(),
  },
  {
    id: "g2-only",
    pass: (() => {
      const state = evaluatePowersActivation(
        SYNTHETIC_G2_APPROVED,
        POWERS_G4_ACTIVATION_EVIDENCE,
      );
      return (
        state.g2Ready &&
        !state.g4ActivationReady &&
        state.capabilities.canCollectServicePII &&
        !state.capabilities.canReceiveDocuments &&
        !state.capabilities.canShowActiveCommercialOffer &&
        !state.capabilities.canAcceptPayment &&
        !state.capabilities.canStartRealCase
      );
    })(),
  },
  {
    id: "g2-plus-g4",
    pass: (() => {
      const state = evaluatePowersActivation(
        SYNTHETIC_G2_APPROVED,
        SYNTHETIC_G4_APPROVED,
      );
      return (
        state.g2Ready &&
        state.g4ActivationReady &&
        state.capabilities.canReceiveDocuments &&
        state.capabilities.canShowActiveCommercialOffer &&
        state.capabilities.canAcceptPayment &&
        state.capabilities.canStartRealCase
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
        malformedG2,
        SYNTHETIC_G4_APPROVED,
      );
      return (
        !state.g2Ready &&
        state.missingG2.includes("professionalCredential") &&
        !state.capabilities.canCollectServicePII &&
        !state.capabilities.canReceiveDocuments &&
        !state.capabilities.canAcceptPayment
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

// IMPORTANTE: el escenario sintético g2-plus-g4 solo prueba coherencia técnica.
// D-R2-03 (alcance/precio/SLA) y la autorización humana de activación/publicación
// son gates independientes y deliberadamente no se pueden satisfacer desde este módulo.
