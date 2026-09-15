import type { EditorialCandidate } from "./index";

export const EDITORIAL_CHANNELS = [
  "instagram",
  "linkedin-legalmente",
  "linkedin-founder",
  "website",
] as const;

export type EditorialChannel = (typeof EDITORIAL_CHANNELS)[number];

export type ChannelStyleProfile = {
  channel: EditorialChannel;
  preferredFormats: readonly string[];
  visualGrammars: readonly string[];
  hookStyle: string;
  visualDirection: readonly string[];
  qualityGates: readonly string[];
};

export const CHANNEL_STYLE_PROFILES: Readonly<Record<EditorialChannel, ChannelStyleProfile>> = {
  instagram: {
    channel: "instagram",
    preferredFormats: ["REEL", "CAROUSEL", "STORY"],
    visualGrammars: ["CINEMATIC_PHOTOGRAPHY", "EDITORIAL_STILL_LIFE", "CONCEPTUAL_SYMBOLISM"],
    hookStyle: "A question or tension in the first visual beat; one idea per frame.",
    visualDirection: [
      "Low-key cinematic light with charcoal/black ground and ivory or restrained gold type.",
      "One focal legal object or gesture; protect negative space and a readable cover at thumbnail size.",
      "Use close-up, diagonal or controlled blur to create curiosity without decorative clutter.",
    ],
    qualityGates: ["9:16-safe composition", "captions reviewed", "source/territory/date in caption or final card", "alt text"],
  },
  "linkedin-legalmente": {
    channel: "linkedin-legalmente",
    preferredFormats: ["CAROUSEL", "REEL", "SINGLE_IMAGE"],
    visualGrammars: ["ARCHITECTURAL_MINIMALISM", "EDITORIAL_STILL_LIFE", "HISTORICAL_DOCUMENTARY"],
    hookStyle: "A professional problem framed as a distinction, consequence or decision question.",
    visualDirection: [
      "Keep the Instagram tension but add institutional breathing room, source hierarchy and a clearer reading path.",
      "Rotate graphite-platinum, blue-gold editorial serenity and graphite-emerald archive treatments; never collapse to one default style.",
      "Prefer structured composition over generic corporate gradients or dashboard cards.",
    ],
    qualityGates: ["4:5 preferred feed frame", "source and territory visible", "one professional takeaway", "no individual legal conclusion"],
  },
  "linkedin-founder": {
    channel: "linkedin-founder",
    preferredFormats: ["SINGLE_IMAGE", "CAROUSEL", "REEL"],
    visualGrammars: ["EDITORIAL_STILL_LIFE", "HISTORICAL_DOCUMENTARY", "CONCEPTUAL_SYMBOLISM"],
    hookStyle: "A founder-level observation grounded in a source, product decision or editorial principle.",
    visualDirection: [
      "Use warmer copper, parchment or private-study variants only when the idea calls for authorship or reflection.",
      "Keep the physical LegalMente mark clean; the channel name must never appear as visible branding.",
      "Make the point legible without relying on personality alone: source, decision and implication must separate.",
    ],
    qualityGates: ["4:5 or 1:1 cover", "authorship distinguished from legal authority", "source/claim status visible", "no confidential case details"],
  },
  website: {
    channel: "website",
    preferredFormats: ["HERO", "EDITORIAL_CARD", "PROCESS_DIAGRAM"],
    visualGrammars: ["ARCHITECTURAL_MINIMALISM", "EDITORIAL_STILL_LIFE", "CONCEPTUAL_SYMBOLISM"],
    hookStyle: "A clear entry question followed by the route, territory and next useful step.",
    visualDirection: [
      "Preserve the editorial instrument language: depth, threshold, paper, source and relational movement.",
      "Keep focal objects intact across desktop and 360/390/430 mobile crops.",
      "Complexity belongs in the graph, not in the first visual frame.",
    ],
    qualityGates: ["responsive crop manifest", "visible source/territory where relevant", "accessibility", "internal assets excluded from public build"],
  },
};

export function getChannelStyleProfile(channel: EditorialChannel): ChannelStyleProfile {
  return CHANNEL_STYLE_PROFILES[channel];
}

export function scoreChannelFit(candidate: EditorialCandidate, channel: EditorialChannel): number {
  const profile = getChannelStyleProfile(channel);
  const formatFit = profile.preferredFormats.some((format) => format.toLowerCase().includes(candidate.format.toLowerCase())) ? 1 : 0;
  const grammarFit = profile.visualGrammars.includes(candidate.visualGrammar) ? 1 : 0;
  const base = candidate.visualPotential * 0.35 + candidate.practicalUtility * 0.25 + candidate.humanRelevance * 0.20 + candidate.narrativePotential * 0.20;
  return base + formatFit * 0.8 + grammarFit * 0.8;
}
