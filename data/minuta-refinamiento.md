# Minuta – Junta de refinamiento (ficticia)

**Tema:** Perfiles infantiles · **Asistentes:** Producto, Arquitectura, QA, Proveedor A, Proveedor B

- Producto confirma: máximo 5 perfiles por cuenta, incluidos los infantiles.
- Clasificación por defecto del perfil infantil: A. El titular puede subirla hasta B, nunca B15 o superior.
- Proveedor A propone bloquear el PIN tras 5 intentos; Producto había dicho 3. **No se cerró.**
- Arquitectura recuerda que el perfil infantil cuenta para el límite de pantallas simultáneas.
- QA pide definir qué pasa con rentas (TVOD) del titular en el perfil infantil. Producto lo revisará.
- Para eventos en vivo se espera un pico de x3 en 5 minutos; objetivo p95 < 300 ms en autorización de reproducción.
- Acuerdo: todos los proveedores entregan análisis y diseño con la plantilla AMCO.
