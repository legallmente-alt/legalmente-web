# Esqueleto Next.js — legalmente-web

Este paquete contiene el esqueleto inicial (Next.js 14 + React 18 + TypeScript + Tailwind) para el sitio de LegalMente, generado por Claude el 23-ago-2026.

## Cómo subirlo al repo `legallmente-alt/legalmente-web`

Esta sesión no tiene permiso de escritura (git push) directo sobre ese repositorio — solo puede clonarlo/leerlo. Dos formas de completar la subida:

**Opción 1 — desde tu computadora:**
1. Descomprime este paquete.
2. Clona el repo: `git clone https://github.com/legallmente-alt/legalmente-web.git`
3. Copia todo el contenido del paquete (menos este README) dentro del repo clonado, respetando la estructura de carpetas.
4. `git add . && git commit -m "Esqueleto inicial Next.js + Tailwind" && git push`

**Opción 2 — pide a la otra sesión de Claude Code Remote que lo suba:**
Comparte este paquete con esa sesión (o pégale la lista de archivos) y pídele que haga el commit — esa sesión sí tiene permisos de push sobre el repo.

## Qué falta después de subirlo
- `npm install` para generar `package-lock.json` y `node_modules`.
- Conectar las imágenes reales del catálogo editorial.
- Redactar el copy definitivo de cada página con el manual de marca.
- Configurar CI/CD (GitHub Actions) y hosting (Vercel sugerido).
- Conectar el formulario de contacto a un backend real.

## Paleta de marca incluida
Crema `#EDE7DA`, Oro `#C8A24A`, Tinta `#0E1A24` — más los 8 acentos rotativos, ya cargados en `tailwind.config.ts`.
