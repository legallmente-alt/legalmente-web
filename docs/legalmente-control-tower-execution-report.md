# LegalMente — Informe de ejecución del perfil operativo

**Fecha de corte:** 28 de agosto de 2026.  
**Base revisada:** repositorio jurídico `contratoslegales848-design/Psyche-creation`, repositorio web `legallmente-alt/legalmente-web`, ramas y commits disponibles en GitHub, y configuración de integraciones de la sesión.

## Resumen ejecutivo

Se recuperó el estado existente y se evitó iniciar LegalMente desde cero. La principal inconsistencia operativa encontrada fue que el `main` del repositorio web seguía apuntando al esqueleto inicial, mientras que las correcciones de privacidad y la evolución editorial estaban en ramas posteriores. La implementación se realizó sobre la rama de trabajo más avanzada y con revisión de seguridad visible, sin modificar `main`, sin desplegar y sin publicar.

La ejecución entregó una primera superficie del **Contract Preparation Engine V1** en `/preparar/contrato`. Es una experiencia educativa, estática y fail-closed: utiliza datos sintéticos, ordena variables antes de redactar, deja el territorio pendiente cuando no está definido y no recibe PII, documentos, casos personales, pagos ni solicitudes profesionales.

> La decisión tomada fue construir la menor pieza que demuestra valor y reduce riesgo: preparación estructurada antes de redacción, no un “hazme un contrato” universal.

## Estado reconciliado

| Área | Estado observado | Decisión de ejecución |
|---|---|---|
| Constitución y verificación jurídica | El repositorio jurídico contiene protocolos, fixtures negativos, pruebas de procedencia y documentación de gates | Conservar como fuente de verdad jurídica; no crear un modelo paralelo |
| Web pública | El `main` remoto continúa en el esqueleto inicial; la evolución visual y de confianza está en ramas posteriores | Usar la rama editorial más avanzada como base de trabajo |
| Privacidad | La corrección fail-closed del contacto existe en una rama posterior, pero no en `main` | No habilitar formularios ni captura en la nueva herramienta |
| Contract Engine | Existen ramas exploratorias de herramientas, NDA y núcleo determinista | Reutilizar principios y no activar intake real ni servicios profesionales |
| Google Drive | La configuración de sesión no mostró una integración Drive disponible | No inventar sincronización ni tratar Drive como fuente leída |
| Despliegue/publicación | No se ejecutó deploy ni autorización de publicación | Mantener la revisión humana separada |

## Contradicciones y bloqueadores

La contradicción principal es de **puntero de código**, no de principio: el `main` de `legalmente-web` no contiene las correcciones registradas en la rama editorial posterior. Por ello, no corresponde afirmar que el estado de privacidad del `main` esté cerrado aunque exista evidencia de una corrección en otra rama.

El segundo bloqueador es la ausencia de un territorio inicial aprobado para el motor contractual. Sin jurisdicción no puede activarse una librería de cláusulas ni emitirse un borrador territorializado. El tercer bloqueador es la falta de una política aprobada de retención, borrado, seguridad y revisión profesional para cualquier PII o documento real.

## Cambios ejecutados

