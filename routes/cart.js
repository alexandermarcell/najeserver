const express = require('express');
const router = express.Router();
const { getCart, addToCart } = require('../controllers/cartController');

//view shopping cart
router.get('/', getCart);

//add to cart
router.post('/', addToCart);


module.exports = router;




// router.get('/add-to-cart', function(req, res) {

//     const productId = req.params.id;

//     const cart = new Cart(req.session.cart ? req.session.cart : {});

//     Product.findById(productId, function(err, product) {
//         if (err) {
//             return res.redirect('/');
//         }
//         console.log(req.body);
//         cart.add(product, product.id);
//         //need to be pushed into schema not session
//         //req.session.cart = cart;
//         console.log(req.session.cart);
//         res.redirect('/');
//     })

// });