const areas = [
  "Derecho civil y contratos",
  "Derecho laboral",
  "Derecho de familia",
  "Derecho penal — nociones generales",
  "Derecho mercantil / societario",
  "Derecho administrativo",
];

export default function AreasDePracticaPage() {
  return (
    <article className="space-y-6">
      <h1 className="font-serif text-3xl text-oro">Áreas de práctica</h1>
      <p className="text-crema/85">
        Estas son las áreas jurídicas que iremos cubriendo con contenido
        educativo. Cada área se explica primero desde su núcleo
        transversal (Capa A) y solo se ancla a un país cuando es
        indispensable (Capa C).
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {areas.map((area) => (
          <li
            key={area}
            className="rounded-sm border border-oro/20 px-4 py-3 text-sm text-crema/80"
          >
            {area}
          </li>
        ))}
      </ul>
    </article>
  );
}
