import type { LegalDomainId } from "@/lib/ecosystem-kernel";
import type { AudienceScope } from "@/lib/knowledge-pilot";
import type { EditorialLane } from "@/lib/editorial-engine/orchestrator";

export const GAP_TYPES = [
  "FOUNDATIONAL_GAP",
  "DEPTH_GAP",
  "RELATION_GAP",
  "JOURNEY_GAP",
  "PRODUCT_GAP",
  "DISTRIBUTION_GAP",
  "FORMAT_GAP",
  "FRESHNESS_GAP",
] as const;
export type GapType = (typeof GAP_TYPES)[number];

export const JOURNEY_STAGES = [
  "DISCOVERY",
  "UNDERSTANDING",
  "PREPARATION",
  "PROFESSIONAL_HANDOFF",
] as const;
export type JourneyStage = (typeof JOURNEY_STAGES)[number];

export const STRATEGIC_PILLARS = [
  "FOUNDATIONAL_KNOWLEDGE",
  "MASS_PUBLIC_VALUE",
  "PROFESSIONAL_AUTHORITY",
  "PRODUCT_PREPARATION",
  "CURRENT_SIGNAL",
] as const;
export type StrategicPillar = (typeof STRATEGIC_PILLARS)[number];

/**
 * Evidence class is about PRIORITY/DISTRIBUTION evidence, not legal truth.
 * Legal claims remain canonical in Psyche-creation.
 */
export const OPPORTUNITY_EVIDENCE_CLASSES = [
  "INTERNAL_QUALITATIVE",
  "EDITORIAL_HYPOTHESIS",
  "MEASURED_FIRST_PARTY",
  "EXTERNAL_RESEARCH",
] as const;
export type OpportunityEvidenceClass = (typeof OPPORTUNITY_EVIDENCE_CLASSES)[number];

export type OpportunityEvidence = {
  evidenceClass: OpportunityEvidenceClass;
  sourceLabel: string;
  observedMetric?: string;
  observedValue?: number;
  note: string;
};

export type KnowledgeOpportunity = {
  id: string;
  title: string;
  clusterId: string;
  pillar: StrategicPillar;
  gapType: GapType;
  journeyStage: JourneyStage;
  audienceScope: AudienceScope;
  legalDomainIds: readonly LegalDomainId[];
  conceptIds: readonly string[];
  recommendedLane: EditorialLane;
  impact: number;
  strategicFit: number;
  easeToWin: number;
  knowledgeGap: number;
  professionalValue: number;
  productPotential: number;
  sourceReadiness: number;
  jurisdictionSensitivity: number;
  effort: number;
  evidence: readonly OpportunityEvidence[];
  recommendedArtifact: string;
  nextQuestion: string;
};

export type OpportunityScore = {
  opportunityId: string;
  score: number;
  confidenceMultiplier: number;
  warnings: readonly string[];
};

export type PortfolioOptions = {
  size: number;
  maxPerCluster?: number;
  minDistinctPillars?: number;
  requirePublicAndProfessional?: boolean;
};

export type PortfolioResult = {
  selected: readonly KnowledgeOpportunity[];
  scores: readonly OpportunityScore[];
  warnings: readonly string[];
};

const inRange = (value: number) => Number.isFinite(value) && value >= 0 && value <= 10;

function evidenceConfidence(evidence: readonly OpportunityEvidence[]): number {
  if (evidence.length === 0) return 0.5;
  const weights: Record<OpportunityEvidenceClass, number> = {
    EDITORIAL_HYPOTHESIS: 0.62,
    INTERNAL_QUALITATIVE: 0.72,
    EXTERNAL_RESEARCH: 0.82,
    MEASURED_FIRST_PARTY: 1,
  };
  return Math.max(...evidence.map((item) => weights[item.evidenceClass]));
}

