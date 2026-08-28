"use client";

import { FormEvent, useState } from "react";
import {
  EMPTY_NDA_PREFLIGHT,
  SYNTHETIC_PREFLIGHT_STATUS,
  evaluateNdaPreflight,
  type DocumentType,
  type ExcludedMatter,
  type Language,
  type NdaPreflightInput,
  type PreflightResult,
  type PreflightRoute,
  type ReasonCode,
  type Territory,
  type TriState,
  type Urgency,
} from "@/lib/nda-preflight";

type SelectOption = { value: string; label: string };

const triStateOptions: SelectOption[] = [
  { value: "UNKNOWN", label: "No lo sé todavía" },
  { value: "NO", label: "No" },
  { value: "YES", label: "Sí" },
];

const routeCopy: Record<PreflightRoute, { title: string; body: string }> = {
  ACCEPT: {
    title: "Encaja en el contrato sintético",
    body: "Las respuestas coinciden con el escenario simple usado por el laboratorio. No significa aceptación de un servicio ni autorización para enviar un documento.",
  },
  CLARIFY: {
    title: "Falta información",
    body: "No hay datos suficientes para clasificar el supuesto. Completa la información sin compartir datos identificables ni texto contractual.",
  },
  REVIEW: {
    title: "El escenario exige revisión humana",
    body: "La combinación declarada sale del supuesto simple y requiere una decisión humana antes de cualquier uso profesional futuro.",
  },
  STOP: {
    title: "Fuera del laboratorio definido",
    body: "El supuesto contiene una exclusión determinista. El flujo se detiene antes de recibir información sensible o documentos.",
  },
};

