import { useEffect, useState } from "react";
import { categoryService, productService, tagService } from "../../services/index";

const formularioVacio = {
  title: "",
  description: "",
  price: "",
  category_id: "",
  tag_ids: [],
};

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tagsDisponibles, setTagsDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(formularioVacio);
  const [errores, setErrores] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errorAccion, setErrorAccion] = useState("");

  const obtenerProductos = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getProducts();
      setProductos(data);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    {/* vigente es una bandera que evita actualizar el estado si el componente se desmonta antes de que la promesa se resuelva. */}
    let vigente = true;

    const cargarProductos = async () => {
      try {
        const data = await productService.getProducts();
        if (vigente) setProductos(data);
      } catch (err) {
        if (vigente) {
          setError(err.message || "No se pudieron cargar los productos.");
        }
      } finally {
        if (vigente) setLoading(false);
      }
    };

    cargarProductos();
    return () => {
      vigente = false;
    };
  }, []);

  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const [categoriasData, tagsData] = await Promise.all([
          categoryService.getCategories(),
          tagService.getTags(),
        ]);
        setCategorias(categoriasData);
        setTagsDisponibles(tagsData);
      } catch (err) {
        setErrorAccion(err.message || "No se pudieron cargar categorías y tags.");
      }
    };

    cargarOpciones();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((actual) => ({ ...actual, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: "" }));
  };

  {/* toggle para agregar o quitar un tag del array de tag_ids */ }
    const toggleTag = (tagId) => {
    const id = String(tagId);
    setForm((actual) => ({
      ...actual,
      tag_ids: actual.tag_ids.some((actualId) => String(actualId) === id)
        ? actual.tag_ids.filter((actualId) => String(actualId) !== id)
        : [...actual.tag_ids, id],
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const precio = Number(form.price);

    if (!form.title.trim()) nuevosErrores.title = "El título es obligatorio.";
    if (!form.description.trim()) {
      nuevosErrores.description = "La descripción es obligatoria.";
    }
    if (form.price === "" || !Number.isFinite(precio) || precio <= 0) {
      nuevosErrores.price = "El precio debe ser un número mayor que 0.";
    }
    if (!form.category_id) {
      nuevosErrores.category_id = "Elegí una categoría.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const limpiarFormulario = () => {
    setForm(formularioVacio);
    setErrores({});
    setEditandoId(null);
  };

  {/* cargo el form con los datos del producto a editar */ }
  const iniciarEdicion = (producto) => {
    setForm({
      title: producto.title || "",
      description: producto.description || "",
      price: producto.price == null ? "" : String(producto.price),
      category_id: String(producto.category_id ?? producto.category?.id ?? ""),
      tag_ids: Array.isArray(producto.tags)
        ? producto.tags.map((tag) =>
            String(typeof tag === "object" ? tag.id : tag)
          )
        : [],
    });
    setErrores({});
    setEditandoId(producto.id);
    setMensaje("");
    setErrorAccion("");
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensaje("");
    setErrorAccion("");

    if (!validarFormulario()) return;

    const producto = {
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category_id: form.category_id,
      tag_ids: form.tag_ids,
    };

    setEnviando(true);
    try {
      if (editandoId === null) {
        await productService.createProduct(producto);
        setMensaje(`Producto "${producto.title}" creado correctamente.`);
      } else {
        await productService.updateProduct(editandoId, producto);
        setMensaje(`Producto "${producto.title}" actualizado correctamente.`);
      }

      limpiarFormulario();
      await obtenerProductos();
    } catch (err) {
      setErrorAccion(err.message || "No se pudo guardar el producto.");
    } finally {
      setEnviando(false);
    }
  };

  const handleEliminar = async (producto) => {
    if (!window.confirm(`¿Eliminar el producto "${producto.title}"?`)) return;

    setEnviando(true);
    setErrorAccion("");
    setMensaje("");
    try {
      await productService.deleteProduct(producto.id);
      setMensaje(`Producto "${producto.title}" eliminado.`);
      await obtenerProductos();
    } catch (err) {
      setErrorAccion(err.message || "No se pudo eliminar el producto.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 flex flex-col gap-4">
      <h1>Productos</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
          <h2 className="text-lg font-semibold"> Crea y edita los productos </h2>
          <form onSubmit={handleSubmit} className="mb-8 max-w-xl space-y-4 scroll-mt-20" id="formulario">
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-semibold"
            >
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
            {errores.title && (
              <p role="alert" className="text-sm text-red-600">
                {errores.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-semibold"
            >
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
            {errores.description && (
              <p role="alert" className="text-sm text-red-600">
                {errores.description}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-1 block text-sm font-semibold"
            >
              Precio
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
            {errores.price && (
              <p role="alert" className="text-sm text-red-600">
                {errores.price}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="mb-1 text-sm font-semibold">Categoría</legend>
            <div className="flex flex-wrap gap-4">
              {categorias.map((categoria) => (
                <label
                  key={categoria.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="radio"
                    name="category_id"
                    value={categoria.id}
                    checked={String(form.category_id) === String(categoria.id)}
                    onChange={handleChange}
                  />
                  {categoria.name}
                </label>
              ))}
            </div>
            {categorias.length === 0 && (
              <p className="text-sm text-slate-500">
                No hay categorías disponibles.
              </p>
            )}
            {errores.category_id && (
              <p role="alert" className="text-sm text-red-600">
                {errores.category_id}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className="mb-1 text-sm font-semibold">
              Tags (opcional)
            </legend>
            <div className="flex flex-wrap gap-4">
              {tagsDisponibles.map((tag) => (
                <label
                  key={tag.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={form.tag_ids.some(
                      (tagId) => String(tagId) === String(tag.id)
                    )}
                    onChange={() => toggleTag(tag.id)}
                  />
                  {tag.title}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={enviando}
              className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {enviando
                ? "Guardando..."
                : editandoId === null
                  ? "Crear producto"
                  : "Guardar cambios"}
            </button>
            {editandoId !== null && (
              <button
                type="button"
                disabled={enviando}
                onClick={limpiarFormulario}
                className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
        {mensaje && <p className="mb-4 text-sm text-green-700">{mensaje}</p>}
        {errorAccion && (
          <p role="alert" className="mb-4 text-sm text-red-600">
            {errorAccion}
          </p>
        )}
      </div>

      <div className="min-w-0 space-y-3">
        {loading && <p>Cargando...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && productos.length === 0 && (
          <p>No hay productos disponibles.</p>
        )}

        {!loading && !error && productos.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-300 text-sm text-slate-600">
                  <th className="px-3 py-2">Título</th>
                  <th className="px-3 py-2">Precio</th>
                  <th className="px-3 py-2">Categoría</th>
                  <th className="px-3 py-2">Tags</th>
                  <th className="px-3 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id} className="border-b border-slate-100">
                    <td className="px-3 py-2">{producto.title}</td>
                    <td className="px-3 py-2">${producto.price}</td>
                    <td className="px-3 py-2">
                      {typeof producto.category === "object"
                        ? producto.category?.title || producto.category?.name
                        : producto.category}
                    </td>
                    <td className="px-3 py-2">
                      {Array.isArray(producto.tags) &&
                        producto.tags.map((tag, index) => {
                          const tagTitle =
                            typeof tag === "object" ? tag.title : tag;
                          const tagId =
                            typeof tag === "object" ? tag.id : `${tag}-${index}`;
                          return (
                            <span
                              key={tagId}
                              className="mr-2 rounded bg-slate-100 px-2 py-1 text-xs"
                            >
                              {tagTitle}
                            </span>
                          );
                        })}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={enviando || loading}
                          onClick={() => iniciarEdicion(producto)}
                          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          disabled={enviando || loading}
                          onClick={() => handleEliminar(producto)}
                          className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default AdminProductos;
