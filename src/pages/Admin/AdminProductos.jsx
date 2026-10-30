import { productService } from "../../services/index";
import { useEffect, useState } from "react";
const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
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

    obtenerProductos();
  }, []);

  return (
    <div>
      <h1>Productos</h1>

      {loading && <p>Cargando...</p>}
      {error && <p role="alert">{error}</p>}

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
                {/* acá van los botones de editar y borrar */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default AdminProductos;