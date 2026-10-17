# Plan de trabajo – TP Integrador Final (Desarrollo Web 2)

Equipo: Barby, David y Rodri 

Marquen cada tarea con `[x]` cuando esté terminada, mergeada en `main` y anotada en el README.

Entrega: **lunes 02/11**. Las funciones se cierran el **sábado 31/10**. El martes 03/11 es solo reserva para corregir errores de último momento; no se programa nada nuevo.

Cada fase tiene al menos una tarea por persona y los temas rotan (datos y servicios, rutas, estado global con Context, formularios y CRUD, pruebas y documentación). Quien programa una parte no es quien la revisa ni quien la prueba.

## Reglas del equipo

- **Git:** `main` solo tiene código que funciona. Una rama por tarea (por ejemplo `feature/1-2-servicios`) y un Pull Request que revisa otra persona, nunca quien lo escribió.
- **Tarea terminada:** funciona, tiene estados de carga y error, está en `main`.
- **Nunca al repositorio:** `node_modules`, archivos `.env`, claves ni el token de la API.

## Calendario general

| Fase | Tema | Fechas |
| --- | --- | --- |
| 1 | Migrar a React y traer el catálogo | 13/10 al 16/10 |
| 2 | Navegación, filtros, detalle y home | 17/10 al 21/10 |
| 3 | Login, roles y rutas protegidas | 22/10 al 23/10 |
| 4 | Carrito y compra simulada | 24/10 al 26/10 |
| 5 | Panel de administración con CRUD | 27/10 al 31/10 |
| 6 | Pruebas, documentación y entrega | 01/11 al 02/11 |
| Reserva | Solo correcciones | 03/11 |

## Tareas por fase

### Fase 1 · Migrar a React y traer el catálogo (13 al 16/10)

- [X] **1.1** Crear el repo, Vite + React, estructura de carpetas del punto 11, `.gitignore` e invitar al equipo — **Barby** · Mié 14/10
- [ ] **1.2** Verificar con la cátedra qué endpoints reales existen (productos, categorías, tags), qué métodos admiten y cómo se autentican; servicios `apiClient`, `productService`, `categoryService` y `tagService` con fetch, async/await, try/catch y `response.ok`; normalizar categorías y tags — **David** · Vie 16/10
- [ ] **1.3** Migrar la maquetación del TP2 a componentes: Navbar, Footer y ProductCard con su CSS — **Rodri** · Jue 15/10
- [Completar 1.3] **1.4** Listado básico en `/productos` con estados de carga, error y vacío (une 1.2 y 1.3) — **Barby** · Vie 16/10
- [ ] **1.5** Esqueleto del README (npm install / npm run dev) y tabla de pruebas vacía — **Rodri** · Vie 16/10

### Fase 2 · Navegación, filtros, detalle y home (17 al 21/10)

- [ ] **2.1** Rutas `/`, `/productos`, `/productos/:id`, `/403` y comodín 404; Navbar con `Link` — **Barby** · Lun 19/10
- [ ] **2.2** Catálogo con filtros combinables (categoría y tag), búsqueda textual y orden por precio — **David** · Mar 20/10
- [ ] **2.3** Detalle `/productos/:id` con `useParams`: descripción, galería de imágenes, 404 si el ID no existe y botón de compra (aún sin lógica de login) — **Barby** · Mar 20/10
- [ ] **2.4** Home con categorías visibles, secciones por tag (Promoción, Orgánico), tarjetas y buscador que lleva al catálogo — **Rodri** · Mar 20/10
- [ ] **2.5** Revisión cruzada de los Pull Requests y demo interna de la Fase 2 — **Todos** · Mié 21/10

### Fase 3 · Login, roles y rutas protegidas (22 y 23/10)

