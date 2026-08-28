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

// D-R2-03 (alcance/precio/SLA) es un gate humano independiente y deliberadamente
// no se modela como booleano derivable aquí. Que G2/G4-B lleguen a READY no
// autoriza activación si D-R2-03 o la autorización humana de publicación siguen abiertos.
