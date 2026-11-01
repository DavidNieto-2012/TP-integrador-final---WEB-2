
import { apiClient } from './apiClient';

const traducirError = (error) => {
  if (error instanceof TypeError) {
    return "No se pudo conectar con el servidor. Revisá tu conexión.";
  }
  if (error.status === 401 || error.status === 403) {
    return "No tenés permiso para esta operación.";
  }
  if (error.status === 404) {
    return "No se encontró el tag. Puede que ya no exista.";
  }
  if (error.status === 422) {
    const msg = error.data?.detail?.[0]?.msg;
    return msg ? `Datos inválidos: ${msg}` : "Los datos enviados no son válidos.";
  }
  return "El servidor tuvo un problema. Intentá de nuevo más tarde.";
};

const normalizar = (texto) =>
  texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
const existeTitulo = async (title, excluirId = null) => {
  let data;
  try {
    data = await apiClient('/tags/');
  } catch (error) {
    throw new Error(traducirError(error));
  }
  const lista = Array.isArray(data) ? data : data?.results || [];
  const buscado = title.trim().toLowerCase();
  return lista.some(
    (t) =>
      String(t.id) !== String(excluirId) &&
      normalizar(t.title) === buscado
  );
};

export const tagService = {
  /**
   * Obtiene la lista normalizada de etiquetas (tags).
   * 1. Intenta consultar el endpoint /tags/ (si existe en la API).
   * 2. En caso de que falle devuelve una lista vacía.
   * 
   * @returns {Promise<Array<{id: string, title: string}>>} Lista normalizada de tags
   */
  async getTags() {
    try {
      const data = await apiClient('/tags/');
      const rawTags = Array.isArray(data) ? data : data?.results || [];
      return this.normalizeTags(rawTags);
    } catch (error) {
      console.error('[tagService] Error al obtener tags:', error.message);
      return [];
    }
  },

  /**
   * Normaliza un array arbitrario de tags a un formato consistente { id, title }.
   * 
   * @param {Array<string|object>} tags
   * @returns {Array<{id: string, title: string}>}
   */
  normalizeTags(tags) {
    if (!Array.isArray(tags)) return [];

    return tags
      .map((tag, index) => {
        if (!tag) return null;

        if (typeof tag === 'string') {
          const cleanTitle = tag.trim();
          return {
            id: cleanTitle.toLowerCase().replace(/\s+/g, '-'),
            title: cleanTitle,
          };
        }

        if (typeof tag === 'object') {
          const title = (tag.title || `Tag ${index + 1}`).trim();
          const id = String(tag.id ?? tag.slug ?? title.toLowerCase().replace(/\s+/g, '-'));
          return { id, title };
        }

        return null;
      })
      .filter(Boolean);
  },

  // Funciones para el CRUD
  
  async crearTag(title) {
    if (await existeTitulo(title)) {
      throw new Error("Ya existe un tag con ese nombre.");
    }
    try {
      return await apiClient('/tags/', {
        method: 'POST',
        body: JSON.stringify({ title: title.trim() }),
      });
    } catch (error) {
      throw new Error(traducirError(error));
    }
  },

  async actualizarTag(id, title) {
    if (await existeTitulo(title, id)) {
      throw new Error("Ya existe un tag con ese nombre.");
    }
    try {
      return await apiClient(`/tags/${id}/`, {
        method: 'PUT',
        body: JSON.stringify({ title: title.trim() }),
      });
    } catch (error) {
      throw new Error(traducirError(error));
    }
  },

  async eliminarTag(id) {
    try {
      return await apiClient(`/tags/${id}/`, {
        method: 'DELETE',
      });
    }
    catch (error) {
      throw new Error(traducirError(error));
    }
  },

};
