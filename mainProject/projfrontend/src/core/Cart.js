import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart, createCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";
import RazorPayCheckout from "./PaymentGateway/RazorPayCheckout";
import StripeCheckout from "./PaymentGateway/StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

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

  const GeekyCartMessage = () => {
    return (
      <div className="container">
        <h1 className="display-4 text-secondary">
          🚀 Welcome to the SellTech Universe Cart! 🛒
        </h1>
        <p className="lead text-secondary">
          It seems you've stumbled upon our secret gateway to a world of geeky
          wonders. Your cart may be empty for now, but fear not, intrepid
          explorer! You're just a few clicks away from filling it with the most
          extraordinary treasures from across the galaxy.
        </p>

        <ul className="list-group list-group-flush">
          <li className="list-group-item text-success">
            🌌 Explore the Cosmos: From star maps to telescopes, we've got
            everything for the aspiring astronomer.
          </li>
          <li className="list-group-item text-success">
            🎮 Level Up Your Game: Find rare collectibles, powerful gaming gear,
            and dice that roll critical hits every time.
          </li>
          <li className="list-group-item text-success">
            🧪 Embrace Your Inner Scientist: Discover gadgets, gizmos, and
            experiments that would make Einstein proud.
          </li>
          <li className="list-group-item text-success">
            📚 Dive into the Nerd Library: Immerse yourself in a realm of books,
            comics, and knowledge that's as vast as the multiverse itself.
          </li>
          <li className="list-group-item text-success">
            💡 Unleash Your Creativity: Art supplies, coding kits, and DIY
            projects await your genius touch.
          </li>
          <li className="list-group-item text-success">
            🎁 And More! The possibilities are as limitless as your imagination.
          </li>
        </ul>
        <p className="lead text-secondary">
          So, whether you're on a quest for the ultimate lightsaber or seeking
          the perfect potion ingredients for your next cosplay, your adventure
          begins here. Fill your cart with wonder, and let the geekiness flow
          through you!
        </p>
        <p className="lead text-danger">
          Here's a sneak peek at some of the amazing items you'll find in our
          store:
        </p>
        <h2 className="display-5 text-success">
          🎁 The Best Gifts for Geeks and Nerds 🎁
        </h2>
        <p className="lead text-secondary">
          Whether you're shopping for a friend, family member, or yourself, you
          can't go wrong with a gift from SellTech Universe. We've got something
          for everyone, from the casual fan to the die-hard devotee. Here are
          just a few of our most popular categories:
        </p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-success">
            🎮 Video Games: From retro classics to the latest releases, we've
            got the games you love.
          </li>
          <li className="list-group-item text-success">
            📺 Movies and TV: Find your favorite films and shows on DVD, Blu-ray
            and more.
          </li>
          <li className="list-group-item text-success">
            📚 Books: Discover new worlds and revisit old favorites with our
            vast selection of books.
          </li>
          <li className="list-group-item text-success">
            🎲 Tabletop Games: Roll the dice and let the adventure begin with
            our collection of board games, card games, and more.
          </li>
          <li className="list-group-item text-success">
            🎁 And More! The possibilities are as limitless as your imagination.
          </li>
        </ul>
        <h2 className=" text-secondary font-weight-bold">
          🌟 May the code be with you, brave shopper! 🌟
        </h2>
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);
  // const loadAllCheckOut = () => {
  //   return (
  //     <div className="">
  //       <h2>This section for CheckOut</h2>
  //     </div>
  //   );
  // };

  return (
    <Base title="" description="">
      {products === undefined || products.length === 0 ? (
        <div className="row text-center py-3 px-3">
          <div className="col-12 d-flex text-center justify-content-center">
            {GeekyCartMessage()}
          </div>
        </div>
      ) : (
        <div className="row text-center py-3 px-3">
          <div className="col-6 d-flex justify-content-center">
            {loadAllProducts()}
          </div>
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
      )}
    </Base>
  );
};

export default Cart;
