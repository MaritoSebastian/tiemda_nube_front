import { createContext, useContext, useState, useEffect } from "react";

const DolarContext = createContext();

export const useDolar = () => useContext(DolarContext);

export const DolarProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [dolar, setDolar] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const [actualizadoManualmente, setActualizadoManualmente] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Cargar el dólar al iniciar
  const fetchDolar = async () => {
    try {
      const res = await fetch(`${API_URL}/api/dolar`);
      const data = await res.json();
      setDolar(data.dolar);
      setUltimaActualizacion(data.ultima_actualizacion);
      setActualizadoManualmente(data.actualizado_manualmente);
    } catch (error) {
      console.error("Error al obtener dólar:", error);
    }
  };

  // Actualizar manualmente (POST /api/dolar)
  const actualizarDolarManual = async (nuevoDolar) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/dolar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dolar: nuevoDolar }),
      });
      const data = await res.json();
      if (data.ok) {
        await fetchDolar(); // recargar el estado
        // Disparar refresco de productos (se usa en ProductList)
        setRefreshTrigger(prev => prev + 1);
        return { success: true, updatedCount: data.productsUpdated };
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar desde Binance (POST /api/dolar/auto)
  const actualizarDolarAuto = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/dolar/auto`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.ok) {
        await fetchDolar();
        setRefreshTrigger(prev => prev + 1);
        return { success: true, updatedCount: data.productsUpdated, mensaje: data.mensaje };
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDolar();
  }, []);

  return (
    <DolarContext.Provider
      value={{
        dolar,
        ultimaActualizacion,
        actualizadoManualmente,
        loading,
        refreshTrigger,
        actualizarDolarManual,
        actualizarDolarAuto,
      }}
    >
      {children}
    </DolarContext.Provider>
  );
};