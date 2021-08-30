var express = require("express");
var router = express.Router();
const { makePayment } = require("../controllers/razorpay");

router.post("/razorpay", makePayment);

module.exports = router;
