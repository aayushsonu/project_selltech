import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currenTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "lightgreen" };
  } else {
    return { color: "#FFFFFF" };
  }
};

// const hoverTab = (history, path) => {
//   if (history.location.pathname === path) {
//       className="hover"
//   }
// };
const Menu = ({ history }) => {
  return (
    <div>
      <div>
        <ul className="nav nav-tabs bg-dark">
          <li className="nav-item">
            <Link
              style={currenTab(history, "/")}
              className="nav-link hover"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currenTab(history, "/cart")}
              className="nav-link"
              to="/cart"
            >
              Cart
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                style={currenTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                style={currenTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                Admin Dashboard
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currenTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currenTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  Signin
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <span
                className="nav-link text-warning"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Menu);
