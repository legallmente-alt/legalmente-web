"use client";

import { FormEvent, useState } from "react";
import ToolShell from "@/components/ToolShell";
import { calculateFiniquitoDevengado } from "@/lib/legal-rules";

const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

export default function FiniquitoDevengadoPage() {
  const [result, setResult] = useState<ReturnType<typeof calculateFiniquitoDevengado> | null>(null);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setError("");
      setResult(calculateFiniquitoDevengado({
        startDate: String(data.get("startDate")),
        terminationDate: String(data.get("terminationDate")),
        dailySalary: Number(data.get("dailySalary")),
        unpaidSalaryDays: Number(data.get("unpaidSalaryDays") || 0),
        vacationPremiumPct: Number(data.get("vacationPremiumPct") || 25),
        contractualAguinaldoDays: Number(data.get("contractualAguinaldoDays") || 15),
        unexcusedAbsences: Number(data.get("unexcusedAbsences") || 0),
        vacationDaysAlreadyEnjoyed: Number(data.get("vacationDaysAlreadyEnjoyed") || 0),
      }));
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "No se pudo calcular.");
    }
  }

  return (
    <ToolShell title="Finiquito devengado MX" eyebrow="Alcance restringido · beta interna">
      <div className="rounded-2xl border border-amber-300/25 bg-amber-300/10 p-5 text-sm leading-6 text-amber-50">
        <strong>Este motor NO calcula liquidación total.</strong> Solo suma salarios pendientes, aguinaldo proporcional, vacaciones proporcionales y prima vacacional. Indemnizaciones, prima de antigüedad, 20 días por año, salarios caídos, ISR/IMSS y prestaciones extralegales permanecen fuera de este cálculo.
      </div>

      <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-crema/10 bg-white/[0.03] p-6 sm:grid-cols-2">
        <Field label="Fecha de ingreso" name="startDate" type="date" />
        <Field label="Fecha de terminación" name="terminationDate" type="date" />
        <Field label="Salario diario fijo (MXN)" name="dailySalary" type="number" step="0.01" min="0.01" />
        <Field label="Días de salario pendientes" name="unpaidSalaryDays" type="number" step="1" min="0" defaultValue="0" />
        <Field label="Prima vacacional (%)" name="vacationPremiumPct" type="number" step="0.01" min="25" defaultValue="25" />
        <Field label="Días de aguinaldo pactados" name="contractualAguinaldoDays" type="number" step="1" min="15" defaultValue="15" />
        <Field label="Faltas injustificadas indicadas" name="unexcusedAbsences" type="number" step="1" min="0" defaultValue="0" />
        <Field label="Vacaciones ya gozadas del periodo" name="vacationDaysAlreadyEnjoyed" type="number" step="1" min="0" defaultValue="0" />
        <div className="sm:col-span-2">
          <button className="rounded-xl bg-oro px-5 py-3 text-sm font-semibold text-tinta">Calcular prestaciones devengadas</button>
        </div>
      </form>

      {error && <div className="rounded-2xl border border-red-300/25 bg-red-400/10 p-5 text-sm leading-6 text-red-100">{error}</div>}

      {result && (
        <section className="space-y-5 rounded-2xl border border-oro/25 bg-oro/[0.06] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Result label="Salarios pendientes" value={money.format(result.pendingWages)} />
            <Result label="Aguinaldo proporcional" value={money.format(result.aguinaldo)} />
            <Result label="Vacaciones proporcionales" value={money.format(result.vacations)} />
            <Result label="Prima vacacional" value={money.format(result.vacationPremium)} />
          </div>
          <div className="border-t border-crema/10 pt-5">
            <div className="text-xs uppercase tracking-[0.16em] text-oro">Total bruto estimado dentro del alcance</div>
            <div className="mt-2 font-serif text-4xl text-crema">{money.format(result.total)}</div>
          </div>
          <p className="text-xs leading-5 text-crema/55">El resultado no determina qué indemnizaciones podrían corresponder ni la calificación jurídica de una terminación laboral.</p>
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
