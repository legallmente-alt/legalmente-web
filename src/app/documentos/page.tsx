import NdaIntake from "@/components/NdaIntake";

export const metadata = {
  title: "Documentos guiados — LegalMente",
  description:
    "Preclasificación educativa para preparar documentos corporativos con límites claros y revisión profesional.",
};

export default function DocumentosPage() {
  return (
    <div className="space-y-12">
      <header className="max-w-3xl space-y-5">
        <p className="text-sm uppercase tracking-[0.2em] text-oro">
          Área profesional separada · MVP supervisado · México
        </p>
        <h1 className="font-serif text-4xl leading-tight text-crema sm:text-5xl">
          Preclasifica un NDA antes de contratar su revisión.
        </h1>
        <p className="text-base leading-7 text-crema/75">
          Esta herramienta identifica si una negociación cabe en el alcance de un convenio bilateral simple o si necesita revisión profesional desde el inicio. No redacta ni entrega un contrato.
        </p>
        <p className="border-l-2 border-oro/50 pl-4 text-sm leading-6 text-crema/65">
          Esta ruta profesional para México está separada del archivo educativo panhispánico de LegalMente.
        </p>
        <div className="grid gap-4 pt-3 sm:grid-cols-3">
          {[
            ["1", "Responde sin datos sensibles"],
            ["2", "Detectamos complejidad"],
            ["3", "Descarga un brief de revisión"],
          ].map(([number, text]) => (
            <div key={number} className="border-l border-oro/50 pl-4">
              <span className="text-sm text-oro">{number}</span>
              <p className="mt-1 text-sm text-crema/70">{text}</p>
            </div>
          ))}
        </div>
      </header>

      <NdaIntake />

      <section className="grid gap-6 border-t border-oro/20 pt-10 sm:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-serif text-xl text-oro">Qué hace esta versión</h2>
          <p className="text-sm leading-6 text-crema/70">
            Clasifica el nivel de complejidad y crea un brief descargable. Sus respuestas permanecen en su navegador y no se envían ni almacenan.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="font-serif text-xl text-oro">Qué todavía no hace</h2>
          <p className="text-sm leading-6 text-crema/70">
            No redacta, firma ni certifica contratos; no sustituye revisión profesional y no promete que un documento sea adecuado para una operación concreta.
          </p>
        </div>
      </section>
    </div>
  );
}
