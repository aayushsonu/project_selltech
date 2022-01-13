const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "nd8ddj5j7dr7zp59",
  publicKey: "xg9tzdk7r8gfqvhg",
  privateKey: process.env.BRAINTEESECRET,
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).json({
        err: "error occured",
      });
    } else {
      res.status(200).json({ response });
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json({
          err: "Error occured",
        });
      } else {
        res.json(result);
      }
    }
  );
};
