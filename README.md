# legalmente-web

Sitio web de LegalMente — divulgación jurídica panhispánica.

## Objetivo

El mismo que en redes: generar mensajes directos que se conviertan en consulta. La web no es un folleto, es un cierre. Ver `legalmente-marca-y-estilo.md` en el repo `Psyche-creation` (docs/) para la línea editorial completa.

## Sistema visual vigente (decisión 23-ago-2026)

**Realismo cinematográfico editorial** — el definido en `Psyche-creation/docs/legalmente-marca-y-estilo.md`, Sección 3 (Librería de Prompts Maestros para Imágenes). Paleta base: Crema `#EDE7DA`, Oro `#C8A24A`, Tinta profunda `#0E1A24`. Estilo: cinematic legal realism con restrained symbolic surrealism, fotorrealista, composición tipo still-life editorial. Formato 9:16 vertical para redes, 16:9 para portadas de YouTube.

Existe un segundo sistema (óleo cinematográfico / claroscuro, paleta Nogal/Marfil/Azul Petróleo/Latón) documentado en el skill `legalmente-visual-system`, sincronizado desde el Drive del proyecto. Ese sistema quedó descartado para este proyecto — si el skill se sigue activando y sugiriendo esa dirección de arte, es una inconsistencia pendiente de corregir en el Drive/skill, no una alternativa válida. No mezclar ambos sistemas en la misma pieza o colección.

## Mapa del sitio

Seis páginas, sin relleno: Inicio; Sobre LegalMente / Sobre Raymundo (autoridad profesional); Áreas de práctica (corporativo, contractual, inmobiliario, regulatorio/compliance); Catálogo editorial (piezas ya publicadas en redes, curadas); Casos y contingencias resueltas (sin identificar clientes); Contacto (único objetivo real de la página — CTA de documento, nunca "consulta a un abogado").

No se agregan más páginas sin justificación: la métrica única de éxito del proyecto son los mensajes directos, no el tráfico.

## Stack

Next.js (React) más TypeScript más Tailwind. Consistente con Psyche-creation (React/TypeScript) y compatible con envolver el sitio como PWA o reutilizar lógica en una futura app (React Native / Expo).

## Estructura de carpetas propuesta

```
src/pages (o app/ si se usa App Router): index, sobre, areas-de-practica, catalogo, casos, contacto
src/components
src/content -> piezas del catalogo, mismo patron que content/*.json de Psyche-creation
src/styles -> tokens de la paleta: crema/oro/tinta
```

## Automatización (fase 2)

CI/CD de build y deploy en cada push a main, con el mismo patrón que ya usa Psyche-creation. Sincronización del catálogo editorial con las piezas ya generadas en el pipeline de Remotion/Canva. Formulario de contacto conectado a un servicio simple, midiendo "mensajes directos" en el mismo tablero que usan las redes.

## Estado

Repositorio recién creado — esqueleto de carpetas y documentación en progreso. Próximo paso: validar copy de cada sección y generar las primeras piezas visuales con el sistema vigente descrito arriba.
