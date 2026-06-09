import { useState, useEffect } from "react";
import { useCart } from "../../context/useCart";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { gettotalProducts } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand-container">
  <img
    src="/image/logo.png"
    alt="Paraguay Shop"
    className="brand-logo"
  />

  <span className="brand-text">
    PARAGUAY SHOP
  </span>
</div>
       

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`bar ${menuOpen ? "change" : ""}`}></div>
          <div className={`bar ${menuOpen ? "change" : ""}`}></div>
          <div className={`bar ${menuOpen ? "change" : ""}`}></div>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="user-name" onClick={closeMenu}>
            👤 {user?.name || user?.email}
          </li>

          <li>
            <Link to="/" onClick={closeMenu}>
              🏠Home
            </Link>
          </li>
          <li>
            <Link to="/Cart" onClick={closeMenu}>
              🛒 Carrito
              <span className="cart-count">{gettotalProducts()}</span>
            </Link>
          </li>

          {isAuthenticated() && user?.role === "admin" && (
            <li>
              <Link to="/admin" onClick={closeMenu}>
                ⚙️ Panel Admin
              </Link>
            </li>
          )}

          {!isAuthenticated() ? (
            <>
              <li>
                <Link to="/login" onClick={closeMenu}>
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={closeMenu}>
                  Registrarse
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="logout-item">
                <button onClick={handleLogout} className="logout-btn">
                  🚪 Cerrar Sesión
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
