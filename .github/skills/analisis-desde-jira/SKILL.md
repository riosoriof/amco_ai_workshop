---
name: analisis-desde-jira
description: "Genera el documento de análisis estándar desde una épica de Jira"
disable-model-invocation: true
argument-hint: Clave de la épica (ej. SCRUM-5)
---
> Agente recomendado: **analista** (selecciónalo en el chat antes de ejecutar este skill).

Genera el documento de análisis de la épica la clave o alcance que indique el usuario (por defecto: SCRUM-5) y sus historias hijas, siguiendo la plantilla y las reglas del repositorio. Incluye preguntas abiertas y contradicciones detectadas. Escribe solo en `docs/analisis/`; no generes diseño, casos de prueba ni trazabilidad. Ejecuta el validador e informa su resultado sin intentar que pase.
