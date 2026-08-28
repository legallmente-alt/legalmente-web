export type World = {
  id: string;
  title: string;
  summary: string;
  seriesIds: readonly string[];
  relatedWorldIds: readonly string[];
};

export type Series = {
  id: string;
  worldId: string;
  title: string;
  summary: string;
  chapterIds: readonly string[];
};

export type Chapter = {
  id: string;
  seriesId: string;
  number: number;
  title: string;
  summary: string;
  conceptIds: readonly string[];
  processIds: readonly string[];
};

export type Concept = {
  id: string;
  title: string;
  summary: string;
  appearsIn: readonly string[];
  relatedConceptIds: readonly string[];
  processIds: readonly string[];
  historyNote?: string;
  jurisdictionNote: string;
};

export type Process = {
  id: string;
  title: string;
  summary: string;
  steps: readonly string[];
  evidence: readonly string[];
  territoryNote: string;
  relatedConceptIds: readonly string[];
};

export const worlds: readonly World[] = [
  {
    id: "vida-cotidiana",
    title: "Vida cotidiana",
    summary: "Consentimiento, propiedad, familia, obligaciones y decisiones que producen efectos jurídicos aunque parezcan ordinarias.",
    seriesIds: ["consentimiento-y-obligaciones"],
    relatedWorldIds: ["tecnologia-ia", "empresa-comercio"],
  },
  {
    id: "empresa-comercio",
    title: "Empresa y comercio",
    summary: "Contratos, representación, sociedades, relaciones de trabajo, gobierno y actividad económica.",
    seriesIds: ["empresa-que-obliga"],
    relatedWorldIds: ["vida-cotidiana", "conflicto-prueba", "tecnologia-ia"],
  },
  {
    id: "conflicto-prueba",
    title: "Conflicto, proceso y prueba",
    summary: "Cómo se ordenan hechos, pretensiones, defensa, evidencia y procedimiento antes de una decisión institucional.",
    seriesIds: ["hechos-y-prueba"],
    relatedWorldIds: ["salud-medicina", "movilidad-transporte", "conducta-penal"],
  },
  {
    id: "salud-medicina",
    title: "Salud y medicina",
    summary: "Ejercicio profesional, deberes, documentación, evidencia clínica y responsabilidades con límites territoriales visibles.",
    seriesIds: ["responsabilidad-profesional-salud"],
    relatedWorldIds: ["conflicto-prueba", "conducta-penal"],
  },
  {
    id: "tecnologia-ia",
    title: "Tecnología e inteligencia artificial",
    summary: "Consentimiento digital, datos, software, plataformas, automatización y nuevas formas de riesgo y responsabilidad.",
    seriesIds: ["consentimiento-digital"],
    relatedWorldIds: ["vida-cotidiana", "empresa-comercio", "conflicto-prueba"],
  },
  {
    id: "movilidad-transporte",
    title: "Movilidad y transporte",
    summary: "Hechos de tránsito, transporte, empresa, seguros, evidencia y consecuencias civiles, administrativas o penales según el supuesto.",
    seriesIds: ["hechos-de-transito"],
    relatedWorldIds: ["conflicto-prueba", "conducta-penal", "empresa-comercio"],
  },
  {
    id: "conducta-penal",
    title: "Conducta y derecho penal",
    summary: "Conducta, tipicidad, culpabilidad, prueba y proceso, con conexiones a psicología, criminología y sociedad.",
    seriesIds: ["conducta-y-responsabilidad"],
    relatedWorldIds: ["conflicto-prueba", "salud-medicina", "movilidad-transporte"],
  },
  {
    id: "historia-sistemas",
    title: "Historia, sistemas y derecho comparado",
    summary: "Origen de conceptos, derecho romano, codificación, familias jurídicas y comparación entre instituciones.",
    seriesIds: ["de-roma-al-codigo"],
    relatedWorldIds: ["vida-cotidiana", "empresa-comercio", "conducta-penal"],
  },
] as const;

