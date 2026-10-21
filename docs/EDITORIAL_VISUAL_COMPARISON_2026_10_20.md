# Prueba comparativa de rutas editoriales — 2026-10-20

Se generaron 40 conceptos distintos (10 General, 10 Frases, 10 Entretenimiento y 10 LinkedIn), con 47 salidas contando siete versiones correctivas. Todos quedan `GENERADA_PENDIENTE_REVISION`.

## Alcance comprobado

- Generación nativa directa e inspección individual de previsualizaciones.
- No se ejecutó `prepareVisualBatch` ni `executeVisualBatch`: este lote **no demuestra funcionamiento end-to-end del motor**.
- No se ejecutaron Gemini, Manus, Grok, Deep Art ni Higgsfield. Higgsfield sigue excluido.
- 40 es el tamaño de la tanda comparativa, no un máximo técnico comprobado ni un agotamiento de cuota.
- Los prompts, versiones y observaciones se conservaron en el expediente privado de continuidad. Los binarios PNG no se han copiado a este repositorio en este cierre.
- El entorno local dejó de responder al preparar el cierre. No se completaron medición de dimensiones/hash, CLI `inspect`/`review`, vistas móviles ni actualización del archivo maestro MD. No se inventan recibos ni resultados PASS.

## Hallazgos

- Duplicación de logos: corregida en piezas concretas; la fidelidad al activo oficial sigue pendiente de revisión.
- Texto fuera de zona segura motivó versiones 4:5 de revisión. General, Frases y Entretenimiento siguen debiendo una entrega 9:16 con recorte central seguro; solicitar dimensiones en el prompt no acredita los bytes finales.
- Centrado desplazado en F04 y LI08; márgenes estrechos en varias piezas.
- F01 incurre en sepia; algunas técnicas derivaron a fotografía o mezclas no solicitadas.
- Persistencia de arquitectura tipográfica repetida: cambiar materiales no basta para demostrar diversidad.
- LI02 requiere una distinción visual más clara entre acompañamiento y arrastre. LI07 conecta mecánicamente apoyos que deberían explicar independencia. E09 muestra a Atenea con varias piedras: corregir para no sugerir voto múltiple.
- No hay aprobación editorial, publicación, merge ni despliegue derivados de esta tanda.

## Inventario de revisión

| ID | Concepto | Estado |
| --- | --- | --- |
| LM-MOT-20261020-G-01 | El derecho como planificación — Scott Shapiro | Generada; revisión pendiente |
| LM-MOT-20261020-G-02 | Constitucionalismo abusivo — David Landau | Generada; revisión pendiente |
| LM-MOT-20261020-G-03 | El impacto moral del derecho — Mark Greenberg | Generada; revisión pendiente |
| LM-MOT-20261020-G-04 | Igualdad sustantiva — Sandra Fredman | Generada; revisión pendiente |
| LM-MOT-20261020-G-05 | Razones excluyentes — Joseph Raz | Generada; revisión pendiente |
| LM-MOT-20261020-G-06 | Dignidad como igual rango — Jeremy Waldron | Generada; revisión pendiente |
| LM-MOT-20261020-G-07 | Jurisgénesis — Robert Cover | Generada; revisión pendiente |
| LM-MOT-20261020-G-08 | Derecho reflexivo — Gunther Teubner | Generada; revisión pendiente |
| LM-MOT-20261020-G-09 | Constitucionalismo transformador — Karl Klare | Generada; revisión pendiente |
| LM-MOT-20261020-G-10 | El dilema de la diferencia — Martha Minow | Generada; revisión pendiente |
| LM-MOT-20261015-F-01 | Beneficio de separación | Generada; revisión pendiente |
| LM-MOT-20261015-F-02 | Donación remuneratoria | Generada; revisión pendiente |
| LM-MOT-20261015-F-03 | Seguro de defensa jurídica | Generada; revisión pendiente |
| LM-MOT-20261015-F-04 | Auxilios entre hermanos | Generada; revisión pendiente |
| LM-MOT-20261015-F-05 | Sustitución del deudor | Generada; revisión pendiente |
| LM-MOT-20261015-F-06 | Justicia y fuerza · Pascal | Generada; revisión pendiente |
| LM-MOT-20261015-F-07 | Igualdad formal · Anatole France | Generada; revisión pendiente |
| LM-MOT-20261015-F-08 | Justicia como soporte social · Smith | Generada; revisión pendiente |
| LM-MOT-20261015-F-09 | Utilidad pública · Hume | Generada; revisión pendiente |
| LM-MOT-20261015-F-10 | Judicialización · Tocqueville | Generada; revisión pendiente |
| LM-MOT-20261015-E-01 | Identificación odontológica comparativa | Generada; revisión pendiente |
| LM-MOT-20261015-E-02 | Isótopos y procedencia | Generada; revisión pendiente |
| LM-MOT-20261015-E-03 | Suelo como indicio geológico | Generada; revisión pendiente |
| LM-MOT-20261015-E-04 | Tomografía post mortem | Generada; revisión pendiente |
| LM-MOT-20261015-E-05 | Comparación física de fracturas | Generada; revisión pendiente |
| LM-MOT-20261015-E-06 | Diatomeas en diagnóstico de ahogamiento | Generada; revisión pendiente |
| LM-MOT-20261015-E-07 | Jarndyce y el costo del litigio | Generada; revisión pendiente |
| LM-MOT-20261015-E-08 | Nora y la firma ajena | Generada; revisión pendiente |
| LM-MOT-20261015-E-09 | Las Euménides y el tribunal | Generada; revisión pendiente |
| LM-MOT-20261015-E-10 | Zalamea y la competencia judicial | Generada; revisión pendiente |
| LM-MOT-20261015-LI-01 | Cláusula de cambio de control | Generada; revisión pendiente |
| LM-MOT-20261015-LI-02 | Acompañamiento y arrastre accionarios | Generada; revisión pendiente |
| LM-MOT-20261015-LI-03 | Quórum y mayoría decisoria | Generada; revisión pendiente |
| LM-MOT-20261015-LI-04 | Exclusividad comercial delimitada | Generada; revisión pendiente |
| LM-MOT-20261015-LI-05 | Derecho contractual de auditoría | Generada; revisión pendiente |
| LM-MOT-20261015-LI-06 | Instrucciones de liberación en escrow | Generada; revisión pendiente |
| LM-MOT-20261015-LI-07 | Garantía independiente | Generada; revisión pendiente |
| LM-MOT-20261015-LI-08 | Mejoras en local arrendado | Generada; revisión pendiente |
| LM-MOT-20261015-LI-09 | Moneda de precio y pago | Generada; revisión pendiente |
| LM-MOT-20261015-LI-10 | Transición al terminar un servicio | Generada; revisión pendiente |

## Continuidad

F/E/LI proceden de treinta entradas ya reservadas del banco del15 de octubre: cambiar su estado no crea treinta temas nuevos. Los diez conceptos General usan IDs del20 de octubre y no reactivan el lote rechazado del15. Los textos de autores modernos son síntesis conceptuales rotuladas, no citas literales.

Este documento registra evidencia y límites; no modifica gates, plantillas, estados de publicación ni resultados de pruebas anteriores. Consultar el incremento privado además del maestro antes de otra selección. La conciliación al MD y su importación al runtime quedan abiertas hasta recuperar acceso local.
