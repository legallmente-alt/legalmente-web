export const operationsEngineV12 = {
  version: "V1.2",
  classification: "AUXILIAR / RESEARCH / EXPERIMENTAL / NO CANONICAL",
  counts: {
    researchPackets: 20,
    atomicClaims: 40,
    visualProductionPacks: 20,
    fundamentosBacklog: 100,
    navigationNodes: 200,
    founderLinkedInQueue: 10,
    multichannelRows: 160,
  },
  researchStatuses: {
    RESEARCH_ROBUST: 4,
    NEEDS_MORE_RESEARCH: 2,
    TERRITORIAL_SPLIT_REQUIRED: 7,
    UNSAFE_FOR_SIMPLIFICATION: 7,
  },
  gates: {
    publication: "BLOCKED",
    images: "NO_IMAGE_REQUEST",
    automation: "INACTIVE",
    analytics: "NO_TRACKING",
    pii: "PROHIBITED",
  },
  humanDecisionsPending: 5,
} as const;
