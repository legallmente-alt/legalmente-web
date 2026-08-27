"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Intake = {
  jurisdiction: "" | "mexico" | "internacional";
  relationship: "" | "negociacion" | "cliente-proveedor" | "laboral" | "regulada";
  information: "" | "comercial" | "tecnica" | "datos-personales" | "regulada";
  specialClause: "" | "ninguna" | "pena" | "no-competencia" | "propiedad-intelectual";
  duration: "" | "hasta-dos" | "dos-cinco" | "mas-cinco";
};

const initialIntake: Intake = {
  jurisdiction: "",
  relationship: "",
  information: "",
  specialClause: "",
  duration: "",
};

const steps = [
  {
    key: "jurisdiction" as const,
    title: "Ámbito de la operación",
    description: "Este primer piloto solo contempla operaciones sometidas a Derecho mexicano.",
    options: [
      ["mexico", "Solo México", "Las partes y la operación se encuentran en México."],
      ["internacional", "Interviene otro país", "Hay una parte, ley, activo o ejecución fuera de México."],
    ],
  },
  {
    key: "relationship" as const,
    title: "Tipo de relación",
    description: "El contexto determina qué cláusulas pueden usarse de forma responsable.",
    options: [
      ["negociacion", "Negociación exploratoria", "Las partes evalúan una posible operación."],
      ["cliente-proveedor", "Cliente o proveedor", "Existe o se prepara una relación comercial."],
      ["laboral", "Relación laboral", "Participa una persona trabajadora o candidata."],
      ["regulada", "Operación regulada", "Finanzas, salud, telecomunicaciones u otro sector regulado."],
    ],
  },
  {
    key: "information" as const,
    title: "Información principal",
    description: "No escribas nombres, secretos ni información real en este prototipo.",
    options: [
      ["comercial", "Comercial general", "Precios, propuestas, proveedores o estrategia comercial."],
      ["tecnica", "Técnica", "Procesos, prototipos, código o conocimiento técnico."],
      ["datos-personales", "Datos personales", "Información que identifica o puede identificar personas."],
      ["regulada", "Financiera o regulada", "Información sujeta a controles sectoriales especiales."],
    ],
  },
  {
    key: "specialClause" as const,
    title: "Condición especial",
    description: "Algunas cláusulas cambian por completo el riesgo del documento.",
    options: [
      ["ninguna", "Ninguna", "Solo confidencialidad, uso limitado y devolución de información."],
      ["pena", "Pena convencional", "Se pretende fijar una cantidad por incumplimiento."],
      ["no-competencia", "No competencia", "Se busca restringir actividades futuras de una parte."],
      ["propiedad-intelectual", "Propiedad intelectual", "Se pretende ceder o licenciar derechos."],
    ],
  },
  {
    key: "duration" as const,
    title: "Duración pretendida",
    description: "El plazo debe guardar relación con la información y el propósito real.",
    options: [
      ["hasta-dos", "Hasta 2 años", "Periodo inicial acotado."],
      ["dos-cinco", "De 2 a 5 años", "Protección comercial de mediano plazo."],
      ["mas-cinco", "Más de 5 años o indefinida", "Requiere justificar alcance, materia y exigibilidad."],
    ],
  },
] as const;

const labels: Record<string, string> = Object.fromEntries(
  steps.flatMap((step) =>
    step.options.map(([value, label]) => [`${step.key}:${value}`, label]),
  ),
);

function answerLabel(key: keyof Intake, value: string) {
  return labels[`${key}:${value}`] ?? "Sin responder";
}

function evaluate(intake: Intake) {
  const reasons: string[] = [];

  if (intake.jurisdiction === "internacional") {
    reasons.push("La operación tiene un componente internacional.");
  }
  if (intake.relationship === "laboral") {
    reasons.push("La confidencialidad se relaciona con una relación laboral.");
  }
  if (intake.relationship === "regulada") {
    reasons.push("La operación pertenece a un sector regulado.");
  }
  if (intake.information === "datos-personales") {
    reasons.push("El documento debe coordinarse con obligaciones de protección de datos.");
  }
  if (intake.information === "regulada") {
    reasons.push("La información tiene naturaleza financiera o regulada.");
  }
  if (intake.specialClause === "pena") {
    reasons.push("Una pena convencional requiere revisión de proporcionalidad y exigibilidad.");
  }
  if (intake.specialClause === "no-competencia") {
    reasons.push("Una restricción de competencia no debe incorporarse como cláusula estándar.");
  }
  if (intake.specialClause === "propiedad-intelectual") {
    reasons.push("La cesión o licencia de propiedad intelectual exige un instrumento especializado.");
  }
  if (intake.duration === "mas-cinco") {
    reasons.push("La duración superior a cinco años o indefinida requiere justificación individual.");
  }

  return {
    route: reasons.length === 0 ? "guided" : "review",
    reasons,
  } as const;
}

