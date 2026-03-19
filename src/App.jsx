import Navbar from "./components/navbar/Navbar";
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

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Banner />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="Cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>}  />
        </Routes>

        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
