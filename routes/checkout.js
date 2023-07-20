//checkout.js continued
const express = require("express");
const router = express.Router();
const braintree = require("braintree");
const dotenv = require('dotenv').config();
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY,
});
router.get("/", (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    (err) ? console.log(err) : res.send(response.clientToken);
  });
});
router.post("/", (req, res, next) => {
  const nonce = req.body.paymentMethodNonce;
  const setAmount = req.body.amount;
  gateway.transaction.sale(
    {
      paymentMethodNonce: nonce,
      amount: setAmount,
      options: {
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
        console.log(error);
      }
    }
  );
});
module.exports = router;