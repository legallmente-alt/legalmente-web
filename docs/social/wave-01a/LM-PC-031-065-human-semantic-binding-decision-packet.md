# Wave 01A — HUMAN SEMANTIC BINDING DECISION PACKET

**Scope:** LM-PC-031 y LM-PC-065 exclusivamente.

**Decision status:** Pendiente de decisión humana. Este packet no cambia ningún estado operativo y no crea parents.

**Fecha de emisión:** 2026-08-29

## Regla común de decisión

Un binding solo puede aprobarse si el parent existente conserva la relación semántica entre el user job, los claims, la fuente y el aprendizaje. La similitud temática no demuestra equivalencia jurídica. `RELATED_ONLY` significa únicamente una relación navegacional/editorial; **no** significa relación claim→source ni equivalencia jurídica.

Las opciones disponibles para cada unidad son:

- `BIND_TO_EXISTING_PARENT:<exact_parent_id>`
- `RELATED_ONLY`
- `KEEP_SEPARATED`
- `RETURN_BINDING`

La decisión no autoriza publicación, integración pública, Pinterest bulk upload, durable media hosting, deploy, merge, analítica ni promoción pública.

## LM-PC-031

### Identidad, claims y contexto

| Campo | Valor |
|---|---|
| `CONTENT_ID` | `LM-PC-031` |
| Claims exactos | `LM-PC-031-CL-01`; `LM-PC-031-CL-02` |
| User job | ¿Qué elementos ayudan a describir una relación de trabajo sin asumir una conclusión sobre mi caso? |
| Fuente | Ley Federal del Trabajo, arts. 20–21 y 25 |
| Fuente oficial | https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf |
| Territorio | México — explicación educativa; no regla panhispánica |
| Qualifier | No etiqueta una relación concreta ni calcula derechos o prestaciones. |
| Previous learning | Describir los hechos: quién trabaja, bajo qué organización y qué está documentado. |
| Next learning | Ordenar funciones, lugar, jornada, salario, pagos y vacaciones sin convertir la lista en una conclusión individual. |
| Estado actual | `SEPARATED_PENDING_BINDING` |

Los claims explican cómo ordenar elementos de una posible relación de trabajo y de su documentación, sin concluir que exista una relación laboral concreta ni calcular derechos.

### Candidatos existentes

| Parent exacto | Tipo | Encaje semántico | Por qué sí | Por qué no / riesgo |
|---|---|---|---|---|
| `empresa-comercio` | Mundo | **Candidato defendible, amplio** | El mundo declara incluir contratos, sociedades, relaciones de trabajo, gobierno y actividad económica. Acomoda el user job sin convertirlo en una conclusión. | Es demasiado amplio para servir como claim-level parent; no debe presentarse como equivalente a una serie o capítulo laboral específico. |
| `organizar-hechos-y-prueba` | Proceso | **Candidato defendible, operativo** | El proceso separa hechos de conclusiones y relaciona hechos relevantes con evidencia; coincide directamente con el previous/next learning. | Es transversal y no es una fuente laboral; el binding no debe hacer parecer que el proceso prueba una relación de trabajo. |
| `hechos-y-prueba` | Serie | **Candidato defendible, contextual** | La serie organiza cómo una versión de lo ocurrido se convierte en materia de procedimiento; encaja con documentación y evidencia. | No es una serie laboral y podría desplazar el foco desde la LFT hacia conflicto/procedimiento. Solo sería seguro como relación editorial o parent contextual, no como claim laboral específico. |
| `hechos-ordenados` | Capítulo | **Candidato defendible, limitado** | Su tema es distinguir cronología, personas, actos y consecuencias antes de hablar de prueba; sirve para el aprendizaje de ordenar hechos. | No contiene el marco laboral de los arts. 20–21 y 25; una asociación directa podría insinuar que el capítulo respalda los claims laborales. |
| `hechos-y-evidencia` | Capítulo | **Candidato defendible, limitado** | Conecta afirmaciones relevantes con evidencia disponible y sus límites. | Es probatorio, no laboral; no debe usarse como parent claim→source. |
| `deber-profesional` | Capítulo | **No defendible; excluido** | — | Pertenece a Salud y medicina y al mundo de responsabilidad profesional. Forzarlo produciría una falsa asociación jurídica y contradice el alcance de LM-PC-031. |

