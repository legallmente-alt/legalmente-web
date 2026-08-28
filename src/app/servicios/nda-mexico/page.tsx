import Link from "next/link";
import { PILOT_ACTIVATION } from "@/lib/business-pilot-gates";

const includes = [
  "Revisión acotada de un NDA/acuerdo de confidencialidad en español.",
  "Documento con territorio principal en México.",
  "Hasta 10 páginas en el piloto inicial.",
  "Hallazgos, puntos de atención, preguntas pendientes y próximos pasos.",
  "QA humano antes de cualquier entrega profesional real.",
];

const excludes = [
  "Litigio, disputa o urgencia incompatible con el servicio.",
  "Materias penal, fiscal, laboral o reguladas.",
  "Documentos que involucren dos o más países.",
  "No competencia material o central.",
  "Representación, negociación con contraparte o garantía de resultado.",
  "Asesoría ilimitada o revisión de documentos distintos de NDA.",
];

const flow = [
  "Preflight sin PII ni documento.",
  "Admisibilidad y conflicto por persona responsable.",
  "Presentación de alcance, identidad del prestador, precio total y términos.",
  "Aceptación y pago, solo cuando G2 y G4-B estén habilitados.",
  "Canal seguro para el documento.",
  "Revisión profesional, QA, entrega y cierre.",
];

export default function NdaMexicoServicePage() {
  const activation = PILOT_ACTIVATION;
  const commercialReady = activation.capabilities.canShowActiveCommercialOffer;

  return (
    <article className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-oro/80">
          <span>Ruta profesional separada</span>
          <span aria-hidden="true">·</span>
          <span>México</span>
          <span aria-hidden="true">·</span>
          <span>{commercialReady ? "Piloto habilitado" : "Piloto en preparación"}</span>
        </div>
        <h1 className="font-serif text-4xl leading-tight text-crema sm:text-5xl">
          Revisión acotada de NDA
        </h1>
        <p className="max-w-3xl text-base leading-7 text-crema/80">
          LegalMente está preparando un piloto limitado para revisar un NDA simple en México. La ruta profesional está separada del contenido educativo y solo puede activarse cuando sus gates de responsabilidad y contratación tengan evidencia aprobada.
        </p>
        <div className="rounded-xl border border-acento-miel/40 bg-acento-miel/10 p-5 text-sm leading-6 text-crema/75">
          <strong className="text-crema">Estado derivado del sistema:</strong>{" "}
          {activation.g2Ready ? "G2 listo" : "G2 bloqueado"}; {" "}
          {activation.g4ActivationReady ? "G4-B listo" : "G4-B bloqueado"}. {" "}
          {!commercialReady
            ? "No están habilitados contratación, pago ni recepción de documentos."
            : "La activación comercial requiere además la decisión humana de publicación correspondiente."}
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-crema/10 p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">G2 · Responsabilidad</p>
          <p className="mt-2 text-2xl font-semibold text-crema">
            {activation.missingG2.length === 0 ? "READY" : `${activation.missingG2.length} requisitos pendientes`}
          </p>
          <p className="mt-2 text-xs leading-5 text-crema/55">
            Identidad y credencial profesional, territorio, parte contratante, conflictos, privacidad, canal seguro, QA y modelo fiscal.
          </p>
        </div>
        <div className="rounded-xl border border-crema/10 p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">G4-B · Activación comercial</p>
          <p className="mt-2 text-2xl font-semibold text-crema">
            {activation.missingG4.length === 0 ? "READY" : `${activation.missingG4.length} requisitos pendientes`}
          </p>
          <p className="mt-2 text-xs leading-5 text-crema/55">
            Precio público, términos, cancelación/reembolso, evidencia de transacción y mecanismo de pago.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-crema/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">Incluye</p>
          <h2 className="mt-2 font-serif text-2xl text-crema">Alcance inicial</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-crema/75">
            {includes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-crema/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">No incluye</p>
          <h2 className="mt-2 font-serif text-2xl text-crema">Stop desde el inicio</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-crema/75">
            {excludes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-5 rounded-xl border border-oro/20 bg-crema/[0.03] p-6 sm:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-oro/70">Proceso previsto</p>
          <h2 className="mt-2 font-serif text-2xl text-crema">Primero admisibilidad; después documentos</h2>
        </div>
        <ol className="grid gap-3 text-sm leading-6 text-crema/75">
          {flow.map((item, index) => (
            <li key={item} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-oro/30 text-xs text-oro">
                {index + 1}
              </span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.16em] text-oro/70">Precio y contratación</p>
        <h2 className="font-serif text-2xl text-crema">
          {commercialReady ? "Gate técnico listo; publicación aún requiere decisión humana" : "Todavía no hay oferta activa"}
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-crema/75">
          Existe una hipótesis económica interna para medir el piloto, pero no se muestra como tarifa vigente. El precio público solo se habilitará cuando estén definidos y aprobados el prestador real, impuestos, coste profesional, términos, cancelación/reembolso y mecanismo de pago.
        </p>
      </section>

      <section className="rounded-xl border border-oro/30 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-oro/70">Puedes probar ahora</p>
        <h2 className="mt-2 font-serif text-2xl text-crema">Prepara el alcance sin compartir información sensible</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-crema/70">
          El preflight trabaja únicamente con respuestas de alcance. No pide nombre, correo, empresa, contraparte ni texto contractual; tampoco permite subir archivos.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/preparar/nda-mexico"
            className="rounded-lg bg-oro px-5 py-3 text-sm font-semibold text-tinta transition hover:brightness-110"
          >
            Probar preflight
          </Link>
          {!commercialReady ? (
            <span className="rounded-lg border border-crema/15 px-5 py-3 text-sm text-crema/55">
              Contratación deshabilitada
            </span>
          ) : null}
        </div>
      </section>

      <section className="space-y-4 border-t border-crema/10 pt-7">
        <h2 className="font-serif text-xl text-crema">Separación de roles</h2>
        <p className="max-w-3xl text-sm leading-6 text-crema/65">
          LegalMente sigue siendo la marca educativa. Cualquier revisión profesional real deberá identificar expresamente a la persona o entidad responsable, su territorio, objeto, límites y condiciones antes de que exista una relación profesional.
        </p>
      </section>
    </article>
  );
}
