export type ToolState =
  | "PASS"
  | "REQUIRE_INPUT"
  | "REVIEW_REQUIRED"
  | "HOLD"
  | "OUT_OF_SCOPE";

export type Territory = "MX";
export type SmgZone = "ZSMG" | "ZLFN";

export type LegalSource = {
  id: string;
  title: string;
  authority: string;
  territory: Territory;
  effectiveDate?: string;
  url?: string;
};

export type Provenance = {
  territory: Territory;
  ruleVersion: string;
  calculationVersion: string;
  effectiveDate: string;
  sourceIds: string[];
  parameterVersions?: string[];
};

export type ToolResult<T> = {
  state: ToolState;
  data?: T;
  warnings: string[];
  requiredInputs?: string[];
  reviewReasons?: string[];
  provenance: Provenance;
};

export type VersionedLegalParameter = {
  parameterId: string;
  territory: Territory;
  zone: SmgZone;
  value: number;
  currency: "MXN";
  effectiveFrom: string;
  effectiveTo: string | null;
  source: string;
  sourceDate: string;
  version: string;
  lastVerified: string;
};

export type WorkMode =
  | "JORNADA_COMPLETA_ORDINARIA"
  | "JORNADA_REDUCIDA"
  | "POR_HORAS"
  | "SEMANA_REDUCIDA"
  | "UNSPECIFIED";

export type FeatureFlagName =
  | "before_signing_internal"
  | "vacaciones_mx_internal"
  | "aguinaldo_mx_internal"
  | "finiquito_devengados_mx_internal";
