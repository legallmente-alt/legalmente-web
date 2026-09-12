# LegalMente — Registro de procedencia y licencias V1

**Estado:** `INTERNAL_CONTROL / REVIEW_REQUIRED`  
**Fecha:** 11 de septiembre de 2026

Este registro evita asumir que un asset, texto, fuente, tipografía o dependencia puede publicarse solo porque está disponible en Drive o dentro del repositorio. Debe completarse antes de una distribución comercial, una publicación amplia o la incorporación de material de terceros.

## Regla operativa

Cada asset público debe tener, como mínimo, identificador, autor o titular, origen, licencia o permiso, territorio, canal autorizado, fecha de verificación, restricciones y evidencia. Si falta alguno de esos campos, el asset permanece `NOT_PUBLIC`.

## Inventario inicial

| ID / familia | Ubicación | Titular / autor | Licencia o permiso | Territorio / canal | Evidencia | Estado |
|---|---|---|---|---|---|---|
| Código fuente | Repositorio `legalmente-web` | Pendiente de confirmar | Pendiente de decisión expresa | Pendiente | Historial Git y archivos fuente | `REVIEW_REQUIRED` |
| Assets editoriales | `public/` y manifestes internos | Pendiente por asset | Pendiente por asset | Pendiente por canal | IDs y manifestes de Drive | `REVIEW_REQUIRED` |
| Tipografías y estilos | Configuración del sitio | Pendiente de confirmar | Revisar licencia de cada familia | Web pública | Paquetes/configuración | `REVIEW_REQUIRED` |
| Dependencias npm | `package.json` / lockfile | Terceros | Revisar licencia de cada paquete | Build y distribución | Metadatos npm | `REVIEW_REQUIRED` |
| Fuentes jurídicas | Documentos de Drive y packs de contenido | Autoridad / editor correspondiente | Verificar derechos de reproducción y cita | México / territorio indicado | URL, artículo, versión, fecha | `REVIEW_REQUIRED` |

## Prohibiciones

No publicar un asset con estado `PROPOSED`, `VECTOR_CANDIDATE`, `HUMAN_REVIEW_REQUIRED` o `NOT_PUBLIC`. No confundir una URL accesible con permiso de reproducción. No copiar texto jurídico o editorial de terceros sin registrar fuente, alcance y condiciones.

## Próximo control

Completar este registro por asset y crear un archivo de licencia del código cuando el titular haya decidido si el repositorio será privado, propietario o abierto. Hasta entonces, el paquete debe conservarse como privado o con distribución limitada autorizada.
