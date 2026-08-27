export default function ContactoPage() {
  return (
    <article className="space-y-6">
      <h1 className="font-serif text-3xl text-oro">Contacto</h1>
      <p className="text-crema/85">
        ¿Tienes una pregunta, sugerencia o quieres colaborar con
        LegalMente? Escríbenos.
      </p>
      <form className="grid gap-4 sm:max-w-md">
        <input
          type="text"
          placeholder="Nombre"
          className="rounded-sm border border-oro/30 bg-transparent px-4 py-3 text-sm text-crema placeholder:text-crema/40"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="rounded-sm border border-oro/30 bg-transparent px-4 py-3 text-sm text-crema placeholder:text-crema/40"
        />
        <textarea
          placeholder="Mensaje"
          rows={5}
          className="rounded-sm border border-oro/30 bg-transparent px-4 py-3 text-sm text-crema placeholder:text-crema/40"
        />
        <button
          type="submit"
          className="rounded-sm border border-oro px-6 py-3 text-sm uppercase tracking-wide text-oro hover:bg-oro hover:text-tinta"
        >
          Enviar
        </button>
      </form>
      <p className="text-xs text-crema/50">
        Nota técnica: este formulario aún no está conectado a un backend.
        Fase 2 de automatización: registrar cada envío como «mensaje
        directo» para la métrica de éxito del manual de marca.
      </p>
    </article>
  );
}
