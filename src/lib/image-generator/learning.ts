import type { CurationState } from "@/lib/production-policy";
import type { ImageGenerationBrief } from "./types";

export type FounderSelection = { contentId: string; state: CurationState };
export type SelectionMetric = { key: string; generated: number; selected: number; rate: number; lowSample: boolean };

type Decision = { contentId: string; selected: boolean };
const selectedState = (state: CurationState): boolean => state === "PRESELECTED" || state === "APPROVED" || state === "PUBLISHED";
const decidedState = (state: CurationState): boolean => selectedState(state) || state === "DISCARDED";

function summarize(keys: readonly string[], decisions: readonly Decision[]): SelectionMetric[] {
  const groups = new Map<string, { generated: number; selected: number }>();
  keys.forEach((key, i) => {
    const decision = decisions[i];
    if (!decision) return;
    const row = groups.get(key) ?? { generated: 0, selected: 0 };
    row.generated += 1;
    if (decision.selected) row.selected += 1;
    groups.set(key, row);
  });
  return [...groups].map(([key, row]) => ({ key, ...row, rate: row.generated ? row.selected / row.generated : 0, lowSample: row.generated < 5 }));
}

export function founderSelectionMetrics(briefs: readonly ImageGenerationBrief[], signals: readonly FounderSelection[]) {
  const byId = new Map(signals.filter((s) => decidedState(s.state)).map((s) => [s.contentId, selectedState(s.state)]));
  const eligible = briefs.filter((b) => byId.has(b.contentId));
  const decisions = eligible.map((b) => ({ contentId: b.contentId, selected: Boolean(byId.get(b.contentId)) }));
  const selected = decisions.filter((d) => d.selected).length;
  return {
    overall: { generated: eligible.length, selected, rate: eligible.length ? selected / eligible.length : 0, lowSample: eligible.length < 10 },
    byMatter: summarize(eligible.map((b) => b.matter), decisions),
    byEditorialFamily: summarize(eligible.map((b) => b.editorialFamily), decisions),
    byEmotion: summarize(eligible.map((b) => b.emotion), decisions),
    byArtDirection: summarize(eligible.map((b) => b.artDirection), decisions),
    byNeed: summarize(eligible.map((b) => b.need), decisions),
    warnings: ["Founder selection is a learning signal, not legal approval or publication authorization.", "Preserve exploration; do not collapse generation around small samples."],
  };
}
