# Powers Review México — Activation Gates

Fecha: 2026-08-28

## Propósito

Este contrato técnico evita que **Corporate Powers / Representation Review — México corporativo** se active por un cambio aislado de interfaz.

D-R2-03 permanece abierto: alcance fijo, límite documental, exclusiones, precio fijo y SLA requieren decisión humana separada.

El laboratorio NDA es `SYNTHETIC_ONLY` y no usa estos gates para convertirse en servicio comercial.

## Evidencia privada y repositorio público

La fuente detallada de evidencia vive fuera de este repositorio. Este repositorio es público y **no debe contener** nombres, cédulas, RFC, domicilios, documentos, URLs privadas ni otra evidencia sensible del responsable profesional.

Cada registro público solo puede almacenar:

- `status`
- `approvalRecordId` — identificador opaco, no URL ni documento
- `approvedByRole` — rol, no nombre
- `approvedAt`

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

G2 no sustituye D-R2-03. Ambos deben resolverse antes de una activación real.

## G4-B — Commercial Activation

Requiere 5 aprobaciones adicionales:

1. `publicPrice`
2. `serviceTerms`
3. `cancellationAndRefund`
4. `transactionEvidence`
5. `paymentMechanism`

El precio monetario permanece pendiente; no reutilizar la hipótesis del laboratorio NDA.

## Capacidades

`evaluatePilotActivation()` deriva capacidades; la UI no decide por su cuenta.

- PII del servicio: solo puede habilitarse si G2 está completo.
- Recepción documental: G2 + G4-B completos.
- Oferta comercial activa: G2 + G4-B completos.
- Pago: G2 + G4-B completos.
- Caso real: G2 + G4-B completos.

Además, D-R2-03 y la autorización humana de activación/publicación siguen siendo gates separados. Que el código devuelva `READY` no autoriza por sí mismo un servicio.

## Regla fail-closed

Un requisito se considera aprobado solo si tiene simultáneamente:

- `status = APPROVED`
- `approvalRecordId` no vacío
- `approvedByRole` no vacío
- `approvedAt` no vacío

Cualquier ausencia mantiene el requisito pendiente.

## Estado inicial

D-R2-03: OPEN
G2: 0/9
G4-B: 0/5
PII: OFF
DOCUMENTS: OFF
COMMERCIAL OFFER: OFF
PAYMENT: OFF
REAL CASE: OFF
