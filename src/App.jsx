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
import CreateProduct from "./components/CreateProducts/CreateProduct";
import "./App.css";
import PasswordResetPage from "./components/Pages/PasswordResetPage";
import { DolarProvider } from "./context/DolarContext";
import PriceCalculator from "./components/PriceCalculator/PriceCalculator";
import AdminDashboard from "./components/Pages/Admin/AdminDashboard";
import AdminProducts from "./components/Pages/Admin/AdminProducts";
// Componente para proteger rutas de PAGO (solo requiere login)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initialLoading } = useAuth();

  if (initialLoading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Componente para proteger rutas de ADMIN (requiere ser admin)
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, initialLoading } = useAuth();

  if (initialLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
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
        <DolarProvider>
          {!hideLayout && <Navbar />}
          {!hideLayout && <Banner />}

          <Routes>
            {/* RUTAS PÚBLICAS (no requieren login) */}
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<PasswordResetPage />} />

            {/* RUTAS PROTEGIDAS (requieren login para pagar) */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success/*"
              element={
                <ProtectedRoute>
                  <Success />
                </ProtectedRoute>
              }
            />
            <Route
              path="/error/*"
              element={
                <ProtectedRoute>
                  <Error />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pending/*"
              element={
                <ProtectedRoute>
                  <Pending />
                </ProtectedRoute>
              }
            />

            {/* RUTAS DE ADMIN (solo para administradores) */}
            <Route
              path="/admin/CreateProduct"
              element={
                <AdminRoute>
                  <CreateProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/calculator"
              element={
                <AdminRoute>
                  <PriceCalculator />
                </AdminRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
             <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
            
          </Routes>

          {!hideLayout && <Footer />}
        </DolarProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
