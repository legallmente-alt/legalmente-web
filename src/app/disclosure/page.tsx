import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Disclosure y fuentes — LegalMente",
  description: "Cómo interpreta LegalMente sus fuentes, territorio, claims y límites editoriales.",
};

export default function DisclosurePage() {
  return (
    <LegalDocument
      eyebrow="Transparencia editorial"
      title="Una fuente no convierte automáticamente un texto en consejo jurídico."
      intro="LegalMente separa la fuente, la interpretación editorial, el territorio, la vigencia y la autorización de publicación. Esa separación permite corregir sin fingir certeza donde aún hace falta revisión."
      updated="11 de septiembre de 2026"
    >
      <h2>1. Fuentes y claims</h2>
      <p>Un claim es un registro auditable que conecta una afirmación con una fuente, territorio, vigencia y nivel de certeza. No es una autoridad jurídica ni sustituye la consulta de la fuente oficial. Los claims que requieren verificación jurisdiccional deben permanecer condicionados y no convertirse en conclusiones individualizadas.</p>
      <h2>2. Territorio</h2>
      <p>El idioma español o una explicación panhispánica no significa equivalencia entre países. Materias como laboral, familiar, fiscal, administrativa, penal, societaria y de datos pueden variar por país, estado, municipio, autoridad, fecha y procedimiento.</p>
      <h2>3. Educación frente a asesoría</h2>
      <p>El contenido está redactado para comprensión, preparación y navegación hacia fuentes. No evalúa todos los hechos de un caso, no decide quién tiene razón y no determina si un contrato, trámite o actuación es válido, suficiente, exigible o conveniente.</p>
      <h2>4. Revisión humana</h2>
      <p>La autorización de un asset, una fuente o un source binding no equivale por sí sola a aprobación legal ni a autorización de publicación. Las decisiones sensibles requieren revisión humana autorizada, con fuente oficial, versión, territorio, qualifier y control de cambios.</p>
      <h2>5. Correcciones</h2>
      <p>Si detectas una afirmación desactualizada, una fuente incorrecta o una diferencia territorial, no actúes únicamente con base en esa página. Contrasta la fuente oficial y solicita una revisión por el canal que el proyecto habilite expresamente en el futuro.</p>
      <h2>6. Publicidad y afiliaciones</h2>
      <p>El release actual no declara asesorías, representación, resultados ni afiliaciones profesionales. Cualquier patrocinio, afiliación, contenido pagado o recomendación deberá identificarse de forma visible antes de incorporarse.</p>
    </LegalDocument>
  );
}
