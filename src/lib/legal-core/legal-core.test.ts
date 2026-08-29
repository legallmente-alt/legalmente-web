import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateAguinaldoMx,
  calculateFiniquitoDevengadosMx,
  calculateVacationMx,
  evaluateBeforeSigning,
  getActiveSmgParameter,
} from "./index";

test("SMG 2026 resolves ZSMG and ZLFN with versioned values", () => {
  const zsmg = getActiveSmgParameter("ZSMG", "2026-08-28");
  const zlfn = getActiveSmgParameter("ZLFN", "2026-08-28");
  assert.equal(zsmg.state, "PASS");
  assert.equal(zsmg.parameter?.value, 315.04);
  assert.equal(zlfn.state, "PASS");
  assert.equal(zlfn.parameter?.value, 440.87);
});

test("SMG fails closed when zone is missing or date has no registered version", () => {
  assert.equal(getActiveSmgParameter(undefined, "2026-08-28").state, "REQUIRE_INPUT");
  assert.equal(getActiveSmgParameter("ZSMG", "2027-01-01").state, "REVIEW_REQUIRED");
});

test("vacation calculator allows current calculation for pre-2023 start", () => {
  const result = calculateVacationMx({
    startDate: "2020-06-01",
    calculationDate: "2026-08-28",
    dailySalary: 500,
  });
  assert.equal(result.state, "PASS");
  assert.ok(result.data);
});

test("historical pre-2023 vacation debt requires review", () => {
  const result = calculateVacationMx({
    startDate: "2020-06-01",
    calculationDate: "2026-08-28",
    dailySalary: 500,
    includeHistoricalPre2023Claim: true,
  });
  assert.equal(result.state, "REVIEW_REQUIRED");
});

test("maternity absence is not automatically deducted from aguinaldo", () => {
  const base = calculateAguinaldoMx({
    startDateInYear: "2026-01-01",
    endDateInYear: "2026-12-31",
    dailySalary: 500,
  });
  const maternity = calculateAguinaldoMx({
    startDateInYear: "2026-01-01",
    endDateInYear: "2026-12-31",
    dailySalary: 500,
    absences: [{ category: "MATERNIDAD", days: 30 }],
  });
  assert.equal(base.state, "PASS");
  assert.equal(maternity.state, "PASS");
  assert.equal(maternity.data?.effectiveWorkedDays, base.data?.effectiveWorkedDays);
});

test("generic absence requires classification before aguinaldo deduction", () => {
  const result = calculateAguinaldoMx({
    startDateInYear: "2026-01-01",
    endDateInYear: "2026-08-28",
    dailySalary: 500,
    absences: [{ category: "GENERICA", days: 1 }],
  });
  assert.equal(result.state, "REVIEW_REQUIRED");
});

test("Before Signing refuses a validity opinion", () => {
  const result = evaluateBeforeSigning({
    contractType: "GENERICO",
    partiesIdentified: true,
    clearConsideration: true,
    termAndTermination: true,
    blanksFilled: true,
    jurisdictionClause: true,
    asksForValidityOpinion: true,
  });
  assert.equal(result.state, "REVIEW_REQUIRED");
  assert.match(result.reviewReasons?.[0] ?? "", /no dictamina validez/i);
});

test("Before Signing remains a structural guide", () => {
  const result = evaluateBeforeSigning({
    contractType: "GENERICO",
    partiesIdentified: false,
    clearConsideration: true,
    termAndTermination: true,
    blanksFilled: true,
    jurisdictionClause: true,
  });
  assert.equal(result.state, "PASS");
  assert.match(result.data?.disclaimer ?? "", /guía estructural preventiva/i);
});

test("finiquito requires geographic zone", () => {
  const result = calculateFiniquitoDevengadosMx({
    startDate: "2025-01-01",
    terminationDate: "2026-08-28",
    dailySalary: 500,
  });
  assert.equal(result.state, "REQUIRE_INPUT");
  assert.ok(result.requiredInputs?.includes("geographicZone"));
});

test("ordinary full-day salary below applicable ZSMG requires review", () => {
  const result = calculateFiniquitoDevengadosMx({
    startDate: "2025-01-01",
    terminationDate: "2026-08-28",
    dailySalary: 300,
    geographicZone: "ZSMG",
    workMode: "JORNADA_COMPLETA_ORDINARIA",
  });
  assert.equal(result.state, "REVIEW_REQUIRED");
});

test("reduced jornada below daily SMG can continue under frozen V1 logic", () => {
  const result = calculateFiniquitoDevengadosMx({
    startDate: "2025-01-01",
    terminationDate: "2026-08-28",
    dailySalary: 300,
    geographicZone: "ZSMG",
    workMode: "JORNADA_REDUCIDA",
  });
  assert.equal(result.state, "PASS");
  assert.ok(result.data);
});

test("indemnity components remain on HOLD", () => {
  for (const component of ["INDEMNIZACION_90_DIAS", "PRIMA_ANTIGUEDAD", "20_DIAS_POR_ANO"]) {
    const result = calculateFiniquitoDevengadosMx({
      startDate: "2025-01-01",
      terminationDate: "2026-08-28",
      dailySalary: 500,
      geographicZone: "ZSMG",
      requestedComponents: [component],
    });
    assert.equal(result.state, "HOLD");
  }
});

test("net tax and other excluded components remain OUT_OF_SCOPE", () => {
  for (const component of ["ISR_NETO", "IMSS_NETO", "SALARIOS_CAIDOS", "INTERESES_PROCESALES", "PRESTACIONES_EXTRALEGALES"]) {
    const result = calculateFiniquitoDevengadosMx({
      startDate: "2025-01-01",
      terminationDate: "2026-08-28",
      dailySalary: 500,
      geographicZone: "ZSMG",
      requestedComponents: [component],
    });
    assert.equal(result.state, "OUT_OF_SCOPE");
  }
});
