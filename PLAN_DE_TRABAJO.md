# Plan de trabajo – TP Integrador Final (Desarrollo Web 2)

Equipo: Barby, David y Rodri 

Marquen cada tarea con `[x]` cuando esté terminada, mergeada en `main` y anotada en el README.

Cada fase tiene al menos una tarea por persona y los temas rotan (datos y servicios, rutas, estado global con Context, formularios y CRUD, pruebas y documentación). 

## Reglas del equipo

- **Git:** `main` solo tiene código que funciona. Una rama por tarea (por ejemplo `feature/1-2-servicios`) y un Pull Request que revisa otra persona, nunca quien lo escribió.
- **Tarea terminada:** funciona, tiene estados de carga y error, está en `main`.
- **Nunca al repositorio:** `node_modules`, archivos `.env`, claves ni el token de la API.

## Tareas por fase

### Fase 1 · Migrar a React y traer el catálogo (13 al 16/10)

- [X] **1.1** Crear el repo, Vite + React, estructura de carpetas del punto 11, `.gitignore` e invitar al equipo — **Barby** · Mié 14/10
- [x] **1.2** Verificar con la cátedra qué endpoints reales existen (productos, categorías, tags), qué métodos admiten y cómo se autentican; servicios `apiClient`, `productService`, `categoryService` y `tagService` con fetch, async/await, try/catch y `response.ok`; normalizar categorías y tags — **David** · Vie 16/10
- [X] **1.3** Migrar la maquetación del TP2 a componentes: Navbar, Footer y ProductCard con su CSS — **Rodri** · Jue 15/10
- [Completar 1.3] **1.4** Listado básico en `/productos` con estados de carga, error y vacío (une 1.2 y 1.3) — **Barby** · Vie 16/10
- [X] **1.5** Esqueleto del README (npm install / npm run dev) y tabla de pruebas vacía — **Rodri** · Vie 16/10

### Fase 2 · Navegación, filtros, detalle y home (17 al 21/10)

- [x] **2.1** Rutas `/`, `/productos`, `/productos/:id`, `/403` y comodín 404; Navbar con `Link` — **Barby** · Lun 19/10
- [x] **2.2** Catálogo con filtros combinables (categoría y tag), búsqueda textual y orden por precio — **David** · Mar 20/10
- [X] **2.3** Detalle `/productos/:id` con `useParams`: descripción, galería de imágenes, 404 si el ID no existe y botón de compra (aún sin lógica de login) — **Barby** · Mar 20/10
- [X] **2.4** Home con categorías visibles, secciones por tag (Promoción, Orgánico), tarjetas y buscador que lleva al catálogo — **Rodri** · Mar 20/10
- [X] **2.5** Revisión cruzada de los Pull Requests y demo interna de la Fase 2 — **Todos** · Mié 21/10

### Fase 3 · Login, roles y rutas protegidas (22 y 23/10)

- [ ] **3.1** `AuthContext`: sesión simulada, cuentas demo (cliente y administrador) y sesión guardada en localStorage — **Rodri** · Jue 22/10
- [X] **3.2** Pantalla `/login` con formulario validado y redirección a la página que se quería visitar; `ProtectedRoute` y `AdminRoute` — **Barby** · Vie 23/10
- [X] **3.3** Navbar y botones según el rol, y validación de rol en la capa de servicio antes de crear, editar o borrar — **David** · Vie 23/10

### Fase 4 · Carrito y compra simulada (24 al 26/10)

- [x] **4.1** `CartContext`: agregar, quitar, cambiar cantidad y subtotal, con persistencia en localStorage — **David** · Dom 25/10
- [X] **4.2** Pantalla `/carrito` con cantidades, subtotales y total; `/carrito` y `/checkout` exigen sesión — **Barby** · Lun 26/10
- [ ] **4.3** `/checkout` con confirmación sin cobro, y botón de compra condicionado a login en detalle y tarjetas — **Rodri** · Lun 26/10

### Fase 5 · Panel de administración con CRUD (27 al 31/10)

- [ ] **5.1** Capa de escritura contra la API: POST, PUT y DELETE con control de `response.ok` y de los códigos 401, 403 y 404, y refresco de datos después de cada cambio; si la API no tiene rutas de categorías o tags, definir con la cátedra cómo resolverlo y dejarlo documentado — **David** · Mié 28/10
- [X] **5.2** Layout de `/admin` con menú a los tres módulos y rutas `/admin/productos`, `/admin/categorias` y `/admin/tags`; CRUD de tags — **Barby** · Vie 30/10
- [ ] **5.3** CRUD de categorías con regla para borrar una categoría con productos asociados (bloquear o reasignar; decidirlo y documentarlo) y confirmación antes de borrar — **David** · Vie 30/10
- [ ] **5.4** CRUD de productos: formulario con campos obligatorios, precio positivo, validación de imágenes e IDs, y cambio de categoría y tags — **Rodri** · Sáb 31/10


# CORRECCIONES
- agregar imagen al productorCard (rodri)
- boton panel admin cambiar color (david)
