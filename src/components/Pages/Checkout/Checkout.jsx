import { useState } from "react";
import { useCart } from "../../../context/useCart";
import "./Checkout.css";
const Checkout = () => {
  const token = localStorage.getItem("token");
  const { cart, getTotalPrice } = useCart();

  const [whatsapp, setWhatsapp] = useState("");
  const [adress, setAdress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_LOCAL = import.meta.env.VITE_LO_API_URL;
    const API_URL=import.meta.env.VITE_API_URL
    // Limpiamos espacios antes de enviar
    const cleanName = name.trim();
    const cleanAdress = adress.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanWhatsapp = whatsapp.trim();

    // Validación adicional antes de enviar
    if (cleanName.length < 2 || cleanName.length > 60) {
      alert("El nombre debe tener entre 2 y 60 caracteres.");
      return;
    }

    if (cleanAdress.length < 3 || cleanAdress.length > 120) {
      alert("La dirección debe tener entre 3 y 120 caracteres.");
      return;
    }

    if (!/^\d{10,15}$/.test(cleanWhatsapp)) {
      alert("El WhatsApp debe contener entre 10 y 15 números.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      alert("Ingresá un email válido.");
      return;
    }

    console.log("Botón pagar funcionando");

    try {
      const res = await fetch(`${API_URL}/api/orders/create-preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            title: item.title,
            price: Number(item.price),
            quantity: Number(item.quantity),
          })),
          name: cleanName,
          adress: cleanAdress,
          whatsapp: cleanWhatsapp,
          email: cleanEmail,
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
      <h2 className="checkout-total">Total: ${getTotalPrice()}</h2>

      {/* 🧾 FORMULARIO */}
      <form className="checkout-form" onSubmit={handleSubmit}>
        {/* NOMBRE */}
        <input
          type="text"
          placeholder="Nombre completo"
          required
          minLength={2}
          maxLength={60}
          value={name}
          onChange={(e) => {
            const value = e.target.value;

            // Permite letras, espacios, acentos, apóstrofes y guiones
            if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ' -]*$/.test(value)) {
              setName(value);
            }
          }}
        />

        {/* DIRECCIÓN */}
        <input
          type="text"
          placeholder="Dirección"
          required
          minLength={3}
          maxLength={120}
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />

        {/* WHATSAPP */}
        <input
          type="tel"
          placeholder="WhatsApp"
          required
          minLength={10}
          maxLength={15}
          inputMode="numeric"
          value={whatsapp}
          onChange={(e) => {
            // Solo permite números
            const value = e.target.value.replace(/\D/g, "");

            if (value.length <= 15) {
              setWhatsapp(value);
            }
          }}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          required
          minLength={5}
          maxLength={100}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="checkout-pay">
          Pagar
        </button>
      </form>
    </div>
  );
};

export default Checkout;
