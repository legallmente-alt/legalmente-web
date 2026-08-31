import { chapters, concepts, processes, series, worlds } from "../knowledge-graph/content";

export type PilotContentType = "EVERYDAY_LAW" | "CONTRACTS" | "OFFICIAL_SOURCE_NAVIGATION" | "EVIDENCE" | "CINEMA_LAW";
export type PilotBriefStatus = "IDEA" | "DRAFT" | "RESEARCH_REQUIRED" | "REVIEWED" | "PUBLICABLE";
export type PilotRisk = "LOW" | "MEDIUM" | "HIGH";

export type PilotContentBrief = {
  readonly contentId: string;
  readonly worldId: string;
  readonly seriesId: string | null;
  readonly chapterId: string | null;
  readonly contentType: PilotContentType;
  readonly status: PilotBriefStatus;
  readonly userQuestion: string;
  readonly audience: string;
  readonly language: "es-MX";
  readonly territory: "MX";
  readonly territoryChangesAnswer: boolean;
  readonly answerInOneSentence: string | null;
  readonly claims: readonly string[];
  readonly sourceIds: readonly string[];
  readonly risk: PilotRisk;
  readonly foreseeableRisks: readonly string[];
  readonly stopCondition: string;
  readonly relatedContentId: string | null;
  readonly humanGate: "FACT_REVIEW" | "JURISDICTION_REVIEW" | "SOURCE_REVIEW" | "VOICE_REVIEW" | "NOT_READY";
};

export const pilotContentBriefs: readonly PilotContentBrief[] = [
  {
    contentId: "LM-PILOT-EVERYDAY-LAW-001",
    worldId: "vida-cotidiana",
    seriesId: "consentimiento-y-obligaciones",
    chapterId: "consentimiento-no-es-solo-firma",
    contentType: "EVERYDAY_LAW",
    status: "RESEARCH_REQUIRED",
    userQuestion: "¿Qué significa aceptar algo cuando no todo ocurre mediante una firma?",
    audience: "Personas que quieren entender una decisión cotidiana antes de convertirla en compromiso.",
    language: "es-MX",
    territory: "MX",
    territoryChangesAnswer: true,
    answerInOneSentence: null,
    claims: [],
    sourceIds: [],
    risk: "LOW",
    foreseeableRisks: ["Que una explicación general se entienda como permiso para actuar en un caso concreto."],
    stopCondition: "Detener si la pregunta exige determinar validez, consentimiento efectivo o consecuencias de un caso individual.",
    relatedContentId: "LM-PILOT-CONTRACTS-001",
    humanGate: "SOURCE_REVIEW",
  },
  {
    contentId: "LM-PILOT-CONTRACTS-001",
    worldId: "vida-cotidiana",
    seriesId: "consentimiento-y-obligaciones",
    chapterId: "obligacion-y-consecuencia",
    contentType: "CONTRACTS",
    status: "RESEARCH_REQUIRED",
    userQuestion: "¿Cómo distinguir una decisión, una obligación y una consecuencia sin asumir una jurisdicción universal?",
    audience: "Personas que buscan prepararse para leer condiciones o conversaciones contractuales.",
    language: "es-MX",
    territory: "MX",
    territoryChangesAnswer: true,
    answerInOneSentence: null,
    claims: [],
    sourceIds: [],
    risk: "MEDIUM",
    foreseeableRisks: ["Que una preparación educativa se confunda con revisión de un contrato real."],
    stopCondition: "Detener si aparecen documento real, recomendación de firma, cláusula concreta o conclusión de validez.",
    relatedContentId: "LM-PILOT-OFFICIAL-SOURCE-001",
    humanGate: "JURISDICTION_REVIEW",
  },
  {
    contentId: "LM-PILOT-OFFICIAL-SOURCE-001",
    worldId: "tecnologia-ia",
    seriesId: "consentimiento-digital",
    chapterId: "datos-y-condiciones",
    contentType: "OFFICIAL_SOURCE_NAVIGATION",
    status: "RESEARCH_REQUIRED",
    userQuestion: "¿Qué fuente hace falta para pasar de una explicación general a una respuesta situada?",
    audience: "Personas que necesitan aprender a distinguir una fuente oficial, su vigencia y su territorio.",
    language: "es-MX",
    territory: "MX",
    territoryChangesAnswer: true,
    answerInOneSentence: null,
    claims: [],
    sourceIds: [],
    risk: "MEDIUM",
    foreseeableRisks: ["Que una URL o autoridad se tome como suficiente sin revisar vigencia, alcance o materia."],
    stopCondition: "Detener si no existe fuente oficial verificable con territorio y fecha de vigencia.",
    relatedContentId: "LM-PILOT-EVIDENCE-001",
    humanGate: "SOURCE_REVIEW",
  },
  {
    contentId: "LM-PILOT-EVIDENCE-001",
    worldId: "conflicto-prueba",
    seriesId: "hechos-y-prueba",
    chapterId: "hechos-y-evidencia",
    contentType: "EVIDENCE",
    status: "RESEARCH_REQUIRED",
    userQuestion: "¿Qué puede sostener un hecho y qué sigue siendo una afirmación no verificada?",
    audience: "Personas que quieren ordenar información sin convertirla en una conclusión de responsabilidad.",
    language: "es-MX",
    territory: "MX",
    territoryChangesAnswer: true,
    answerInOneSentence: null,
    claims: [],
    sourceIds: [],
    risk: "MEDIUM",
    foreseeableRisks: ["Que organizar evidencia se confunda con valorar su admisibilidad o ganar un caso."],
    stopCondition: "Detener si se solicita valorar prueba de un expediente real, atribuir culpa o calcular consecuencias.",
    relatedContentId: "LM-PILOT-CINEMA-001",
    humanGate: "FACT_REVIEW",
  },
  {
    contentId: "LM-PILOT-CINEMA-001",
    worldId: "historia-sistemas",
    seriesId: null,
    chapterId: null,
    contentType: "CINEMA_LAW",
    status: "RESEARCH_REQUIRED",
    userQuestion: "¿Cómo puede una película abrir una pregunta jurídica sin convertirse en prueba?",
    audience: "Personas que entran por una historia cultural y quieren formular una pregunta de Derecho.",
    language: "es-MX",
    territory: "MX",
    territoryChangesAnswer: true,
    answerInOneSentence: null,
    claims: [],
    sourceIds: [],
    risk: "MEDIUM",
    foreseeableRisks: ["Que una escena ficticia se interprete como representación de un caso o regla real."],
    stopCondition: "No avanzar hasta identificar obra, derechos, pregunta, vínculo al grafo, fuente jurídica separada y revisión humana.",
    relatedContentId: "LM-PILOT-EVERYDAY-LAW-001",
    humanGate: "NOT_READY",
  },
] as const;

