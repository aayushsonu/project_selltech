import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getSingleCategory, updateCategory } from "./helper/adminapicall";

const UpdateCateogry = ({ match }) => {
  const [name, setName] = useState("");
  const [demoName, setDemoName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getSingleCategory(categoryId)
    .then(data => {
      if(data.error){
        setError(true)
      }else{
        setError(false)
        setName(data.name)
      }
    })
    .catch();
  };

  const goBack = () => {
    return (
      <div>
        <Link
          className="btn btn-sm btn-info bg-gradient mb-3"
          to="/admin/categories"
        >
          Back
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
    setDemoName(event.target.value); // i have to think about it again
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // Backend Request fired
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const successMsg = () => {
    if (success) {
      return (
        <h4 className="text-success">
          {demoName} Category updated successfully
        </h4>
      );
    }
  };
  const warningMsg = () => {
    if (error) {
      return <h4 className="text-success">Failed to update category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form action="">
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="Summer"
            onChange={handleChange}
            value={name}
          />
          <button onClick={onSubmit} className="btn btn-outline-info mb-3">
            Update category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update Category"
      description="Update the selected Category"
      className="container bg-info bg-gradient p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMsg()}
          {warningMsg()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCateogry;
