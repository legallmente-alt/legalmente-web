import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto y revisión profesional — LegalMente",
  description:
    "Canal de contacto editorial y solicitud separada de revisión profesional para operaciones en México.",
};

export default function ContactoPage() {
  return (
    <article className="max-w-3xl space-y-10">
      <header className="space-y-4">
        <h1 className="font-serif text-3xl text-oro">Contacto</h1>
        <p className="text-base leading-7 text-crema/80">
          El canal editorial y la solicitud de servicios profesionales tienen alcances distintos. Elige el motivo antes de escribir.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-sm border border-oro/20 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-oro">LegalMente educativo</p>
          <h2 className="mt-3 font-serif text-xl text-crema">Ideas y colaboraciones</h2>
          <p className="mt-3 text-sm leading-6 text-crema/70">
            Para sugerir temas, corregir una pieza o proponer una colaboración editorial. No abre una consulta jurídica.
          </p>
          <a
            href="mailto:legallmente@gmail.com?subject=LegalMente%20-%20colaboracion%20editorial"
            className="mt-5 inline-block rounded-sm border border-oro px-5 py-3 text-sm text-oro hover:bg-oro hover:text-tinta"
          >
            Escribir sobre contenido
          </a>
        </div>

        <div className="rounded-sm border border-oro/40 bg-oro/[0.06] p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-oro">Servicio profesional · México</p>
          <h2 className="mt-3 font-serif text-xl text-crema">Revisión de NDA corporativo</h2>
          <p className="mt-3 text-sm leading-6 text-crema/70">
            Para solicitar alcance y cotización de una revisión contractual. El envío del mensaje no crea relación abogado-cliente ni garantiza aceptación del asunto.
          </p>
          <a
            href="mailto:legallmente@gmail.com?subject=Solicitud%20de%20revision%20NDA%20-%20Mexico"
            className="mt-5 inline-block rounded-sm bg-oro px-5 py-3 text-sm font-medium text-tinta hover:bg-crema"
          >
            Solicitar alcance y cotización
          </a>
        </div>
      </section>

      <div className="border-l-2 border-oro/40 pl-4 text-sm leading-6 text-crema/65">
        No envíes secretos, documentos completos, datos personales sensibles ni plazos urgentes en el primer mensaje. Espera confirmación de alcance y canal seguro.
      </div>
    </article>
  );
}
