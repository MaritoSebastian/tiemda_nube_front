import "./PaymentStatus.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timer); // limpieza (pro)
  }, []);

  return (
    <div className="status-container">
      <div className="status-card success">
        <h1>✅ Pago exitoso</h1>
        <p>Tu compra se realizó correctamente</p>
        <p>Serás redirigido al inicio en unos segundos...</p>

        <Link to="/" className="status-btn">
          Volver ahora
        </Link>
      </div>
    </div>
  );
};

export default Success;