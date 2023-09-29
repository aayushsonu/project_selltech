import React from "react";
import Menu from "./menu";

const Base = ({
  title = "",
  description = "",
  className = "bg-main text-white ps-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="col-10 container-fluid">
        <div className="jumbotron bg-main text-dark text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer mt-auto py-3 col-10 container-fluid">
        <div className="container-fluid bg-main text-dark text-center py-3">
          <h4>If you got any question , feel free to reach out!</h4>
          <button className="btn btn-dark btn-lg">Contact Us</button>
        </div>
        <div className="container mt-3">
          <span className="text-muted">
            An Amazing <span className="text-dark">Tech Store</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
