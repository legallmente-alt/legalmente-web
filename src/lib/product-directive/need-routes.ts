import type { EntryDoor, KnowledgeLevel, ProductLayer, TerritoryMode } from "./index";

export type NeedRouteSeed = {
  id: string;
  slug: string;
  title: string;
  needOrQuestion: string;
  entryDoor: EntryDoor;
  knowledgeLevel: KnowledgeLevel;
  productLayer: ProductLayer;
  matterLabels: readonly string[];
  conceptHints: readonly string[];
  territoryMode: TerritoryMode;
  researchState: "RESEARCH_REQUIRED" | "FOUNDATION_CANDIDATE";
  outputs: readonly ("WEB_ROUTE" | "CHECKLIST" | "COMPARISON" | "SOCIAL" | "TOOL" | "PROFESSIONAL_DEPTH")[];
  nextResearchQuestion: string;
};

/**
 * Founder-authorized breadth seeds. These are route/research hypotheses, not
 * legal advice, requirements lists or approved claims. They deliberately span
 * different matters so one successful topic cannot become the whole product.
 */
export const NEED_ROUTE_SEEDS: readonly NeedRouteSeed[] = [
  {
    id: "LM-NEED-001",
    slug: "comprar-vehiculo-usado-particular",
    title: "Comprar un vehículo usado a un particular",
    needOrQuestion: "¿Qué debería revisar antes de pagar y recibir un vehículo usado de una persona particular?",
    entryDoor: "NEED",
    knowledgeLevel: "NEED_PROCESS",
    productLayer: "LEGALMENTE_NEEDS",
    matterLabels: ["contratos", "bienes/propiedad", "prueba", "consumidor"],
    conceptHints: ["titularidad", "consentimiento", "documentación", "evidencia", "riesgo"],
    territoryMode: "VARIES_BY_TERRITORY",
    researchState: "RESEARCH_REQUIRED",
    outputs: ["WEB_ROUTE", "CHECKLIST", "COMPARISON", "SOCIAL"],
    nextResearchQuestion: "¿Qué elementos pueden enseñarse transversalmente y qué trámites/documentos cambian por territorio o por compra a agencia vs particular?",
  },
  {
    id: "LM-NEED-002",
    slug: "comprar-terreno",
    title: "Comprar un terreno",
    needOrQuestion: "¿Qué capas jurídicas conviene entender antes de comprar un terreno?",
    entryDoor: "NEED",
    knowledgeLevel: "NEED_PROCESS",
    productLayer: "LEGALMENTE_NEEDS",
    matterLabels: ["inmobiliario", "propiedad", "notarial", "registral", "urbanismo/uso de suelo"],
    conceptHints: ["titularidad", "cargas", "uso", "posesión", "registro", "transmisión"],
    territoryMode: "VARIES_BY_TERRITORY",
    researchState: "RESEARCH_REQUIRED",
    outputs: ["WEB_ROUTE", "CHECKLIST", "TOOL", "PROFESSIONAL_DEPTH"],
    nextResearchQuestion: "¿Cómo separar título/propiedad, situación registral, uso permitido, restricciones y transmisión sin convertir una ruta general en checklist nacional falso?",
  },
  {
    id: "LM-NEED-003",
    slug: "antes-de-firmar",
    title: "Antes de firmar un contrato",
    needOrQuestion: "¿Qué debería quedar claro antes de aceptar obligaciones?",
    entryDoor: "NEED",
    knowledgeLevel: "NEED_PROCESS",
    productLayer: "LEGALMENTE_NEEDS",
    matterLabels: ["contratos", "obligaciones", "representación", "prueba"],
    conceptHints: ["capacidad", "consentimiento", "objeto", "prestaciones", "autoridad", "evidencia"],
    territoryMode: "VARIES_BY_TERRITORY",
    researchState: "RESEARCH_REQUIRED",
    outputs: ["WEB_ROUTE", "CHECKLIST", "TOOL", "SOCIAL"],
    nextResearchQuestion: "¿Qué fundamentos son suficientemente transversales y qué formalidades deben quedar bloqueadas hasta conocer acto y territorio?",
  },
  {
    id: "LM-NEED-004",
    slug: "garantia-devolucion-consumidor",
    title: "Garantía, devolución y comprobante de compra",
    needOrQuestion: "¿Qué conviene distinguir cuando una compra sale mal?",
    entryDoor: "COMMON_ERROR",
    knowledgeLevel: "NEED_PROCESS",
    productLayer: "LEGALMENTE_NEEDS",
    matterLabels: ["consumidor", "contratos", "prueba"],
    conceptHints: ["garantía", "devolución", "comprobante", "oferta", "evidencia"],
    territoryMode: "VARIES_BY_TERRITORY",
    researchState: "RESEARCH_REQUIRED",
    outputs: ["WEB_ROUTE", "COMPARISON", "SOCIAL"],
    nextResearchQuestion: "¿Qué distinciones conceptuales son comunes y qué derechos, plazos o autoridades requieren territorio explícito?",
  },
  {
    id: "LM-NEED-005",
    slug: "denuncia-querella-proceso-penal",
    title: "Denuncia, querella y entrada al proceso penal",
    needOrQuestion: "¿Por qué no toda forma de informar un hecho inicia o funciona igual?",
    entryDoor: "COMMON_ERROR",
    knowledgeLevel: "MATTER",
    productLayer: "LEGALMENTE_BASIC",
    matterLabels: ["penal", "procesal", "derechos fundamentales"],
    conceptHints: ["denuncia", "querella", "investigación", "debido proceso", "presunción de inocencia"],
    territoryMode: "VARIES_BY_TERRITORY",
    researchState: "RESEARCH_REQUIRED",
    outputs: ["WEB_ROUTE", "COMPARISON", "SOCIAL"],
    nextResearchQuestion: "¿Qué puede explicarse como cultura procesal general y qué definiciones/efectos dependen del sistema penal concreto?",
  },
  {
    id: "LM-NEED-006",
    slug: "familia-separacion-custodia-alimentos",
    title: "Separación, custodia y alimentos: conceptos que se confunden",
    needOrQuestion: "¿Qué conceptos familiares conviene separar antes de buscar una ruta específica?",
    entryDoor: "QUESTION",
    knowledgeLevel: "MATTER",
    productLayer: "LEGALMENTE_BASIC",
    matterLabels: ["familia", "personas", "procesal"],
    conceptHints: ["divorcio/separación", "custodia", "responsabilidad parental", "alimentos"],
    territoryMode: "VARIES_BY_TERRITORY",
    researchState: "RESEARCH_REQUIRED",
    outputs: ["WEB_ROUTE", "COMPARISON", "SOCIAL"],
    nextResearchQuestion: "¿Qué lenguaje conceptual puede ser panhispánico sin borrar diferencias profundas entre sistemas de familia?",
  },
  {
    id: "LM-NEED-007",
    slug: "quien-puede-firmar-empresa",
    title: "Quién puede firmar por una empresa",
    needOrQuestion: "¿Qué hay que comprobar además del cargo de la persona que firma?",
    entryDoor: "COMMON_ERROR",
    knowledgeLevel: "NEED_PROCESS",
    productLayer: "LEGALMENTE_CORPORATE",
    matterLabels: ["corporativo", "representación", "contratos", "prueba"],
    conceptHints: ["poder", "facultades", "vigencia", "límites", "evidencia"],
    territoryMode: "VARIES_BY_TERRITORY",
    researchState: "RESEARCH_REQUIRED",
    outputs: ["CHECKLIST", "WEB_ROUTE", "PROFESSIONAL_DEPTH"],
    nextResearchQuestion: "¿Qué estructura de comprobación es transversal y qué documentos/efectos requieren derecho societario y registral territorial?",
  },
  {
    id: "LM-NEED-008",
    slug: "entender-sociedad-empresa",
    title: "Entender una sociedad antes de tomar decisiones",
    needOrQuestion: "¿Qué datos y documentos ayudan a entender quién decide, quién administra y quién representa?",
    entryDoor: "NEED",
    knowledgeLevel: "NEED_PROCESS",
    productLayer: "LEGALMENTE_CORPORATE",
    matterLabels: ["corporativo", "mercantil", "representación", "gobierno corporativo"],
    conceptHints: ["socios/accionistas", "administración", "representación", "estatutos", "decisiones"],
    territoryMode: "VARIES_BY_TERRITORY",
    researchState: "RESEARCH_REQUIRED",
    outputs: ["WEB_ROUTE", "CHECKLIST", "PROFESSIONAL_DEPTH"],
    nextResearchQuestion: "¿Cómo enseñar funciones y documentos sin afirmar órganos, formalidades o poderes universales?",
  },
  {
    id: "LM-NEED-009",
    slug: "uso-de-suelo-desarrollo",
    title: "Uso de suelo y posibilidad real de desarrollar",
    needOrQuestion: "¿Ser propietario significa que puedo construir o desarrollar lo que quiero?",
    entryDoor: "MYTH",
    knowledgeLevel: "NEED_PROCESS",
    productLayer: "LEGALMENTE_PROFESSIONAL",
    matterLabels: ["administrativo", "urbanismo", "inmobiliario", "ambiental"],
    conceptHints: ["propiedad", "planeación", "uso de suelo", "autorización", "restricciones"],
    territoryMode: "VARIES_BY_TERRITORY",
    researchState: "RESEARCH_REQUIRED",
    outputs: ["WEB_ROUTE", "COMPARISON", "PROFESSIONAL_DEPTH", "SOCIAL"],
    nextResearchQuestion: "¿Qué relación conceptual puede enseñarse transversalmente y qué permisos/parámetros deben quedar necesariamente territorializados?",
  },
  {
    id: "LM-NEED-010",
    slug: "evidencia-digital-mensajes-audios",
    title: "Mensajes, audios y evidencia digital",
    needOrQuestion: "¿Guardar una captura o un audio equivale a tener prueba suficiente?",
    entryDoor: "MYTH",
    knowledgeLevel: "MATTER",
    productLayer: "LEGALMENTE_BASIC",
    matterLabels: ["prueba", "digital", "procesal", "privacidad"],
    conceptHints: ["autenticidad", "integridad", "contexto", "obtención", "valoración"],
    territoryMode: "VARIES_BY_TERRITORY",
    researchState: "RESEARCH_REQUIRED",
    outputs: ["WEB_ROUTE", "COMPARISON", "SOCIAL", "TOOL"],
    nextResearchQuestion: "¿Qué principios de evidencia digital son útiles transversalmente y qué admisibilidad/valoración debe territorializarse?",
  },
];

