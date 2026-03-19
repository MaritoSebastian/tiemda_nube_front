import "./CheckoutButton.css";
import { useNavigate } from "react-router-dom";
const CheckoutButton = ({ cart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    navigate("/checkout");
  };

  return (
    <button className="checkout-btn" onClick={handleCheckout}>
      Finalizar compra
    </button>
  );
};

export default CheckoutButton;
