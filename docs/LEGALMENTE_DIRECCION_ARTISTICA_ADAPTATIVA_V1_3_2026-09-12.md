# LegalMente — Dirección artística adaptativa v1.3

**Fecha:** 12-sep-2026  
**Estado:** `IMPLEMENTATION_CANDIDATE` · `NOT_MERGED` · `NOT_DEPLOYED` · `NOT_PUBLISHED`

## Decisión

v1.3 evoluciona v1.2 sin abrir un canon paralelo. La variedad ya no se prueba cambiando nombres de estilos. Cada pieza debe nacer de una verdad jurídicamente vinculada, una duda real, un conflicto y una consecuencia; después se decide qué debe hacer la imagen, qué tipo de escena lo expresa y cuál lógica visual dominante conviene.

Secuencia canónica:

`LEGAL_BINDING → DUDA REAL → CONFLICTO → CONSECUENCIA → APRENDIZAJE → FUNCIÓN VISUAL → TIPO DE ESCENA → ARGUMENTO DE IMAGEN → LÓGICA VISUAL → COMPOSICIÓN → COPY → QA`

La metáfora es una opción, no el lenguaje por defecto. La imagen debe hacer comprender, sentir o recordar el problema antes de decorar el texto.

## Cambios obligatorios

1. **Verdad antes de metáfora.** Ningún prompt visual puede formular o endurecer una regla jurídica. Debe referenciar un `legalBindingId` canónico. Si no existe binding, la pieza no pasa a producción.
2. **Conflicto completo.** Toda dirección declara `realQuestion`, `conflict`, `consequence` y `learningGoal`. La consecuencia evita títulos abstractos sin tensión humana o empresarial.
3. **Una lógica visual dominante.** Se sustituye “una escuela artística obligatoria” por una lógica dominante: fotografía editorial, arquitectura, documental, macro, modelo físico, óleo, grabado, ilustración científica u otra solución coherente. No se mezclan lenguajes incompatibles para aparentar novedad.
4. **Selector de tipo de escena.** Antes de escoger estilo se elige entre situación real, decisión humana, consecuencia, proceso, estructura de activos, operación/gobernanza, evidencia documental, arquitectura, contraste material o metáfora.
5. **Control de metáfora.** En un lote normal la metáfora no supera 30%. Cada metáfora registra `motifKeys`; no se repiten llaves, puertas, sombras, grietas, lupas, sellos, pergaminos ni equivalentes dentro del lote y deben respetar cooldown histórico.
6. **Distancia perceptiva.** Un lote de diez requiere al menos cinco funciones visuales y cinco tipos de escena. Cambiar color, escuela, cámara o fondo no vuelve distinta una relación visual repetida.
7. **LinkedIn LegalMente.** Si hay cuatro o más piezas del canal, al menos 75% usan escenas operativas: inmuebles/activos, procesos, gobernanza, evidencia, arquitectura, consecuencias o decisiones reales. La coherencia profesional proviene de jerarquía, rigor y tratamiento editorial, no de repetir plantilla.
8. **LinkedIn Founder.** Puede priorizar experiencia, decisión y reflexión, pero no atribuir logros personales sin evidencia confirmada y anonimizada.
9. **Marca y formato.** LegalMente sigue integrado físicamente; una escena por imagen; sin collage/grid/recuadros; legibilidad móvil y zona segura obligatorias; sin sepia ni oscuridad turbia.
10. **Aprendizaje real.** Registrar selección, rechazo, regeneración, función, tipo de escena, motivos, canal y desempeño cuando exista. `null` no significa cero ni rechazo.

## Perfiles de canal

| Canal | Prioridad visual | Evitar como patrón dominante |
|---|---|---|
| LegalMente general | tensión, revelación, humanidad, consecuencia, reflexión | diez bodegones o diez alegorías |
| LinkedIn LegalMente | procesos, activos, contratos, inmuebles, gobernanza, riesgo, decisión ejecutiva | llave/puerta como sustituto genérico de facultades |
| LinkedIn Founder | criterio profesional, experiencia confirmada, decisión, reflexión | autoridad autobiográfica no comprobada |
| Sitio | explicación, proceso, comparación, arquitectura de información | espectáculo que opaque la comprensión |

## QA crítico

La pieza queda `REWORK_REQUIRED` si falla cualquiera de estos puntos:

- binding jurídico y alcance;
- correspondencia duda → conflicto → consecuencia;
- argumento visual distinto del copy;
- pertinencia del tipo de escena y canal;
- marca integrada y texto exacto;
- legibilidad móvil y zona segura;
- novedad perceptiva y cooldown de motivos;
- prohibiciones permanentes de LegalMente.

Un promedio alto no compensa una falla crítica.

## Aplicación a los 12 prompts de impacto emocional

Los 12 prompts del archivo `LegalMente_Prompts_Impacto_Emocional_v1.md` quedan como **banco experimental**, no como plantilla ni autoridad jurídica. Antes de producirlos deben:

- sustituir afirmaciones absolutas por copy derivado de binding jurídico;
- pasar por el selector de escena;
- reducir llaves/puertas, sombras, pergaminos, lupas y revelaciones de objeto repetidas;
- convertir la mayoría de las piezas LinkedIn en operaciones, activos, procesos, arquitectura o decisiones verificables;
- mantener presencia humana solo cuando comunique tensión o decisión real.

## Implementación técnica candidata

La rama `chatgpt/visual-direction-v1-3-2026-09-12` amplía `src/lib/visual-argument/` con:

- `legalBindingId`, `realQuestion`, `consequence`, `sceneStrategy`, `dominantVisualLogic` y `motifKeys`;
- validación de diversidad funcional y de estrategia;
- límite de metáfora y rechazo de motivos duplicados;
- regla operativa para LinkedIn LegalMente;
- pruebas adversariales y rollback aislado.

Esto valida intención y estructura antes del proveedor. No demuestra calidad renderizada, rendimiento, corrección jurídica por sí sola ni autorización de publicación.

## Receipt

**Problema:** variedad nominal, metáforas mecánicas y LinkedIn insuficientemente operativo.  
**Evidencia:** quejas reiteradas del Founder; auditoría v1.2; banco experimental del 12-sep; capas V1 y ajuste por canal ya implementados.  
**Hipótesis:** separar binding, consecuencia, tipo de escena y lógica dominante reducirá repetición conceptual antes de generar.  
**Cambio:** contrato y validaciones v1.3 descritos arriba.  
**Prueba:** tests de binding, diversidad, límite de metáfora, motivos y perfil LinkedIn.  
**Resultado esperado:** candidatos más distintos y pertinentes; debe confirmarse con lote real y curación humana.  
**Decisión:** implementación candidata apilada; sin merge/deploy/publicación.  
**Rollback:** revertir la rama/commit y retirar la referencia activa a v1.3; v1.2 y los gates jurídicos permanecen intactos.
