const observedAt = "2026-08-30";

export const operationsEngineV12 = {
  version: "V1.2",
  classification: "AUXILIAR / RESEARCH / EXPERIMENTAL / NO CANONICAL",
  provenance: {
    kind: "SNAPSHOT",
    source: "legalmente_operations_v1/v1_2/*.csv",
    derivation: "Conteos calculados durante la generación reproducible V1.2; no representan estado vivo.",
    observedAt,
    owner: "Operations Engine / QA",
    freshness: "HISTORICAL_SNAPSHOT",
    confidence: "HIGH_FOR_PACKAGE_COUNTS_ONLY",
  },
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
