#!/usr/bin/env node
// Genera un reporte ejecutivo .pptx desde un JSON (sin Python).
// Uso (desde la raíz): node tools/generar-reporte.js docs/reporte/datos.json docs/reporte/reporte-ejecutivo.pptx
// Requiere `npm install` en api/ (pptxgenjs está en sus devDependencies).
const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const [, , entrada, salida] = process.argv;
if (!entrada || !salida) {
  console.error('Uso: node tools/generar-reporte.js datos.json salida.pptx');
  process.exit(1);
}
let PptxGenJS;
try {
  PptxGenJS = createRequire(path.join(__dirname, '..', 'api', 'package.json'))('pptxgenjs');
} catch {
  console.error('Falta pptxgenjs. Ejecuta: cd api && npm install');
  process.exit(1);
}

const d = JSON.parse(fs.readFileSync(entrada, 'utf8'));
const C = { azul: '0B3D91', azulClaro: 'E8EEF8', texto: '1F2933', gris: '5F6B7A', linea: 'D5DCE6', blanco: 'FFFFFF' };
const FONT = 'Calibri';
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in
const fecha = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

pptx.defineSlideMaster({
  title: 'CONTENIDO',
  background: { color: C.blanco },
  objects: [
    { rect: { x: 0, y: 0, w: 13.33, h: 0.12, fill: { color: C.azul } } },
    { text: { text: `${d.titulo || 'Reporte ejecutivo'} · ${fecha}`, options: { x: 0.6, y: 7.0, w: 9, h: 0.3, fontFace: FONT, fontSize: 10, color: C.gris } } },
  ],
  slideNumber: { x: 12.4, y: 7.0, w: 0.5, h: 0.3, fontFace: FONT, fontSize: 10, color: C.gris },
});

const encabezado = (s, t) => {
  s.addText(t, { x: 0.6, y: 0.45, w: 12, h: 0.8, fontFace: FONT, fontSize: 30, bold: true, color: C.azul });
  s.addShape(pptx.ShapeType.line, { x: 0.6, y: 1.25, w: 1.2, h: 0, line: { color: C.azul, width: 3 } });
};

const lista = (t, items) => {
  const s = pptx.addSlide({ masterName: 'CONTENIDO' });
  encabezado(s, t);
  const filas = (items && items.length ? items : ['Sin datos registrados']).slice(0, 5)
    .map(i => ({ text: i, options: { bullet: { indent: 18 }, paraSpaceAfter: 14 } }));
  s.addText(filas, { x: 0.8, y: 1.6, w: 11.6, h: 5.1, fontFace: FONT, fontSize: 22, color: C.texto, valign: 'top' });
};

// Portada
let s = pptx.addSlide();
s.background = { color: C.azul };
s.addText(d.titulo || 'Reporte ejecutivo', { x: 0.8, y: 2.3, w: 11.7, h: 1.4, fontFace: FONT, fontSize: 42, bold: true, color: C.blanco });
if (d.subtitulo) s.addText(d.subtitulo, { x: 0.8, y: 3.7, w: 11.7, h: 0.7, fontFace: FONT, fontSize: 22, color: 'C9D6EE' });
s.addText([d.autor, fecha].filter(Boolean).join(' · '), { x: 0.8, y: 5.6, w: 11.7, h: 0.5, fontFace: FONT, fontSize: 16, color: 'C9D6EE' });

lista('Resumen', d.resumen);

// Métricas en tarjetas
s = pptx.addSlide({ masterName: 'CONTENIDO' });
encabezado(s, 'Métricas');
const met = Object.entries(d.metricas || {});
const cols = met.length > 6 ? 4 : Math.min(3, Math.max(1, met.length));
const rows = Math.max(1, Math.ceil(met.length / cols));
const cw = (11.9 - (cols - 1) * 0.3) / cols, ch = Math.min(2.2, (5.0 - (rows - 1) * 0.35) / rows);
met.forEach(([k, v], i) => {
  const x = 0.7 + (i % cols) * (cw + 0.3), y = 1.7 + Math.floor(i / cols) * (ch + 0.35);
  s.addShape(pptx.ShapeType.rect, { x, y, w: cw, h: ch, fill: { color: C.azulClaro }, line: { color: C.linea } });
  s.addText(String(v), { x: x + 0.3, y: y + 0.25, w: cw - 0.6, h: 1.1, fontFace: FONT, fontSize: 48, bold: true, color: C.azul });
  s.addText(k, { x: x + 0.3, y: y + 1.35, w: cw - 0.6, h: 0.6, fontFace: FONT, fontSize: 16, color: C.gris });
});
if (!met.length) s.addText('Sin métricas registradas', { x: 0.8, y: 1.8, w: 11, h: 0.6, fontFace: FONT, fontSize: 20, color: C.gris });

lista('Hallazgos', d.hallazgos);
lista('Riesgos', d.riesgos);
lista('Siguientes pasos', d.siguientes_pasos);

fs.mkdirSync(path.dirname(path.resolve(salida)), { recursive: true });
pptx.writeFile({ fileName: salida }).then(() => console.log('Reporte generado:', salida));