### Riesgos de falsa asociación jurídica

El principal riesgo es presentar un proceso o capítulo transversal como si fuera una clasificación laboral o como si la existencia de documentos probara subordinación, salario o derechos. También sería incorrecto convertir `deber-profesional` en parent por proximidad de la palabra “trabajo”: pertenece a una categoría sanitaria/profesional distinta.

### Efecto exacto de cada opción

| Opción | Efecto exacto |
|---|---|
| `BIND_TO_EXISTING_PARENT:empresa-comercio` | Asocia LM-PC-031 al mundo existente `empresa-comercio` únicamente; no crea serie/capítulo laboral, no cambia claims ni fuente y no autoriza publicación. |
| `BIND_TO_EXISTING_PARENT:organizar-hechos-y-prueba` | Asocia la unidad al proceso transversal existente para aprendizaje y navegación; no convierte el proceso en fuente laboral ni prueba una relación concreta. |
| `BIND_TO_EXISTING_PARENT:hechos-y-prueba` | Asocia la unidad a la serie probatoria existente como contexto editorial; no crea equivalencia con LFT ni parent laboral. |
| `BIND_TO_EXISTING_PARENT:hechos-ordenados` | Asocia únicamente al capítulo de ordenación de hechos; no habilita ruta pública ni claim laboral automático. |
| `BIND_TO_EXISTING_PARENT:hechos-y-evidencia` | Asocia únicamente al capítulo de evidencia; no habilita ruta pública ni claim laboral automático. |
| `RELATED_ONLY` | Permite relación navegacional/editorial con candidatos existentes, sin relación claim→source ni equivalencia jurídica. |
| `KEEP_SEPARATED` | Conserva `SEPARATED_PENDING_BINDING` sin parent ni ruta. |
| `RETURN_BINDING` | Devuelve el binding para corrección; conserva `SEPARATED_PENDING_BINDING`. |

**Decisión humana para LM-PC-031:** ____________________________________

## LM-PC-065

### Identidad, claims y contexto

| Campo | Valor |
|---|---|
| `CONTENT_ID` | `LM-PC-065` |
| Claims exactos | `LM-PC-065-CL-01`; `LM-PC-065-CL-02` |
| User job | ¿Qué documentos y datos conviene ordenar para entender una sociedad mercantil? |
| Fuente | Ley General de Sociedades Mercantiles, arts. 1 y 6 |
| Fuente oficial | https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSM.pdf |
| Territorio | México — explicación educativa; no regla panhispánica |
| Qualifier | No identifica ni valida una entidad concreta ni confirma que un documento esté completo o vigente. |
| Previous learning | Identificar la categoría de sociedad antes de leer un documento como si fuera intercambiable con otro. |
| Next learning | Separar escritura o póliza constitutiva y datos corporativos; la representación queda como pregunta relacionada y requiere un binding propio. |
| Estado actual | `SEPARATED_PENDING_BINDING` |

Los claims explican cómo ordenar la categoría societaria, el instrumento constitutivo y sus datos. **No presentan representación como claim soportado por los arts. 1 y 6 de la LGSM**; la representación permanece como pregunta relacionada que requiere soporte y binding propio.

### Candidatos existentes

