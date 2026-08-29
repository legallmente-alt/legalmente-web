# LegalMente — Gemini Mexico Contract Research Review V1

Fecha: 2026-08-28.

Clasificación: `ACCEPTED_AS_RESEARCH_DRAFT_WITH_MATERIAL_CORRECTIONS / NOT_READY_FOR_COMPONENT_VERIFICATION / LEGAL_COVERAGE_PENDING / REAL_DRAFT_BLOCKED`.

## Scope reviewed

Gemini entregó `MEXICO_CONTRACT_LEGAL_RESEARCH_PACK_V1` para los cuatro pilotos autorizados: prestación de servicios B2B, NDA/confidencialidad, relación con proveedor y compraventa simple B2B.

El paquete respeta los gates principales: investigación autorizada no equivale a cobertura legal; no habilita `VERIFIED_FOR_TERRITORY`; no habilita borradores reales; PII, servicios profesionales y publicación siguen bloqueados.

Sin embargo, una verificación independiente contra fuentes oficiales vigentes detectó errores materiales de binding y citas. Por tanto, los veredictos `RESEARCH_SUFFICIENT_FOR_COMPONENT_VERIFICATION` no se aceptan todavía como gate operativo.

## Material corrections required

### 1. Secretos industriales — error crítico de artículos

El paquete cita repetidamente LFPPI arts. 245–256 como régimen de secretos industriales y usa esos artículos en el NDA, el source register y componentes `COMP-MX-CONF-*`.

En el texto vigente de la Ley Federal de Protección a la Propiedad Industrial, reformado en 2026, el Título Tercero de Secretos Industriales inicia en el art. 163 y continúa en los arts. 164–169. Los arts. 245–246 regulan franquicias, no secretos industriales.

Impacto: `COMP-MX-CONF-STANDALONE-01`, `COMP-MX-CONF-OPER-01`, el NDA legal map, el source register y el Human Review Packet de trade secrets requieren rebinding completo.

Estado: `RETURN_REQUIRED`.

### 2. Protección al consumidor — error de artículo

El Red Team atribuye a LFPC art. 10 Bis la extensión de tutela a micro/pequeñas empresas destinatarias finales o integradoras.

El art. 10 Bis vigente regula incrementos injustificados de precios por fenómenos naturales, meteorológicos o contingencias sanitarias. La definición de consumidor y el tratamiento limitado de personas morales/microempresas se encuentran en el art. 2, fracción I, con remisión a los arts. 99 y 117 y requisitos reglamentarios.

Impacto: rehacer el B2B/B2C crossover gate y cualquier componente que use esa referencia.

Estado: `RETURN_REQUIRED`.

### 3. Prestación de servicios B2B — clasificación mercantil mal citada

El paquete usa Código de Comercio art. 75 fracciones X y XIV para sostener que servicios B2B pueden ser mercantiles "por empresa". En el texto vigente, la fracción X trata empresas de comisiones/agencias/oficinas de negocios/casas de empeño/ventas en pública almoneda y la XIV operaciones de bancos. No constituyen una base general para clasificar cualquier prestación de servicios B2B como mercantil.

Impacto: el pilot A necesita un test de mercantilidad más preciso y fact-specific, sin convertir toda prestación empresarial en acto de comercio.

Estado: `MORE_RESEARCH_REQUIRED`.

### 4. Moneda extranjera — evitar “FIX” como regla legal directa

La Ley Monetaria art. 8 dispone que las obligaciones en moneda extranjera pagaderas en México se solventan en moneda nacional al tipo de cambio que rija en el lugar y fecha del pago, determinado conforme a disposiciones de Banco de México. El paquete lo reduce a “tipo FIX de Banxico”, formulación demasiado específica para quedar como regla automática sin verificar la disposición operativa aplicable.

Impacto: `COMP-MX-PRICE-01` debe estructurar moneda y regla de conversión, pero no fijar automáticamente un benchmark concreto sin fuente adicional vigente.

Estado: `CANDIDATE_AFTER_CORRECTION`.

### 5. Derecho de autor — binding temporal incompleto

El paquete atribuye a LFDA arts. 30–31 la regla de que, a falta de pacto, la transmisión patrimonial se presume por cinco años. La temporalidad/onerocidad sí está en art. 30 y la remuneración en art. 31, pero la regla supletoria de cinco años está en art. 33.

Impacto: corregir `COMP-MX-IP-SERV-01` y source mapping.

