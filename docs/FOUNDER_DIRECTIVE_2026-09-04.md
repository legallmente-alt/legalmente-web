# LegalMente — Directiva del fundador — 2026-09-04

## Propósito

LegalMente debe funcionar como un sistema vivo de conocimiento, aprendizaje y aplicación jurídica. No es un catálogo de posts, no es un juego como núcleo y no debe quedar atrapado en una sola materia, formato o metáfora.

## Autoridad entre repositorios

La autoridad jurídica, de gates y del sistema visual gobernado vive en `contratoslegales848-design/Psyche-creation`. `legallmente-alt/legalmente-web` es consumidor/adaptador de producto: puede clasificar, presentar, priorizar y preparar UX, pero no aprobar claims, recalcular fuentes, abrir gates jurídicos o visuales, alterar hashes canónicos ni crear un segundo canon visual.

La rama de convergencia verificable de Psyche es `claude/convergencia-superset`; su trabajo se revisa en el PR #34 de ese repositorio. El PR de esta directiva en web es el PR #42 de `legallmente-alt/legalmente-web`; son repositorios y responsabilidades distintas.

## 1. Motor por niveles

La progresión base de producto es:

`FOUNDATION → MATTER → NEED_PROCESS → COMPARATIVE → TERRITORIAL_SPECIALIZED`.

La referencia a una “pirámide de Kelsen” es figurativa: partir de fundamentos y cultura jurídica general y avanzar hacia materias, necesidades, procesos, especialización y territorio. No convertirla en una taxonomía rígida.

## 2. Panhispánico por defecto

La capa general está dirigida a personas hispanohablantes. No presentar legislación, instituciones, trámites, formalidades o efectos de un país como si fueran universales.

Cuando el contenido cambia materialmente por territorio, el sistema debe cualificar, bloquear o pedir territorio antes de una conclusión específica. El derecho comparado siempre debe nombrar los territorios comparados.

## 3. Estrategia de fuentes

- Nivel fundacional: fuentes estables, institucionales e introductorias.
- Materias y necesidades: doctrina/manuales e institucionales, con fuente primaria cuando la pieza formule reglas concretas actuales.
- Comparado: territorios explícitos y fuentes adecuadas por sistema.
- Actualidad/jurisprudencia: fuente primaria, fecha y vigencia.

Las fuentes construyen el concepto; no son decoración bibliográfica.

## 4. Entradas múltiples

El motor puede iniciar desde necesidad, pregunta, error común, mito, concepto, requisitos, pasos, situación humana, prevención, historia/cultura o profundidad profesional. La materia jurídica sigue siendo clasificación interna, no la única puerta de entrada.

## 5. Amplitud y rotación

Debe rotar entre civil, penal, laboral, familiar, mercantil, corporativo, notarial, consumidor, administrativo, inmobiliario, urbanismo/uso de suelo, prueba, digital, criminalística y otras materias pertinentes. Un éxito editorial en contratos, inmobiliario o cualquier otro cluster no autoriza que ese tema monopolice el sistema.

## 6. Utilidad e impacto

Priorizar piezas que respondan a preguntas, errores, supuestos y necesidades reales. Interés, utilidad, retención, viralidad y monetización pueden influir en qué investigar o producir primero, pero nunca alteran verdad jurídica, fuente, territorio ni gates.

## 7. Clasificación desde origen

Toda unidad debe poder registrar materia, nivel, necesidad/pregunta, puerta de entrada, conceptos, tensión/error, territorio, fuentes, explicación/aplicación, relaciones, formato/superficie, estado, historial/fingerprint y vínculos con web/app/game cuando existan.

## 8. Arte que comunica

El arte no es decoración. Debe hacer visible el concepto, situación, diferencia, tensión, secuencia o consecuencia. Las muestras aprobadas se consultan para estructura, jerarquía, legibilidad, integración de marca y relación concepto-imagen. No se copian sus temas.

## 9. Regla visual canónica

La fuente remota canónica es `Psyche-creation/main/docs/adr/0002-marca-composicion-determinista.md`, cuyo estado es **APROBADO por el fundador (2026-08-31)**.

Regla:

> **El proveedor visual genera arte sin caracteres. Toda tipografía de LegalMente —la marca y, cuando el formato lo exija, el copy editorial— se incorpora después mediante composición determinista y se valida contra el contenido aprobado.**

### Arte base generado

- cero letras;
- cero números;
- cero pseudotexto;
- una escena;
- metáfora comprensible;
- superficie física reservada para marca.

### Composición determinista