| Parent exacto | Tipo | Encaje semántico | Por qué sí | Por qué no / riesgo |
|---|---|---|---|---|
| `empresa-comercio` | Mundo | **Candidato defendible, amplio** | El mundo incluye sociedades, representación y actividad económica; es el único contexto amplio que contiene el tema societario. | No es parent específico de sociedad mercantil ni fuente de los arts. 1 y 6; un binding directo puede sobreafirmar el alcance. |
| `empresa-que-obliga` | Serie | **Candidato adyacente, no claim-parent seguro** | Su título y resumen tratan representación, facultades y efectos frente a terceros; puede servir como relación futura para la pregunta de representación. | LM-PC-065 trata primero categoría, escritura/póliza y datos corporativos. Usarla como parent directo haría parecer que LGSM arts. 1 y 6 soportan representación. |
| `representacion-empresa` | Capítulo | **Candidato adyacente, no claim-parent seguro** | Distingue la idea de representación y sus formalidades territoriales; coincide solo con la pregunta relacionada. | No encaja como parent de los claims societarios principales y podría generar falsa asociación entre representación y LGSM arts. 1 y 6. |
| `poder-y-vigencia` | Capítulo | **No defendible como parent principal; relación futura posible** | Ayuda a revisar vigencia, revocación y prueba de facultades. | LM-PC-065 no afirma ni estudia poderes o vigencia; el vínculo directo desviaría el user job y la fuente. |
| `representacion` | Concepto | **Candidato relacionado, no claim-parent** | El concepto explica la idea general de actuar por otra persona o entidad y exige revisión territorial. | No debe recibir los claims de LM-PC-065 ni presentarse como respaldado por LGSM arts. 1 y 6; solo puede ser una pregunta relacionada con binding propio. |
| `poder` | Concepto | **No defendible como parent principal; relación futura posible** | Se conecta con facultades y representación. | No aparece en los claims exactos; usarlo como parent introduciría un tema no afirmado. |
| `verificar-representacion` | Proceso | **Candidato relacionado, no claim-parent** | Ordena persona que actúa, entidad representada, fuente de facultades, alcance y vigencia. | Es posterior y distinto del user job societario; no debe convertir la representación en claim de los arts. 1 y 6. |

### Riesgos de falsa asociación jurídica

El riesgo principal es atribuir a los arts. 1 y 6 de la LGSM una conclusión sobre quién puede representar a una sociedad, qué facultades tiene o si un poder es vigente. Otro riesgo es usar `empresa-que-obliga`, `representacion-empresa` o `representacion` como si fueran equivalentes al tema de constitución societaria. Esos elementos pueden aparecer solo como continuidad editorial o pregunta relacionada con soporte propio.

### Efecto exacto de cada opción

| Opción | Efecto exacto |
|---|---|
| `BIND_TO_EXISTING_PARENT:empresa-comercio` | Asocia LM-PC-065 al mundo societario/económico amplio; no crea parent societario específico ni convierte representación en claim de LGSM arts. 1 y 6. |
| `BIND_TO_EXISTING_PARENT:empresa-que-obliga` | Solo sería aceptable si la decisión humana limita expresamente el alcance a continuidad editorial sobre representación; no debe recibir los claims principales como equivalencia jurídica. |
| `BIND_TO_EXISTING_PARENT:representacion-empresa` | Solo sería aceptable para una relación acotada a la pregunta relacionada de representación, con soporte propio; no para los claims societarios principales. |
| `BIND_TO_EXISTING_PARENT:representacion` | Solo relación conceptual acotada; no relación claim→source ni respaldo de LGSM arts. 1 y 6. |
| `BIND_TO_EXISTING_PARENT:verificar-representacion` | Solo proceso relacionado para una pregunta futura sobre facultades; no parent de los claims exactos actuales. |
| `RELATED_ONLY` | Permite relación navegacional/editorial con representación o revisión de facultades, sin relación claim→source ni equivalencia jurídica. |
| `KEEP_SEPARATED` | Conserva `SEPARATED_PENDING_BINDING` sin parent ni ruta. |
| `RETURN_BINDING` | Devuelve el binding para corrección; conserva `SEPARATED_PENDING_BINDING`. |

**Decisión humana para LM-PC-065:** ____________________________________

## Condiciones que no cambian

LM-PC-031 y LM-PC-065 permanecen `SEPARATED_PENDING_BINDING` hasta recibir una decisión humana explícita por unidad. No se inventan parents, rutas, breadcrumbs ni relaciones de fuente. No se autoriza publicación, Pinterest bulk upload, durable media hosting, deploy, merge, analítica ni promoción pública.

## Referencias

[1]: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf "Ley Federal del Trabajo — Cámara de Diputados"
[2]: https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSM.pdf "Ley General de Sociedades Mercantiles — Cámara de Diputados"
[3]: ../../../src/lib/knowledge-graph/content.ts "Knowledge Graph canónico de LegalMente"
[4]: ../../../src/lib/knowledge-graph/wave01a.ts "Estado operativo Wave 01A"
