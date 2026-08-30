# Product Lab — review surface handoff V1

**Estado:** implementado en rama aislada; pendiente de revisión y merge.

## Corrección ejecutada

La bandeja interna de Wave 01A contenía datos de `sourceLabel`, `sourceUrl`, `sourceVersion` y un arreglo `claims` con artículos, textos jurídicos y qualifiers. Eso contradice el estado documental del proyecto, que exige una superficie de revisión limitada a pregunta, `CONTENT_ID`, territorio, ruta candidata y estado; la presencia visual y la procedencia no deben convertirse en publicación, aprobación ni claim soportado.

La corrección elimina del modelo y del render los claims, artículos, URLs de fuentes y copy jurídico. La bandeja mantiene únicamente la pregunta de usuario, el identificador, el territorio de piloto, la ruta candidata, los formatos visuales, el estado `HUMAN_REVIEW_REQUIRED` y una nota explícita de que el binding y la fuente permanecen fuera de la bandeja hasta completar la revisión humana.

## Gate añadido

`npm run test:internal-review-surface` verifica que los campos de revisión requeridos estén presentes y que no reaparezcan `claims`, `sourceLabel`, `sourceUrl`, `sourceVersion`, `Fuente oficial`, `Copy educativo interno` ni interpolaciones de claims o fuentes. El workflow `legal-core-ci.yml` ejecuta este gate después del gate de rutas y descubrimiento público.

## Evidencia local

- `test:internal-review-surface`: PASS.
- `test:legal-core`: 13/13 PASS.
- `test:knowledge-safety`: 3/3 PASS.
- `typecheck`: PASS.
- `lint`: PASS.
- `build:public`: PASS.
- `test:public-routes`: 10 rutas, 54 HTML, 52 URLs de sitemap, 0 enlaces rotos; PASS.
- `privacy-surface-smoke`: 37 archivos; PASS.
- `git diff --check`: PASS.
- `out/internal`, `out/internal-assets`: ausentes en el artefacto público.

## Límite

Este cambio corrige una exposición documental y de superficie interna. No autoriza claims, no resuelve source bindings, no cambia la publicación, no abre PII, no activa servicios profesionales y no sustituye revisión Founder/legal.

## Fuentes de continuidad

[1]: https://drive.google.com/file/d/1rAV3Ij9fAtwfsT3XK38mt7JtxS20uOmv/view?usp=drivesdk "LegalMente — Co-Manager Alignment Brief"
[2]: https://drive.google.com/file/d/1T2EvVP82Ms8YVh-w5mtqNWWUsketFMys/view?usp=drivesdk "Delta operativo LegalMente"
[3]: https://github.com/legallmente-alt/legalmente-web "Repositorio LegalMente"
