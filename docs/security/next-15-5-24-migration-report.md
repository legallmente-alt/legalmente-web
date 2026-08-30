# LegalMente — Evaluación de migración de seguridad a Next 15.5.24

**Rama:** `security/next-15-5-24-evaluation`  
**Base:** `origin/main`  
**Fecha de ejecución:** 2026-08-30  
**Estado:** Evaluación completada; no mergeada ni publicada.

## Resumen ejecutivo

Se preparó una rama independiente para sacar la aplicación de `next@14.2.35` y evaluar la línea de mantenimiento parcheada `next@15.5.24`, junto con `react@19.1.1`, `react-dom@19.1.1`, `eslint-config-next@15.5.24`, `@types/react@19.2.18` y `@types/react-dom@19.2.5`. La instalación limpia mediante `npm ci` pasó.

La migración requiere cambios de compatibilidad, pero el alcance quedó controlado. Las cinco páginas dinámicas del App Router ahora reciben `params` como `Promise` y los resuelven con `await`, tal como exige la validación de PageProps de Next 15. También se marcó `src/app/sitemap.ts` como `force-static` para mantener compatibilidad con `output: export`.

## Resultados de validación

| Comprobación | Resultado |
|---|---|
| `npm ci` | PASS |
| `npm run test:legal-core` | PASS; 13 pruebas |
| `npm run test:knowledge-safety` | PASS; 3 pruebas |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS; muestra la deprecación esperada de `next lint` |
| `npm run build` | PASS |
| `npm run build:public` | PASS |
| `npm run test:public-routes` | PASS; 10 rutas, 54 HTML, 52 URLs de sitemap, rutas internas ausentes |

## Auditoría de dependencias

Después de la actualización, `npm audit` todavía reporta **una vulnerabilidad moderada y una alta**, ambas transitivas a través de `postcss` requerido por Next 15.5.24. El arreglo sugerido por npm es actualizar a `next@16.3.3`, que constituye un salto mayor. Se probó un override directo de PostCSS, pero produjo una dependencia inválida porque Next 15.5.24 declara `postcss@8.4.31` de forma exacta; el override fue retirado y no se conservó un estado inconsistente.

Por tanto, el **release gate de seguridad permanece bloqueado** para esta rama hasta decidir entre migrar a Next 16.3.3 o aceptar formalmente el riesgo residual con una mitigación validada por el responsable técnico. No se ejecutó `npm audit fix --force`.

## Compatibilidad observada

Next 15.5 mantiene la aplicación compilable después de adaptar los parámetros dinámicos y el sitemap. La guía oficial de actualización también señala que Next 15 requiere React 19 y que `next lint` está deprecado; el proyecto sigue pasando lint, pero debe migrarse posteriormente a ESLint CLI antes de Next 16. La superficie pública mantuvo sus pruebas de rutas, enlaces, sitemap y ausencia de superficies internas.

No se modificó el PR #19 desde esta rama. Esta rama de seguridad se basa en `origin/main` y no contiene una autorización de merge, deploy o release.

## Referencias

[1]: https://nextjs.org/blog/nextjs-security-release-august-2026-update "Update: August Next.js Security Release — Next.js"
[2]: https://nextjs.org/blog/next-15-5 "Next.js 15.5 — Next.js"
[3]: https://nextjs.org/docs/app/guides/upgrading/version-15 "How to upgrade to version 15 — Next.js"
[4]: https://github.com/advisories/GHSA-qx2v-qp2m-jg93 "PostCSS XSS advisory — GitHub Advisory Database"
[5]: https://github.com/advisories/GHSA-6g55-p6wh-862q "PostCSS arbitrary file read advisory — GitHub Advisory Database"
