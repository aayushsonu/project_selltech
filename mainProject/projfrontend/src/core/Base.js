import React from "react";
import Menu from "./menu";

const Base = ({
  title = "My-Title",
  description = "My description",
<<<<<<< HEAD
  className = "bg-dark text-white p-4",
=======
  className = "bg-main text-white ps-4",
>>>>>>> main
  children,
}) => {
  return (
    <div>
<<<<<<< HEAD
        <Menu/>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
=======
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-main text-dark text-center">
>>>>>>> main
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
<<<<<<< HEAD
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-white text-dark text-center py-3">
=======
      <footer className="footer bg-main mt-auto py-3">
        <div className="container-fluid bg-main text-dark text-center py-3">
>>>>>>> main
          <h4>If you got any question , feel free to reach out!</h4>
          <button className="btn btn-dark btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
<<<<<<< HEAD
            An Amazing <span className="text-white">T-Shirt Store</span> 
=======
            An Amazing <span className="text-white">Tech Store</span>
>>>>>>> main
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
