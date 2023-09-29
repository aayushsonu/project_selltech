import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // console.log(email, password);
    if (email && password) {
      signin({ email, password })
        .then((data) => {
          console.log(data.error);
          if (data && data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true,
              });
            });
          }
        })
        .catch((err) => {
          console.log("Signin Request failed");
        });
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row py-5">
        <div className="col-md-6 offset-sm-3 text-left">
          {loadingMessage()}
          <form action="">
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={handleChange("email")}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange("password")}
                required
              />
            </div>
            <div className="d-grid mt-3">
              <button className="btn btn-success" onClick={onSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign In" description="Log in with your credentials">
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
