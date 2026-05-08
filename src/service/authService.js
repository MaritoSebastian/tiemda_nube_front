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