import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacidad — LegalMente",
  description: "Alcance de privacidad del release educativo de LegalMente.",
};

export default function PrivacidadPage() {
  return (
    <LegalDocument
      eyebrow="Privacidad pública"
      title="El release educativo actual no está diseñado para recibir tus datos."
      intro="Esta página explica las decisiones de privacidad del sitio estático actual. No debe interpretarse como autorización para enviar información sensible ni como una política aplicable a futuras funciones que aún no existen."
      updated="11 de septiembre de 2026"
    >
      <h2>1. Alcance actual</h2>
      <p>El release educativo actual no incorpora deliberadamente cuentas, formularios de casos, pagos, carga de documentos, almacenamiento de datos del usuario ni SDK de analítica o telemetría de terceros. El canal de contacto permanece cerrado para PII y casos reales.</p>
      <h2>2. Qué no debes enviar</h2>
      <p>No envíes nombres, correos, teléfonos, identificadores, documentos, expedientes, datos de salud, información financiera, datos de menores o cualquier texto que permita identificar una situación jurídica. Si accidentalmente compartiste información sensible, no continúes enviando datos y solicita orientación profesional sobre el incidente.</p>
      <h2>3. Datos técnicos</h2>
      <p>El hosting puede procesar datos técnicos necesarios para entregar el sitio, protegerlo y medir disponibilidad según sus propias condiciones. LegalMente no usa el release actual para crear perfiles jurídicos, recibir consultas ni tomar decisiones sobre personas. El detalle del proveedor, retención y solicitudes debe confirmarse con el aviso del hosting y la jurisdicción aplicable.</p>
      <h2>4. Futuras capacidades</h2>
      <p>Antes de habilitar cuentas, formularios, documentos, cookies no esenciales, analítica, pagos o servicios profesionales se requiere un nuevo diseño aprobado que defina finalidad, base aplicable, minimización, retención, eliminación, proveedores, transferencias, canal de solicitudes y respuesta a incidentes.</p>
      <h2>5. Cambios</h2>
      <p>Esta página debe actualizarse antes de cualquier cambio material. La publicación de una función no convierte automáticamente una práctica en autorizada: el estado técnico y el texto público deben mantenerse alineados.</p>
      <h2>6. Contacto</h2>
      <p>El sitio no habilita actualmente un canal para recibir casos o datos personales. No uses enlaces, repositorios o formularios de terceros para enviar información confidencial a LegalMente.</p>
    </LegalDocument>
  );
}
