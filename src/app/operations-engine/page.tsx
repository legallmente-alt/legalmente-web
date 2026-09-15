import { operationsEngineV12 as engine } from "@/data/operations-engine-v1-2";
import { contractCaseResults, allContractCasesPass } from "@/lib/operations-engine/contract-cases";

const statusRows = [
  ["Publicación", engine.gates.publication],
  ["Imágenes", engine.gates.images],
  ["Automatización", engine.gates.automation],
  ["Analytics", engine.gates.analytics],
  ["PII", engine.gates.pii],
] as const;

export default function OperationsEnginePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16 text-[#102A43]">
      <div className="mb-10 rounded-2xl border border-[#C77C4D]/30 bg-[#F5F0E8] p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#C77C4D]">Internal QA surface</p>
        <h1 className="text-4xl font-semibold tracking-tight">Operations Engine {engine.version}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#102A43]/80">
          Esta superficie muestra únicamente metadatos derivados para revisión. No contiene claims publicados,
          datos personales ni controles para activar producción.
        </p>
      </div>

      <section aria-labelledby="provenance-heading" className="mb-10 rounded-xl border border-[#102A43]/10 bg-white p-5 text-sm leading-6">
        <h2 id="provenance-heading" className="font-semibold">Provenance del paquete</h2>
        <p className="mt-2">Clase: <code>{engine.provenance.kind}</code> · observado: <code>{engine.provenance.observedAt}</code> · freshness: <code>{engine.provenance.freshness}</code></p>
        <p className="mt-2 text-[#102A43]/70">Fuente: {engine.provenance.source}. Estos conteos son derivados históricos del paquete, no estado vivo ni autoridad jurídica.</p>
      </section>

      <section aria-labelledby="counts-heading">
        <h2 id="counts-heading" className="mb-4 text-2xl font-semibold">Paquete de trabajo</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(engine.counts).map(([label, value]) => (
            <div key={label} className="rounded-xl border border-[#102A43]/10 bg-white p-5 shadow-sm">
              <p className="text-sm text-[#102A43]/65">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-[#102A43]">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="gate-heading" className="mt-12">
        <h2 id="gate-heading" className="mb-4 text-2xl font-semibold">Gates fail-closed</h2>
        <div className="overflow-hidden rounded-xl border border-[#102A43]/10 bg-white">
          {statusRows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-[#102A43]/10 px-5 py-4 last:border-b-0">
              <span className="text-sm font-medium">{label}</span>
              <code className="rounded bg-[#E8E2D5] px-2 py-1 text-xs font-semibold">{value}</code>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="probe-heading" className="mt-12">
        <h2 id="probe-heading" className="mb-4 text-2xl font-semibold">Prueba de procedencia</h2>
        <div className="rounded-xl border border-[#C77C4D]/40 bg-[#C77C4D]/10 p-5 text-sm leading-6">
          <p><strong>Contract red-team:</strong> {allContractCasesPass ? "ALL_CASES_PASS" : "CASE_FAILURE"}</p>
          <div className="mt-3 space-y-2 text-[#102A43]/80">
            {contractCaseResults.map((testCase) => (
              <p key={testCase.name}><code>{testCase.actual === testCase.expected ? "PASS" : "FAIL"}</code> — {testCase.name}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="research-heading" className="mt-12">
        <h2 id="research-heading" className="mb-4 text-2xl font-semibold">Estados de investigación</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(engine.researchStatuses).map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-xl border border-[#102A43]/10 bg-white px-5 py-4">
              <span className="text-sm">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-12 rounded-xl border border-[#63D7B0]/50 bg-[#63D7B0]/10 p-5 text-sm leading-6">
        <strong>Estado de revisión:</strong> {engine.classification}. Quedan {engine.humanDecisionsPending} decisiones humanas pendientes.
      </footer>
    </main>
  );
}
