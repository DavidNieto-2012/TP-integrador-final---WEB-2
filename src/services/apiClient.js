export const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

function getHttpErrorMessage(status, serverMessage) {
  if (typeof serverMessage === "string" && serverMessage.trim()) {
    return serverMessage;
  }

  switch (status) {
    case 401:
      return "No tenés permisos o tenés que iniciar sesión.";
    case 403:
      return "No tenés permisos para realizar esta acción.";
    case 404:
      return "No encontramos el recurso solicitado.";
    default:
      return status >= 500
        ? "Error en el servidor. Intentá nuevamente más tarde."
        : `No pudimos completar la solicitud (error ${status}).`;
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
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        if (response.ok) {
          throw new Error("El servidor devolvió una respuesta que no pudimos interpretar.");
        }
      }
    }

    if (!response.ok) {
      const serverMessage =
        data?.detail?.[0]?.msg ||
        (typeof data?.detail === "string" ? data.detail : null) ||
        data?.message ||
        null;
      const error = new Error(getHttpErrorMessage(response.status, serverMessage));
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && !error.status) {
      throw new Error(
        "No pudimos acceder al servidor. Revisá tu conexión e intentá nuevamente.",
        { cause: error }
      );
    }

    console.error(`[apiClient] Error en "${url}":`, error.message);
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
