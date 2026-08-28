import { getActiveSmgParameter } from "./parameters";
import { completedServiceYears, inclusiveCalendarDays, isLeapYear, lastAnniversaryIso, roundDays, roundMoney } from "./math";
import type { SmgZone, ToolResult, WorkMode } from "./types";

const VACATION_TABLE: readonly [number, number, number][] = [
  [1, 1, 12], [2, 2, 14], [3, 3, 16], [4, 4, 18], [5, 5, 20],
  [6, 10, 22], [11, 15, 24], [16, 20, 26], [21, 25, 28], [26, 30, 30], [31, 35, 32],
];

function vacationEntitlement(serviceYear: number): number | null {
  const row = VACATION_TABLE.find(([min, max]) => serviceYear >= min && serviceYear <= max);
  return row?.[2] ?? null;
}

const baseProvenance = (ruleVersion: string, sourceIds: string[]) => ({
  territory: "MX" as const,
  ruleVersion,
  calculationVersion: "1.0.0",
  effectiveDate: "2026-08-28",
  sourceIds,
});

export type VacationInput = {
  startDate: string;
  calculationDate: string;
  dailySalary: number;
  daysTakenCurrentPeriod?: number;
  vacationPremiumPct?: number;
  includeHistoricalPre2023Claim?: boolean;
};

export function calculateVacationMx(input: VacationInput): ToolResult<{
  completedYears: number;
  annualEntitlement: number;
  proportionalVacationDays: number;
  pendingVacationDays: number;
  vacationAmount: number;
  vacationPremiumAmount: number;
}> {
  const provenance = baseProvenance("1.0.0-frozen+control-patch", ["LFT-76", "LFT-78", "LFT-80", "DOF-2022-12-27"]);
  if (!(input.dailySalary > 0)) return { state: "REQUIRE_INPUT", warnings: [], requiredInputs: ["dailySalary"], provenance };
  const premium = input.vacationPremiumPct ?? 25;
  if (premium < 25) return { state: "REQUIRE_INPUT", warnings: ["La prima vacacional capturada es inferior al mínimo configurado del producto."], requiredInputs: ["vacationPremiumPct>=25"], provenance };
  if (input.includeHistoricalPre2023Claim) return { state: "REVIEW_REQUIRED", warnings: [], reviewReasons: ["Adeudos históricos anteriores a 2023 requieren tabla histórica y revisión de prescripción."], provenance };

  const years = completedServiceYears(input.startDate, input.calculationDate);
  const anniversary = lastAnniversaryIso(input.startDate, input.calculationDate);
  if (years === null || anniversary === null) return { state: "REQUIRE_INPUT", warnings: [], requiredInputs: ["valid startDate/calculationDate"], provenance };

  const annual = vacationEntitlement(years + 1);
  if (annual === null) return { state: "REVIEW_REQUIRED", warnings: [], reviewReasons: ["Antigüedad fuera del tabulador congelado V1."], provenance };
  const elapsed = inclusiveCalendarDays(anniversary, input.calculationDate);
  if (elapsed === null) return { state: "REQUIRE_INPUT", warnings: [], requiredInputs: ["valid dates"], provenance };
  const proportional = (Math.max(0, elapsed - 1) / 365) * annual;
  const pending = Math.max(0, proportional - (input.daysTakenCurrentPeriod ?? 0));
  const amount = pending * input.dailySalary;
  return {
    state: "PASS",
    warnings: [],
    data: {
      completedYears: years,
      annualEntitlement: annual,
      proportionalVacationDays: roundDays(proportional),
      pendingVacationDays: roundDays(pending),
      vacationAmount: roundMoney(amount),
      vacationPremiumAmount: roundMoney(amount * (premium / 100)),
    },
    provenance,
  };
}

export type AbsenceCategory = "MATERNIDAD" | "RIESGO_TRABAJO" | "PERMISO_CON_GOCE" | "DESCANSO_OBLIGATORIO" | "FALTA_INJUSTIFICADA_ACREDITADA" | "PERMISO_SIN_GOCE" | "SUSPENSION_DISCIPLINARIA_FIRME" | "ENFERMEDAD_GENERAL" | "GENERICA";
export type AguinaldoInput = { startDateInYear: string; endDateInYear: string; dailySalary: number; contractualDays?: number; absences?: Array<{ category: AbsenceCategory; days: number }> };

