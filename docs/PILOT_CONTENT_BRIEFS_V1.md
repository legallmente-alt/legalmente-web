# LegalMente — Pilot Content Briefs V1

## Propósito

El material nuevo de Drive recomienda probar el sistema editorial con un microlote de cinco piezas: Everyday Law, Contracts, Official Source Navigation, Evidence y Cinema & Law. Esta integración convierte esa recomendación en un registro interno, trazable y fail-closed; no crea publicaciones ni afirma que las piezas estén listas.

## Estado actual

Las cinco piezas tienen `RESEARCH_REQUIRED`. Las cuatro primeras se enlazan con nodos ya existentes del Knowledge Engine. Cinema & Law queda intencionalmente sin chapter ni serie porque el catálogo actual no ofrece un vínculo suficiente y el material no aporta todavía fuente jurídica separada, derechos, obra concreta ni revisión humana. Esa ausencia se registra como una decisión de no avanzar, no como un hueco que deba rellenarse inventando contenido.

| Content ID | Tipo | Vínculo actual | Estado | Riesgo | Puerta |
|---|---|---|---|---|---|
| `LM-PILOT-EVERYDAY-LAW-001` | Everyday Law | `consentimiento-no-es-solo-firma` | `RESEARCH_REQUIRED` | Bajo | Fuentes |
| `LM-PILOT-CONTRACTS-001` | Contracts | `obligacion-y-consecuencia` | `RESEARCH_REQUIRED` | Medio | Jurisdicción |
| `LM-PILOT-OFFICIAL-SOURCE-001` | Official Source Navigation | `datos-y-condiciones` | `RESEARCH_REQUIRED` | Medio | Fuentes |
| `LM-PILOT-EVIDENCE-001` | Evidence | `hechos-y-evidencia` | `RESEARCH_REQUIRED` | Medio | Hechos |
| `LM-PILOT-CINEMA-001` | Cinema & Law | Sin chapter/serie deliberadamente | `RESEARCH_REQUIRED` | Medio | No listo |

## Contrato de seguridad

El registro exige idioma `es-MX`, territorio `MX`, pregunta de usuario, audiencia, riesgo, condición de parada, estado y siguiente contenido. No permite marcar un brief como `PUBLICABLE` si carece de afirmaciones y fuentes. También falla si un vínculo de continuidad apunta a otro brief inexistente.

El registro no contiene claims jurídicos nuevos, URLs inventadas, fuentes ficticias, derechos de imágenes, nombres de abogados ni decisiones de publicación. El siguiente trabajo humano debe completar investigación, territorio, fuentes, derechos, voz, accesibilidad y revisión de daño potencial conforme a la plantilla de Drive.

## Integración técnica

`src/lib/content/pilot-briefs.ts` contiene el registro y su validador. `src/lib/content/pilot-briefs.test.ts` cubre estado sano, Cinema explícitamente detenido, bloqueo de publicable sin claims/fuentes y vínculo roto. El gate `npm run test:pilot-content` corre en el workflow principal de CI.

Esta pieza es una **memoria editorial estructurada**, no un catálogo público ni una autorización de publicación. Mantiene separados el aprendizaje, la investigación y la revisión humana.
