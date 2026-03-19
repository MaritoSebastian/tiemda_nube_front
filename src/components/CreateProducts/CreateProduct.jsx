import { useState,useRef } from "react";
import "./CreateProduct.css";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    category: "",
    description: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(loading) return;
    if (
  !formData.title ||
  !formData.price ||
  !formData.stock ||
  !formData.category ||
  !formData.description
) {
  alert("Todos los campos son obligatorios");
  return;
}

if (!imageFile) {
  alert("Debes seleccionar una imagen");
  return;
}

    
    setLoading(true);

    try {
      let imageUrl = "";


      // 1️⃣ Subir imagen si existe
      if (imageFile) {
        const formDataImage = new FormData();
        formDataImage.append("image", imageFile);

        const uploadRes = await fetch(
          "https://mario-ml-aapi.vercel.app/api/upload",
          {
            method: "POST",
            body: formDataImage
          }
        );

        const uploadData = await uploadRes.json();

        if (!uploadData.ok) {
          throw new Error("Error subiendo imagen");
        }

        imageUrl = uploadData.imageUrl;
      }

      // 2️⃣ Crear producto
      const productRes = await fetch(
        "https://mario-ml-aapi.vercel.app/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            price:Number(formData.price),
            stock: Number(formData.stock),
            images: imageUrl ? [imageUrl] : [],
            createdAt: new Date()

          })
        }
      );

      const result = await productRes.json();

      if (result.ok) {
        alert("Producto creado correctamente");

        setFormData({
          title: "",
          price: "",
          stock: "",
          category: "",
          description: ""
        });

        setImageFile(null);
        fileInputRef.current.value=""
        
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

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
        />

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

