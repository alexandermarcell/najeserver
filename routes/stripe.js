const express = require("express");
const router = express.Router();
const Cart = require('../models/cartModel');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

// const handleOrder = async() => {
//   Cart.findOneAndDelete({ id })
//   .then(() => {
//     console.log('order placed!');
//     next();
//   })
//   .catch(error => {
//     console.log(`error deleting order by ID: ${error.message}`)
//     next();
//   })
// }

router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
        console.log(stripeRes);
      }
    }
  );
});

module.exports = router;