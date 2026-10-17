export const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const errorMessage =
        data?.detail ||
        data?.message ||
        `Error HTTP ${response.status}: ${response.statusText || 'Solicitud no satisfactoria'}`;

      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`[apiClient] Falló la petición a "${url}":`, error.message);
    throw error;
  }
}

export function getImageUrl(path) {
  if (!path) {
    return 'https://placehold.co/300x300?text=Sin+Imagen';
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  try {
    return new URL(path, API_BASE_URL).href;
  } catch {
    return path;
  }
}
