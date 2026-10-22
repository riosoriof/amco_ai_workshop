---
name: pruebas-rendimiento
description: "Genera script k6 de carga, estrés y pico desde los RNF"
disable-model-invocation: true
---
> Agente recomendado: **qa** (selecciónalo en el chat antes de ejecutar este skill).

Genera `tests/rendimiento/playback-k6.js` para `POST /api/v1/playback/sessions` con tres escenarios (carga sostenida, estrés incremental y pico x3 en poco tiempo) y `thresholds` derivados de los RNF del análisis. Usa la variable `BASE_URL` (default http://localhost:3000). Explica cómo ejecutarlo y cómo interpretar el resultado. En el workshop usa volúmenes reducidos (máx. 50 VUs) y una duración total de máximo 2 minutos, porque corre en una laptop. Marca los 409 CONCURRENCY_LIMIT como respuesta esperada (http.setResponseCallback) para que no cuenten como errores. Si llamas URLs con IDs (por ejemplo `DELETE /api/v1/playback/sessions/<id>`), agrega `tags: { name: '/api/v1/playback/sessions/:id' }` para no generar una serie de métricas por cada ID.

**No ejecutes k6 ni levantes la API:** en el lab lo hace el participante en su terminal (pasos 1 y 3) y después te pega el resumen para que lo interpretes. Solo verifica la sintaxis del script si es necesario (por ejemplo con `k6 inspect tests/rendimiento/playback-k6.js`).
