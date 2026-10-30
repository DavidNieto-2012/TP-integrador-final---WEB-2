import { tagService } from "../../services/index";
import { useEffect, useState } from "react";
const AdminTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenertags = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await tagService.getTags();
        setTags(data);

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

    obtenertags();
  }, []);

  return (
    <div>
      <h1>Tags</h1>

      {loading && <p>Cargando...</p>}
      {error && <p role="alert">{error}</p>}

      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.title}
          </li>
        ))}
      </ul>
    </div>

  );
};

export default AdminTags;