import type { LegalDomainId, TerritoryRequirement } from "@/lib/ecosystem-kernel";
import type { DistributionSurface, EditorialLane } from "@/lib/editorial-engine/orchestrator";

export const AUDIENCE_SCOPES = ["PUBLIC", "PROFESSIONAL", "BOTH"] as const;
export type AudienceScope = (typeof AUDIENCE_SCOPES)[number];

export const NEXT_ACTION_KINDS = [
  "STOP_PRIVACY",
  "ASK_TERRITORY",
  "ASK_RELEVANT_DATE",
  "REQUEST_CANONICAL_BINDING",
  "REQUEST_SOURCE_REVIEW",
  "LEARN_CONCEPT",
  "PREPARE_PROCESS",
  "EXPLORE_RELATION",
  "READY_FOR_ADAPTATION",
] as const;
export type NextActionKind = (typeof NEXT_ACTION_KINDS)[number];

export type CanonicalEnvelopeBinding = {
  schemaVersion: "1.0";
  contentId: string;
  claimState: "APTO_PARA_NARRATIVA" | "REQUIERE_INVESTIGACION" | "BLOQUEADO" | "PENDIENTE";
  sourceState: "VERIFICADA" | "PENDIENTE" | "INSUFICIENTE";
  legalGateState: "ABIERTO" | "CERRADO";
  jurisdictionLayer: "CAPA_A_TRANSVERSAL" | "CAPA_B_VARIABLE" | "CAPA_C_NACIONAL" | "NO_APLICA";
  territories: readonly string[];
  claimIds: readonly string[];
  sourceSystem: "Psyche-creation";
  sourceRevision: string;
  provenanceDigest?: string;
};

export type TopicBranch = {
  id: string;
  entryQuestion: string;
  primaryConceptId: string;
  destinationConceptIds: readonly string[];
  destinationProcessIds: readonly string[];
  territoryRequirement: TerritoryRequirement;
  requiresRelevantDate: boolean;
  priority: number;
  whyRelated: string;
  contextRisk: "LOW" | "MEDIUM" | "HIGH";
  stopRule: string;
};

export type QuestionContext = {
  id: string;
  question: string;
  audienceScope: AudienceScope;
  worldIds: readonly string[];
  legalDomainIds: readonly LegalDomainId[];
  conceptIds: readonly string[];
  knownFacts: readonly string[];
  unknowns: readonly string[];
  territory?: string;
  relevantDate?: string;
  containsSensitiveData?: boolean;
  needsConceptPrimer?: boolean;
  preferredLane: EditorialLane;
  intendedSurfaces: readonly DistributionSurface[];
  branch: TopicBranch;
  canonicalBinding?: CanonicalEnvelopeBinding;
};

export type NextAction = {
  kind: NextActionKind;
  reason: string;
  questionId: string;
  blockers: readonly string[];
};

export type Projection = {
  questionId: string;
  audience: Exclude<AudienceScope, "BOTH">;
  canonicalContentId?: string;
  conceptIds: readonly string[];
  legalDomainIds: readonly LegalDomainId[];
  lane: EditorialLane;
  surfaces: readonly DistributionSurface[];
  voice: "CLEAR_EDUCATIONAL" | "PROFESSIONAL_DECISION_ORIENTED";
  mayChangeCanonicalClaim: false;
};

