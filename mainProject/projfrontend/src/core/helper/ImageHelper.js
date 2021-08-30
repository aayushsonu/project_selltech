import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80`;
  return (
    <div>
      <img
        src={imageURL}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
