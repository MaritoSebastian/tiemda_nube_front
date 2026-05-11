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
        .then((res) => {
          console.log("✅ Usuario autenticado:", res.user);
          setUser(res.user);
        })
        .catch((error) => {
          console.error("❌ Error al validar token:", error);
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
      const { confirmPassword, ...cleanData } = userData;
      
      console.log("📤 Registrando usuario:", cleanData);
      
      // ✅ USAR api en lugar de fetch directo
      const data = await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(cleanData),
      });

      console.log("✅ Registro exitoso:", data);
      
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("❌ Error en register:", error);
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

      console.log("✅ Login exitoso:", data);
      
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("❌ Error en login:", error);
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
      value={{ user, loading, initialLoading, register, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
