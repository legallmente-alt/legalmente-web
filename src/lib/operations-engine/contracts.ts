import { z } from "zod";

export const PrimarySourceSchema = z.object({
  law: z.string().min(1, "Nombre oficial de la ley/código requerido"),
  article: z.string().min(1, "Artículo exacto requerido"),
  url: z.string().url("URL de fuente primaria oficial verificable requerida"),
  territory: z.enum(["MX-FED", "MX-CDMX", "ES", "AR", "CO", "CL", "PANHISPÁNICO"]),
  verificationDate: z.string().date("Formato ISO obligatorio: YYYY-MM-DD"),
  qualifier: z.string().optional(),
});

export const WorkflowStateSchema = z.object({
  copyState: z.enum(["DRAFT", "REVIEW", "APPROVED"]),
  visualState: z.enum(["PENDING", "ATTACHED", "APPROVED", "NOT_APPLICABLE"]),
  integrationState: z.enum(["PENDING", "STAGED", "RENDER_READY"]),
  publicationState: z.enum(["BLOCKED", "QA_ONLY", "LIVE"]),
});

export const ClaimManifestSchema = z.object({
  contentId: z.string().regex(/^LM-(PIEZA|ACT|EVG|CORP|HIS|IAD|EVD|CTR)-\d{3}(-[A-Z0-9]+)?$/, "Formato de ID inválido"),
  exactClaim: z.string().min(10, "El claim dogmático no puede estar vacío"),
  source: PrimarySourceSchema,
  states: WorkflowStateSchema,
  founderEvidence: z.string().min(1, "Evidencia o firma de verificación requerida"),
}).superRefine((data, ctx) => {
  if (data.states.publicationState === "LIVE") {
    const ready = data.states.copyState === "APPROVED"
      && (data.states.visualState === "APPROVED" || data.states.visualState === "NOT_APPLICABLE")
      && data.states.integrationState === "RENDER_READY"
      && data.founderEvidence.length > 0;
    if (!ready) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "FAIL-CLOSED BLOCK: estados subyacentes no aprobados" });
    }
  }
});

export type PrimarySource = z.infer<typeof PrimarySourceSchema>;
export type WorkflowState = z.infer<typeof WorkflowStateSchema>;
export type ClaimManifest = z.infer<typeof ClaimManifestSchema>;
