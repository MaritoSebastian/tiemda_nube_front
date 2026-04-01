import { useCart } from "../../../context/useCart"
import "./Checkout.css";

const Checkout = () => {
  const { cart, getTotalPrice } = useCart();
  const handleSubmit = async (e) => {
    const API_URL = import.meta.env.VITE_API_URL;
  e.preventDefault();

  console.log("Botón pagar funcionando");

  try {
    const res = await fetch(`${API_URL}/api/create-preference`  , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart.map(item => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity
        }))
      }),
    });

    const data = await res.json();

    console.log("Respuesta backend:", data);
    if (!data.init_point) {
  console.error("No vino init_point:", data);
  return;
}

    window.location.href = data.init_point;

  } catch (error) {
    console.error("Error en el pago:", error);
  }
};


 
  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Finalizar compra</h1>

      {/* 🛒 RESUMEN */}
      <div className="checkout-summary">
        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <img src={item.images?.[0]} alt={item.title} />

            <div>
              <p className="item-title">{item.title}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Subtotal: ${item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 💰 TOTAL */}
      <h2 className="checkout-total">
        Total: ${getTotalPrice()}
      </h2>

      {/* 🧾 FORMULARIO */}
      <form className="checkout-form"onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre completo" required />
        <input type="text" placeholder="Dirección" required />
        <input type="email" placeholder="Email" required />

        <button type="submit" className="checkout-pay">
          Pagar
        </button>
      </form>
    </div>
  );
};

export default Checkout;