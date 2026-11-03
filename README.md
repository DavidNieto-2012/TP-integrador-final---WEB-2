# TP Integrador Final - E-Commerce Web

## Alumnos:
    * Nieto David
    * Garcia Schmidt Barbara
    * Santillan Rodrigo

### Proyecto integrador para la materia Web 2.

## Instrucciones de Instalación y Ejecución.

 Para clonar y correr este proyecto de manera local en tu máquina, seguí estos pasos:

1.  Clonar el repositorio:
   `git clone https://github.com/DavidNieto-2012/TP-integrador-final---WEB-2.git`

2. Instalar dependencias
    `npm install`

3. Instalar React Router
    `npm install react-router-dom`

4. Creá un archivo `.env.local` en la raíz con:
    `VITE_API_URL=http://ecommerce.fedegonzalez.com`
    `VITE_API_TOKEN=TU_CLAVE_TOKEN`

5. Correr proyecto
    `npm run dev` 

El proyecto quedará corriendo en Vite, dirección local:   `http://localhost:5173/`


## Usuarios de prueba
| Usuario | Contraseña |
| --- | --- |
| cliente@demo.com | 123 |
| admin@demo.com | 123 |


## Origen de los datos

Los productos, las categorías y los tags se consultan y administran mediante la API REST de la cátedra: `http://ecommerce.fedegonzalez.com`.

| Recurso | Endpoint | Método | Uso en la aplicación | Estado |
| --- | --- | --- | --- | --- |
| Productos | `/products/` | GET | Catálogo, filtros y productos de la página de inicio | Implementado |
| Producto | `/products/{id}` | GET | Detalle de un producto | Implementado |
| Productos | `/products/` | POST | Alta de producto (administración) | Implementado |
| Producto | `/products/{id}/` | PUT, DELETE | Edición y baja de producto (administración) | Implementado |
| Categorías | `/categories/` | GET | Listado y filtros por categoría | Implementado |
| Categorías | `/categories/` | POST | Alta de categoría (administración) | Implementado |
| Categoría | `/categories/{id}/` | PUT, DELETE | Edición y baja de categoría (administración) | Implementado |
| Tags | `/tags/` y `/tags/{id}/` | GET, POST, PUT, DELETE | Consulta y CRUD de tags (administración) | Implementado |


### Datos que se guardan en el navegador (`localStorage`)
El inicio de sesión es una simulación local con las cuentas de prueba; no se autentica contra la API. El carrito también se guarda localmente y la confirmación del pedido es simulada: no se registra una compra en el servidor ni se realiza un cobro. 

| Clave | Contenido | Por qué |
| --- | --- | --- |
| `carrito_<usuario>` | Productos y cantidades del carrito del usuario conectado | Se conserva al recargar la página y se separa por usuario |
| `sesion` | Usuario simulado y su rol | Mantiene el inicio de sesión local; no es autenticación real |


## Casos de prueba

Se marca la columna **OK** con `[x]` cuando el resultado obtenido coincide con el esperado y anotan en «Obtenido» lo que pasó realmente si hubo diferencias.

| N° | Caso | Resultado esperado | Resultado obtenido | OK |
| --- | --- | --- | --- | --- |
| 1 | Visitante intenta entrar a `/admin` | Lo redirige a `/login` | | [X] |
| 2 | Cliente intenta acceder a `/admin/productos` | Muestra la pantalla `/403` | Muestra página de `/forbiden` | [X] |
| 3 | Administrador crea, edita y borra un producto | Los cambios se ven en el panel y en el catálogo; el borrado pide confirmación | idem | [X] |
| 4 | Se cambia la categoría y los tags de un producto | El producto aparece en la nueva categoría y en los filtros de sus tags | idem | [X] |
| 5 | Se elimina una categoría con productos asociados | Se aplica la regla elegida (bloquear o reasignar) y no quedan productos sin categoría | | [ ] |
| 6 | Cliente agrega artículos y confirma la compra | Subtotales y total correctos; el checkout confirma sin cobro y vacía el carrito | | [X] |
| 7 | Falla el fetch | Mensaje de error comprensible, sin pantalla en blanco | | [X] |
| 8 | Recarga de la página | El carrito se conserva y los cambios del administrador siguen visibles porque vienen de la API | | [X] |
| 9 | Cerrar sesión con productos en el carrito | El contador del carrito vuelve a 0 | | [X] |
| 10 | Visitante intenta entrar a `/carrito` o `/checkout` | Lo redirige a `/login` | | [X] |
| 11 | Ir a una dirección inexistente (por ejemplo `/lo-que-sea`) | Muestra la pantalla 404 | | [X] |

hacer: Capturas o video corto y tabla de pruebas con resultado esperado y obtenido 
