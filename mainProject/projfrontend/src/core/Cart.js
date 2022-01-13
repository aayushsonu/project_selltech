import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
<<<<<<< HEAD
import { loadCart } from "./helper/cartHelper";
=======
import { loadCart, createCart } from "./helper/cartHelper";
>>>>>>> main
import PaymentB from "./PaymentB";
import RazorPayCheckout from "./PaymentGateway/RazorPayCheckout";
import StripeCheckout from "./PaymentGateway/StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div className="">
        <h1>
          <span className="badge btn-info bg-gradient">Cart</span>
        </h1>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  // const loadAllCheckOut = () => {
  //   return (
  //     <div className="">
  //       <h2>This section for CheckOut</h2>
  //     </div>
  //   );
  // };

  return (
    <Base title="Cart Page" description="Ready To CheckOut">
      <div className="row text-center">
<<<<<<< HEAD
        <div className="col-6">{loadAllProducts()}</div>
=======
        <div className="col-6 d-flex justify-content-center">
          {loadAllProducts()}
        </div>
>>>>>>> main
        <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
          <br />
          <br />
          <PaymentB products={products} setReload={setReload} />
          <br />
          <br />
          <RazorPayCheckout products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
