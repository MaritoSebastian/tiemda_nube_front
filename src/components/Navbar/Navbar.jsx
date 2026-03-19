import { useCart } from "../../context/useCart";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { gettotalProducts } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">Paraguay Shop</h1>
<ul className="nav-links">
  <li className="cart-icon">
    <Link to="/Cart">🛒<span className="cart-count">{gettotalProducts()} </span> </Link>
  </li>

  <li>
    <Link to="/">Home</Link>
  </li>
</ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
