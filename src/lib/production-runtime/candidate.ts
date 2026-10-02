import type { TopicCandidate } from "../intelligence-front";
import type { ProductionPiece } from "../production-policy";
import type { VisualArgumentPlan } from "../visual-argument";
import type { VisualProductionUnit } from "../visual-factory";
import { exactCopy, formatContract } from "./contract";

/** Open-world topics enter through the existing intelligence front, not a fixed prompt bank. */
export function bindTopicCandidate(candidate: TopicCandidate, piece: ProductionPiece, unit: VisualProductionUnit, argument: VisualArgumentPlan): VisualProductionUnit {
  if (candidate.id !== piece.id || candidate.id !== unit.CONTENT_ID || candidate.id !== argument.contentId) throw new Error("CANDIDATE_ID_MISMATCH");
  if (candidate.sourceReadiness !== "READY" || candidate.legalReadiness !== "CANONICAL_BOUND_PENDING" || candidate.editorialStatus !== "READY_FOR_CANONICAL_REVIEW") throw new Error("CANDIDATE_RESEARCH_INCOMPLETE");
  if (!["APROBADO", "APTO_PARA_NARRATIVA"].includes(unit.LEGAL_STATE) || !unit.CLAIM_REFS.includes(argument.legalBindingId)) throw new Error("CANONICAL_LEGAL_BINDING_REQUIRED");
  if (candidate.questionResolved !== piece.centralIdea || candidate.angle !== piece.angle || candidate.questionResolved !== argument.learningGoal || piece.topic !== argument.causalScene.concept || piece.legalRelation !== argument.causalScene.legalRelation || piece.scenario !== argument.causalScene.scene || candidate.question !== argument.realQuestion || candidate.consequence !== argument.consequence) throw new Error("CANDIDATE_MEANING_DRIFT");
  if (candidate.editorialFamily !== piece.entryDoor) throw new Error("EDITORIAL_FAMILY_DRIFT");
  const spec = formatContract(piece.format);
  return { ...unit, COPY_EXACT: exactCopy(piece), WIDTH: spec.width, HEIGHT: spec.height, SAFE_AREA: JSON.stringify(spec.safe) };
}
