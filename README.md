# legalmente-web

Sitio web de LegalMente — divulgación jurídica panhispánica.

## Objetivo

El mismo que en redes: generar mensajes directos que se conviertan en consulta. La web no es un folleto, es un cierre. Ver `legalmente-marca-y-estilo.md` en el repo `Psyche-creation` (docs/) para la línea editorial completa.

## Sistema visual vigente (decisión 23-ago-2026)

**Realismo cinematográfico editorial** — el definido en `Psyche-creation/docs/legalmente-marca-y-estilo.md`, Sección 3 (Librería de Prompts Maestros para Imágenes). Paleta base: Crema `#EDE7DA`, Oro `#C8A24A`, Tinta profunda `#0E1A24`. Estilo: cinematic legal realism con restrained symbolic surrealism, fotorrealista, composición tipo still-life editorial. Formato 9:16 vertical para redes, 16:9 para portadas de YouTube.

El Sistema Operativo V3 de Drive conserva Nogal/Marfil/Azul Petróleo/Latón para las piezas editoriales. La web mantiene por ahora Crema/Oro/Tinta hasta completar una revisión visual comparativa. Esta diferencia está documentada: no debe interpretarse como permiso para mezclar ambos sistemas en una misma colección.

## Mapa del sitio

Seis páginas, sin relleno: Inicio; Sobre LegalMente / Sobre Raymundo (autoridad profesional); Áreas de práctica (corporativo, contractual, inmobiliario, regulatorio/compliance); Catálogo editorial (piezas ya publicadas en redes, curadas); Casos y contingencias resueltas (sin identificar clientes); Contacto (único objetivo real de la página — CTA de documento, nunca "consulta a un abogado").

No se agregan más páginas sin justificación: la métrica única de éxito del proyecto son los mensajes directos, no el tráfico.

## Stack

Next.js 16, React 19, TypeScript y Tailwind. Consistente con Psyche-creation (React/TypeScript) y compatible con envolver el sitio como PWA o reutilizar lógica en una futura app (React Native / Expo).

## Estructura de carpetas propuesta

```
src/pages (o app/ si se usa App Router): index, sobre, areas-de-practica, catalogo, casos, contacto
src/components
src/content -> piezas del catalogo, mismo patron que content/*.json de Psyche-creation
src/styles -> tokens de la paleta: crema/oro/tinta
```

## Automatización (fase 2)

CI/CD de build y deploy en cada push a main, con el mismo patrón que ya usa Psyche-creation. Sincronización del catálogo editorial con las piezas ya generadas en el pipeline de Remotion/Canva. Formulario de contacto conectado a un servicio simple, midiendo "mensajes directos" en el mismo tablero que usan las redes.

## MVP de documentos guiados

La ruta `/documentos` es un área profesional México, explícitamente separada del archivo educativo panhispánico. Incorpora el primer experimento comercial supervisado: una preclasificación de convenio bilateral de confidencialidad.

- No solicita nombres, documentos ni secretos empresariales.
- No envía ni almacena respuestas.
- Distingue un posible documento guiado de los casos que requieren revisión profesional obligatoria.
- Genera un brief local descargable, no un contrato.
- No firma, certifica ni promete validez jurídica.
- El contacto profesional funciona por correo con asunto predefinido; no existe todavía formulario, CRM, pago ni almacenamiento de datos.

La siguiente fase solo puede activarse cuando el banco de cláusulas y el documento modelo hayan sido revisados y aprobados por el abogado responsable: ensamblado determinista de cláusulas versionadas, salida Word/PDF, trazabilidad y un canal real de contratación. Firma electrónica, pagos y automatización integral quedan fuera de este MVP.

## Estado

La base pública sigue siendo un sitio en construcción. El MVP de documentos guiados permite comprobar el recorrido y las exclusiones antes de conectar datos personales, pagos, generación contractual o entrega profesional.
