"use client";

import { useMemo, useState } from "react";
import ToolShell from "@/components/ToolShell";

const checks = [
  ["parties", "¿Las partes están identificadas con nombre o razón social y domicilio?"],
  ["consideration", "¿El precio, contraprestación o salario está expresado con claridad y moneda?"],
  ["term", "¿La vigencia y las condiciones de terminación están claramente descritas?"],
  ["blanks", "¿Todos los espacios, anexos y campos relevantes están completos?"],
  ["jurisdiction", "¿El documento indica ley aplicable o foro/tribunales para controversias?"],
] as const;

type CheckKey = (typeof checks)[number][0];

export default function BeforeSigningPage() {
  const [contractType, setContractType] = useState("GENERICO");
  const [answers, setAnswers] = useState<Record<CheckKey, boolean | null>>({
    parties: null,
    consideration: null,
    term: null,
    blanks: null,
    jurisdiction: null,
  });

  const result = useMemo(() => {
    const missing = checks.filter(([key]) => answers[key] === false);
    const incomplete = checks.some(([key]) => answers[key] === null);
    return { missing, incomplete };
  }, [answers]);

  return (
    <ToolShell title="Antes de firmar" eyebrow="Preflight estructural">
      <section className="space-y-6 rounded-2xl border border-crema/10 bg-white/[0.03] p-6">
        <label className="block space-y-2">
          <span className="text-sm text-crema/75">Tipo de documento</span>
          <select value={contractType} onChange={(e) => setContractType(e.target.value)} className="w-full rounded-xl border border-crema/15 bg-tinta px-4 py-3 text-crema">
            <option value="GENERICO">Genérico</option>
            <option value="ARRENDAMIENTO">Arrendamiento</option>
            <option value="PRESTACION_SERVICIOS">Prestación de servicios</option>
            <option value="LABORAL">Laboral</option>
            <option value="COMPRAVENTA">Compraventa</option>
            <option value="CONFIDENCIALIDAD">Confidencialidad</option>
          </select>
        </label>

        <div className="space-y-4">
          {checks.map(([key, label]) => (
            <fieldset key={key} className="rounded-xl border border-crema/10 p-4">
              <legend className="px-1 text-sm leading-6 text-crema">{label}</legend>
              <div className="mt-3 flex gap-3">
                {[true, false].map((value) => (
                  <button
                    key={String(value)}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [key]: value }))}
                    className={`rounded-lg border px-4 py-2 text-sm ${answers[key] === value ? "border-oro bg-oro/15 text-oro" : "border-crema/15 text-crema/70"}`}
                  >
                    {value ? "Sí" : "No"}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-oro/25 bg-oro/[0.06] p-6">
        <h2 className="font-serif text-2xl text-crema">Lectura preventiva</h2>
        {result.incomplete ? (
          <p className="mt-3 text-sm leading-6 text-crema/70">Completa todas las preguntas para obtener una lectura estructural.</p>
        ) : result.missing.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-crema/70">No detectamos vacíos en este checklist básico. Esto no significa que el contrato sea válido, conveniente o libre de otros riesgos.</p>
        ) : (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-crema/75">Revisa antes de firmar:</p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-crema/70">
              {result.missing.map(([, label]) => <li key={label}>{label}</li>)}
            </ul>
          </div>
        )}
        {contractType === "LABORAL" && (
          <p className="mt-4 rounded-xl border border-crema/10 bg-black/10 p-4 text-sm leading-6 text-crema/70">
            Los documentos laborales pueden contener reglas de orden público y límites a la renuncia de derechos. Si tienes dudas sobre efectos concretos, requiere revisión profesional.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-crema/10 p-5 text-sm leading-6 text-crema/65">
        <strong className="text-crema">Límite:</strong> LegalMente no determina aquí si un contrato “es legal”, “es válido” o “conviene firmar”. Si esa es tu pregunta, detén el flujo y solicita revisión profesional.
      </section>
    </ToolShell>
  );
}
