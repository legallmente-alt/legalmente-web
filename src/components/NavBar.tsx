import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Aprender" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/fuentes-y-limites", label: "Fuentes y límites" },
  { href: "/sobre", label: "Sobre LegalMente" },
];

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-oro/20 bg-tinta/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-6">
        <Link href="/" className="font-serif text-xl tracking-wide text-oro">
          LegalMente
        </Link>
        <ul className="flex items-center gap-3 overflow-x-auto text-sm sm:gap-6">
          {links.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link href={link.href} className="text-crema/75 transition hover:text-oro">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
