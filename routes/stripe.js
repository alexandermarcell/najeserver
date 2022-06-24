const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const Cart = require('../models/cartModel');
const Item = require('../models/itemModel');

// const calculateOrderAmount = (items) => {
//   const owner = req.params.id;
//   // Replace this constant with a calculation of the order's amount
//   const cart = Cart.findOne({ owner });
//   const item = Item.findOne({id: ObjectId});
//   const price = item.price;
//   const qty = cart.items.forEach((item) => {
//     item.quantity += quantity
//   });
//   const bill = qty * price
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return bill;
// };


router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  console.log('I pooped' + req.body);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


// router.post('/payment', (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//         console.log(stripeRes);
//       }
//     }
//   );
// });

module.exports = router;