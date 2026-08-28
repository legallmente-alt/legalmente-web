import Link from "next/link";

const links = [
  { href: "/explorar", label: "Explorar" },
  { href: "/explorar#mundos", label: "Mundos" },
  { href: "/sobre", label: "Sobre" },
];

export default function NavBar() {
  return (
    <nav aria-label="Navegación principal" className="sticky top-0 z-50 border-b border-[#102A43]/10 bg-[#F5F0E8]/92 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[1320px] items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          className="shrink-0 text-[15px] font-semibold tracking-[-0.01em] text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-2"
        >
          LegalMente
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-[#102A43]/72 transition-colors hover:text-[#102A43] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/explorar"
            className="ml-1 inline-flex min-h-11 items-center border border-[#102A43] px-4 text-sm font-semibold text-[#102A43] transition-colors hover:bg-[#102A43] hover:text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-2"
          >
            Entender algo
          </Link>
        </div>

        <Link
          href="/explorar"
          className="inline-flex min-h-11 shrink-0 items-center border border-[#102A43] px-3 text-sm font-semibold text-[#102A43] transition-colors hover:bg-[#102A43] hover:text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#102A43] focus:ring-offset-2 sm:hidden"
        >
          Explorar
        </Link>
      </div>
    </nav>
  );
}
