# Instrucciones del repositorio (estándar AMCO AI-SDLC)

Alias del participante: <tu-alias>

Eres un asistente para equipos de AMCO y sus proveedores. Sigue SIEMPRE estas reglas:

## Idioma y estilo
- Escribe en español de México, claro, conciso y estructurado. Sin relleno.
- Usa las plantillas de `estandares/plantillas/`. No inventes secciones ni elimines las obligatorias.

## Fuentes de verdad
- El negocio se toma de la junta (`data/junta/`, `data/minuta-refinamiento.md`) y de Jira (proyecto `SCRUM` en `thelg.atlassian.net`).
- **Jira se usa SOLO con el script `node tools/jira.js`** (API REST; no uses herramientas MCP de Atlassian). Comandos: `node tools/jira.js search "<JQL>"` (ej. `parent = SCRUM-5`), `node tools/jira.js get <CLAVE>` y `node tools/jira.js create <archivo.json>`. Para crear, escribe primero un JSON en `docs/jira/` con el formato documentado al inicio de `tools/jira.js` (usa `"parent": "$0"` para colgar historias de la épica creada en el mismo archivo) y luego ejecútalo. Si el script falla (por ejemplo, falta `.env`), usa el respaldo `data/jira/epica-SCRUM-5.json` para leer y dilo explícitamente: "Jira no respondió; uso el respaldo local".
- El Jira del workshop es compartido. Toma el alias de la línea "Alias del participante" de este archivo; si sigue como `<tu-alias>`, pídelo al usuario antes de escribir en Jira. Al crear issues, prefija el resumen con `[alias]` y agrega la etiqueta `alias`; no edites issues de otros participantes. Antes de escribir, muestra la lista concreta de lo que vas a crear y pide confirmación.
- Nunca inventes reglas de negocio. Si falta información o hay contradicciones, regístralas en "Preguntas abiertas" con la fuente.
- Cita la clave de Jira de origen en cada requerimiento (ej. `Origen: SCRUM-8`).

## Identificadores y trazabilidad
- Requerimientos funcionales: `RF-###`; no funcionales: `RNF-###`; reglas de negocio: `RN-###`.
- Componentes de diseño: `DIS-###`; decisiones: `ADR-###`; casos de prueba: `CP-###`.
- Cada `RF`/`RNF` debe aparecer en `docs/diseno/` y en al menos un `CP`. Las pruebas automatizadas incluyen el ID en su nombre, ej. `CP-003 [RF-002]`.
- La matriz de trazabilidad vive en `docs/trazabilidad.md`.
- Antes de terminar, ejecuta `node tools/validar-trazabilidad.js` e **informa** el resultado. Corrige solo los errores que correspondan a la fase en la que estás trabajando.
- **Trabaja solo en la fase de tu rol**: análisis → `docs/analisis/`; diseño → `docs/diseno/` y `docs/trazabilidad.md`; pruebas → `docs/pruebas/` y `tests/`. Nunca crees artefactos de otra fase para que el validador pase: es correcto y esperado que reporte NO CUMPLE mientras faltan fases.

## Forma de trabajo
- No delegues el trabajo en subagentes: lee, crea y edita tú los archivos y ejecuta tú los comandos en este mismo chat.

## Código y pruebas
- La API está en `api/` (Node.js 20, Express). Pruebas funcionales con Jest + Supertest en `tests/funcionales/`; rendimiento con k6 en `tests/rendimiento/`.
- No modifiques el código de la API para que una prueba pase sin explicar el defecto encontrado.
