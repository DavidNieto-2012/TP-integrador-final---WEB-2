import { categoryService, productService } from "../../services/index";
import { useEffect, useState } from "react";
const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // crear
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [errorForm, setErrorForm] = useState(null);
  const [enviando, setEnviando] = useState(false);
  // aviso de éxito o error en las acciones
  const [mensaje, setMensaje] = useState(null);
  const [errorAccion, setErrorAccion] = useState(null);
  // editar en línea
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");


  const obtenerCategorias = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await categoryService.getCategories();
      setCategorias(data);

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

  useEffect(() => {


    obtenerCategorias();
  }, []);

  // Crear categoría
  const handleCrear = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setErrorAccion(null);
    const nombre = nuevoNombre.trim();
    if (!nombre) {
      setErrorForm("El nombre de la categoría es obligatorio.");
      return;
    }
    setErrorForm(null);
    setEnviando(true);
    try {
      await categoryService.createCategory({ title: nombre, 

      description: nombre

      });
      setMensaje(`Categoría "${nombre}" creada correctamente.`);
      setNuevoNombre("");
      await obtenerCategorias(); 
    } catch (err) {
      setErrorForm(err.message || "Error al crear la categoría.");
    } finally {
      setEnviando(false);
    }
  };

  //  empezar edición
  const iniciarEdicion = (cat) => {
    setEditandoId(cat.id);
    setNombreEditado(cat.name);
    setErrorAccion(null);
    setMensaje(null);
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombreEditado("");
    setErrorAccion(null);
  };

  // Guardar edición
  const handleGuardar = async (cat) => {
    const nombre = nombreEditado.trim();
    if (!nombre) {
      setErrorAccion("El nombre no puede quedar vacío.");
      return;
    }
    if (nombre === cat.name) {
      cancelarEdicion(); 
      return;
    }

    setEnviando(true);
    setErrorAccion(null);
    try {
      await categoryService.updateCategory(cat.id, { 
        title: nombre,
        description: nombre  
      
      });
      setMensaje(`Categoría actualizada a "${nombre}".`);
      cancelarEdicion();
      await obtenerCategorias(); // Refresco inmediato
    } catch (err) {
      setErrorAccion(err.message || "Error al actualizar la categoría.");
    } finally {
      setEnviando(false);
    }
  };

  // Eliminar categoría con REGLA DE BLOQUEO y confirmación
  const handleEliminar = async (cat) => {
    setErrorAccion(null);
    setMensaje(null);
    setEnviando(true);

    try {
      // 1.
      //  Regla: consultar productos para ver si hay asociados a esta categoría
      const productos = await productService.getProducts();
      const asociados = productos.filter((prod) => {
        const catId = String(prod.category_id ?? prod.category?.id ?? prod.category ?? "");
        return catId === String(cat.id) || String(prod.category?.title ?? "").toLowerCase() === cat.name.toLowerCase();
      });

      //Si tiene productos, BLOQUEAR la eliminación
      if (asociados.length > 0) {
        setErrorAccion(
          `No se puede eliminar la categoría "${cat.name}" porque tiene ${asociados.length} producto(s) asociado(s). Reasigná o eliminá esos productos primero.`
        );
        return;
      }

      //Confirmación antes de borrar si no tiene productos
      if (!window.confirm(`¿Estás seguro de que querés eliminar la categoría "${cat.name}"?`)) {
        return;
      }

      // 4. Borrado y refresco
      await categoryService.deleteCategory(cat.id);
      setMensaje(`Categoría "${cat.name}" eliminada correctamente.`);
      await obtenerCategorias(); // Refresco inmediato
    } catch (err) {
      setErrorAccion(err.message || "Error al eliminar la categoría.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>

      {loading && <p>Cargando...</p>}
      {error && <p role="alert" className="text-red-600 mb-4">{error}</p>}
      {mensaje && <p role="status" className="mb-4 text-sm text-green-600 font-semibold">{mensaje}</p>}
      {errorAccion && <p role="alert" className="mb-4 text-sm text-red-600 font-semibold">{errorAccion}</p>}

      {/* Formulario de alta */}
      <form onSubmit={handleCrear} className="m-6 flex flex-wrap items-start gap-3">
        <div>
          <label htmlFor="nuevaCat" className="block text-sm font-semibold text-slate-700 mb-1">
            Nueva categoría
          </label>
          <input
            id="nuevaCat"
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            placeholder="Ej: Lácteos"
            className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
          />
          {errorForm && (
            <p role="alert" className="mt-1 text-sm text-red-600">{errorForm}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="mt-6 rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {enviando ? "Agregando..." : "Agregar"}
        </button>
      </form>

      {!loading && !error && categorias.length === 0 && (
        <p>No hay categorías disponibles.</p>
      )}

      {/* Tabla de categorías */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-300 text-sm text-slate-600">
            <th className="py-2 px-3">Id</th>
            <th className="py-2 px-3">Categoría</th>
            <th className="py-2 px-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => {
            const editando = editandoId === cat.id;
            return (
              <tr key={cat.id} className="border-b border-slate-100">
                <td className="py-2 px-3 text-slate-500 text-sm">{cat.id}</td>
                <td className="py-2 px-3">
                  {editando ? (
                    <input
                      type="text"
                      value={nombreEditado}
                      onChange={(e) => setNombreEditado(e.target.value)}
                      aria-label={`Nuevo nombre para ${cat.name}`}
                      className="border border-slate-300 rounded px-2 py-1 text-sm"
                    />
                  ) : (
                    cat.name
                  )}
                </td>
                <td className="py-2 px-3">
                  <div className="flex gap-2">
                    {editando ? (
                      <>
                        <button
                          type="button"
                          disabled={enviando}
                          onClick={() => handleGuardar(cat)}
                          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                        >
                          Guardar
                        </button>
                        <button
                          type="button"
                          disabled={enviando}
                          onClick={cancelarEdicion}
                          className="text-sm text-slate-500 hover:text-slate-700 disabled:opacity-50"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          disabled={enviando}
                          onClick={() => iniciarEdicion(cat)}
                          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          disabled={enviando}
                          onClick={() => handleEliminar(cat)}
                          className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategorias;