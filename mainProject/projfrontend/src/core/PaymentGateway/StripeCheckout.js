import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { cartEmpty, loadCart } from "../helper/cartHelper";
import StripeCheckoutBtn from "react-stripe-checkout";
import { API } from "../../backend";
import { createOrder } from "../helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let price = 0;
    products.map((p) => {
      price = price + p.price;
    });
    return price;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS", status);
        cartEmpty(() => {
          console.log("all is well");
        });
        if (status === 200) {
          console.log("Payment Successfull");
        }
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      localStorage.getItem("cart").length > 2 ? (
        <StripeCheckoutBtn
          stripeKey="pk_test_51JFcdWSIEZi55WQJY5Y5ZjC76MlCBzBTfp3J6SvwgkBQFI7IGxGx2xX7qUIKbbDFYOQ4vRJZvoRHB2I54Eyb2mjE00EpGz3Z9D"
          token={makePayment}
          amount={getFinalPrice() * 100}
          name="Buy Geeky Products"
          shippingAddress
          billingAddress
        >
          <button className="btn btn-info bg-gradient">Pay with stripe</button>
        </StripeCheckoutBtn>
      ) : (
        <h5 className="text-info">Add Some Items to Cart...</h5>
      )
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-secondary">Stripe CheckOut $ {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
