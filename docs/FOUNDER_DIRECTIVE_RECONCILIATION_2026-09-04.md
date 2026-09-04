# LegalMente — Reconciliación de la directiva del fundador — 2026-09-04

## Estado

`FOUNDER_DIRECTIVE_RECONCILED / READY_FOR_REVIEW / NOT_PUBLISHED / NO_DEPLOY`

Esta reconciliación extiende la arquitectura existente. No crea un segundo canon jurídico ni mueve autoridad legal al frontend/product layer.

## Dirección consolidada

LegalMente debe operar como un motor vivo de conocimiento, aprendizaje y aplicación. La persona puede entrar por necesidad, pregunta, error común, mito, concepto, requisitos, pasos, situación humana, prevención, historia/cultura o profundidad profesional. La clasificación jurídica por materia sigue existiendo, pero ya no es la única puerta de entrada.

El orden conceptual es progresivo: fundamentos → materias → necesidades/procesos → comparado explícito → especialización territorial. La metáfora de una pirámide es pedagógica, no una taxonomía rígida.

La capa general permanece panhispánica. Cuando la respuesta cambia por territorio, el sistema debe bloquear, cualificar o pasar a una capa territorial explícita. Comparado y actualidad requieren territorios/fecha/fuentes adecuadas; la prioridad de mercado nunca abre un gate jurídico.

## Motor de oportunidad y amplitud

Las necesidades, materias y relaciones deben rotar para impedir que contratos, inmobiliario o cualquier otro cluster capture todo el roadmap. El sistema ya dispone de rutas semilla no canónicas para compra de vehículo usado, terreno, pre-firma, consumidor, proceso penal, familia, representación, sociedad, uso de suelo/desarrollo y evidencia digital.

Estas rutas son hipótesis de investigación y producto. No son listas de requisitos aprobadas ni asesoría.

Las señales de utilidad, interés, viralidad, retención, monetización y búsqueda pueden modificar la prioridad editorial/producto. No pueden modificar claims, fuente, territorio, vigencia ni estado de gate.

## LinkedIn

La salida Founder LinkedIn permanece separada de LegalMente general. Toda proyección profesional debe tener provenance verificable y utilizar experiencia real/anónima; no inventar cargos, clientes, casos ni resultados.

## Visual — corrección operativa consolidada

La separación correcta es entre arte base generado y asset final.

> **El proveedor visual genera arte sin caracteres. Toda tipografía de LegalMente —la marca y, cuando el formato lo exija, el copy editorial— se incorpora después mediante composición determinista y se valida contra el contenido aprobado.**

### Arte base

- cero letras;
- cero números;
- cero pseudotexto;
- metáfora visual comprensible;
- una sola escena;
- superficie física reservada para la marca cuando aplique;
- muestras aprobadas consultadas;
- no collage/grid/storyboard.

### Composición determinista

- `LegalMente` exacto;
- integrado físicamente en placa, sello, lomo, cuaderno, carpeta, vidrio, metal, madera, piedra u otra superficie coherente;
- nunca watermark ni overlay arbitrario;
- título, pregunta, frase, pasos, comparación o copy editorial sólo si el formato lo requiere y desde Content Pack aprobado;
- autor, cita y fuente sólo con binding aprobado;
- tipografía, escala, perspectiva, material, luz y safe area controlados.

### QA

- exactitud textual contra Content Pack;
- marca integrada;
- legibilidad móvil;
- perspectiva/material/luz coherentes;
- no collage;
- no repetición indebida;
- revisión humana obligatoria.

El contrato ejecutable vive en `src/lib/product-directive/visual-composition.ts` y sus pruebas en `visual-composition.test.ts`.

## ADR 0002 y trazabilidad

Antes de esta reconciliación no se pudo demostrar en el remoto accesible una rama `claude/convergencia-superset` ni un ADR 0002 remoto. Para cerrar esa ambigüedad sin fingir historia, PR #42 crea `docs/adr/0002-character-free-base-art-deterministic-typography.md` con estado `PROPOSED_FOR_CANONICAL_REVIEW`.

No debe describirse como canon de `main` hasta aprobación/merge conforme a la gobernanza vigente.

## Piloto visual end-to-end

No se debe volver a validar el motor con un lote de diez. El siguiente gate visual correcto es una sola pieza real:

`CONTENT PACK APTO → METÁFORA → ARTE BASE SIN CARACTERES → COMPOSICIÓN DETERMINISTA → QA → REVISIÓN HUMANA → ASSET FINAL`.

Durante esta reconciliación se revisó `docs/content/legalmente-01-consentimiento/content-pack.md`; su estado declarado es `DRAFT_CONTENT`, por lo que no cumple el gate de pieza real aprobada para este piloto.

También se revisó `docs/FOUNDER_DECISION_RECEIPT_CLAIMS_1_2_4_V1.md`: registra aprobación humana externa, pero declara `CANONICAL_INGESTION_REQUIRED` y mantiene cerrado el gate de arte/publicación. No debe utilizarse para simular que ya existe un Content Pack apto.

Por tanto el motor visual queda implementado y testeable, pero el primer asset end-to-end permanece correctamente bloqueado hasta localizar o producir mediante el flujo canónico un Content Pack con estado jurídico/editorial que permita arte.

## Gemini

La capacidad de imagen debe distinguir:

1. SDK/integración declarada en repositorio;
2. CLI disponible en el entorno que se está inspeccionando;
3. credencial/configuración presente sin revelar valores;
4. generación real autorizada y comprobada.

Ninguna de las tres primeras por sí sola prueba capacidad real de imagen. La preflight existente debe permanecer fail-closed.

## Decisión final de esta reconciliación

Se acepta y ejecuta la corrección de arquitectura visual. Se preservan los gates de legalidad, fuente, territorio, publicación y revisión humana. El objetivo no es producir volumen antes de tiempo; es conseguir que LegalMente pueda repetir el ciclo correctamente y después escalar.
