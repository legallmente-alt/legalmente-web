# LegalMente — Contrato operativo para agentes y motores
**Fecha:** 2026-10-10 · **Estado:** PROPUESTA DOCUMENTADA; no equivale a merge, despliegue, prueba real ni aprobación editorial.

## 0. Fuentes y precedencia
Leer en este orden:
1. [00 LEER PRIMERO](https://docs.google.com/document/d/1Aby_uhs_cuHJCsszKbyveN13qFzbG9gMSLzEoELRabA/edit).
2. [Índice maestro v18](https://docs.google.com/document/d/1UzU1nbltiAEiMAjTt0GsHcZd14d_ofOtNeK4pFQjKs4/edit).
3. [Contrato visual v4](https://docs.google.com/document/d/1lRWHheyLHuTbPC6oTi3QESHquc45vWQ4v4qgyBsGEYE/edit).
4. Registro Maestro Anti-Repetición v2, protocolo visual/editorial v3 compatible, memoria fuerte y bitácora.
5. [Guía Drive ↔ motor de código v5](https://docs.google.com/document/d/1r4f9avIZTYQVObOstVp6sNgF8hfUa_dOmlk60D5XRws/edit).
6. Para frases: [Motor @perillo_ius](https://docs.google.com/document/d/1k4HJRu2L6DMb7OiJ7xgc40WhjkImGpZzkoIq5kXuCo0/edit), [banco crudo](https://docs.google.com/document/d/1P73J5aKkfDJShCc-Q8KzT5Vo2L1PfSUmslBQSBKZ9ws/edit), [revisión crítica](https://docs.google.com/document/d/1k7a1Qx80fdi06DkrRfncLh7OgjJfbVHxi6lGnNcvSTU/edit).
**Regla:** Drive define las reglas editoriales; código implementa. Documento LEGACY/SUPERADO/AUXILIAR no sobreescribe el canon. Aprobación del fundador requiere evidencia explícita.

## 1. Orquestación común
Solicitud → modo (GENERAL, MATERIA, FRASES, LINKEDIN_LEGALMENTE, LINKEDIN_FOUNDER) → investigación y candidatos → filtro anti-repetición → verificación de fuentes/territorio/fecha → ficha de contenido → argumento causal visual → dirección artística → prompt compilado → generación real del archivo → inspección jurídica, visual, técnica y móvil → entrega con evidencia → selección humana → registro → publicación separada y autorizada.

## 2. Matriz de agentes/motores
| Agente o motor | Puede hacer | No puede declarar o hacer por sí solo | Evidencia de salida |
|---|---|---|---|
| Radar/Manus/Gemini | Investigar necesidades y temas con fuentes y fechas; proponer candidatos | Tratar tendencias como hechos jurídicos o adjudicar aprobación | Lista de candidatos y enlaces verificables |
| Jurídico/verificador | Confirmar doctrina, texto, autoría, jurisdicción, vigencia y matices | Inventar artículos, citas, sentencias o universalidad | Claim, fuente primaria y alcance |
| Motor de frases | Clasificar @perillo_ius, autores vs formulaciones originales; valorar fuerza editorial | Atribuir frases originales a terceros; resucitar citas bloqueadas | Frase, estado de autoría, procedencia, QA |
| Memoria/anti-repetición | Comparar temas, tesis, metáforas, personajes, técnicas y piezas entregadas | Tratar GENERADA como APROBADA | Comparaciones y bloqueos aplicados |
| Director artístico v4 | Diseñar escena causal, estilo, materialidad y marca física; elegir un lenguaje dominante | Imponer óleo/claroscuro/latón como preset global | Brief de arte específico |
| Compilador de prompts | Integrar contenido validado y brief; producir prompt inequívoco | Confundir prompt con imagen ni mezclar medios incompatibles | Prompt versionado con ID |
| Generador visual autorizado | Producir PNG/JPEG individual realmente renderizado | Marcar como entregado si sólo existe descripción o simulación | Archivo inspeccionable, dimensiones, hash |
| QA | Comprobar precisión jurídica, logo, ortografía, originalidad, recorte, compatibilidad y formato | Aceptar por metadatos exclusivamente | Informe PASS/FAIL e imágenes verificadas |
| Código/web/Remotion | Integrar rutas y automatizaciones; render de video si aplica; ejecutar tests | Suponer que render de video implica generación de imagen web | Commit, logs, pruebas y resultado E2E |
| Coordinador | Actualizar bitácora, estados, decisiones y asignación de pendientes | Publicar/merge/deploy sin autorización y gates | Enlaces a artefactos y decisiones |
| Fundador | Preseleccionar, aprobar, descartar y autorizar publicación | — | Decisión explícita asociada al ID |

## 3. Prompt maestro reutilizable de IMAGEN (rellenar variables)
```text
LEGALMENTE | MODO: {GENERAL/MATERIA/FRASES/LINKEDIN}
CONTENT_ID: {id} | MATERIA: {materia} | ALCANCE: {territorio}
IDEA JURÍDICA VERIFICADA: {claim y límites}
TITULAR EXACTO: {frase/pregunta} | RESPUESTA EJECUTIVA: {respuesta}
DIRECCIÓN PRINCIPAL: {familia y técnica coherentes}
ESCENA ÚNICA: {sujeto} realiza {acción observable} en {entorno concreto};
la relación causal {causa → consecuencia} debe entenderse visualmente.
METÁFORA: {metáfora física que transmite la tensión jurídica}.
COMPOSICIÓN: {óptica/ángulo/distancia, iluminación, materialidad, paleta compatibles}.
MARCA: integrar el texto/logo oficial visible "LegalMente" físicamente en
{superficie propia de la escena}, con perspectiva, luz, textura y escala coherentes;
nunca marca flotante, esquina automática ni watermark.
FORMATO: General 1080x1920, LinkedIn 1080x1350 salvo pedido explícito.
Si 9:16, titular, copy esencial, protagonista y logo deben sobrevivir recorte
central 4:5. Texto centrado, legible en móvil y tipografía adecuada a la pieza.
PROHIBIDO: citas normativas visibles, texto corrupto, escenas múltiples,
juzgados/mazos/balanzas genéricos, clonación de estilos previos,
atribuciones dudosas y elementos sin función jurídica.
GENERAR un solo archivo de imagen. Inspeccionar el archivo real; corregir fallos.
```

## 4. Modo FRASES y @perillo_ius
El banco crudo es investigación/inspiración, NO licencia para copiar ni garantía de atribución. Cada candidato debe identificarse como (a) cita literal verificable con autor, obra, pasaje y contexto, (b) paráfrasis identificada, o (c) formulación original LegalMente sin firma ajena. Rechazar falsos autores, doctrinas invertidas y duplicados. Las 17 formulaciones del motor histórico son propuestas sujetas a nueva verificación, no citas comprobadas ni publicaciones. Priorizar densidad jurídica, tensión intelectual y legibilidad; el contrato visual v4 prevalece sobre la obligación histórica de óleo/claroscuro.

### Prompt extra — FRASES
```text
Aplica el contrato maestro en modo FRASES. Evalúa {frase} del banco
{archivo/entrada}; determina cita literal, paráfrasis o frase original.
Documenta autor/obra/contexto si es literal; de otro modo elimina
atribución externa. Verifica relevancia jurídica y alcance. Compara
contra memoria editorial. Propón una escena simbólica original que
exprese la tensión sin clichés, selecciona estilo causal según v4
(sin preset fijo), integra logo LegalMente y genera una imagen
individual legible. Conserva evidencia de QA y nunca marques PUBLICADA.
```

## 5. Estados y aceptación
PROPUESTA → CANDIDATO_VERIFICADO → PROMPT_LISTO → IMAGEN_GENERADA → QA_APROBADO → ENTREGADA → PRESELECCIONADA → APROBADA → PUBLICADA.
DESCARTADA/BLOQUEADA se registran aparte; retroceso permitido. **Ningún estado implica automáticamente el siguiente**. EN PRUEBA ≠ FUNCIONANDO.

Pruebas mínimas por pieza: archivo real visible, dimensiones reales, recorte 4:5, exactitud de texto, LOGO FÍSICO visible, escena causal, fuente jurídica comprobada, anti-repetición y revisión a tamaño móvil. Para el motor web: solicitud → backend/proveedor → resultado accesible → QA → persistencia; logs sin secretos. Aceptación global v4: diez imágenes individuales, variedad perceptible y control de calidad real; no basta con prompts, tests unitarios o previews.

## 6. Continuidad y depuración de otros agentes
Inventariar ID, nombre, fecha, origen/agente, propósito, dependencia, evidencia de ejecución, validación explícita del fundador, canon que lo sustituye y rollback. Clasificar: VIGENTE, PROPUESTA, HISTÓRICO, BLOQUEADO, PENDIENTE_PRUEBA. Sacar del punto de entrada lo superado, pero no eliminar originales ni romper referencias. Toda modificación técnica debe ligarse a issue/PR, pruebas, commit y decisión. No fusionar ramas ni desplegar sólo por existir este documento.

## 7. Pendientes técnicos
Verificar estado real de PR #59, #61 y #62 y main del repositorio legallmente-alt/legalmente-web; ubicar API de imágenes y página afectada; probar un ejemplo GENERAL y uno FRASES de extremo a extremo antes del lote de diez. Seguimiento: https://github.com/legallmente-alt/legalmente-web/issues/63.
