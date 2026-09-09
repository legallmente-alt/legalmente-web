# LegalMente — Release 01 / Microlote 01 — Research V1

**Estado:** SOURCE RESEARCH / WORKING BRANCH / NO PUBLICATION  
**Rama:** `chatgpt/legalmente-release-01`  
**Fecha:** 2026-09-09

## Regla

Este archivo reúne **fuentes candidatas oficiales** para cerrar el primer microlote. No sustituye el validador canónico, no crea por sí mismo claims aprobados y no abre ningún gate. Cuando el claim packet exista, debe pasar por el validator real y revisión humana.

---

## 1. LM-R01-001 — Finiquito (México)

**Pregunta editorial:** ¿Qué debería aparecer en un finiquito antes de firmarlo?

**Fuente primaria candidata A**  
Ley Federal del Trabajo, texto vigente, Cámara de Diputados. Última reforma indicada en el texto consultado: DOF 15-01-2026.  
https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf

**Fuente oficial explicativa candidata B**  
PROFEDET — “¿Qué hacer si te despiden? Profedet defiende tus derechos laborales”, 26-09-2025.  
https://www.gob.mx/profedet/articulos/que-hacer-si-te-despiden-profedet-defiende-tus-derechos-laborales?idiom=es

**Fuente oficial explicativa candidata C**  
PROFEDET — “Renuncia voluntaria”.  
https://www.profedet.gob.mx/micrositio/index.php/renuncia-voluntaria

**Hallazgo útil para claim prep:** la fuente oficial identifica, según el supuesto, prestaciones adeudadas/proporcionales como vacaciones, prima vacacional, aguinaldo y prima de antigüedad cuando proceda. Debe evitarse mezclar `finiquito` con `liquidación` o convertir una lista general en cálculo individual.

**Estado:** `SOURCE_CANDIDATES_FOUND / CLAIM_PACKET_PENDING / VERIFY_PENDING`.

---

## 2. LM-R01-016 — Before Signing

**Pregunta editorial:** ¿Qué conviene comprobar cuando un contrato parece completo?

**Estado del producto:** `/antes-de-firmar` ya existe en la superficie educativa estática y usa únicamente elecciones estructurales transitorias; no acepta nombres, correos, texto libre, contratos, archivos, hechos de caso ni pagos y no determina validez jurídica.

**Tratamiento para Release 01:** mantener la pieza en **preparación**, no convertirla en conclusión jurídica. El contenido puede ordenar preguntas sobre partes, objeto/prestación, vigencia/terminación, anexos/espacios pendientes y ley/foro, pero cualquier afirmación territorial específica requiere su propia fuente y claim packet.

**Estado:** `EXISTING_SAFE_TOOL / CONTENT_DEEPENING / EDITORIAL_QA_PENDING`.

---

## 3. LM-R01-006 — Facultades de firma / representación (México)

**Pregunta editorial:** ¿Qué demuestra que una persona puede obligar a una sociedad?

**Fuente primaria candidata**  
Ley General de Sociedades Mercantiles, Cámara de Diputados. Artículo 10: representación de la sociedad mercantil y poderes otorgados por la sociedad.  
https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSM.pdf

**Dirección de claim prep:** no publicar la simplificación “el cargo no basta” como universal panhispánico. En México, el artículo 10 da un punto de partida para explicar quién representa a una sociedad y cómo pueden otorgarse poderes, sujeto al contrato social, ley aplicable, vigencia, alcance y evidencia concreta.

**Estado:** `SOURCE_CANDIDATE_FOUND / MX / CLAIM_PACKET_PENDING / VERIFY_PENDING`.

---

## 4. LM-R01-011 — Datos personales e IA (Unión Europea)

**Pregunta editorial:** ¿Qué pasa con un dato personal cuando entra a un sistema de IA?

**Fuente primaria candidata A**  
Reglamento (UE) 2016/679 (RGPD), EUR-Lex. Artículo 4 define “datos personales” y “tratamiento”, incluyendo operaciones automatizadas o no.  
https://eur-lex.europa.eu/legal-content/EN-ES/TXT/?from=EN&uri=CELEX%3A32016R0679

**Fuente primaria candidata B**  
Reglamento (UE) 2024/1689 (AI Act), EUR-Lex.  
https://eur-lex.europa.eu/eli/reg/2024/1689/oj/spa

**Dirección de claim prep:** una herramienta de IA no debe tratarse como excepción automática a protección de datos. El claim debe distinguir protección de datos de obligaciones específicas del AI Act y limitarse al supuesto concreto. No extrapolar a México, España fuera del marco UE, ni al universo panhispánico sin adaptador territorial.

**Estado:** `SOURCE_CANDIDATES_FOUND / EU / CLAIM_PACKET_PENDING / VERIFY_PENDING`.

---

## 5. LM-R01-014 — Evidencia digital (México)

**Pregunta editorial:** Una captura enseña algo. ¿Qué prueba realmente?

**Fuente primaria candidata**  
Código Nacional de Procedimientos Civiles y Familiares, Cámara de Diputados. Última reforma indicada: DOF 15-01-2026.  
https://www.diputados.gob.mx/LeyesBiblio/pdf/CNPCF.pdf

**Puntos para claim prep:**
- Art. 308: documentos físicos y electrónicos reciben el mismo trato bajo equivalencia funcional y neutralidad tecnológica, con reglas sobre objeción, impugnación y fiabilidad.
- Art. 335: admite otros medios, incluidos videos, fotografías e información generada o comunicada por medios electrónicos, cuando puedan producir convicción y cumplan las reglas aplicables.

**Límite crítico de vigencia territorial:** la aplicación del Código Nacional es gradual por declaratorias federales/locales y no debe presentarse como si estuviera ya operando de manera idéntica en todos los tribunales del país; el propio régimen transitorio fija como fecha límite el 1 de abril de 2027.

**Estado:** `SOURCE_CANDIDATE_FOUND / MX / IMPLEMENTATION_STATUS_MUST_BE_CHECKED / CLAIM_PACKET_PENDING / VERIFY_PENDING`.

---

## Resultado del primer research pass

| Pieza | Fuente oficial candidata | Principal riesgo antes de Verify |
|---|---|---|
| LM-R01-001 Finiquito | Sí | Confundir finiquito, indemnización y liquidación; cálculo individual |
| LM-R01-016 Before Signing | Herramienta existente | Convertir preparación en dictamen de validez |
| LM-R01-006 Facultades | Sí | Universalizar una regla mexicana o ignorar contrato social/poder concreto |
| LM-R01-011 Datos + IA | Sí | Mezclar RGPD y AI Act; extrapolar territorio |
| LM-R01-014 Evidencia digital | Sí | Ignorar entrada en vigor gradual del CNPCF y contexto procesal |

## Siguiente paso

Crear los cinco claim packets con texto exacto consultado, source IDs/URLs, territorio, límites y estado de vigencia; correr el validator canónico; únicamente las piezas que cierren ese gate pasan a narrativa y arte. Ninguna de las cinco queda autorizada para publicación por este documento.
