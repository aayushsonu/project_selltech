import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { cartEmpty, loadCart } from "../helper/cartHelper";
import { API } from "../../backend";
import { createOrder } from "../helper/orderHelper";

const RazorPayCheckout = ({
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

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = () => {
    const res = loadRazorpay();

    if (!res) {
      alert("SDK Failed");
      return;
    }

    const body = {
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const data = fetch(`${API}/razorpay`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS", status);
        cartEmpty(() => {
          console.log("You Ordered Successfully...");
        });
        setReload(!reload);
      })
      .catch((err) => console.log(err));

    var options = {
      key: "rzp_test_4Ivf3KH3HNKVsO",
      amount: getFinalPrice() * 73 * 100,
      currency: "INR",
      name: "donation",
      description: "Test Transaction",
      prefill: {
        name: isAuthenticated().user.name,
        email: isAuthenticated().user.email,
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
      // order_id: { order_id },
      // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
      // notes: {
      //   address: "I will fill this later",
      // },
    };

    try {
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };
  return isAuthenticated() ? (
    <div>
      <h3 className="text-white">RazorPay CheckOut ₹{getFinalPrice() * 73}</h3>
      <button
        className="rzp-button1 btn btn-info bg-gradient"
        onClick={displayRazorpay}
      >
        Pay with Razorpay
      </button>
    </div>
  ) : (
    <>
      <h3 className="text-white">RazorPay CheckOut ₹{getFinalPrice() * 73}</h3>
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    </>
  );
};

export default RazorPayCheckout;
