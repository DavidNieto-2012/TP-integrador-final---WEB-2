# TP Integrador Final - E-Commerce Web

## Alumnos:
    * Nieto David
    * Garcia Schmidt Barbara
    * Santillan Rodrigo

### Proyecto integrador para la materia Web 2.

## Instrucciones de Instalación y Ejecución.

 Para clonar y correr este proyecto de manera local en tu máquina, seguí estos pasos:

1.  Clonar el repositorio:
   en la terminal
   git clone https://github.com/DavidNieto-2012/TP-integrador-final---WEB-2.git

2. Instalar dependencias
    npm install

3. Instalar React Router
    npm install react-router-dom

4. Correr proyecto
    npm run dev

El proyecto quedará corriendo en Vite, dirección local:   http://localhost:5173/


## Usuarios de prueba
| Usuario | Contraseña |
| --- | --- |
| cliente1 | cliente123 |
| admin | admin123 |

## Origen de los datos

La aplicación consume la API REST de la cátedra: `http://ecommerce.fedegonzalez.com`

| Recurso | Endpoint | Método | Uso en la aplicación | Estado |
| --- | --- | --- | --- | --- |
| Productos | `/products/` | GET | Listado general, filtros y home | Verificado |
| Producto | `/products/{id}` | GET | Pantalla de detalle | Verificado |
| Productos | `/products/` | POST | Alta de producto (admin) | (completar) |
| Producto | `/products/{id}` | PUT | Edición de producto (admin) | (completar) |
| Producto | `/products/{id}` | DELETE | Baja de producto (admin) | (completar) |
| Categorías | `/categories/` | GET | Listado y filtro por categoría | (completar) |
| Categorías | `/categories/` | POST | Alta de categoría (admin) | Verificado en Swagger |
| Categoría | `/categories/{category_id}` | GET | Nombre de la categoría seleccionada | Verificado en Swagger |
| Categoría | `/categories/{category_id}` | PUT y DELETE | Edición y baja (admin) | (completar) |
| Tags | `/tags/` y `/tags/{id}` | GET, POST, PUT, DELETE | CRUD de tags (admin) | (completar) |

### Datos que se guardan en el navegador (`localStorage`)

| Clave | Contenido | Por qué |
| --- | --- | --- |
| `carrito` | Productos y cantidades del carrito | Se conserva al recargar la página |
| `sesion` | Usuario simulado y su rol | Simulación de login; no es autenticación real |


## Casos de prueba

Marquen la columna **OK** con `[x]` cuando el resultado obtenido coincida con el esperado y anoten en «Obtenido» lo que pasó realmente, sobre todo si hubo diferencias.

| N° | Caso | Resultado esperado | Resultado obtenido | OK |
| --- | --- | --- | --- | --- |
| 1 | Visitante intenta entrar a `/admin` | Lo redirige a `/login` | | [] |
| 2 | Cliente intenta acceder a `/admin/productos` | Muestra la pantalla `/403` | | [ ] |
| 3 | Administrador crea, edita y borra un producto | Los cambios se ven en el panel y en el catálogo; el borrado pide confirmación | | [ ] |
| 4 | Se cambia la categoría y los tags de un producto | El producto aparece en la nueva categoría y en los filtros de sus tags | | [ ] |
| 5 | Se elimina una categoría con productos asociados | Se aplica la regla elegida (bloquear o reasignar) y no quedan productos sin categoría | | [ ] |
| 6 | Cliente agrega artículos y confirma la compra | Subtotales y total correctos; el checkout confirma sin cobro y vacía el carrito | | [ ] |
| 7 | Falla el fetch | Mensaje de error comprensible, sin pantalla en blanco | | [ ] |
| 8 | Recarga de la página | El carrito se conserva y los cambios del administrador siguen visibles porque vienen de la API | | [ ] |
| 9 | Cerrar sesión con productos en el carrito | El contador del carrito vuelve a 0 | | [ ] |
| 10 | Visitante intenta entrar a `/carrito` o `/checkout` | Lo redirige a `/login` | | [ ] |
| 11 | Ir a una dirección inexistente (por ejemplo `/lo-que-sea`) | Muestra la pantalla 404 | | [ ] |

hacer: Capturas o video corto y tabla de pruebas con resultado esperado y obtenido 