export function validateOpportunity(opportunity: KnowledgeOpportunity): string[] {
  const errors: string[] = [];
  const numericFields: Array<[string, number]> = [
    ["impact", opportunity.impact],
    ["strategicFit", opportunity.strategicFit],
    ["easeToWin", opportunity.easeToWin],
    ["knowledgeGap", opportunity.knowledgeGap],
    ["professionalValue", opportunity.professionalValue],
    ["productPotential", opportunity.productPotential],
    ["sourceReadiness", opportunity.sourceReadiness],
    ["jurisdictionSensitivity", opportunity.jurisdictionSensitivity],
    ["effort", opportunity.effort],
  ];

  if (!opportunity.id.trim()) errors.push("Opportunity id is required.");
  if (!opportunity.title.trim()) errors.push("Opportunity title is required.");
  if (!opportunity.clusterId.trim()) errors.push("Opportunity clusterId is required.");
  if (opportunity.legalDomainIds.length === 0) errors.push("At least one legal-domain binding is required.");
  if (opportunity.conceptIds.length === 0) errors.push("At least one concept binding is required.");
  if (opportunity.evidence.length === 0) errors.push("Opportunity prioritization requires explicit evidence or hypothesis provenance.");
  if (!opportunity.recommendedArtifact.trim()) errors.push("recommendedArtifact is required.");
  if (!opportunity.nextQuestion.trim()) errors.push("nextQuestion is required.");

  for (const [field, value] of numericFields) {
    if (!inRange(value)) errors.push(`${field} must be between 0 and 10.`);
  }

  for (const item of opportunity.evidence) {
    if (!item.sourceLabel.trim()) errors.push("Every evidence item requires a sourceLabel.");
    if (!item.note.trim()) errors.push("Every evidence item requires a note.");
    if (item.evidenceClass !== "MEASURED_FIRST_PARTY" && item.observedMetric) {
      errors.push("Only MEASURED_FIRST_PARTY evidence may declare observed metrics as measured demand.");
    }
  }

  return errors;
}

/**
 * Scores what LegalMente should investigate/build next. It never scores legal
 * correctness and cannot open a legal gate.
 */
export function scoreOpportunity(opportunity: KnowledgeOpportunity): OpportunityScore {
  const errors = validateOpportunity(opportunity);
  if (errors.length > 0) {
    return { opportunityId: opportunity.id, score: 0, confidenceMultiplier: 0, warnings: errors };
  }

  const confidenceMultiplier = evidenceConfidence(opportunity.evidence);
  const gross =
    opportunity.impact * 0.18
    + opportunity.strategicFit * 0.18
    + opportunity.knowledgeGap * 0.16
    + opportunity.easeToWin * 0.10
    + Math.max(opportunity.professionalValue, opportunity.productPotential) * 0.12
    + opportunity.sourceReadiness * 0.12
    + (10 - opportunity.effort) * 0.08
    + (10 - opportunity.jurisdictionSensitivity) * 0.06;

  const warnings: string[] = [];
  if (confidenceMultiplier < 0.8) warnings.push("Priority is based mainly on qualitative or hypothesis evidence; do not present it as measured SEO demand.");
  if (opportunity.sourceReadiness < 5) warnings.push("High editorial opportunity but low source readiness: route to research before production.");
  if (opportunity.jurisdictionSensitivity >= 8) warnings.push("High jurisdiction sensitivity: territory-specific validation is required before conclusive output.");

  return {
    opportunityId: opportunity.id,
    score: Math.round(gross * confidenceMultiplier * 100) / 100,
    confidenceMultiplier,
    warnings,
  };
}

function hasAudience(items: readonly KnowledgeOpportunity[], audience: "PUBLIC" | "PROFESSIONAL"): boolean {
  return items.some((item) => item.audienceScope === audience || item.audienceScope === "BOTH");
}

/**
 * Prevents one successful topic or one agent's demo from hijacking the whole
 * editorial roadmap. Selection balances score with cluster and pillar coverage.
 */
