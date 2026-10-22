---
name: casos-prueba
description: "Genera casos de prueba desde los criterios de aceptación"
disable-model-invocation: true
argument-hint: Requerimientos a cubrir (ej. RF-001 a RF-005)
---
> Agente recomendado: **qa** (selecciónalo en el chat antes de ejecutar este skill).

Genera los casos de prueba para la clave o alcance que indique el usuario (por defecto: todos los RF del análisis), con datos de prueba y resultado esperado, y actualiza la matriz de trazabilidad.

Guarda los casos en `docs/pruebas/casos-prueba-<clave-epica>.md`. Usa `api/src/data.js` para elegir datos de prueba reales.

**Alcance de este skill:** solo documenta casos y actualiza la matriz. No escribas pruebas automatizadas, no ejecutes `npm test`, no levantes la API ni crees scripts k6: eso lo hacen `/pruebas-api` (siguiente paso) y `/pruebas-rendimiento` (lab 6). Para RNF, deja el caso documentado y marca su automatización como pendiente de `/pruebas-rendimiento`.
