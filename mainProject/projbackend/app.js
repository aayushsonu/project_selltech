// All required frameworks
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");  --> deprected so i dont use it, i use express inbuilt express.json

// My required Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");
const braintreeRoutes = require("./routes/braintreepayment");
const razorpayRoutes = require("./routes/razorpay");

// MY DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.log("There is some PROBLEM!!",err));
// myfun.run().then.catch() --> way of doing this

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", razorpayRoutes);

// Port Setting
const port = process.env.PORT || 8000;

// Starting the server
app.listen(port, () => {
  console.log(`hello we are ready and port is ${port}`);
});
