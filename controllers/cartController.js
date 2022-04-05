const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

//get all shopping cart items
const getCart = asyncHandler( async (req, res) => {
    //const { _id, productName, quantity, price } = await Cart.find()
    const cart = await Cart.find()

    res.status(200).json({
        cart
    })
})

//add to cart
const addToCart = asyncHandler( async (req, res) => {
    const { 
        productId, 
        productName, 
        quantity, 
        price 
    } = req.body;

    const userId = '624708907e942ff21cb90776';

    try {
        console.log("running")
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
                cart.products.push({ productId, productName,  quantity, price });
            }
            cart = await cart.save();
        } else {
            //no cart for user, create new cart
            cart = await Cart.create({
                userId,
                products: [
                    {
                        productId, 
                        productName, 
                        quantity, 
                        price
                    }
                ]
            });
        }
        return res.status(201).send(cart);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            'message': 'Something went wrong'
        })
    }

});


module.exports = {
    getCart,
    addToCart
}


//     //const productId = req.params.id;

//     //const cart = new Cart(req.session.cart ? req.session.cart : {});

//     Product.findById(productId, function(err, product) {
//         if (err) {
//             return res.redirect('/');
//         }
//         console.log(req.body);
//         //cart.push(product, productId);
//         //need to be pushed into schema not session
//         //req.session.cart = cart;
//         console.log(req.session.cart);
//         res.redirect('/');
//     })
// })