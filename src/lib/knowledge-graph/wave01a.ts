export type Wave01aIntegrationUnit = {
  contentId: string;
  claimIds: readonly string[];
  userJob: string;
  world: string;
  series: string | null;
  chapter: string | null;
  concept: string | null;
  process: string | null;
  candidateRoute: string | null;
  previousLearning: string;
  nextLearning: string;
  sourceContext: string;
  sourceUrl: string;
  territory: string;
  qualifier: string;
  copy: string;
  visualAsset: string;
  altText: string;
  copyState: "READY_FOR_COPY";
  visualState: "VISUAL_QA_PASS_PROVENANCE_UNRESOLVED";
  visualAssetState: "EXISTS";
  visualQaState: "PASS";
  visualGateProvenance: "UNRESOLVED";
  visualQaReceipt: "99_VISUAL_PRODUCTION_RECEIPT.md";
  visualGateAuthorization: "NOT_RECORDED";
  copyChannelQa: "PASS";
  artBaseState: "READY";
  socialCompositionState: "REVIEW_REQUIRED";
  integrationState: "PRODUCT_REVIEW_REQUIRED" | "SEPARATED_PENDING_BINDING";
  publicationState: "NOT_PUBLIC";
};

/**
 * Live operational state for Wave 01A. Historical source bindings remain
 * untouched; this layer records the later human decision and current gates.
 */