export function calculateAguinaldoMx(input: AguinaldoInput): ToolResult<{ effectiveWorkedDays: number; proportionalAguinaldoDays: number; grossAmount: number }> {
  const provenance = baseProvenance("1.0.0-frozen+control-patch", ["LFT-87", "LFT-42", "LFT-170", "LFT-491"]);
  const start = new Date(`${input.startDateInYear}T00:00:00Z`);
  const end = new Date(`${input.endDateInYear}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start || start.getUTCFullYear() !== end.getUTCFullYear()) return { state: "REQUIRE_INPUT", warnings: [], requiredInputs: ["same-year valid dates"], provenance };
  if (!(input.dailySalary > 0)) return { state: "REQUIRE_INPUT", warnings: [], requiredInputs: ["dailySalary"], provenance };
  const contractual = input.contractualDays ?? 15;
  if (contractual < 15) return { state: "REQUIRE_INPUT", warnings: ["Los días contractuales capturados son inferiores al mínimo configurado."], requiredInputs: ["contractualDays>=15"], provenance };
  const absences = input.absences ?? [];
  if (absences.some((a) => a.category === "GENERICA" && a.days > 0)) return { state: "REVIEW_REQUIRED", warnings: [], reviewReasons: ["Las ausencias genéricas deben clasificarse antes de descontarse."], provenance };
  const deductible = new Set<AbsenceCategory>(["FALTA_INJUSTIFICADA_ACREDITADA", "PERMISO_SIN_GOCE", "SUSPENSION_DISCIPLINARIA_FIRME", "ENFERMEDAD_GENERAL"]);
  const nonComputableDays = absences.filter((a) => deductible.has(a.category)).reduce((sum, a) => sum + Math.max(0, a.days), 0);
  const calendarDays = inclusiveCalendarDays(input.startDateInYear, input.endDateInYear)!;
  const effective = Math.max(0, calendarDays - nonComputableDays);
  const yearDays = isLeapYear(start.getUTCFullYear()) ? 366 : 365;
  const proportionalDays = (effective / yearDays) * contractual;
  return { state: "PASS", warnings: [], data: { effectiveWorkedDays: effective, proportionalAguinaldoDays: roundDays(proportionalDays), grossAmount: roundMoney(proportionalDays * input.dailySalary) }, provenance };
}

export type FiniquitoInput = {
  startDate: string; terminationDate: string; dailySalary: number; unpaidSalaryDays?: number;
  vacationPremiumPct?: number; contractualAguinaldoDays?: number; vacationDaysAlreadyEnjoyed?: number;
  verifiedNonComputableAguinaldoDays?: number; geographicZone?: SmgZone; workMode?: WorkMode;
  requestedComponents?: string[];
};

const OUT_OF_SCOPE = new Set(["SALARIOS_CAIDOS", "INTERESES_PROCESALES", "ISR_NETO", "IMSS_NETO", "PRESTACIONES_EXTRALEGALES"]);
const HOLD = new Set(["INDEMNIZACION_90_DIAS", "PRIMA_ANTIGUEDAD", "20_DIAS_POR_ANO"]);

export function calculateFiniquitoDevengadosMx(input: FiniquitoInput): ToolResult<{ pendingWages: number; proportionalAguinaldo: number; proportionalVacation: number; vacationPremium: number; total: number }> {
  const provenance = baseProvenance("1.0.0-frozen+control-patch+smg-v1", ["LFT-76", "LFT-79", "LFT-80", "LFT-82", "LFT-87"]);
  const requested = input.requestedComponents ?? [];
  if (requested.some((x) => OUT_OF_SCOPE.has(x))) return { state: "OUT_OF_SCOPE", warnings: [], reviewReasons: ["La solicitud incluye componentes fuera del alcance de Finiquito Devengados V1."], provenance };
  if (requested.some((x) => HOLD.has(x))) return { state: "HOLD", warnings: [], reviewReasons: ["La solicitud incluye componentes indemnizatorios o condicionados que no se automatizan en V1."], provenance };
  if (!(input.dailySalary > 0)) return { state: "REQUIRE_INPUT", warnings: [], requiredInputs: ["dailySalary"], provenance };

  const zoneCheck = getActiveSmgParameter(input.geographicZone, input.terminationDate);
  if (zoneCheck.state === "REQUIRE_INPUT") return { state: "REQUIRE_INPUT", warnings: [], requiredInputs: ["geographicZone"], provenance };
  if (zoneCheck.state === "REVIEW_REQUIRED" || !zoneCheck.parameter) return { state: "REVIEW_REQUIRED", warnings: [], reviewReasons: ["No existe un parámetro SMG versionado activo para la zona/fecha indicada."], provenance };
  provenance.parameterVersions = [zoneCheck.parameter.version];
  if (input.dailySalary < zoneCheck.parameter.value) {
    const mode = input.workMode ?? "UNSPECIFIED";
    if (mode === "UNSPECIFIED") return { state: "REQUIRE_INPUT", warnings: ["El salario capturado es inferior al SMG aplicable; indique modalidad de jornada."], requiredInputs: ["workMode"], provenance };
    if (mode === "JORNADA_COMPLETA_ORDINARIA") return { state: "REVIEW_REQUIRED", warnings: ["El salario diario capturado es inferior al salario mínimo aplicable para la zona y fecha seleccionadas."], reviewReasons: ["Verificar modalidad de jornada y dato salarial."], provenance };
  }

  const agu = calculateAguinaldoMx({ startDateInYear: `${new Date(`${input.terminationDate}T00:00:00Z`).getUTCFullYear()}-01-01`, endDateInYear: input.terminationDate, dailySalary: input.dailySalary, contractualDays: input.contractualAguinaldoDays ?? 15, absences: input.verifiedNonComputableAguinaldoDays ? [{ category: "FALTA_INJUSTIFICADA_ACREDITADA", days: input.verifiedNonComputableAguinaldoDays }] : [] });
  if (agu.state !== "PASS" || !agu.data) return { ...agu, provenance };
  const vac = calculateVacationMx({ startDate: input.startDate, calculationDate: input.terminationDate, dailySalary: input.dailySalary, daysTakenCurrentPeriod: input.vacationDaysAlreadyEnjoyed ?? 0, vacationPremiumPct: input.vacationPremiumPct ?? 25 });
  if (vac.state !== "PASS" || !vac.data) return { ...vac, provenance };
  const wages = roundMoney((input.unpaidSalaryDays ?? 0) * input.dailySalary);
  const total = roundMoney(wages + agu.data.grossAmount + vac.data.vacationAmount + vac.data.vacationPremiumAmount);
  return { state: "PASS", warnings: [], data: { pendingWages: wages, proportionalAguinaldo: agu.data.grossAmount, proportionalVacation: vac.data.vacationAmount, vacationPremium: vac.data.vacationPremiumAmount, total }, provenance };
}
