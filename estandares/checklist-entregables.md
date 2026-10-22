# Checklist de entregables AMCO (análisis y diseño)

## Análisis
1. Usa la plantilla oficial con todas las secciones obligatorias.
2. Indica la épica de Jira de origen y cada requerimiento cita su historia.
3. Requerimientos con ID (RF/RNF/RN) únicos.
4. Requerimientos verificables (sin términos ambiguos, con criterio medible).
5. Cada historia tiene criterios Gherkin con al menos un escenario negativo.
6. RNF con métrica, umbral y condición de carga.
7. Preguntas abiertas y contradicciones documentadas con responsable.
8. Alcance y fuera de alcance explícitos.

## Diseño
9. Diagrama de contexto y de secuencia del flujo principal.
10. Cada componente indica los RF/RNF que atiende.
11. Contrato de API documentado (OpenAPI o delta).
12. Al menos un ADR para decisiones relevantes.
13. Riesgos técnicos identificados.

## Trazabilidad
14. Matriz de trazabilidad: en **análisis**, cada RF/RNF cita su historia de Jira (Jira → RF/RNF); en **diseño**, el tramo Jira → RF/RNF → DIS (la columna CP puede estar pendiente); en **pruebas**, la matriz completa Jira → RF/RNF → DIS → CP.
15. El validador automático (`tools/validar-trazabilidad.js`) termina sin errores. Aplica solo cuando ya existen los casos de prueba de la épica (`docs/pruebas/casos-prueba-*.md`); antes de eso es **N/A**. La prueba de ejemplo de la plantilla (`tests/funcionales/base.test.js`, CP-000) no cuenta como pruebas de la épica.

## Aplicabilidad por tipo de entregable
- **Análisis:** criterios 1–8 y 14 (tramo Jira → RF/RNF). Los criterios 9–13 y 15 son N/A.
- **Diseño:** criterios 9–13 y 14 (tramo Jira → RF/RNF → DIS). El criterio 15 es N/A hasta que existan `docs/pruebas/casos-prueba-*.md`.
- **Pruebas:** criterio 14 completo (→ CP) y 15.
- **Decisiones pendientes del negocio:** si un requerimiento no puede cerrarse porque el negocio no ha decidido y el entregable lo registra correctamente como pregunta abierta con responsable, no se penaliza en los criterios 4–6; se reporta como observación.
