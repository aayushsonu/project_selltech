<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState, useEffect, useRef } from "react";
>>>>>>> main
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
<<<<<<< HEAD
import { getProducts } from "./helper/coreapicalls";
=======
import {
  getAllCategory,
  getProducts,
  getProductsByCategoryId,
} from "./helper/coreapicalls";
>>>>>>> main

const Home = () => {
  console.log("API is ", API);

  const [products, setProducts] = useState([]);
<<<<<<< HEAD
  // eslint-disable-next-line
  const [error, setError] = useState(false);  

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
=======
  const [categories, setCategories] = useState([]);
  const [productsByCate, setProductsByCate] = useState({});

  // eslint-disable-next-line
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      try {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
>>>>>>> main
      }
    });
  };

<<<<<<< HEAD
  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white">All Of TShirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
=======
  const loadAllCategories = () => {
    getAllCategory().then((data) => {
      try {
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data);
        }
      } catch (error) {
        console.log("categories error");
        console.log(error);
      }
    });
  };

  const loadAllProductsByCate = () => {
    // console.log(categories, "hello from loadAllProductsByCate");
    categories.forEach((category) => {
      getProductsByCategoryId(category._id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setProductsByCate((prevState) => ({
              ...prevState,
              [category._id]: data,
            }));
          }
        })
        .catch((err) => console.log(err));
    });
  };

  const productListing = () => {
    return (
      <div>
        {categories.map((category) => {
          return (
            <div className="row text-center" key={category._id}>
              <h1 className="text-dark text-start">{category.name}</h1>
              <div className="row text-center">
                {productsByCate[category._id] &&
                  productsByCate[category._id].map((product) => {
                    return (
                      <div
                        className="col-3 mb-4 d-flex justify-content-center"
                        key={category._id + product._id}
                      >
                        <Card product={product} key={category._id} />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
    console.log(categories);
  }, []);

  useEffect(() => {
    loadAllProductsByCate();
  }, [categories]);

  return (
    <Base title="" description="">
      <div className="row text-center">
        <h1 className="text-dark text-start">Products</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className="col-3 mb-4 d-flex justify-content-center"
              >
>>>>>>> main
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
<<<<<<< HEAD
=======
      {productListing()}
>>>>>>> main
    </Base>
  );
};

export default Home;
