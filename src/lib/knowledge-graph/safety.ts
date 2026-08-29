export type RelationalSafetyDisposition =
  | "SAFE_EDUCATION"
  | "SAFE_PREPARATION"
  | "TERRITORIAL_RESEARCH_REQUIRED"
  | "PROFESSIONAL_ONLY"
  | "DO_NOT_AUTOMATE";

export type RelationalSafetyRule = {
  routeId: string;
  disposition: RelationalSafetyDisposition;
  rule: string;
  reason: string;
};

/**
 * Provisional product-safety constraints for the relational knowledge graph.
 *
 * These rules are NOT legal claims, legal approval, or publication approval.
 * They encode fail-closed product boundaries so the UI does not turn a broad
 * educational concept into individualized advice, culpability, liability,
 * damages, or a territorial conclusion without an approved source packet.
 */
export const relationalSafetyRules: readonly RelationalSafetyRule[] = [
  {
    routeId: "health-medicine",
    disposition: "SAFE_EDUCATION",
    rule: "Explain general concepts such as informed consent, professional duties, clinical records, evidence, and institutional process without deciding an individual case.",
    reason: "Conceptual education can be separated from an individualized malpractice determination.",
  },
  {
    routeId: "health-medicine",
    disposition: "TERRITORIAL_RESEARCH_REQUIRED",
    rule: "Territorial law and approved sources are required for concrete standards, procedures, deadlines, damages, compensation, and regulatory duties.",
    reason: "Medical responsibility and health regulation vary materially by jurisdiction.",
  },
  {
    routeId: "health-medicine",
    disposition: "DO_NOT_AUTOMATE",
    rule: "Do not diagnose malpractice, assign fault, or calculate individualized health-related damages or compensation.",
    reason: "Those outputs require case-specific legal and often clinical judgment.",
  },
  {
    routeId: "crime-behavior",
    disposition: "SAFE_EDUCATION",
    rule: "Explain abstract criminal-law concepts, evidentiary concepts, process structure, and criminology or psychology as contextual disciplines.",
    reason: "Educational explanation is distinct from deciding criminal responsibility.",
  },
  {
    routeId: "crime-behavior",
    disposition: "TERRITORIAL_RESEARCH_REQUIRED",
    rule: "Specific offenses, penalties, procedural deadlines, detention rules, defenses, and alternative-resolution requirements require territorial source binding.",
    reason: "Criminal law and procedure are jurisdiction-specific and high consequence.",
  },
  {
    routeId: "crime-behavior",
    disposition: "DO_NOT_AUTOMATE",
    rule: "Do not label a person guilty, innocent, criminal, or definitively classify a live user's conduct as an offense; do not provide tactical evasion or non-compliance instructions.",
    reason: "Individual criminal conclusions and live-case tactics are professional-only and high risk.",
  },
  {
    routeId: "mobility-transport",
    disposition: "SAFE_EDUCATION",
    rule: "Explain the separate civil, administrative, insurance, evidentiary, and potentially criminal dimensions of a transport or traffic event.",
    reason: "A traffic event can connect several legal domains without predetermining liability.",
  },
  {
    routeId: "mobility-transport",
    disposition: "TERRITORIAL_RESEARCH_REQUIRED",
    rule: "Concrete traffic thresholds, insurance coverage rules, sanctions, compensation, deadlines, and procedural consequences require territorial source binding.",
    reason: "Traffic, insurance, and sanctions vary materially across territories.",
  },
  {
    routeId: "mobility-transport",
    disposition: "DO_NOT_AUTOMATE",
    rule: "Do not assign automatic fault or legal responsibility from collision geometry or a simplified fact pattern; do not produce final settlement amounts or waivers.",
    reason: "Fault, causation, coverage, evidence, and damages are fact- and jurisdiction-dependent.",
  },
  {
    routeId: "technology-ai",
    disposition: "SAFE_EDUCATION",
    rule: "Explain general concepts in digital consent, data, software terms, platforms, AI, digital evidence, and intellectual property without turning them into universal legal conclusions.",
    reason: "The concepts are useful cross-disciplinary entry points but their legal consequences vary by territory and context.",
  },
  {
    routeId: "technology-ai",
    disposition: "TERRITORIAL_RESEARCH_REQUIRED",
    rule: "Specific data-protection duties, AI regulatory obligations, signature validity, breach deadlines, evidence admissibility, and copyright consequences require territorial source binding.",
    reason: "Technology regulation changes quickly and is jurisdiction-specific.",
  },
  {
    routeId: "technology-ai",
    disposition: "DO_NOT_AUTOMATE",
    rule: "Do not declare informal electronic material automatically valid or invalid as evidence, and do not issue universal legality conclusions for scraping, AI authorship, or platform conduct.",
    reason: "Those questions depend on jurisdiction, facts, provenance, and evolving law.",
  },
] as const;

export function getRelationalSafetyRules(routeId: string): readonly RelationalSafetyRule[] {
  return relationalSafetyRules.filter((rule) => rule.routeId === routeId);
}

export function hasDisposition(routeId: string, disposition: RelationalSafetyDisposition): boolean {
  return relationalSafetyRules.some(
    (rule) => rule.routeId === routeId && rule.disposition === disposition,
  );
}
