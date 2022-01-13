var express = require("express");
var router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

const {
  createProduct,
  getProductById,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
<<<<<<< HEAD
} = require("../controllers/product");
=======
  getproductsByCategoryId,
} = require("../controllers/product");
const { getCategoryById } = require("../controllers/category");
>>>>>>> main

// ALL PARAMS
router.param("productId", getProductById);
router.param("userId", getUserById);
<<<<<<< HEAD
=======
router.param("categoryId", getCategoryById);
>>>>>>> main

// Create Route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// Read Route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// Update Route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// Delete Route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// Listing Route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

<<<<<<< HEAD
=======
router.get("/products/category/:categoryId", getproductsByCategoryId);

>>>>>>> main
module.exports = router;
