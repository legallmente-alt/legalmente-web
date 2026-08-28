# Powers Review México — Activation Gates

Fecha: 2026-08-28

## Propósito

Este contrato técnico evita que **Corporate Powers / Representation Review — México corporativo** se active por un cambio aislado de interfaz.

La primera vía comercial está adoptada, pero permanece inactiva. El laboratorio NDA es `SYNTHETIC_ONLY` y no usa estos gates para convertirse en servicio comercial.

## Gate 1 — D-R2-03: definición de oferta

`POWERS_D_R2_03_DECISION` permanece pendiente hasta que exista decisión humana registrada sobre:

1. patrón de alcance (`FIXED_SCOPE` recomendado, `HOURLY` o `DEFER`);
2. unidad exacta de servicio y límite de documentos/páginas;
3. exclusiones finales;
4. SLA final;
5. precio fijo final o método expresamente aprobado para obtenerlo;
6. consecuencia de la decisión: como máximo `PREPARED_FOR_CLOSED_PILOT`.

D-R2-03 no se deriva del código y no puede cerrarse por CI.

## Gate 2 — G2 Professional & Legal Responsibility

`POWERS_G2_EVIDENCE` requiere 9 aprobaciones con evidencia externa:

1. `providerIdentity`
2. `professionalCredential`
3. `mexicoTerritorialScope`
4. `contractingParty`
5. `conflictProtocol`
6. `privacyNotice`
7. `secureDocumentChannel`
8. `qaResponsibility`
9. `taxAndInvoicingModel`

## Gate 3 — G4-B Commercial Activation

`POWERS_G4_ACTIVATION_EVIDENCE` requiere 5 aprobaciones adicionales:

1. `publicPrice`
2. `serviceTerms`
3. `cancellationAndRefund`
4. `transactionEvidence`
5. `paymentMechanism`

El precio monetario permanece pendiente; no reutilizar la hipótesis del laboratorio NDA.

## Gate 4 — autorización humana de caso real

`POWERS_REAL_CASE_AUTHORIZATION` es una aprobación separada y permanece `PENDING` incluso si D-R2-03, G2 y G4-B quedan completos.

Su función es impedir que una combinación de cambios técnicos o documentales habilite automáticamente:

- PII del servicio;
- recepción de documentos;
- oferta comercial activa;
- pago;
- caso real.

La autorización debe tener `approvalRecordId`, rol aprobador y fecha. No se infiere de una conversación, un PR o un CI verde.

## Evidencia privada y repositorio público

La fuente detallada de evidencia vive fuera de este repositorio. Este repositorio es público y **no debe contener** nombres, cédulas, RFC, domicilios, documentos, URLs privadas ni otra evidencia sensible del responsable profesional.

Cada registro público solo puede almacenar:

- `status`
- `approvalRecordId` — identificador opaco, no URL ni documento
- `approvedByRole` — rol, no nombre
- `approvedAt`

## Estados derivados

`evaluatePowersActivation()` distingue:

- `definitionReady` — D-R2-03 aprobado.
- `g2Ready` — 9/9 G2.
- `g4ActivationReady` — 5/5 G4-B.
- `preparedForClosedPilot` — D-R2-03 + G2 + G4-B completos.
- `realCaseAuthorizationReady` — autorización humana final registrada.

Las capacidades reales solo son `true` cuando **todos** los anteriores están completos.

## Contrato sintético del gate

El módulo ejecuta cinco escenarios al cargarse y falla si alguno no cumple:

1. todo pendiente → todas las capacidades OFF;
2. D-R2-03 + G2 sin G4-B → capacidades OFF;
3. D-R2-03 + G2 + G4-B, sin autorización final → `preparedForClosedPilot=true` pero capacidades OFF;
4. todos los gates + autorización final → capacidades ON en el escenario sintético;
5. una aprobación malformada → fail-closed y capacidades OFF.

El escenario 4 es únicamente una prueba de coherencia; no representa una aprobación real.

## Estado actual

D-R2-03: OPEN
G2: 0/9
G4-B: 0/5
REAL CASE AUTHORIZATION: PENDING
PII: OFF
DOCUMENTS: OFF
COMMERCIAL OFFER: OFF
PAYMENT: OFF
REAL CASE: OFF
