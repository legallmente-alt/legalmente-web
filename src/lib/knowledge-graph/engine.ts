import { concepts, getConcept, getProcess } from "./content";

export type EngineSource = {
  id: string;
  label: string;
  territory: string;
  locator: string;
  reviewedAt: string;
};

export type LivingDictionaryEntry = {
  conceptId: string;
  term: string;
  everydayNames: readonly string[];
  simpleDefinition: string;
  technicalDefinition: string;
  example: string;
  notToConfuseWith: readonly string[];
  relatedConceptIds: readonly string[];
  territory: string;
  sources: readonly EngineSource[];
  limits: string;
  nextConceptId?: string;
  relatedQuestions: readonly string[];
  version: string;
};

const source = (id: string, label: string, territory: string, locator: string): EngineSource => ({ id, label, territory, locator, reviewedAt: "2026-08-30" });

export const livingDictionary: readonly LivingDictionaryEntry[] = [
  { conceptId: "consentimiento", term: "Consentimiento", everydayNames: ["aceptar", "dar permiso", "estar de acuerdo", "qué estoy aceptando"], simpleDefinition: "Una decisión mediante la que una persona expresa que acepta algo en un contexto determinado.", technicalDefinition: "Manifestación de voluntad cuyo significado, requisitos y efectos dependen del acto, la relación, la materia y el territorio aplicables.", example: "Antes de aceptar una condición digital, identifica quién la propone, qué autoriza y qué versión estás aceptando.", notToConfuseWith: ["firma", "silencio", "conocer un texto"], relatedConceptIds: ["obligacion", "prueba"], territory: "Conceptual panhispánico; forma y efectos requieren territorio concreto.", sources: [source("LM-CONCEPT-001", "Knowledge Graph LegalMente: consentimiento", "Panhispánico conceptual", "src/lib/knowledge-graph/content.ts#consentimiento")], limits: "No permite concluir por sí solo si una aceptación concreta fue válida o suficiente.", nextConceptId: "obligacion", relatedQuestions: ["¿Qué estoy aceptando?", "¿Qué versión cuenta?", "¿Puedo demostrar cómo acepté?"], version: "v1.0" },
  { conceptId: "obligacion", term: "Obligación", everydayNames: ["lo que tengo que hacer", "compromiso", "deuda"], simpleDefinition: "Una relación en la que alguien debe realizar, entregar o evitar algo frente a otra persona.", technicalDefinition: "Relación jurídica que conecta sujetos, conducta debida, objeto y consecuencias dentro de un marco normativo aplicable.", example: "Un compromiso puede tener condiciones, tiempo, alcance y consecuencias que conviene leer por separado.", notToConfuseWith: ["promesa informal", "responsabilidad automática", "cualquier expectativa"], relatedConceptIds: ["consentimiento", "representacion"], territory: "Conceptual panhispánico; fuentes y remedios son territoriales.", sources: [source("LM-CONCEPT-002", "Knowledge Graph LegalMente: obligación", "Panhispánico conceptual", "src/lib/knowledge-graph/content.ts#obligacion")], limits: "No determina que exista una obligación exigible sin revisar hechos, fuente y derecho aplicable.", nextConceptId: "representacion", relatedQuestions: ["¿Quién debe hacer qué?", "¿De dónde nace el compromiso?", "¿Qué pasa si cambia el contexto?"], version: "v1.0" },
  { conceptId: "representacion", term: "Representación", everydayNames: ["firmar por la empresa", "actuar por alguien", "quién puede firmar"], simpleDefinition: "Una forma de analizar cuándo una persona actúa en nombre de otra persona o entidad.", technicalDefinition: "Relación o mecanismo por el que una actuación puede producir efectos para una persona representada, sujeto a facultades, alcance, vigencia y formalidades.", example: "Antes de aceptar una firma corporativa, separa quién actúa, por quién, con qué facultad y qué evidencia existe.", notToConfuseWith: ["tener un cargo", "aparecer en un correo", "decir que se tiene permiso"], relatedConceptIds: ["poder", "obligacion"], territory: "Conceptual panhispánico; formalidades, registros y oponibilidad son territoriales.", sources: [source("LM-CONCEPT-003", "Knowledge Graph LegalMente: representación", "Panhispánico conceptual", "src/lib/knowledge-graph/content.ts#representacion")], limits: "No confirma facultades ni efectos frente a terceros sin revisar fuente y territorio.", nextConceptId: "poder", relatedQuestions: ["¿Quién puede firmar por la empresa?", "¿Qué documento demuestra la facultad?", "¿La facultad sigue vigente?"], version: "v1.0" },
  { conceptId: "poder", term: "Poder", everydayNames: ["autorización para firmar", "facultades", "mandato"], simpleDefinition: "Una fuente o instrumento que puede otorgar facultades para actuar por otra persona o entidad.", technicalDefinition: "Fuente documentada de facultades cuyo otorgamiento, alcance, vigencia, revocación y prueba dependen del régimen aplicable.", example: "Una copia de un poder no responde por sí sola si cubre el acto concreto ni si sigue vigente.", notToConfuseWith: ["representación automática", "cargo corporativo", "cualquier carta"], relatedConceptIds: ["representacion"], territory: "Conceptual panhispánico; otorgamiento y registro son territoriales.", sources: [source("LM-CONCEPT-004", "Knowledge Graph LegalMente: poder", "Panhispánico conceptual", "src/lib/knowledge-graph/content.ts#poder")], limits: "No permite concluir validez, vigencia o suficiencia de un documento real.", nextConceptId: "prueba", relatedQuestions: ["¿Qué alcance tiene?", "¿Quién lo otorgó?", "¿Cómo se verifica su vigencia?"], version: "v1.0" },
  { conceptId: "hecho-juridicamente-relevante", term: "Hecho jurídicamente relevante", everydayNames: ["lo que pasó", "hecho importante", "qué ocurrió"], simpleDefinition: "Un acontecimiento que puede importar para formular una pregunta o analizar una situación jurídica.", technicalDefinition: "Acontecimiento seleccionado por su relación con una norma, pretensión, defensa, investigación o procedimiento aplicable.", example: "Separar fecha, personas y acto ocurrido evita convertir una conclusión en un hecho.", notToConfuseWith: ["opinión", "calificación jurídica", "rumor"], relatedConceptIds: ["prueba", "conducta"], territory: "Conceptual panhispánico; relevancia depende de norma y procedimiento.", sources: [source("LM-CONCEPT-005", "Knowledge Graph LegalMente: hecho jurídicamente relevante", "Panhispánico conceptual", "src/lib/knowledge-graph/content.ts#hecho-juridicamente-relevante")], limits: "No decide responsabilidad ni sustituye la investigación de un caso.", nextConceptId: "prueba", relatedQuestions: ["¿Qué ocurrió exactamente?", "¿Qué parte está verificada?", "¿Qué necesito demostrar?"], version: "v1.0" },
  { conceptId: "prueba", term: "Prueba", everydayNames: ["evidencia", "cómo lo demuestro", "qué documento sirve"], simpleDefinition: "Información que ayuda a sostener o discutir lo que se afirma que ocurrió.", technicalDefinition: "Medios e información utilizados para sostener, controvertir o valorar hechos dentro de una revisión o procedimiento.", example: "Una captura puede conservar contexto y fecha, pero su valor depende del procedimiento y de cómo se obtenga y preserve.", notToConfuseWith: ["certeza absoluta", "documento aislado", "conclusión"], relatedConceptIds: ["hecho-juridicamente-relevante", "conducta"], territory: "Conceptual panhispánico; admisibilidad, carga y valoración son territoriales.", sources: [source("LM-CONCEPT-006", "Knowledge Graph LegalMente: prueba", "Panhispánico conceptual", "src/lib/knowledge-graph/content.ts#prueba")], limits: "No permite concluir quién tiene razón ni garantiza admisión en un procedimiento.", nextConceptId: "conducta", relatedQuestions: ["¿Qué puede sostener este hecho?", "¿Qué contexto falta?", "¿Cómo preservo la información?"], version: "v1.0" },
  { conceptId: "conducta", term: "Conducta", everydayNames: ["lo que hice", "lo que alguien hizo", "acción u omisión"], simpleDefinition: "Una acción u omisión humana que puede ser relevante según el contexto.", technicalDefinition: "Comportamiento activo u omisivo analizado dentro de una relación, norma, materia y procedimiento determinados.", example: "Describir la conducta sin calificarla como delito permite formular una pregunta verificable.", notToConfuseWith: ["culpa", "delito", "intención probada"], relatedConceptIds: ["hecho-juridicamente-relevante", "prueba"], territory: "Conceptual panhispánico; clasificación y efectos dependen de materia y territorio.", sources: [source("LM-CONCEPT-007", "Knowledge Graph LegalMente: conducta", "Panhispánico conceptual", "src/lib/knowledge-graph/content.ts#conducta")], limits: "No permite concluir responsabilidad, culpabilidad o intención individual.", nextConceptId: "hecho-juridicamente-relevante", relatedQuestions: ["¿Qué acción u omisión se describe?", "¿Qué contexto falta?", "¿Qué debe probarse?"], version: "v1.0" },
  { conceptId: "deber-profesional", term: "Deber profesional", everydayNames: ["lo que exige la profesión", "deber de cuidado", "reglas del trabajo"], simpleDefinition: "Un marco para estudiar qué puede exigirse a quien ejerce una función o profesión.", technicalDefinition: "Conjunto de obligaciones vinculadas al ejercicio de una función, cuyo contenido y estándar dependen de fuente, sector, hechos y territorio.", example: "Para estudiar un deber profesional hay que identificar función, contexto, fuente y evidencia, no sólo el resultado.", notToConfuseWith: ["resultado perfecto", "garantía de éxito", "culpa automática"], relatedConceptIds: ["obligacion", "prueba"], territory: "Conceptual; requiere fuente sectorial y territorial concreta.", sources: [source("LM-CONCEPT-008", "Knowledge Graph LegalMente: deber profesional", "Panhispánico conceptual", "src/lib/knowledge-graph/content.ts#deber-profesional")], limits: "No permite concluir incumplimiento ni responsabilidad en un caso individual.", relatedQuestions: ["¿Qué función se ejercía?", "¿Qué fuente establece el estándar?", "¿Qué evidencia existe?"], version: "v1.0" },
] as const;

