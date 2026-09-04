# ADR 0002 — Arte base sin caracteres y tipografía determinista

**Estado en esta rama:** `PROPOSED_FOR_CANONICAL_REVIEW`  
**Fecha:** 2026-09-04  
**Ámbito:** producción visual de LegalMente  
**PR de trazabilidad:** #42 (`feat/founder-directive-2026-09-04`)

## Contexto

Los proveedores generativos de imagen pueden deformar letras, inventar pseudotexto y alterar copy aprobado. A la vez, LegalMente necesita piezas finales con identidad de marca y, según el formato, títulos, preguntas, frases, pasos, comparaciones, autores o fuentes exactas.

Confundir estas dos etapas crea dos errores opuestos: pedir al generador que escriba la marca/copy, o prohibir texto en el asset final. Ambos son incorrectos.

## Decisión

La regla operativa es:

> **El proveedor visual genera arte sin caracteres. Toda tipografía de LegalMente —la marca y, cuando el formato lo exija, el copy editorial— se incorpora después mediante composición determinista y se valida contra el contenido aprobado.**

El flujo es:

```text
CONTENIDO JURÍDICO APROBADO
→ CONCEPTO Y METÁFORA VISUAL
→ ARTE BASE GENERADO
   - cero letras
   - cero números
   - cero pseudotexto
   - superficie física reservada
→ COMPOSICIÓN DETERMINISTA
   - LegalMente exacto
   - integración física coherente
   - copy editorial exacto cuando corresponda
   - autor/fuente/cita sólo con binding al Content Pack aprobado
→ QA
   - exactitud textual
   - marca integrada
   - legibilidad móvil
   - perspectiva/material/luz
   - no watermark/overlay arbitrario
   - no collage
   - no repetición indebida
→ REVISIÓN HUMANA
→ ASSET FINAL
```

## Consecuencias

1. El arte base del proveedor nunca es el asset final cuando la pieza requiere marca o copy.
2. `LegalMente` no se solicita como texto al generador de imagen.
3. La composición tipográfica debe ser determinista, reproducible y vinculada a campos exactos del Content Pack.
4. Citas, autores y fuentes requieren binding aprobado; no se inventan para completar diseño.
5. Una composición correcta no abre por sí misma publicación, claim, fuente o gate legal.
6. La integración de marca debe simular pertenencia física a placa, sello, lomo, cuaderno, carpeta, vidrio, metal, madera, piedra u otra superficie válida; quedan prohibidos watermark y overlay arbitrario.
7. Antes de escalar a lotes, se valida una unidad end-to-end.

## Piloto obligatorio antes de lote

La primera validación debe demostrar, con una pieza real aprobada:

- Content Pack autorizado;
- arte base sin caracteres;
- superficie física reservada;
- composición exacta de `LegalMente`;
- copy editorial exacto si el formato lo requiere;
- QA completo;
- revisión humana;
- registro de provenance y fingerprint.

No se autoriza escalar a diez piezas hasta que el piloto pase el gate humano correspondiente.

## Trazabilidad y canonicidad

Este ADR se crea en el remoto dentro del PR #42 para eliminar la ambigüedad de una supuesta copia sólo local. Mientras no sea fusionado/aprobado conforme a la gobernanza vigente, su estado es `PROPOSED_FOR_CANONICAL_REVIEW`; no debe describirse como canon de `main`.

## No decisiones

Este ADR no elige proveedor, no instala Gemini, no aprueba ningún Content Pack, no autoriza publicación, no sustituye muestras visuales aprobadas y no valida imágenes anteriormente rechazadas.
