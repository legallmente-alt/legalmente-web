"use client";

export function AdvisorQuestions({ questions }: { questions: [string, string, string] }) {
  return (
    <section className="lm-print-avoid-break mt-8 border border-[#102A43]/15 bg-white/60 p-6" aria-labelledby="advisor-questions-title">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102A43]/50">Siguiente conversación</p>
      <h2 id="advisor-questions-title" className="mt-2 font-serif text-3xl leading-tight">3 Preguntas para tu Abogado</h2>
      <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6">
        {questions.map((question) => <li key={question}>{question}</li>)}
      </ol>
    </section>
  );
}

export function PrintSummaryButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="mt-5 inline-flex min-h-12 items-center border border-[#102A43] bg-[#102A43] px-5 text-sm font-semibold text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#63D7B0] focus:ring-offset-2 print:hidden"
    >
      Descargar Resumen para mi Abogado
    </button>
  );
}

export function PrintSummarySheet({ title, body, questions }: { title: string; body: string; questions: [string, string, string] }) {
  return (
    <div className="lm-print-sheet" aria-hidden="true">
      <h2 className="font-serif text-4xl">{title}</h2>
      <p className="mt-5 text-base leading-7">{body}</p>
      <h2 className="mt-8 font-serif text-2xl">3 Preguntas para tu Abogado</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6">
        {questions.map((question) => <li key={question}>{question}</li>)}
      </ol>
    </div>
  );
}
