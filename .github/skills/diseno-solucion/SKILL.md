---
name: diseno-solucion
description: "Genera diseño, ADR y matriz de trazabilidad desde el análisis"
disable-model-invocation: true
---
> Agente recomendado: **arquitecto** (selecciónalo en el chat antes de ejecutar este skill).

A partir de los documentos en `docs/analisis/` y del código de `api/`, genera el documento de diseño, un ADR para la decisión más relevante y la matriz de trazabilidad. Ejecuta el validador al final.

Alcance: genera solo diseño, ADR y `docs/trazabilidad.md`. **No crees casos de prueba** (eso corresponde al agente qa en el lab 3); es esperado que el validador reporte requerimientos sin prueba. Incluye diagramas Mermaid de contexto, componentes y secuencia.
