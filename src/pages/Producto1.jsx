import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Producto1 = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [producto, setProducto] = useState(null);

  const id = searchParams.get("id");

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        if (id) {
          const data = await productService.getProductById(id);
          setProducto(data);
          return;
        }
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


    obtenerProducto();
  }, [searchParams]);

  return (
    <h1>Ficha de un producto {producto?.nombre}</h1>
  );
};

export default Producto1;