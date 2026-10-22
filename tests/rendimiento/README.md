Aquí el agente QA genera `playback-k6.js` (lab 4).

Ejecutar con la API arriba (`cd api && npm start`):

```bash
k6 run tests/rendimiento/playback-k6.js
# o con Docker
docker run --rm -i -e BASE_URL=http://host.docker.internal:3000 grafana/k6 run - < tests/rendimiento/playback-k6.js
```
