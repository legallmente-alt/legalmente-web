import type { ImageGenerationBrief } from "./types";

export function compileBaseArtPrompt(b: ImageGenerationBrief): string {
  return [
    "One coherent editorial scene only; no collage, grid, storyboard or slide layout.",
    `Matter: ${b.matter}. Editorial function: ${b.editorialFamily}. Need: ${b.need}.`,
    `Core concept: ${b.coreConcept}. Question: ${b.resolvedQuestion}.`,
    `Tension: ${b.tension}. Consequence: ${b.consequence}. Emotion: ${b.emotion}.`,
    `Visual function: ${b.argument.visualFunction}. Scene strategy: ${b.argument.sceneStrategy}.`,
    `Image argument: ${b.argument.imageArgument}. Visual logic: ${b.argument.dominantVisualLogic}.`,
    `Composition: ${b.composition}. Camera: ${b.camera}. Material: ${b.material}. Light: ${b.lighting}. Human presence: ${b.humanPresence}.`,
    `Apply art direction only after meaning and emotion: ${b.artDirection}.`,
    `Physical brand surface: ${b.brandSurface}; keep it blank, clean and perspective-correct for later canonical wordmark composition.`,
    `Aspect ${b.format}; preserve mobile-safe negative space around the key object or action.`,
    "No letters, words, captions, logos, legal text, signatures, UI or pseudo-text in base art; exact copy and the LegalMente wordmark are composed later.",
  ].join(" ");
}
