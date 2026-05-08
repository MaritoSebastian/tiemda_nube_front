
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home/Home";
import Cart from "./components/cart/Cart";
import Checkout from "./components/Pages/Checkout/Checkout";
import Success from "./components/Pages/PaymentStatus/Success";
import Error from "./components/Pages/PaymentStatus/Error";
import Pending from "./components/Pages/PaymentStatus/Pending";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import "./App.css";

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initialLoading } = useAuth();
  
  if (initialLoading) {
    return <div>Cargando...</div>;
  }
  
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const hiddenRoutes = ["/success", "/error", "/pending"];

  const hideLayout = hiddenRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <AuthProvider>
      <CartProvider>
        {!hideLayout && <Navbar />}
        {!hideLayout && <Banner />}

        <Routes>
          {/* RUTAS PÚBLICAS (no requieren login) */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* RUTAS PROTEGIDAS (requieren login) */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          
          <Route path="/success/*" element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          } />
          
          <Route path="/error/*" element={
            <ProtectedRoute>
              <Error />
            </ProtectedRoute>
          } />
          
          <Route path="/pending/*" element={
            <ProtectedRoute>
              <Pending />
            </ProtectedRoute>
          } />
        </Routes>

        {!hideLayout && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}

export default App;