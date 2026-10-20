import { useEffect, useState } from "react";
import { productService } from "../services/index";
import { Link, useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { ProductSkeleton } from "../components/ProductSkeleton";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const categoria = searchParams.get("categoria");

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        if (categoria) {
          data = await productService.getProductsByCategory(categoria);
        } else {
          data = await productService.getAllProducts();
        }
        setProductos(data);
      } catch (err) {
        setError("Error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, [categoria]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-white mb-6">Catálogo de Productos</h1>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : Array.isArray(productos) && productos.length > 0 ? (
          productos.map((producto) => (
            <Link key={producto.id} to={`/producto/${producto.id}`}>
              <ProductCard product={producto} />
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-slate-400 py-10">
            No se encontraron productos en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
};

export default Productos;