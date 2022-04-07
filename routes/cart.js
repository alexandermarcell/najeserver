const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCart, addToCart, deleteCartItems } = require('../controllers/cartController');

//view shopping cart
router.get('/', getCart);

//add to cart
router.post('/', addToCart);

//delete item from cart
router.delete('/', auth, deleteCartItems);


module.exports = router;