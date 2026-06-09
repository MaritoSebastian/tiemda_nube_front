import { useState, useRef } from "react";
import { useDolar } from "../../context/DolarContext";
import "./CreateProduct.css";

const CreateProduct = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { dolar: dolarGlobal } = useDolar(); // dólar actual del contexto

  const [priceType, setPriceType] = useState("ARS"); // "ARS" o "USD"
  const [formData, setFormData] = useState({
    title: "",
    price: "",          // para ARS
    price_usd: "",      // para USD
    shipping_cost_ars: "", // para USD
    stock: "",
    category: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validaciones comunes
    if (!formData.title || !formData.stock || !formData.category || !formData.description) {
      alert("Todos los campos obligatorios deben estar llenos");
      return;
    }
    if (!imageFile) {
      alert("Debes seleccionar una imagen");
      return;
    }

    // Validaciones según tipo de precio
    if (priceType === "ARS") {
      if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
        alert("Ingrese un precio en ARS válido");
        return;
      }
      if (!dolarGlobal) {
        alert("El valor del dólar no está disponible. Recargue la página.");
        return;
      }
    } else {
      if (!formData.price_usd || isNaN(formData.price_usd) || Number(formData.price_usd) <= 0) {
        alert("Ingrese un precio en USD válido");
        return;
      }
      if (formData.shipping_cost_ars && isNaN(formData.shipping_cost_ars)) {
        alert("El costo de envío debe ser un número");
        return;
      }
    }

    setLoading(true);

    try {
      let imageUrl = "";

      // Subir imagen
      if (imageFile) {
        const formDataImage = new FormData();
        formDataImage.append("image", imageFile);
        const uploadRes = await fetch(`${API_URL}/api/upload`, {
          method: "POST",
          body: formDataImage,
        });
        const uploadData = await uploadRes.json();
        if (!uploadData.ok) throw new Error("Error subiendo imagen");
        imageUrl = uploadData.imageUrl;
      }

      // Construir payload según el tipo de precio
      let payload = {
        title: formData.title,
        stock: Number(formData.stock),
        category: formData.category,
        description: formData.description,
        images: imageUrl ? [imageUrl] : [],
        createdAt: new Date(),
      };

      if (priceType === "ARS") {
        payload.price = Number(formData.price);
        payload.dolar_actual = dolarGlobal; // ← clave para que el backend guarde dolar_reference
      } else {
        payload.price_usd = Number(formData.price_usd);
        payload.shipping_cost_ars = Number(formData.shipping_cost_ars) || 0;
      }

      const productRes = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await productRes.json();

      if (result.ok) {
        alert("Producto creado correctamente");
        setFormData({
          title: "",
          price: "",
          price_usd: "",
          shipping_cost_ars: "",
          stock: "",
          category: "",
          description: "",
        });
        setImageFile(null);
        fileInputRef.current.value = "";
      } else {
        alert("Error al crear producto");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }

    setLoading(false);
  };

  return (
    <div className="admin-container">
      <h2>Crear Producto</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
        />

        {/* Selector de tipo de precio */}
        <div className="price-type-selector">
          <label>
            <input
              type="radio"
              value="ARS"
              checked={priceType === "ARS"}
              onChange={() => setPriceType("ARS")}
            />
            Precio fijo en ARS (se actualiza con el dólar)
          </label>
          <label>
            <input
              type="radio"
              value="USD"
              checked={priceType === "USD"}
              onChange={() => setPriceType("USD")}
            />
            Precio fijo en USD (siempre se muestra en ARS al dólar actual)
          </label>
        </div>

        {priceType === "ARS" ? (
          <input
            type="number"
            name="price"
            placeholder="Precio en ARS"
            value={formData.price}
            onChange={handleChange}
          />
        ) : (
          <>
            <input
              type="number"
              name="price_usd"
              placeholder="Precio en USD"
              value={formData.price_usd}
              onChange={handleChange}
            />
            <input
              type="number"
              name="shipping_cost_ars"
              placeholder="Costo de envío (ARS) - opcional"
              value={formData.shipping_cost_ars}
              onChange={handleChange}
            />
          </>
        )}

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Categoría ML"
          value={formData.category}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Producto"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;