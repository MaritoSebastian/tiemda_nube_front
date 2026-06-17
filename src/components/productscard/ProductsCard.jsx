import { useCart } from "../../context/useCart";
import { useDolar } from "../../context/DolarContext";
import { useState,useEffect } from "react";
import "./ProductsCard.css";
 const getPreciomostrado=(producto,dolar)=>{

if(producto.price_usd!=null)   return Math.round(producto.price_usd * dolar);
return producto.price;

  }

const ProductsCard = ({ producto, isAdmin = false, OnDelete, OnEditing }) => {
  const { addTocart } = useCart();
  const { dolar } = useDolar(); // ← obtener el dólar actual
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(producto);
 useEffect(() => {
  if (!isEditing && producto?._id) {
    setFormData(producto);
  }
}, [producto?._id, isEditing]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    
  setFormData(prev => ({
  ...prev,
  [name]: value
}));
  };
 
const PrecioMostrado=getPreciomostrado(producto,dolar)
  
if (PrecioMostrado === null) return null;
  return (
    <div className="product-card">
      <div className="product-img">
        {producto.category?.toLowerCase() === "nuevo" && (
          <span className="badge">Nuevo</span>
        )}
        <img
          src={producto.images?.[0] || "https://via.placeholder.com/200"}
          alt={producto.title}
        />
      </div>

      <div className="product-info">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        ) : (
          <h3>{producto.title}</h3>
        )}
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        ) : (
          <p>{producto.description}</p>
        )}
        <div className="stock-status">
          {isEditing ? (
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          ) : (
            <>
              {producto.stock === 0 && (
                <span className="preventa">Preventa disponible</span>
              )}
              {producto.stock === 1 && (
                <span className="low">⚡ Última unidad</span>
              )}
              {producto.stock > 1 && (
                <span className="available">Disponible</span>
              )}
            </>
          )}
        </div>

        <div className="price-container">
          {isEditing ? (
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          ) : (
           <span className="price">${Number(PrecioMostrado).toLocaleString()}</span>
          )}
        </div>
        {!isAdmin && (
          <button
            className="btn-buy"
            onClick={() =>
              addTocart({
                ...producto,
                id: producto._id,
                price: PrecioMostrado,
              })
            }
          >
            {producto.stock === 0
              ? "Reservar"
              : producto.stock === 1
                ? "Comprar (última)"
                : "Comprar"}
          </button>
        )}

        {isAdmin && (
          <div className="admin-actions">
            {isEditing ? (
              <>
                <button
                  className="btn-edit"
                  onClick={() => {
                    OnEditing(producto._id, {
                      title: formData.title,
                      description: formData.description,
                      category: formData.category,
                      images: formData.images,
                      stock: Number(formData.stock),
                      price: formData.price ? Number(formData.price) : null,
                    });

                    setIsEditing(false);
                  }}
                >
                  💾 Guardar
                </button>

                <button
                  className="btn-delete"
                  onClick={() => setIsEditing(false)}
                >
                  ❌ Cancelar
                </button>
              </>
            ) : (
              <>
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  ✏️ Editar
                </button>

                <button
                  className="btn-delete"
                  onClick={() => OnDelete(producto._id)}
                >
                  🗑️ Eliminar
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsCard;
