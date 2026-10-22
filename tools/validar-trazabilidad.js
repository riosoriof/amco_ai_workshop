#!/usr/bin/env node
// Validador de estándar y trazabilidad AMCO (sin dependencias).
// Uso: node tools/validar-trazabilidad.js
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const read = dir => {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap(e => {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === 'node_modules' ? [] : read(rel);
    return /\.(md|js|ts)$/.test(e.name) ? [{ file: rel, text: fs.readFileSync(path.join(root, rel), 'utf8') }] : [];
  });
};
const ids = (text, re) => new Set(text.match(re) || []);
const REQ = /\b(?:RF|RNF)-\d{3}\b/g;

// Solo los documentos de análisis (analisis-*.md); otros archivos de la carpeta (correo de seguimiento, pendientes de Jira) no se validan.
const analisis = read('docs/analisis').filter(d => /^analisis-.*\.md$/.test(path.basename(d.file)));
const diseno = read('docs/diseno');
const pruebas = [...read('docs/pruebas'), ...read('tests')];
const errores = [], avisos = [];

if (!analisis.length) {
  console.log('ℹ️  Aún no hay documentos en docs/analisis/. Genera el análisis (lab 1) y vuelve a ejecutar.');
  process.exit(0);
}

// 1. Secciones obligatorias del análisis
const secciones = ['Objetivo de negocio', 'Alcance', 'Reglas de negocio', 'Requerimientos funcionales',
  'Requerimientos no funcionales', 'Historias de usuario', 'Preguntas abiertas'];
for (const { file, text } of analisis) {
  for (const s of secciones) if (!text.toLowerCase().includes(s.toLowerCase())) errores.push(`${file}: falta la sección "${s}"`);
  if (!/Dado[\s\S]*Cuando[\s\S]*Entonces/i.test(text)) errores.push(`${file}: no hay criterios Gherkin (Dado/Cuando/Entonces)`);
  if (!/\b(?!(?:RF|RNF|RN|DIS|ADR|CP)-)[A-Z][A-Z0-9]+-\d+\b/.test(text)) errores.push(`${file}: no cita historias de Jira de origen`);
  // 2. Términos ambiguos en filas de requerimientos
  text.split('\n').filter(l => /^\|\s*(?:RF|RNF)-\d{3}/.test(l)).forEach(l => {
    const m = l.match(/\b(rápid[oa]s?|fácil(es)?|varios|adecuad[oa]s?|etc\.?|aproximadamente|amigable)\b/i);
    if (m) avisos.push(`${file}: término ambiguo "${m[0]}" en ${l.match(REQ)[0]}`);
  });
}

// 3. Trazabilidad
const definidos = new Set();
analisis.forEach(({ text }) => text.split('\n').filter(l => /^\|\s*(?:RF|RNF)-\d{3}/.test(l)).forEach(l => definidos.add(l.match(REQ)[0])));
const enDiseno = ids(diseno.map(d => d.text).join('\n'), REQ);
const enPruebas = ids(pruebas.map(d => d.text).join('\n'), REQ);
const filas = [...definidos].sort().map(id => {
  if (!enDiseno.has(id)) errores.push(`${id} no está cubierto en docs/diseno/`);
  if (!enPruebas.has(id)) errores.push(`${id} no tiene casos de prueba (docs/pruebas/ o tests/)`);
  return `| ${id} | ${enDiseno.has(id) ? '✅' : '❌'} | ${enPruebas.has(id) ? '✅' : '❌'} |`;
});
if (!fs.existsSync(path.join(root, 'docs/trazabilidad.md'))) avisos.push('Falta docs/trazabilidad.md (matriz de trazabilidad)');

const cobertura = definidos.size ? Math.round(100 * [...definidos].filter(i => enDiseno.has(i) && enPruebas.has(i)).length / definidos.size) : 0;
console.log(`\nRequerimientos definidos: ${definidos.size} · Cobertura completa (diseño + prueba): ${cobertura}%\n`);
console.log('| Req | Diseño | Prueba |\n|---|---|---|\n' + filas.join('\n'));
avisos.forEach(a => console.log('⚠️  ' + a));
errores.forEach(e => console.log('❌ ' + e));
console.log(errores.length ? `\nResultado: NO CUMPLE (${errores.length} errores)` : '\nResultado: CUMPLE');
process.exit(errores.length ? 1 : 0);
