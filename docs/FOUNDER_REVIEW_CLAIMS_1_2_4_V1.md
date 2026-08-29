# LegalMente — Founder Review Claims 1, 2, 4 V1

Estado: `FOUNDER_DECISION_RECORDED / CANONICAL_INGESTION_REQUIRED / PUBLICATION_BLOCKED`.

La decisión humana quedó registrada el `2026-08-28T20:10:17-05:00` en `FOUNDER_DECISION_RECEIPT_CLAIMS_1_2_4_V1.md`: `APROBAR` para los claims 1, 2 y 4 sobre los `EXACT_TEXT` siguientes. Este documento no abre por sí solo `gate_arte`; la ingestión canónica exige el mecanismo de `revision_humana` y el hash calculado por el validador del claim packet. No existe autorización de publicación.

## Corrección de frescura de fuentes

La corrección P0 de Gemini resolvió el error de binding previo y ligó correctamente los tres `CLAIM_ID` a sus `EXACT_TEXT`. Sin embargo, su metadata mexicana reportó una última reforma del CCF de 17-01-2024. La compilación oficial vigente de Cámara de Diputados consultada posteriormente muestra `Última Reforma DOF 14-11-2025`. Los artículos relevantes revisados abajo permanecen en el texto vigente consultado.

En España, el artículo 348 vigente incluye también la referencia a animales introducida por Ley 17/2021; el claim se limita a facultades sobre una cosa, por lo que esa actualización no contradice el contenido canónico.

## pieza-01-claim-1

**DECISIÓN HUMANA:** `APROBAR`

**EXACT_TEXT**

> En los ordenamientos examinados, la propiedad o dominio atribuye facultades amplias de aprovechamiento, goce y disposición sobre una cosa, siempre dentro de los límites establecidos por la ley. La formulación técnica no es idéntica en México, España y Argentina.

**Binding:** `EXACT_MATCH`

**Soporte principal:**
- México: CCF art. 830, texto vigente consultado en Cámara de Diputados.
- España: CC art. 348, texto consolidado BOE.
- Argentina: CCyCN art. 1941, según el paquete P0 corregido.

**Guardrail:** mantener visible el scope México / España / Argentina.

## pieza-01-claim-2

**DECISIÓN HUMANA:** `APROBAR`

**EXACT_TEXT**

> La terminología no es uniforme. El Código Civil Federal mexicano denomina 'posesión derivada' a la de quien recibe temporalmente una cosa mediante arrendamiento, depósito u otro título análogo. El Código Civil español utiliza 'tenencia' dentro de su regulación de la posesión y distingue entre poseer como dueño o como tenedor. Argentina diferencia expresamente posesión y tenencia como dos relaciones de poder. Son figuras funcionalmente comparables, pero no necesariamente equivalentes en todos sus efectos.

**Binding:** `EXACT_MATCH`

**Soporte principal:**
- México: CCF arts. 790–791, texto vigente consultado en Cámara de Diputados; art. 791 conserva la categoría “posesión derivada”.
- España: CC arts. 430 y 432, BOE.
- Argentina: CCyCN arts. 1908–1910, según el paquete P0 corregido.

**Guardrail:** conservar la advertencia de no equivalencia y el scope México / España / Argentina.

## pieza-01-claim-4

**DECISIÓN HUMANA:** `APROBAR`

**EXACT_TEXT**

> Quien detenta un bien reconociendo el dominio ajeno no adquiere la propiedad por el simple transcurso del tiempo mientras conserve esa calidad. Para que pueda comenzar una posesión apta para usucapir debe producirse y probarse un cambio jurídicamente relevante hacia la posesión en concepto de propietario, además de cumplirse los requisitos y plazos de la legislación aplicable.

**Binding:** `EXACT_MATCH`

**Soporte principal:**
- México: CCF arts. 826–827 y 1151–1152, texto vigente consultado en Cámara de Diputados; la regla exige posesión en concepto de propietario y mantiene el concepto posesorio mientras no se pruebe su cambio.
- España: CC arts. 436 y 447, más régimen de prescripción de los arts. 1940 y ss., BOE.
- Argentina: CCyCN arts. 1897–1900 y 1915, según el paquete P0 corregido.

**Guardrails:** no convertirlo en instrucción para adquirir un inmueble; en México no presentar los plazos del CCF como regla civil única para las entidades federativas; mantener la remisión a la legislación aplicable.

## Estado de gates

- Founder decision: `RECORDED`.
- Canonical `revision_humana`: `INGESTION_REQUIRED`.
- `LEGAL_CLAIM_ART_GATE`: `UNCHANGED` desde este documento.
- `PUBLICATION`: `BLOCKED / NOT_AUTHORIZED`.

La aprobación humana se refiere exclusivamente a los `EXACT_TEXT` anteriores y sus guardrails. No implica merge, deploy ni publicación.