export default function NdaIntake() {
  const [stepIndex, setStepIndex] = useState(0);
  const [intake, setIntake] = useState<Intake>(initialIntake);
  const [complete, setComplete] = useState(false);

  const step = steps[stepIndex];
  const selected = intake[step.key];
  const result = useMemo(() => evaluate(intake), [intake]);

  const summary = useMemo(
    () =>
      [
        "BRIEF DE PRECLASIFICACIÓN — NDA BILATERAL",
        "Documento educativo; no constituye un contrato ni asesoría jurídica.",
        "",
        `Ámbito: ${answerLabel("jurisdiction", intake.jurisdiction)}`,
        `Relación: ${answerLabel("relationship", intake.relationship)}`,
        `Información: ${answerLabel("information", intake.information)}`,
        `Condición especial: ${answerLabel("specialClause", intake.specialClause)}`,
        `Duración: ${answerLabel("duration", intake.duration)}`,
        "",
        `Ruta sugerida: ${result.route === "guided" ? "Borrador guiado con revisión previa a firma" : "Revisión profesional obligatoria"}`,
        ...result.reasons.map((reason) => `- ${reason}`),
      ].join("\n"),
    [intake, result],
  );

  function select(value: string) {
    setIntake((current) => ({ ...current, [step.key]: value } as Intake));
  }

  function next() {
    if (!selected) return;
    if (stepIndex === steps.length - 1) {
      setComplete(true);
      return;
    }
    setStepIndex((current) => current + 1);
  }

  function previous() {
    if (stepIndex === 0) return;
    setStepIndex((current) => current - 1);
  }

  function downloadBrief() {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "brief-nda-legalmente.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function restart() {
    setIntake(initialIntake);
    setStepIndex(0);
    setComplete(false);
  }

  if (complete) {
    const needsReview = result.route === "review";

    return (
      <section aria-live="polite" className="space-y-6 rounded-sm border border-oro/30 bg-crema/[0.04] p-6 sm:p-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-oro">Resultado de preclasificación</p>
          <h2 className="font-serif text-2xl text-crema">
            {needsReview ? "Revisión profesional obligatoria" : "Borrador guiado posible"}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-crema/75">
            {needsReview
              ? "La operación contiene elementos que no deben resolverse con una plantilla automática. El brief sirve para preparar una revisión profesional; todavía no es un contrato."
              : "La operación cabe preliminarmente en el alcance del NDA bilateral simple para México. La futura versión podrá ensamblar un borrador con cláusulas aprobadas, siempre sujeto a revisión antes de firma."}
          </p>
        </div>

        {result.reasons.length > 0 && (
          <ul className="space-y-2 border-l-2 border-oro/40 pl-4 text-sm text-crema/75">
            {result.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        )}

        <div className="rounded-sm bg-tinta/60 p-4 text-sm text-crema/70">
          No almacenamos respuestas ni solicitamos nombres, documentos o secretos empresariales en este prototipo.
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadBrief}
            className="rounded-sm bg-oro px-5 py-3 text-sm font-medium text-tinta hover:bg-crema"
          >
            Descargar brief
          </button>
          <Link
            href="/contacto"
            className="rounded-sm border border-oro px-5 py-3 text-sm text-oro hover:bg-oro hover:text-tinta"
          >
            Preparar revisión profesional
          </Link>
          <button
            type="button"
            onClick={restart}
            className="rounded-sm border border-crema/25 px-5 py-3 text-sm text-crema/75 hover:border-crema"
          >
            Empezar de nuevo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-sm border border-oro/30 bg-crema/[0.04] p-6 sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.18em] text-oro">
          Paso {stepIndex + 1} de {steps.length}
        </p>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-crema/10" aria-hidden="true">
          <div
            className="h-full bg-oro transition-all"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <fieldset className="space-y-5">
        <legend className="font-serif text-2xl text-crema">{step.title}</legend>
        <p className="text-sm leading-6 text-crema/65">{step.description}</p>
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          {step.options.map(([value, label, description]) => {
            const active = selected === value;
            return (
              <label
                key={value}
                className={`cursor-pointer rounded-sm border p-4 transition ${
                  active
                    ? "border-oro bg-oro/10"
                    : "border-crema/15 bg-tinta/30 hover:border-oro/60"
                }`}
              >
                <input
                  type="radio"
                  name={step.key}
                  value={value}
                  checked={active}
                  onChange={() => select(value)}
                  className="mr-3 accent-[#C8A24A]"
                />
                <span className="font-medium text-crema">{label}</span>
                <span className="mt-2 block pl-6 text-xs leading-5 text-crema/60">{description}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={previous}
          disabled={stepIndex === 0}
          className="rounded-sm border border-crema/20 px-5 py-3 text-sm text-crema/70 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!selected}
          className="rounded-sm bg-oro px-5 py-3 text-sm font-medium text-tinta hover:bg-crema disabled:cursor-not-allowed disabled:opacity-30"
        >
          {stepIndex === steps.length - 1 ? "Ver resultado" : "Continuar"}
        </button>
      </div>
    </section>
  );
}
