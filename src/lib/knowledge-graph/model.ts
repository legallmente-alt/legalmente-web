export type KnowledgeNodeKind =
  | "HUMAN_CONDUCT"
  | "SITUATION"
  | "CONCEPT"
  | "BRANCH"
  | "PROCESS"
  | "EVIDENCE"
  | "TERRITORY"
  | "SOURCE"
  | "DISCIPLINE"
  | "HISTORY"
  | "TOOL"
  | "SERIES"
  | "CHAPTER";

export type KnowledgeEdgeKind =
  | "RELATES_TO"
  | "EXPLAINS"
  | "BELONGS_TO"
  | "LEADS_TO"
  | "PROVED_BY"
  | "GOVERNED_BY"
  | "VARIES_BY"
  | "COMPARES_WITH"
  | "ORIGINATES_IN"
  | "CONTINUES_WITH"
  | "PREPARES_FOR";

export type JurisdictionLayer = "PANHISPANIC" | "COMPARATIVE" | "TERRITORIAL" | "NO_APLICA";

export type KnowledgeNode = {
  id: string;
  kind: KnowledgeNodeKind;
  label: string;
  summary: string;
  jurisdictionLayer: JurisdictionLayer;
  route?: string;
  seriesId?: string;
  chapterNumber?: number;
  sourceRefs?: readonly string[];
  tags?: readonly string[];
};

export type KnowledgeEdge = {
  from: string;
  to: string;
  kind: KnowledgeEdgeKind;
  note?: string;
};

export type LearningRoute = {
  id: string;
  label: string;
  entryNodeIds: readonly string[];
  description: string;
};

/**
 * Product rule: LegalMente is not a flat catalogue. Every discovery surface
 * must expose where the user is, why the current node matters, and at least
 * one meaningful continuation. Legal claims remain outside this structure and
 * must come from approved data-bound sources.
 */
export const relationalLearningContract = {
  center: "HUMAN_CONDUCT",
  canonicalJourney: [
    "SITUATION",
    "CONCEPT",
    "BRANCH",
    "PROCESS",
    "EVIDENCE",
    "TERRITORY",
    "SOURCE",
    "TOOL",
  ] as const,
  navigationRules: {
    showBreadcrumbsForChapters: true,
    showSeriesAndChapterOrder: true,
    requireOnePrimaryAction: true,
    requireOneVisibleContinuation: true,
    avoidFlatEqualCardGrids: true,
    keepLegalCopyDataBound: true,
    keepTerritoryAndSourcesContextual: true,
  },
} as const;

export const learningRoutes: readonly LearningRoute[] = [
  {
    id: "everyday-life",
    label: "Vida cotidiana",
    entryNodeIds: ["conduct"],
    description: "Decisiones, consentimiento, propiedad, familia, obligaciones y situaciones ordinarias.",
  },
  {
    id: "enterprise-commerce",
    label: "Empresa y comercio",
    entryNodeIds: ["conduct"],
    description: "Contratos, representación, gobierno corporativo, relaciones de trabajo y actividad económica.",
  },
  {
    id: "conflict-evidence",
    label: "Conflicto, proceso y prueba",
    entryNodeIds: ["conduct"],
    description: "Hechos, pretensiones, defensa, prueba, procedimiento y decisiones institucionales.",
  },
  {
    id: "health-medicine",
    label: "Salud y medicina",
    entryNodeIds: ["conduct"],
    description: "Ejercicio profesional, deberes, riesgo, evidencia clínica y responsabilidades con límites territoriales explícitos.",
  },
  {
    id: "technology-ai",
    label: "Tecnología e inteligencia artificial",
    entryNodeIds: ["conduct"],
    description: "Consentimiento digital, datos, software, plataformas, automatización y nuevas formas de responsabilidad.",
  },
  {
    id: "mobility-transport",
    label: "Movilidad y transporte",
    entryNodeIds: ["conduct"],
    description: "Hechos de tránsito, transporte, empresa, seguros, evidencia y posibles consecuencias civiles, administrativas o penales.",
  },
  {
    id: "crime-behavior",
    label: "Conducta y derecho penal",
    entryNodeIds: ["conduct"],
    description: "Conducta, tipicidad, culpabilidad, prueba, proceso y vínculos con psicología, criminología y sociedad.",
  },
  {
    id: "history-systems",
    label: "Historia, sistemas y derecho comparado",
    entryNodeIds: ["conduct"],
    description: "Origen de conceptos, derecho romano, evolución institucional, familias jurídicas y comparación entre sistemas.",
  },
] as const;

export const foundationalNodes: readonly KnowledgeNode[] = [
  {
    id: "conduct",
    kind: "HUMAN_CONDUCT",
    label: "Conducta humana",
    summary: "Punto de entrada relacional: decisiones, actos, omisiones, relaciones y conflictos que el derecho organiza o limita.",
    jurisdictionLayer: "NO_APLICA",
  },
] as const;
