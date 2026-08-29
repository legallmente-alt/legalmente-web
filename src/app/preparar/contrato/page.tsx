import Link from "next/link";

import { syntheticContractPreparationDemo } from "@/lib/contracts/demo";
import { buildContractPreparationOutputs } from "@/lib/contracts/outputs";

const steps = [
  ["01", "Partes y capacidad", "Quién contrata, quién firma y qué representación debe verificarse."],
  ["02", "Objeto y obligaciones", "Qué se acuerda, qué queda fuera y qué debe entregar cada parte."],
  ["03", "Tiempo y pagos", "Fechas de efectos, hitos, vigencia, moneda y condiciones de pago."],
  ["04", "Cambios y riesgos", "Renovación, terminación, confidencialidad, responsabilidad y controversias."],
] as const;

const permittedOutputs = [
  "Contract brief",
  "Mapa de partes y representación",
  "Matriz de obligaciones",
  "Timeline contractual",
  "Calendario de pagos",
  "Información faltante y puntos por revisar",
  "Preguntas para revisión profesional cuando corresponda",
] as const;

const demoOutputs = buildContractPreparationOutputs(syntheticContractPreparationDemo);

const statusLabel: Record<typeof demoOutputs.brief.preparationStatus, string> = {
  MISSING_INPUT: "Falta información esencial",
  TERRITORIAL_RESEARCH_REQUIRED: "Revisión territorial requerida",
  PROFESSIONAL_REVIEW_REQUIRED: "Revisión profesional requerida",
  STRUCTURED_BRIEF_READY: "Preparación estructurada lista",
  DRAFT_ELIGIBILITY_PENDING: "Elegibilidad técnica pendiente",
};

export default function PrepararContratoPage() {
  const primaryFlag = demoOutputs.preparationRedFlags[0];

  return (
    <main className="bg-[#F5F0E8] text-[#102A43]">
      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-24">
        <div className="max-w-[760px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/52">
            Contract Preparation Engine · V1
          </p>
          <h1 className="mt-5 max-w-[12ch] font-serif text-[clamp(3rem,8vw,6.6rem)] font-semibold leading-[0.91] tracking-[-0.055em]">
            Preparar antes de redactar.
          </h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-8 text-[#102A43]/70">
            Una ruta educativa para ordenar las variables de un contrato antes de convertirlas en texto. La experiencia comienza con estructura, territorio y puntos de revisión; no con la promesa de un contrato universal.
          </p>
        </div>

        <div className="mt-12 grid gap-4 border-y border-[#102A43]/12 py-5 text-sm md:grid-cols-3 md:gap-8">
          <div>
            <p className="font-semibold">Estado</p>
            <p className="mt-1 text-[#102A43]/62">Prototipo educativo · fail-closed</p>
          </div>
          <div>
            <p className="font-semibold">Territorio</p>
            <p className="mt-1 text-[#102A43]/62">Debe definirse antes de evaluar reglas locales</p>
          </div>
          <div>
            <p className="font-semibold">Datos</p>
            <p className="mt-1 text-[#102A43]/62">Solo ejemplo sintético; no se reciben casos</p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <section aria-labelledby="ruta-title">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/52">Ruta de preparación</p>
            <h2 id="ruta-title" className="mt-3 font-serif text-3xl tracking-[-0.03em] md:text-4xl">
              Una pregunta por vez, con complejidad detrás.
            </h2>
            <div className="mt-8 divide-y divide-[#102A43]/12 border-t border-[#102A43]/12">
              {steps.map(([number, title, description]) => (
                <div key={number} className="grid gap-3 py-6 sm:grid-cols-[48px_0.72fr_1.28fr] sm:items-start sm:gap-5">
                  <span className="text-xs tabular-nums text-[#102A43]/45">{number}</span>
                  <h3 className="font-serif text-2xl leading-none">{title}</h3>
                  <p className="text-sm leading-6 text-[#102A43]/64">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="border border-[#102A43]/15 bg-[#102A43] p-7 text-[#F5F0E8] md:p-9" aria-labelledby="ejemplo-title">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63D7B0]">Ejemplo sintético · salida real del adapter</p>
            <h2 id="ejemplo-title" className="mt-4 font-serif text-3xl leading-tight">{demoOutputs.brief.summary}</h2>
            <dl className="mt-7 space-y-4 text-sm">
              <div className="border-b border-[#F5F0E8]/12 pb-3">
                <dt className="text-[#F5F0E8]/48">Modo</dt>
                <dd className="mt-1">{demoOutputs.brief.mode}</dd>
              </div>
              <div className="border-b border-[#F5F0E8]/12 pb-3">
                <dt className="text-[#F5F0E8]/48">Partes</dt>
                <dd className="mt-1">{demoOutputs.partyMap.map((party) => party.displayLabel).join(" / ")} · marcadores no identificables</dd>
              </div>
              <div className="border-b border-[#F5F0E8]/12 pb-3">
                <dt className="text-[#F5F0E8]/48">Territorio</dt>
                <dd className="mt-1">{demoOutputs.brief.territoryCode ?? "Pendiente de selección"}</dd>
              </div>
              <div className="border-b border-[#F5F0E8]/12 pb-3">
                <dt className="text-[#F5F0E8]/48">Estado de preparación</dt>
                <dd className="mt-1 text-[#63D7B0]">{statusLabel[demoOutputs.brief.preparationStatus]}</dd>
              </div>
              <div>
                <dt className="text-[#F5F0E8]/48">Siguiente bloqueo</dt>
                <dd className="mt-1 text-[#63D7B0]">{primaryFlag?.message ?? "Sin bloqueo estructural adicional"}</dd>
              </div>
            </dl>
            <p className="mt-8 border-t border-[#F5F0E8]/12 pt-5 text-xs leading-5 text-[#F5F0E8]/58">
              El adapter solo produce preparación estructurada. En V1, <strong className="font-semibold text-[#F5F0E8]/82">realDraftAllowed = false</strong> y no existe vista previa de contrato real.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#102A43]/10 bg-white/45">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-[700px]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/52">Salidas permitidas en V1</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] md:text-5xl">El resultado es un mapa, no una falsa certeza.</h2>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-0 border-t border-[#102A43]/12 md:grid-cols-2">
            {permittedOutputs.map((output, index) => (
              <div key={output} className="flex gap-4 border-b border-[#102A43]/12 py-5 text-sm leading-6">
                <span className="text-xs tabular-nums text-[#102A43]/42">{String(index + 1).padStart(2, "0")}</span>
                <span>{output}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 border-l-2 border-[#102A43]/18 pl-4 text-sm leading-6 text-[#102A43]/66">
            <p><strong className="font-semibold text-[#102A43]">No incluido:</strong> borrador contractual real, validación de poderes, asesoría individualizada, recepción de documentos, PII o pagos.</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/proceso/leer-antes-de-aceptar" className="inline-flex min-h-12 items-center border border-[#102A43] px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#102A43] hover:text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-2">
              Ver ruta antes de firmar →
            </Link>
            <Link href="/confianza" className="inline-flex min-h-12 items-center px-2 py-3 text-sm font-semibold text-[#102A43]/72 underline decoration-[#102A43]/30 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-2">
              Fuentes y límites
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
