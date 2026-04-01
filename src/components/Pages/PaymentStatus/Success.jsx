import "./PaymentStatus.css";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="status-container">
      <div className="status-card success">
        <h1>✅ Pago exitoso</h1>
        <p>Tu compra se realizó correctamente</p>

        <Link to="/" className="status-btn">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Success;