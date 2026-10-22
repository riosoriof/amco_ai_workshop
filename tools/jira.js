#!/usr/bin/env node
// Cliente mínimo de la API REST de Jira (sin dependencias, Node 20+).
// Lee JIRA_SITE, JIRA_EMAIL y JIRA_TOKEN de .env en la raíz del repo (.env no se sube a GitHub).
// Uso:
//   node tools/jira.js whoami
//   node tools/jira.js search "parent = SCRUM-5"
//   node tools/jira.js get SCRUM-6
//   node tools/jira.js create issues.json
// issues.json: [{"type":"Epic","summary":"[alias] ...","description":"...","labels":["alias"]},
//               {"type":"Story","summary":"[alias] ...","description":"Escenario: ...\nDado ...","labels":["alias"],"parent":"$0"}]
//   "parent": "$0" = clave del issue 0 creado en el mismo archivo; o una clave existente, ej. "SCRUM-30".
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const envFile = path.join(root, '.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const { JIRA_SITE = 'thelg.atlassian.net', JIRA_EMAIL, JIRA_TOKEN, JIRA_PROJECT = 'SCRUM' } = process.env;
if (!JIRA_EMAIL || !JIRA_TOKEN) {
  console.error('Falta JIRA_EMAIL o JIRA_TOKEN en .env (copia .env.example a .env y llénalo).');
  process.exit(1);
}
const base = `https://${JIRA_SITE}`;
const auth = 'Basic ' + Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');
async function api(method, url, body) {
  const res = await fetch(base + url, {
    method,
    headers: { Authorization: auth, Accept: 'application/json', 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30000),
  });
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) {
    const msg = (data.errorMessages || []).concat(Object.values(data.errors || {})).join('; ') || text.slice(0, 300);
    throw new Error(`Jira respondió ${res.status}: ${msg}`);
  }
  return data;
}
const fila = i => `${i.key}\t${i.fields.issuetype?.name}\t${i.fields.status?.name}\t${i.fields.summary}` +
  (i.fields.parent ? `\t(padre ${i.fields.parent.key})` : '') + (i.fields.labels?.length ? `\t[${i.fields.labels.join(', ')}]` : '');
async function main() {
  const [cmd, arg] = process.argv.slice(2);
  if (cmd === 'whoami') {
    const me = await api('GET', '/rest/api/2/myself');
    console.log(`Conectado a ${JIRA_SITE} como ${me.displayName}`);
  } else if (cmd === 'search') {
    const q = new URLSearchParams({ jql: arg || `project = ${JIRA_PROJECT} ORDER BY key`, maxResults: '50', fields: 'summary,status,issuetype,labels,parent' });
    const r = await api('GET', `/rest/api/3/search/jql?${q}`);
    if (!r.issues || !r.issues.length) console.log('Sin resultados');
    else r.issues.forEach(i => console.log(fila(i)));
  } else if (cmd === 'get') {
    const i = await api('GET', `/rest/api/2/issue/${arg}?fields=summary,status,issuetype,labels,parent,description`);
    console.log(fila(i) + '\n\n' + (i.fields.description || '(sin descripción)'));
  } else if (cmd === 'create') {
    const items = JSON.parse(fs.readFileSync(path.resolve(arg), 'utf8'));
    const creados = [];
    for (const it of items) {
      const parent = it.parent && String(it.parent).startsWith('$') ? creados[Number(it.parent.slice(1))] : it.parent;
      const fields = { project: { key: it.project || JIRA_PROJECT }, issuetype: { name: it.type || 'Task' },
        summary: it.summary, description: it.description || '', labels: it.labels || [] };
      if (parent) fields.parent = { key: parent };
      const r = await api('POST', '/rest/api/2/issue', { fields });
      creados.push(r.key);
      console.log(`Creado ${r.key}\t${it.type || 'Task'}\t${it.summary}${parent ? `\t(padre ${parent})` : ''}`);
    }
  } else {
    console.log('Comandos: whoami | search "<JQL>" | get <CLAVE> | create <archivo.json>');
  }
}
main().catch(e => { console.error('❌ ' + e.message); process.exit(1); });
