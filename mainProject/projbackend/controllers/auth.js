const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// exports.signup = (req, res) => {
// console.log("REQ BODY", req.body);
// res.json({
//   message: "User Signup",
// });
// };

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  // console.log("User signedIn");
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER doesn't exist",
      });
    }

    try {
      if (!user.authenticate(password)) {
        try {
          return res.json({ error: "Email and Password are incorrect" });
        } catch (error) {
          return res.json({ error: "there may be some error happened" });
        }
      }
    } catch (error) {
      return res.json({ error: "there may be some error happened" });
    }

    // Create Token
    var token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // Put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // Send response to frontEnd
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User SignedOut",
  });
};

// Protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ['HS256']
});

// Custom Routes
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied (authenticate problem)",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Access Denied!! (not admin)",
    });
  }
  next();
};
