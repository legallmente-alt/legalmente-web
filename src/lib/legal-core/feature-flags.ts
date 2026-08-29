import type { FeatureFlagName } from "./types";

const ENV_MAP: Record<FeatureFlagName, string> = {
  before_signing_internal: "LEGALMENTE_BEFORE_SIGNING_INTERNAL",
  vacaciones_mx_internal: "LEGALMENTE_VACACIONES_MX_INTERNAL",
  aguinaldo_mx_internal: "LEGALMENTE_AGUINALDO_MX_INTERNAL",
  finiquito_devengados_mx_internal: "LEGALMENTE_FINIQUITO_DEVENGADOS_MX_INTERNAL",
};

export function isFeatureEnabled(flag: FeatureFlagName): boolean {
  return process.env[ENV_MAP[flag]] === "1";
}

export function internalLegalCoreEnabled(): boolean {
  return Object.keys(ENV_MAP).every((flag) => isFeatureEnabled(flag as FeatureFlagName));
}
