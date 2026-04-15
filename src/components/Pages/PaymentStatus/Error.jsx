import "./PaymentStatus.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="status-container">
      <div className="status-card error">
        <h1>❌ Error en el pago</h1>
        <p>Hubo un problema con tu compra</p>
        <p>Serás redirigido al inicio...</p>

        <Link to="/" className="status-btn">
          Volver ahora
        </Link>
      </div>
    </div>
  );
};

export default Error;