// api/auth.js
import api from "./api";

export const registerUser = async (userData) => {
  return api('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (email, password) => {
  return api('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};
// 1. Solicitar código de recuperación
export const solicitarReset = async (email) => {
  return api('/api/auth/solicitar-reset', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

// 2. Verificar código
export const verificarCodigo = async (email, code) => {
  return api('/api/auth/verificar-codigo', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
};

// 3. Resetear contraseña
export const resetearPassword = async (email, code, newPassword) => {
  return api('/api/auth/resetear-password', {
    method: 'POST',
    body: JSON.stringify({ email, code, newPassword }),
  });
};