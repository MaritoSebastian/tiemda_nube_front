import { useCart } from "../../context/useCart";
import "./ProductsCard.css";


const ProductsCard = ({ producto }) => {
  const{addTocart}=useCart()
  return (<div className="product-card">
     

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
    <h3>{producto.title}</h3>
    <p>{producto.description}</p>
    <div className="stock-status">

  {producto.stock === 0 && (
    <span className="preventa">Preventa disponible</span>
  )}

  {producto.stock === 1 && (
    <span className="low">⚡ Última unidad</span>
  )}

  {producto.stock > 1 && (
    <span className="available">Disponible</span>
  )}

</div>

    

    <div className="price-container">
      <span className="price">${producto.price}</span>
    </div>
    

    <button className="btn-buy" onClick={()=>addTocart ({...producto,id:producto._id})}>
  {producto.stock === 0
    ? "Reservar"
    : producto.stock === 1
    ? "Comprar (última)"
    : "Comprar"}
</button>
  </div>
</div>
    
  );
};

export default ProductsCard;