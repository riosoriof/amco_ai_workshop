---
name: revisar-entregable
description: "Evalúa un entregable de análisis (propio o de un proveedor) contra el checklist AMCO y crea tareas en Jira por brecha"
disable-model-invocation: true
argument-hint: Ruta del entregable (.md, .docx o .pdf), opcional
---
> Agente recomendado: **revisor-estandares**.

Revisa el entregable indicado (por defecto: tu análisis en `docs/analisis/` y `data/proveedor-b/analisis-proveedor-b.docx`).

1. Si el archivo es `.docx` o `.pdf`, conviértelo a texto en `docs/revision/` sin modificar el original. Intenta en este orden y usa la primera que exista: `pandoc`, `markitdown`, `textutil` (solo macOS). Si no hay ninguna, lee el archivo directamente con tus herramientas de lectura. Solo si nada funciona, indícalo y pide el texto.
2. Evalúa **cada** entregable por separado, incluido el análisis propio: cada criterio aplicable de `estandares/checklist-entregables.md` (Cumple / Parcial / No cumple / N/A) con evidencia, severidad, % de cumplimiento y veredicto. Guarda un reporte por entregable en `docs/revision/revision-<entregable>.md`.
3. Compara los entregables en una tabla breve que incluya el % y el veredicto de cada uno.
4. Propón **máximo 3 tareas de Jira**, solo para las brechas más graves del entregable del proveedor (críticas primero, luego altas). Las demás brechas quedan únicamente en el reporte. Cada tarea lleva resumen, descripción con evidencia y criterio de cierre.
5. Para crear las tareas escribe `docs/jira/lab3-<alias>.json` (tipo `Task`, `parent` = clave de la épica) y ejecuta `node tools/jira.js create docs/jira/lab3-<alias>.json`; busca la épica con `node tools/jira.js search "project = SCRUM AND issuetype = Epic AND labels = <alias>"`.
6. Muestra en el chat una tabla con **cada** tarea propuesta (resumen completo, brecha y criterio de cierre) y **pide confirmación** antes de crearlas; no basta con describirlas en general. Al crear, en el proyecto SCRUM:
   - Resumen con el formato `[alias] <Proveedor> · <brecha>`, por ejemplo `[jperez] Proveedor B · Asignar IDs únicos a los requerimientos`.
   - Etiqueta `alias`. El alias sale de `.github/copilot-instructions.md`; si falta, pídelo.
   - Padre: la épica que el participante creó en el lab 2. Búscala con JQL `project = SCRUM AND issuetype = Epic AND labels = <alias>`. Si hay una, úsala como padre; si hay varias, pregunta cuál; si no hay, créalas sin padre e indícalo.
   - No edites issues de otros participantes ni los de referencia (`[REF]`).