export const series: readonly Series[] = [
  { id: "consentimiento-y-obligaciones", worldId: "vida-cotidiana", title: "Consentimiento y obligaciones", summary: "De un acto cotidiano a una relación jurídica comprensible.", chapterIds: ["consentimiento-no-es-solo-firma", "obligacion-y-consecuencia"] },
  { id: "empresa-que-obliga", worldId: "empresa-comercio", title: "Quién obliga a la empresa", summary: "Representación, facultades y efectos frente a terceros.", chapterIds: ["representacion-empresa", "poder-y-vigencia"] },
  { id: "hechos-y-prueba", worldId: "conflicto-prueba", title: "De los hechos a la prueba", summary: "Cómo una versión de lo ocurrido se convierte en materia de procedimiento.", chapterIds: ["hechos-ordenados", "hechos-y-evidencia"] },
  { id: "responsabilidad-profesional-salud", worldId: "salud-medicina", title: "Responsabilidad profesional en salud", summary: "Deberes, documentación, evidencia y rutas institucionales sin diagnosticar casos individuales.", chapterIds: ["deber-profesional", "expediente-y-prueba"] },
  { id: "consentimiento-digital", worldId: "tecnologia-ia", title: "Consentimiento digital", summary: "Qué cambia cuando aceptar ocurre en una pantalla.", chapterIds: ["aceptar-en-software", "datos-y-condiciones"] },
  { id: "hechos-de-transito", worldId: "movilidad-transporte", title: "Hechos de tránsito", summary: "Del acontecimiento físico a la evidencia y a las posibles rutas jurídicas.", chapterIds: ["hecho-de-transito", "evidencia-de-transito"] },
  { id: "conducta-y-responsabilidad", worldId: "conducta-penal", title: "Conducta y responsabilidad", summary: "Conceptos para distinguir conducta, imputación, prueba y decisión.", chapterIds: ["conducta-y-tipicidad", "prueba-y-proceso-penal"] },
  { id: "de-roma-al-codigo", worldId: "historia-sistemas", title: "De Roma a la codificación", summary: "Cómo conceptos antiguos reaparecen, cambian y se comparan en sistemas modernos.", chapterIds: ["conceptos-romanos", "codificacion-y-comparacion"] },
] as const;

export const chapters: readonly Chapter[] = [
  { id: "consentimiento-no-es-solo-firma", seriesId: "consentimiento-y-obligaciones", number: 1, title: "Consentir no es solamente firmar", summary: "Explora cómo una manifestación de voluntad puede aparecer en actos cotidianos y digitales.", conceptIds: ["consentimiento"], processIds: ["leer-antes-de-aceptar"] },
  { id: "obligacion-y-consecuencia", seriesId: "consentimiento-y-obligaciones", number: 2, title: "De la decisión a la obligación", summary: "Conecta consentimiento, obligación y consecuencias sin asumir una jurisdicción universal.", conceptIds: ["obligacion"], processIds: [] },
  { id: "representacion-empresa", seriesId: "empresa-que-obliga", number: 1, title: "Quién puede actuar por una empresa", summary: "Distingue la idea de representación de sus formalidades territoriales.", conceptIds: ["representacion"], processIds: ["verificar-representacion"] },
  { id: "poder-y-vigencia", seriesId: "empresa-que-obliga", number: 2, title: "Cuando un poder deja de servir", summary: "Vigencia, revocación y prueba de facultades como problema práctico.", conceptIds: ["poder"], processIds: ["verificar-representacion"] },
  { id: "hechos-ordenados", seriesId: "hechos-y-prueba", number: 1, title: "Primero: ordenar los hechos", summary: "Distingue cronología, personas, actos y consecuencias antes de hablar de prueba.", conceptIds: ["hecho-juridicamente-relevante"], processIds: ["organizar-hechos-y-prueba"] },
  { id: "hechos-y-evidencia", seriesId: "hechos-y-prueba", number: 2, title: "Qué puede sostener un hecho", summary: "Conecta cada afirmación relevante con evidencia disponible y sus límites.", conceptIds: ["prueba"], processIds: ["organizar-hechos-y-prueba"] },
  { id: "deber-profesional", seriesId: "responsabilidad-profesional-salud", number: 1, title: "Deber profesional y contexto", summary: "Presenta el deber profesional como concepto que depende de función, hechos, evidencia y territorio.", conceptIds: ["deber-profesional"], processIds: [] },
  { id: "expediente-y-prueba", seriesId: "responsabilidad-profesional-salud", number: 2, title: "Documentación clínica y prueba", summary: "Explica por qué documentar y preservar información puede importar en una revisión posterior.", conceptIds: ["prueba"], processIds: ["organizar-hechos-y-prueba"] },
  { id: "aceptar-en-software", seriesId: "consentimiento-digital", number: 1, title: "Aceptar dentro de un software", summary: "Una entrada para entender consentimiento, términos, datos y evidencia digital.", conceptIds: ["consentimiento"], processIds: ["leer-antes-de-aceptar"] },
  { id: "datos-y-condiciones", seriesId: "consentimiento-digital", number: 2, title: "Datos, condiciones y contexto", summary: "Separa la idea general de consentimiento de reglas territoriales y sectoriales.", conceptIds: ["consentimiento", "prueba"], processIds: [] },
  { id: "hecho-de-transito", seriesId: "hechos-de-transito", number: 1, title: "Un mismo hecho, varias rutas", summary: "Un hecho de tránsito puede tocar distintas ramas sin que eso determine por sí solo responsabilidad.", conceptIds: ["hecho-juridicamente-relevante"], processIds: ["organizar-hechos-y-prueba"] },
  { id: "evidencia-de-transito", seriesId: "hechos-de-transito", number: 2, title: "Registrar antes de concluir", summary: "Conecta cronología, evidencia disponible y territorio antes de interpretar consecuencias.", conceptIds: ["prueba"], processIds: ["organizar-hechos-y-prueba"] },
  { id: "conducta-y-tipicidad", seriesId: "conducta-y-responsabilidad", number: 1, title: "Conducta no es todavía responsabilidad", summary: "Separa conducta, clasificación jurídica y decisión institucional.", conceptIds: ["conducta"], processIds: [] },
  { id: "prueba-y-proceso-penal", seriesId: "conducta-y-responsabilidad", number: 2, title: "Prueba y proceso importan", summary: "Una explicación conceptual de por qué afirmar un hecho y probarlo son operaciones distintas.", conceptIds: ["prueba"], processIds: ["organizar-hechos-y-prueba"] },
  { id: "conceptos-romanos", seriesId: "de-roma-al-codigo", number: 1, title: "Conceptos que sobreviven", summary: "Explora continuidades históricas sin afirmar identidad automática entre sistemas modernos.", conceptIds: ["obligacion", "representacion"], processIds: [] },
  { id: "codificacion-y-comparacion", seriesId: "de-roma-al-codigo", number: 2, title: "Codificar también transforma", summary: "Compara familias e instituciones sin convertir similitud funcional en equivalencia jurídica.", conceptIds: ["obligacion"], processIds: [] },
] as const;

