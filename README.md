# Workshop AI-SDLC · AMCO (Claro video)

Kit práctico para usar **GitHub Copilot** en las fases de **Análisis, Diseño y Pruebas** con un estándar único de artefactos, **trazable y verificable**, conectado a **Jira**.

> Todo el escenario y los datos son **ficticios**: una plataforma de streaming y la épica *Perfiles infantiles con control parental* (SCRUM-5).

**Duración de la práctica:** ~2 horas · **Labs:** 0 (preparación, idealmente antes de la sesión) + 7

El recorrido sigue el flujo real de un proyecto: **de la junta al análisis, del análisis a Jira, revisión de estándares, diseño, pruebas, rendimiento y Pull Request.**

| Lab | Fase | Tiempo | Qué vas a lograr |
|---|---|---|---|
| [0](#lab-0--preparación-15-min) | Preparación | 15 min | Repo, Copilot, Jira, alias y API funcionando |
| [1](#lab-1--de-la-junta-al-análisis-20-min) | Análisis | 20 min | Análisis estándar y borrador de correo desde la transcripción, correos y minuta de la junta |
| [2](#lab-2--del-análisis-a-jira-10-min) | Análisis | 10 min | Épica e historias con Gherkin creadas en Jira por el agente, con tu confirmación |
| [3](#lab-3--revisión-de-estándares-15-min) | Revisión | 15 min | Tu análisis y el del Proveedor B evaluados contra el checklist, con tareas en Jira por brecha |
| [4](#lab-4--diseño-y-trazabilidad-20-min) | Diseño | 20 min | Diseño, ADR y matriz de trazabilidad verificada |
| [5](#lab-5--pruebas-funcionales-y-regresión-25-min) | Pruebas | 25 min | Casos de prueba, pruebas ejecutadas y defectos encontrados |
| [6](#lab-6--rendimiento-y-estrés-de-apis-10-min) | Pruebas | 10 min | Prueba de carga, estrés y pico con k6 e interpretación |
| [7](#lab-7--pull-request-conocimiento-compartido-y-reporte-ejecutivo-25-min) | Corrección y cierre | 25 min | Copilot coding agent corrige los defectos, code review, Space con el estándar y reporte ejecutivo `.pptx` |

---

## Cómo funciona el kit

Copilot lee automáticamente lo que hay en `.github/` y aplica el **estándar AMCO** en cada respuesta:

| Pieza | Dónde | Para qué |
|---|---|---|
| Instrucciones del repositorio | `.github/copilot-instructions.md` | Reglas globales: idioma, IDs (`RF`, `RNF`, `DIS`, `CP`), no inventar reglas de negocio |
| Instrucciones por artefacto | `.github/instructions/` | Reglas específicas de análisis, diseño y pruebas |
| **Agentes** por rol | `.github/agents/` | `analista`, `arquitecto`, `qa`, `revisor-estandares` |
| **Skills** (se invocan con `/`) | `.github/skills/` | `/analisis-desde-junta`, `/analisis-desde-jira`, `/historias-gherkin`, `/revisar-entregable`, `/diseno-solucion`, `/casos-prueba`, `/pruebas-api`, `/pruebas-rendimiento`, `/reporte-ejecutivo` |
| Conexión a Jira | `tools/jira.js` + `.env` | Script con la API REST de Jira. El token del workshop va en `.env`, que **nunca** se sube a GitHub |
| Plantillas y checklist | `estandares/` | El formato único que deben seguir todos los proveedores |
| Validador | `tools/validar-trazabilidad.js` | Verifica estructura y trazabilidad (también corre en cada Pull Request) |
| Insumos | `data/` | `junta/` (transcripción y correos), minuta, entregable del Proveedor B y respaldo de Jira (`jira/`) por si no hay conexión |
| API demo | `api/` | Servicio de perfiles y reproducción sobre el que se prueban los labs |

**Regla de oro en todos los labs:** primero **eliges el agente** en el chat y después **invocas el skill** con `/nombre`. No cambies de agente mientras el agente está trabajando.

**Mientras el agente trabaja:**
- Si pide permiso para usar una herramienta (Jira) o ejecutar un comando (`npm test`, `node tools/...`), revisa qué va a hacer y da **Allow**.
- Los archivos que crea o modifica aparecen abajo del chat (por ejemplo *"2 files changed"*): revísalos y da **Keep** para conservarlos o **Undo** para descartarlos.
- Si algo sale mal, usa **Restore Checkpoint** en el chat para regresar al punto anterior.

---

## Requisitos

- **VS Code** actualizado y la extensión **GitHub Copilot** con licencia **Business o Enterprise** de tu organización (con Copilot Pro individual también funciona, pero el lab 7 queda en tu cuenta personal).
- **Git**, **Node.js 20+** y **k6** (`brew install k6` en macOS, `winget install k6` en Windows, o Docker).
- Una **cuenta de GitHub** (para crear tu copia del kit) y, para el **lab 7**, una cuenta u organización donde tengas **Copilot con coding agent habilitado** (lo habilita el administrador de la organización en las políticas de Copilot).
- La **invitación al Jira del workshop** (`thelg.atlassian.net`, proyecto `SCRUM`) que te envía el facilitador: al aceptarla entras con tu correo (si no tienes cuenta de Atlassian, se crea en ese momento, sin costo).
- El **token de Jira** que te comparte el facilitador al inicio de la sesión (paso 0.3). No necesitas crear uno.

---

## Lab 0 · Preparación (15 min)

> Idealmente hazlo **antes** del workshop.

### 0.1 Crea tu propio repositorio y ábrelo

Cada participante trabaja en **su propia copia privada** del kit: ahí guarda su trabajo de los labs y, en el lab 7, Copilot coding agent podrá corregir defectos con Pull Requests.

1. En GitHub abre [`luisalvarezepam1/amco_ai_demo`](https://github.com/luisalvarezepam1/amco_ai_demo) y da clic en **Use this template → Create a new repository**.
2. Elige como dueño **tu cuenta u organización con Copilot**, nombre `amco_ai_demo`, visibilidad **Private** (así tus hallazgos no quedan públicos) y da **Create repository**.
3. Clona **tu copia** y ábrela en VS Code (reemplaza `<tu-cuenta>`):

```bash
git clone https://github.com/<tu-cuenta>/amco_ai_demo.git
cd amco_ai_demo
code .
```

> No uses *Fork*: un fork de un repositorio público no puede ser privado. Si solo quieres explorar sin cuenta de GitHub, puedes clonar directamente `https://github.com/luisalvarezepam1/amco_ai_demo.git`, pero no podrás hacer el lab 7.

Si VS Code pregunta si confías en los autores de la carpeta, responde **Yes, I trust the authors** (sin esto no se cargan los agentes).

### 0.2 Verifica Copilot, agentes y skills

1. Abre el chat de Copilot (ícono de Copilot o `Ctrl+Cmd+I` / `Ctrl+Alt+I`) y selecciona el modo **Agent**.
2. Abre la lista de agentes (abajo del chat): deben aparecer **analista**, **arquitecto**, **qa** y **revisor-estandares**.
3. Escribe `/` en el chat: deben aparecer los skills (`analisis-desde-junta`, `casos-prueba`, …).

✅ **Esperado:** ves los 4 agentes y los 9 skills.
⚠️ Si VS Code muestra *"workspace customizations need an update"*, da clic en **Review Migrations → Migrate** (sin *Migrate with Agent*, que consume créditos).

### 0.3 Conecta Jira

Los agentes leen y escriben en Jira con el script `tools/jira.js` (API REST de Jira), usando un **API token**.

1. El facilitador comparte en el chat de la reunión el **token** de Jira del workshop.
2. En la raíz del repo copia la plantilla:
   ```bash
   cp .env.example .env
   ```
   (Windows PowerShell: `Copy-Item .env.example .env`)
3. Abre `.env` y pega el token en `JIRA_TOKEN`, sin comillas ni espacios (el correo ya viene puesto):
   ```
   JIRA_SITE=thelg.atlassian.net
   JIRA_EMAIL=the_lg@me.com
   JIRA_TOKEN=<token que compartió el facilitador>
   ```
4. Prueba la conexión:
   ```bash
   node tools/jira.js whoami
   node tools/jira.js search "parent = SCRUM-5"
   ```

✅ **Esperado:** *"Conectado a thelg.atlassian.net como …"* y la lista de SCRUM-6 a SCRUM-10.
🔒 `.env` está en `.gitignore`: **nunca** lo subas ni pegues el token en el chat de Copilot ni en otros archivos del repo.
🛟 **Plan B:** si aún no tienes el token, los agentes leen `data/jira/epica-SCRUM-5.json` y lo dicen explícitamente. Puedes hacer los labs; solo no se crearán issues en Jira.

### 0.4 Instala y prueba la API

En la terminal de VS Code:

```bash
cd api
npm install
npm test
cd ..
```

✅ **Esperado:** `Tests: 2 passed`.

### 0.5 Verifica k6

```bash
k6 version
```

✅ **Esperado:** muestra la versión de k6.

### 0.6 Registra tu alias

El Jira del workshop es **compartido**. Elige un alias corto con la inicial de tu nombre y tu primer apellido, sin acentos ni espacios (por ejemplo, Juan Pérez → `jperez`).

Abre `.github/copilot-instructions.md` y en la línea `Alias del participante: <tu-alias>` reemplaza `<tu-alias>` por tu alias. Guarda el archivo.

Los agentes lo usarán como prefijo (`[jperez] Crear perfil infantil`) y como etiqueta en todo lo que creen en Jira, para que cada quien encuentre lo suyo. Siempre te pedirán confirmación antes de escribir y nunca modificarán lo de otros. Si olvidas este paso, el agente te pedirá el alias antes de escribir en Jira.

---

## Lab 1 · De la junta al análisis (20 min)

**Objetivo:** convertir lo que se dijo en una junta (transcripción, correos y minuta) en el documento de análisis estándar y un correo de seguimiento.

### Pasos

1. Abre la carpeta `data/junta/` y echa un vistazo: `transcripcion-junta-refinamiento.md` y `correos.md`, más `data/minuta-refinamiento.md`. Hay acuerdos, contradicciones y charla que no aporta.
2. Abre un chat nuevo y selecciona el agente **analista**.
3. Escribe:
   ```
   /analisis-desde-junta SCRUM-5
   ```
4. Espera a que termine (1–2 min). Se crean `docs/analisis/analisis-SCRUM-5.md` y `docs/analisis/correo-seguimiento-SCRUM-5.md`.
5. Revisa ambos (vista previa: `Cmd+Shift+V` / `Ctrl+Shift+V`).
6. Corre el validador:
   ```bash
   node tools/validar-trazabilidad.js
   ```

### ✅ Qué se espera

- Requerimientos con ID (`RF-###`, `RNF-###`, `RN-###`) y su fuente (transcripción con minuto, correo o minuta).
- Criterios de aceptación en Gherkin con al menos un escenario negativo por historia.
- En **Preguntas abiertas** aparecen lo que **no se cerró** (intentos de PIN 3 vs. 5, TVOD en perfil infantil) **sin inventar respuestas**.
- El borrador de correo lista acuerdos y pendientes por responsable; **no se envía**.
- El validador puede decir **NO CUMPLE**: es correcto, todavía faltan diseño y pruebas.

### 💬 Para discutir

¿Cuánto tarda hoy pasar de una junta a un análisis y un correo? ¿Qué tan parecido sería entre dos proveedores?

---

## Lab 2 · Del análisis a Jira (10 min)

**Objetivo:** que el agente cree en Jira la épica y las historias con sus criterios Gherkin, **con tu confirmación**.

### Pasos

1. En el mismo chat, con el agente **analista**, escribe:
   ```
   Crea en Jira (proyecto SCRUM) una épica y sus historias a partir de docs/analisis/analisis-SCRUM-5.md, con mi alias como prefijo y etiqueta. Muéstrame primero la lista de lo que vas a crear y espera mi confirmación.
   ```
2. Revisa la lista y responde **Confirmo**. El agente escribe `docs/jira/lab2-<alias>.json` y pide permiso para ejecutar `node tools/jira.js create …` en la terminal: da **Allow**.
3. Abre Jira (`thelg.atlassian.net`) y filtra por tu etiqueta para ver tus issues.

### ✅ Qué se espera

- Una épica y una historia por cada historia del análisis, con Gherkin en la descripción.
- Todos los resúmenes con tu `[alias]` y tu etiqueta (tomados del paso 0.6); no se tocó ningún issue de otros participantes.
- El agente pidió confirmación **antes** de escribir.

🛟 **Plan B:** si `node tools/jira.js whoami` falla, el JSON queda en `docs/jira/` y se puede crear después con `node tools/jira.js create docs/jira/lab2-<alias>.json`.

### 💬 Para discutir

¿Qué riesgos hay en dejar que un agente escriba en Jira? ¿Qué controles pondrían (confirmación, etiquetas, permisos)?

---

## Lab 3 · Revisión de estándares (15 min)

**Objetivo:** medir contra el mismo checklist tu análisis y el del **Proveedor B**, y convertir las brechas en tareas de Jira.

### Pasos

1. Abre un chat nuevo y selecciona el agente **revisor-estandares**.
2. Escribe:
   ```
   /revisar-entregable docs/analisis/analisis-SCRUM-5.md y data/proveedor-b/analisis-proveedor-b.docx
   ```
   El agente convierte el `.docx` a texto en `docs/revision/`, evalúa ambos y guarda el reporte.
3. Revisa los porcentajes, el veredicto y la comparación.
4. El agente propone **hasta 3 tareas** para las brechas más graves del Proveedor B. Revísalas y confirma. Se crean en Jira como `[tu-alias] Proveedor B · <brecha>`, con tu etiqueta y dentro de la épica que creaste en el lab 2.

### ✅ Qué se espera

- Tabla **Cumple / Parcial / No cumple / N/A** por criterio, con evidencia, % de cumplimiento y veredicto para cada entregable.
- El Proveedor B queda notablemente por debajo: requerimientos ambiguos (*"rápida"*, *"muchos"*), sin Gherkin, sin IDs, sin fuente de Jira y con *"Preguntas abiertas: Ninguna"* aunque la junta dejó pendientes.
- Máximo 3 tareas en Jira, ligadas a tu épica del lab 2, solo después de tu confirmación. El resto de las brechas queda en el reporte de `docs/revision/`.

### 💬 Para discutir

¿Qué diferencia hay entre revisar con una persona y con un agente que aplica siempre el mismo checklist? ¿Cómo comunicarían las brechas a un proveedor?

Si el revisor bajó tu calificación por decisiones que Producto no ha tomado (TVOD, carga del pico): ¿es culpa del proveedor? El checklist distingue un requerimiento mal escrito de uno bloqueado por el negocio; el estándar también se mejora con el uso.

---

## Lab 4 · Diseño y trazabilidad (20 min)

**Objetivo:** pasar del análisis a un diseño trazable y verificar el estándar automáticamente.

### Pasos

1. Abre un chat nuevo y selecciona el agente **arquitecto**.
2. Escribe:
   ```
   /diseno-solucion
   ```
3. Revisa `docs/diseno/` y `docs/trazabilidad.md`.
4. Selecciona el agente **revisor-estandares** y escribe:
   ```
   Revisa docs/analisis y docs/diseno contra el checklist
   ```

### ✅ Qué se espera

- Diseño con diagramas **Mermaid** de contexto, componentes y secuencia (ábrelo en vista previa).
- Componentes `DIS-###`, cada uno con los RF/RNF que atiende.
- Al menos un **ADR** (decisión de arquitectura).
- Matriz `Jira → RF/RNF → DIS → CP`.
- El validador sigue en **NO CUMPLE** solo por las pruebas que faltan.
- El revisor entrega una tabla **Cumple / Parcial / No cumple**, un **% de cumplimiento** y las principales brechas.

---

## Lab 5 · Pruebas funcionales y regresión (25 min)

**Objetivo:** del criterio de aceptación a pruebas automatizadas ejecutadas y defectos encontrados.

### Pasos

1. Selecciona el agente **qa** y escribe:
   ```
   /casos-prueba
   ```
   Revisa `docs/pruebas/casos-prueba-SCRUM-5.md`.
2. Escribe:
   ```
   /pruebas-api
   ```
   El agente crea las pruebas en `tests/funcionales/` y las ejecuta con `npm test`.
3. Analiza las fallas:
   ```
   ¿Es defecto de la API o de la prueba? Verifica los datos de inicio en api/src/data.js antes de concluir.
   ```
4. **No corrijas los defectos todavía:** guarda la documentación que generó el agente; en el lab 7 se los asignarás a Copilot coding agent. Si el agente cambió `api/src/app.js`, descarta ese cambio (**Undo** en el chat o `git restore api/src/app.js`).

### ✅ Qué se espera

- Casos positivos, negativos y de borde ligados a RF/RNF.
- Pruebas con nombre `CP-### [RF-###] …`; las críticas marcadas `@regresion`.
- **Algunas pruebas fallan a propósito**: la API demo tiene defectos que debes descubrir.
- El agente documenta cada defecto (pasos, esperado, obtenido) **sin modificar la API**.
- `node tools/validar-trazabilidad.js` llega a **CUMPLE**, aunque `npm test` siga con fallas: el validador mide **trazabilidad**, no si las pruebas pasan. Las fallas se resuelven en el lab 7.

### 💬 Para discutir

La IA acelera mucho, pero **la persona verifica**: si el agente cambia de opinión sobre un defecto, pídele evidencia (datos, líneas de código) antes de aceptar la conclusión.

---

## Lab 6 · Rendimiento y estrés de APIs (10 min)

**Objetivo:** convertir un requerimiento no funcional en una prueba de carga ejecutable.

### Pasos

1. Levanta la API (déjala corriendo):
   ```bash
   cd api && npm start
   ```
   Verifica en el navegador: http://localhost:3000/health → `{"status":"ok"}`.
   Si aparece `EADDRINUSE` (puerto 3000 ocupado), quedó corriendo una API anterior: ciérrala en su terminal o con `npx kill-port 3000`.
2. Selecciona el agente **qa** y escribe:
   ```
   /pruebas-rendimiento
   ```
3. En una **segunda terminal**, desde la raíz del repo:
   ```bash
   k6 run tests/rendimiento/playback-k6.js
   ```
4. Copia el resumen de k6 al chat y pregunta:
   ```
   Interpreta este resultado: ¿se cumplió el RNF-001 (p95 < 300 ms)? ¿hubo errores en el pico? ¿qué recomendarías antes de escalar a 5,000 usuarios?
   ```
5. Detén la API con `Ctrl+C`.

### ✅ Qué se espera

- Script con tres escenarios: **carga sostenida, estrés incremental y pico**, con umbral `p(95)<300`.
- El umbral en verde (✓): la API demo es local y en memoria.
- Respuestas `409 CONCURRENCY_LIMIT` tratadas como **esperadas** (regla de negocio), no como fallas.
- El agente **no** da por cumplido el requerimiento para 5,000 usuarios: explica qué faltaría para una prueba productiva.

---

## Lab 7 · Pull Request, conocimiento compartido y reporte ejecutivo (25 min)

**Objetivo:** que un agente en la nube corrija los defectos del lab 5, revisarlo con IA, consultar el estándar desde un Copilot Space y cerrar con un reporte ejecutivo.

> El coding agent trabaja en **tu propia copia** del repositorio (necesitas permisos de escritura). Lanza el paso 7.2 al terminar el lab 5: el agente trabaja en segundo plano mientras haces el lab 6.

El lab tiene dos momentos: **7.1 y 7.2 al terminar el lab 5** (subes tu trabajo y asignas los defectos a Copilot) y **7.3 a 7.5 al terminar el lab 6** (revisas, consultas el Space y generas el reporte). Todo ocurre en **tu copia** del repositorio, la que creaste en el paso 0.1.

### 7.1 Sube tu trabajo de los labs 1 a 5

Así Copilot coding agent tendrá en la nube el mismo contexto que tú: análisis, revisión, diseño, casos y pruebas.

```bash
git add docs tests
git commit -m "Labs 1 a 5: análisis, revisión, diseño, casos y pruebas de SCRUM-5"
git push
```

✅ **Esperado:** en GitHub, tu repositorio muestra los archivos de `docs/` y `tests/`. El workflow **Validar estándares AMCO** marcará ❌ porque las pruebas que encontraron defectos fallan: es correcto, Copilot los corregirá en el siguiente paso.

### 7.2 Asigna los defectos a Copilot coding agent

1. En tu repositorio (`github.com/<tu-cuenta>/amco_ai_demo`) ve a **Issues → New issue** y crea uno con:
   - **Título:** los defectos que encontraste en el lab 5 (incluye **todos** los que hacen fallar `npm test`; si dejas alguno fuera, el pipeline seguirá en rojo) (por ejemplo, *"CP-00X falla: la API permite exceder un límite de negocio"*).
   - **Descripción:** pega la documentación de los defectos que generó el agente `qa` (pasos, esperado, obtenido, caso y requerimiento; está en `docs/pruebas/`), y agrega:
     ```
     Corrige el defecto en api/src/app.js sin modificar las pruebas existentes.
     Agrega o ajusta pruebas en tests/funcionales con el formato CP-### [RF-###].
     Ejecuta npm test desde api/ y node tools/validar-trazabilidad.js antes de terminar: todas las pruebas deben pasar.
     ```
2. En **Assignees**, selecciona **Copilot**. Se abre la ventana **Assign agent to issue**:
   - **Optional prompt:** puedes dejarlo vacío o agregar una restricción, por ejemplo: *"Cambio mínimo; no modifiques docs/ ni las pruebas existentes."*
   - **Repositorio:** verifica que sea **tu copia** (`<tu-cuenta>/amco_ai_demo`) y la rama `main`.
   - **Agente:** con el ícono de Copilot puedes elegir el agente personalizado **qa** (opcional).
   - **Modelo:** deja **Auto**.
   - Da clic en **Assign**.
3. Da clic en **Create** para crear el issue.

✅ **Esperado:** Copilot reacciona con 👀 y en pocos minutos abre un **Pull Request en borrador** (*[WIP] …*). Trabaja en la nube entre 5 y 15 minutos; cuando termina, el título pierde el *[WIP]* y recibes una notificación. **Mientras esperas:** haz el lab 6; si ya lo hiciste, adelanta el paso 7.4 (Space) o el 7.5 (reporte), que no dependen del Pull Request.

### 7.3 Revisa el Pull Request (cuando Copilot termine)

1. Abre el Pull Request de Copilot: revisa la descripción, el cambio en `api/src/app.js` y las pruebas.
2. Da clic en **View session** para ver los pasos que siguió el agente.
3. En **Reviewers**, solicita revisión a **Copilot** (Copilot code review).
4. Por seguridad, GitHub no ejecuta workflows en Pull Requests de Copilot sin permiso: da clic en **Approve and run workflows** y revisa la pestaña **Checks**; **Validar estándares AMCO** debe quedar en verde.
5. Si el pipeline sigue en rojo, abre el detalle del check para ver qué prueba falla y pide el ajuste comentando en el Pull Request con `@copilot`. También sirve para cualquier otro ajuste (por ejemplo: *"@copilot agrega un caso de borde para el límite exacto"*).
6. Cuando Copilot code review termine (*1 pending review* desaparece) y estés de acuerdo con el cambio: da **Ready for review** y luego **Merge pull request**. En tu copia es seguro hacer merge: cierra el ciclo y el issue se cierra automáticamente.

✅ **Esperado:** cambio mínimo y explicado, comentarios de Copilot code review, **All checks have passed** y, después del merge, `main` de tu copia con las pruebas en verde. La IA propone, **la persona aprueba**.

### 7.4 Crea un Copilot Space con el estándar AMCO

1. Entra a **github.com/copilot/spaces → Create space**, nombre `Estandar AMCO`.
2. Da clic en **Add sources**, elige tu repositorio y agrega: `estandares/`, `.github/copilot-instructions.md`, `data/minuta-refinamiento.md` y `CATALOGO-CASOS-DE-USO.md`.
3. En las instrucciones del Space escribe: *"Responde con base en el estándar AMCO y cita el archivo de origen."*
4. Pregunta:
   ```
   ¿Qué debe incluir un requerimiento no funcional para cumplir el checklist? Dame un ejemplo para el inicio de reproducción.
   ```

✅ **Esperado:** la respuesta cita el checklist y la plantilla de análisis. Cualquier persona o proveedor con acceso al Space consulta el mismo estándar.

⚠️ **Verifica el origen de cada dato:** si el ejemplo incluye valores que no están en las fuentes, es una propuesta de la IA, no una regla de negocio. Pregunta: *"¿De qué archivo sale cada valor del ejemplo?"*

### 7.5 Genera el reporte ejecutivo

1. Trae a tu equipo el merge del Pull Request, para que el reporte refleje el código corregido:
   ```bash
   git pull
   ```
2. Con el agente **revisor-estandares** escribe:
   ```
   /reporte-ejecutivo
   ```
   El agente junta los datos reales (validador, revisión, pruebas, Pull Request), los guarda en `docs/reporte/datos.json` y ejecuta `tools/generar-reporte.js` (usa la librería que ya instalaste con `npm install` en el lab 0).
3. Abre `docs/reporte/reporte-ejecutivo.pptx`.

✅ **Esperado:** presentación de 6 láminas (portada, resumen, métricas, hallazgos, riesgos y siguientes pasos) con cifras que puedes verificar en el repositorio. Si una cifra no tiene fuente, pídele al agente que la justifique o la quite.

### 💬 Para discutir

¿Qué tareas delegarían a un agente en la nube y cuáles requieren siempre revisión humana antes del merge? ¿Cómo usarían un Space para incorporar a un nuevo proveedor?

---

l ejemplo incluye valores que no están en las fuentes (por ejemplo, una tolerancia de errores que nadie definió), es una propuesta de la IA, no una regla de negocio. Pregunta: *"¿De qué archivo sale cada valor del ejemplo?"*

### 💬 Para discutir

¿Qué tipo de tareas delegarían a un agente en la nube y cuáles requieren siempre revisión humana antes del merge? ¿Cómo usarían un Space para incorporar a un nuevo proveedor?

---

## Problemas comunes

| Síntoma | Solución |
|---|---|
| No aparecen los agentes | Confía en la carpeta (*Trust*), revisa la licencia de Copilot y actualiza VS Code |
| Aviso *"workspace customizations need an update"* | **Review Migrations → Migrate** |
| `Falta JIRA_EMAIL o JIRA_TOKEN en .env` | Copia `.env.example` a `.env` y llénalo (paso 0.3) |
| `Jira respondió 401` | Token mal copiado o correo modificado: en `.env` deja `JIRA_EMAIL=the_lg@me.com` y vuelve a pegar el token |
| `Jira respondió 400` al crear | El agente mandó un campo inválido: pídele que revise el JSON en `docs/jira/` y reintente |
| El agente dice que usó el *respaldo local* | El script no pudo conectar: ejecuta `node tools/jira.js whoami` para ver el error (paso 0.3) |
| `npm install` reporta *vulnerabilities* | Son de herramientas de desarrollo (Jest, generador del reporte) y no afectan los labs. **No** ejecutes `npm audit fix --force`: puede romper las pruebas |
| `jest: command not found` | Ejecuta `cd api && npm install` |
| `Cannot GET /` en localhost:3000 | La API está bien; usa `/health` |
| No aparece **Copilot** en *Assignees* | Trabaja en tu propia copia (paso 0.1) y pide al administrador habilitar *Copilot coding agent* en las políticas de la organización |
| `git push` rechazado (*Permission denied*) | Clonaste el repositorio original; crea tu copia (paso 0.1) y cambia el remoto: `git remote set-url origin https://github.com/<tu-cuenta>/amco_ai_demo.git` |
| `git pull` dice *divergent branches* | Hiciste un commit local mientras se fusionaba el PR: ejecuta `git pull --no-rebase` y luego `git push` |
| El Pull Request de Copilot no muestra checks | Da clic en **Approve and run workflows** en el Pull Request |
| El agente "no ve" un archivo que acaba de crear | Revisa que diste **Keep** a los cambios del chat anterior |
| Jira creó issues sin tu alias o editó uno ajeno | Avisa al facilitador; revisa el paso 0.6 y repite el prompt pidiendo que solo cree, no edite |
| No se puede convertir el `.docx` | El agente prueba `pandoc`, `markitdown` y `textutil` (macOS); si no hay ninguno, pídele que lo lea directamente o instala `pip install markitdown` |
| `Falta pptxgenjs` al generar el reporte | Ejecuta `cd api && npm install` |
| `k6: command not found` | Instala k6 o usa Docker: `docker run --rm -i -e BASE_URL=http://host.docker.internal:3000 grafana/k6 run - < tests/rendimiento/playback-k6.js` |

---

## Después del workshop

- Revisa el **[catálogo de casos de uso](CATALOGO-CASOS-DE-USO.md)** para elegir qué llevar a un piloto.
- Borra tu `.env`: el facilitador revoca el token al terminar el workshop y deja de funcionar.
- Para reiniciar los labs: `git restore . && git clean -fd docs tests`.
