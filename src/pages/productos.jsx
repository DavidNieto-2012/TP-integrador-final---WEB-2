import React, { useEffect, useState } from "react";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      setLoading(true);
      setError(null);

      //const response = await productosService.getAllProducts(); 
      // Descomentar lo de arriba y borrar el fetch de abajo cuando se tenga el servicio de productos
      const response = await fetch(
        `http://ecommerce.fedegonzalez.com/products/`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer Grupo6",
          },
        },
      );

      //capturamos porsibles errores de la respuesta del servidor
      if(!response.ok){
        if(response.status === 401 || response.status === 403){
          setError("No tenés permiso para ver los productos.");
        } else if(response.status === 404){
          setError("No se encontró el listado de productos.");
        } else {
          setError("Ups!! tuvimos un problema. Intenta de nuevo más tarde.");
        }
      }

      const data = await response.json();
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 text-left">Todos nuestros productos</h1>
      
      {loading ? (
        <div>
          <p className="text-xl font-bold text-slate-300 mb-2">Cargando productos...</p>
          <p> Agregar luego el componente para el producto-skeleton</p>
        </div>
        
      ) : error ? (
          <p className="text-xl font-bold text-slate-300 mb-2">Error: {error}</p>
      ) : productos.length === 0 ? (
            <p className="text-slate-400 max-w-md">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Agregar luego el componente para el producto-card */}
          {productos.map((p) => (
            <div key={p.id} className="max-w-2xl mx-auto my-12 p-8 text-center bg-slate-800/40 border border-slate-700/50 rounded-3xl shadow-xl">
              <h3>{p.title}</h3>
              <p>{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;
