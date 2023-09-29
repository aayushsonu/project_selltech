import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./PaymentGateway/BrainTreeCheckout";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getFinalPrice = () => {
    let price = 0;
    products.map((p) => {
      price = price + p.price;
    });
    return price;
  };

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((res) => {
      console.log("information", res);
      try {
        if (res.error) {
          setInfo({ ...info, error: res.error });
        } else {
          const clientToken = res.response.clientToken;
          // console.log("token",res.response.clientToken);
          setInfo({ clientToken: clientToken });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const showBrainTreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
              onError={(err) => console.log(err)}
            />
            <button className="btn btn-info bg-gradient" onClick={onPurchase}>
              Pay with BrainTree
            </button>
          </div>
        ) : isAuthenticated() ? (
          <h5 className="text-info">Add Some Items To Cart...</h5>
        ) : (
          <Link to="/signin">
            <button className="btn btn-warning">Signin</button>
          </Link>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getFinalPrice(),
        };
        processPayment(userId, token, paymentData)
          .then((res) => {
            setInfo({ ...info, loading: false, success: res.success });
            console.log("PAYMENT SUCCESS");

            // console.log(products, res.transaction.id, res.transaction.amount);

            const orderData = {
              products: products,
              transaction_id: res.transaction.id,
              amount: res.transaction.amount,
            };

            console.log(JSON.stringify(orderData));

            createOrder(userId, token, orderData);
            cartEmpty(() => {
              console.log("Did we got something??");
            });

            setReload(!reload);
          })
          .catch((err) => {
            console.log("PAYMENT FAILED");
            setInfo({ loading: false, success: false });
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3 className="text-secondary">BrainTree CheckOut $ {getFinalPrice()}</h3>
      {showBrainTreeDropIn()}
    </div>
  );
};

export default PaymentB;
