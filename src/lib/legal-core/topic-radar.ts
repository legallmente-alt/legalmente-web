export type TopicReviewState = "REVIEW_REQUIRED" | "HOLD_SOURCE";

export type IncompatibilityEntry = {
  id: string;
  title: string;
  axis: string;
  presentLabel: string;
  intendedLabel: string;
  resultLabel: string;
  resultExplanation: string;
  territory: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceVersion: string;
  humanQuestion: string;
  relationship: string;
  object: string;
  evidence: string[];
  rule: string;
  limit: string;
  missing: string[];
  nextQuestions: [string, string, string];
  reviewState: TopicReviewState;
};

export const topicRadar: IncompatibilityEntry[] = [
  {
    id: "rent-vs-prescription",
    title: "Arrendamiento frente a prescripción adquisitiva",
    axis: "Patrimonio · inmuebles",
    presentLabel: "Pago de renta o contrato de alquiler",
    intendedLabel: "Prescripción adquisitiva / usucapión",
    resultLabel: "HOLD · incompatibilidad a verificar",
    resultExplanation: "El pago de renta puede ser indicio de posesión derivada y reconocimiento de un dominio ajeno, pero la consecuencia depende del territorio, los hechos y la teoría posesoria aplicable.",
    territory: "México · piloto de investigación",
    sourceLabel: "Código Civil Federal · referencia declarada en el paquete",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/CCF.pdf",
    sourceVersion: "Requiere comprobación de artículo y vigencia antes de publicar",
    humanQuestion: "¿Puede una ocupación prolongada convertirse en propiedad si siempre se pagó renta o se reconoció al dueño?",
    relationship: "Inquilino o comodatario frente a propietario registral",
    object: "Título de propiedad de una vivienda o local",
    evidence: ["Contrato de arrendamiento", "Transferencias o recibos de renta", "Recibos de servicios", "Mensajes que reconozcan la calidad de inquilino"],
    rule: "La posesión derivada y la posesión originaria no deben confundirse.",
    limit: "La clasificación, el plazo y los requisitos son territoriales y deben revisarse con la fuente oficial vigente.",
    missing: ["Territorio y entidad federativa", "Naturaleza exacta de la ocupación", "Fecha y continuidad de la posesión"],
    nextQuestions: ["¿Existe un documento o pago que te identifique como inquilino?", "¿En qué territorio está el inmueble?", "¿Qué acto concreto demostraría un cambio de título de la posesión?"],
    reviewState: "REVIEW_REQUIRED",
  },
  {
    id: "blank-signature-vs-resignation",
    title: "Hoja en blanco frente a renuncia voluntaria",
    axis: "Relaciones laborales",
    presentLabel: "Firma de hoja en blanco o documento sin fecha",
    intendedLabel: "Renuncia voluntaria y finiquito vinculante",
    resultLabel: "HOLD · posible conflicto de consentimiento",
    resultExplanation: "Una firma obtenida bajo presión o incorporada a un documento posteriormente puede requerir prueba y revisión; la firma aislada no demuestra por sí sola una renuncia libre y completa.",
    territory: "México · piloto de investigación",
    sourceLabel: "Ley Federal del Trabajo · referencia declarada en el paquete",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf",
    sourceVersion: "Requiere comprobación de artículos y vigencia antes de publicar",
    humanQuestion: "¿Una firma puesta en una hoja vacía puede transformarse después en una renuncia que cierre la relación laboral?",
    relationship: "Trabajador frente a patrón o personal de recursos humanos",
    object: "Documento de renuncia, convenio o finiquito",
    evidence: ["Mensajes y comunicaciones", "Testigos", "Fecha y contexto de la firma", "Peritaje documentoscópico cuando proceda"],
    rule: "Los derechos laborales y la libertad del consentimiento requieren un análisis separado del simple hecho de firmar.",
    limit: "No se debe afirmar nulidad automática ni validez automática sin hechos, prueba y revisión profesional.",
    missing: ["Quién redactó el documento", "Qué decía al momento de firmar", "Si existió presión, pago o entrega de copia"],
    nextQuestions: ["¿El documento estaba completo cuando lo firmaste?", "¿Conservas una copia y puedes ubicar la fecha?", "¿Qué personas presenciaron la firma o la salida?"],
    reviewState: "REVIEW_REQUIRED",
  },
  {
    id: "fifty-fifty-deadlock",
    title: "Sociedad 50/50 frente a decisión unánime sin desempate",
    axis: "Empresas · sociedades",
    presentLabel: "Participación 50/50 sin cláusula de desempate",
    intendedLabel: "Continuidad basada en unanimidad permanente",
    resultLabel: "HOLD · riesgo de parálisis societaria",
    resultExplanation: "La igualdad de voto puede bloquear decisiones si no existe un mecanismo de desempate, mediación o salida; la consecuencia jurídica concreta depende del tipo social, estatutos y territorio.",
    territory: "México · piloto de investigación",
    sourceLabel: "Ley General de Sociedades Mercantiles · referencia declarada en el paquete",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSM.pdf",
    sourceVersion: "Requiere comprobación de artículos y vigencia antes de publicar",
    humanQuestion: "¿Qué ocurre cuando dos socios tienen el mismo poder y dejan de poder decidir juntos?",
    relationship: "Co-fundadores o accionistas igualitarios",
    object: "Voto en asamblea, administración y firma bancaria",
    evidence: ["Acta constitutiva", "Estatutos", "Convenio entre socios", "Actas de asamblea y votos"],
    rule: "La arquitectura de gobierno debe contemplar cómo se resuelve un empate antes de que el conflicto paralice la operación.",
    limit: "No todo empate produce por sí solo disolución; deben verificarse tipo social, actos bloqueados y remedios disponibles.",
    missing: ["Tipo de sociedad", "Texto vigente de estatutos", "Decisión concreta que quedó bloqueada"],
    nextQuestions: ["¿Qué dice el acta constitutiva sobre desempate o salida?", "¿Qué decisión no pudo aprobarse?", "¿Existe mediador, voto dirimente o mecanismo de compra/venta?"],
    reviewState: "REVIEW_REQUIRED",
  },
  {
    id: "standing-work-vs-seating-duty",
    title: "Jornada de pie frente a obligación de descanso sentado",
    axis: "Relaciones laborales · ergonomía",
    presentLabel: "Trabajo prolongado de pie en comercio o servicios",
    intendedLabel: "Prohibición de sentarse o ausencia de asiento adecuado",
    resultLabel: "HOLD · condición laboral a verificar",
    resultExplanation: "La existencia, ubicación y uso razonable de un asiento pueden ser relevantes; la aplicación concreta depende del puesto, la norma vigente y la forma de trabajo.",
    territory: "México · piloto de investigación",
    sourceLabel: "Ley Federal del Trabajo y NOM-036 · referencia declarada en el paquete",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf",
    sourceVersion: "Requiere comprobación normativa y técnica antes de publicar",
    humanQuestion: "¿La necesidad de atender al público justifica que una persona permanezca de pie toda la jornada?",
    relationship: "Persona trabajadora frente a empresa de comercio o servicios",
    object: "Asiento con respaldo, descansos y organización del puesto",
    evidence: ["Fotografías del puesto sin datos personales", "Reglamento interno", "Descripción de funciones", "Actas de seguridad y salud"],
    rule: "Las condiciones ergonómicas y de descanso deben analizarse junto con la naturaleza real del puesto.",
    limit: "No se debe convertir una imagen del puesto en una conclusión sobre infracción sin verificar funciones, territorio y norma vigente.",
    missing: ["Funciones reales", "Existencia y ubicación del asiento", "Duración y organización de los periodos de descanso"],
    nextQuestions: ["¿Hay un asiento asignado dentro del área de servicio?", "¿Qué parte de la jornada exige estar de pie?", "¿Existe un reglamento o instrucción escrita sobre el descanso?"],
    reviewState: "REVIEW_REQUIRED",
  },
  {
    id: "inheritance-benefit-vs-personal-debts",
    title: "Beneficio de inventario frente a deudas personales del heredero",
    axis: "Sucesiones",
    presentLabel: "Aceptación de herencia con inventario formal",
    intendedLabel: "Transmisión automática de deudas al patrimonio personal",
    resultLabel: "HOLD · alcance sucesorio a verificar",
    resultExplanation: "La separación entre masa hereditaria y patrimonio personal puede depender de la forma de aceptación, inventario, ocultamiento de bienes y derecho territorial aplicable.",
    territory: "México · piloto de investigación",
    sourceLabel: "Código Civil Federal · referencia declarada en el paquete",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/CCF.pdf",
    sourceVersion: "Requiere comprobación de artículo y vigencia antes de publicar",
    humanQuestion: "¿Las deudas de una persona fallecida pasan siempre a los bienes personales de quien hereda?",
    relationship: "Heredero frente a acreedores del causante",
    object: "Masa hereditaria, inventario, activos y pasivos",
    evidence: ["Testamento", "Inventario", "Certificado de defunción", "Estados de cuenta y títulos de propiedad"],
    rule: "La responsabilidad sucesoria debe distinguir los bienes del causante de los bienes propios del heredero.",
    limit: "La consecuencia puede cambiar por actos de administración, ocultamiento, forma de aceptación y derecho aplicable.",
    missing: ["Forma de aceptación", "Inventario completo", "Valor y naturaleza de activos y deudas"],
    nextQuestions: ["¿Existe inventario formal y quién lo elaboró?", "¿Qué bienes y deudas están documentados?", "¿Se realizó algún acto de disposición sobre la masa hereditaria?"],
    reviewState: "REVIEW_REQUIRED",
  },
  {
    id: "verbal-real-estate-contract",
    title: "Contrato verbal frente a formalidad de inmueble o garantía",
    axis: "Contratos · inmuebles",
    presentLabel: "Acuerdo verbal sobre inmueble o garantía patrimonial",
    intendedLabel: "Validez formal plena frente a terceros o tribunales",
    resultLabel: "HOLD · formalidad a verificar",
    resultExplanation: "La existencia de un acuerdo y su eficacia frente a terceros no son la misma pregunta; ciertos actos pueden requerir forma, escritura, registro o prueba específica.",
    territory: "México · piloto de investigación",
    sourceLabel: "Código Civil Federal y legislación notarial · referencia declarada en el paquete",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/CCF.pdf",
    sourceVersion: "Requiere comprobación de artículos, entidad y vigencia antes de publicar",
    humanQuestion: "¿Lo que dos personas acordaron de palabra basta para transmitir o garantizar un inmueble?",
    relationship: "Comprador, vendedor, garante y terceros interesados",
    object: "Compraventa de inmueble o garantía patrimonial",
    evidence: ["Pagos", "Mensajes", "Entrega de posesión", "Escritura, registro y documentos notariales"],
    rule: "Debe separarse el acuerdo entre partes de la forma necesaria para producir efectos jurídicos concretos.",
    limit: "La forma exigida, sus excepciones y los efectos probatorios dependen del acto y del territorio.",
    missing: ["Tipo de acto", "Valor y ubicación del inmueble", "Documento formal y estado registral"],
    nextQuestions: ["¿Qué acto exacto se acordó: venta, garantía, promesa o posesión?", "¿En qué entidad está el inmueble?", "¿Qué documento o pago puede demostrar el acuerdo?"],
    reviewState: "REVIEW_REQUIRED",
  },
  {
    id: "industrial-secret-vs-generic-nda",
    title: "Secreto industrial frente a NDA genérico",
    axis: "Empresas · propiedad industrial",
    presentLabel: "Información compartida con un NDA descargado",
    intendedLabel: "Protección automática de cualquier idea de negocio",
    resultLabel: "HOLD · medidas de secreto a verificar",
    resultExplanation: "La confidencialidad contractual no convierte automáticamente una idea pública o no protegida en secreto industrial; deben revisarse valor, identificación y medidas reales de resguardo.",
    territory: "México · piloto de investigación",
    sourceLabel: "Ley Federal de Protección a la Propiedad Industrial · referencia declarada en el paquete",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPPI.pdf",
    sourceVersion: "Requiere comprobación de artículo y vigencia antes de publicar",
    humanQuestion: "¿Firmar un NDA basta para proteger una idea que se comparte con un proveedor o inversionista?",
    relationship: "Emprendedor frente a proveedor, inversionista o empleado",
    object: "Información técnica, algoritmos, procesos o listas de clientes",
    evidence: ["Clasificación de la información", "Accesos restringidos", "Claves y permisos", "Leyendas y políticas internas"],
    rule: "La protección depende de la naturaleza de la información y de medidas materiales o digitales de preservación.",
    limit: "Un NDA no garantiza por sí solo que una idea abstracta sea un secreto protegido ni que toda divulgación sea ilícita.",
    missing: ["Qué información se compartió", "Qué medidas existían antes de compartirla", "Quién tuvo acceso y bajo qué alcance"],
    nextQuestions: ["¿La información estaba identificada como confidencial?", "¿Qué controles limitaban el acceso?", "¿La otra parte recibió datos concretos o sólo una idea general?"],
    reviewState: "REVIEW_REQUIRED",
  },
];

export const topicRadarMeta = {
  title: "Radar de temas e incompatibilidades",
  territory: "México · piloto de investigación",
  status: "INTERNAL_REVIEW_ONLY",
  sourceNote: "Las entradas proceden del framework adjunto y requieren verificación jurídica y de vigencia antes de exponerse como contenido público.",
};
