import type { SmgZone, VersionedLegalParameter } from "./types";

export const SMG_PARAMETERS: readonly VersionedLegalParameter[] = [
  {
    parameterId: "PARAM-MX-SMG-2026-ZSMG",
    territory: "MX",
    zone: "ZSMG",
    value: 315.04,
    currency: "MXN",
    effectiveFrom: "2026-01-01",
    effectiveTo: "2026-12-31",
    source: "CONASAMI / Diario Oficial de la Federación",
    sourceDate: "2025-12-19",
    version: "2026.1.0",
    lastVerified: "2026-08-28",
  },
  {
    parameterId: "PARAM-MX-SMG-2026-ZLFN",
    territory: "MX",
    zone: "ZLFN",
    value: 440.87,
    currency: "MXN",
    effectiveFrom: "2026-01-01",
    effectiveTo: "2026-12-31",
    source: "CONASAMI / Diario Oficial de la Federación",
    sourceDate: "2025-12-19",
    version: "2026.1.0",
    lastVerified: "2026-08-28",
  },
] as const;

function isDateInRange(date: string, from: string, to: string | null) {
  return date >= from && (to === null || date <= to);
}

export function getActiveSmgParameter(zone: SmgZone | undefined, calculationDate: string) {
  if (!zone) {
    return { state: "REQUIRE_INPUT" as const, parameter: null };
  }

  const parameter = SMG_PARAMETERS.find(
    (candidate) =>
      candidate.zone === zone &&
      isDateInRange(calculationDate, candidate.effectiveFrom, candidate.effectiveTo),
  );

  if (!parameter) {
    return { state: "REVIEW_REQUIRED" as const, parameter: null };
  }

  return { state: "PASS" as const, parameter };
}
