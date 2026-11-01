import { productService } from "../../services/index";
import { useEffect, useState } from "react";
const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [errorForm, setErrorForm] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [errorAccion, setErrorAccion] = useState(null);
  const [editando, setEditandoId] = useState(null);
  const [tituloEditado, setTituloEditado] = useState("");

  const obtenerProductos = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await productService.getProducts();
      setProductos(data);

    } catch (error) {
      if (error instanceof TypeError) {
        setError("No se pudo conectar con el servidor. Revisá tu conexión.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    setMensaje(null);

    const titulo = nuevoTitulo.trim();

    if (!titulo) {
      setErrorForm("El nombre del producto es obligatorio.");
      return;
    }

    setErrorForm(null);
    setEnviando(true);
    try {
      await productService.createProduct(titulo);
      setMensaje(`Producto "${titulo}" creado correctamente.`);
      setNuevoTitulo("");
      await obtenerProductos();
    } catch (err) {
      setErrorForm(err.message);
    } finally {
      setEnviando(false);
    }
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setTituloEditado(producto.title);
    setErrorAccion(null);
    setMensaje(null);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setTituloEditado("");
    setErrorAccion(null);
  };

  const handleGuardar = async (producto) => {
    const titulo = tituloEditado.trim();
    if (!titulo) {
      setErrorAccion("El nombre del producto no puede quedar vacío.");
      return;
    }
    if (titulo === producto.title) {
      cancelarEdicion(); // no cambió nada, no hace falta llamar a la API
      return;
    }

    setEnviando(true);
    setErrorAccion(null);
    try {
      await productService.actualizarProducto(producto.id, titulo);
      setMensaje(`Producto actualizado: "${titulo}".`);
      cancelarEdicion();
      await obtenerProductos();
    } catch (err) {
      setErrorAccion(err.message);
    } finally {
      setEnviando(false);
    }
  };

  const handleEliminar = async (producto) => {
    if (!window.confirm(`¿Eliminar el producto "${producto.title}"?`)) return;

    setEnviando(true);
    setErrorAccion(null);
    setMensaje(null);
    try {
      await productService.eliminarProducto(producto.id);
      setMensaje(`Producto "${producto.title}" eliminado.`);
      await obtenerProductos();
    } catch (err) {
      setErrorAccion(err.message);
    } finally {
      setEnviando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div>
      <h1>Productos</h1>

      {loading && <p>Cargando...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && productos.length === 0 && <p>No hay productos disponibles.</p>}

      <form onSubmit={handleCrear} className="m-6 flex flex-wrap items-start gap-3">
        <div>
          <label htmlFor="nuevoTitulo" className="block text-sm font-semibold text-slate-700 mb-1">Nuevo Producto</label>
          <input id="nuevoTitulo" type="text" value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            placeholder="Ej: Zapallo"
            className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
          />
          {errorForm && (
            <p role="alert" className="mt-1 text-sm text-red-600">{errorForm}</p>
          )}
        </div>

        <button type="submit" disabled={enviando} className="mt-6 rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {enviando ? "Agregando..." : "Agregar"}
        </button>
      </form>

      {errorAccion && <p role="alert" className="mb-4 text-sm text-red-600">{errorAccion}</p>}

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-300 text-sm text-slate-600">
            <th className="py-2 px-3">Título</th>
            <th className="py-2 px-3">Precio</th>
            <th className="py-2 px-3">Categoría</th>
            <th className="py-2 px-3">Tags</th>
            <th className="py-2 px-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-b border-slate-100">
              <td className="py-2 px-3">{producto.title}</td>
              <td className="py-2 px-3">${producto.price}</td>
              <td className="py-2 px-3">{producto.category?.title}</td>
              <td className="py-2 px-3">
                {producto.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="mr-2 text-xs bg-slate-100 rounded px-2 py-1"
                  >
                    {tag.title}
                  </span>
                ))}
              </td>
              <td className="py-2 px-3">
                <div className="flex gap-2">
                  {editando ? (
                    <>
                      <button type="button" disabled={enviando} onClick={() => handleGuardar(producto)}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50">
                        Guardar
                      </button>
                      <button type="button" disabled={enviando} onClick={cancelarEdicion}
                        className="text-sm text-slate-500 hover:text-slate-700 disabled:opacity-50">
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" disabled={enviando} onClick={() => iniciarEdicion(producto)}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50">
                        Editar
                      </button>
                      <button type="button" disabled={enviando} onClick={() => handleEliminar(producto)}
                        className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50">
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default AdminProductos;