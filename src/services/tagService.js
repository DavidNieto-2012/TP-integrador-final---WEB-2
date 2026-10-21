
import { apiClient } from './apiClient';


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

  
};
