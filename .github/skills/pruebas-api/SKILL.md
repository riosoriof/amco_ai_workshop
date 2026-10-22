---
name: pruebas-api
description: "Automatiza y ejecuta pruebas funcionales y de regresión de la API"
disable-model-invocation: true
---
> Agente recomendado: **qa** (selecciónalo en el chat antes de ejecutar este skill).

Automatiza los casos de prueba de `docs/pruebas/` para `POST /api/v1/playback/sessions` y `POST /api/v1/profiles` en `tests/funcionales/`, ejecútalos con `npm test` desde `api/` y analiza cualquier falla: ¿defecto de la API o de la prueba? Antes de concluir que una falla es defecto de la API, verifica los datos de inicio en `api/src/data.js` y cita la evidencia. Documenta los defectos encontrados (pasos, esperado, obtenido) sin modificar la API.

**Alcance:** solo pruebas funcionales. No crees ni ejecutes scripts k6 ni levantes la API; el rendimiento es el lab 6 (`/pruebas-rendimiento`).
