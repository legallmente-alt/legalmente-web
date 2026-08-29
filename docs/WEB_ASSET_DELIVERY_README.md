# LEGALMENTE — MANUS 2-R: WEB ASSET DELIVERY V1

## Alcance

Este paquete contiene únicamente derivados web de `LM-PA-W01`, `LM-PA-W02` y `LM-PA-W03`. No se regeneró arte, no se cambió ninguna escena, no se añadió copy jurídico, fechas, cifras, URLs, PII ni nuevas versiones conceptuales. Los PNG originales permanecen intactos.

## Fuentes

| Asset | Fuente | Drive file ID | Rol |
|---|---|---|---|
| LM-PA-W01 | LM-PA-W01_HOME_reference.png | 1lahq3yTyNkpRVLvBTmeXrnEnioPNcFWi | Home Hero |
| LM-PA-W02 | LM-PA-W02_HISTORY.png | 1VnpyumGA176Op-n3zo0IMO9y5p5BBvWi | History / Continuation |
| LM-PA-W03 | LM-PA-W03_CINEMA_LAW.png | 1JMYm21CAK9bXwCiPNpRluZEWy0TaRmvQ | Cinema & Law / Continuation |

## Outputs

Se entregan **8 derivados WEBP**: cuatro para W01 —1440, 430, 390 y 360—, dos para W02 —1440 y responsive 768×960— y dos para W03 —1200×1500 y mobile 430×538—. También se entregan seis proofs nombrados y un contact sheet.

## Crop rules

W01 conserva el libro, la puerta de vidrio, el umbral y la profundidad. En 360 se usa un foco y un peek; en 390 sobreviven el objeto focal y la siguiente acción; en 430 se conserva más aire y no se agregan módulos. W02 mantiene la página elevada, la regla y la diagonal editorial; la estantería y la placa pueden salir en responsive. W03 mantiene el haz de luz, el sobre y la relación cinematográfica causal; nunca se trata como poster genérico.

## QA

Se verificaron focal survival, clipping accidental, safe zones, legibilidad mobile, ausencia de baked legal copy y pseudotext, proporciones sin distorsión, ausencia de oversharpening y ausencia de daño visible de compresión en los proofs revisados. Los hashes MD5 de las tres fuentes coinciden con Drive. Estado QA: **PASS_VISUAL_QA**.

## GitHub delivery

El repositorio real es [legallmente-alt/legalmente-web](https://github.com/legallmente-alt/legalmente-web). La rama objetivo `feat/legalmente-editorial-instrument-preview-v1` existe y el PR #5 está abierto. Esta sesión no modifica código, no hace merge y no despliega. La entrega de assets y metadata se prepara como archivos separados para revisión del PR.

## Estado final

**CODE_READY** para que Code consuma los WEBP y el manifest. La implementación debe mantener la separación entre imágenes y copy UI. No declarar FINAL ni PUBLIC READY.
