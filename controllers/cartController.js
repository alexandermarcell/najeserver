
const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

//get all shopping cart items
const getCart = asyncHandler( async (req, res) => {
    if(!req.session.cart) {
        return res.render('/cart', {products: null});
    }
    const cart = new Cart(req.session.cart);
    return res.render('shop/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
})

//add to cart
const addToCart = asyncHandler( async (req, res) => {
    const { productId, quantity, productName, price } = req.body;

    const userId = {}

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            //cart exists for user
            let itemIndex = cart.products.findIndex( p => p.productId === productId);

            if (itemIndex > -1) {
                //product exists in the cart, update teh quantity
                let productItem = cart.products[itemIndex];
                productItem.quantity = quantity;
                cart.products[itemIndex] =  productItem;
            } else {
                //product does not exist in cart, add new item
                cart.products.push({ productId, quantity, productName, price });
            }
            cart = await cart.save();
        } else {
            //no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                products: [
                    {
                        productId, quantity, productName, price
                    }
                ]
            });

            return res.status(201).send(newCart);
        }
    } catch (error) {
        res.status(500).json({
            'message': 'Something went wrong'
        })
    }

});


module.exports = {
    getCart,
    addToCart
}