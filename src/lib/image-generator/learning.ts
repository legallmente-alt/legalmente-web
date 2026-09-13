import type { ImageGenerationBrief } from "./types";

export type FounderSelection = { contentId: string; selected: boolean };
export type SelectionMetric = { key: string; generated: number; selected: number; rate: number; lowSample: boolean };

function summarize(keys: readonly string[], signals: readonly FounderSelection[]): SelectionMetric[] {
  const ids = new Map(signals.map((s) => [s.contentId, s.selected]));
  const groups = new Map<string, { generated: number; selected: number }>();
  keys.forEach((key, i) => {
    const id = signals[i]?.contentId;
    if (!id || !ids.has(id)) return;
    const row = groups.get(key) ?? { generated: 0, selected: 0 };
    row.generated += 1;
    if (ids.get(id)) row.selected += 1;
    groups.set(key, row);
  });
  return [...groups].map(([key, row]) => ({ key, ...row, rate: row.generated ? row.selected / row.generated : 0, lowSample: row.generated < 5 }));
}

export function founderSelectionMetrics(briefs: readonly ImageGenerationBrief[], signals: readonly FounderSelection[]) {
  const byId = new Map(signals.map((s) => [s.contentId, s.selected]));
  const eligible = briefs.filter((b) => byId.has(b.contentId));
  const selected = eligible.filter((b) => byId.get(b.contentId)).length;
  const aligned = eligible.map((b) => ({ contentId: b.contentId, selected: Boolean(byId.get(b.contentId)) }));
  return {
    overall: { generated: eligible.length, selected, rate: eligible.length ? selected / eligible.length : 0, lowSample: eligible.length < 10 },
    byMatter: summarize(eligible.map((b) => b.matter), aligned),
    byEditorialFamily: summarize(eligible.map((b) => b.editorialFamily), aligned),
    byEmotion: summarize(eligible.map((b) => b.emotion), aligned),
    byArtDirection: summarize(eligible.map((b) => b.artDirection), aligned),
    byNeed: summarize(eligible.map((b) => b.need), aligned),
    warnings: ["Founder selection is a learning signal, not legal approval or publication authorization.", "Preserve exploration; do not collapse generation around small samples."],
  };
}
