import { apiClient } from './apiClient';
import { productService } from './productService';

export const categoryService = {
  async getCategories() {
    try {
      const data = await apiClient('/categories/');
      const rawCategories = Array.isArray(data) ? data : data?.results || [];
      if (rawCategories.length > 0) {
        return categoryService.normalizeCategories(rawCategories);
      }
      const products = await productService.getProducts();
      return categoryService.extractCategoriesFromProducts(products);
    } catch {
      const products = await productService.getProducts();
      return categoryService.extractCategoriesFromProducts(products);
    }
  },

  normalizeCategories(categories) {
    if (!Array.isArray(categories)) return [];

    return categories
      .map((cat, index) => {
        if (!cat) return null;

        if (typeof cat === 'string') {
          const cleanName = cat.trim();
          return {
            id: cleanName.toLowerCase().replace(/\s+/g, '-'),
            name: cleanName,
          };
        }

        if (typeof cat === 'object') {
          const name = (cat.name || cat.title || cat.nombre || `Categoría ${index + 1}`).trim();
          const id = String(cat.id ?? cat.slug ?? name.toLowerCase().replace(/\s+/g, '-'));
          return { id, name };
        }

        return null;
      })
      .filter(Boolean);
  },

  extractCategoriesFromProducts(products) {
    if (!Array.isArray(products)) return [];

    const categoriesMap = new Map();

    products.forEach((product) => {
      const rawCat = product.category || product.categoria;
      if (!rawCat) return;

      if (typeof rawCat === 'string') {
        const cleanName = rawCat.trim();
        const id = cleanName.toLowerCase().replace(/\s+/g, '-');
        if (!categoriesMap.has(id)) {
          categoriesMap.set(id, { id, name: cleanName });
        }
      } else if (typeof rawCat === 'object') {
        const name = (rawCat.name || rawCat.title || rawCat.nombre || '').trim();
        const id = String(rawCat.id ?? name.toLowerCase().replace(/\s+/g, '-'));
        if (name && !categoriesMap.has(id)) {
          categoriesMap.set(id, { id, name });
        }
      }
    });

    return Array.from(categoriesMap.values());
  },
};
