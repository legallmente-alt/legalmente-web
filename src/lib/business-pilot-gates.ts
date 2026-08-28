export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

export type EvidenceItem = {
  status: ApprovalStatus;
  evidenceRef: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
};

const pending = (): EvidenceItem => ({
  status: "PENDING",
  evidenceRef: null,
  approvedBy: null,
  approvedAt: null,
});

export const PILOT_G2_EVIDENCE = {
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

export const PILOT_G4_ACTIVATION_EVIDENCE = {
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
    Boolean(item.evidenceRef?.trim()) &&
    Boolean(item.approvedBy?.trim()) &&
    Boolean(item.approvedAt?.trim())
  );
}

function pendingKeys(items: EvidenceMap): string[] {
  return Object.entries(items)
    .filter(([, item]) => !isApproved(item))
    .map(([key]) => key);
}

export type PilotActivationState = {
  g2Ready: boolean;
  g4ActivationReady: boolean;
  missingG2: string[];
  missingG4: string[];
  capabilities: {
    canCollectPilotPII: boolean;
    canReceiveDocuments: boolean;
    canShowActiveCommercialOffer: boolean;
    canAcceptPayment: boolean;
    canStartRealCase: boolean;
  };
};

export function evaluatePilotActivation(
  g2: EvidenceMap = PILOT_G2_EVIDENCE,
  g4: EvidenceMap = PILOT_G4_ACTIVATION_EVIDENCE,
): PilotActivationState {
  const missingG2 = pendingKeys(g2);
  const missingG4 = pendingKeys(g4);
  const g2Ready = missingG2.length === 0;
  const g4ActivationReady = missingG4.length === 0;
  const commercialReady = g2Ready && g4ActivationReady;

  return {
    g2Ready,
    g4ActivationReady,
    missingG2,
    missingG4,
    capabilities: {
      canCollectPilotPII: g2Ready,
      canReceiveDocuments: commercialReady,
      canShowActiveCommercialOffer: commercialReady,
      canAcceptPayment: commercialReady,
      canStartRealCase: commercialReady,
    },
  };
}

export const PILOT_ACTIVATION = evaluatePilotActivation();

function assertActivationConsistency(state: PilotActivationState): void {
  if (!state.g2Ready && state.capabilities.canCollectPilotPII) {
    throw new Error("Pilot activation invariant failed: PII enabled before G2.");
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
      "Pilot activation invariant failed: commercial capability enabled before G2 + G4 activation.",
    );
  }
}

assertActivationConsistency(PILOT_ACTIVATION);