const ids = {
  worlds: new Set(worlds.map(({ id }) => id)),
  series: new Set(series.map(({ id }) => id)),
  chapters: new Set(chapters.map(({ id }) => id)),
};

export function validatePilotContentBriefs(briefs: readonly PilotContentBrief[] = pilotContentBriefs): readonly string[] {
  const issues: string[] = [];
  const allContentIds = new Set(briefs.map(({ contentId }) => contentId));
  const contentIds = new Set<string>();
  for (const brief of briefs) {
    if (contentIds.has(brief.contentId)) issues.push(`duplicate content id: ${brief.contentId}`);
    contentIds.add(brief.contentId);
    if (!ids.worlds.has(brief.worldId)) issues.push(`${brief.contentId} world does not resolve: ${brief.worldId}`);
    if (brief.seriesId !== null && !ids.series.has(brief.seriesId)) issues.push(`${brief.contentId} series does not resolve: ${brief.seriesId}`);
    if (brief.chapterId !== null && !ids.chapters.has(brief.chapterId)) issues.push(`${brief.contentId} chapter does not resolve: ${brief.chapterId}`);
    if (brief.relatedContentId !== null && !allContentIds.has(brief.relatedContentId)) issues.push(`${brief.contentId} related content does not resolve: ${brief.relatedContentId}`);
    if (brief.status === "PUBLICABLE" && (brief.claims.length === 0 || brief.sourceIds.length === 0)) issues.push(`${brief.contentId} cannot be publicable without claims and sources`);
    if (brief.status === "RESEARCH_REQUIRED" && brief.humanGate === "NOT_READY" && brief.chapterId !== null) issues.push(`${brief.contentId} is marked not ready but has a chapter link`);
  }
  return issues;
}

export const currentPilotContentValidation = validatePilotContentBriefs();
if (currentPilotContentValidation.length > 0) throw new Error(`Pilot content brief validation failed: ${currentPilotContentValidation.join("; ")}`);
