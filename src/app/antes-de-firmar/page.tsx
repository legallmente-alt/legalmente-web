"use client";

import Link from "next/link";
import { useState } from "react";
import { evaluateBeforeSigning, type BeforeSigningInput, type BeforeSigningFinding } from "@/lib/legal-core/before-signing";

type CheckKey = "partiesIdentified" | "clearConsideration" | "termAndTermination" | "blanksFilled" | "jurisdictionClause";

type Check = { key: CheckKey; title: string; description: string; fact: string; question: string };

const checks: Check[] = [
  {
    key: "partiesIdentified",
    title: "Las partes están identificadas",
    description: "Puedes reconocer quién asume cada obligación y con qué datos debe comparecer.",
    fact: "Las partes y sus roles pueden identificarse.",
    question: "¿Qué documento o fuente permite confirmar quién comparece y en qué calidad?",
  },
  {
    key: "clearConsideration",
    title: "La contraprestación está clara",
    description: "El precio, salario, pago o intercambio aparece expresado junto con su moneda cuando corresponde.",
    fact: "El precio, salario, pago o intercambio está expresado.",
    question: "¿Qué incluye exactamente la contraprestación y qué queda fuera?",
  },
  {
    key: "termAndTermination",
    title: "La vigencia y terminación están previstas",
    description: "El documento explica cuánto dura y cómo puede terminarse o revisarse.",
    fact: "La vigencia y la forma de terminación están indicadas.",
    question: "¿Qué hecho activa la terminación y qué procedimiento describe el documento?",
  },
  {
    key: "blanksFilled",
    title: "No quedan espacios ni anexos pendientes",
    description: "No hay campos incompletos, anexos ausentes ni referencias que deban llenarse después.",
    fact: "Los campos y anexos relevantes están completos o localizados.",
    question: "¿Qué versión y qué anexos deben conservarse junto con el documento?",
  },
  {
    key: "jurisdictionClause",
    title: "El territorio o foro está identificado",
    description: "Puedes localizar la ley, jurisdicción o mecanismo aplicable, cuando el documento lo requiere.",
    fact: "El documento permite localizar el territorio, ley o foro relacionado.",
    question: "¿Qué territorio y qué regla aplicable deben revisarse antes de tomar una decisión?",
  },
];

const initialChecks: Record<CheckKey, boolean> = {
  partiesIdentified: false,
  clearConsideration: false,
  termAndTermination: false,
  blanksFilled: false,
  jurisdictionClause: false,
};

const levelTone: Record<BeforeSigningFinding["level"], string> = {
  1: "border-acento-miel bg-acento-miel/10",
  2: "border-acento-cobre bg-acento-cobre/10",
  3: "border-acento-terracota bg-acento-terracota/10",
};

function questionForFinding(code: string): string {
  const match: Record<string, string> = {
    "BS-BLANKS": "¿Qué campos, anexos o referencias deben confirmarse y qué versión debe conservarse?",
    "BS-CONSIDERATION": "¿Qué contraprestación se está describiendo y con qué moneda, fecha o condición?",
    "BS-PARTIES": "¿Quién asume cada obligación y con qué facultades o calidad comparece?",
    "BS-TERM": "¿Cuánto dura el instrumento y qué pasos prevé para terminarlo o revisarlo?",
    "BS-JURISDICTION": "¿Qué territorio, ley o foro aparece relacionado con el documento?",
    "BS-LABOR-RIGHTS": "¿Qué parte requiere revisar derechos laborales y fuentes territoriales antes de continuar?",
  };
  return match[code] ?? "¿Qué dato o fuente falta para comprender mejor este punto?";
}

