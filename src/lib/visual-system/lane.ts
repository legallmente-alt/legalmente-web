export type Lane = "A" | "B";

export const LANE_CONTRACT_VERSION = "1.0" as const;

const ABSTRACT_CONTENT_TYPES = new Set([
  "frase",
  "máxima",
  "maxima",
  "concepto_abstracto",
  "principio",
]);

export type LaneContract = {
  lane: Lane;
  lane_contract_version: typeof LANE_CONTRACT_VERSION;
  lane_eligibility_reason: string;
  lane_fallback_applied: boolean;
};

/**
 * Consumer-side adapter. It accepts Psyche's explicit lane but never infers
 * Carril A from tone, subject matter, or a visual prompt. Uncertainty falls
 * back to B, keeping the web consumer deterministic and safe.
 */
export function resolveLane(
  contentType: string | undefined,
  explicitLane: unknown,
): LaneContract {
  if (explicitLane === "A" || explicitLane === "B") {
    return {
      lane: explicitLane,
      lane_contract_version: LANE_CONTRACT_VERSION,
      lane_eligibility_reason: "selección explícita válida",
      lane_fallback_applied: false,
    };
  }

  if (explicitLane !== undefined) {
    return {
      lane: "B",
      lane_contract_version: LANE_CONTRACT_VERSION,
      lane_eligibility_reason: "fallback seguro a Carril B por incertidumbre",
      lane_fallback_applied: true,
    };
  }

  const normalized = contentType?.trim().toLocaleLowerCase("es-MX");
  if (normalized && ABSTRACT_CONTENT_TYPES.has(normalized)) {
    return {
      lane: "A",
      lane_contract_version: LANE_CONTRACT_VERSION,
      lane_eligibility_reason: "tipo abstracto inequívoco",
      lane_fallback_applied: false,
    };
  }

  return {
    lane: "B",
    lane_contract_version: LANE_CONTRACT_VERSION,
    lane_eligibility_reason: "fallback seguro a Carril B por incertidumbre",
    lane_fallback_applied: explicitLane !== undefined,
  };
}
