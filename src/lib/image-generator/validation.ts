import type { ImageGenerationBrief } from "./types";

const norm = (v: string): string => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const banned = ["sepia", "collage", "grid", "storyboard", "gavel", "mazo", "golden scales", "balanza dorada", "generic courtroom", "canva"];

export function validateImageBrief(b: ImageGenerationBrief): string[] {
  const errors: string[] = [];
  const values = [b.matter, b.editorialFamily, b.need, b.coreConcept, b.resolvedQuestion, b.emotion, b.tension, b.consequence, b.artDirection, b.composition, b.camera, b.lighting, b.material, b.brandSurface];
  if (values.some((v) => !v.trim())) errors.push(`${b.contentId}: incomplete image brief.`);
  const expected = b.mode === "LINKEDIN_LEGALMENTE" || b.mode === "LINKEDIN_FOUNDER" ? "4:5" : "9:16";
  if (b.format !== expected) errors.push(`${b.contentId}: format must be ${expected}.`);
  if (b.argument.contentId !== b.contentId) errors.push(`${b.contentId}: visual argument binding mismatch.`);
  const visual = norm([b.artDirection, b.composition, b.argument.imageArgument, b.argument.conflict].join(" "));
  for (const term of banned) if (visual.includes(norm(term))) errors.push(`${b.contentId}: banned visual pattern ${term}.`);
  return errors;
}
