import DolarControl from "../../DolarControl/DolarControl";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <p>Gestiona tu tienda desde aquí</p>
      </div>

      <div className="dolar-card">
        <h2>💵 Cotización del Dólar</h2>
        <DolarControl />
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>📦 Productos</h2>
          <p>Crear nuevos productos para la tienda.</p>

          <Link
            to="/admin/CreateProduct"
            className="admin-btn"
          >
            Crear Producto
          </Link>
        </div>

        <div className="admin-card">
          <h2>🧮 Herramientas</h2>
          <p>Calcula precios según dólar y costos.</p>

          <Link
            to="/admin/calculator"
            className="admin-btn"
          >
            Calculadora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;