// Prueba base: el resto se genera con el agente QA en el lab 3.
const request = require('supertest');
const app = require('../../api/src/app');

beforeEach(() => request(app).post('/api/v1/test/reset'));

test('CP-000 [RF-000] la API responde health', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
});

test('CP-000b [RF-000] un perfil adulto puede iniciar reproducción', async () => {
  const res = await request(app).post('/api/v1/playback/sessions').send({ profileId: 'p-titular-p', contentId: 'c-005' });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});