export const concepts: readonly Concept[] = [
  { id: "conducta", title: "Conducta", summary: "Acciones y omisiones como punto de partida para entender hechos, relaciones y consecuencias jurídicas.", appearsIn: ["conducta-penal", "vida-cotidiana"], relatedConceptIds: ["hecho-juridicamente-relevante", "prueba"], processIds: [], jurisdictionNote: "La clasificación y sus efectos dependen de la materia y del territorio." },
  { id: "consentimiento", title: "Consentimiento", summary: "Manifestación de voluntad que puede adquirir significados distintos según relación, materia y territorio.", appearsIn: ["vida-cotidiana", "tecnologia-ia", "salud-medicina"], relatedConceptIds: ["obligacion", "prueba"], processIds: ["leer-antes-de-aceptar"], historyNote: "Puede estudiarse históricamente y compararse entre tradiciones jurídicas sin asumir equivalencia automática.", jurisdictionNote: "Forma, efectos, revocabilidad y requisitos pueden variar por país, materia y tipo de acto." },
  { id: "obligacion", title: "Obligación", summary: "Relación jurídica que conecta sujetos, conducta debida y consecuencias dentro de un marco aplicable.", appearsIn: ["vida-cotidiana", "empresa-comercio", "historia-sistemas"], relatedConceptIds: ["consentimiento", "representacion"], processIds: [], jurisdictionNote: "Sus fuentes, modalidades y remedios dependen del sistema aplicable." },
  { id: "representacion", title: "Representación", summary: "Idea que permite analizar cuándo una actuación produce efectos para otra persona o entidad.", appearsIn: ["empresa-comercio", "historia-sistemas"], relatedConceptIds: ["poder", "obligacion"], processIds: ["verificar-representacion"], jurisdictionNote: "Facultades, formalidades y oponibilidad requieren revisión territorial." },
  { id: "poder", title: "Poder", summary: "Instrumento o fuente de facultades que debe leerse junto con vigencia, alcance y prueba de representación.", appearsIn: ["empresa-comercio"], relatedConceptIds: ["representacion"], processIds: ["verificar-representacion"], jurisdictionNote: "Otorgamiento, revocación, registro y prueba pueden variar entre jurisdicciones." },
  { id: "hecho-juridicamente-relevante", title: "Hecho jurídicamente relevante", summary: "Acontecimiento que importa para formular una cuestión, una pretensión, una defensa o una investigación.", appearsIn: ["conflicto-prueba", "movilidad-transporte", "conducta-penal"], relatedConceptIds: ["prueba", "conducta"], processIds: ["organizar-hechos-y-prueba"], jurisdictionNote: "La relevancia depende de la norma, la pretensión y el procedimiento aplicables." },
  { id: "prueba", title: "Prueba", summary: "Información y medios utilizados para sostener, controvertir o valorar hechos dentro de un procedimiento o revisión.", appearsIn: ["conflicto-prueba", "salud-medicina", "tecnologia-ia", "movilidad-transporte", "conducta-penal"], relatedConceptIds: ["hecho-juridicamente-relevante", "conducta"], processIds: ["organizar-hechos-y-prueba"], jurisdictionNote: "Admisibilidad, carga, valoración y formalidades dependen de materia, procedimiento y territorio." },
  { id: "deber-profesional", title: "Deber profesional", summary: "Marco conceptual para estudiar obligaciones vinculadas al ejercicio de una función o profesión.", appearsIn: ["salud-medicina", "empresa-comercio"], relatedConceptIds: ["prueba", "obligacion"], processIds: [], jurisdictionNote: "Contenido, estándar y consecuencias requieren fuente sectorial y territorial concreta." },
] as const;

