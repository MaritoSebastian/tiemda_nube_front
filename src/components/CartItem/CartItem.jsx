import { useCart } from "../../context/useCart";
import "../productscard/ProductsCard.css";

const CartItem = ({ product }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const subtotal = product.price * product.quantity;

  return (
    <div className="product-card">
      <div className="product-img">
        <img src={product.images?.[0]} alt={product.title} />
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>

        <p>Precio: ${product.price}</p>
        <p><strong><p><strong>Subtotal: ${subtotal}</strong></p></strong>
</p>
        <div className="cart-actions">
          <div className="quantity-controls">
            <button onClick={() => decreaseQuantity(product.id)}>-</button>

            <span>{product.quantity}</span>

            <button onClick={() => increaseQuantity(product.id)}>+</button>
          </div>
          <p>Cantidad: {product.quantity}</p>

          <button
            className="btn-remove"
            onClick={() => removeFromCart(product.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
