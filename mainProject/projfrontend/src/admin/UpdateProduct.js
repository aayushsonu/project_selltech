import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  //TODO:
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            loading: false,
            getRedirect: true,
            createdProduct: data.name,
            photo: "",
          });
        }
      }
    );
  };

  const successMsg = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} updated successfully</h4>
      </div>
    );
  };

  const performRedirect = () => {
    if (getRedirect) {
      return <Redirect to="/admin/dashboard" />;
    }
  };

  const warningMsg = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Product Creation Failed</h4>
      </div>
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const createProductForm = () => (
    <form className="my-3">
      <div className="form-group my-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group my-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group my-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-primary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-primary mt-3"
      >
        Update Product
      </button>
    </form>
  );
  return (
    <Base
      title="Add Produc Here!"
      description="Welcome to product creation sector"
      className="container bg-info bg-gradient p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMsg()}
          {warningMsg()}
          {performRedirect()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