export type HumanSearchResult = { entry: LivingDictionaryEntry; score: number; matchedTerms: readonly string[] };
const normalize = (value: string) => value.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").trim();

export function searchHumanQuestion(query: string): HumanSearchResult[] {
  const tokens = normalize(query).split(/\s+/).filter((token) => token.length > 2);
  if (!tokens.length) return [];
  return livingDictionary.map((entry) => {
    const haystack = normalize([entry.term, ...entry.everydayNames, ...entry.relatedQuestions, entry.simpleDefinition].join(" "));
    const matchedTerms = tokens.filter((token) => haystack.includes(token));
    return { entry, score: matchedTerms.length / tokens.length, matchedTerms };
  }).filter((result) => result.score > 0).sort((a, b) => b.score - a.score || a.entry.term.localeCompare(b.entry.term, "es")).slice(0, 5);
}

export function getLivingEntry(conceptId: string) { return livingDictionary.find((entry) => entry.conceptId === conceptId) ?? null; }
export function validateLivingDictionary() {
  return livingDictionary.every((entry) => Boolean(getConcept(entry.conceptId) && entry.sources.length && entry.territory && entry.limits && (!entry.nextConceptId || getConcept(entry.nextConceptId)) && entry.relatedConceptIds.every((id) => getConcept(id)) && (!entry.conceptId || !getProcess(entry.conceptId))));
}
