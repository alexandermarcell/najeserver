const express = require('express');
const router = express.Router();
const { getCart, addToCart } = require('../controllers/cartController');

//view shopping cart
router.get('/', getCart);

//add to cart
router.post('/', addToCart);


module.exports = router;