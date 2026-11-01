import { tagService } from "../../services/index";
import { useEffect, useState } from "react";
const AdminTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [errorForm, setErrorForm] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [errorAccion, setErrorAccion] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [tituloEditado, setTituloEditado] = useState("");

  const obtenerTags = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await tagService.getTags();
      setTags(data);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    setMensaje(null);

    const titulo = nuevoTitulo.trim();

    if (!titulo) {
      setErrorForm("El nombre del tag es obligatorio.");
      return;
    }

    setErrorForm(null);
    setEnviando(true);
    try {
      await tagService.crearTag(titulo);
      setMensaje(`Tag "${titulo}" creado correctamente.`);
      setNuevoTitulo("");
      await obtenerTags();
    } catch (err) {
      setErrorForm(err.message);
    } finally {
      setEnviando(false);
    }
  };

  const iniciarEdicion = (tag) => {
    setEditandoId(tag.id);
    setTituloEditado(tag.title);
    setErrorAccion(null);
    setMensaje(null);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setTituloEditado("");
    setErrorAccion(null);
  };

  const handleGuardar = async (tag) => {
    const titulo = tituloEditado.trim();
    if (!titulo) {
      setErrorAccion("El nombre del tag no puede quedar vacío.");
      return;
    }
    if (titulo === tag.title) {
      cancelarEdicion(); // no cambió nada, no hace falta llamar a la API
      return;
    }

    setEnviando(true);
    setErrorAccion(null);
    try {
      await tagService.actualizarTag(tag.id, titulo);
      setMensaje(`Tag actualizado: "${titulo}".`);
      cancelarEdicion();
      await obtenerTags();
    } catch (err) {
      setErrorAccion(err.message);
    } finally {
      setEnviando(false);
    }
  };

  const handleEliminar = async (tag) => {
    if (!window.confirm(`¿Eliminar el tag "${tag.title}"?`)) return;

    setEnviando(true);
    setErrorAccion(null);
    setMensaje(null);
    try {
      await tagService.eliminarTag(tag.id);
      setMensaje(`Tag "${tag.title}" eliminado.`);
      await obtenerTags();
    } catch (err) {
      setErrorAccion(err.message);
    } finally {
      setEnviando(false);
    }
  };

    useEffect(() => {
      obtenerTags();
    }, []);

    return (
      <div>
        <h1>Tags</h1>

        {loading && <p>Cargando...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && tags.length === 0 && <p>No hay tags disponibles.</p>}

        <form onSubmit={handleCrear} className="m-6 flex flex-wrap items-start gap-3">
          <div>
            <label htmlFor="nuevoTag" className="block text-sm font-semibold text-slate-700 mb-1">Nuevo tag</label>
            <input id="nuevoTag" type="text" value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
              placeholder="Ej: Oferta"
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
              <th className="py-2 px-3">Id</th>
              <th className="py-2 px-3">Tag</th>
              <th className="py-2 px-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => {
              const editando = editandoId === tag.id;
              return (
                <tr key={tag.id} className="border-b border-slate-100">
                  <td className="py-2 px-3">{tag.id}</td>
                  <td className="py-2 px-3">
                    {editando ? (
                      <input
                        type="text"
                        value={tituloEditado}
                        onChange={(e) => setTituloEditado(e.target.value)}
                        aria-label={`Nuevo nombre para ${tag.title}`}
                        className="border border-slate-300 rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      tag.title
                    )}
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex gap-2">
                      {editando ? (
                        <>
                          <button type="button" disabled={enviando} onClick={() => handleGuardar(tag)}
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
                          <button type="button" disabled={enviando} onClick={() => iniciarEdicion(tag)}
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50">
                            Editar
                          </button>
                          <button type="button" disabled={enviando} onClick={() => handleEliminar(tag)}
                            className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50">
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


export default AdminTags;