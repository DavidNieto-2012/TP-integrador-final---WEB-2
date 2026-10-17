import { apiClient } from './apiClient';

export const productService = {
  async getProducts() {
    try {
      const data = await apiClient('/products/');
      return Array.isArray(data) ? data : data?.results || [];
    } catch (error) {
      console.error('[productService] Error al obtener productos:', error.message);
      return [];
    }
  },

  async getProductById(id) {
    if (!id) return null;

    try {
      const data = await apiClient(`/products/${id}`);
      if (data && (data.id || data.title || data.name)) {
        return data;
      }
      const allProducts = await productService.getProducts();
      return allProducts.find((p) => String(p.id) === String(id)) || null;
    } catch {
      const allProducts = await productService.getProducts();
      return allProducts.find((p) => String(p.id) === String(id)) || null;
    }
  },

  hasTag(product, tagName) {
    if (!product?.tags || !Array.isArray(product.tags)) {
      return false;
    }
    const target = String(tagName).trim().toLowerCase();
    return product.tags.some((tag) => {
      const name = typeof tag === 'object' ? tag.title || tag.name : tag;
      return String(name).trim().toLowerCase() === target;
    });
  },

  async getProductsInPromotion() {
    const products = await productService.getProducts();
    return products.filter(
      (product) => productService.hasTag(product, 'Promoción') || productService.hasTag(product, 'Promocion')
    );
  },
};
