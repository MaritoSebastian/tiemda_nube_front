import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../service/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    api("/api/auth/me", { method: "GET" }) 
      .then((res) => setUser(res.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setInitialLoading(false));
  } else {
    setInitialLoading(false);
  }
}, []);
  
  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error al registrarse",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error al iniciar sesión",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const isAuthenticated = () => {
  return user !== null && localStorage.getItem("token") !== null;
};

  return (
    <AuthContext.Provider
      value={{ user, loading, initialLoading, register, login, logout,isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
