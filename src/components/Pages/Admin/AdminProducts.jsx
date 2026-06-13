import { useEffect, useState } from "react";
import ProductsCard from "../../productscard/ProductsCard";
import "./AdminDashboard.css";

const AdminProducts = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const handleDelete = async (id) => {
  try {
    await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
    });

    setProductos((prev) =>
      prev.filter((prod) => prod._id !== id)
    );
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
};
const handleUpdate = async (id, updatedData) => {
  console.log("ID:", id);
  console.log("DATA:", updatedData);

  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
     
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
       console.log("STATUS:", res.status);

    const data = await res.json();

    setProductos((prev) =>
      prev.map((prod) =>
        prod._id === id ? data : prod
      )
    );
  } catch (error) {
    console.error("Error al actualizar producto:", error);
  }
};

  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");

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

  const productosFiltrados = productos.filter((producto) =>
    producto.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-products">

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔎 Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            className="clear-btn"
            onClick={() => setSearch("")}
            title="Limpiar búsqueda"
          >
            🧹
          </button>
        )}
      </div>

      {/* PRODUCTS */}
      <div className="products-container">
        {productosFiltrados.map((producto) => (
          <ProductsCard key={producto._id} producto={producto}isAdmin={true} OnDelete={handleDelete} OnEditing={handleUpdate} />
        ))}
      </div>

    </div>
  );
};

export default AdminProducts;