Se creó y publicó la rama [`agent/contract-preparation-engine-v1`](https://github.com/legallmente-alt/legalmente-web/tree/agent/contract-preparation-engine-v1), con commit `84b9bff`.

| Cambio | Resultado |
|---|---|
| Nueva ruta `/preparar/contrato` | Entrada editorial para preparar antes de redactar |
| Flujo de cuatro bloques | Partes y capacidad; objeto y obligaciones; tiempo y pagos; cambios y riesgos |
| Ejemplo sintético | Proveedor independiente con partes no identificables y territorio pendiente |
| Salidas explícitas | Brief, checklist, mapas, matriz de revisión y borrador estructural condicionado |
| Navegación | Enlace `Preparar` añadido al sistema principal |
| Documentación | `docs/contract-preparation-engine-v1.md` registra alcance, gates y no-gos |
| Reproducibilidad | Se añadió `package-lock.json` al instalar dependencias del branch |

## Verificación

La compilación de producción terminó correctamente después de la integración. Next.js generó **56 rutas estáticas/dinámicas sin errores**, incluyendo `/preparar/contrato`, y la comprobación de tipos y linting terminó con éxito. También se ejecutó `git diff --check` sin detectar errores de espacios o formato.

La verificación de build no equivale a autorización de publicación, revisión jurídica, cierre de seguridad ni validación WCAG completa. Es únicamente evidencia de que la superficie añadida compila dentro de la base seleccionada.

## Qué conservar, eliminar y simplificar

Debe conservarse la Constitución, el repositorio jurídico canónico, la separación entre educación y asesoría, los gates independientes, la trazabilidad, la clasificación territorial, la revisión humana y el principio fail-closed. También debe conservarse la gramática visual editorial vigente y la arquitectura relacional de la web.

Debe eliminarse de las rutas de producción cualquier formulario legacy que sugiera captura de nombre, correo o texto libre mientras el gate de privacidad siga abierto. Debe simplificarse la operación evitando otro documento maestro: el siguiente nivel debe vivir en schemas, relaciones, estados y una bandeja de decisiones, no en más instrucciones duplicadas.

## Arquitectura objetivo mínima

```text
CONSTITUCIÓN
  → PROTOCOLOS JURÍDICOS
  → DATOS ESTRUCTURADOS
  → VALIDACIONES FAIL-CLOSED
  → BANDEJA DE DECISIÓN HUMANA
  → PRODUCCIÓN
  → QA
  → AUTORIZACIÓN DE PUBLICACIÓN
  → MÉTRICAS
  → APRENDIZAJE Y REUTILIZACIÓN
```

Para el Contract Engine, la ruta mínima es:

```text
SITUACIÓN
  → CONTRACT BRIEF
  → MAPA DE VARIABLES
  → TERRITORIO
  → FLAGS DE REVISIÓN
  → COMPONENTES VERIFICADOS
  → BORRADOR ESTRUCTURAL CONDICIONADO
```

No se recomienda activar todavía una base de datos, un agente orquestador, una librería masiva de cláusulas ni una automatización externa. La primera métrica debe ser si la ruta reduce ambigüedad y tiempo humano sin aumentar riesgo.

## Command Center y bandeja humana

El panel ejecutivo futuro debe mostrar tres vistas: **Decisiones**, **Estado** y **Resultados**. Cada claim o componente contractual debe exponer únicamente texto exacto, afirmación, jurisdicción, fuente, respaldo, matices, riesgo, cambios y decisión requerida. Las decisiones válidas son aprobar, devolver o excluir; la ausencia de acción no debe transformarse en aprobación.

El primer Content ID universal debe conectar investigación, claims, fuentes, revisión, pieza, URL, métricas y aprendizaje. Para contratos, el mismo ID debe conectar contract brief, variables, fuentes territoriales, flags, versión de componentes y resultado de revisión.

## Priorización del roadmap

| Fase | Entrega | Impacto | Esfuerzo | Riesgo | Dependencias | Tiempo hasta valor |
|---|---|---:|---:|---:|---|---|
| 1 — Simplificación | Unificar rama segura, cerrar superficies legacy, estados y gates visibles | Alto | Bajo | Bajo | Revisión del fundador | Inmediato |
| 2 — Publicación y medición | Content ID, inventario estructurado y métricas de formato | Alto | Medio | Medio | Esquema mínimo y fuentes | Corto |
| 3 — Aprendizaje | Creative Memory y experimentos con hipótesis/resultados | Medio | Medio | Medio | Datos de fase 2 | Medio |
| 4 — Reutilización | Ampliar solo ganadores a carrusel, Reel, Short, guía o checklist | Alto | Medio | Medio | Evidencia de rendimiento | Medio |
| 5 — Monetización | Validar checklist, guía o biblioteca premium sin prometer validez universal | Medio | Medio | Alto | Privacidad y demanda | Posterior |
| 6 — Escala | Integraciones, automatización y revisión profesional cerrada | Alto | Alto | Alto | Gates legales, seguridad y operación | Posterior |

## Decisiones que debe tomar el fundador

Antes de implementar intake interactivo, el fundador debe aprobar el primer territorio y los tres a cinco tipos contractuales prioritarios, confirmar qué salidas serán educativas gratuitas, definir cuándo una revisión profesional es obligatoria y aprobar las políticas de privacidad, retención, borrado, seguridad y términos.

Hasta esas decisiones, la rama entregada debe tratarse como **propuesta implementada para revisión**, no como producto autorizado, servicio profesional, publicación ni despliegue.

## Referencias

[1]: https://github.com/contratoslegales848-design/Psyche-creation "Repositorio jurídico canónico de LegalMente"

[2]: https://github.com/legallmente-alt/legalmente-web "Repositorio de producto web de LegalMente"

[3]: https://github.com/legallmente-alt/legalmente-web/tree/agent/contract-preparation-engine-v1 "Rama de ejecución Contract Preparation Engine V1"
