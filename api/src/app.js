const express = require('express');
const crypto = require('crypto');
const { RATINGS, PLAN_LIMITS, MAX_PROFILES, seed } = require('./data');

let db = seed();
const app = express();
app.use(express.json());

const allowed = (contentRating, maxRating) => RATINGS.indexOf(contentRating) <= RATINGS.indexOf(maxRating);
const err = (res, status, code, message) => res.status(status).json({ code, message });

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/', (req, res) => res.json({ api: 'Demo perfiles y reproducción (ficticia)', health: '/health', contrato: 'api/openapi.yaml', endpoints: ['GET /api/v1/catalog?profileId=', 'POST /api/v1/profiles', 'POST /api/v1/playback/sessions', 'DELETE /api/v1/playback/sessions/:id'] }));

// Reinicia los datos (solo para pruebas y demos)
app.post('/api/v1/test/reset', (req, res) => { db = seed(); res.status(204).end(); });

// Catálogo filtrado por la clasificación del perfil
app.get('/api/v1/catalog', (req, res) => {
  const profile = db.profiles[req.query.profileId];
  if (!profile) return err(res, 404, 'PROFILE_NOT_FOUND', 'Perfil no encontrado');
  const items = Object.values(db.contents).filter(c => allowed(c.rating, profile.maxRating));
  res.json({ items });
});

// Crear perfil
app.post('/api/v1/profiles', (req, res) => {
  const { accountId, name, kids = false, maxRating } = req.body || {};
  if (!db.accounts[accountId]) return err(res, 404, 'ACCOUNT_NOT_FOUND', 'Cuenta no encontrada');
  if (!name) return err(res, 400, 'VALIDATION_ERROR', 'El nombre es obligatorio');
  const rating = maxRating || (kids ? 'A' : 'D');
  if (!RATINGS.includes(rating)) return err(res, 400, 'VALIDATION_ERROR', 'Clasificación inválida');
  if (kids && RATINGS.indexOf(rating) > RATINGS.indexOf('B')) {
    return err(res, 422, 'RATING_NOT_ALLOWED', 'Un perfil infantil no puede superar la clasificación B');
  }
  const count = Object.values(db.profiles).filter(p => p.accountId === accountId).length;
  if (count > MAX_PROFILES) return err(res, 409, 'PROFILE_LIMIT', 'La cuenta ya tiene el máximo de perfiles');
  const profile = { id: 'p-' + crypto.randomUUID().slice(0, 8), accountId, name, kids, maxRating: rating };
  db.profiles[profile.id] = profile;
  res.status(201).json(profile);
});

// Iniciar reproducción
app.post('/api/v1/playback/sessions', (req, res) => {
  const { profileId, contentId } = req.body || {};
  const profile = db.profiles[profileId];
  if (!profile) return err(res, 404, 'PROFILE_NOT_FOUND', 'Perfil no encontrado');
  const content = db.contents[contentId];
  if (!content) return err(res, 404, 'CONTENT_NOT_FOUND', 'Contenido no encontrado');
  if (!allowed(content.rating, profile.maxRating)) {
    return err(res, 403, 'PARENTAL_RESTRICTION', 'Contenido no apto para este perfil');
  }
  const account = db.accounts[profile.accountId];
  const active = Object.values(db.sessions).filter(s => s.accountId === account.id).length;
  if (active > PLAN_LIMITS[account.plan]) {
    return err(res, 409, 'CONCURRENCY_LIMIT', 'Se alcanzó el límite de pantallas del plan');
  }
  const session = { id: crypto.randomUUID(), accountId: account.id, profileId, contentId, startedAt: new Date().toISOString() };
  db.sessions[session.id] = session;
  res.status(201).json(session);
});

// Detener reproducción
app.delete('/api/v1/playback/sessions/:id', (req, res) => {
  if (!db.sessions[req.params.id]) return err(res, 404, 'SESSION_NOT_FOUND', 'Sesión no encontrada');
  delete db.sessions[req.params.id];
  res.status(204).end();
});

module.exports = app;
