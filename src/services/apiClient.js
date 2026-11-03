export const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

function getHttpErrorMessage(status, serverMessage){
if(serverMessage && typeof serverMessage === 'string') {
return serverMessage
}

switch(status) {
  case 401:
    return 'No tenés permisos o tenes que iniciar sesión.';
  case 403: 
    return 'Permiso denegado no tenés permisos de admin';
  case 404: 
    return 'El elemento solicitado no existe o se borró';
  case 500:
    return'Error en el servidor. Intente más tarde';
  default:
    return `Error HTTP ${status}: solicitud no satisfactoria`;
  }

}

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
      let serverMessage = null;
      if (Array.isArray(data?.detail) && data.detail.length > 0) {
        serverMessage = data.detail
          .map((item) => {
            const field = Array.isArray(item.loc)
              ? item.loc.filter((p) => p !== 'body').join('.')
              : '';
            return field ? `Campo requerido "${field}": ${item.msg}` : item.msg;
          })
          .join(', ');
      } else if (typeof data?.detail === 'string') {
        serverMessage = data.detail;
      } else if (data?.message) {
        serverMessage = data.message;
      }

      console.error(`[apiClient] Error ${response.status} en "${url}":`, data);

      const errorMessage = getHttpErrorMessage(response.status, serverMessage);
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {

    if (error instanceof TypeError && !error.status) {

      const networkError = new Error ('No se pudo conectar con el servidor. Verifica tu conexión');
      throw networkError;
    }
     
      console.error(`[apiClient] Error de red en "${url}":`, error.message);
      throw error
 
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
