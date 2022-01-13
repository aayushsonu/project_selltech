import React from "react";
<<<<<<< HEAD
import Base from "../core/Base";

const UserDashboard = () => {
  return (
    <Base title="UserDashboard page">
      <h3>This is UserDashboard page</h3>
      <h1 className="text-warning">This WebPage is Under Construction...</h1>
=======
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashboard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const userProfileData = () => {
    return (
      <div className="d-flex flex-column">
        <h1 className="myname text-uppercase">{name}</h1>

        <p className="align-self-end">{email}</p>
      </div>
    );
  };
  return (
    <Base
      title=""
      description=""
      className="container bg-primary bg-gradient p-5 mb-5"
    >
      <div className="d-flex">
        <div className="col-6">
          <img
            src="https://www.unoreads.com/user_profile_pic/demo-user.png"
            alt="profile pic"
          />
        </div>
        <div className="user-details col-6 d-flex flex-row-reverse">
          {userProfileData()}
        </div>
      </div>
>>>>>>> main
    </Base>
  );
};

export default UserDashboard;
