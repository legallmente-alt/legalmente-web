# LegalMente — Contrato de diversidad editorial

**Estado:** propuesta estructural autorizada por instrucción del Founder para ampliar el sistema temático.

**Objetivo:** impedir que LegalMente confunda `materia jurídica` con `tema`, `tema` con `formato`, o `formato` con `familia editorial`. El sistema debe producir un universo editorial expansible, no una cola finita de temas.

## 1. Principio rector

La diversidad editorial es una dimensión canónica de selección.

Un candidato no nace sólo de una materia. Nace de la combinación de conocimiento jurídico + necesidad humana + familia editorial + ángulo + contexto + profundidad + formato + memoria.

```text
CANDIDATO = MATERIA × SUBMATERIA × NECESIDAD × FAMILIA_EDITORIAL × PUERTA × ÁNGULO × CONTEXTO × PROFUNDIDAD × FORMATO × MEMORIA
```

Ninguna lista de familias se considera cerrada. Nuevas familias pueden incorporarse cuando sean distinguibles, útiles, verificables y no dupliquen semánticamente una existente.

## 2. Familias editoriales mínimas

El motor debe reconocer, como mínimo, las siguientes familias independientes entre sí:

- duda frecuente
- asesoría / orientación práctica
- concepto
- definición operativa
- diferencia
- confusión habitual
- mito
- error frecuente
- creencia popular
- costumbre jurídica o social
- ley / regla
- excepción
- requisito
- prohibición
- derecho
- obligación
- consecuencia
- riesgo
- señal de alerta
- qué hacer / primeros pasos
- qué no hacer
- checklist
- documento clave
- cláusula bajo lupa
- contrato bajo lupa
- proceso
- etapa procesal
- prueba
- carga de la prueba
- responsabilidad
- responsabilidad en cadena
- plazo
- prescripción / caducidad
- autoridad competente
- jurisdicción / territorio
- caso cotidiano
- caso hipotético
- caso real documentado
- historia del Derecho
- origen histórico
- cultura jurídica
- costumbre histórica
- doctrina
- jurista
- máxima / aforismo
- frase jurídicamente útil
- etimología
- rareza jurídica
- comparación de sistemas
- negocio + Derecho
- inmueble + Derecho
- trabajo + Derecho
- familia + Derecho
- salud + Derecho
- tránsito + Derecho
- tecnología + Derecho
- notarial / registral
- criminalística / forense
- evidencia digital
- herramienta práctica
- plantilla / estructura
- pregunta avanzada
- reflexión jurídica
- paradoja
- tensión entre legalidad y realidad
- derecho vs práctica cotidiana
- derecho vs expectativa del cliente
- prevención
- negociación
- conciliación / mediación
- reparación
- cumplimiento
- incumplimiento
- actualización normativa
- interpretación
- lenguaje jurídico explicado
- “no es lo mismo que…”
- “¿puede pasar esto?”
- “¿qué pasa si…?”
- “antes de firmar…”
- “antes de pagar…”
- “antes de denunciar…”
- “antes de demandar…”

Esta lista es **semilla**, no techo.

## 3. Regla de variedad real

La diversidad de un lote no se acredita porque cambie la materia o el título. Deben variar de forma sustancial varias de estas dimensiones:

- materia y submateria
- familia editorial
- necesidad humana
- etapa temporal (antes / durante / después)
- rol del lector (trabajador, arrendatario, comprador, médico, empresa, víctima, imputado, acreedor, heredero, etc.)
- ángulo
- profundidad
- tipo de evidencia
- tipo de consecuencia
- estructura narrativa
- formato
- metáfora y composición visual

Dos piezas pueden pertenecer a la misma materia si cumplen funciones editoriales distintas. Ejemplo: `arrendamiento + mito` no es equivalente a `arrendamiento + checklist`, `arrendamiento + diferencia`, `arrendamiento + cláusula`, `arrendamiento + caso`, `arrendamiento + señal de alerta` o `arrendamiento + asesoría`.

## 4. Anti-repetición semántica

El anti-repetición debe comparar al menos esta huella:

```text
materia
submateria
concepto_nucleo
familia_editorial
necesidad
pregunta_resuelta
angulo
contexto_funcional
rol_lector
consecuencia
hook
```

Cambiar sólo el hook, el título, la redacción o el arte no convierte un tema repetido en uno nuevo.

## 5. Reserva de candidatos

Para seleccionar 10 piezas, el motor debe generar una reserva suficientemente amplia y heterogénea. La reserva debe contener múltiples familias editoriales por materia y múltiples materias por familia.

La selección final debe evitar lotes dominados por una sola familia, incluso cuando los temas sean distintos. Salvo instrucción expresa, ningún lote de 10 debería sentirse como “10 definiciones”, “10 mitos”, “10 listas” o “10 frases”.

## 6. Frases, máximas y citas

Las frases no son decoración. Deben estar ligadas a una idea jurídica verificable, una tensión o una pregunta útil. Distinguir entre:

- máxima jurídica tradicional
- cita atribuida a autor verificable
- formulación editorial propia de LegalMente
- principio jurídico explicado en lenguaje claro

No inventar autoría ni presentar una formulación propia como cita histórica.

## 7. Asesorías y dudas reales

Las preguntas observadas en foros, consultas, buscadores, comentarios o interacción del público pueden alimentar candidatos, pero la popularidad de la pregunta no acredita la respuesta. La cadena correcta es:

```text
SEÑAL / DUDA → CLASIFICACIÓN → TOPIC CANDIDATE → VERIFICACIÓN → CLAIM → PIEZA
```

El motor debe conservar la formulación humana de la duda además de su clasificación jurídica.

## 8. Ley, costumbre, práctica y realidad

El sistema debe distinguir:

- lo que dice la norma
- lo que exige un procedimiento
- lo que suele ocurrir en la práctica
- la costumbre social o profesional
- la recomendación preventiva
- la opinión editorial

No presentar costumbre o práctica frecuente como ley.

## 9. Scoring de diversidad

La diversidad editorial debe evaluarse separadamente de la calidad jurídica y del arte. Una pieza puede ser correcta y visualmente buena, pero redundante dentro del lote.

Para lotes, medir al menos:

- diversidad de materias
- diversidad de familias editoriales
- diversidad de necesidades
- diversidad de roles de lector
- diversidad de ángulos
- distancia semántica entre candidatos

El scoring de diversidad no abre gates jurídicos ni sustituye revisión humana.

## 10. Relación con la capa de inteligencia

`familia_editorial`, `necesidad`, `pregunta_resuelta` y `rol_lector` deben viajar con TopicCandidate o quedar inequívocamente vinculados a él. Radar y Prioridad podrán agregarlos después, pero no deben redefinirlos.

La futura reconciliación de campos del frente de cadena debe incluir estas dimensiones para evitar que el almacén nazca con un modelo que sólo conoce materias y conceptos.

## 11. Regla de expansión

LegalMente debe tender a un espacio combinatorio grande y vivo. El objetivo no es mantener un banco cerrado de N temas, sino sostener una función generadora con memoria:

```text
conocimiento creciente + familias editoriales abiertas + señales reales + anti-repetición + verificación + memoria de rendimiento
```

Un banco, XLSX o catálogo es una semilla operacional; nunca es el universo completo de LegalMente.

## 12. No cambia estos gates

Este contrato no autoriza publicación, merge, deploy, cambio de claims, eliminación de revisión jurídica ni sustitución de fuentes primarias. Sólo establece la diversidad editorial como requisito estructural del motor.
