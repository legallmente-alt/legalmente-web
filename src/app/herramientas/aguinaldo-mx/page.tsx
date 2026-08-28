"use client";

import { FormEvent, useState } from "react";
import ToolShell from "@/components/ToolShell";
import { calculateAguinaldo } from "@/lib/legal-rules";

const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

export default function AguinaldoPage() {
  const [result, setResult] = useState<ReturnType<typeof calculateAguinaldo> | null>(null);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setError("");
      setResult(calculateAguinaldo({
        startDate: String(data.get("startDate")),
        endDate: String(data.get("endDate")),
        dailySalary: Number(data.get("dailySalary")),
        contractualDays: Number(data.get("contractualDays") || 15),
        unexcusedAbsences: Number(data.get("unexcusedAbsences") || 0),
      }));
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "No se pudo calcular.");
    }
  }

  return (
    <ToolShell title="Aguinaldo MX" eyebrow="Cálculo determinista interno">
      <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-crema/10 bg-white/[0.03] p-6 sm:grid-cols-2">
        <Field label="Inicio del periodo en el año" name="startDate" type="date" />
        <Field label="Fin del periodo en el año" name="endDate" type="date" />
        <Field label="Salario diario fijo (MXN)" name="dailySalary" type="number" step="0.01" min="0.01" />
        <Field label="Días de aguinaldo pactados" name="contractualDays" type="number" step="1" min="15" defaultValue="15" />
        <Field label="Faltas injustificadas indicadas" name="unexcusedAbsences" type="number" step="1" min="0" defaultValue="0" />
        <div className="sm:col-span-2">
          <button className="rounded-xl bg-oro px-5 py-3 text-sm font-semibold text-tinta">Calcular estimación</button>
        </div>
      </form>

      <div className="rounded-2xl border border-crema/10 p-5 text-xs leading-5 text-crema/55">
        Este prototipo replica el freeze jurídico actual. El tratamiento de ausencias debe permanecer sujeto a revisión de control antes de una publicación pública.
      </div>

      {error && <div className="rounded-2xl border border-red-300/25 bg-red-400/10 p-5 text-sm leading-6 text-red-100">{error}</div>}

      {result && (
        <section className="grid gap-4 rounded-2xl border border-oro/25 bg-oro/[0.06] p-6 sm:grid-cols-2">
          <Result label="Días calendario del periodo" value={String(result.calendarDays)} />
          <Result label="Días computados" value={String(result.effectiveDays)} />
          <Result label="Días proporcionales de aguinaldo" value={result.proportionalDays.toFixed(4)} />
          <Result label="Monto bruto estimado" value={money.format(result.total)} />
          <div className="sm:col-span-2 border-t border-crema/10 pt-4 text-xs leading-5 text-crema/55">
            Base de freeze: LFT art. 87. No calcula ISR/IMSS ni salario variable.
          </div>
        </section>
      )}
    </ToolShell>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  const { label, ...input } = props;
  return <label className="space-y-2"><span className="block text-sm text-crema/70">{label}</span><input {...input} required className="w-full rounded-xl border border-crema/15 bg-tinta px-4 py-3 text-crema outline-none focus:border-oro" /></label>;
}
function Result({ label, value }: { label: string; value: string }) {
  return <div><div className="text-xs uppercase tracking-[0.15em] text-crema/45">{label}</div><div className="mt-1 font-serif text-2xl text-crema">{value}</div></div>;
}
