# LegalMente — Release 01 Execution V1

**Estado:** WORKING BRANCH / NO MERGE / NO DEPLOY / NO PUBLICATION  
**Rama:** `chatgpt/legalmente-release-01`  
**Base:** `main` @ `46948a0cd0db1a1d1fd2e914e00c616cd4bd82d0`  
**Fecha:** 2026-09-09

## Propósito

Convertir la arquitectura ya existente de LegalMente en una primera ronda ejecutable y medible. Este documento **no crea un engine nuevo, una taxonomía paralela ni un canon alterno**. Usa el flujo vigente:

`IDEA / SIGNAL → GRAPH BINDING → DEPTH → HUMAN FRAME → NORMATIVE CONTEXT → DEMAND SCORING → LANE → SURFACE → ANTI-REPETITION → SOURCE/JURISDICTION → VISUAL → QA → HISTORY / LEARNING`

La superficie pública vigente sigue siendo educativa, estática y sin PII, intake de casos, upload de documentos, pagos, servicios profesionales ni conclusiones individualizadas.

## Reglas operativas de esta ronda

1. `GENERAR != APROBAR != PUBLICAR`.
2. Employer Demand es **señal interna**. Nunca debe aparecer por defecto como narrativa de vacantes, empleadores, contratación, reclutamiento o LinkedIn.
3. Market signal y legal claim son capas distintas. Una señal de demanda nunca abre un gate jurídico.
4. Ninguna pieza territorial o normativa avanza sin fuente, territorio y límites suficientes.
5. LegalMente debe aparecer **exactamente una vez** por imagen final y físicamente integrado en la escena; no header, footer, watermark ni doble firma.
6. Anti-repetición visual debe evaluar el resultado perceptual, no solo el prompt: lenguaje artístico, composición, protagonista, materialidad, iluminación, tipografía y soporte de marca.
7. No se abre merge, deploy, publicación ni capacidad sensible desde esta rama.

## Release 01 — cola de 20 oportunidades

Los hooks son **copy de trabajo**, no claims jurídicos aprobados.

| ID | Lane | Tema | Hook de trabajo | Territorio | Señal | Estado inicial |
|---|---|---|---|---|---|---|
| LM-R01-001 | PUBLIC_GENERAL | Finiquito | ¿Qué debería aparecer en un finiquito antes de firmarlo? | MX | HUMAN_DEMAND | RESEARCH_SOURCE_VERIFY_REQUIRED |
| LM-R01-002 | PUBLIC_GENERAL | Vacaciones al terminar la relación laboral | ¿Qué cambia cuando quedaron vacaciones pendientes al terminar la relación laboral? | MX | HUMAN_DEMAND | RESEARCH_SOURCE_VERIFY_REQUIRED |
| LM-R01-003 | PUBLIC_GENERAL | Aguinaldo proporcional | ¿Cómo se entiende el aguinaldo cuando no trabajaste el año completo? | MX | HUMAN_DEMAND | RESEARCH_SOURCE_VERIFY_REQUIRED |
| LM-R01-004 | PUBLIC_GENERAL | Exclusiones en seguros | ¿Qué parte de una póliza decide si un siniestro está realmente cubierto? | REQUIRED | EDITORIAL_OPPORTUNITY | RESEARCH_REQUIRED |
| LM-R01-005 | PUBLIC_GENERAL | Consentimiento informado | ¿Qué acepta realmente una persona cuando firma un consentimiento informado? | REQUIRED | EDITORIAL_OPPORTUNITY | RESEARCH_REQUIRED |
| LM-R01-006 | FOUNDER_LINKEDIN | Facultades de firma | ¿Qué demuestra que una persona puede obligar a una sociedad? | REQUIRED | HUMAN_DEMAND + EMPLOYER_DEMAND_INTERNAL | RESEARCH_SOURCE_VERIFY_REQUIRED |
| LM-R01-007 | FOUNDER_LINKEDIN | Due diligence y evidencia | ¿Qué cambia cuando un hallazgo de due diligence no tiene evidencia detrás? | CONTEXTUAL | EMPLOYER_DEMAND_INTERNAL | RESEARCH_REQUIRED |
| LM-R01-008 | FOUNDER_LINKEDIN | Contrato vs operación real | ¿Qué pasa cuando la operación real contradice el contrato? | CONTEXTUAL | HUMAN_DEMAND + EMPLOYER_DEMAND_INTERNAL | RESEARCH_REQUIRED |
| LM-R01-009 | FOUNDER_LINKEDIN | Riesgo de proveedor | ¿Qué debería poder reconstruirse meses después de contratar a un proveedor? | CONTEXTUAL | EMPLOYER_DEMAND_INTERNAL | RESEARCH_REQUIRED |
| LM-R01-010 | FOUNDER_LINKEDIN | Permisos en desarrollo inmobiliario | Un permiso aislado no explica un proyecto: ¿qué depende de qué? | REQUIRED | EMPLOYER_DEMAND_INTERNAL | RESEARCH_REQUIRED |
| LM-R01-011 | RADAR_CURRENT | Datos personales e IA | ¿Qué pasa con un dato personal cuando entra a un sistema de IA? | REQUIRED | CURRENT_SIGNAL + EMPLOYER_DEMAND_INTERNAL | SOURCE_RESEARCH_REQUIRED |
| LM-R01-012 | RADAR_CURRENT | Marca, diseño y modelo de utilidad | Nombre, forma y función: ¿qué protege cada figura? | REQUIRED | EMPLOYER_DEMAND_INTERNAL | SOURCE_RESEARCH_REQUIRED |
| LM-R01-013 | RADAR_CURRENT | Trabajo remoto | ¿Dónde termina la jornada cuando el trabajo ocurre desde cualquier lugar? | REQUIRED | CURRENT_SIGNAL | SOURCE_RESEARCH_REQUIRED |
| LM-R01-014 | RADAR_CURRENT | Capturas y evidencia digital | Una captura enseña algo. ¿Qué prueba realmente? | REQUIRED | CURRENT_SIGNAL | SOURCE_RESEARCH_REQUIRED |
| LM-R01-015 | RADAR_CURRENT | Cortesías, conflicto y compliance | ¿Cuándo una cortesía empresarial empieza a convertirse en un problema de compliance? | REQUIRED | EMPLOYER_DEMAND_INTERNAL | SOURCE_RESEARCH_REQUIRED |
| LM-R01-016 | PRODUCT_PREPARATION | Before Signing | ¿Qué conviene comprobar cuando un contrato parece completo? | CONTEXTUAL | HUMAN_DEMAND | EXISTING_TOOL / CONTENT_DEEPENING |
| LM-R01-017 | PRODUCT_PREPARATION | Organizador de evidencia | ¿Qué documento respalda cada afirmación antes de una decisión? | NOT_APPLICABLE | PRODUCT_GAP | SPEC_REQUIRED |
| LM-R01-018 | PRODUCT_PREPARATION | Powers preflight | Antes de firmar con una empresa, ¿qué conviene comprobar sobre quien firma? | REQUIRED | HUMAN_DEMAND | RESEARCH_SOURCE_VERIFY_REQUIRED |
| LM-R01-019 | PRODUCT_PREPARATION | Finiquito / devengados | Un cálculo útil debe mostrar supuestos, fuente y límites. | MX | HUMAN_DEMAND | TOOL_RESEARCH_CANDIDATE |
| LM-R01-020 | PRODUCT_PREPARATION | Verify | ¿Podemos comprobar una afirmación jurídica antes de repetirla? | CONTEXTUAL | PRODUCT_GAP | PILOT_CANDIDATE |

