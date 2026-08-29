export type ContractEscalationCode =
  | "MISSING_INPUT"
  | "TERRITORIAL_RESEARCH_REQUIRED"
  | "POWER_REVIEW_REQUIRED"
  | "CLAUSE_VERIFICATION_REQUIRED"
  | "PROFESSIONAL_REVIEW_REQUIRED"
  | "CONFLICT_REQUIRES_RESOLUTION"
  | "PII_DISABLED"
  | "DRAFT_ELIGIBLE";

export interface ContractEscalationRule {
  code: ContractEscalationCode;
  message: string;
  nextStep: string;
  blocksRealDraft: boolean;
}

export const contractEscalationRules: readonly ContractEscalationRule[] = [
  {
    code: "MISSING_INPUT",
    message: "Falta información esencial. Sin ella no podemos completar el mapa contractual.",
    nextStep: "Completar el dato o conservarlo expresamente como pendiente.",
    blocksRealDraft: true,
  },
  {
    code: "TERRITORIAL_RESEARCH_REQUIRED",
    message: "La respuesta depende del territorio y requiere investigación específica.",
    nextStep: "Seleccionar territorio y esperar cobertura jurídica verificada.",
    blocksRealDraft: true,
  },
  {
    code: "POWER_REVIEW_REQUIRED",
    message: "No podemos concluir que la persona tenga facultades suficientes.",
    nextStep: "Completar la información de representación y enviarla a revisión cuando corresponda.",
    blocksRealDraft: true,
  },
  {
    code: "CLAUSE_VERIFICATION_REQUIRED",
    message: "Este componente contractual no está verificado para el alcance solicitado.",
    nextStep: "Excluirlo, sustituirlo o enviarlo a investigación y revisión.",
    blocksRealDraft: true,
  },
  {
    code: "PROFESSIONAL_REVIEW_REQUIRED",
    message: "Este punto requiere revisión profesional; la herramienta no lo decide.",
    nextStep: "Preparar las preguntas y detener cualquier salida que dependa de esa revisión.",
    blocksRealDraft: true,
  },
  {
    code: "CONFLICT_REQUIRES_RESOLUTION",
    message: "Hay datos o condiciones incompatibles. El sistema no inferirá cuál debe prevalecer.",
    nextStep: "Resolver expresamente la contradicción antes de continuar.",
    blocksRealDraft: true,
  },
  {
    code: "PII_DISABLED",
    message: "Esta versión no recibe datos personales ni documentos reales.",
    nextStep: "Continuar únicamente con datos sintéticos o detener el flujo.",
    blocksRealDraft: true,
  },
  {
    code: "DRAFT_ELIGIBLE",
    message: "La estructura podría pasar a una salida permitida, pero esto no significa listo para firmar.",
    nextStep: "Mantener el borrador real bloqueado hasta una autorización posterior separada.",
    blocksRealDraft: true,
  },
] as const;

export function getContractEscalationRule(code: ContractEscalationCode): ContractEscalationRule {
  const rule = contractEscalationRules.find((item) => item.code === code);
  if (!rule) throw new Error(`Unknown contract escalation code: ${code}`);
  return rule;
}
