"use client";

import { FormEvent, useState } from "react";
import {
  EMPTY_NDA_PREFLIGHT,
  SYNTHETIC_PREFLIGHT_STATUS,
  evaluateNdaPreflight,
  type ExcludedMatter,
  type Language,
  type NdaPreflightInput,
  type PreflightResult,
  type PreflightRoute,
  type ReasonCode,
  type Territory,
  type TriState,
  type Urgency,
  type DocumentType,
} from "@/lib/nda-preflight";

type SelectOption = { value: string; label: string };

const triStateOptions: SelectOption[] = [
  { value: "UNKNOWN", label: "No lo sé todavía" },
  { value: "NO", label: "No" },
  { value: "YES", label: "Sí" },
];

const routeCopy: Record<
  PreflightRoute,
  { title: string; body: string; className: string }
> = {
  ACCEPT: {
    title: "Encaja en el alcance sintético del piloto",
    body: "Con los datos declarados, el supuesto coincide con el NDA simple definido para México. El servicio real aún no está habilitado: no envíes documentos ni datos personales.",
    className: "border-acento-esmeralda/60 bg-acento-esmeralda/15",
  },
  CLARIFY: {
    title: "Falta información para clasificar",
    body: "No hay base suficiente para decidir el alcance. Completa los datos faltantes antes de avanzar. No subas documentos.",
    className: "border-acento-miel/60 bg-acento-miel/10",
  },
  REVIEW: {
    title: "Requiere revisión humana de admisibilidad",
    body: "Hay una característica que puede sacar el asunto del servicio simple. Esto no es una conclusión jurídica; indica que una persona responsable debe decidir si procede o se deriva.",
    className: "border-acento-cobre/60 bg-acento-cobre/10",
  },
  STOP: {
    title: "Fuera del piloto inicial",
    body: "El supuesto declarado cae fuera del alcance definido para este piloto. No envíes el documento. La ruta correcta sería detener o derivar antes de recibir información sensible.",
    className: "border-acento-oxblood/60 bg-acento-oxblood/15",
  },
};

const reasonLabels: Record<ReasonCode, string> = {
  UNSUPPORTED_TERRITORY: "Territorio distinto de México",
  NOT_AN_NDA: "El documento no es un NDA/acuerdo de confidencialidad",
  UNSUPPORTED_LANGUAGE: "Idioma fuera del piloto",
  OVER_PAGE_LIMIT: "Supera el límite inicial de 10 páginas",
  MULTI_COUNTRY: "Intervienen dos o más países",
  ACTIVE_DISPUTE: "Existe disputa, litigio o conflicto activo",
  EXCLUDED_MATTER: "Materia excluida del piloto",
  MATERIAL_NON_COMPETE: "No competencia material o central",
  OBJECTIVE_OUT_OF_SCOPE: "Objetivo fuera del servicio definido",
  MISSING_REQUIRED_INFO: "Faltan datos indispensables",
  MISSING_ANNEXES: "Faltan anexos o partes del documento",
  ALREADY_SIGNED: "El documento ya fue firmado",
  URGENT: "Existe urgencia que requiere revisión humana",
  MATERIAL_IP: "Existe una cláusula material de propiedad intelectual",
  SENSITIVE_DATA: "La operación involucra datos personales sensibles",
  ATYPICAL_TERM: "Plazo indefinido o atípico",
  WITHIN_PILOT_SCOPE: "Coincide con el alcance sintético del piloto",
};

function SelectField({
  label,
  value,
  options,
  onChange,
  help,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  help?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-crema">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-oro/25 bg-tinta px-3 py-3 text-sm text-crema outline-none transition focus:border-oro focus:ring-1 focus:ring-oro"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {help ? <span className="block text-xs text-crema/55">{help}</span> : null}
    </label>
  );
}

