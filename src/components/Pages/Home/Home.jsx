//import { useEffect, useState } from "react";
import ProductList from "../../ProductList/ProductList";
import ProductsCard from "../../productscard/ProductsCard";
import SearchBar from "../../SearchBar/SearchBar";
import "./Home.css";

const Home = () => {
  
  return (
    <>
      <SearchBar />
      <ProductList />
    </>
  );
};

export default Home;
