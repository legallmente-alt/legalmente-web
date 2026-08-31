import type { ToolResult } from "./types";

export type BeforeSigningInput = {
  contractType: "ARRENDAMIENTO" | "PRESTACION_SERVICIOS" | "LABORAL" | "PROMESA_COMPRAVENTA" | "COMPRAVENTA" | "CONFIDENCIALIDAD" | "GENERICO";
  partiesIdentified: boolean;
  clearConsideration: boolean;
  termAndTermination: boolean;
  blanksFilled: boolean;
  jurisdictionClause: boolean;
  asksForValidityOpinion?: boolean;
};

export type BeforeSigningFinding = {
  level: 1 | 2 | 3;
  code: string;
  label: "PUNTO DE ATENCIÓN ESTRUCTURAL" | "REVISIÓN PREVIA RECOMENDADA" | "PRECAUCIÓN / CONDICIÓN CRÍTICA";
  message: string;
};

const provenance = {
  territory: "MX" as const,
  ruleVersion: "1.0.0-frozen+wording-patch",
  calculationVersion: "1.0.0",
  effectiveDate: "2026-08-28",
  sourceIds: ["CCF-1792-1859", "CCOM-77-88", "LFT-5", "LFT-33"],
};

export function evaluateBeforeSigning(input: BeforeSigningInput): ToolResult<{ findings: BeforeSigningFinding[]; disclaimer: string }> {
  if (input.asksForValidityOpinion) {
    return {
      state: "REVIEW_REQUIRED",
      warnings: [],
      reviewReasons: ["La herramienta no dictamina validez jurídica ni conveniencia de firmar."],
      provenance,
    };
  }

  const findings: BeforeSigningFinding[] = [];
  if (!input.blanksFilled) findings.push({ level: 3, code: "BS-BLANKS", label: "PRECAUCIÓN / CONDICIÓN CRÍTICA", message: "Recomendación de preparación: verifique o solicite aclaración formal sobre espacios o anexos incompletos antes de firmar." });
  if (!input.clearConsideration) findings.push({ level: 2, code: "BS-CONSIDERATION", label: "REVISIÓN PREVIA RECOMENDADA", message: "Revise que el precio, contraprestación o salario y su moneda estén expresados con claridad." });
  if (!input.partiesIdentified) findings.push({ level: 2, code: "BS-PARTIES", label: "REVISIÓN PREVIA RECOMENDADA", message: "Revise la identificación de las partes y los datos necesarios para saber quién asume cada obligación." });
  if (!input.termAndTermination) findings.push({ level: 1, code: "BS-TERM", label: "PUNTO DE ATENCIÓN ESTRUCTURAL", message: "Verifique vigencia, duración y mecanismos de terminación aplicables al documento." });
  if (!input.jurisdictionClause) findings.push({ level: 1, code: "BS-JURISDICTION", label: "PUNTO DE ATENCIÓN ESTRUCTURAL", message: "No se identificó una cláusula expresa de ley o foro aplicable; confirme si corresponde incorporarla o aclararla." });
  if (input.contractType === "LABORAL") findings.push({ level: 3, code: "BS-LABOR-RIGHTS", label: "PRECAUCIÓN / CONDICIÓN CRÍTICA", message: "Alerta de derecho irrenunciable: ciertas renuncias anticipadas de derechos laborales pueden no ser reconocidas por la legislación aplicable y ameritan revisión profesional." });

  return {
    state: "PASS",
    warnings: [],
    data: {
      findings,
      disclaimer: "Esta herramienta proporciona una guía estructural preventiva de lectura y verificación. No constituye asesoría jurídica, dictamen de validez ni sustituto de una revisión profesional.",
    },
    provenance,
  };
}
