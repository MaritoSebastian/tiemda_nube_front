import "./PaymentStatus.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

  console.log("=== RESPUESTA MERCADO PAGO ===");
  console.log("URL COMPLETA:", window.location.href);
  console.log("collection_id:", params.get("collection_id"));
  console.log("collection_status:", params.get("collection_status"));
  console.log("payment_id:", params.get("payment_id"));
  console.log("status:", params.get("status"));
  console.log("external_reference:", params.get("external_reference"));
  console.log("merchant_order_id:", params.get("merchant_order_id"));
  console.log("==============================");


    const timer = setTimeout(() => {
      
      navigate("/"); 
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="status-container">
      <div className="status-card success">
        <h1>✅ Pago exitoso</h1>
        <p>Tu compra fue realizada correctamente</p>
        <p>Serás redirigido al inicio...</p>

        <Link to="/" className="status-btn">
          Volver ahora
        </Link>
      </div>
    </div>
  );
};

export default Success;