export const processes: readonly Process[] = [
  {
    id: "organizar-hechos-y-prueba",
    title: "Organizar hechos y prueba",
    summary: "Una estructura educativa para separar lo ocurrido, lo que se afirma y la información que puede sostener cada punto.",
    steps: ["Identificar personas y contexto", "Ordenar hechos cronológicamente", "Separar hechos de conclusiones", "Relacionar cada hecho relevante con evidencia disponible", "Marcar vacíos, contradicciones y datos no verificados", "Identificar qué parte requiere norma, territorio o ayuda profesional"],
    evidence: ["Documentos", "Mensajes y registros digitales", "Imágenes o video", "Testimonios", "Registros técnicos o clínicos cuando corresponda"],
    territoryNote: "La forma de presentar, preservar, admitir o valorar evidencia depende del procedimiento y del territorio. Esta ruta no sustituye asesoría sobre un caso.",
    relatedConceptIds: ["hecho-juridicamente-relevante", "prueba"],
  },
  {
    id: "leer-antes-de-aceptar",
    title: "Leer antes de aceptar",
    summary: "Una ruta de preparación para identificar qué se está aceptando antes de convertir una pantalla, formulario o documento en una decisión automática.",
    steps: ["Identificar quién propone las condiciones", "Ubicar objeto y alcance", "Detectar datos, pagos, renovaciones o autorizaciones", "Identificar territorio y ley aplicable cuando sea visible", "Guardar la versión relevante", "Detenerse si la decisión requiere análisis individual"],
    evidence: ["Versión del documento", "Captura o registro de aceptación", "Fecha y contexto", "Cambios posteriores de términos"],
    territoryNote: "La validez y los efectos de una aceptación concreta dependen de hechos y derecho aplicable.",
    relatedConceptIds: ["consentimiento", "obligacion", "prueba"],
  },
  {
    id: "verificar-representacion",
    title: "Verificar representación",
    summary: "Una ruta de preparación para entender quién actúa, por quién dice actuar y qué evidencia existe sobre sus facultades.",
    steps: ["Identificar a la persona que actúa", "Identificar a la persona o entidad representada", "Ubicar la fuente de facultades", "Revisar alcance y vigencia", "Distinguir evidencia de facultades de la conclusión jurídica", "Escalar a revisión profesional si la operación lo requiere"],
    evidence: ["Poder o nombramiento", "Documentación corporativa", "Registros aplicables", "Acto concreto que se pretende realizar"],
    territoryNote: "Formalidades, registros y efectos frente a terceros son territoriales.",
    relatedConceptIds: ["representacion", "poder"],
  },
] as const;

export const getWorld = (id: string) => worlds.find((item) => item.id === id) ?? null;
export const getSeries = (id: string) => series.find((item) => item.id === id) ?? null;
export const getChapter = (id: string) => chapters.find((item) => item.id === id) ?? null;
export const getConcept = (id: string) => concepts.find((item) => item.id === id) ?? null;
export const getProcess = (id: string) => processes.find((item) => item.id === id) ?? null;

export function getChapterSiblings(chapter: Chapter) {
  const parent = getSeries(chapter.seriesId);
  if (!parent) return { previous: null, next: null };
  const index = parent.chapterIds.indexOf(chapter.id);
  return {
    previous: index > 0 ? getChapter(parent.chapterIds[index - 1]) : null,
    next: index >= 0 && index < parent.chapterIds.length - 1 ? getChapter(parent.chapterIds[index + 1]) : null,
  };
}
