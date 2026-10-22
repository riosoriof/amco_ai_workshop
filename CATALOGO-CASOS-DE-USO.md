# Catálogo de casos de uso · IA en el SDLC (Análisis, Diseño y Pruebas)

Casos donde la IA puede incorporarse para estandarizar entregables de proveedores y acelerar la operación. Úsalo para elegir los casos de un piloto y medirlos con los mismos KPIs.

**Herramientas:** GitHub Copilot (repositorio y código) · Microsoft Copilot Studio (agentes de negocio en Teams) · Microsoft Copilot Cowork (tareas en Outlook, Teams y Office).

**Estado:** ✅ probado en este workshop · 🎬 demo en la sesión teórica · 🧭 propuesto para piloto

## Análisis

| # | Caso de uso | Herramienta | Entrada → Salida | Cómo se usa | Beneficio | KPI sugerido | Estado |
|---|---|---|---|---|---|---|---|
| 1 | De Jira al documento de análisis estándar | GitHub Copilot + API de Jira | Épica e historias → análisis con RF/RNF/RN, origen y preguntas abiertas | Agente `analista` → `/analisis-desde-jira` | Mismo formato para todos los proveedores | Horas por documento; % entregables conformes | ✅ Lab 1 y 2 |
| 2 | Historias con criterios Gherkin | GitHub Copilot | Historia débil → historia INVEST con escenarios positivos, negativos y de borde | Agente `analista` → `/historias-gherkin` | Criterios probables desde el día uno | % historias con criterios verificables | ✅ Lab 1 y 2 |
| 3 | Detección de ambigüedades y contradicciones | GitHub Copilot / Copilot Studio | Backlog + minuta → lista de inconsistencias con fuente y responsable | Incluido en `/analisis-desde-jira` | Menos retrabajo en desarrollo y QA | Defectos por requerimiento ambiguo | ✅ Lab 1 y 3 |
| 4 | De junta de refinamiento a minuta y borrador | Copilot Cowork | Transcripción de Teams, correos y exportación de Jira → borrador en Word, acuerdos y seguimiento | Tarea en Cowork con skill de plantilla | El analista valida en lugar de transcribir | Tiempo de junta a borrador | 🎬 |

## Diseño

| # | Caso de uso | Herramienta | Entrada → Salida | Cómo se usa | Beneficio | KPI sugerido | Estado |
|---|---|---|---|---|---|---|---|
| 5 | Diseño de solución desde el análisis y el código | GitHub Copilot | Análisis + código + OpenAPI → diseño con diagramas Mermaid, componentes y delta de contrato | Agente `arquitecto` → `/diseno-solucion` | Diseño alineado con lo que existe | Horas por diseño; hallazgos en revisión | ✅ Lab 4 |
| 6 | Registro de decisiones (ADR) | GitHub Copilot | Decisión técnica → ADR con contexto, opciones y consecuencias | Incluido en `/diseno-solucion` | El conocimiento no depende del proveedor | % decisiones relevantes documentadas | ✅ Lab 4 |
| 7 | Matriz de trazabilidad verificable | GitHub Copilot + validador en CI | Análisis, diseño y pruebas → matriz Jira → RF/RNF → DIS → CP validada automáticamente | `node tools/validar-trazabilidad.js` y GitHub Actions | Entregables trazables y verificables | % cobertura de trazabilidad | ✅ Labs 2–3 |

## Estandarización de proveedores

| # | Caso de uso | Herramienta | Entrada → Salida | Cómo se usa | Beneficio | KPI sugerido | Estado |
|---|---|---|---|---|---|---|---|
| 8 | Guardián de Estándares | Copilot Studio (Teams) | Entregable del proveedor → reporte Cumple/Parcial/No cumple, % y brechas (opcional: tickets en Jira) | Agente publicado en Teams con checklist en SharePoint | Revisión objetiva y uniforme | % cumplimiento por proveedor; tiempo de revisión | 🎬 |
| 9 | Revisor de estándares en el repositorio | GitHub Copilot | Documentos en `docs/` → evaluación contra `estandares/checklist-entregables.md` | Agente `revisor-estandares` | Autoevaluación antes de entregar | % cumplimiento antes de revisión | ✅ Lab 3 y 4 |
| 10 | Kit estándar compartido | GitHub Copilot | Instrucciones, agentes, skills y plantillas en `.github/` y `estandares/` | Repositorio plantilla para cada proveedor | El estándar viaja dentro de la herramienta | Nº proveedores usando el kit | ✅ Todo el workshop |

## Pruebas

| # | Caso de uso | Herramienta | Entrada → Salida | Cómo se usa | Beneficio | KPI sugerido | Estado |
|---|---|---|---|---|---|---|---|
| 11 | Casos de prueba desde criterios de aceptación | GitHub Copilot | Criterios Gherkin → casos positivos, negativos y de borde ligados a RF | Agente `qa` → `/casos-prueba` | Más cobertura en menos tiempo | Horas de diseño de pruebas; casos por RF | ✅ Lab 5 |
| 12 | Pruebas funcionales de API generadas y ejecutadas | GitHub Copilot (modo agente) | Casos → pruebas automatizadas ejecutadas y defectos documentados | Agente `qa` → `/pruebas-api` | Del caso a la ejecución en minutos | % casos automatizados; defectos antes de producción | ✅ Lab 5 |
| 13 | Suite de regresión | GitHub Copilot | Cambio en código → pruebas `@regresion` aplicables y faltantes | Agente `qa` sobre el Pull Request | Liberaciones más seguras | Defectos escapados por release | 🧭 |
| 14 | Rendimiento, estrés y pico de APIs | GitHub Copilot + k6 | RNF (p95, concurrencia, pico) → script k6 con umbrales e interpretación | Agente `qa` → `/pruebas-rendimiento` | Preparación para eventos en vivo | RNF con prueba automatizada; p95 por release | ✅ Lab 6 |
| 15 | Reporte de ejecución para la gerencia | Copilot Cowork | Resultados de pruebas → reporte ejecutivo con riesgos y go/no-go | Tarea en Cowork | Decisión de liberación informada | Tiempo de preparación del reporte | 🎬 |

## Cómo priorizar el piloto

1. Elige **2–3 casos** con mayor dolor actual (por ejemplo: 1, 8 y 14).
2. Mide una **línea base** de sus KPIs con el proceso actual.
3. Ejecuta el piloto 4–6 semanas con 1–2 equipos o proveedores usando este kit.
4. Compara contra la línea base y decide el escalamiento.
