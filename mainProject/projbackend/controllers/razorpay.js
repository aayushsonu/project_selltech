const Razorpay = require("razorpay");
const { v4: uuidV4 } = require("uuid");

exports.makePayment = async (req, res) => {
  const instance = new Razorpay({
    key_id: "rzp_test_4Ivf3KH3HNKVsO",
    key_secret: process.env.RAZORPAYSECRET,
  });

  const { token, products } = req.body;
  // console.log("PRODUCTS", products);

  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });

  const options = {
    amount: (amount * 73 * 100).toString(),
    currency: "INR",
    receipt: uuidV4(),
  };
  try {
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).json({ err: "some error occured" });
    // console.log("123", order);
    res.status(200).json({ PaymentDone: "OK", order });
  } catch (error) {
    console.log("err", error);
  }
};
