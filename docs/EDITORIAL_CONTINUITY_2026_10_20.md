# Continuidad editorial — 20 octubre 2026

Esta integración conecta el trabajo reciente de LinkedIn y General/Frases con el importador existente. Está basada en la rama del PR #66; no implica merge a main, despliegue ni publicación de imágenes. El registro privado de Drive sigue siendo la única autoridad de anti-repetición. No se copia su transcripción al repositorio público.

## Problema corregido

El importador conservaba las adendas como texto, pero no indexaba conceptos recientes expresados como encabezados `### LM-… — Concepto` o `### 1. Concepto — Autor`. Por ello la consulta literal no recuperaba seis conceptos de la tanda del 20 de octubre. Se añaden encabezados y campos Tema/Concepto al mismo índice, se ignoran ejemplos dentro de bloques de prompts y se evita confundir una fila cuyo tema contiene la palabra «concepto» con la cabecera de una tabla. Se preserva la compatibilidad con tablas históricas «Materia / tema normalizado» y «Materia y concepto».

No es un detector semántico autónomo. El digest completo, lectura reciente y revisión semántica siguen siendo obligatorios. Un término registrado no acredita generación, aprobación, publicación ni vigencia jurídica.

## Autoridades y alcance

- Maestro anti-repetición: ID `1ISuXre1tVsSPNC3b6Tzjz-eAiOmv1FFr` (misma identidad, histórico preservado).
- Entrada del motor: ID `1Aby_uhs_cuHJCsszKbyveN13qFzbG9gMSLzEoELRabA`.
- Índice de producción: ID `1UzU1nbltiAEiMAjTt0GsHcZd14d_ofOtNeK4pFQjKs4`.
- Expediente LinkedIn: ID `1PEOUV-1qyO7Jmzo7CX7eYjihA04xy921eP7tiuq3k9Y`.
- Frases 16–20 octubre: ID `1jM03EMdCJalKa_xpA6kZEHRwKIjC5aTq`.
- Los motores documentales de frases, el gateway, índice, expediente LinkedIn y guía de conexión recibieron la misma actualización prioritaria LM-SYNC-20261020.

Se reconciliaron 27 temas/familias LinkedIn a partir de 23 incrementos profesionales. No son 27 imágenes nuevas. Las 15 piezas modernas/contemporáneas del 18–20 de octubre ya estaban en el maestro y no se duplican. La evidencia exacta de aprobación, versiones, copys y prompts queda en los documentos privados referidos. Archivos históricos no recuperados y conversaciones no accesibles permanecen como cobertura incompleta.

## Dirección vigente

LinkedIn trata fases y decisiones de empresas desarrolladoras: predio, diseño, inversión, servicios, ambiente, autoridades, construcción y operación. La tesis de Conde Barahona (2016) orienta temas; no demuestra derecho vigente, costos actuales ni plazos universales. La dirección infográfica integrada y comparativa del 18–20 octubre prevalece sobre prohibiciones genéricas anteriores de infografías. Mantener elegancia, claridad móvil, escenas diferentes y formato 4:5. La ausencia de personas es preferente, no absoluta. Voz objetiva y experta; copy en bloque de código con hashtags pertinentes.

General/Frases prioriza conceptos jurídicos de autores modernos y contemporáneos. Diferenciar citas, traducciones propias y síntesis editoriales. No imprimir países en esta línea; el alcance territorial se conserva fuera del arte. Para continuidad Instagram reciente respetar 4:5; general sin formato específico mantiene 9:16 seguro para recorte central 4:5. El formato actual solicitado prevalece. No repetir conceptos mediante cambios cosméticos. No Higgsfield.

Una referencia autorizada ya disponible puede aportar la marca; no inventar emblemas ni exigir al usuario que vuelva a aportar el mismo activo. Esto no elimina la comprobación de identidad de marca ni convierte el wordmark provisional en archivo oficial. Las nuevas generaciones requieren revisión individual y registro.

## Reanudar sin crear otro banco

1. Obtener exportación fresca completa del mismo maestro privado.
2. Ejecutar `production:engine memory` y `check-topic` como indica el runbook. El snapshot vive en `.production/`, nunca en `public/` ni en Git.
3. Revisar la adenda LM-SYNC-20261020 y los expedientes del canal: estado por versión, rechazo, aprobación expresa y pendientes.
4. Para citas, verificar texto/autor/obra/traducción; para LinkedIn, fuente oficial vigente y ámbito aplicable. No dar por nueva la misma conclusión editorial.
5. Producir una pieza, inspeccionarla y registrar su estado. Una llamada directa al generador de ChatGPT no es evidencia de ejecución de `prepareVisualBatch`.

La introducción inmobiliaria figura publicada según declaración del fundador, sin URL/plataforma exacta confirmada. La gestión tiene aprobación documentada. Servicios tiene una versión base aprobada y una revisión posterior pendiente. INAH y fianza ya se trabajaron. Los siete trámites anteriores conservan su entrega y la posterior corrección de enfoque; no se rehabilitan automáticamente. PDU/POEL, obra, cambios de proyecto, ad corpus/ad mensuram y PROFECO tienen antecedentes que deben cotejarse antes de repetir.

## Alcance técnico comprobado

`legallmente-alt/legalmente-web` permite escritura. `contratoslegales848-design/Psyche-creation` es público y la conexión sólo permite lectura: no se modificó ni se fingió sincronización. Los contratos externos para Gemini/Manus/Grok no demuestran que esos agentes hayan leído esta actualización.

Ver el recibo de importación en `docs/evidence/continuity-2026-10-20.json`. Sus cifras son términos de búsqueda, no temas únicos. Pruebas del runtime y TypeScript ejecutadas; la prueba real de datos demuestra recuperación de los seis conceptos antes omitidos. No acredita calidad visual de una nueva tanda.
