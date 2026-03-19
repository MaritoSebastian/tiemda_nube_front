import { useCart } from "../../context/useCart";
import CartItem from "../CartItem/CartItem";
import CheckoutButton from "../CheckoutButton/CheckoutButton";
import "./Cart.css";

const Cart = () => {

  const { cart, clearCart, getTotalPrice } = useCart();

  return (
    <div className="cart-container">

      <h2 className="cart-title">Carrito</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">El carrito está vacío</p>
      ) : (
        <div className="cart-list">
          {cart.map((product) => (
            <CartItem
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-footer">

          <h3 className="cart-total">
            Total: ${getTotalPrice()}
          </h3>

          <button
            className="btn-clear"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>

            <CheckoutButton cart={cart} />

        </div>
      )}

    </div>
  );
};

export default Cart;