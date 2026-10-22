---
applyTo: "tests/**,docs/pruebas/**"
---
# Reglas para pruebas
- Casos de prueba con la plantilla `estandares/plantillas/caso-prueba.md`: positivos, negativos y de borde.
- Nombre de cada prueba automatizada: `CP-### [RF-###] descripción`.
- Pruebas funcionales: Jest + Supertest importando `api/src/app.js` (sin levantar servidor).
- Regresión: marca con `@regresion` en el nombre los casos que protegen reglas críticas.
- Rendimiento: k6 con `thresholds` derivados de los RNF (ej. `http_req_duration: ['p(95)<300']`); escenarios de carga, estrés y pico.
