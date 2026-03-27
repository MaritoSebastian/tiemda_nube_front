import { useState, useEffect } from "react";
import ProductsCard from "../productscard/ProductsCard";
const ProductList = () => {
const API_URL = import.meta.env.VITE_API_URL;
console.log("ENV:", import.meta.env);
  const [productos, setProductos] = useState([]);
  useEffect(() => {
  
    const obtenerProductos = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();
        
        setProductos(data);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };
    obtenerProductos();
  }, [API_URL]);
  return (
    <div className="products-container">
      {productos.map((producto) => (
        <ProductsCard key={producto._id} producto={producto} />
      ))}
    </div>
  );
};
export default ProductList;
