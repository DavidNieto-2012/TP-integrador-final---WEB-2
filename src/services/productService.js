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
      return await apiClient(`/products/${id}`);
    } catch (error) {
      console.error('[productService] Error al obtener producto:', error.message);
      return null;
    }
  },

  hasTag(product, tagName) {
    if (!product?.tags || !Array.isArray(product.tags)) {
      return false;
    }
    const target = String(tagName).trim().toLowerCase();
    return product.tags.some((tag) => {
      const name = typeof tag === 'object' ? tag.title : tag;
      return String(name).trim().toLowerCase() === target;
    });
  },

  async getProductsInPromotion() {
    const products = await productService.getProducts();
    return products.filter(
      (product) => productService.hasTag(product, 'Promoción')
    );
  },


  //ya no se llama ahore lo hace  productos.jsx filtra en memorio ver si borrarla o no
  async getProductsByCategory(category) {
    if (!category) return [];

    const allProducts = await productService.getProducts();
    return allProducts.filter(
      (p) => String(p.category_id) === String(category)
    );
  },

};

//funcion que chequea que sea admin
function validarAdmin() {
  const sesion = JSON.parse(localStorage.getItem("sesion") || "null");
  if (!sesion || sesion.rol !== "admin") {

    const error = new Error("Acceso denegado");
    error.status = 403;
    throw error;
  }
}
