import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCateogry from "./admin/UpdateCateogry";
import Cart from "./core/Cart";
<<<<<<< HEAD
=======
import OrderProducts from "./admin/Orders";
>>>>>>> main

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoutes
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoutes
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoutes
          path="/admin/create/product"
          exact
          component={AddProduct}
        />
<<<<<<< HEAD
=======
        <AdminRoutes
          path="/admin/orders"
          exact
          component={OrderProducts}
        />
>>>>>>> main
        <AdminRoutes path="/admin/products" exact component={ManageProducts} />
        <AdminRoutes
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoutes
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCateogry}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