## Microlote 01 — primeras 5 que deben intentar cerrar el circuito completo

Prioridad de trabajo, no autorización de publicación:

1. **LM-R01-001 — Finiquito**: alta demanda humana y conexión directa con un futuro cálculo explicable.
2. **LM-R01-016 — Before Signing**: herramienta ya existente y frontera segura sin upload/PII.
3. **LM-R01-006 — Facultades de firma**: demanda profesional, reutiliza representación/poder/prueba existentes.
4. **LM-R01-011 — Datos personales e IA**: señal actual con alto potencial editorial, solo si source gate cierra por territorio.
5. **LM-R01-014 — Evidencia digital**: alto interés humano y narrativo; debe evitar universalizaciones procesales.

Cada una debe pasar por:

`RESEARCH → SOURCE → CLAIM → TERRITORY → VERIFY → NARRATIVE → ART DIRECTION → VISUAL QA → EDITORIAL QA → HUMAN REVIEW`

Si una no cierra fuente/territorio/claim, se mantiene `HOLD_SOURCE` o equivalente y se sustituye en el microlote por la siguiente pieza con mejor preparación. No se fuerza el validator.

## Gate visual reforzado

Para cada pieza visual final:

- `LEGALMENTE_OCCURRENCES == 1`
- `BRAND_INTEGRATED_IN_SCENE == TRUE`
- `FLOATING_LOGO == FALSE`
- `WATERMARK == FALSE`
- `SECOND_BRAND_SIGNATURE == FALSE`
- `TEXT_OVERLOAD == FALSE`
- `EMPLOYER_DEMAND_VISIBLE == FALSE`
- `VACANCY_LANGUAGE == FALSE`

Además, en cualquier lote de 10 deben existir al menos 7 formatos editoriales y 4 gramáticas visuales, respetando la regla vigente del Editorial Pyramid Engine. El criterio adicional de esta ronda es perceptual: dos piezas no pueden aprobarse si un observador razonable las percibe como la misma receta visual aunque cambie el objeto.

## Medición mínima

No declarar aprendizaje del sistema sin evidencia. Para cada pieza publicada en una fase posterior autorizada, registrar como mínimo:

- alcance / impresiones;
- guardados;
- compartidos;
- clic hacia capa web de conocimiento;
- interacción con herramienta cuando aplique;
- preguntas o respuestas cualitativas relevantes;
- formato y gramática visual;
- tema / ángulo / audiencia;
- fecha;
- territorio;
- fuente/claim version usados.

Solo `MEASURED_FIRST_PARTY` puede convertirse en métrica observada dentro del Opportunity Engine.

## Siguiente acción de esta rama

Cerrar el **Microlote 01** de cinco piezas con evidencia real y estados honestos. No ampliar la arquitectura hasta obtener ese primer ciclo de producción + QA + aprendizaje.
