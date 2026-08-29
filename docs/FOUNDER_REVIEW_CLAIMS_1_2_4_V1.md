# LegalMente — Founder Review Claims 1, 2, 4 V1

Estado: `HUMAN_REVIEW_PENDING / LEGAL_CLAIM_ART_GATE_UNCHANGED / PUBLICATION_BLOCKED`.

Este documento prepara la decisión humana sobre texto exacto. No aprueba claims, no abre gates y no autoriza publicación.

## Corrección de frescura de fuentes

La corrección P0 de Gemini resolvió el error de binding previo y ligó correctamente los tres `CLAIM_ID` a sus `EXACT_TEXT`. Sin embargo, su metadata mexicana reportó una última reforma del CCF de 17-01-2024. La compilación oficial vigente de Cámara de Diputados consultada posteriormente muestra `Última Reforma DOF 14-11-2025`. Los artículos relevantes revisados abajo permanecen en el texto vigente consultado.

En España, el artículo 348 vigente incluye también la referencia a animales introducida por Ley 17/2021; el claim se limita a facultades sobre una cosa, por lo que esa actualización no contradice el contenido canónico.

## pieza-01-claim-1

**EXACT_TEXT**

> En los ordenamientos examinados, la propiedad o dominio atribuye facultades amplias de aprovechamiento, goce y disposición sobre una cosa, siempre dentro de los límites establecidos por la ley. La formulación técnica no es idéntica en México, España y Argentina.

**Binding:** `EXACT_MATCH`

**Soporte principal:**
- México: CCF art. 830, texto vigente consultado en Cámara de Diputados.
- España: CC art. 348, texto consolidado BOE.
- Argentina: CCyCN art. 1941, según el paquete P0 corregido.

**Observación de revisión:** la convergencia funcional está bien delimitada por “en los ordenamientos examinados” y la segunda oración evita falsa identidad técnica.

**Recomendación técnica para fundador:** `APPROVE_CANDIDATE`.

## pieza-01-claim-2

**EXACT_TEXT**

> La terminología no es uniforme. El Código Civil Federal mexicano denomina 'posesión derivada' a la de quien recibe temporalmente una cosa mediante arrendamiento, depósito u otro título análogo. El Código Civil español utiliza 'tenencia' dentro de su regulación de la posesión y distingue entre poseer como dueño o como tenedor. Argentina diferencia expresamente posesión y tenencia como dos relaciones de poder. Son figuras funcionalmente comparables, pero no necesariamente equivalentes en todos sus efectos.

**Binding:** `EXACT_MATCH`

**Soporte principal:**
- México: CCF arts. 790–791, texto vigente consultado en Cámara de Diputados; art. 791 conserva la categoría “posesión derivada”.
- España: CC arts. 430 y 432, BOE.
- Argentina: CCyCN arts. 1908–1910, según el paquete P0 corregido.

**Observación de revisión:** la última oración es una síntesis comparativa, no una equivalencia normativa. Debe mantenerse acompañada del scope México/España/Argentina y de fuentes visibles.

**Recomendación técnica para fundador:** `APPROVE_CANDIDATE`.

## pieza-01-claim-4

**EXACT_TEXT**

> Quien detenta un bien reconociendo el dominio ajeno no adquiere la propiedad por el simple transcurso del tiempo mientras conserve esa calidad. Para que pueda comenzar una posesión apta para usucapir debe producirse y probarse un cambio jurídicamente relevante hacia la posesión en concepto de propietario, además de cumplirse los requisitos y plazos de la legislación aplicable.

**Binding:** `EXACT_MATCH`

**Soporte principal:**
- México: CCF arts. 826–827 y 1151–1152, texto vigente consultado en Cámara de Diputados; la regla exige posesión en concepto de propietario y mantiene el concepto posesorio mientras no se pruebe su cambio.
- España: CC arts. 436 y 447, más régimen de prescripción de los arts. 1940 y ss., BOE.
- Argentina: CCyCN arts. 1897–1900 y 1915, según el paquete P0 corregido.

**Observación de revisión:** el claim no universaliza plazos y remite expresamente a la legislación aplicable. No convertirlo en instrucción para adquirir un inmueble ni en conclusión sobre un caso particular. En México, no presentar los plazos del CCF como regla civil única para las entidades federativas.

**Recomendación técnica para fundador:** `APPROVE_CANDIDATE_WITH_SCOPE_GUARDRAIL`.

## Founder decision

Decisión permitida por claim:
- `APROBAR`
- `DEVOLVER`
- `EXCLUIR`

La aprobación, si ocurre, debe referirse al `EXACT_TEXT` anterior y mantener visible el scope territorial del paquete. No implica autorización de publicación.
