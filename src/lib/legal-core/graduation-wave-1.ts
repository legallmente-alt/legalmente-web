export type GraduationCandidate = {
  id: "renuncia-en-blanco" | "ley-silla" | "posesion-vs-propiedad";
  title: string;
  targetPath: string;
  subject: string;
  status: "READY_FOR_PRODUCT";
  liveGate: "FOUNDER_LITERALITY_PENDING";
  badge: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceArticles: string[];
  humanQuestion: string;
  incompatibility: string;
  limit: string;
  missing: string[];
  questions: [string, string, string];
  selector: { prompt: string; options: string[] }[];
};

export const graduationWave1: GraduationCandidate[] = [
  {
    id: "renuncia-en-blanco",
    title: "Hoja en blanco frente a renuncia voluntaria",
    targetPath: "/renuncia-en-blanco",
    subject: "Laboral",
    status: "READY_FOR_PRODUCT",
    liveGate: "FOUNDER_LITERALITY_PENDING",
    badge: "Vigencia comprobada · Federal MX",
    sourceLabel: "Ley Federal del Trabajo + SCJN",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf",
    sourceArticles: ["LFT Art. 33", "LFT Art. 784", "LFT Art. 804", "SCJN 2a./J. 138/2012 · Registro 2002166"],
    humanQuestion: "Al entrar a mi trabajo me hicieron firmar hojas en blanco; ahora me despidieron y dicen que tengo firmada mi renuncia voluntaria sin liquidación, ¿es legal?",
    incompatibility: "Una firma sobre un soporte material en blanco no convierte por sí sola la pérdida de derechos en una renuncia libre, completa y demostrada.",
    limit: "La herramienta no dictamina un juicio en trámite. El contexto, el documento y la prueba pericial requieren revisión profesional.",
    missing: ["Qué decía el documento al firmarlo", "Quién lo redactó y quién estuvo presente", "Si existe copia, fecha, presión o ratificación"],
    questions: ["¿El documento estaba completo cuando lo firmaste?", "¿Conservas una copia y puedes ubicar la fecha?", "¿Qué personas presenciaron la firma o la salida?"],
    selector: [
      { prompt: "Cuando firmaste, el documento estaba…", options: ["Completo y fechado", "En blanco o con espacios abiertos", "No lo recuerdo"] },
      { prompt: "La terminación fue presentada como…", options: ["Renuncia propia", "Despido o presión", "Todavía no está claro"] },
      { prompt: "Conservas…", options: ["Copia del documento", "Mensajes o testigos", "Nada verificable por ahora"] },
    ],
  },
  {
    id: "ley-silla",
    title: "Jornada de pie frente a descanso en asiento",
    targetPath: "/ley-silla",
    subject: "Laboral · seguridad",
    status: "READY_FOR_PRODUCT",
    liveGate: "FOUNDER_LITERALITY_PENDING",
    badge: "Vigencia comprobada · Federal MX",
    sourceLabel: "Ley Federal del Trabajo + NOM-036-1-STPS-2018",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf",
    sourceArticles: ["LFT Art. 132 fracc. V Bis", "LFT Art. 133 fracc. XVIII", "NOM-036-1-STPS-2018"],
    humanQuestion: "En la tienda donde trabajo me prohíben sentarme durante todo el turno aunque no haya clientes, ¿pueden sancionarme si uso un banco?",
    incompatibility: "La dirección patronal no debe confundirse con una autorización para impedir de forma general el descanso en asiento cuando la función no exige movimiento activo continuo.",
    limit: "La aplicación depende de las funciones reales y no opera de forma ininterrumpida cuando la tarea inmediata exige desplazamiento físico activo.",
    missing: ["Funciones reales del puesto", "Existencia y ubicación de un asiento", "Organización concreta de los descansos"],
    questions: ["¿Hay un asiento con respaldo dentro del área de servicio?", "¿Qué parte de la jornada exige estar de pie?", "¿Existe una instrucción escrita sobre el descanso?"],
    selector: [
      { prompt: "Tu puesto es principalmente…", options: ["Mostrador o caja", "Desplazamiento activo", "Una mezcla de ambos"] },
      { prompt: "En el área existe…", options: ["Silla con respaldo", "Banco sin respaldo", "Ningún asiento"] },
      { prompt: "La instrucción de no sentarse fue…", options: ["Verbal", "Escrita", "No está documentada"] },
    ],
  },
  {
    id: "posesion-vs-propiedad",
    title: "Arrendamiento frente a prescripción adquisitiva",
    targetPath: "/posesion-vs-propiedad",
    subject: "Civil · inmuebles",
    status: "READY_FOR_PRODUCT",
    liveGate: "FOUNDER_LITERALITY_PENDING",
    badge: "Vigencia comprobada · Federal MX",
    sourceLabel: "Código Civil Federal + SCJN",
    sourceUrl: "https://www.diputados.gob.mx/LeyesBiblio/pdf/CCF.pdf",
    sourceArticles: ["CCF Arts. 790, 791, 1151 y 1152", "SCJN 1a./J. 82/2014 · Registro 2007985"],
    humanQuestion: "Llevo 15 años pagando renta puntualmente en la misma casa, ¿puedo demandar la propiedad por el paso del tiempo?",
    incompatibility: "Pagar renta puede mostrar posesión derivada y reconocimiento de un dominio ajeno; eso no equivale automáticamente a poseer como propietario.",
    limit: "La herramienta distingue posesión originaria y derivada, pero deben revisarse el código civil estatal, la causa de la posesión y los actos objetivos del caso.",
    missing: ["Entidad federativa del inmueble", "Contrato y pagos que describen la ocupación", "Actos objetivos que pudieran cambiar la causa de la posesión"],
    questions: ["¿Existe un documento o pago que demuestre la calidad de inquilino?", "¿En qué entidad está el inmueble?", "¿Qué acto demostraría un cambio de título de la posesión?"],
    selector: [
      { prompt: "La ocupación comenzó como…", options: ["Arrendamiento", "Permiso informal", "Compra o entrega de posesión"] },
      { prompt: "Puedes demostrar…", options: ["Pagos de renta", "Mensajes o testigos", "No tengo evidencia ordenada"] },
      { prompt: "El inmueble está en…", options: ["México, sin entidad confirmada", "Una entidad federativa conocida", "Otro país"] },
    ],
  },
];
