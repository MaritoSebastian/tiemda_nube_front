import "./PaymentStatus.css";
import { Link } from "react-router-dom";

const Pending = () => {
  return (
    <div className="status-container">
      <div className="status-card pending">
        <h1>⏳ Pago pendiente</h1>
        <p>Estamos procesando tu pago</p>

        <Link to="/" className="status-btn">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
};

export default Pending;