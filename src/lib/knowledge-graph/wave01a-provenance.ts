import { createHash } from "node:crypto";
import { z } from "zod";

import { wave01aIntegrationUnits } from "./wave01a";

const contentIds = ["LM-PC-013", "LM-PC-031", "LM-PC-065"] as const;
const claimIds = [
  "LM-PC-013-CL-01",
  "LM-PC-013-CL-02",
  "LM-PC-031-CL-01",
  "LM-PC-031-CL-02",
  "LM-PC-065-CL-01",
  "LM-PC-065-CL-02",
] as const;

const founderBindingPayload = [
  "FOUNDER_DECISION_WAVE_01A_READY_FOR_COPY_2026-08-29",
  "PRIVATE_FOUNDER_RECORD_OUTSIDE_REPOSITORY",
  "CLAIM_APPROVAL",
  "READY_FOR_COPY",
  ...claimIds,
].join("|");
const expectedFounderBindingFingerprint = "1905fd92f95dd8855e184f1e329e115635703738fe4837676d260c929808cc27";
const expectedClaimSetFingerprint = "b81c010d707422345808fd5503b22af4a0838a16c673ce56f4b99dbb47d76393";

/**
 * This fingerprint protects the repository-side binding (receipt reference,
 * gate and exact claim set). It is deliberately not represented as a hash of
 * the external Google Doc: that document hash has not been recorded here.
 */
const founderBindingFingerprint = createHash("sha256").update(founderBindingPayload).digest("hex");
if (founderBindingFingerprint !== expectedFounderBindingFingerprint) {
  throw new Error("P0 provenance gate: the pinned Founder binding changed without a reviewed fingerprint update.");
}

export const wave01aFounderCopyEvidence = {
  decisionId: "FOUNDER_DECISION_WAVE_01A_READY_FOR_COPY_2026-08-29",
  evidenceLocator: "PRIVATE_FOUNDER_RECORD_OUTSIDE_REPOSITORY",
  recordedDate: "2026-08-29",
  authorizedGate: "CLAIM_APPROVAL",
  authorizedState: "READY_FOR_COPY",
  approvedClaimIds: [...claimIds],
  bindingFingerprint: expectedFounderBindingFingerprint,
  bindingFingerprintScope: "DECISION_REFERENCE_AND_EXACT_CLAIM_SET",
  claimSetFingerprint: expectedClaimSetFingerprint,
  claimSetFingerprintScope: "EXACT_CLAIM_SOURCE_TERRITORY_AND_QUALIFIER_SET",
  externalDocumentHash: "NOT_RECORDED",
} as const;

