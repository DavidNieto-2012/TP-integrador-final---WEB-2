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
        if (categoria) {
          const data = await productService.getProductsByCategory(categoria);
          setProductos(data);
          return;
        }

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
  }, [categoria]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 text-left">
        Todos nuestros productos
      </h1>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <p className="text-xl font-bold text-red-500 mb-2">Error: {error}</p>
      ) : productos.length === 0 ? (
        <p className="text-slate-400 max-w-md">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <Link key={producto.id} to={`/producto/${producto.id}`} className="no-underline">
              <ProductCard product={producto} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;