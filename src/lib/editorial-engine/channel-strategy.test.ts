import assert from "node:assert/strict";
import test from "node:test";
import { getChannelStyleProfile, scoreChannelFit } from "./channel-strategy";
import type { EditorialCandidate } from "./index";

const candidate: EditorialCandidate = {
  id: "LM-CHANNEL-01",
  topic: "Interpretación y contexto",
  angle: "Una regla cambia cuando cambia el contexto de aplicación",
  legalRelation: "interpretación fuente territorio",
  audience: "público general",
  depth: "FOUNDATIONS",
  format: "REFLECTION",
  visualGrammar: "CINEMATIC_PHOTOGRAPHY",
  visualMetaphor: "un libro abierto en penumbra",
  legalValue: 9,
  practicalUtility: 8,
  humanRelevance: 9,
  narrativePotential: 9,
  visualPotential: 10,
};

test("channel profiles keep Instagram and LinkedIn visually distinct", () => {
  const instagram = getChannelStyleProfile("instagram");
  const linkedin = getChannelStyleProfile("linkedin-legalmente");
  assert.notDeepEqual(instagram.visualGrammars, linkedin.visualGrammars);
  assert.match(instagram.visualDirection.join(" "), /Low-key cinematic/i);
  assert.match(linkedin.visualDirection.join(" "), /institutional/i);
});

test("channel fit rewards a matching visual grammar", () => {
  const instagramScore = scoreChannelFit(candidate, "instagram");
  const linkedinScore = scoreChannelFit({ ...candidate, visualGrammar: "ARCHITECTURAL_MINIMALISM" }, "linkedin-legalmente");
  assert.ok(instagramScore > 0);
  assert.ok(linkedinScore > 0);
});