Estado: `RETURN_REQUIRED`.

### 6. Datos personales — taxonomía actualizada, “remisión” no está en la ley vigente citada

La LFPDPPP vigente es una nueva ley de 20-03-2025, reformada 14-11-2025. Define `persona encargada` y `transferencia` en art. 2; las transferencias se regulan en arts. 35–36. La palabra `remisión` no aparece en el texto legal vigente consultado. Si se quiere mantener la distinción responsable/encargado vs transferencia, debe vincularse a las definiciones actuales y, si se invoca regulación secundaria, citarla expresamente.

Impacto: source register y safety map de datos requieren actualización de binding.

Estado: `RETURN_REQUIRED`.

### 7. LFPC crossover — “micro o pequeña empresa” es demasiado amplio

El art. 2, fracción I, contempla personas morales y una extensión limitada para integración a procesos productivos, pero el texto vigente condiciona esas acciones a acreditación como microempresa o microindustria y a los arts. 99/117. No usar una regla genérica “micro o pequeña empresa = consumidor”.

Estado: `RETURN_REQUIRED`.

### 8. REPSE — presencia física no es trigger suficiente

El paquete trata como `BLOCKING_UNKNOWN` la omisión de REPSE cuando personal acude a instalaciones del cliente. La presencia física por sí sola no determina aplicabilidad. El gate debe permanecer basado en el régimen de servicios/obras especializadas y en la relación entre objeto social/actividad preponderante y servicio contratado, más los hechos de ejecución.

Estado: `MORE_RESEARCH_REQUIRED`.

### 9. Contrato marco + orden de compra

La afirmación de que el contrato marco “por sí solo no genera obligación líquida hasta una orden aceptada” debe presentarse como una arquitectura contractual posible, no como regla universal de derecho mexicano. Depende del texto del marco, mecanismos de pedido y consentimiento.

Estado: `REPHRASE_AS_PRODUCT_MODEL`.

### 10. Art. 383 CCom — no asumir extensión contractual sin soporte adicional

El art. 383 vigente sí establece cinco días para faltas de calidad/cantidad y treinta días para vicios internos. El texto del artículo no contiene por sí mismo una regla expresa de que esos plazos puedan ampliarse por pacto. Cualquier afirmación sobre modificación contractual requiere soporte adicional jurisprudencial/doctrinal oficial antes de convertirse en componente.

Estado: `MORE_RESEARCH_REQUIRED`.

## What remains useful

Se aceptan como base de investigación, no como componentes verificados:

- separación federal / local / mercantil / ley especial;
- fail-closed de poderes y representación;
- desacoplar perfeccionamiento, propiedad y riesgo en compraventa;
- separar conflictos de datos del timeline de consecuencias jurídicas;
- no automatizar laboralidad, REPSE, arbitraje, fuero, limitación de responsabilidad ni suficiencia de poderes;
- mantener `DRAFT_PREVIEW` real bloqueado;
- exigir review packets humanos por dominios de alto riesgo.

## Pilot status after review

- Servicios B2B: `MORE_RESEARCH_REQUIRED_BEFORE_COMPONENT_VERIFICATION`.
- NDA/confidencialidad: `RETURN_REQUIRED_FOR_SOURCE_REBINDING`.
- Proveedor: `MORE_RESEARCH_REQUIRED_BEFORE_COMPONENT_VERIFICATION`.
- Compraventa simple B2B: `RESEARCH_BASE_ACCEPTED / COMPONENT_VERIFICATION_PENDING_CORRECTIONS`.

Ningún piloto pasa todavía a `LEGAL_COVERAGE_APPROVED` ni ningún componente a `VERIFIED_FOR_TERRITORY`.

## Gates

- `MEXICO_RESEARCH = AUTHORIZED`
- `FOUR_PILOTS_RESEARCH = AUTHORIZED`
- `LEGAL_COVERAGE = PENDING`
- `COMPONENT_VERIFICATION = BLOCKED_PENDING_CORRECTIONS`
- `VERIFIED_FOR_TERRITORY = FALSE`
- `REAL_DRAFT = BLOCKED`
- `PII = DISABLED`
- `PROFESSIONAL_SERVICES = DISABLED`
- `PUBLICATION = BLOCKED`

## Next action

Gemini must produce a targeted correction pass only for the material errors above, with exact official-source binding and current validity. No new pilots, no new clause count, no code, no draft generation.
