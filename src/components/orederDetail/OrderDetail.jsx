import { useEffect, useState } from "react";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/ID_DE_LA_ORDEN`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("No se pudo obtener la orden");
        }

        const data = await response.json();

        setOrder(data);
      } catch (error) {
        console.error("ERROR AL OBTENER ORDEN:", error);
        setError("No se pudo cargar el detalle de la compra");
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, []);

  if (loading) {
    return <p>Cargando detalle de la compra...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>No se encontró la orden.</p>;
  }

  return (
    <div>
      <h1>Detalle de la compra</h1>

      <p>Estado: {order.status}</p>

      {order.items?.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio: ${item.price}</p>
        </div>
      ))}

      <h2>Total: ${order.total}</h2>
    </div>
  );
};

export default OrderDetail;