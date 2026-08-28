"use client";

import { FormEvent, useState } from "react";
import ToolShell from "@/components/ToolShell";
import { calculateVacation } from "@/lib/legal-rules";

const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

export default function VacationPage() {
  const [result, setResult] = useState<ReturnType<typeof calculateVacation> | null>(null);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setError("");
      setResult(calculateVacation({
        startDate: String(data.get("startDate")),
        calculationDate: String(data.get("calculationDate")),
        dailySalary: Number(data.get("dailySalary")),
        daysTaken: Number(data.get("daysTaken") || 0),
        premiumPct: Number(data.get("premiumPct") || 25),
      }));
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "No se pudo calcular.");
    }
  }

  return (
    <ToolShell title="Vacaciones MX" eyebrow="Cálculo determinista interno">
      <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-crema/10 bg-white/[0.03] p-6 sm:grid-cols-2">
        <Field label="Fecha de ingreso" name="startDate" type="date" />
        <Field label="Fecha de cálculo" name="calculationDate" type="date" />
        <Field label="Salario diario fijo (MXN)" name="dailySalary" type="number" step="0.01" min="0.01" />
        <Field label="Días ya gozados del periodo" name="daysTaken" type="number" step="1" min="0" defaultValue="0" />
        <Field label="Prima vacacional (%)" name="premiumPct" type="number" step="0.01" min="25" defaultValue="25" />
        <div className="sm:col-span-2">
          <button className="rounded-xl bg-oro px-5 py-3 text-sm font-semibold text-tinta">Calcular estimación</button>
        </div>
      </form>

      {error && <div className="rounded-2xl border border-red-300/25 bg-red-400/10 p-5 text-sm leading-6 text-red-100">{error}</div>}

      {result && (
        <section className="grid gap-4 rounded-2xl border border-oro/25 bg-oro/[0.06] p-6 sm:grid-cols-2">
          <Result label="Días proporcionales devengados" value={result.proportionalDays.toFixed(2)} />
          <Result label="Días pendientes estimados" value={result.pendingDays.toFixed(2)} />
          <Result label="Monto de vacaciones" value={money.format(result.vacationAmount)} />
          <Result label="Prima vacacional" value={money.format(result.premiumAmount)} />
          <div className="sm:col-span-2 border-t border-crema/10 pt-4 text-xs leading-5 text-crema/55">
            Tabla base: LFT arts. 76, 78, 80 y 81, según freeze interno. El motor se detiene para ingreso anterior a 2023 o salario variable/comisiones.
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
