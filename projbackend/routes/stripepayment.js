var express = require("express");
var router = express.Router();
const {makepayment} = require("../controllers/stripepayment");

router.post("/stripepayment", makepayment);

module.exports =  router;