const sha256Pattern = /^[0-9a-f]{64}$/i;
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const phonePattern = /(?:\+?\d[\d\s().-]{8,}\d)/;
const expedientePattern = /\b(?:expediente|folio|cuenta|clabe)\s*[:#-]?\s*[A-Z0-9-]{5,}\b/i;

export function validateCanonicalBinding(binding: CanonicalEnvelopeBinding): string[] {
  const errors: string[] = [];
  if (binding.schemaVersion !== "1.0") errors.push("Unsupported canonical envelope version.");
  if (!binding.contentId.trim()) errors.push("Canonical contentId is required.");
  if (binding.sourceSystem !== "Psyche-creation") errors.push("Only Psyche-creation may emit canonical legal authority.");
  if (!binding.sourceRevision.trim()) errors.push("Canonical sourceRevision is required for cross-repo traceability.");
  if (binding.claimIds.length === 0) errors.push("At least one canonical claimId is required.");
  if (binding.provenanceDigest && !sha256Pattern.test(binding.provenanceDigest)) errors.push("provenanceDigest must be a sha256 hex digest.");
  if (binding.legalGateState === "ABIERTO" && binding.claimState !== "APTO_PARA_NARRATIVA") {
    errors.push("Canonical gate cannot be open unless claimState is APTO_PARA_NARRATIVA.");
  }
  return errors;
}

export function looksLikeSensitiveInput(value: string): boolean {
  return emailPattern.test(value) || phonePattern.test(value) || expedientePattern.test(value);
}

export function resolveNextAction(context: QuestionContext): NextAction {
  const blockers: string[] = [];

  if (context.containsSensitiveData || looksLikeSensitiveInput(context.question)) {
    return {
      kind: "STOP_PRIVACY",
      reason: "Sensitive or identifying data must be removed before the knowledge workflow continues.",
      questionId: context.id,
      blockers: ["PII_OR_SENSITIVE_INPUT"],
    };
  }

  if (context.branch.territoryRequirement === "REQUIRED" && !context.territory?.trim()) {
    return {
      kind: "ASK_TERRITORY",
      reason: "This question can change materially by jurisdiction; territory is required before legal interpretation.",
      questionId: context.id,
      blockers: ["MISSING_TERRITORY"],
    };
  }

  if (context.branch.requiresRelevantDate && !context.relevantDate?.trim()) {
    return {
      kind: "ASK_RELEVANT_DATE",
      reason: "The applicable rule may depend on the relevant date or version.",
      questionId: context.id,
      blockers: ["MISSING_RELEVANT_DATE"],
    };
  }

  if (!context.canonicalBinding) {
    return {
      kind: "REQUEST_CANONICAL_BINDING",
      reason: "The web layer has no authority to create or approve legal claims; request a canonical Psyche envelope.",
      questionId: context.id,
      blockers: ["NO_CANONICAL_ENVELOPE"],
    };
  }

  const bindingErrors = validateCanonicalBinding(context.canonicalBinding);
  if (bindingErrors.length > 0) {
    return {
      kind: "REQUEST_SOURCE_REVIEW",
      reason: "The canonical binding is malformed or internally inconsistent.",
      questionId: context.id,
      blockers: bindingErrors,
    };
  }

  if (
    context.canonicalBinding.sourceState !== "VERIFICADA"
    || context.canonicalBinding.claimState !== "APTO_PARA_NARRATIVA"
    || context.canonicalBinding.legalGateState !== "ABIERTO"
  ) {
    blockers.push(`SOURCE_${context.canonicalBinding.sourceState}`);
    blockers.push(`CLAIM_${context.canonicalBinding.claimState}`);
    blockers.push(`LEGAL_GATE_${context.canonicalBinding.legalGateState}`);
    return {
      kind: "REQUEST_SOURCE_REVIEW",
      reason: "Canonical authority exists but is not ready for a conclusive adaptation.",
      questionId: context.id,
      blockers,
    };
  }

  if (context.needsConceptPrimer) {
    return {
      kind: "LEARN_CONCEPT",
      reason: "A prerequisite concept should be understood before advancing to the practical branch.",
      questionId: context.id,
      blockers: [],
    };
  }

  if (context.branch.destinationProcessIds.length > 0) {
    return {
      kind: "PREPARE_PROCESS",
      reason: "The legal concept is sufficiently grounded to move into a bounded preparation workflow.",
      questionId: context.id,
      blockers: [],
    };
  }

  if (context.branch.destinationConceptIds.length > 0) {
    return {
      kind: "EXPLORE_RELATION",
      reason: "The next useful step is a linked concept, limit or distinction rather than a new legal conclusion.",
      questionId: context.id,
      blockers: [],
    };
  }

  return {
    kind: "READY_FOR_ADAPTATION",
    reason: "The canonical claim is open, sourced and ready for audience-specific presentation without changing legal authority.",
    questionId: context.id,
    blockers: [],
  };
}

export function projectQuestion(context: QuestionContext, audience: Exclude<AudienceScope, "BOTH">): Projection {
  if (context.audienceScope !== "BOTH" && context.audienceScope !== audience) {
    throw new Error(`Question ${context.id} is not authorized for ${audience} projection.`);
  }

  const professional = audience === "PROFESSIONAL";
  return {
    questionId: context.id,
    audience,
    canonicalContentId: context.canonicalBinding?.contentId,
    conceptIds: context.conceptIds,
    legalDomainIds: context.legalDomainIds,
    lane: professional ? "FOUNDER_LINKEDIN" : context.preferredLane === "FOUNDER_LINKEDIN" ? "PUBLIC_GENERAL" : context.preferredLane,
    surfaces: professional
      ? ["FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"]
      : context.intendedSurfaces.filter((surface) => surface !== "FOUNDER_LINKEDIN"),
    voice: professional ? "PROFESSIONAL_DECISION_ORIENTED" : "CLEAR_EDUCATIONAL",
    mayChangeCanonicalClaim: false,
  };
}

function branch(
  id: string,
  entryQuestion: string,
  primaryConceptId: string,
  destinationConceptIds: readonly string[],
  destinationProcessIds: readonly string[],
  territoryRequirement: TerritoryRequirement,
  priority: number,
  whyRelated: string,
  contextRisk: "LOW" | "MEDIUM" | "HIGH" = "MEDIUM",
  requiresRelevantDate = false,
): TopicBranch {
  return {
    id,
    entryQuestion,
    primaryConceptId,
    destinationConceptIds,
    destinationProcessIds,
    territoryRequirement,
    requiresRelevantDate,
    priority,
    whyRelated,
    contextRisk,
    stopRule: "Stop before a legal conclusion whenever canonical source, territory, date, privacy or gate requirements are unresolved.",
  };
}

export const PILOT_QUESTIONS: readonly QuestionContext[] = [
  {
    id: "LM-Q-001",
    question: "¿Qué debería revisar antes de firmar un contrato?",
    audienceScope: "BOTH",
    worldIds: ["vida-cotidiana", "empresa-comercio"],
    legalDomainIds: ["CONTRACTS"],
    conceptIds: ["consentimiento", "obligacion", "prueba"],
    knownFacts: [],
    unknowns: ["tipo de contrato", "territorio", "partes", "prestaciones"],
    preferredLane: "PRODUCT_PREPARATION",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "WEB_KNOWLEDGE", "PRODUCT_TOOL"],
    branch: branch("LM-B-001", "¿Qué debería revisar antes de firmar un contrato?", "consentimiento", ["obligacion", "prueba"], ["leer-antes-de-aceptar"], "OPTIONAL", 10, "Conecta voluntad, obligaciones, evidencia y preparación antes de asumir compromisos.", "LOW"),
  },
  {
    id: "LM-Q-002",
    question: "¿Qué debe quedar claro sobre precio, entrega y responsabilidades?",
    audienceScope: "BOTH",
    worldIds: ["vida-cotidiana", "empresa-comercio"],
    legalDomainIds: ["CONTRACTS", "MERCANTILE"],
    conceptIds: ["obligacion"],
    knownFacts: [],
    unknowns: ["objeto", "contraprestación", "plazos", "territorio"],
    preferredLane: "PRODUCT_PREPARATION",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "WEB_KNOWLEDGE", "PRODUCT_TOOL"],
    branch: branch("LM-B-002", "¿Qué debe quedar claro sobre precio, entrega y responsabilidades?", "obligacion", ["prueba"], ["leer-antes-de-aceptar"], "OPTIONAL", 9, "Convierte términos operativos en obligaciones identificables y verificables.", "LOW"),
  },
  {
    id: "LM-Q-003",
    question: "¿Una cotización, una oferta y un contrato son lo mismo?",
    audienceScope: "PUBLIC",
    worldIds: ["vida-cotidiana", "empresa-comercio"],
    legalDomainIds: ["CONTRACTS", "MERCANTILE"],
    conceptIds: ["consentimiento", "obligacion"],
    knownFacts: [],
    unknowns: ["documentos concretos", "conducta posterior", "territorio"],
    needsConceptPrimer: true,
    preferredLane: "PUBLIC_GENERAL",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-003", "¿Una cotización, una oferta y un contrato son lo mismo?", "consentimiento", ["obligacion"], [], "REQUIRED", 8, "La distinción puede depender de formación del consentimiento y reglas territoriales.", "MEDIUM"),
  },
  {
    id: "LM-Q-004",
    question: "¿Aceptar algo por WhatsApp puede producir efectos jurídicos?",
    audienceScope: "PUBLIC",
    worldIds: ["vida-cotidiana", "tecnologia-ia"],
    legalDomainIds: ["CONTRACTS", "DIGITAL_DATA_AI"],
    conceptIds: ["consentimiento", "prueba"],
    knownFacts: [],
    unknowns: ["contenido del intercambio", "identidad", "territorio", "fecha"],
    preferredLane: "PUBLIC_GENERAL",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-004", "¿Aceptar algo por WhatsApp puede producir efectos jurídicos?", "consentimiento", ["prueba"], ["organizar-hechos-y-prueba"], "REQUIRED", 9, "Conecta manifestación de voluntad con evidencia digital sin asumir efectos universales.", "HIGH", true),
  },
  {
    id: "LM-Q-005",
    question: "¿Una firma electrónica basta para considerar firmado un documento?",
    audienceScope: "BOTH",
    worldIds: ["tecnologia-ia", "empresa-comercio"],
    legalDomainIds: ["CONTRACTS", "DIGITAL_DATA_AI"],
    conceptIds: ["consentimiento", "prueba"],
    knownFacts: [],
    unknowns: ["tipo de firma", "documento", "territorio", "fecha"],
    preferredLane: "PUBLIC_GENERAL",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-005", "¿Una firma electrónica basta para considerar firmado un documento?", "consentimiento", ["prueba"], [], "REQUIRED", 9, "La suficiencia formal depende del acto, tecnología, evidencia y jurisdicción.", "HIGH", true),
  },
  {
    id: "LM-Q-006",
    question: "¿Qué evidencia conviene conservar alrededor de un contrato?",
    audienceScope: "BOTH",
    worldIds: ["conflicto-prueba", "empresa-comercio"],
    legalDomainIds: ["CONTRACTS", "PROCEDURE_EVIDENCE"],
    conceptIds: ["prueba", "hecho-juridicamente-relevante"],
    knownFacts: [],
    unknowns: ["tipo de relación", "riesgo", "territorio"],
    preferredLane: "PRODUCT_PREPARATION",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "WEB_KNOWLEDGE", "PRODUCT_TOOL"],
    branch: branch("LM-B-006", "¿Qué evidencia conviene conservar alrededor de un contrato?", "prueba", ["hecho-juridicamente-relevante"], ["organizar-hechos-y-prueba"], "OPTIONAL", 9, "La documentación conecta hechos, cumplimiento y revisión posterior.", "LOW"),
  },
  {
    id: "LM-Q-007",
    question: "¿Quién puede firmar por una empresa?",
    audienceScope: "BOTH",
    worldIds: ["empresa-comercio"],
    legalDomainIds: ["CORPORATE", "CONTRACTS"],
    conceptIds: ["representacion", "poder"],
    knownFacts: [],
    unknowns: ["tipo de entidad", "cargo", "facultades", "territorio", "vigencia"],
    preferredLane: "FOUNDER_LINKEDIN",
    intendedSurfaces: ["FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-007", "¿Quién puede firmar por una empresa?", "representacion", ["poder"], ["verificar-representacion"], "REQUIRED", 10, "La firma corporativa exige conectar identidad, función, facultades, vigencia y prueba.", "HIGH"),
  },
  {
    id: "LM-Q-008",
    question: "¿Cómo verifico que alguien realmente representa a una empresa?",
    audienceScope: "BOTH",
    worldIds: ["empresa-comercio", "conflicto-prueba"],
    legalDomainIds: ["CORPORATE", "CONTRACTS", "PROCEDURE_EVIDENCE"],
    conceptIds: ["representacion", "poder", "prueba"],
    knownFacts: [],
    unknowns: ["documento de facultades", "vigencia", "territorio"],
    preferredLane: "PRODUCT_PREPARATION",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "FOUNDER_LINKEDIN", "WEB_KNOWLEDGE", "PRODUCT_TOOL"],
    branch: branch("LM-B-008", "¿Cómo verifico que alguien realmente representa a una empresa?", "representacion", ["poder", "prueba"], ["verificar-representacion"], "REQUIRED", 10, "Convierte una afirmación de autoridad en una secuencia verificable de preparación.", "HIGH"),
  },
  {
    id: "LM-Q-009",
    question: "¿Qué es un poder y por qué importa su alcance?",
    audienceScope: "BOTH",
    worldIds: ["empresa-comercio"],
    legalDomainIds: ["CORPORATE", "CONTRACTS"],
    conceptIds: ["poder", "representacion"],
    knownFacts: [],
    unknowns: ["instrumento", "facultades", "territorio", "vigencia"],
    needsConceptPrimer: true,
    preferredLane: "PUBLIC_GENERAL",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-009", "¿Qué es un poder y por qué importa su alcance?", "poder", ["representacion"], ["verificar-representacion"], "REQUIRED", 9, "El concepto permite separar cargo, representación y facultades concretas.", "MEDIUM"),
  },
  {
    id: "LM-Q-010",
    question: "¿Qué pasa si un representante actúa fuera de sus facultades?",
    audienceScope: "PROFESSIONAL",
    worldIds: ["empresa-comercio", "conflicto-prueba"],
    legalDomainIds: ["CORPORATE", "CONTRACTS"],
    conceptIds: ["representacion", "poder", "obligacion"],
    knownFacts: [],
    unknowns: ["acto", "facultades", "contraparte", "territorio", "fecha"],
    preferredLane: "FOUNDER_LINKEDIN",
    intendedSurfaces: ["FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-010", "¿Qué pasa si un representante actúa fuera de sus facultades?", "representacion", ["poder", "obligacion"], [], "REQUIRED", 10, "El análisis exige distinguir acto, autoridad, límites, terceros y regla territorial.", "HIGH", true),
  },
  {
    id: "LM-Q-011",
    question: "¿Dueño, administrador y representante significan lo mismo?",
    audienceScope: "BOTH",
    worldIds: ["empresa-comercio"],
    legalDomainIds: ["CORPORATE"],
    conceptIds: ["representacion", "poder"],
    knownFacts: [],
    unknowns: ["estructura organizacional", "territorio"],
    needsConceptPrimer: true,
    preferredLane: "PUBLIC_GENERAL",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-011", "¿Dueño, administrador y representante significan lo mismo?", "representacion", ["poder"], [], "OPTIONAL", 8, "La diferenciación conceptual previene asumir facultades por el solo nombre del cargo.", "LOW"),
  },
  {
    id: "LM-Q-012",
    question: "¿Qué conviene revisar de una contraparte antes de contratar?",
    audienceScope: "BOTH",
    worldIds: ["empresa-comercio"],
    legalDomainIds: ["CONTRACTS", "CORPORATE", "MERCANTILE"],
    conceptIds: ["representacion", "prueba", "obligacion"],
    knownFacts: [],
    unknowns: ["tipo de operación", "contraparte", "riesgo", "territorio"],
    preferredLane: "PRODUCT_PREPARATION",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "FOUNDER_LINKEDIN", "WEB_KNOWLEDGE", "PRODUCT_TOOL"],
    branch: branch("LM-B-012", "¿Qué conviene revisar de una contraparte antes de contratar?", "representacion", ["prueba", "obligacion"], ["verificar-representacion"], "OPTIONAL", 10, "Conecta identidad, autoridad, capacidad operativa y evidencia sin convertir due diligence en una conclusión automática.", "MEDIUM"),
  },
  {
    id: "LM-Q-013",
    question: "¿Los anexos y documentos relacionados forman parte del mismo acuerdo?",
    audienceScope: "PUBLIC",
    worldIds: ["vida-cotidiana", "empresa-comercio"],
    legalDomainIds: ["CONTRACTS"],
    conceptIds: ["obligacion", "prueba"],
    knownFacts: [],
    unknowns: ["texto contractual", "incorporación", "documentos", "territorio"],
    preferredLane: "PUBLIC_GENERAL",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-013", "¿Los anexos y documentos relacionados forman parte del mismo acuerdo?", "obligacion", ["prueba"], [], "REQUIRED", 8, "La relación documental puede depender de incorporación, identificación, firma y reglas aplicables.", "MEDIUM"),
  },
  {
    id: "LM-Q-014",
    question: "¿Qué riesgo crea un alcance de servicios ambiguo?",
    audienceScope: "BOTH",
    worldIds: ["empresa-comercio"],
    legalDomainIds: ["CONTRACTS", "MERCANTILE"],
    conceptIds: ["obligacion", "prueba"],
    knownFacts: [],
    unknowns: ["servicio", "entregables", "criterios de aceptación", "territorio"],
    preferredLane: "FOUNDER_LINKEDIN",
    intendedSurfaces: ["FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-014", "¿Qué riesgo crea un alcance de servicios ambiguo?", "obligacion", ["prueba"], ["organizar-hechos-y-prueba"], "OPTIONAL", 9, "Un alcance operativo poco claro dificulta distinguir obligación, evidencia de cumplimiento y desviación.", "MEDIUM"),
  },
  {
    id: "LM-Q-015",
    question: "¿Retraso e incumplimiento son siempre lo mismo?",
    audienceScope: "PUBLIC",
    worldIds: ["vida-cotidiana", "empresa-comercio"],
    legalDomainIds: ["CONTRACTS"],
    conceptIds: ["obligacion", "hecho-juridicamente-relevante"],
    knownFacts: [],
    unknowns: ["obligación", "plazo", "hechos", "territorio", "fecha"],
    needsConceptPrimer: true,
    preferredLane: "PUBLIC_GENERAL",
    intendedSurfaces: ["LEGALMENTE_PUBLIC", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-015", "¿Retraso e incumplimiento son siempre lo mismo?", "obligacion", ["hecho-juridicamente-relevante"], [], "REQUIRED", 8, "La clasificación depende de la obligación, el tiempo, los hechos y la regla aplicable.", "HIGH", true),
  },
  {
    id: "LM-Q-016",
    question: "¿Cómo debería verse una matriz interna de facultades para contratar?",
    audienceScope: "PROFESSIONAL",
    worldIds: ["empresa-comercio"],
    legalDomainIds: ["CORPORATE", "CONTRACTS"],
    conceptIds: ["representacion", "poder"],
    knownFacts: [],
    unknowns: ["roles", "montos", "tipos de acto", "gobierno interno", "territorio"],
    preferredLane: "FOUNDER_LINKEDIN",
    intendedSurfaces: ["FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-016", "¿Cómo debería verse una matriz interna de facultades para contratar?", "representacion", ["poder"], ["verificar-representacion"], "OPTIONAL", 10, "Traduce gobierno corporativo en autoridad operativa trazable sin confundir política interna con poder jurídico externo.", "MEDIUM"),
  },
  {
    id: "LM-Q-017",
    question: "¿Cómo conectar aprobaciones internas, firma y responsabilidad sin duplicar controles?",
    audienceScope: "PROFESSIONAL",
    worldIds: ["empresa-comercio"],
    legalDomainIds: ["CORPORATE", "CONTRACTS"],
    conceptIds: ["representacion", "poder", "prueba"],
    knownFacts: [],
    unknowns: ["flujo de aprobación", "roles", "evidencia", "territorio"],
    preferredLane: "FOUNDER_LINKEDIN",
    intendedSurfaces: ["FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-017", "¿Cómo conectar aprobaciones internas, firma y responsabilidad sin duplicar controles?", "representacion", ["poder", "prueba"], ["verificar-representacion"], "OPTIONAL", 10, "Conecta gobierno, autorización, ejecución y trazabilidad como capas distintas.", "MEDIUM"),
  },
  {
    id: "LM-Q-018",
    question: "¿Qué debería producir una due diligence de contraparte antes de contratar?",
    audienceScope: "PROFESSIONAL",
    worldIds: ["empresa-comercio", "conflicto-prueba"],
    legalDomainIds: ["CORPORATE", "CONTRACTS", "MERCANTILE"],
    conceptIds: ["representacion", "prueba", "hecho-juridicamente-relevante"],
    knownFacts: [],
    unknowns: ["operación", "riesgos", "fuentes", "territorio"],
    preferredLane: "FOUNDER_LINKEDIN",
    intendedSurfaces: ["FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-018", "¿Qué debería producir una due diligence de contraparte antes de contratar?", "prueba", ["representacion", "hecho-juridicamente-relevante"], ["organizar-hechos-y-prueba"], "OPTIONAL", 10, "La due diligence debe producir una línea base verificable de hechos, documentos, límites y preguntas abiertas.", "MEDIUM"),
  },
  {
    id: "LM-Q-019",
    question: "¿Quién debe tener autoridad para contratar cuando intervienen varias empresas del mismo grupo?",
    audienceScope: "PROFESSIONAL",
    worldIds: ["empresa-comercio"],
    legalDomainIds: ["CORPORATE", "CONTRACTS", "MERCANTILE"],
    conceptIds: ["representacion", "poder", "obligacion"],
    knownFacts: [],
    unknowns: ["entidades", "roles", "contrato", "territorio", "facultades"],
    preferredLane: "FOUNDER_LINKEDIN",
    intendedSurfaces: ["FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-019", "¿Quién debe tener autoridad para contratar cuando intervienen varias empresas del mismo grupo?", "representacion", ["poder", "obligacion"], ["verificar-representacion"], "REQUIRED", 10, "Evita asumir que pertenecer a un grupo empresarial transfiere automáticamente personalidad, facultades u obligaciones.", "HIGH"),
  },
  {
    id: "LM-Q-020",
    question: "¿Qué evidencia debería dejar una cadena de autorización corporativa?",
    audienceScope: "PROFESSIONAL",
    worldIds: ["empresa-comercio", "conflicto-prueba"],
    legalDomainIds: ["CORPORATE", "CONTRACTS", "PROCEDURE_EVIDENCE"],
    conceptIds: ["representacion", "poder", "prueba"],
    knownFacts: [],
    unknowns: ["proceso", "roles", "soportes", "territorio"],
    preferredLane: "FOUNDER_LINKEDIN",
    intendedSurfaces: ["FOUNDER_LINKEDIN", "WEB_KNOWLEDGE"],
    branch: branch("LM-B-020", "¿Qué evidencia debería dejar una cadena de autorización corporativa?", "prueba", ["representacion", "poder"], ["organizar-hechos-y-prueba"], "OPTIONAL", 9, "Convierte la autoridad operativa en una secuencia revisable de decisiones y soportes.", "MEDIUM"),
  },
] as const;

export const KNOWLEDGE_PILOT_RULES = Object.freeze({
  canonicalAuthoritySystem: "Psyche-creation",
  webRole: "CONSUME_ADAPT_PRESENT",
  webMayApproveClaims: false,
  webMayRecomputeSources: false,
  webMayOpenLegalGate: false,
  publicAndProfessionalShareCanonicalIds: true,
  publicAndProfessionalMayUseDifferentCopy: true,
  maximumVisibleAlternativeBranches: 2,
  pilotQuestionCount: 20,
});
