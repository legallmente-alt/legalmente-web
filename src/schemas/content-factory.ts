import { z } from "zod";

const nonEmpty = z.string().trim().min(1);
const route = z.string().trim().regex(/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?$/, "Debe ser una ruta interna real, sin query string.");
const questionList = z.array(nonEmpty).length(3);
const source = z.object({
  authority: z.enum(["DOF", "BOE", "SCJN", "OFFICIAL_OTHER"]),
  article: nonEmpty,
  territory: z.enum(["MX-FED", "MX-CDMX", "ES", "AR", "CO"]),
  verifiedAt: z.string().datetime({ offset: true }),
  url: z.string().url(),
}).strict();

export const LegalMythSchema = z.object({
  archetype: z.literal("A"),
  eyebrow: nonEmpty,
  mythQuote: nonEmpty,
  verdict: z.literal("Falso de pleno derecho"),
  legalExplanation: nonEmpty,
  positiveLawArticle: source,
  practicalAction: nonEmpty,
  threeQuestions: questionList,
  webCtaRoute: route,
}).strict();

export const NotTheSameSchema = z.object({
  archetype: z.literal("B"),
  eyebrow: nonEmpty,
  conceptA: z.object({ title: nonEmpty, definition: nonEmpty, legalBasis: source }).strict(),
  conceptB: z.object({ title: nonEmpty, definition: nonEmpty, legalBasis: source }).strict(),
  practicalRule: nonEmpty,
  threeQuestions: questionList,
  webCtaRoute: route,
}).strict();

export const LegalConceptSchema = z.object({
  archetype: z.literal("C"),
  eyebrow: nonEmpty,
  conceptTitle: nonEmpty,
  functionalDefinition: nonEmpty,
  protectedInterest: nonEmpty,
  boundaryLimit: nonEmpty,
  primarySource: source,
  threeQuestions: questionList,
  webCtaRoute: route,
}).strict();

export const PreventionChecklistSchema = z.object({
  archetype: z.literal("D"),
  eyebrow: nonEmpty,
  listTitle: nonEmpty,
  riskSubtitle: nonEmpty,
  items: z.array(nonEmpty).min(5).max(10),
  goldenRuleClosure: nonEmpty,
  threeQuestions: questionList,
  webCtaRoute: route,
}).strict();

export const ContentPayloadSchema = z.discriminatedUnion("archetype", [
  LegalMythSchema,
  NotTheSameSchema,
  LegalConceptSchema,
  PreventionChecklistSchema,
]);

export const ContentPacketSchema = z.object({
  contentId: z.string().trim().min(1).regex(/^[A-Z0-9][A-Z0-9._-]+$/),
  territory: z.enum(["MX-FED", "MX-CDMX", "ES", "AR", "CO"]),
  sourceClaims: z.array(source).min(1),
  payload: ContentPayloadSchema,
}).strict().superRefine((packet, ctx) => {
  const payloadSources = packet.payload.archetype === "A"
    ? [packet.payload.positiveLawArticle]
    : packet.payload.archetype === "B"
      ? [packet.payload.conceptA.legalBasis, packet.payload.conceptB.legalBasis]
      : packet.payload.archetype === "C"
        ? [packet.payload.primarySource]
        : [];
  const territories = [...packet.sourceClaims, ...payloadSources].map((item) => item.territory);
  if (!territories.every((value) => value === packet.territory)) {
    ctx.addIssue({ code: "custom", path: ["territory"], message: "El territorio del paquete debe coincidir con todas las fuentes." });
  }
  if (packet.payload.archetype === "D" && packet.sourceClaims.length < 1) {
    ctx.addIssue({ code: "custom", path: ["sourceClaims"], message: "Una checklist necesita al menos una fuente primaria verificable." });
  }
});

export type ContentPacket = z.infer<typeof ContentPacketSchema>;
export type ContentPayload = z.infer<typeof ContentPayloadSchema>;