export function selectOpportunityPortfolio(
  opportunities: readonly KnowledgeOpportunity[],
  options: PortfolioOptions,
): PortfolioResult {
  const maxPerCluster = options.maxPerCluster ?? Math.max(1, Math.ceil(options.size * 0.4));
  const minDistinctPillars = options.minDistinctPillars ?? Math.min(3, options.size);
  const scored = opportunities
    .map((item) => ({ item, result: scoreOpportunity(item) }))
    .filter(({ result }) => result.score > 0)
    .sort((a, b) => b.result.score - a.result.score);

  const selected: KnowledgeOpportunity[] = [];
  const clusterCounts = new Map<string, number>();
  const usedPillars = new Set<StrategicPillar>();

  // First pass favors pillar diversity.
  for (const { item } of scored) {
    if (selected.length >= options.size || usedPillars.size >= minDistinctPillars) break;
    if (usedPillars.has(item.pillar)) continue;
    if ((clusterCounts.get(item.clusterId) ?? 0) >= maxPerCluster) continue;
    selected.push(item);
    usedPillars.add(item.pillar);
    clusterCounts.set(item.clusterId, (clusterCounts.get(item.clusterId) ?? 0) + 1);
  }

  // Second pass fills remaining slots by score within concentration limits.
  for (const { item } of scored) {
    if (selected.length >= options.size) break;
    if (selected.some((current) => current.id === item.id)) continue;
    if ((clusterCounts.get(item.clusterId) ?? 0) >= maxPerCluster) continue;
    selected.push(item);
    usedPillars.add(item.pillar);
    clusterCounts.set(item.clusterId, (clusterCounts.get(item.clusterId) ?? 0) + 1);
  }

  const warnings: string[] = [];
  if (usedPillars.size < minDistinctPillars) warnings.push(`Portfolio covers only ${usedPillars.size} strategic pillars; target is ${minDistinctPillars}.`);
  if (options.requirePublicAndProfessional) {
    if (!hasAudience(selected, "PUBLIC")) warnings.push("Portfolio lacks a public-facing opportunity.");
    if (!hasAudience(selected, "PROFESSIONAL")) warnings.push("Portfolio lacks a professional-facing opportunity.");
  }
  if (selected.length < options.size) warnings.push(`Only ${selected.length} opportunities satisfy portfolio constraints for requested size ${options.size}.`);

  return {
    selected,
    scores: selected.map((item) => scoreOpportunity(item)),
    warnings,
  };
}

const qualitativeDemoEvidence: readonly OpportunityEvidence[] = [
  {
    evidenceClass: "INTERNAL_QUALITATIVE",
    sourceLabel: "Manus AI — content-gap demonstration, 2026-09-03",
    note: "Priority is a reasoned internal hypothesis. No Search Console, Ahrefs or Semrush ranking/volume export was available in the demonstration.",
  },
];

/**
 * Seeds from the two-agent review. These are opportunity hypotheses, not legal
 * claims and not measured SEO conclusions.
 */
