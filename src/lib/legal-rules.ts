export const LEGAL_DATA_VERSION = "2026-08-28 / Gemini freeze v1";

export const vacationEntitlement = (completedYears: number) => {
  if (completedYears < 1) return 12;
  if (completedYears <= 5) return 10 + completedYears * 2;
  return 22 + Math.floor((completedYears - 6) / 5) * 2;
};

export const roundMoney = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export const daysBetweenInclusive = (start: string, end: string) => {
  const a = new Date(`${start}T00:00:00Z`);
  const b = new Date(`${end}T00:00:00Z`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime()) || b < a) return null;
  return Math.floor((b.getTime() - a.getTime()) / 86400000) + 1;
};

export const daysInYear = (year: number) =>
  new Date(Date.UTC(year, 1, 29)).getUTCMonth() === 1 ? 366 : 365;

export function completedServiceYears(start: string, end: string) {
  const a = new Date(`${start}T00:00:00Z`);
  const b = new Date(`${end}T00:00:00Z`);
  let years = b.getUTCFullYear() - a.getUTCFullYear();
  const anniversary = new Date(Date.UTC(b.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()));
  if (b < anniversary) years -= 1;
  return Math.max(0, years);
}

export function lastAnniversary(start: string, end: string) {
  const a = new Date(`${start}T00:00:00Z`);
  const b = new Date(`${end}T00:00:00Z`);
  const years = completedServiceYears(start, end);
  return new Date(Date.UTC(a.getUTCFullYear() + years, a.getUTCMonth(), a.getUTCDate()));
}

export function calculateVacation(input: {
  startDate: string;
  calculationDate: string;
  dailySalary: number;
  daysTaken: number;
  premiumPct: number;
}) {
  const start = new Date(`${input.startDate}T00:00:00Z`);
  const end = new Date(`${input.calculationDate}T00:00:00Z`);
  if (end < start) throw new Error("La fecha de cálculo no puede ser anterior al ingreso.");
  if (input.dailySalary <= 0) throw new Error("El salario diario debe ser mayor que cero.");
  if (input.premiumPct < 25) throw new Error("La prima vacacional no puede ser menor a 25% en este motor.");
  if (start < new Date("2023-01-01T00:00:00Z")) {
    throw new Error("REVIEW_REQUIRED: ingreso anterior a 2023; este motor interno no resuelve transición histórica.");
  }
  const completedYears = completedServiceYears(input.startDate, input.calculationDate);
  const entitlement = vacationEntitlement(completedYears + 1);
  const anniversary = lastAnniversary(input.startDate, input.calculationDate);
  const elapsed = Math.max(0, Math.floor((end.getTime() - anniversary.getTime()) / 86400000));
  const proportionalDays = (elapsed / 365) * entitlement;
  const pendingDays = Math.max(0, proportionalDays - input.daysTaken);
  const vacationAmount = roundMoney(pendingDays * input.dailySalary);
  const premiumAmount = roundMoney(vacationAmount * (input.premiumPct / 100));
  return { completedYears, entitlement, proportionalDays, pendingDays, vacationAmount, premiumAmount };
}

export function calculateAguinaldo(input: {
  startDate: string;
  endDate: string;
  dailySalary: number;
  contractualDays: number;
  unexcusedAbsences: number;
}) {
  const start = new Date(`${input.startDate}T00:00:00Z`);
  const end = new Date(`${input.endDate}T00:00:00Z`);
  if (end < start) throw new Error("La fecha final no puede ser anterior a la inicial.");
  if (start.getUTCFullYear() !== end.getUTCFullYear()) throw new Error("STOP: calcula cada año calendario por separado.");
  if (input.dailySalary <= 0) throw new Error("El salario diario debe ser mayor que cero.");
  if (input.contractualDays < 15) throw new Error("El motor no acepta menos de 15 días de aguinaldo.");
  const calendarDays = daysBetweenInclusive(input.startDate, input.endDate) ?? 0;
  const effectiveDays = Math.max(0, calendarDays - Math.max(0, input.unexcusedAbsences));
  const baseDays = daysInYear(start.getUTCFullYear());
  const proportionalDays = (effectiveDays / baseDays) * input.contractualDays;
  const total = roundMoney(proportionalDays * input.dailySalary);
  return { calendarDays, effectiveDays, baseDays, proportionalDays, total };
}

export function calculateFiniquitoDevengado(input: {
  startDate: string;
  terminationDate: string;
  dailySalary: number;
  unpaidSalaryDays: number;
  vacationPremiumPct: number;
  contractualAguinaldoDays: number;
  unexcusedAbsences: number;
  vacationDaysAlreadyEnjoyed: number;
}) {
  const end = new Date(`${input.terminationDate}T00:00:00Z`);
  const yearStart = `${end.getUTCFullYear()}-01-01`;
  const employmentYearStart = input.startDate > yearStart ? input.startDate : yearStart;
  const aguinaldo = calculateAguinaldo({
    startDate: employmentYearStart,
    endDate: input.terminationDate,
    dailySalary: input.dailySalary,
    contractualDays: input.contractualAguinaldoDays,
    unexcusedAbsences: input.unexcusedAbsences,
  });
  const vacation = calculateVacation({
    startDate: input.startDate,
    calculationDate: input.terminationDate,
    dailySalary: input.dailySalary,
    daysTaken: input.vacationDaysAlreadyEnjoyed,
    premiumPct: input.vacationPremiumPct,
  });
  const pendingWages = roundMoney(Math.max(0, input.unpaidSalaryDays) * input.dailySalary);
  const total = roundMoney(pendingWages + aguinaldo.total + vacation.vacationAmount + vacation.premiumAmount);
  return { pendingWages, aguinaldo: aguinaldo.total, vacations: vacation.vacationAmount, vacationPremium: vacation.premiumAmount, total };
}
