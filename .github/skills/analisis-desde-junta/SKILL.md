---
name: analisis-desde-junta
description: "Genera el análisis estándar y un borrador de correo de seguimiento a partir de la transcripción, correos y minuta de una junta"
disable-model-invocation: true
argument-hint: Clave de la épica (ej. SCRUM-5), opcional
---
> Agente recomendado: **analista** (selecciónalo en el chat antes de ejecutar este skill).

Lee `data/junta/transcripcion-junta-refinamiento.md`, `data/junta/correos.md` y `data/minuta-refinamiento.md`. Contrasta, usando `node tools/jira.js search "parent = SCRUM-5"`, con la épica indicada (por defecto SCRUM-5); si no, usa `data/jira/epica-SCRUM-5.json`.

1. Extrae acuerdos, decisiones, contradicciones y temas sin cerrar. Ignora lo que no aporta (charla fuera de agenda). Cita la fuente de cada dato (transcripción con minuto, correo o minuta).
2. Genera `docs/analisis/analisis-<clave>.md` con la plantilla `estandares/plantillas/analisis.md`. Lo no cerrado va a "Preguntas abiertas y contradicciones" con responsable; no inventes respuestas.
3. Genera `docs/analisis/correo-seguimiento-<clave>.md`: borrador de correo a los asistentes con acuerdos, pendientes por responsable y fecha sugerida. No lo envíes.
4. Escribe solo en `docs/analisis/`. Ejecuta el validador e informa el resultado (en esta fase es normal que diga NO CUMPLE).
