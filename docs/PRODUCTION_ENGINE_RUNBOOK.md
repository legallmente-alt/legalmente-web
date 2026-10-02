# Motor integrado de producción LegalMente

Implementación sobre `chore/convergence-pr43-58` (PR #59), pendiente de integración a main. Este motor prepara y verifica producción; no es un servicio desplegado ni un generador autónomo conectado a ChatGPT.

## Flujo ejecutable

1. Leer las autoridades vigentes en Drive: puerta de entrada, índice maestro v18, ruta visual v4, protocolo visual/editorial v3, muestras aprobadas y registro maestro anti-repetición completo. Investigar cada afirmación en fuentes primarias actuales y determinar su jurisdicción antes de aprobarla.
2. Exportar el registro vivo a `.production/master.md`. No usar una copia de otra sesión ni subirla a GitHub. Importar con la hora real de lectura:

   `npm run production:engine -- memory .production/master.md .production/memory.json <fecha-ISO-de-lectura>`

   Se indexan JSON con o sin delimitadores, títulos, alias y tablas posteriores. La revisión semántica debe leer también las adendas completas: el buscador literal no prueba novedad.
3. Consultar un tema: `npm run production:engine -- check-topic .production/memory.json <tema>`. Resolver coincidencias y rechazos en el registro canónico. No reactivar un tema cambiándole el título.
4. Preparar un job JSON con `candidates`, `pieces`, `units`, `visualArguments`, `policy`, `memoryReview` y `provider`. Los tipos están en `intelligence-front`, `production-policy`, `visual-factory` y `production-runtime`. La revisión identifica digest, revisor, hora, temas comparados y decisión CLEAR o REWORK. Se bloquean lecturas de más de 24 horas. No inventar una aprobación para pasar el control.

   `npm run production:engine -- prepare .production/job.json .production/memory.json .production/prepared.json`

   El puente vincula candidato, pregunta, respuesta, consecuencia, familia, claim y fuentes. Compila el prompt desde los campos validados; el prompt libre anterior no decide el copy. GENERATION_READY sólo permite producir un candidato.
5. En ChatGPT, enviar el prompt compilado de la primera unidad al generador nativo, junto con las referencias aprobadas pertinentes. El CLI no invoca imagegen ni simula una respuesta. Un proveedor externo necesita implementar `ImageGeneratorAdapter` y una inspección real del archivo. Higgsfield está excluido.
6. Inspeccionar el PNG recibido, no sus dimensiones solicitadas:

   `npm run production:engine -- inspect <archivo.png> 9:16 .production/receipt.json`

   General: 1080×1920. LinkedIn: 1080×1350, formato 4:5. El lector comprueba estructura PNG, tamaño y SHA-256; no sustituye la decodificación y revisión visual. Si falla, corregir con el generador autorizado y medir de nuevo. No declarar cumplimiento por aproximación de proporción.
7. Revisar la imagen real, texto y recortes; completar `VisualQaResult` con medidas de cajas, copy observado, hash, responsable y hora. Previsualizaciones móviles de 335 y 270 px. Ejecutar:

   `npm run production:engine -- review <unit.json> <archivo.png> <qa.json> .production/review.json`

   Materia, concepto, respuesta y reflexión opcional deben estar centrados. En vertical, texto, marca y foco causal quedan dentro de x100–980/y365–1510 y sobreviven al recorte central 4:5. El arte debe explicar el concepto y superar la revisión de carácter no comercial. Estas cualidades requieren inspección visual; un PASS escrito sin mirar no constituye evidencia.
8. `executeVisualBatch` se detiene después de la primera imagen sin QA, ante cualquier error de archivo o ante QA fallido. Sólo continúa automáticamente si existe un callback de revisión válido. Registrar candidatos, descartes y entregas en la memoria de Drive sin sobrescribir adendas nuevas. La publicación permanece separada y nunca se autoriza por este motor.

Los archivos de salida son exclusivos: usar una ruta nueva para cada recibo. `.production/` es privada y está excluida de Git. No colocar registros ni recibos en `public/`.

## Verificación realizada

- Suite de convergencia, TypeScript y ESLint ejecutados sobre esta integración.
- Registro real: 344 términos incluyendo alias y tablas; se recuperan tanto novación como apostilla de las adendas recientes. Esa cifra no equivale a 344 temas distintos ni a revisión semántica automática.
- Siete PNG de la tanda anterior inspeccionados: seis de 940/941×1672 y uno de 1122×1402. Los siete quedan ARTIFACT_BLOCKED; no se consideran aprobados.
- Las pruebas de proveedor son simuladas. No demuestran una tanda real aprobada, conexión permanente a Drive, búsqueda jurídica programada ni despliegue.
- El repo de remotion y otros repositorios no accesibles no se modificaron. La guía de conexión debe identificar este alcance y evitar presentar comandos históricos como capacidades verificadas.

## Validación local

`npm run test:convergence`

`npm run typecheck`

`npm run lint`

Mantener la decisión de release en `release-readiness`: las pruebas simuladas no sustituyen un lote real revisado ni los requisitos de lanzamiento existentes.


## Diversidad representacional — 1 oct 2026

La diversidad visual no se acredita cambiando solamente estilo, género de los personajes o paleta.

Para lotes de LegalMente General:
- usar al menos seis modos de sujeto en una tanda de diez cuando el contenido lo permita;
- las escenas centradas en personas no deben superar 40% por defecto;
- toda escena humana declara un `castPattern` y no puede repetir la misma pareja, trío, junta o disposición;
- toda pieza declara `sceneSignature` y al menos un `legalAnchorKey`;
- objetos, documentos, evidencia, arquitectura, procesos, mecanismos y entornos deben cargar significado jurídico real cuando la escena no sea humana;
- una pareja hombre+mujer, una persona sola o tres personas alrededor de una mesa no son variedad por sí mismas;
- si el QA detecta personas de relleno, ancla jurídica débil o modo de sujeto incoherente, la pieza se regenera o se corrige antes de continuar.

Esta regla complementa, no sustituye, memoria temática, causalidad visual, safe area, exactitud del copy y revisión humana.

## PR #62: causal scene contract

Each `visualArguments[]` now requires `causalScene` (see the exported `CausalScene` type): exact concept, legal relation and scene; visible mechanism; comprehension without copy; necessary physical elements with legal functions and observable actions; directed physical relations; anchor element IDs; three distinct counterfactual concepts with reasons; accountable semantic preflight review. Missing data blocks generation. Do not fill these with generic defaults to migrate older jobs.

The runtime compares concept/learning/relation/scene against the selected piece before compiling. `createVisualDirection` carries subject mode, signature, legal anchors and causal scene. Art follows the visible relation in the executable prompt. The prepared unit preserves `VISUAL_ARGUMENT` and `REPRESENTATION_FINGERPRINT` for later QA.

Real-image QA needs observed relation, observed legal anchors, comprehension without text and three counterfactual comparisons in the existing artifact-bound evidence. These are observations of the actual pixels, not copied prompt intentions. All strong causal scores must be at least 4/5; failed causal gates produce `REGENERATE`, never filler. This numerical implementation threshold is a review aid, not a model-computed semantic score. No automatic retry can repair an idea without redesign.

General mode comes from `policy.mode`, not the free-text audience. Six subject modes is a diversity target; the 40% human-centered limit permits `policy.humanNeedJustification` only for an explicit conceptual need. LinkedIn/carousel continuity is preserved. Historic numerical heuristics for functions, strategies and metaphor share are warnings; they cannot force an unsuitable scene.

Pass the verified visual argument as the fourth argument to `buildLearningMemoryItem` to retain the physical fingerprint in existing history. Old history without it is reported as incomplete. This graph-based comparison excludes style, cast labels, camera and free-form scene signature, but is not a synonym-proof semantic detector. Compare the nearest actual images and persist observed descriptions privately with the canonical memory. No private master export belongs in this public repository.

The CLI still prepares/inspects/reviews; it does not call ChatGPT's generator automatically. Use the compiled prompt through an authorized provider and inspect the first real image before continuing. `READY_FOR_HUMAN_VISUAL_REVIEW` is never legal/editorial approval, publication, merge or deployment.
