# Business Pilot — Preflight NDA México

Fecha: 2026-08-28

## Estado

Implementación de rama para el piloto cerrado de preparación. No autoriza cobro, carga de documentos ni prestación profesional.

Fuente de producto: `LegalMente — Business Pilot — G1 Service Definition V1 — 2026-08-28` en Drive.

Bloqueo superior: G2 — Professional & Legal Responsibility.

## Objetivo técnico

Clasificar únicamente si los hechos declarados por una persona encajan en el alcance operativo de un futuro servicio de revisión acotada de NDA simple — México.

El preflight no analiza cláusulas, no recibe archivos, no consulta una IA y no emite una conclusión jurídica.

## Orden de rutas

La función `evaluateNdaPreflight` aplica precedencia fail-closed:

1. `STOP` — existe una exclusión determinista.
2. `CLARIFY` — no hay un STOP, pero faltan datos críticos o anexos.
3. `REVIEW` — no hay STOP/CLARIFY, pero existe una señal que exige decisión humana.
4. `ACCEPT` — únicamente cuando todos los campos críticos están definidos y ninguna regla anterior dispara.

`ACCEPT` significa «encaja en el alcance sintético», no «servicio contratado» ni «documento aceptado».

## Invariantes

- `documentUploadAllowed` es siempre `false`.
- `businessGate` es siempre `G2_BLOCKED`.
- No existe input `file`.
- No existe route handler/API para este preflight.
- No existe persistencia local o remota.
- El formulario no solicita nombre, correo, empresa, importe, contraparte, contenido contractual ni otro identificador personal.
- La lógica no utiliza IA ni red.
- Una materia excluida nunca se degrada a `REVIEW` por falta de otros datos.
- Dos países generan `STOP` en este piloto.
- No competencia material/central genera `STOP`.
- Datos sensibles generan `REVIEW` y nunca `ACCEPT` automático.

## Límite inicial

- Territorio de producto: México.
- Documento: NDA/acuerdo de confidencialidad.
- Idioma: español.
- Un documento.
- Máximo inicial: 10 páginas.

## Contrato sintético

El módulo ejecuta once casos deterministas al cargarse y lanza un error si una ruta real difiere de la esperada:

| Caso | Esperado |
|---|---|
| NDA simple México | ACCEPT |
| NDA + IP material | REVIEW |
| NDA + datos sensibles | REVIEW |
| Dos países | STOP |
| Laboral | STOP |
| Regulado | STOP |
| Conflicto activo / penal | STOP |
| No competencia material | STOP |
| Plazo atípico | REVIEW |
| No es NDA | STOP |
| Información insuficiente | CLARIFY |

Cobertura esperada: 4/4 rutas.

## Motivos tipificados

La salida incluye `reasonCodes[]`; la interfaz traduce los códigos a texto. La UI no debe derivar la ruta por su cuenta.

## Siguiente gate técnico

Antes de habilitar cualquier recepción documental se requiere un cambio separado y revisable que demuestre que G2 está verde. Ese cambio deberá definir canal seguro, privacidad/retención, responsable, conflictos, términos y QA. No se debe convertir el booleano de carga en un simple feature flag sin gobernanza.

## No hacer

- No añadir upload a esta rama.
- No añadir checkout.
- No añadir OAuth.
- No capturar PII para «probar» el flujo.
- No presentar ACCEPT como consejo legal.
- No fusionar como oferta comercial activa mientras G2 permanezca bloqueado.
