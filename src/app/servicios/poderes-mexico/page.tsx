import { PILOT_ACTIVATION } from "@/lib/business-pilot-gates";

const proposedScope = [
  "Una sociedad mercantil mexicana.",
  "Una persona representante o apoderada principal.",
  "Un acto u operación corporativa declarada.",
  "Un instrumento principal de poder o representación.",
  "Documentos corporativos de soporte estrictamente necesarios.",
  "Una ronda de aclaraciones y entrega con QA humano.",
];

const stopRules = [
  "Entidad extranjera o estructura transfronteriza.",
  "Litigio o poder procesal como objetivo principal.",
  "Materia penal, fiscal principal o laboral especializada.",
  "Sector regulado no cubierto o entidad pública.",
  "Conflicto de interés, falta de responsable profesional o canal seguro.",
  "Solicitud de garantía absoluta de validez o eficacia.",
];

const reviewSignals = [
  "Actos de dominio, bienes inmuebles o facultades especiales.",
  "Títulos de crédito u operaciones que exijan análisis especial.",
  "Sustitución, delegación, revocación o cadena de poderes.",
  "Instrumentos antiguos o dudas sobre vigencia.",
  "Órganos colegiados o acuerdos corporativos complejos.",
  "Necesidad de verificación registral, notarial o local adicional.",
];

export default function PoderesMexicoServicePage() {
  const activation = PILOT_ACTIVATION;
  const commercialReady = activation.capabilities.canShowActiveCommercialOffer;

  return (
    <article className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-oro/80">
          <span>Ruta profesional separada</span>
          <span aria-hidden="true">·</span>
          <span>México corporativo</span>
          <span aria-hidden="true">·</span>
          <span>{commercialReady ? "Gate técnico listo" : "Candidato inactivo"}</span>
        </div>

        <h1 className="font-serif text-4xl leading-tight text-crema sm:text-5xl">
          Revisión de Poderes y Representación Corporativa
        </h1>

        <p className="max-w-3xl text-base leading-7 text-crema/80">
          Esta es la vía comercial adoptada para preparar, no activar. El alcance
          definitivo, precio y SLA siguen sujetos a la decisión humana D-R2-03.
          No se reciben documentos, datos personales ni pagos desde esta página.
        </p>

        <div className="rounded-xl border border-acento-miel/40 bg-acento-miel/10 p-5 text-sm leading-6 text-crema/75">
          <strong className="text-crema">Estado:</strong>{" "}
          D-R2-03 abierto · {activation.g2Ready ? "G2 listo" : "G2 bloqueado"} ·{" "}
          {activation.g4ActivationReady ? "G4-B listo" : "G4-B bloqueado"}.{" "}
          {!commercialReady
            ? "Contratación, documentos y pago permanecen deshabilitados."
            : "Un gate técnico listo no sustituye la autorización humana de activación."}
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-crema/10 p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">
            G2 · Responsabilidad profesional
          </p>
          <p className="mt-2 text-2xl font-semibold text-crema">
            {activation.missingG2.length === 0
              ? "READY"
              : `${activation.missingG2.length} requisitos pendientes`}
          </p>
          <p className="mt-2 text-xs leading-5 text-crema/55">
            Identidad y credencial, territorio, parte contratante, conflictos,
            privacidad, canal seguro, QA y modelo fiscal.
          </p>
        </div>

        <div className="rounded-xl border border-crema/10 p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">
            D-R2-03 · Alcance comercial
          </p>
          <p className="mt-2 text-2xl font-semibold text-crema">OPEN</p>
          <p className="mt-2 text-xs leading-5 text-crema/55">
            Falta decisión humana sobre alcance fijo, límite documental, exclusiones,
            precio fijo y SLA. La recomendación operativa no equivale a aprobación.
          </p>
        </div>
      </section>

      <section className="space-y-5 rounded-xl border border-oro/20 bg-crema/[0.03] p-6 sm:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">
            Borrador para decisión
          </p>
          <h2 className="mt-2 font-serif text-2xl text-crema">
            Unidad de servicio propuesta
          </h2>
          <p className="mt-2 text-sm leading-6 text-crema/60">
            Estos límites son una propuesta de preparación. No están aprobados como
            oferta pública.
          </p>
        </div>
        <ul className="grid gap-3 text-sm leading-6 text-crema/75 sm:grid-cols-2">
          {proposedScope.map((item) => (
            <li key={item} className="rounded-lg border border-crema/10 p-4">
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs leading-5 text-crema/50">
          El límite exacto de documentos y páginas permanece PENDING_FOUNDER_DECISION.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-acento-oxblood/35 bg-acento-oxblood/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-crema/55">STOP propuesto</p>
          <h2 className="mt-2 font-serif text-2xl text-crema">Fuera del piloto</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-crema/75">
            {stopRules.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-acento-cobre/35 bg-acento-cobre/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-crema/55">REVIEW propuesto</p>
          <h2 className="mt-2 font-serif text-2xl text-crema">Escalamiento previo</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-crema/75">
            {reviewSignals.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">Entregable propuesto</p>
          <h2 className="mt-2 font-serif text-2xl text-crema">
            Informe humano acotado, no certificación automática
          </h2>
        </div>
        <p className="max-w-3xl text-sm leading-6 text-crema/75">
          El borrador prevé documentar la cadena de representación presentada,
          facultades relevantes, limitaciones, inconsistencias, faltantes, relación
          con el acto declarado, verificaciones adicionales y límites del informe.
          Ninguna salida se entrega sin QA humano durante el piloto.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-crema/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">SLA</p>
          <p className="mt-2 font-serif text-2xl text-crema">5 días · hipótesis</p>
          <p className="mt-3 text-sm leading-6 text-crema/65">
            Es una banda interna de planeación para documentos corporativos/poderes.
            No es una promesa pública y sigue pendiente de D-R2-03.
          </p>
        </div>
        <div className="rounded-xl border border-crema/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">Precio</p>
          <p className="mt-2 font-serif text-2xl text-crema">Pendiente</p>
          <p className="mt-3 text-sm leading-6 text-crema/65">
            El patrón recomendado es precio fijo para alcance fijo. No existe un
            importe aprobado y no se reutiliza la hipótesis económica del laboratorio NDA.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-crema/10 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-oro/70">
          Intake y privacidad
        </p>
        <h2 className="mt-2 font-serif text-2xl text-crema">
          Primero preflight; después identidad y documentos
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-crema/70">
          El futuro preflight de poderes solo podrá usar datos estructurados del
          supuesto, sin nombre, empresa, número de instrumento, notaría, RFC, correo
          ni archivo. La identidad y el documento solo podrán pedirse después de
          cerrar G2, conflicto, aviso de privacidad y canal seguro.
        </p>
      </section>

      <section className="space-y-3 border-t border-crema/10 pt-7 text-xs leading-5 text-crema/50">
        <p>
          Estado comercial: INACTIVO. PII: OFF. Documentos: OFF. Pago: OFF. Casos reales: OFF.
        </p>
        <p>
          LegalMente permanece como marca educativa. La prestación profesional deberá
          identificar expresamente a su responsable, territorio, objeto y condiciones.
        </p>
      </section>
    </article>
  );
}
