import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/sobre", label: "Sobre LegalMente" },
  { href: "/areas-de-practica", label: "Áreas de práctica" },
  { href: "/catalogo", label: "Catálogo editorial" },
  { href: "/casos", label: "Casos y ejemplos" },
  { href: "/contacto", label: "Contacto" },
];

export default function NavBar() {
  return (
    <nav className="w-full border-b border-oro/30 bg-tinta/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-serif text-lg tracking-wide text-oro">
          LegalMente
        </Link>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-crema hover:text-oro">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
