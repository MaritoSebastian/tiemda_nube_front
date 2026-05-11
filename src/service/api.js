const API_URL =import.meta.env.VITE_API_URL ; // o tu backend en Vercel

// Función genérica para peticiones fetch
const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }
   

  //const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.message|| `Error ${response.status}` );
  }

  return data;
};

export default api;