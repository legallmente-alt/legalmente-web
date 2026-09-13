import type { ProductionMode } from "@/lib/production-policy";
import type { VisualArgumentPlan } from "@/lib/visual-argument";

export type ImageGenerationBrief = {
  contentId: string;
  mode: ProductionMode;
  matter: string;
  editorialFamily: string;
  need: string;
  coreConcept: string;
  resolvedQuestion: string;
  emotion: string;
  tension: string;
  consequence: string;
  argument: VisualArgumentPlan;
  artDirection: string;
  composition: string;
  camera: string;
  lighting: string;
  material: string;
  humanPresence: string;
  brandSurface: string;
  format: string;
  copyExact: string;
  isDigitalDataAi?: boolean;
  recentStyleKeys?: readonly string[];
  recentMetaphorKeys?: readonly string[];
  recentSceneKeys?: readonly string[];
};
