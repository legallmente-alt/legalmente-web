export default function Footer() {
  return (
    <footer className="mt-24 border-t border-oro/30 px-6 py-8 text-center text-xs text-crema/60">
      <p>
        © {new Date().getFullYear()} LegalMente — divulgación jurídica
        panhispánica. Contenido con fines educativos; no constituye
        asesoría legal.
      </p>
      <p className="mx-auto mt-2 max-w-2xl">
        El archivo educativo y el área profesional México son recorridos separados. Los briefs no son contratos y no sustituyen la revisión de la legislación, la operación y las partes antes de firmar.
      </p>
    </footer>
  );
}
