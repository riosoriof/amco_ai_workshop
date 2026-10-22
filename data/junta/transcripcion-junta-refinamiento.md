# Transcripción – Junta de refinamiento "Perfiles infantiles" (ficticia)

**Fecha:** 14 de octubre · **Duración:** 38 min · **Asistentes:** Marcela (Producto), Andrés (Arquitectura), Paola (QA), Iván (Proveedor A), Rosa (Proveedor B)

> Transcripción automática, sin editar. Puede contener errores de dicción y temas fuera de agenda.

**[00:00] Marcela (Producto):** Buenos días. Hoy cerramos reglas de la épica de perfiles infantiles. Primero lo básico: el límite es de cinco perfiles por cuenta, y ahí cuentan los infantiles también.

**[01:10] Iván (Proveedor A):** Entendido. ¿Y la clasificación por defecto del perfil infantil?

**[01:20] Marcela:** Por defecto A. El titular puede subirla hasta B, pero nunca B15 ni superior.

**[02:05] Rosa (Proveedor B):** ¿Y las clasificaciones AA también se permiten? Entiendo que AA es menor que A.

**[02:15] Marcela:** Sí, AA y A entran siempre. Sube hasta B como máximo.

**[03:30] Iván:** Sobre el PIN: proponemos bloquear tras cinco intentos fallidos, es lo que usamos en otro cliente.

**[03:45] Marcela:** Yo había dicho tres intentos, bloqueo de quince minutos.

**[04:00] Iván:** Cinco nos parece más amigable para el usuario.

**[04:10] Marcela:** Lo veo con seguridad y lo cerramos después. Por ahora no hay decisión.

**[06:20] Andrés (Arquitectura):** Importante: el perfil infantil cuenta para el límite de pantallas simultáneas. Básico dos, Premium cuatro.

**[07:00] Rosa:** ¿Qué pasa si el titular ya usa sus dos pantallas y el niño intenta reproducir?

**[07:10] Andrés:** Se rechaza la reproducción con un mensaje claro de límite alcanzado.

**[09:40] Paola (QA):** ¿Qué hacemos con las rentas, el TVOD? Si el titular rentó una película B15 y entra el niño, ¿la ve?

**[09:55] Marcela:** Buena pregunta, no lo he revisado con el área comercial. Lo llevo y les respondo.

**[12:30] Andrés:** En rendimiento, la autorización de reproducción debe responder con p95 menor a 300 milisegundos. Para eventos en vivo esperamos un pico de tres veces la carga normal en cinco minutos.

**[13:10] Paola:** ¿Con cuántos usuarios concurrentes?

**[13:15] Andrés:** Cinco mil concurrentes como objetivo.

**[15:00] Iván:** Fuera del tema: ¿tiempo de pantalla y reportes para padres entran?

**[15:10] Marcela:** No, quedan fuera de esta épica.

**[17:45] Rosa:** ¿Quién avisa a los proveedores de las plantillas?

**[17:55] Marcela:** Acuerdo: todos los proveedores entregan análisis y diseño con la plantilla AMCO. Mañana mando un correo de seguimiento.

**[20:00] Iván:** Una duda: ¿el avatar es obligatorio al crear el perfil?

**[20:10] Marcela:** Sí, nombre y avatar, y el avatar debe guardarse con el perfil.

**[38:00]** *(fin de la grabación)*
