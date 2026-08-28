export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function roundDays(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function parseIsoDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function inclusiveCalendarDays(start: string, end: string): number | null {
  const a = parseIsoDate(start);
  const b = parseIsoDate(end);
  if (!a || !b || b < a) return null;
  return Math.floor((b.getTime() - a.getTime()) / 86_400_000) + 1;
}

export function completedServiceYears(start: string, end: string): number | null {
  const a = parseIsoDate(start);
  const b = parseIsoDate(end);
  if (!a || !b || b < a) return null;
  let years = b.getUTCFullYear() - a.getUTCFullYear();
  const anniversary = new Date(Date.UTC(b.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()));
  if (b < anniversary) years -= 1;
  return Math.max(0, years);
}

export function lastAnniversaryIso(start: string, end: string): string | null {
  const a = parseIsoDate(start);
  const b = parseIsoDate(end);
  const years = completedServiceYears(start, end);
  if (!a || !b || years === null) return null;
  const anniversary = new Date(Date.UTC(a.getUTCFullYear() + years, a.getUTCMonth(), a.getUTCDate()));
  return anniversary.toISOString().slice(0, 10);
}

export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
