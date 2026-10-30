import { categoryService } from "../../services/index";
import { useEffect, useState } from "react";
const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
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

    obtenerCategorias();
  }, []);

  return (
    <div>
      <h1>Categorías</h1>

      {loading && <p>Cargando...</p>}
      {error && <p role="alert">{error}</p>}

      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            {categoria.name}
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default AdminCategorias;