const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order Found in DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  req.body.order.products.map((prod) => {
    prodId = prod._id;
    prodName = prod.name;
    prodPrice = prod.price;
  });
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed To save order in DB",
      });
    }
    const pCart = new ProductCart({
      product: prodId,
      count: 1,
      name: prodName,
      price: prodPrice,
    });
    pCart.save((err, pCart) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({
      Status: order.status,
      products: order.products,
      AllPurchasesProducts: order.user.purchases
    });
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name ")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB",
        });
      }
      res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
    }
  );
};
