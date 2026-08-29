"use client";

import Link from "next/link";
import { useState } from "react";
import { evaluateBeforeSigning, type BeforeSigningInput, type BeforeSigningFinding } from "@/lib/legal-core/before-signing";

type CheckKey = "partiesIdentified" | "clearConsideration" | "termAndTermination" | "blanksFilled" | "jurisdictionClause";

const checks: Array<{ key: CheckKey; title: string; description: string }> = [
  {
    key: "partiesIdentified",
    title: "Las partes están identificadas",
    description: "Puedes reconocer quién asume cada obligación y con qué datos debe comparecer.",
  },
  {
    key: "clearConsideration",
    title: "La contraprestación está clara",
    description: "El precio, salario, pago o intercambio aparece expresado junto con su moneda cuando corresponde.",
  },
  {
    key: "termAndTermination",
    title: "La vigencia y terminación están previstas",
    description: "El documento explica cuánto dura y cómo puede terminarse o revisarse.",
  },
  {
    key: "blanksFilled",
    title: "No quedan espacios ni anexos pendientes",
    description: "No hay campos incompletos, anexos ausentes ni referencias que deban llenarse después.",
  },
  {
    key: "jurisdictionClause",
    title: "El territorio o foro está identificado",
    description: "Puedes localizar la ley, jurisdicción o mecanismo aplicable, cuando el documento lo requiere.",
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
  1: "border-[#C8A24A] bg-[#C8A24A]/10",
  2: "border-[#D97745] bg-[#D97745]/10",
  3: "border-[#9D4A4A] bg-[#9D4A4A]/10",
};

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

  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="border-b border-[#102A43]/10">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Instrumento educativo · México</p>
            <h1 className="mt-5 max-w-[10ch] font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.05em]">Antes de firmar, ordena lo que falta.</h1>
          </div>
          <div className="max-w-[60ch] lg:pb-2">
            <p className="text-lg leading-8 text-[#102A43]/68">Una guía estructural para revisar un documento antes de tomar una decisión. No lee contratos ni dictamina validez: te ayuda a detectar puntos que conviene aclarar.</p>
            <p className="mt-5 border-l-2 border-[#D97745] pl-4 text-sm leading-6 text-[#102A43]/65">No introduzcas nombres, correos, documentos, expedientes ni detalles de un caso real. Esta versión no guarda información personal.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <div className="border-y border-[#102A43]/12 py-6">
            <label htmlFor="contract-type" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">1. Tipo de documento</label>
            <select
              id="contract-type"
              value={contractType}
              onChange={(event) => {
                setContractType(event.target.value as BeforeSigningInput["contractType"]);
                setResult(null);
              }}
              className="mt-4 min-h-12 w-full border border-[#102A43]/25 bg-transparent px-4 text-base outline-none focus:border-[#102A43] focus:ring-2 focus:ring-[#102A43] focus:ring-offset-2"
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
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">2. Revisión estructural</legend>
            <div className="mt-5 divide-y divide-[#102A43]/12 border-y border-[#102A43]/12">
              {checks.map((check) => (
                <label key={check.key} className="grid cursor-pointer grid-cols-[auto_1fr] gap-4 py-5">
                  <input
                    type="checkbox"
                    checked={values[check.key]}
                    onChange={() => updateCheck(check.key)}
                    className="mt-1 h-6 w-6 accent-[#102A43] focus:ring-2 focus:ring-[#102A43]"
                  />
                  <span>
                    <strong className="block text-base font-medium">{check.title}</strong>
                    <span className="mt-1 block text-sm leading-6 text-[#102A43]/62">{check.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={evaluate}
            className="mt-8 inline-flex min-h-14 w-full items-center justify-between bg-[#102A43] px-6 text-base font-semibold text-[#F5F0E8] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-4 motion-reduce:transform-none sm:w-auto sm:min-w-80"
          >
            Generar guía estructural <span aria-hidden="true">→</span>
          </button>
        </div>

        <aside className="border-t border-[#102A43]/12 pt-7 lg:border-l lg:border-t-0 lg:pl-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">3. Resultado</p>
          {!result ? (
            <div className="mt-6 border border-[#102A43]/15 bg-white/30 p-6">
              <h2 className="font-serif text-3xl leading-tight">La claridad también se prepara.</h2>
              <p className="mt-4 text-sm leading-7 text-[#102A43]/65">Marca lo que ya puedes identificar. La guía señalará puntos de atención, no una conclusión sobre si debes firmar.</p>
            </div>
          ) : (
            <div className="mt-6">
              <div className="border border-[#102A43]/15 bg-white/30 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Estado educativo</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight">{result.state === "PASS" ? "Guía preparada." : "Revisión previa necesaria."}</h2>
                <p className="mt-4 text-sm leading-7 text-[#102A43]/65">{result.data?.disclaimer ?? result.reviewReasons?.join(" ")}</p>
              </div>
              {findings.length > 0 ? (
                <div className="mt-6 space-y-3">
                  {findings.map((finding) => (
                    <article key={finding.code} className={`border p-4 ${levelTone[finding.level]}`}>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em]">{finding.label}</p>
                      <p className="mt-2 text-sm leading-6">{finding.message}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-6 border border-[#C8A24A] bg-[#C8A24A]/10 p-4 text-sm leading-6">No aparecen puntos estructurales con la información marcada. Eso no confirma validez ni conveniencia de firmar.</p>
              )}
              <div className="mt-6 border-t border-[#102A43]/12 pt-5">
                <p className="text-sm leading-6 text-[#102A43]/68">Si necesitas saber si el documento es válido, suficiente o conveniente para tu situación, esta herramienta no puede responderlo: requiere revisión profesional con la ley aplicable y los hechos completos.</p>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link href="/confianza" className="border-b border-[#102A43]/60 pb-1 hover:border-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]">Cómo trabajamos</Link>
            <Link href="/explorar" className="border-b border-[#102A43]/60 pb-1 hover:border-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43]">Explorar conceptos</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
