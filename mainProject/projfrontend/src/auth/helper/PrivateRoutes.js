import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helper";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoutes;
