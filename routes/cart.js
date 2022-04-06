const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const { getCart, addToCart, deleteCartItems } = require('../controllers/cartController');

//view shopping cart
router.get('/', getCart);

//add to cart
router.post('/', addToCart);

//delete item from cart
router.delete('/', deleteCartItems);


module.exports = router;