export default function NdaMexicoPreflightPage() {
  const [form, setForm] = useState<NdaPreflightInput>({
    ...EMPTY_NDA_PREFLIGHT,
  });
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

  function reset() {
    setForm({ ...EMPTY_NDA_PREFLIGHT });
    setResult(null);
  }

  return (
    <article className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-oro/80">
          <span>Preparación</span>
          <span aria-hidden="true">·</span>
          <span>Piloto cerrado</span>
          <span aria-hidden="true">·</span>
          <span>México</span>
        </div>
        <h1 className="font-serif text-4xl text-oro sm:text-5xl">
          Preflight de NDA
        </h1>
        <p className="max-w-3xl text-base leading-7 text-crema/80">
          Comprueba si un supuesto encaja en el alcance <strong>operativo</strong> del
          piloto de revisión de un NDA simple. Esta herramienta clasifica reglas de
          alcance; no analiza el documento ni emite asesoría jurídica.
        </p>
      </header>

      <section className="rounded-xl border border-oro/30 bg-crema/[0.04] p-5 sm:p-6">
        <h2 className="font-serif text-xl text-crema">Antes de empezar</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-crema/70">
          <li>• No subas contratos, nombres, correos, empresas, montos ni otros datos personales.</li>
          <li>• La información se mantiene solo en el estado de esta página; no se envía a un servidor.</li>
          <li>• Incluso un resultado ACCEPT no habilita hoy la recepción de documentos ni el cobro.</li>
        </ul>
      </section>

      <form onSubmit={submit} className="space-y-8">
        <section className="space-y-5 rounded-xl border border-crema/10 p-5 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-oro/70">1 · Alcance básico</p>
            <h2 className="mt-1 font-serif text-2xl text-crema">Qué estás intentando preparar</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
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
                { value: "NDA", label: "NDA / acuerdo de confidencialidad" },
                { value: "NOT_NDA", label: "Otro contrato o documento" },
              ]}
              onChange={(value) => setField("documentType", value as DocumentType)}
            />
            <SelectField
              label="Idioma del documento"
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
                inputMode="numeric"
                value={form.pagesApprox ?? ""}
                placeholder="Ej. 6"
                onChange={(event) => {
                  const value = event.target.value;
                  setField("pagesApprox", value === "" ? null : Number(value));
                }}
                className="w-full rounded-lg border border-oro/25 bg-tinta px-3 py-3 text-sm text-crema outline-none transition placeholder:text-crema/35 focus:border-oro focus:ring-1 focus:ring-oro"
              />
              <span className="block text-xs text-crema/55">El piloto inicial está acotado a un máximo de 10 páginas.</span>
            </label>
          </div>
        </section>

        <section className="space-y-5 rounded-xl border border-crema/10 p-5 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-oro/70">2 · Señales de exclusión</p>
            <h2 className="mt-1 font-serif text-2xl text-crema">Lo que cambia la ruta</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="¿Intervienen dos o más países?"
              value={form.multiCountry}
              options={triStateOptions}
              onChange={(value) => setField("multiCountry", value as TriState)}
            />
            <SelectField
              label="¿Existe disputa, litigio o conflicto activo?"
              value={form.activeDispute}
              options={triStateOptions}
              onChange={(value) => setField("activeDispute", value as TriState)}
            />
            <SelectField
              label="Materia especial vinculada"
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
              label="¿Hay una no competencia material o central?"
              value={form.materialNonCompete}
              options={triStateOptions}
              onChange={(value) => setField("materialNonCompete", value as TriState)}
              help="Una mención secundaria o dudosa se trata de forma distinta a una obligación central."
            />
          </div>
        </section>

        <section className="space-y-5 rounded-xl border border-crema/10 p-5 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-oro/70">3 · Revisión humana</p>
            <h2 className="mt-1 font-serif text-2xl text-crema">Características que necesitan un humano</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="¿El documento ya fue firmado?"
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
                { value: "URGENT", label: "Hay una urgencia relevante" },
              ]}
              onChange={(value) => setField("urgency", value as Urgency)}
            />
            <SelectField
              label="¿Existe una cláusula material de propiedad intelectual?"
              value={form.materialIp}
              options={triStateOptions}
              onChange={(value) => setField("materialIp", value as TriState)}
            />
            <SelectField
              label="¿La operación involucra datos personales sensibles?"
              value={form.sensitiveData}
              options={triStateOptions}
              onChange={(value) => setField("sensitiveData", value as TriState)}
            />
            <SelectField
              label="¿El plazo es indefinido o claramente atípico?"
              value={form.atypicalTerm}
              options={triStateOptions}
              onChange={(value) => setField("atypicalTerm", value as TriState)}
            />
            <SelectField
              label="¿Tienes todas las partes y anexos del documento?"
              value={form.annexesComplete}
              options={triStateOptions}
              onChange={(value) => setField("annexesComplete", value as TriState)}
            />
            <SelectField
              label="¿Tu objetivo es únicamente preparar una revisión acotada del NDA?"
              value={form.objectiveCompatible}
              options={triStateOptions}
              onChange={(value) => setField("objectiveCompatible", value as TriState)}
            />
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-oro px-5 py-3 text-sm font-semibold text-tinta transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-oro focus:ring-offset-2 focus:ring-offset-tinta"
          >
            Evaluar alcance
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-crema/20 px-5 py-3 text-sm text-crema/80 transition hover:border-crema/40 hover:text-crema"
          >
            Reiniciar
          </button>
        </div>
      </form>

      {result ? (
        <section
          aria-live="polite"
          className={`space-y-4 rounded-xl border p-5 sm:p-6 ${routeCopy[result.route].className}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crema/60">
                Ruta {result.route}
              </p>
              <h2 className="mt-1 font-serif text-2xl text-crema">
                {routeCopy[result.route].title}
              </h2>
            </div>
            <span className="rounded-full border border-crema/20 px-3 py-1 text-xs text-crema/70">
              carga de documento: bloqueada
            </span>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-crema/75">
            {routeCopy[result.route].body}
          </p>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-crema/55">Motivos</p>
            <ul className="mt-2 space-y-1 text-sm text-crema/80">
              {result.reasonCodes.map((reason) => (
                <li key={reason}>• {reasonLabels[reason]}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <footer className="space-y-3 border-t border-crema/10 pt-6 text-xs leading-5 text-crema/50">
        <p>
          Estado de producto: G2 bloqueado. No hay recepción de documentos, pago ni relación profesional activa desde esta herramienta.
        </p>
        <p>
          QA interno del contrato sintético: {syntheticPassed ? "11/11 PASS" : "FALLO"}. Esta comprobación valida rutas de alcance, no conclusiones jurídicas.
        </p>
      </footer>
    </article>
  );
}