const reasonLabels: Record<ReasonCode, string> = {
  UNSUPPORTED_TERRITORY: "Territorio distinto de México",
  NOT_AN_NDA: "El documento no es un NDA/acuerdo de confidencialidad",
  UNSUPPORTED_LANGUAGE: "Idioma fuera del laboratorio",
  OVER_PAGE_LIMIT: "Supera el límite sintético de 10 páginas",
  MULTI_COUNTRY: "Intervienen dos o más países",
  ACTIVE_DISPUTE: "Existe disputa, litigio o conflicto activo",
  EXCLUDED_MATTER: "Materia excluida",
  MATERIAL_NON_COMPETE: "No competencia material o central",
  OBJECTIVE_OUT_OF_SCOPE: "Objetivo fuera del escenario definido",
  MISSING_REQUIRED_INFO: "Faltan datos indispensables",
  MISSING_ANNEXES: "Faltan anexos o partes del documento",
  ALREADY_SIGNED: "El documento ya fue firmado",
  URGENT: "Existe urgencia relevante",
  MATERIAL_IP: "Existe propiedad intelectual material",
  SENSITIVE_DATA: "Se declaran datos personales sensibles",
  ATYPICAL_TERM: "Plazo indefinido o atípico",
  WITHIN_PILOT_SCOPE: "Coincide con el escenario sintético",
};

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-crema">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-oro/25 bg-tinta px-3 py-3 text-sm text-crema outline-none focus:border-oro"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function NdaMexicoPreflightPage() {
  const [form, setForm] = useState<NdaPreflightInput>({ ...EMPTY_NDA_PREFLIGHT });
  const [result, setResult] = useState<PreflightResult | null>(null);
  const syntheticPassed = SYNTHETIC_PREFLIGHT_STATUS.every(
    (testCase) => testCase.actual === testCase.expected,
  );

  function setField<K extends keyof NdaPreflightInput>(
    key: K,
    value: NdaPreflightInput[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setResult(null);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(evaluateNdaPreflight(form));
  }

  return (
    <article className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-crema/55">
          <span>Laboratorio sintético</span>
          <span aria-hidden="true">·</span>
          <span>Document Review</span>
          <span aria-hidden="true">·</span>
          <span>Sin servicio comercial</span>
        </div>
        <h1 className="font-serif text-4xl text-oro sm:text-5xl">Preflight de NDA</h1>
        <p className="max-w-3xl text-base leading-7 text-crema/80">
          Este flujo prueba un contrato determinista de admisibilidad con casos ficticios.
          No analiza documentos, no presta asesoría y no es la vía comercial de LegalMente.
        </p>
      </header>

      <section className="rounded-xl border border-oro/30 bg-crema/[0.04] p-5 sm:p-6">
        <h2 className="font-serif text-xl text-crema">Reglas del laboratorio</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-crema/70">
          <li>• No escribas nombres, correos, empresas, montos, contrapartes ni texto del contrato.</li>
          <li>• No existe carga de archivos, backend, persistencia, checkout ni email.</li>
          <li>• ACCEPT solo valida el escenario sintético; no crea relación profesional.</li>
        </ul>
      </section>

      <form onSubmit={submit} className="space-y-6">
        <section className="grid gap-5 rounded-xl border border-crema/10 p-5 sm:grid-cols-2 sm:p-6">
          <SelectField
            label="Territorio principal"
            value={form.territory}
            options={[
              { value: "UNKNOWN", label: "No lo sé todavía" },
              { value: "MX", label: "México" },
              { value: "OTHER", label: "Otro país" },
            ]}
            onChange={(value) => setField("territory", value as Territory)}
          />
          <SelectField
            label="Tipo de documento"
            value={form.documentType}
            options={[
              { value: "UNKNOWN", label: "No lo sé todavía" },
              { value: "NDA", label: "NDA / confidencialidad" },
              { value: "NOT_NDA", label: "Otro documento" },
            ]}
            onChange={(value) => setField("documentType", value as DocumentType)}
          />
          <SelectField
            label="Idioma"
            value={form.language}
            options={[
              { value: "UNKNOWN", label: "No lo sé todavía" },
              { value: "ES", label: "Español" },
              { value: "OTHER", label: "Otro idioma" },
            ]}
            onChange={(value) => setField("language", value as Language)}
          />
          <label className="block space-y-2">
            <span className="text-sm font-medium text-crema">Páginas aproximadas</span>
            <input
              type="number"
              min={1}
              max={500}
              value={form.pagesApprox ?? ""}
              onChange={(event) =>
                setField(
                  "pagesApprox",
                  event.target.value === "" ? null : Number(event.target.value),
                )
              }
              className="w-full rounded-lg border border-oro/25 bg-tinta px-3 py-3 text-sm text-crema outline-none focus:border-oro"
            />
          </label>
          <SelectField
            label="¿Ya fue firmado?"
            value={form.signed}
            options={triStateOptions}
            onChange={(value) => setField("signed", value as TriState)}
          />
          <SelectField
            label="Urgencia"
            value={form.urgency}
            options={[
              { value: "UNKNOWN", label: "No lo sé todavía" },
              { value: "NORMAL", label: "Sin urgencia especial" },
              { value: "URGENT", label: "Urgencia relevante" },
            ]}
            onChange={(value) => setField("urgency", value as Urgency)}
          />
          <SelectField
            label="¿Intervienen dos o más países?"
            value={form.multiCountry}
            options={triStateOptions}
            onChange={(value) => setField("multiCountry", value as TriState)}
          />
          <SelectField
            label="¿Existe conflicto o litigio activo?"
            value={form.activeDispute}
            options={triStateOptions}
            onChange={(value) => setField("activeDispute", value as TriState)}
          />
          <SelectField
            label="Materia vinculada"
            value={form.excludedMatter}
            options={[
              { value: "UNKNOWN", label: "No lo sé todavía" },
              { value: "NONE", label: "Ninguna de estas" },
              { value: "LABOR", label: "Laboral" },
              { value: "PENAL", label: "Penal" },
              { value: "FISCAL", label: "Fiscal" },
              { value: "REGULATED", label: "Regulada / sectorial" },
            ]}
            onChange={(value) => setField("excludedMatter", value as ExcludedMatter)}
          />
          <SelectField
            label="¿Propiedad intelectual material?"
            value={form.materialIp}
            options={triStateOptions}
            onChange={(value) => setField("materialIp", value as TriState)}
          />
          <SelectField
            label="¿Datos personales sensibles?"
            value={form.sensitiveData}
            options={triStateOptions}
            onChange={(value) => setField("sensitiveData", value as TriState)}
          />
          <SelectField
            label="¿No competencia material?"
            value={form.materialNonCompete}
            options={triStateOptions}
            onChange={(value) => setField("materialNonCompete", value as TriState)}
          />
          <SelectField
            label="¿Plazo indefinido o atípico?"
            value={form.atypicalTerm}
            options={triStateOptions}
            onChange={(value) => setField("atypicalTerm", value as TriState)}
          />
          <SelectField
            label="¿Anexos completos?"
            value={form.annexesComplete}
            options={triStateOptions}
            onChange={(value) => setField("annexesComplete", value as TriState)}
          />
          <SelectField
            label="¿Objetivo compatible con este escenario?"
            value={form.objectiveCompatible}
            options={triStateOptions}
            onChange={(value) => setField("objectiveCompatible", value as TriState)}
          />
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-oro px-5 py-3 text-sm font-semibold text-tinta"
          >
            Evaluar escenario
          </button>
          <button
            type="button"
            onClick={() => {
              setForm({ ...EMPTY_NDA_PREFLIGHT });
              setResult(null);
            }}
            className="rounded-lg border border-crema/20 px-5 py-3 text-sm text-crema/80"
          >
            Reiniciar
          </button>
        </div>
      </form>

      {result ? (
        <section aria-live="polite" className="space-y-4 rounded-xl border border-oro/25 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oro/70">
                Ruta {result.route}
              </p>
              <h2 className="mt-1 font-serif text-2xl text-crema">
                {routeCopy[result.route].title}
              </h2>
            </div>
            <span className="rounded-full border border-crema/20 px-3 py-1 text-xs text-crema/70">
              documento: bloqueado
            </span>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-crema/75">
            {routeCopy[result.route].body}
          </p>
          <ul className="space-y-1 text-sm text-crema/75">
            {result.reasonCodes.map((reason) => (
              <li key={reason}>• {reasonLabels[reason]}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="space-y-2 border-t border-crema/10 pt-6 text-xs leading-5 text-crema/50">
        <p>
          Estado: SYNTHETIC_ONLY. No hay servicio NDA activo, pago, recepción documental ni relación profesional desde este flujo.
        </p>
        <p>
          QA del contrato sintético: {syntheticPassed ? "11/11 PASS" : "FALLO"}. Valida rutas de prueba, no conclusiones jurídicas.
        </p>
      </footer>
    </article>
  );
}
