---
name: reporte-ejecutivo
description: "Genera un reporte ejecutivo .pptx con el estado del flujo AI-SDLC (análisis, revisión, diseño, pruebas y PR)"
disable-model-invocation: true
argument-hint: (sin argumentos)
---
> Agente recomendado: **revisor-estandares**.

1. Verifica que el checkout esté al día: ejecuta `git fetch` y compara con `git rev-list --count HEAD..origin/main`. Solo si el resultado es mayor que 0, pide al usuario ejecutar `git pull` antes de seguir; si es 0, continúa sin preguntar. No reportes resultados de código anterior al merge.
2. Junta datos reales del repositorio: resultado de `node tools/validar-trazabilidad.js`, requerimientos y preguntas abiertas de `docs/analisis/`, % de cumplimiento de cada entregable en `docs/revision/`, resultados de `npm test` (desde `api/`) y estado del Pull Request si existe. Usa como autor el alias de `.github/copilot-instructions.md`. No inventes cifras: si falta un dato, omite esa métrica y menciónalo en el chat.
3. Escribe `docs/reporte/datos.json` con este formato (cada métrica con su nombre exacto; no reutilices una etiqueta para otro dato):
   ```json
   {"titulo":"…","subtitulo":"Épica SCRUM-5 · Perfiles infantiles","autor":"…",
    "resumen":["…"],
    "metricas":{"Requerimientos":0,"Trazabilidad %":0,"Pruebas pasadas":0,"Pruebas fallidas":0,
                "Análisis propio %":0,"Proveedor B %":0,"Defectos corregidos":0},
    "hallazgos":["…"],"riesgos":["…"],"siguientes_pasos":["…"]}
   ```
4. Destaca en el resumen el valor del flujo: cuántos defectos se detectaron antes de producción y cuántos se corrigieron con el Pull Request (cuéntalos en `docs/pruebas/` y en el PR). Riesgos son solo cosas que pueden salir mal; no uses esa lámina para aclaraciones.
5. Escribe para dirección, no para el equipo técnico: máximo 4 viñetas por lámina, cada una de 20 palabras o menos, sin hashes de commit, rutas de archivos ni nombres de comandos.
6. Ejecuta desde la raíz `node tools/generar-reporte.js docs/reporte/datos.json docs/reporte/reporte-ejecutivo.pptx` (usa `pptxgenjs`, instalado con `npm install` en `api/`). No uses Python.
7. Resume en el chat qué contiene el reporte y qué datos faltaron.
