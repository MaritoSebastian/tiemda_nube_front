import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saveCart = localStorage.getItem("cart");
    return saveCart ? JSON.parse(saveCart) : [];
  });
  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
  //agregar el producto
  const addTocart = (product) => {
    const productExists = cart.find((item) => item.id === product.id);
    if (productExists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  // suma producto
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  //resta producto
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  //elimar producto
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  // Vaciar Carrito
  const clearCart = () => {
    setCart([]);localStorage.removeItem("cart");
  };
  // total de productos
  const gettotalProducts = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  //Total de la compra
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addTocart,
        removeFromCart,
        clearCart,
        gettotalProducts,
        getTotalPrice,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
