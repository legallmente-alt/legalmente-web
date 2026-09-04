# LegalMente — Reconciliación de la directiva del fundador — 2026-09-04

## Estado

`CROSS_REPO_RECONCILED / READY_FOR_REVIEW / NOT_PUBLISHED / NO_DEPLOY`

## Corrección de trazabilidad

La revisión anterior mezcló dos repositorios distintos. Queda corregido:

- `contratoslegales848-design/Psyche-creation`: autoridad jurídica, gates, política visual, compositor y cadena gobernada.
- `legallmente-alt/legalmente-web`: superficie de producto/UX y consumidor de estado canónico.
- `Psyche-creation` tiene la rama `claude/convergencia-superset` y el PR #34.
- `legalmente-web` tiene el PR #42 (`feat/founder-directive-2026-09-04`).

Por tanto, decir solamente “PR #42 de LegalMente” era ambiguo. Todo reporte futuro debe indicar repositorio + PR + SHA.

## Autoridad visual real

En `Psyche-creation/main` existe `docs/adr/0002-marca-composicion-determinista.md` con estado **APROBADO por el fundador (2026-08-31)**. El mismo archivo está presente en la rama de convergencia.

Regla canónica:

> El proveedor visual no escribe caracteres. La marca `LegalMente` y el copy editorial exacto, cuando corresponda, se incorporan después mediante composición determinista.

La política ejecutable de `Psyche-creation/main` ya prohíbe watermark, logo flotante, overlay arbitrario y texto de marca escrito por el generador, y exige integración física de la marca.

Además, el estado actual ya superó la fase `CONTRACT_ONLY`: el ADR 0003 aprueba Pillow y `visual/compositor.py` implementa rasterización real determinista de copy y marca, con hashes y QA. La V1 sólo compone marca sobre una superficie reservada declarada plana o casi plana; si la geometría excede ese alcance devuelve revisión humana en vez de fingir perspectiva.

### Decisión de arquitectura cross-repo

`legalmente-web` no debe duplicar este ADR ni implementar un segundo compositor/gate visual. Se eliminaron de PR #42:

- `docs/adr/0002-character-free-base-art-deterministic-typography.md`;
- `src/lib/product-directive/visual-composition.ts`;
- `src/lib/product-directive/visual-composition.test.ts`.

Web conserva únicamente clasificación, rutas, prioridad y presentación de producto. Los adapters deben transportar estado sin elevar autoridad.

## Estado real del piloto

La lectura anterior del receipt histórico quedó obsoleta frente al estado canónico actual de Psyche.

El claim packet vigente de `PIEZA-01-REALES` declara para claims 1, 2 y 4:

- `estado = APTO_PARA_NARRATIVA`;
- `revision_humana.estado = APROBADO`;
- revisor: Raymundo Acevedo;
- `gate_arte = ABIERTO`.

El paquete agrega:

- `estado_agregado = APTO_PARA_NARRATIVA`;
- `revisiones_pendientes = []`;
- `gate_global_arte = ABIERTO`.

Existe además el `ProductionHandoff` `HO-PIEZA-01-REALES-001`. El documento de handoff registra ejecución autorizada para producir, no publicar, y `content/pieza-01-reales.json` declara `production_status = APROBADO_QA`.

Por tanto, es incorrecto afirmar ahora que LegalMente carece de una pieza real apta para arte. Sí existe una cadena gobernada ya habilitada y probada para `PIEZA-01-REALES`.

### Límite que sigue cerrado

No existe autorización automática de publicación. `publicable: true` en el artefacto de contenido clasifica una pieza de producción real; no sustituye la `PublicationDecision` humana exigida por la cadena.

El Content Pack `legalmente-01-consentimiento` del repositorio web sigue siendo `DRAFT_CONTENT`; simplemente no es la fuente del piloto canónico.

## Motor de producto

La directiva de producto se mantiene:

- necesidad además de concepto/situación/proceso/materia;
- panhispánico por defecto y territorio explícito cuando corresponda;
- fuentes proporcionales al nivel;
- amplitud de materias y anti-monopolio temático;
- anti-repetición;
- prioridad de mercado sin alterar verdad/gates;
- LinkedIn profesional separado y con provenance;
- web/app/game como superficies del mismo conocimiento.

## Gemini

La capacidad de proveedor sigue verificándose por separado: SDK/integración, CLI, credenciales/configuración y generación real. Ninguna afirmación de disponibilidad se hace sin evidencia del entorno concreto.

## Regla de reporte a partir de ahora

Todo estado técnico relevante debe identificar al menos:

`REPOSITORIO → RAMA/MAIN → SHA → PR (si existe) → ESTADO DEL GATE → AUTORIDAD`.

Esto evita volver a confundir trabajo de web con canon jurídico/visual de Psyche.
