import React, { useEffect, useState } from "react";

import "./View.css";
import axios from "axios";
function View({ id }) {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    (async function fetchData() {
      let { data } = await axios.post("/product/productInfo", { id });
      setProduct({ ...data.product, user: data.user });
    })();
  }, []);
  const baseImgUrl = "http://localhost:5000/uploads/";

  if (!product) {
    return null;
  }
  return (
    <>
      <div className="viewParentDiv">
        <div className="image">
          <img src={baseImgUrl + product.image.filename} alt="" />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9; {product.price} </p>
            <span>{product.name}</span>
            <p>{product.category}</p>
            <span>{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{product.user.name}</p>
            <p>{product.user.mobile}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default View;
