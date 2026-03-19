import { useCart } from "../../../context/useCart"
import "./Checkout.css";

const Checkout = () => {
  const { cart, getTotalPrice } = useCart();

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
      <form className="checkout-form">
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