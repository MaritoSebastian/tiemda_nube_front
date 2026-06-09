import { useState } from "react";
import { useDolar } from "../../context/DolarContext";
import "./DolarControl.css";

const DolarControl = () => {
  const { dolar, actualizarDolarManual, actualizarDolarAuto, loading } = useDolar();
  const [manualValue, setManualValue] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const handleManualUpdate = async () => {
    const valor = parseFloat(manualValue);
    if (isNaN(valor) || valor <= 0) {
      setMensaje({ tipo: "error", texto: "Ingrese un valor válido (>0)" });
      return;
    }
    const result = await actualizarDolarManual(valor);
    if (result.success) {
      setMensaje({ tipo: "ok", texto: `Dólar actualizado. ${result.updatedCount} productos actualizados.` });
      setManualValue("");
    } else {
      setMensaje({ tipo: "error", texto: result.error });
    }
    setTimeout(() => setMensaje(null), 4000);
  };

  const handleAutoUpdate = async () => {
    const result = await actualizarDolarAuto();
    if (result.success) {
      setMensaje({ tipo: "ok", texto: result.mensaje || `Actualizado desde Binance. ${result.updatedCount} productos actualizados.` });
    } else {
      setMensaje({ tipo: "error", texto: result.error });
    }
    setTimeout(() => setMensaje(null), 4000);
  };

  if (dolar === null) return <div className="dolar-control loading">Cargando...</div>;

  return (
    <div className="dolar-control">
      <div className="dolar-value">
        💵 ${dolar.toFixed(2)}
      </div>
      <div className="dolar-actions">
        <input
          type="number"
          step="10"
          placeholder="Nuevo valor"
          value={manualValue}
          onChange={(e) => setManualValue(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleManualUpdate} disabled={loading}>
          Actualizar
        </button>
        <button onClick={handleAutoUpdate} disabled={loading}>
          Binance
        </button>
      </div>
      {mensaje && (
        <div className={`dolar-mensaje ${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
};

export default DolarControl;