- `LegalMente` exacto;
- título, pregunta, frase, pasos, comparación o copy editorial exacto cuando corresponda;
- autor, cita o fuente sólo desde contenido aprobado y con binding correspondiente;
- watermark, logo flotante y overlay arbitrario prohibidos.

Psyche `main` ya contiene la política ejecutable `visual/policy/legalmente-visual-policy-v1.json`, el plan tipográfico/de marca en `visual/composition.py` y el compositor real con Pillow en `visual/compositor.py`. El ADR 0003 de Psyche aprueba Pillow como dependencia del compositor.

Límite actual del compositor V1: la superficie de marca debe estar declarada y ser plana o casi plana; ante geometría compleja no se finge perspectiva y se exige revisión humana.

Web no replica ese compositor ni crea un ADR alterno: consume su estado y sus artefactos gobernados.

## 10. Anti-repetición

Registrar contenido producido, aprobado, rechazado, publicado, agotado y reservado. Evitar repetir la misma combinación de tema + ángulo + formato + metáfora. Reutilizar conceptos sólo cuando la relación, nivel, necesidad o tratamiento sea materialmente distinto.

## 11. Necesidad como puerta de producto

LegalMente debe permitir entrar por una necesidad concreta: comprar un vehículo usado, comprar un terreno, revisar antes de firmar, consumidor, proceso penal, familia, representación, sociedades, uso de suelo/desarrollo, evidencia digital y otras. Las rutas semilla de web son hipótesis de investigación/producto, no asesoría ni requisitos jurídicos aprobados.

## 12. Capas de producto

Mantener como arquitectura flexible LegalMente Basic, Needs, Comparative, Professional y Corporate. Los nombres comerciales no quedan congelados; deben evolucionar con evidencia de uso y mercado.

## 13. LinkedIn profesional

La salida personal de Raymundo Acevedo Martínez es un carril profesional distinto del LegalMente general. Debe alimentarse sólo de experiencia y documentos verificables, con prioridad contractual-inmobiliaria, due diligence, representación, permisos, compraventa, promesa/preventa, escrituración, corporativo, riesgos, cláusulas, evidencia digital, IA y arquitectura jurídica de operaciones.

## 14. Web, app y juego

Son superficies posibles del mismo motor, no proyectos desconectados. La web es la expresión inmediata más simple del conocimiento clasificado. App y juego se evalúan después mediante evidencia de adopción, utilidad, coste y capacidad de reutilizar el mismo conocimiento. La gamificación es opcional; no es el núcleo.

## 15. Ciclo obligatorio

`investigación/fuente → unidad de conocimiento → clasificación → concepto/necesidad → visual/herramienta → QA jurídico/editorial/visual → aprobación → inventario → publicación sólo autorizada → medición → aprendizaje → motor`.

## 16. Sistema vivo

Las reglas son dirección de producto, no una prisión. Cambios relevantes deben versionarse con fecha, razón y efecto para que futuras sesiones no reinicien el proyecto desde cero.

## 17. Convergencia documental y técnica

Reconciliar esta directiva con Content Engine, Arquitectura del Corazón, Blueprint, protocolo visual, LinkedIn Strategy y ambos repositorios. No crear un segundo canon.

## 18. Tecnología e imagen

No afirmar que Gemini u otro proveedor está disponible por suposiciones. Distinguir SDK/integración, CLI, credenciales/configuración y capacidad real de generar imagen comprobada. La existencia de las tres primeras no demuestra la cuarta.

## 19. Piloto real verificado

La pieza gobernada `PIEZA-01-REALES` de Psyche ya tiene, en el estado remoto actual, claims 1, 2 y 4 `APTO_PARA_NARRATIVA`, revisión humana `APROBADO`, gates individuales de arte `ABIERTO` y `gate_global_arte = ABIERTO`. Existe `ProductionHandoff` `HO-PIEZA-01-REALES-001` y `content/pieza-01-reales.json` declara `production_status = APROBADO_QA`.

Esto habilita producción/revisión de asset dentro de la cadena gobernada; **no autoriza publicación**. Publicar sigue requiriendo una `PublicationDecision` humana separada.

El Content Pack experimental `docs/content/legalmente-01-consentimiento/content-pack.md` de web permanece `DRAFT_CONTENT` y no sustituye a la pieza gobernada de Psyche.

## Estado

`FOUNDER_DIRECTIVE_RECORDED / CROSS_REPO_AUTHORITY_RECONCILED / IMPLEMENTATION_IN_REVIEW / NO_DEPLOY / NOT_PUBLISHED`.
