import { useEffect, useState } from "react";
import ProductsCard from "../../productscard/ProductsCard";
import Swal from "sweetalert2";
import { useDolar } from "../../../context/DolarContext";
import "./AdminDashboard.css";


const AdminProducts = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const getToken = () => localStorage.getItem("token");
 const {dolar}=useDolar()
  const handleDelete = async (id) => {
   

    try {
const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

      await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setProductos((prev) => prev.filter((prod) => prod._id !== id));
 Swal.fire({
      icon: "success",
      title: "Producto eliminado",
      timer: 1500,
      showConfirmButton: false,
    });

    } catch (error) {
      console.error("Error al eliminar producto:", error);
       Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar el producto",
    });

      
    }
  };
  const handleUpdate = async (id, updatedData) => {
    console.log("ID:", id);
    console.log("DATA:", updatedData);
    console.log("TOKEN:", getToken());

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedData),
      });
      console.log("STATUS:", res.status);

      const data = await res.json();

      setProductos((prev) =>
        prev.map((prod) => (prod._id === id ? data : prod)),
      );
      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al actualizar producto:", error);
 Swal.fire({
    icon: "error",
    title: "Error",
    text: "No se pudo actualizar el producto",
  });

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
    producto.title?.toLowerCase().includes(search.toLowerCase()),
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
          <ProductsCard
            key={producto._id}
            producto={producto}
            isAdmin={true}
            OnDelete={handleDelete}
            OnEditing={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
