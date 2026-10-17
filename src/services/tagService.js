
import { apiClient } from './apiClient';
import { productService } from './productService';

export const tagService = {
  /**
   * Obtiene la lista normalizada de etiquetas (tags).
   * 1. Intenta consultar el endpoint /tags/ (si existe en la API).
   * 2. Si no existe o falla, las extrae y normaliza a partir de los productos disponibles.
   * 
   * @returns {Promise<Array<{id: string, title: string}>>} Lista normalizada de tags
   */
  async getTags() {
    try {
      const data = await apiClient('/tags/');
      const rawTags = Array.isArray(data) ? data : data?.results || [];
      if (rawTags.length > 0) {
        return this.normalizeTags(rawTags);
      }
    } catch {
      // Si el endpoint /tags/ no existe (404) o da error, usamos el fallback
    }

    const products = await productService.getProducts();
    return this.extractTagsFromProducts(products);
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
          const title = (tag.title || tag.name || tag.nombre || `Tag ${index + 1}`).trim();
          const id = String(tag.id ?? tag.slug ?? title.toLowerCase().replace(/\s+/g, '-'));
          return { id, title };
        }

        return null;
      })
      .filter(Boolean);
  },

  /**
   * 
   * 
   * @param {Array<object>} products
   * @returns {Array<{id: string, title: string}>}
   */
  extractTagsFromProducts(products) {
    if (!Array.isArray(products)) return [];

    const tagsMap = new Map();

    products.forEach((product) => {
      if (!product.tags || !Array.isArray(product.tags)) return;

      product.tags.forEach((tag) => {
        if (!tag) return;

        if (typeof tag === 'string') {
          const cleanTitle = tag.trim();
          const id = cleanTitle.toLowerCase().replace(/\s+/g, '-');
          if (!tagsMap.has(id)) {
            tagsMap.set(id, { id, title: cleanTitle });
          }
        } else if (typeof tag === 'object') {
          const title = (tag.title || tag.name || tag.nombre || '').trim();
          const id = String(tag.id ?? title.toLowerCase().replace(/\s+/g, '-'));
          if (title && !tagsMap.has(id)) {
            tagsMap.set(id, { id, title });
          }
        }
      });
    });

    return Array.from(tagsMap.values());
  },
};