- [ ] **3.1** `AuthContext`: sesión simulada, cuentas demo (cliente y administrador) y sesión guardada en localStorage — **Rodri** · Jue 22/10
- [ ] **3.2** Pantalla `/login` con formulario validado y redirección a la página que se quería visitar; `ProtectedRoute` y `AdminRoute` — **Barby** · Vie 23/10
- [ ] **3.3** Navbar y botones según el rol, y validación de rol en la capa de servicio antes de crear, editar o borrar — **David** · Vie 23/10

### Fase 4 · Carrito y compra simulada (24 al 26/10)

- [ ] **4.1** `CartContext`: agregar, quitar, cambiar cantidad y subtotal, con persistencia en localStorage — **David** · Dom 25/10
- [ ] **4.2** Pantalla `/carrito` con cantidades, subtotales y total; `/carrito` y `/checkout` exigen sesión — **Barby** · Lun 26/10
- [ ] **4.3** `/checkout` con confirmación sin cobro, y botón de compra condicionado a login en detalle y tarjetas — **Rodri** · Lun 26/10

### Fase 5 · Panel de administración con CRUD (27 al 31/10)

- [ ] **5.1** Capa de escritura contra la API: POST, PUT y DELETE con control de `response.ok` y de los códigos 401, 403 y 404, y refresco de datos después de cada cambio; si la API no tiene rutas de categorías o tags, definir con la cátedra cómo resolverlo y dejarlo documentado — **David** · Mié 28/10
- [ ] **5.2** Layout de `/admin` con menú a los tres módulos y rutas `/admin/productos`, `/admin/categorias` y `/admin/tags`; CRUD de tags — **Barby** · Vie 30/10
- [ ] **5.3** CRUD de categorías con regla para borrar una categoría con productos asociados (bloquear o reasignar; decidirlo y documentarlo) y confirmación antes de borrar — **David** · Vie 30/10
- [ ] **5.4** CRUD de productos: formulario con campos obligatorios, precio positivo, validación de imágenes e IDs, y cambio de categoría y tags — **Rodri** · Sáb 31/10
- [ ] **5.5** Revisión cruzada de los tres módulos y cierre de funciones (después de esta fecha no se agregan funciones nuevas) — **Todos** · Sáb 31/10

### Fase 6 · Pruebas, documentación y entrega (1 y 2/11)

Cada persona prueba lo que escribió otra.

- [ ] **6.1** Pruebas de roles y accesos: visitante a `/admin`, cliente a `/admin/productos`, login y redirecciones — **David** · Dom 1/11
- [ ] **6.2** Pruebas de CRUD: crear, editar y borrar un producto, cambiar categoría y tags, borrar una categoría con productos — **Barby** · Dom 1/11
- [ ] **6.3** Pruebas de carrito y compra, recarga de página y fallo del fetch (cortar la red o usar una URL de la API incorrecta) — **Rodri** · Dom 1/11
- [ ] **6.4** README final: instalación, cuentas demo y permisos, origen de datos — **Barby** · Lun 2/11
- [ ] **6.5** Documento del modelo de datos (referencias, edición y eliminación con dependencias) y declaración de que el token de la API no está en React ni en el repositorio y de que el control por rol de la interfaz no reemplaza la autorización del servidor — **David** · Lun 2/11
- [ ] **6.6** Capturas o video corto y tabla de pruebas con resultado esperado y obtenido — **Rodri** · Lun 2/11
- [ ] **6.7** Revisión final: clonar el repo en limpio, correr `npm install` y `npm run dev`, confirmar que no hay `node_modules` ni credenciales, y entregar — **Todos** · Lun 2/11

## Balance de carga y rotación de temas

Barby lleva 9 tareas, David 8 y Rodri 8, más 3 tareas compartidas (2.5, 5.5 y 6.7). Las tareas más pesadas son 1.2, 5.1 y 5.4. Si alguien se atrasa, las otras dos personas ayudan en pareja y no se redistribuyen las tareas sin avisar al equipo.

