import { useCart } from "../../context/useCart";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { gettotalProducts } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">Paraguay Shop</h1>
        <ul className="nav-links">
          {/* Home - siempre visible */}
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* Cart - siempre visible */}
          <li className="cart-icon">
            <Link to="/Cart">
              🛒<span className="cart-count">{gettotalProducts()}</span>
            </Link>
          </li>

          {/* Links que SOLO ve el admin */}
          {isAuthenticated() && user?.role === "admin" && (
            <li>
              <Link to="/admin/CreateProduct" className="admin-link">
                ✏️ Crear Producto
              </Link>
            </li>
          )}

          {/* Separador visual (opcional) */}
          <li className="nav-separator">|</li>

          {/* Links según autenticación */}
          {!isAuthenticated() ? (
            <>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
            </>
          ) : (
            <>
              {/* Nombre del usuario logueado */}
              <li className="user-name">
                👤 {user?.name || user?.email}
              </li>
              {/* Botón de cerrar sesión */}
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;