export const wave01aIntegrationUnits: readonly Wave01aIntegrationUnit[] = [
  {
    contentId: "LM-PC-013",
    claimIds: ["LM-PC-013-CL-01", "LM-PC-013-CL-02"],
    userJob: "¿Qué tiene que quedar claro sobre lo que las partes se comprometen a hacer o entregar?",
    world: "Vida cotidiana",
    series: "Consentimiento y obligaciones",
    chapter: "Consentir no es solamente firmar",
    concept: "Consentimiento",
    process: "Leer antes de aceptar",
    candidateRoute: "/proceso/leer-antes-de-aceptar",
    previousLearning: "Nombrar qué se está aceptando antes de preguntar por sus efectos.",
    nextLearning: "Separar objeto, obligaciones y consecuencias al revisar el documento concreto.",
    sourceContext: "Código Civil Federal, arts. 1794 y 1824",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/CCF.pdf",
    territory: "México — explicación educativa; no regla panhispánica",
    qualifier: "No determina la validez, nulidad, exigibilidad ni efecto de un contrato concreto.",
    copy: "Un contrato se entiende mejor cuando primero nombras su centro: qué se hará, qué se entregará o qué conducta se espera. El Código Civil Federal trata el consentimiento y el objeto como elementos de existencia, y distingue el objeto como una categoría propia. Eso ayuda a ordenar la conversación antes de revisar redacción, fechas o consecuencias. No significa que este texto valide un contrato concreto ni que resuelva si una cláusula es exigible.",
    visualAsset: "/internal-assets/legalmente/wave-01a/LM-PC-013_visual_4x5.png",
    altText: "Bodegón cálido sobre una mesa de madera: una caja de cartón con etiqueta en blanco y una regla metálica, junto a una estructura de varillas, una bandeja con cinta y un recipiente oscuro.",
    copyState: "READY_FOR_COPY",
    visualState: "VISUAL_QA_PASS_PROVENANCE_UNRESOLVED",
    visualAssetState: "EXISTS",
    visualQaState: "PASS",
    visualGateProvenance: "UNRESOLVED",
    visualQaReceipt: "99_VISUAL_PRODUCTION_RECEIPT.md",
    visualGateAuthorization: "NOT_RECORDED",
    copyChannelQa: "PASS",
    artBaseState: "READY",
    socialCompositionState: "REVIEW_REQUIRED",
    integrationState: "PRODUCT_REVIEW_REQUIRED",
    publicationState: "NOT_PUBLIC",
  },
  {
    contentId: "LM-PC-031",
    claimIds: ["LM-PC-031-CL-01", "LM-PC-031-CL-02"],
    userJob: "¿Qué elementos ayudan a describir una relación de trabajo sin asumir una conclusión sobre mi caso?",
    world: "Empresa y comercio",
    series: null,
    chapter: null,
    concept: null,
    process: "Organizar hechos y prueba",
    candidateRoute: null,
    previousLearning: "Describir los hechos: quién trabaja, bajo qué organización y qué está documentado.",
    nextLearning: "Ordenar funciones, lugar, jornada, salario, pagos y vacaciones sin convertir la lista en una conclusión individual.",
    sourceContext: "Ley Federal del Trabajo, arts. 20–21 y 25",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf",
    territory: "México — explicación educativa; no regla panhispánica",
    qualifier: "No etiqueta una relación concreta ni calcula derechos o prestaciones.",
    copy: "La Ley Federal del Trabajo define la relación de trabajo a partir del trabajo personal subordinado y el salario, con independencia del acto que le dé origen. También enumera condiciones que pueden formar parte del escrito laboral: servicio, lugar, jornada, salario, forma y día de pago, y vacaciones. Esto sirve para ordenar información, no para etiquetar automáticamente una relación concreta ni para calcular derechos.",
    visualAsset: "/internal-assets/legalmente/wave-01a/LM-PC-031_visual_4x5.png",
    altText: "Bodegón cálido sobre una mesa de madera: una caja de herramientas con herramientas y un mazo, un delantal de tela colgado, una etiqueta de cartón con cordón, un recipiente oscuro y cuadernos con un bolígrafo.",
    copyState: "READY_FOR_COPY",
    visualState: "VISUAL_QA_PASS_PROVENANCE_UNRESOLVED",
    visualAssetState: "EXISTS",
    visualQaState: "PASS",
    visualGateProvenance: "UNRESOLVED",
    visualQaReceipt: "99_VISUAL_PRODUCTION_RECEIPT.md",
    visualGateAuthorization: "NOT_RECORDED",
    copyChannelQa: "PASS",
    artBaseState: "READY",
    socialCompositionState: "REVIEW_REQUIRED",
    integrationState: "SEPARATED_PENDING_BINDING",
    publicationState: "NOT_PUBLIC",
  },
  {
    contentId: "LM-PC-065",
    claimIds: ["LM-PC-065-CL-01", "LM-PC-065-CL-02"],
    userJob: "¿Qué documentos y datos conviene ordenar para entender una sociedad mercantil?",
    world: "Empresa y comercio",
    series: null,
    chapter: null,
    concept: null,
    process: null,
    candidateRoute: null,
    previousLearning: "Identificar la categoría de sociedad antes de leer un documento como si fuera intercambiable con otro.",
    nextLearning: "Separar escritura o póliza constitutiva y datos corporativos; la representación queda como pregunta relacionada y requiere un binding propio.",
    sourceContext: "Ley General de Sociedades Mercantiles, arts. 1 y 6",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSM.pdf",
    territory: "México — explicación educativa; no regla panhispánica",
    qualifier: "No identifica ni valida una entidad concreta ni confirma que un documento esté completo o vigente.",
    copy: "La Ley General de Sociedades Mercantiles reconoce distintas especies de sociedades mercantiles y prevé datos que deben aparecer en la escritura o póliza constitutiva. Esa distinción sirve para ordenar una revisión documental: primero identifica la categoría y después localiza el instrumento y sus datos. La cuestión de representación queda separada y no está soportada por estos claims.",
    visualAsset: "/internal-assets/legalmente/wave-01a/LM-PC-065_visual_4x5.png",
    altText: "Bodegón cálido sobre una mesa de madera: tres soportes de madera con piezas de distintas texturas, una carpeta de cartón cerrada, una placa metálica, un recipiente oscuro sobre una base de piedra y una bandeja con cinta.",
    copyState: "READY_FOR_COPY",
    visualState: "VISUAL_QA_PASS_PROVENANCE_UNRESOLVED",
    visualAssetState: "EXISTS",
    visualQaState: "PASS",
    visualGateProvenance: "UNRESOLVED",
    visualQaReceipt: "99_VISUAL_PRODUCTION_RECEIPT.md",
    visualGateAuthorization: "NOT_RECORDED",
    copyChannelQa: "PASS",
    artBaseState: "READY",
    socialCompositionState: "REVIEW_REQUIRED",
    integrationState: "SEPARATED_PENDING_BINDING",
    publicationState: "NOT_PUBLIC",
  },
];

export function getWave01aForRoute(route: string) {
  return wave01aIntegrationUnits.find((unit) => unit.candidateRoute === route) ?? null;
}
