import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productService, getImageUrl } from "../services/index";

const Producto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductById(id);
        setProducto(data);
      } catch (err) {
        setError("No se pudo cargar la información del producto.");
      } finally {
        setLoading(false);
      }
    };

    if (id) obtenerProducto();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-slate-300 font-bold">
        Cargando detalle del producto...
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500 font-bold mb-4">{error || "Producto no encontrado."}</p>
        <Link to="/productos" className="text-emerald-500 underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const { title, price, image, picture, category, description } = producto;
  const imgUrl = image || picture || (getImageUrl ? getImageUrl(producto) : null);
  const categoryName = typeof category === "object" ? category?.title || category?.name : category;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/productos" className="inline-block mb-6 text-sm text-slate-400 hover:text-white transition">
        ← Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800/60 p-6 md:p-8 rounded-3xl border border-slate-700/50 shadow-2xl">
        <div className="w-full h-80 bg-slate-700 rounded-2xl overflow-hidden flex items-center justify-center">
          {imgUrl ? (
            <img 
              src={imgUrl} 
              alt={title || "Producto"} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/600x400?text=Sin+Imagen";
              }} 
            />
          ) : (
            <span className="text-slate-400 font-medium">Sin imagen disponible</span>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            {categoryName && (
              <span className="inline-block text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-2">
                {categoryName}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              {title || "Producto sin nombre"}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {description || "Sin descripción disponible para este producto."}
            </p>
          </div>

          <div>
            <p className="text-3xl font-black text-emerald-400 mb-6">${price}</p>
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition shadow-lg">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Producto;
