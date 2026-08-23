export default function Footer() {
  return (
    <footer className="mt-24 border-t border-oro/30 px-6 py-8 text-center text-xs text-crema/60">
      <p>
        © {new Date().getFullYear()} LegalMente — divulgación jurídica
        panhispánica. Contenido con fines educativos; no constituye
        asesoría legal.
      </p>
    </footer>
  );
}
