import { useState } from "react";
import { useDolar } from "../../context/DolarContext";
import "./PriceCalculator.css";

const PriceCalculator = () => {
  const { dolar: dolarGlobal } = useDolar();
  const [costoUsd, setCostoUsd] = useState("");
  const [dolarFrontera, setDolarFrontera] = useState("");
  const [envioArs, setEnvioArs] = useState("");
  const [margen, setMargen] = useState("");

  const [precioFinal, setPrecioFinal] = useState(null);
  const [detalle, setDetalle] = useState(null);

  const calcular = () => {
    // Validaciones
    const costo = parseFloat(costoUsd);
    const dFrontera = parseFloat(dolarFrontera);
    const envio = parseFloat(envioArs) || 0;
    const margenDecimal = parseFloat(margen) / 100;

    if (isNaN(costo) || costo <= 0) {
      alert("Ingrese un costo en USDT válido");
      return;
    }
    if (isNaN(dFrontera) || dFrontera <= 0) {
      alert("Ingrese un dólar frontera válido");
      return;
    }
    if (isNaN(margenDecimal) || margenDecimal < 0) {
      alert("Ingrese un porcentaje de ganancia válido (0 o más)");
      return;
    }
    if (!dolarGlobal) {
      alert("El dólar global no está disponible. Recargue la página.");
      return;
    }

    // Cálculos
    const costoProductoArs = costo * dolarGlobal;
    const comisionUsd = costo * 0.15; // 15% sobre el valor en USDT
    const comisionArs = comisionUsd * dFrontera;
    const costosTotales = costoProductoArs + comisionArs + envio;
    const precioVenta = costosTotales * (1 + margenDecimal);
    const precioRedondeado = Math.ceil(precioVenta); // redondeo hacia arriba

    setPrecioFinal(precioRedondeado);
    setDetalle({
      costoProductoArs: costoProductoArs.toFixed(2),
      comisionArs: comisionArs.toFixed(2),
      envioArs: envio.toFixed(2),
      subtotal: costosTotales.toFixed(2),
      ganancia: (precioVenta - costosTotales).toFixed(2),
    });
  };

  const limpiar = () => {
    setCostoUsd("");
    setDolarFrontera("");
    setEnvioArs("");
    setMargen("");
    setPrecioFinal(null);
    setDetalle(null);
  };

  return (
    <div className="calculator-container">
      <h2>Calculadora de Precio de Venta</h2>
      <p>
        Dólar global actual: <strong>${dolarGlobal ? dolarGlobal.toFixed(2) : "Cargando..."}</strong> ARS
      </p>

      <div className="calculator-form">
        <div className="input-group">
          <label>Costo del producto (USDT):</label>
          <input
            type="number"
            step="any"
            value={costoUsd}
            onChange={(e) => setCostoUsd(e.target.value)}
            placeholder="Ej: 50"
          />
        </div>

        <div className="input-group">
          <label>Dólar frontera (ARS por USD):</label>
          <input
            type="number"
            step="any"
            value={dolarFrontera}
            onChange={(e) => setDolarFrontera(e.target.value)}
            placeholder="Ej: 1500"
          />
        </div>

        <div className="input-group">
          <label>Costo de envío (ARS):</label>
          <input
            type="number"
            step="any"
            value={envioArs}
            onChange={(e) => setEnvioArs(e.target.value)}
            placeholder="Ej: 5000"
          />
        </div>

        <div className="input-group">
          <label>Porcentaje de ganancia (%):</label>
          <input
            type="number"
            step="1"
            value={margen}
            onChange={(e) => setMargen(e.target.value)}
            placeholder="Ej: 30"
          />
        </div>

        <div className="button-group">
          <button onClick={calcular}>Calcular</button>
          <button onClick={limpiar}>Limpiar</button>
        </div>
      </div>

      {precioFinal !== null && detalle && (
        <div className="result">
          <h3>Precio de venta sugerido (ARS)</h3>
          <p className="price-ars">${precioFinal.toLocaleString()}</p>
          <div className="breakdown">
            <p>📦 Costo producto (USDT → ARS): ${parseFloat(detalle.costoProductoArs).toLocaleString()}</p>
            <p>💸 Comisión 15% (con dólar frontera): ${parseFloat(detalle.comisionArs).toLocaleString()}</p>
            <p>🚚 Envío: ${parseFloat(detalle.envioArs).toLocaleString()}</p>
            <hr />
            <p><strong>Subtotal (costo + comisión + envío): ${parseFloat(detalle.subtotal).toLocaleString()}</strong></p>
            <p>📈 Ganancia ({margen}%): ${parseFloat(detalle.ganancia).toLocaleString()}</p>
            <hr />
            <p><strong>Precio final: ${precioFinal.toLocaleString()}</strong></p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(precioFinal.toString())}
            className="copy-btn"
          >
            Copiar precio ARS
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;