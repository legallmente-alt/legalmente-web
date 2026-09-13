import type { ImageGenerationBrief } from "./types";

const norm = (v: string): string => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const banned = ["sepia", "collage", "grid", "storyboard", "gavel", "mazo", "golden scales", "balanza dorada", "generic courtroom", "canva"];

export function validateImageBrief(b: ImageGenerationBrief): string[] {
  const errors: string[] = [];
  const values = [
    b.contentId, b.matter, b.editorialFamily, b.need, b.coreConcept, b.resolvedQuestion,
    b.emotion, b.tension, b.consequence, b.artDirection, b.composition, b.camera,
    b.lighting, b.material, b.humanPresence, b.brandSurface, b.copyExact,
  ];
  if (values.some((v) => !v.trim())) errors.push(`${b.contentId || "UNKNOWN"}: incomplete image brief.`);
  const expected = b.mode === "LINKEDIN_LEGALMENTE" || b.mode === "LINKEDIN_FOUNDER" ? "4:5" : "9:16";
  if (b.format !== expected) errors.push(`${b.contentId}: format must be ${expected}.`);
  if (b.argument.contentId !== b.contentId) errors.push(`${b.contentId}: visual argument binding mismatch.`);
  if (b.argument.consequence && norm(b.argument.consequence) !== norm(b.consequence)) errors.push(`${b.contentId}: consequence drift between semantic and visual layers.`);
  if (norm(b.artDirection) === norm(b.argument.imageArgument)) errors.push(`${b.contentId}: art direction cannot replace the image argument.`);
  if (b.territoryMode === "VERIFIED_LOCAL" && !(b.allowedLocalCues?.length)) errors.push(`${b.contentId}: verified local imagery requires explicit allowed cues.`);
  const visual = norm([b.artDirection, b.composition, b.argument.imageArgument, b.argument.conflict, b.brandSurface].join(" "));
  for (const term of banned) if (visual.includes(norm(term))) errors.push(`${b.contentId}: banned visual pattern ${term}.`);
  return errors;
}