export function routeMatterCoverage(routes: readonly NeedRouteSeed[] = NEED_ROUTE_SEEDS): Map<string, number> {
  const counts = new Map<string, number>();
  for (const route of routes) {
    for (const matter of route.matterLabels) counts.set(matter, (counts.get(matter) ?? 0) + 1);
  }
  return counts;
}

export function validateNeedRoutePortfolio(routes: readonly NeedRouteSeed[] = NEED_ROUTE_SEEDS): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const route of routes) {
    if (ids.has(route.id)) errors.push(`Duplicate route id: ${route.id}`);
    if (slugs.has(route.slug)) errors.push(`Duplicate route slug: ${route.slug}`);
    ids.add(route.id);
    slugs.add(route.slug);
    if (route.matterLabels.length === 0) errors.push(`Route ${route.id} requires matter coverage.`);
    if (route.conceptHints.length === 0) errors.push(`Route ${route.id} requires concept hints.`);
    if (!route.needOrQuestion.trim()) errors.push(`Route ${route.id} requires a human need/question.`);
    if (!route.nextResearchQuestion.trim()) errors.push(`Route ${route.id} requires a next research question.`);
    if (route.territoryMode === "EXPLICIT_TERRITORY") {
      errors.push(`Seed ${route.id} must not pretend an explicit territory without a verified territorial research packet.`);
    }
  }

  const distinctMatters = routeMatterCoverage(routes).size;
  if (distinctMatters < 8) errors.push(`Need-route portfolio is too narrow: only ${distinctMatters} distinct matter labels.`);
  return errors;
}
