import React, { useEffect, useState } from "react";

import Header from "../Components/Header/Header";
import Banner from "../Components/Banner/Banner";

import Posts from "../Components/Posts/Posts";
import Footer from "../Components/Footer/Footer";
import axios from "axios";

function Home() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetchData()
     function fetchData() {
    axios.get("product/products").then((response) => {
      setProduct(response.data.products);
    });
  }
  },[]);

  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts products={product} />
      <Footer />
    </div>
  );
}

export default Home;
