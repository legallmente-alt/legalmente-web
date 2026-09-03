export const LEGAL_DEPTH_LEVELS = [
  "FOUNDATIONS",
  "PERSON_AND_DIGNITY",
  "RIGHTS_AND_DUTIES",
  "CORE_INSTITUTIONS",
  "LEGAL_BRANCHES",
  "CONCRETE_PROBLEMS",
  "SPECIALTIES",
  "JURISDICTION_AND_PROCEDURE",
] as const;

export type LegalDepthLevel = (typeof LEGAL_DEPTH_LEVELS)[number];

export const EDITORIAL_FORMATS = [
  "MEMORABLE_PHRASE",
  "REFLECTION",
  "CONCEPT",
  "GUIDE",
  "STEPS",
  "CHECKLIST",
  "COMPARISON",
  "LEGAL_MYTH",
  "HUMAN_SCENE",
  "HISTORY_CULTURE",
  "QUESTION",
  "ELEGANT_INSTITUTIONAL",
] as const;

export type EditorialFormat = (typeof EDITORIAL_FORMATS)[number];

export const VISUAL_GRAMMARS = [
  "CINEMATIC_PHOTOGRAPHY",
  "EDITORIAL_STILL_LIFE",
  "CLASSICAL_REINTERPRETATION",
  "ARCHITECTURAL_MINIMALISM",
  "HISTORICAL_DOCUMENTARY",
  "CONCEPTUAL_SYMBOLISM",
] as const;

export type VisualGrammar = (typeof VISUAL_GRAMMARS)[number];

export interface EditorialCandidate {
  id: string;
  topic: string;
  angle: string;
  legalRelation: string;
  audience: string;
  depth: LegalDepthLevel;
  format: EditorialFormat;
  visualGrammar: VisualGrammar;
  visualMetaphor: string;
  jurisdiction?: string;
  legalValue: number;
  practicalUtility: number;
  humanRelevance: number;
  narrativePotential: number;
  visualPotential: number;
}

export interface EditorialHistoryItem {
  topic: string;
  angle: string;
  legalRelation: string;
  audience: string;
  format: EditorialFormat;
  visualGrammar: VisualGrammar;
  visualMetaphor: string;
}

export interface BatchValidation {
  ok: boolean;
  errors: string[];
  fingerprints: string[];
}

const DEPTH_INDEX = new Map(LEGAL_DEPTH_LEVELS.map((level, index) => [level, index]));
const normalize = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

export function editorialFingerprint(item: EditorialCandidate | EditorialHistoryItem): string {
  return [item.topic, item.angle, item.legalRelation, item.audience, item.format, item.visualMetaphor]
    .map(normalize)
    .join("|");
}

export function editorialUtility(candidate: EditorialCandidate): number {
  return candidate.legalValue * 0.30
    + candidate.practicalUtility * 0.25
    + candidate.humanRelevance * 0.15
    + candidate.narrativePotential * 0.15
    + candidate.visualPotential * 0.15;
}

export function requiresJurisdiction(candidate: EditorialCandidate): boolean {
  return candidate.depth === "JURISDICTION_AND_PROCEDURE";
}

export function validateEditorialBatch(
  candidates: EditorialCandidate[],
  history: EditorialHistoryItem[] = [],
): BatchValidation {
  const errors: string[] = [];
  const fingerprints = candidates.map(editorialFingerprint);
  const historyFingerprints = new Set(history.map(editorialFingerprint));

  if (candidates.length === 10) {
    if (new Set(candidates.map((item) => item.format)).size < 7) {
      errors.push("A 10-piece batch must use at least 7 editorial formats.");
    }
    if (new Set(candidates.map((item) => item.visualGrammar)).size < 4) {
      errors.push("A 10-piece batch must use at least 4 visual grammars.");
    }
  }

  fingerprints.forEach((fingerprint, index) => {
    if (fingerprints.indexOf(fingerprint) !== index) {
      errors.push(`Duplicate editorial fingerprint in batch: ${candidates[index].id}.`);
    }
    if (historyFingerprints.has(fingerprint)) {
      errors.push(`Editorial combination already exists in history: ${candidates[index].id}.`);
    }
  });

  candidates.forEach((candidate, index) => {
    if (editorialUtility(candidate) < 5.5) {
      errors.push(`Low-value filler rejected: ${candidate.id}.`);
    }
    if (requiresJurisdiction(candidate) && !candidate.jurisdiction) {
      errors.push(`Jurisdiction is required at procedural depth: ${candidate.id}.`);
    }
    if (index > 0) {
      const previous = candidates[index - 1];
      if (previous.format === candidate.format && previous.visualGrammar === candidate.visualGrammar) {
        errors.push(`Adjacent pieces cannot repeat both format and visual grammar: ${candidate.id}.`);
      }
    }
  });

  return { ok: errors.length === 0, errors, fingerprints };
}

export function prioritizeBasicFirst(
  candidates: EditorialCandidate[],
  coveredDepths: Partial<Record<LegalDepthLevel, number>> = {},
): EditorialCandidate[] {
  return [...candidates].sort((a, b) => {
    const depthA = DEPTH_INDEX.get(a.depth) ?? 99;
    const depthB = DEPTH_INDEX.get(b.depth) ?? 99;
    const coverageA = coveredDepths[a.depth] ?? 0;
    const coverageB = coveredDepths[b.depth] ?? 0;
    const priorityA = depthA * 10 + coverageA - editorialUtility(a);
    const priorityB = depthB * 10 + coverageB - editorialUtility(b);
    return priorityA - priorityB;
  });
}

export const EDITORIAL_ENGINE_RULES = Object.freeze({
  doctrineNote: "Kelsen-inspired depth architecture; it does not assert a universal hierarchy of positive-law sources.",
  defaultJurisdiction: "PAN_HISPANIC_NEUTRAL",
  basicFirst: true,
  rejectLowValueFiller: true,
  antiRepetitionUsesSemanticCombination: true,
  batchOfTenMinimumFormats: 7,
  batchOfTenMinimumVisualGrammars: 4,
  publicationGatesRemainExternal: true,
});
