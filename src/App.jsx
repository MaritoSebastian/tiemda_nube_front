import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home/Home";
import CreateProduct from "./components/CreateProducts/CreateProduct";
import ProductList from "./components/ProductList/ProductList";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/cart/Cart";
import { Route, Routes } from "react-router-dom";
import Checkout from "./components/Pages/Checkout/Checkout";
import Success from "./components/Pages/PaymentStatus/Success";
import Error from "./components/Pages/PaymentStatus/Error";
import Pending from "./components/Pages/PaymentStatus/Pending";
import { useLocation } from "react-router-dom";
function App() {
   const location=useLocation();
    const hideLayout=["/success","/error","/pending"].includes(location.pathname);
  return (
  
    <>
      <CartProvider>
        {!hideLayout &&<Navbar />}
         {!hideLayout &&<Banner />}
    
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>}  />
           {/* 🔥 RUTAS DE PAGO */}
         <Route path="/success" element={<Success />} />
         <Route path="/error" element={<Error />} />
       <Route path="/pending" element={<Pending />} />
        </Routes>

         {!hideLayout && <Footer />}
      </CartProvider>  
    </>
  );
}

export default App;
