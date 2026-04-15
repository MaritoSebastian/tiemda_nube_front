import "./PaymentStatus.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Pending = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="status-container">
      <div className="status-card pending">
        <h1>⏳ Pago pendiente</h1>
        <p>Tu pago está siendo procesado</p>
        <p>Serás redirigido al inicio...</p>

        <Link to="/" className="status-btn">
          Volver ahora
        </Link>
      </div>
    </div>
  );
};

export default Pending;