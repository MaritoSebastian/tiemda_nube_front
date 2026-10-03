import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetail.css";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
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
  }, [id]);

  if (loading) {
    return (
      <div className="order-page">
        <div className="order-message">
          <h2>Cargando tu compra...</h2>
          <p>Estamos preparando los detalles de tu pedido.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-page">
        <div className="order-message error">
          <h2>¡Ups!</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-page">
        <div className="order-message">
          <h2>No encontramos tu compra.</h2>
        </div>
      </div>
    );
  }

  const customerName = order.name || "cliente";

  return (
    <div className="order-page">
      <div className="order-container">
        {/* ENCABEZADO */}
        <div className="order-header">
          <div className="order-brand">
            <span>🇵🇾</span>
            <h1>Tienda Paraguay</h1>
          </div>

          <h2>¡Hola, {customerName}! 👋</h2>

          <p>
            Somos <strong>Tienda Paraguay</strong> y te damos la bienvenida.
          </p>

          <p>
            Gracias por confiar en nosotros. Tu compra fue realizada
            correctamente.
          </p>
        </div>

        {/* COMPRA EXITOSA */}
        <div className="success-box">
          <div className="success-icon">✓</div>

          <div>
            <h2>¡Compra realizada con éxito!</h2>

            <p>Recibimos correctamente tu pedido.</p>
          </div>
        </div>

        {/* DATOS DE LA COMPRA */}
        <section className="order-section">
          <h3>📋 Datos de la compra</h3>

          <div className="order-info-grid">
            <div className="info-item">
              <span>Número de orden</span>
              <strong>{order._id}</strong>
            </div>

            {order.createdAt && (
              <div className="info-item">
                <span>Fecha de compra</span>

                <strong>
                  {new Date(order.createdAt).toLocaleDateString("es-AR")}
                </strong>
              </div>
            )}

            {order.paymentId && (
              <div className="info-item">
                <span>Pago Mercado Pago</span>

                <strong>{order.paymentId}</strong>
              </div>
            )}
          </div>
        </section>

        {/* DATOS DEL CLIENTE */}
        <section className="order-section">
          <h3>👤 Datos del cliente</h3>

          <div className="order-info-grid">
            {order.name && (
              <div className="info-item">
                <span>Nombre</span>
                <strong>{order.name}</strong>
              </div>
            )}

            {order.email && (
              <div className="info-item">
                <span>Email</span>
                <strong>{order.email}</strong>
              </div>
            )}

            {order.adress && (
              <div className="info-item">
                <span>Dirección de entrega</span>
                <strong>{order.adress}</strong>
              </div>
            )}
          </div>
        </section>

        {/* PRODUCTOS */}
        <section className="order-section">
          <h3>🛍️ Productos de tu compra</h3>

          <div className="order-products">
            {order.items?.map((item, index) => {
              const subtotal = item.price * item.quantity;

              return (
                <div className="order-product" key={index}>
                  <div className="product-info">
                    <h4>{item.title}</h4>

                    <p>
                      Cantidad: <strong>{item.quantity}</strong>
                    </p>

                    <p>
                      Precio unitario:{" "}
                      <strong>
                        ${Number(item.price).toLocaleString("es-AR")}
                      </strong>
                    </p>
                  </div>

                  <div className="product-subtotal">
                    ${Number(subtotal).toLocaleString("es-AR")}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TOTAL */}
        <div className="order-total">
          <span>Total de la compra</span>

          <strong>${Number(order.total).toLocaleString("es-AR")}</strong>
        </div>

        {/* WHATSAPP */}
        <div className="whatsapp-section">
          <h3>📱 ¿Querés guardar tu comprobante?</h3>

          <p>Podés recibir este comprobante directamente por WhatsApp.</p>

          <button className="whatsapp-button">
            <span>☘</span>
            Enviar comprobante por WhatsApp
          </button>
        </div>

        {/* MENSAJE FINAL */}
        <div className="order-footer">
          <h3>¡Gracias por elegir Tienda Paraguay! 🇵🇾</h3>

          <p>
            Estamos preparando tu pedido y te mantendremos informado sobre las
            novedades de tu compra.
          </p>

          <p className="order-thanks">¡Esperamos volver a verte pronto!</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