const sourceByClaim = {
  "LM-PC-013-CL-01": {
    statement: "El objeto de los contratos es una categoría diferenciable dentro del Código Civil Federal.",
    source: { law: "Código Civil Federal", article: "1824", url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/CCF.pdf", territory: "MX-FED", verificationDate: "2026-08-29" },
    qualifier: "No determina el efecto de una cláusula ni la exigibilidad de un documento concreto.",
  },
  "LM-PC-013-CL-02": {
    statement: "El consentimiento y el objeto aparecen como elementos de existencia del contrato en el Código Civil Federal.",
    source: { law: "Código Civil Federal", article: "1794", url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/CCF.pdf", territory: "MX-FED", verificationDate: "2026-08-29" },
    qualifier: "No prueba que un contrato concreto exista, sea válido o sea exigible.",
  },
  "LM-PC-031-CL-01": {
    statement: "La Ley Federal del Trabajo define la relación de trabajo con independencia del acto que le dé origen, mediante trabajo personal subordinado y salario.",
    source: { law: "Ley Federal del Trabajo", article: "20–21", url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf", territory: "MX-FED", verificationDate: "2026-08-29" },
    qualifier: "No decide una controversia individual ni una prestación concreta.",
  },
  "LM-PC-031-CL-02": {
    statement: "Las condiciones de trabajo pueden incluir servicio, lugar, jornada, salario, pago y vacaciones en el marco escrito laboral.",
    source: { law: "Ley Federal del Trabajo", article: "25", url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf", territory: "MX-FED", verificationDate: "2026-08-29" },
    qualifier: "No prueba los términos de una relación específica ni calcula derechos.",
  },
  "LM-PC-065-CL-01": {
    statement: "La Ley General de Sociedades Mercantiles reconoce distintas especies de sociedades mercantiles.",
    source: { law: "Ley General de Sociedades Mercantiles", article: "1", url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSM.pdf", territory: "MX-FED", verificationDate: "2026-08-29" },
    qualifier: "No identifica la entidad de una persona ni valida su constitución.",
  },
  "LM-PC-065-CL-02": {
    statement: "La escritura o póliza constitutiva debe contener datos previstos por la Ley General de Sociedades Mercantiles.",
    source: { law: "Ley General de Sociedades Mercantiles", article: "6", url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSM.pdf", territory: "MX-FED", verificationDate: "2026-08-29" },
    qualifier: "No prueba que un documento concreto esté completo o sea válido.",
  },
} as const;

const claimSetFingerprintPayload = claimIds.map((claimId) => {
  const claim = sourceByClaim[claimId];
  return {
    contentId: claimId.replace(/-CL-\d{2}$/, ""),
    claimId,
    statement: claim.statement,
    source: claim.source,
    qualifier: claim.qualifier,
  };
});
const claimSetFingerprint = createHash("sha256").update(JSON.stringify(claimSetFingerprintPayload)).digest("hex");
if (claimSetFingerprint !== expectedClaimSetFingerprint) {
  throw new Error("P0 provenance gate: the pinned claim set changed without a reviewed fingerprint update.");
}

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "ISO date required");
const founderEvidenceSchema = z.object({
  decisionId: z.literal(wave01aFounderCopyEvidence.decisionId),
  evidenceLocator: z.literal("PRIVATE_FOUNDER_RECORD_OUTSIDE_REPOSITORY"),
  recordedDate: isoDate,
  authorizedGate: z.literal("CLAIM_APPROVAL"),
  authorizedState: z.literal("READY_FOR_COPY"),
  approvedClaimIds: z.array(z.enum(claimIds)).length(claimIds.length),
  bindingFingerprint: z.literal(expectedFounderBindingFingerprint),
  bindingFingerprintScope: z.literal("DECISION_REFERENCE_AND_EXACT_CLAIM_SET"),
  claimSetFingerprint: z.literal(expectedClaimSetFingerprint),
  claimSetFingerprintScope: z.literal("EXACT_CLAIM_SOURCE_TERRITORY_AND_QUALIFIER_SET"),
  externalDocumentHash: z.literal("NOT_RECORDED"),
}).strict();

const claimSchema = z.object({
  claimId: z.enum(claimIds),
  statement: z.string().min(10),
  source: z.object({
    law: z.string().min(1),
    article: z.string().min(1),
    url: z.string().url(),
    territory: z.literal("MX-FED"),
    verificationDate: isoDate,
  }).strict(),
  qualifier: z.string().min(10),
}).strict();

const manifestUnitSchema = z.object({
  contentId: z.enum(contentIds),
  userJob: z.string().min(10),
  previousLearning: z.string().min(10),
  nextLearning: z.string().min(10),
  sourceContext: z.string().min(10),
  sourceUrl: z.string().url(),
  territory: z.string().min(5),
  qualifier: z.string().min(10),
  copy: z.string().min(10),
  altText: z.string().min(20),
  candidateRoute: z.union([z.literal("/proceso/leer-antes-de-aceptar"), z.null()]),
  visualAssets: z.object({
    feed: z.string().regex(/^\/internal-assets\/legalmente\/wave-01a\//),
    vertical: z.string().regex(/^\/internal-assets\/legalmente\/wave-01a\//),
    pinterest: z.string().regex(/^\/internal-assets\/legalmente\/wave-01a\//),
  }).strict(),
  claims: z.array(claimSchema).length(2),
  gates: z.object({
    copyState: z.literal("READY_FOR_COPY"),
    visualState: z.literal("VISUAL_QA_PASS_PROVENANCE_UNRESOLVED"),
    visualAssetState: z.literal("EXISTS"),
    visualQaState: z.literal("PASS"),
    visualQaReceipt: z.literal("99_VISUAL_PRODUCTION_RECEIPT.md"),
    visualGateProvenance: z.literal("UNRESOLVED"),
    visualGateAuthorization: z.literal("NOT_RECORDED"),
    socialCompositionState: z.literal("REVIEW_REQUIRED"),
    integrationState: z.enum(["PRODUCT_REVIEW_REQUIRED", "SEPARATED_PENDING_BINDING", "RELATED_ONLY_NO_PUBLIC_INTEGRATION"]),
    integrationQaState: z.literal("NOT_RUN"),
    publicationState: z.literal("NOT_PUBLIC"),
  }).strict(),
}).strict();

const manifestSchema = z.object({
  manifestVersion: z.literal("P0-PROVENANCE-MANIFEST-RENDER-GATE/V1"),
  renderClass: z.literal("INTERNAL_QA_ONLY"),
  founderEvidence: founderEvidenceSchema,
  units: z.array(manifestUnitSchema).length(contentIds.length),
}).strict();

export type Wave01aProvenanceManifest = z.infer<typeof manifestSchema>;

const expectedByContent = {
  "LM-PC-013": {
    claimIds: ["LM-PC-013-CL-01", "LM-PC-013-CL-02"],
    sourceContext: "Código Civil Federal, arts. 1794 y 1824",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/CCF.pdf",
    candidateRoute: "/proceso/leer-antes-de-aceptar",
    integrationState: "PRODUCT_REVIEW_REQUIRED",
  },
  "LM-PC-031": {
    claimIds: ["LM-PC-031-CL-01", "LM-PC-031-CL-02"],
    sourceContext: "Ley Federal del Trabajo, arts. 20–21 y 25",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf",
    candidateRoute: null,
    integrationState: "SEPARATED_PENDING_BINDING",
  },
  "LM-PC-065": {
    claimIds: ["LM-PC-065-CL-01", "LM-PC-065-CL-02"],
    sourceContext: "Ley General de Sociedades Mercantiles, arts. 1 y 6",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSM.pdf",
    candidateRoute: null,
    integrationState: "RELATED_ONLY_NO_PUBLIC_INTEGRATION",
  },
} as const;

function orderedEqual(actual: readonly string[], expected: readonly string[]) {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function buildManifestInput() {
  return {
    manifestVersion: "P0-PROVENANCE-MANIFEST-RENDER-GATE/V1",
    renderClass: "INTERNAL_QA_ONLY",
    founderEvidence: wave01aFounderCopyEvidence,
    units: wave01aIntegrationUnits.map((unit) => ({
      contentId: unit.contentId,
      userJob: unit.userJob,
      previousLearning: unit.previousLearning,
      nextLearning: unit.nextLearning,
      sourceContext: unit.sourceContext,
      sourceUrl: unit.sourceUrl,
      territory: unit.territory,
      qualifier: unit.qualifier,
      copy: unit.copy,
      altText: unit.altText,
      candidateRoute: unit.candidateRoute,
      visualAssets: {
        feed: unit.visualAsset,
        vertical: unit.visualAsset.replace("_visual_4x5.png", "_visual.png"),
        pinterest: unit.visualAsset.replace("_visual_4x5.png", "_pinterest_2x3.png"),
      },
      claims: unit.claimIds.map((claimId) => ({ claimId, ...sourceByClaim[claimId as keyof typeof sourceByClaim] })),
      gates: {
        copyState: unit.copyState,
        visualState: unit.visualState,
        visualAssetState: unit.visualAssetState,
        visualQaState: unit.visualQaState,
        visualQaReceipt: unit.visualQaReceipt,
        visualGateProvenance: unit.visualGateProvenance,
        visualGateAuthorization: unit.visualGateAuthorization,
        socialCompositionState: unit.socialCompositionState,
        integrationState: unit.integrationState,
        integrationQaState: unit.integrationQaState,
        publicationState: unit.publicationState,
      },
    })),
  };
}

export function validateWave01aProvenanceManifest(input: unknown): Wave01aProvenanceManifest {
  const manifest = manifestSchema.parse(input);
  const evidence = manifest.founderEvidence;

  if (!orderedEqual(evidence.approvedClaimIds, claimIds)) {
    throw new Error("P0 provenance gate: Founder evidence must bind the exact six approved claim IDs.");
  }
  if (evidence.bindingFingerprint !== expectedFounderBindingFingerprint) {
    throw new Error("P0 provenance gate: Founder evidence binding fingerprint mismatch.");
  }
  if (evidence.claimSetFingerprint !== expectedClaimSetFingerprint) {
    throw new Error("P0 provenance gate: claim set fingerprint mismatch.");
  }

  const seenClaims = new Set<string>();
  for (const unit of manifest.units) {
    const expected = expectedByContent[unit.contentId];
    const unitClaimIds = unit.claims.map((claim) => claim.claimId);

    if (!orderedEqual(unitClaimIds, expected.claimIds)) {
      throw new Error(`P0 provenance gate: unexpected claim set for ${unit.contentId}.`);
    }
    if (unit.sourceContext !== expected.sourceContext || unit.sourceUrl !== expected.sourceUrl) {
      throw new Error(`P0 provenance gate: source binding mismatch for ${unit.contentId}.`);
    }
    if (!unit.territory.startsWith("México")) {
      throw new Error(`P0 provenance gate: territory must remain explicit for ${unit.contentId}.`);
    }
    if (unit.candidateRoute !== expected.candidateRoute || unit.gates.integrationState !== expected.integrationState) {
      throw new Error(`P0 provenance gate: integration state mismatch for ${unit.contentId}.`);
    }

    for (const claim of unit.claims) {
      const expectedClaim = sourceByClaim[claim.claimId];
      if (!expectedClaim || claim.statement !== expectedClaim.statement || claim.qualifier !== expectedClaim.qualifier) {
        throw new Error(`P0 provenance gate: claim text mismatch for ${claim.claimId}.`);
      }
      if (claim.source.url !== unit.sourceUrl || claim.source.law !== expectedClaim.source.law || claim.source.article !== expectedClaim.source.article) {
        throw new Error(`P0 provenance gate: primary source mismatch for ${claim.claimId}.`);
      }
      if (seenClaims.has(claim.claimId)) {
        throw new Error(`P0 provenance gate: duplicate claim ID ${claim.claimId}.`);
      }
      seenClaims.add(claim.claimId);
    }
  }

  if (!orderedEqual([...seenClaims], claimIds)) {
    throw new Error("P0 provenance gate: manifest must contain each approved claim exactly once.");
  }
  return manifest;
}

export function getWave01aInternalQaManifest(): Wave01aProvenanceManifest {
  return validateWave01aProvenanceManifest(buildManifestInput());
}

export function getWave01aInternalQaUnitForRoute(route: string) {
  return getWave01aInternalQaManifest().units.find((unit) => unit.candidateRoute === route) ?? null;
}

type Environment = Readonly<Record<string, string | undefined>>;

export function isWave01aInternalQaPreviewEnabled(environment: Environment = process.env) {
  return environment.LEGALMENTE_WAVE01A_INTERNAL_REVIEW === "1";
}

export function assertWave01aPublicBuildClosed(environment: Environment = process.env) {
  getWave01aInternalQaManifest();
  if (environment.LEGALMENTE_WAVE01A_INTERNAL_REVIEW === "1" || environment.LEGALMENTE_WAVE01A_INTEGRATION_PREVIEW === "1") {
    throw new Error("P0 provenance gate: Wave 01A internal preview flags are forbidden in a public build.");
  }
}

export function assertWave01aPublicRenderBlocked() {
  getWave01aInternalQaManifest();
  throw new Error("P0 provenance gate: PUBLIC render is blocked until separate visual, integration and publication evidence exists.");
}
