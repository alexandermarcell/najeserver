const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCart, addToCart, deleteCartItems, updateItemsInCart } = require('../controllers/cartController');

//view shopping cart
router.get('/', getCart);

//add to cart
router.post('/', addToCart);

//delete item from cart
router.delete('/:id', deleteCartItems);

//update item in cart
router.put('/:id', updateItemsInCart);


module.exports = router;