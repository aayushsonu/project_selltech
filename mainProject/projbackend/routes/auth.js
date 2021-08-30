var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn, isAuthenticated } = require("../controllers/auth");

// a middleware function with no mount path. This code is executed for every request to the router
// router.use(function (req, res, next) {
//   console.log("Time:", Date.now());
//   next();
// });

// app.post('/user', body('email').custom(value => {
//     return User.findUserByEmail(value).then(user => {
//       if (user) {
//         return Promise.reject('E-mail already in use');
//       }
//     });

router.post(
  "/signup",
  [
    check("name", "name should be greater than 3").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be greater than 3").isLength({ min: 3 }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email required").isEmail(),
    check("password", "password required").isLength({ min: 1 }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, isAuthenticated ,(req, res) => {
  res.send("Protected Route");
  console.log(req.auth); // add more stuffs through request
});

module.exports = router;