export const DEMO_OPPORTUNITIES: readonly KnowledgeOpportunity[] = [
  {
    id: "LM-OPP-001",
    title: "Qué revisar antes de firmar: hub de preparación",
    clusterId: "pre-firma",
    pillar: "PRODUCT_PREPARATION",
    gapType: "PRODUCT_GAP",
    journeyStage: "PREPARATION",
    audienceScope: "BOTH",
    legalDomainIds: ["CONTRACTS"],
    conceptIds: ["consentimiento", "obligacion", "prueba"],
    recommendedLane: "PRODUCT_PREPARATION",
    impact: 9,
    strategicFit: 10,
    easeToWin: 8,
    knowledgeGap: 9,
    professionalValue: 8,
    productPotential: 10,
    sourceReadiness: 7,
    jurisdictionSensitivity: 6,
    effort: 5,
    evidence: qualitativeDemoEvidence,
    recommendedArtifact: "Hub web + checklist + enlace a Before Signing",
    nextQuestion: "¿Qué conceptos, evidencia y límites mínimos deben aparecer antes de cualquier ruta contractual?",
  },
  {
    id: "LM-OPP-002",
    title: "El cargo no prueba facultades para obligar a una sociedad",
    clusterId: "representacion",
    pillar: "PROFESSIONAL_AUTHORITY",
    gapType: "DEPTH_GAP",
    journeyStage: "UNDERSTANDING",
    audienceScope: "BOTH",
    legalDomainIds: ["CORPORATE", "CONTRACTS"],
    conceptIds: ["representacion", "poder", "prueba"],
    recommendedLane: "FOUNDER_LINKEDIN",
    impact: 9,
    strategicFit: 10,
    easeToWin: 9,
    knowledgeGap: 8,
    professionalValue: 10,
    productPotential: 8,
    sourceReadiness: 7,
    jurisdictionSensitivity: 7,
    effort: 3,
    evidence: qualitativeDemoEvidence,
    recommendedArtifact: "Checklist educativo + artículo profesional + nodo web",
    nextQuestion: "¿Qué evidencia acredita facultad, vigencia, alcance y límites sin convertir el checklist en dictamen?",
  },
  {
    id: "LM-OPP-003",
    title: "Fraccionar, urbanizar y escriturar no son lo mismo",
    clusterId: "desarrollos-inmobiliarios",
    pillar: "MASS_PUBLIC_VALUE",
    gapType: "RELATION_GAP",
    journeyStage: "UNDERSTANDING",
    audienceScope: "BOTH",
    legalDomainIds: ["REAL_ESTATE_PROPERTY", "ADMINISTRATIVE"],
    conceptIds: ["hecho-juridicamente-relevante", "prueba"],
    recommendedLane: "PUBLIC_GENERAL",
    impact: 9,
    strategicFit: 9,
    easeToWin: 8,
    knowledgeGap: 9,
    professionalValue: 9,
    productPotential: 7,
    sourceReadiness: 5,
    jurisdictionSensitivity: 9,
    effort: 4,
    evidence: qualitativeDemoEvidence,
    recommendedArtifact: "Guía comparativa + diagrama de dependencias",
    nextQuestion: "¿Qué distinciones pueden explicarse de forma transversal y cuáles deben detenerse hasta conocer estado, municipio y tipo de desarrollo?",
  },
  {
    id: "LM-OPP-004",
    title: "Arquitectura jurídica de un desarrollo inmobiliario",
    clusterId: "desarrollos-inmobiliarios",
    pillar: "PROFESSIONAL_AUTHORITY",
    gapType: "JOURNEY_GAP",
    journeyStage: "PROFESSIONAL_HANDOFF",
    audienceScope: "PROFESSIONAL",
    legalDomainIds: ["REAL_ESTATE_PROPERTY", "ADMINISTRATIVE", "CONTRACTS"],
    conceptIds: ["prueba", "obligacion", "representacion"],
    recommendedLane: "FOUNDER_LINKEDIN",
    impact: 10,
    strategicFit: 9,
    easeToWin: 6,
    knowledgeGap: 9,
    professionalValue: 10,
    productPotential: 8,
    sourceReadiness: 5,
    jurisdictionSensitivity: 10,
    effort: 7,
    evidence: qualitativeDemoEvidence,
    recommendedArtifact: "Página pilar + mapa físico/jurídico + satélites",
    nextQuestion: "¿Cómo modelar dependencias físicas, jurídicas y documentales sin presentar una secuencia normativa universal?",
  },
  {
    id: "LM-OPP-005",
    title: "Due diligence como línea base de riesgos y evidencia",
    clusterId: "due-diligence",
    pillar: "PROFESSIONAL_AUTHORITY",
    gapType: "PRODUCT_GAP",
    journeyStage: "PREPARATION",
    audienceScope: "PROFESSIONAL",
    legalDomainIds: ["CORPORATE", "REAL_ESTATE_PROPERTY", "CONTRACTS"],
    conceptIds: ["prueba", "hecho-juridicamente-relevante", "representacion"],
    recommendedLane: "FOUNDER_LINKEDIN",
    impact: 9,
    strategicFit: 9,
    easeToWin: 7,
    knowledgeGap: 8,
    professionalValue: 10,
    productPotential: 9,
    sourceReadiness: 6,
    jurisdictionSensitivity: 8,
    effort: 6,
    evidence: qualitativeDemoEvidence,
    recommendedArtifact: "Guía de preparación + matriz de hallazgos + caso sintético",
    nextQuestion: "¿Qué debe separar la matriz entre hecho, evidencia, responsable, fuente, pendiente y decisión?",
  },
  {
    id: "LM-OPP-006",
    title: "Qué hace LegalMente, qué no hace y cuándo escalar",
    clusterId: "trust-scope",
    pillar: "FOUNDATIONAL_KNOWLEDGE",
    gapType: "JOURNEY_GAP",
    journeyStage: "DISCOVERY",
    audienceScope: "PUBLIC",
    legalDomainIds: ["CONTRACTS"],
    conceptIds: ["hecho-juridicamente-relevante", "prueba"],
    recommendedLane: "PUBLIC_GENERAL",
    impact: 7,
    strategicFit: 10,
    easeToWin: 10,
    knowledgeGap: 8,
    professionalValue: 6,
    productPotential: 8,
    sourceReadiness: 10,
    jurisdictionSensitivity: 2,
    effort: 2,
    evidence: qualitativeDemoEvidence,
    recommendedArtifact: "Página de alcance, confianza, privacidad y handoff humano",
    nextQuestion: "¿Cómo mostrar preparación, límites y siguiente acción sin prometer asesoría o resultados?",
  },
  {
    id: "LM-OPP-007",
    title: "Marketing, contrato y realidad operativa deben poder reconciliarse",
    clusterId: "desarrollos-inmobiliarios",
    pillar: "PROFESSIONAL_AUTHORITY",
    gapType: "RELATION_GAP",
    journeyStage: "UNDERSTANDING",
    audienceScope: "PROFESSIONAL",
    legalDomainIds: ["REAL_ESTATE_PROPERTY", "CONTRACTS", "CORPORATE"],
    conceptIds: ["obligacion", "prueba", "representacion"],
    recommendedLane: "FOUNDER_LINKEDIN",
    impact: 8,
    strategicFit: 9,
    easeToWin: 8,
    knowledgeGap: 8,
    professionalValue: 10,
    productPotential: 7,
    sourceReadiness: 6,
    jurisdictionSensitivity: 7,
    effort: 4,
    evidence: qualitativeDemoEvidence,
    recommendedArtifact: "Artículo + matriz de consistencia + carrusel profesional",
    nextQuestion: "¿Qué evidencia permite detectar divergencias entre promesa comercial, soporte técnico y obligación contractual?",
  },
  {
    id: "LM-OPP-008",
    title: "Matriz de permisos como mapa de dependencias, no lista universal",
    clusterId: "desarrollos-inmobiliarios",
    pillar: "PRODUCT_PREPARATION",
    gapType: "PRODUCT_GAP",
    journeyStage: "PREPARATION",
    audienceScope: "PROFESSIONAL",
    legalDomainIds: ["REAL_ESTATE_PROPERTY", "ADMINISTRATIVE"],
    conceptIds: ["prueba", "hecho-juridicamente-relevante"],
    recommendedLane: "PRODUCT_PREPARATION",
    impact: 8,
    strategicFit: 9,
    easeToWin: 6,
    knowledgeGap: 8,
    professionalValue: 10,
    productPotential: 9,
    sourceReadiness: 4,
    jurisdictionSensitivity: 10,
    effort: 7,
    evidence: qualitativeDemoEvidence,
    recommendedArtifact: "Plantilla educativa parametrizable por territorio",
    nextQuestion: "¿Qué campos universales puede tener la matriz sin inventar permisos concretos para territorios no verificados?",
  },
];

export const OPPORTUNITY_ENGINE_RULES = Object.freeze({
  legalAuthorityLivesInPsyche: true,
  opportunityEvidenceNeverOpensLegalGate: true,
  qualitativePriorityCannotMasqueradeAsMeasuredSeoDemand: true,
  oneDemoClusterCannotOwnTheWholeRoadmap: true,
  buyerJourneyIsAPlanningDimensionNotLegalAuthority: true,
  publicAndProfessionalViewsShareCanonicalKnowledge: true,
  portfolioSelectionBalancesScoreClusterAndStrategicPillar: true,
});
