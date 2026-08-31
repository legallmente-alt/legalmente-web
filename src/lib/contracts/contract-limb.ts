import type { BeforeSigningInput } from "@/lib/legal-core/before-signing";

export type ContractType = BeforeSigningInput["contractType"];

export type ContractLimbPath = {
  readonly contractType: ContractType;
  readonly label: string;
  readonly focus: string;
  readonly conceptIds: readonly string[];
  readonly processId: "leer-antes-de-aceptar";
};

/**
 * Relationship layer for the Contracts limb.
 * IDs point only to existing public-safe Knowledge Engine records; the
 * internal review registry stays isolated from this public preparation route.
 */
export const contractLimbPaths: readonly ContractLimbPath[] = [
  {
    contractType: "GENERICO",
    label: "Documento o contrato general",
    focus: "Ordenar consentimiento, obligaciones y evidencia antes de decidir qué necesita revisión.",
    conceptIds: ["consentimiento", "obligacion", "prueba"],
    processId: "leer-antes-de-aceptar",
  },
  {
    contractType: "ARRENDAMIENTO",
    label: "Arrendamiento",
    focus: "Preparar la lectura de partes, objeto, contraprestación, vigencia y terminación.",
    conceptIds: ["consentimiento", "obligacion", "prueba"],
    processId: "leer-antes-de-aceptar",
  },
  {
    contractType: "PRESTACION_SERVICIOS",
    label: "Prestación de servicios",
    focus: "Separar quién se compromete, qué debe entregar y qué información conviene conservar.",
    conceptIds: ["consentimiento", "obligacion", "representacion", "prueba"],
    processId: "leer-antes-de-aceptar",
  },
  {
    contractType: "LABORAL",
    label: "Laboral",
    focus: "Organizar la relación de trabajo como preparación educativa, sin concluir derechos del caso.",
    conceptIds: ["consentimiento", "obligacion", "deber-profesional", "prueba"],
    processId: "leer-antes-de-aceptar",
  },
  {
    contractType: "PROMESA_COMPRAVENTA",
    label: "Promesa de compraventa",
    focus: "Distinguir la operación que se prepara, sus partes, objeto, condiciones y evidencia disponible.",
    conceptIds: ["consentimiento", "obligacion", "prueba"],
    processId: "leer-antes-de-aceptar",
  },
  {
    contractType: "COMPRAVENTA",
    label: "Compraventa",
    focus: "Preparar la lectura de lo que se entrega, recibe, paga y debe conservarse como evidencia.",
    conceptIds: ["consentimiento", "obligacion", "prueba"],
    processId: "leer-antes-de-aceptar",
  },
  {
    contractType: "CONFIDENCIALIDAD",
    label: "Confidencialidad",
    focus: "Ordenar personas, alcance, información y vigencia sin evaluar la suficiencia del acuerdo concreto.",
    conceptIds: ["consentimiento", "obligacion", "prueba"],
    processId: "leer-antes-de-aceptar",
  },
] as const;

const pathByContractType = new Map(contractLimbPaths.map((path) => [path.contractType, path]));

export function getContractLimbPath(contractType: ContractType): ContractLimbPath {
  const path = pathByContractType.get(contractType);
  if (!path) throw new Error(`Missing Contracts limb path for ${contractType}`);
  return path;
}

export type ContractDependencyChange =
  | { readonly kind: "CONCEPT"; readonly id: string }
  | { readonly kind: "PROCESS"; readonly id: string };

/**
 * Reverse circulation index. It reports affected consumers only; it never
 * approves, publishes, persists, or automatically revalidates anything.
 */
export function getAffectedContractConsumers(change: ContractDependencyChange): readonly ContractType[] {
  return contractLimbPaths
    .filter((path) => {
      if (change.kind === "CONCEPT") return path.conceptIds.includes(change.id);
      return path.processId === change.id;
    })
    .map((path) => path.contractType);
}
