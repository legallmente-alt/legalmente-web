# NDA México — Synthetic Preflight Lab

Fecha: 2026-08-28

## Estado

`SYNTHETIC_ONLY`.

Este flujo pertenece al laboratorio interno/sintético de Document Review. **No es la primera vía comercial de LegalMente y no depende del G2 de Powers Review.**

La primera vía comercial adoptada permanece `Corporate Powers / Representation Review — México corporativo`, inactiva y con D-R2-03 abierto.

## Objetivo técnico

Probar un router determinista `ACCEPT / CLARIFY / REVIEW / STOP` sin recibir documentos ni datos identificables.

El laboratorio no analiza cláusulas, no consulta IA, no almacena respuestas y no emite una conclusión jurídica.

## Orden de rutas

`evaluateNdaPreflight()` aplica precedencia fail-closed:

1. `STOP` — existe una exclusión determinista.
2. `CLARIFY` — no hay STOP, pero faltan datos críticos o anexos.
3. `REVIEW` — no hay STOP/CLARIFY, pero existe una señal que exigiría decisión humana.
4. `ACCEPT` — todos los campos críticos están definidos y ninguna regla anterior dispara.

`ACCEPT` significa únicamente «encaja en el escenario sintético».

## Invariantes

- `labState = SYNTHETIC_ONLY`.
- `documentUploadAllowed = false` en todas las rutas.
- No existe `input[type=file]`.
- No existe API de envío para el preflight.
- No existe persistencia local o remota deliberada.
- No se solicita nombre, correo, empresa, importe, contraparte, texto contractual ni identificadores.
- No existe checkout ni pago.
- La lógica no utiliza IA ni red.
- Una exclusión determinista nunca se degrada a `REVIEW` por faltar otros datos.

## Contrato sintético

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

Cobertura esperada: 4/4 rutas; 11 escenarios.

El módulo falla al cargarse si una ruta obtenida deja de coincidir con el contrato esperado.

## Relación con la ruta comercial

Este laboratorio puede producir aprendizaje sobre admisibilidad, claridad y stop rules. No autoriza ni define alcance, precio, SLA, privacidad, conflictos o prestación profesional de Powers Review.

No reutilizar la hipótesis económica histórica de NDA como precio de Powers Review.

## No hacer

- No añadir upload.
- No añadir email o captura de PII.
- No añadir checkout.
- No convertir `ACCEPT` en consejo jurídico.
- No presentar `/servicios/nda-mexico` como oferta; esa ruta redirige al laboratorio.
- No vincular la activación de este laboratorio a G2/G4-B.
