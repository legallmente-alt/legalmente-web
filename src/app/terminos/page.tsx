import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Términos de uso — LegalMente",
  description: "Términos públicos del release educativo de LegalMente.",
};

export default function TerminosPage() {
  return (
    <LegalDocument
      eyebrow="Términos públicos"
      title="Usar LegalMente es aprender, no delegar una decisión jurídica."
      intro="Estos términos describen el alcance actual del release educativo estático y sus límites. No habilitan servicios profesionales ni intake de casos."
      updated="11 de septiembre de 2026"
    >
      <h2>1. Qué ofrece el sitio</h2>
      <p>LegalMente organiza explicaciones, conceptos, procesos, fuentes y preguntas de preparación general. El contenido puede ayudar a ordenar una conversación o una investigación, pero no sustituye el análisis de hechos completos, la ley aplicable ni la revisión profesional.</p>
      <h2>2. Qué no ofrece</h2>
      <p>El sitio no presta asesoría jurídica individual, representación, dictámenes, validación de contratos, determinación de derechos, diagnóstico de riesgos para un caso concreto ni promesas de resultado. La herramienta “Antes de firmar” es una guía estructural de lectura y verificación.</p>
      <h2>3. Territorio y fuentes</h2>
      <p>El release educativo usa México como territorio de referencia en sus controles actuales. Una explicación general no implica que la misma regla aplique en otro país, estado, municipio, materia o fecha. Las fuentes, versiones y límites deben leerse junto con cada contenido cuando estén disponibles.</p>
      <h2>4. No envíes información sensible</h2>
      <p>No envíes nombres, documentos, expedientes, datos de salud, credenciales, información financiera, datos de menores ni detalles identificables de una situación jurídica. El canal de contacto está cerrado para casos y datos personales.</p>
      <h2>5. Uso responsable</h2>
      <p>No uses el sitio para automatizar decisiones sobre personas, presentar una explicación educativa como autoridad oficial, ocultar información relevante a un profesional o publicar una conclusión sobre otra persona. Verifica la fuente oficial y la vigencia antes de actuar.</p>
      <h2>6. Cambios y correcciones</h2>
      <p>El contenido puede cambiar por correcciones editoriales, cambios normativos, decisiones de producto o revisión territorial. Una página no debe considerarse actualizada solo por seguir disponible.</p>
      <h2>7. Aceptación y límites</h2>
      <p>Al navegar, reconoces este alcance. Si necesitas saber si una norma aplica a tu situación, si un documento es válido o qué acción tomar, busca asesoría profesional en la jurisdicción correspondiente.</p>
    </LegalDocument>
  );
}