| Persona | Datos y servicios | Rutas y pantallas | Estado global (Context) | Formularios y CRUD | Pruebas, docs y repo |
| --- | --- | --- | --- | --- | --- |
| Barby | 1.4, 5.2 | 2.1, 2.3, 3.2 | 4.2 | 3.2, 5.2 | 1.1, 6.2, 6.4 |
| David | 1.2, 3.3, 5.1 | 2.2 | 4.1 | 5.3 | 6.1, 6.5 |
| Rodri | 2.4 | 1.3, 4.3 | 3.1 | 5.4 | 1.5, 6.3, 6.6 |

## Entregables

El 02/11 tienen que estar tildados todos los entregables del enunciado y ejecutados los ocho casos de prueba mínimos.

- [ ] Repositorio con el código fuente, sin `node_modules`, claves ni credenciales
- [ ] README con instalación (`npm install` y `npm run dev`)
- [ ] Explicación de cuentas demo y permisos
- [ ] Origen de datos: endpoints reales usados y métodos HTTP verificados
- [ ] Documentación de cómo se resuelven referencias, edición y eliminación con dependencias
- [ ] Capturas o video corto de las funciones principales
- [ ] Tabla de pruebas con resultado esperado y obtenido

## Casos de prueba

Marquen cada caso con `[x]` cuando el resultado obtenido coincida con el esperado y anoten abajo cualquier diferencia.

- [ ] **Visitante intenta entrar a `/admin`** — Esperado: lo redirige a `/login` — Prueba: David — Obtenido: …
- [ ] **Cliente intenta acceder a `/admin/productos`** — Esperado: muestra la pantalla `/403` — Prueba: David — Obtenido: …
- [ ] **Administrador crea, edita y borra un producto** — Esperado: los cambios se ven en el panel y en el catálogo; el borrado pide confirmación — Prueba: Barby — Obtenido: …
- [ ] **Se cambia la categoría y los tags de un producto** — Esperado: el producto aparece en la nueva categoría y en los filtros de sus tags — Prueba: Barby — Obtenido: …
- [ ] **Se elimina una categoría con productos asociados** — Esperado: se aplica la regla elegida (bloquear o reasignar) y no quedan productos sin categoría — Prueba: Barby — Obtenido: …
- [ ] **Cliente agrega artículos y confirma la compra** — Esperado: subtotales y total correctos; el checkout confirma sin cobro y vacía el carrito — Prueba: Rodri — Obtenido: …
- [ ] **Falla el fetch** — Esperado: mensaje de error comprensible, sin pantalla en blanco — Prueba: Rodri — Obtenido: …
- [ ] **Recarga de la página** — Esperado: el carrito se conserva y los cambios del administrador siguen visibles porque vienen de la API — Prueba: Rodri — Obtenido: …

## Riesgos y cómo evitarlos

Lo que más puede hacerlos perder tiempo es la Fase 5, porque todo el CRUD depende de la capa de escritura contra la API (5.1).

- **Atraso en 5.1:** Barby y Rodri empiezan sus formularios con datos de prueba y los conectan cuando 5.1 esté en `main`.
- **Conflictos en Git:** cada persona trabaja en sus propios archivos y nadie concentra lógica en `App.jsx`, como pide el punto 11 del enunciado.
- **Regla para borrar categorías:** decidan en la reunión del 27/10 si se bloquea o se reasignan los productos, antes de escribir 5.3 y 5.4.
- **Seguridad:** el token de la API nunca va en React, en variables `VITE_*` ni en el repositorio; el README debe aclarar que el control por rol de la interfaz no reemplaza la autorización del servidor.
- **Fechas de fin de semana:** el plan cuenta con trabajar algo los sábados y domingos; si no es así, hay que mover fechas hoy y no a mitad de camino.
- **API real:** hoy o mañana confirmen con la cátedra qué endpoints existen, qué métodos admiten y si hay rutas de categorías y tags; no asuman que el servidor valida permisos por rol sin comprobarlo.
