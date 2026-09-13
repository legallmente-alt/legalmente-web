import type { ImageGenerationBrief } from "./types";

export function compileNegativePrompt(b: ImageGenerationBrief): string {
  const recent = [
    ...(b.recentStyleKeys ?? []),
    ...(b.recentMetaphorKeys ?? []),
    ...(b.recentSceneKeys ?? []),
  ].map((v) => `recently used: ${v}`).filter(Boolean);

  return [
    "sepia", "murky dark", "collage", "grid", "storyboard", "Canva-like slide",
    "generic courtroom", "gavel", "golden scales", "generic lawyer in suit",
    "floating logo", "watermark", "text", "letters", "pseudo-text", "tiny typography",
    "multiple unrelated scenes", ...recent,
  ].join(", ");
}
