# Business Pilot — Activation Gates

Fecha: 2026-08-28

## Propósito

Este contrato técnico evita que el piloto profesional de NDA — México se active por un cambio aislado de interfaz.

La fuente detallada de evidencia vive fuera de este repositorio. Este repositorio es público y **no debe contener** nombres, cédulas, RFC, domicilios, documentos, URLs privadas ni otra evidencia sensible del responsable profesional.

## G2 — Professional & Legal Responsibility

Requiere 9 aprobaciones con evidencia externa:

1. `providerIdentity`
2. `professionalCredential`
3. `mexicoTerritorialScope`
4. `contractingParty`
5. `conflictProtocol`
6. `privacyNotice`
7. `secureDocumentChannel`
8. `qaResponsibility`
9. `taxAndInvoicingModel`

Cada registro público solo puede almacenar:

- `status`
- `approvalRecordId` — identificador opaco, no URL ni documento
- `approvedByRole` — rol, no nombre
- `approvedAt`

## G4-B — Commercial Activation

Requiere 5 aprobaciones adicionales:

1. `publicPrice`
2. `serviceTerms`
3. `cancellationAndRefund`
4. `transactionEvidence`
5. `paymentMechanism`

## Capacidades

`evaluatePilotActivation()` deriva las capacidades; la UI no decide por su cuenta.

- PII del piloto: solo puede habilitarse si G2 está completo.
- Recepción documental: G2 + G4-B completos.
- Oferta comercial activa: G2 + G4-B completos.
- Pago: G2 + G4-B completos.
- Caso real: G2 + G4-B completos.

Además, que un gate técnico quede listo **no sustituye** la autorización humana de publicación o activación.

## Regla fail-closed

Un requisito se considera aprobado solo si tiene simultáneamente:

- `status = APPROVED`
- `approvalRecordId` no vacío
- `approvedByRole` no vacío
- `approvedAt` no vacío

Cualquier ausencia mantiene el requisito pendiente.

## Evidencia privada

Los detalles que respaldan cada `approvalRecordId` deben vivir en el sistema documental controlado del proyecto. El identificador público debe permitir trazabilidad interna sin revelar el contenido probatorio.

## Estado inicial

G2: 0/9
G4-B: 0/5
PII: OFF
DOCUMENTS: OFF
COMMERCIAL OFFER: OFF
PAYMENT: OFF
REAL CASE: OFF