export default function BeforeSigningPage() {
  const [contractType, setContractType] = useState<BeforeSigningInput["contractType"]>("GENERICO");
  const [values, setValues] = useState<Record<CheckKey, boolean>>(initialChecks);
  const [result, setResult] = useState<ReturnType<typeof evaluateBeforeSigning> | null>(null);

  function updateCheck(key: CheckKey) {
    setValues((current) => ({ ...current, [key]: !current[key] }));
    setResult(null);
  }

  function evaluate() {
    setResult(evaluateBeforeSigning({ contractType, ...values }));
  }

  const findings = result?.data?.findings ?? [];
  const missingChecks = checks.filter((check) => !values[check.key]);
  const selectedFacts = checks.filter((check) => values[check.key]);
  const printQuestions = findings.length > 0 ? findings.slice(0, 3).map((finding) => questionForFinding(finding.code)) : checks.slice(0, 3).map((check) => check.question);

  return (
    <main className="bg-crema text-tinta">
      <section className="border-b border-tinta/10">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tinta/50">Instrumento educativo · México</p>
            <h1 className="mt-5 max-w-[10ch] font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.05em]">Antes de firmar, ordena lo que falta.</h1>
          </div>
          <div className="max-w-[60ch] lg:pb-2">
            <p className="text-lg leading-8 text-tinta/70">Una guía estructural para revisar un documento antes de tomar una decisión. No lee contratos ni dictamina validez: te ayuda a detectar puntos que conviene aclarar.</p>
            <p className="mt-5 border-l-2 border-acento-cobre pl-4 text-sm leading-6 text-tinta/65">No introduzcas nombres, correos, documentos, expedientes ni detalles de un caso real. Esta versión funciona sólo con selecciones en memoria y no guarda información personal.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="print-hide">
          <div className="border-y border-tinta/12 py-6">
            <label htmlFor="contract-type" className="text-xs font-semibold uppercase tracking-[0.16em] text-tinta/50">1. Tipo de documento</label>
            <select
              id="contract-type"
              value={contractType}
              onChange={(event) => {
                setContractType(event.target.value as BeforeSigningInput["contractType"]);
                setResult(null);
              }}
              className="mt-4 min-h-12 w-full border border-tinta/25 bg-transparent px-4 text-base outline-none focus:border-tinta focus:ring-2 focus:ring-tinta focus:ring-offset-2 focus:ring-offset-crema"
            >
              <option value="GENERICO">Documento o contrato general</option>
              <option value="ARRENDAMIENTO">Arrendamiento</option>
              <option value="PRESTACION_SERVICIOS">Prestación de servicios</option>
              <option value="LABORAL">Laboral</option>
              <option value="COMPRAVENTA">Compraventa</option>
              <option value="CONFIDENCIALIDAD">Confidencialidad</option>
            </select>
          </div>

          <fieldset className="mt-10">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-tinta/50">2. Revisión estructural</legend>
            <p className="mt-3 max-w-[58ch] text-sm leading-6 text-tinta/65">Marca sólo lo que puedes identificar en abstracto. No copies aquí el documento ni describas tu caso.</p>
            <div className="mt-5 divide-y divide-tinta/12 border-y border-tinta/12">
              {checks.map((check) => (
                <label key={check.key} className="grid cursor-pointer grid-cols-[auto_1fr] gap-4 py-5">
                  <input
                    type="checkbox"
                    checked={values[check.key]}
                    onChange={() => updateCheck(check.key)}
                    className="mt-1 h-6 w-6 accent-tinta focus:ring-2 focus:ring-tinta focus:ring-offset-2 focus:ring-offset-crema"
                  />
                  <span>
                    <strong className="block text-base font-medium">{check.title}</strong>
                    <span className="mt-1 block text-sm leading-6 text-tinta/62">{check.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={evaluate}
              className="inline-flex min-h-14 w-full items-center justify-between bg-tinta px-6 text-base font-semibold text-crema transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-tinta focus:ring-offset-4 focus:ring-offset-crema motion-reduce:transform-none sm:w-auto sm:min-w-80"
            >
              Generar guía estructural <span aria-hidden="true">→</span>
            </button>
            <span className="text-xs leading-5 text-tinta/55">Salida educativa · sin almacenamiento</span>
          </div>
        </div>

        <aside className="border-t border-tinta/12 pt-7 lg:border-l lg:border-t-0 lg:pl-10" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tinta/50">3. Salida de orientación</p>
          {!result ? (
            <div className="mt-6 border border-tinta/15 bg-white/30 p-6">
              <h2 className="font-serif text-3xl leading-tight">La claridad también se prepara.</h2>
              <p className="mt-4 text-sm leading-7 text-tinta/65">Marca lo que ya puedes identificar. La guía señalará puntos de atención, no una conclusión sobre si debes firmar.</p>
              <p className="mt-4 border-l-2 border-acento-cobre pl-3 text-xs font-semibold uppercase tracking-[0.12em] text-tinta/55">Territorio: México · herramienta educativa</p>
            </div>
          ) : (
            <div className="mt-6">
              <div className="border border-tinta/15 bg-white/30 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tinta/50">Estado educativo</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight">{result.state === "PASS" ? "Orientación estructural disponible." : "Puntos de atención para aclarar."}</h2>
                <p className="mt-4 text-sm leading-7 text-tinta/65">{result.data?.disclaimer ?? result.reviewReasons?.join(" ")}</p>
                <p className="mt-4 border-l-2 border-acento-cobre pl-3 text-xs font-semibold uppercase tracking-[0.12em] text-tinta/55">Territorio: México · no determina validez ni conveniencia</p>
              </div>

              {findings.length > 0 ? (
                <div className="mt-6 space-y-3">
                  {findings.map((finding) => (
                    <article key={finding.code} className={`border p-4 ${levelTone[finding.level]}`}>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em]">{finding.label}</p>
                      <p className="mt-2 text-sm leading-6">{finding.message}</p>
                      <p className="mt-3 border-t border-current/15 pt-3 text-sm leading-6"><strong>Pregunta preparatoria:</strong> {questionForFinding(finding.code)}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-6 border border-acento-miel bg-acento-miel/10 p-4 text-sm leading-6">No aparecen puntos estructurales con la información marcada. Eso no confirma validez ni conveniencia de firmar.</p>
              )}

              <div className="mt-6 border-t border-tinta/12 pt-5">
                <p className="text-sm leading-6 text-tinta/68">Si necesitas saber si el documento es válido, suficiente o conveniente para tu situación, esta herramienta no puede responderlo: requiere revisión profesional con la ley aplicable y los hechos completos.</p>
              </div>

              <section className="print-summary mt-8 border border-tinta/15 bg-white/50 p-6" aria-labelledby="print-summary-title">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tinta/50">Resumen de hechos y preguntas</p>
                <h3 id="print-summary-title" className="mt-2 font-serif text-2xl">Preparación para una conversación profesional</h3>
                <div className="mt-5 space-y-4 text-sm leading-6">
                  <div>
                    <strong>Tipo seleccionado:</strong> {contractType === "GENERICO" ? "Documento o contrato general" : contractType.toLowerCase().replaceAll("_", " ")}
                  </div>
                  <div>
                    <strong>Elementos que puedes identificar:</strong>
                    {selectedFacts.length > 0 ? <ul className="mt-2 list-disc space-y-1 pl-5">{selectedFacts.map((fact) => <li key={fact.key}>{fact.fact}</li>)}</ul> : <p className="mt-2">Todavía no hay elementos marcados.</p>}
                  </div>
                  <div>
                    <strong>Puntos que faltan por aclarar:</strong>
                    {missingChecks.length > 0 ? <ul className="mt-2 list-disc space-y-1 pl-5">{missingChecks.map((fact) => <li key={fact.key}>{fact.title}</li>)}</ul> : <p className="mt-2">No hay faltantes estructurales marcados.</p>}
                  </div>
                  <div>
                    <strong>Tres preguntas preparatorias:</strong>
                    <ol className="mt-2 list-decimal space-y-1 pl-5">{printQuestions.map((question) => <li key={question}>{question}</li>)}</ol>
                  </div>
                  <p className="border-l-2 border-acento-cobre pl-3 text-xs leading-5 text-tinta/65">Este resumen organiza selecciones educativas en memoria. No es dictamen, opinión legal, informe jurídico ni conclusión sobre si debes firmar.</p>
                </div>
                <button type="button" onClick={() => window.print()} className="print-hide mt-6 min-h-12 border border-tinta px-5 text-sm font-semibold hover:bg-tinta hover:text-crema focus:outline-none focus:ring-2 focus:ring-tinta focus:ring-offset-2 focus:ring-offset-crema">Imprimir resumen</button>
              </section>
            </div>
          )}

          <div className="print-hide mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link href="/proceso/leer-antes-de-aceptar" className="border-b border-tinta/60 pb-1 hover:border-tinta focus:outline-none focus:ring-2 focus:ring-tinta">Ver proceso relacionado</Link>
            <Link href="/explorar" className="border-b border-tinta/60 pb-1 hover:border-tinta focus:outline-none focus:ring-2 focus:ring-tinta">Explorar conceptos</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
