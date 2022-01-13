import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  // function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(product.count);

  const cardTitle = product
    ? product.name.slice(0, 30)
    : "A photo from UnSplash";
  const cardDescription = product
    ? product.description.slice(0, 80) + "..."
    : "Default Desc";
  const cardPrice = product ? product.price : "Default";

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const moveToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={() => {
            moveToCart();
          }}
          className="btn btn-block btn-outline-info mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div
      className="card text-white bg-light border border-info d-flex justify-content-between mb-4"
      style={{ width: "28em" }}
    >
      <div className="card-header lead text-dark ">{cardTitle}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <div className="rounded border border-success p-2">
          <ImageHelper product={product} />
        </div>
        <p className="lead bg-light text-dark bg-gradient font-weight-normal text-center">
          {cardDescription}
        </p>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center flex-column">
            <p className="btn btn-dark bg-gradient rounded mt-2 mb-2">
              Price: $ {cardPrice}
            </p>
          </div>
          <div className="d-flex align-items-stretch flex-column">
            {showAddToCart(addToCart)}
          </div>
          <div className="d-flex align-items-stretch flex-column">
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
