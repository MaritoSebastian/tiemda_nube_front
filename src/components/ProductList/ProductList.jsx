import { useState, useEffect } from "react";
import ProductsCard from "../productscard/ProductsCard";
const ProductList = () => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch("https://mario-ml-aapi.vercel.app/api/products");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };
    obtenerProductos();
  }, []);
  return (
    <div className="products-container">
      {productos.map((producto) => (
        <ProductsCard key={producto._id} producto={producto} />
      ))}
    </div>
  );
};
export default ProductList;
