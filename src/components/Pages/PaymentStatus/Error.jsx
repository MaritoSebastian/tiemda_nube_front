import "./PaymentStatus.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="status-container">
      <div className="status-card error">
        <h1>❌ Error en el pago</h1>
        <p>Algo salió mal. Intentá nuevamente</p>

        <Link to="/checkout" className="status-btn">
          Volver a intentar
        </Link>
      </div>
    </div>
  );
};

export default Error;