const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');


//get all shopping cart items
const getCart = asyncHandler( async (req, res) => {

    //const owner = req.user._id;
    const owner = "624708907e942ff21cb90776";

    try {
        const cart = await Cart.find({ owner });
        console.log(cart)
        if (cart) {
            res.status(200).send(cart);
        } else {
            res.send({
                'message': 'The cart is empty'
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

//add to cart
const addToCart = asyncHandler( async (req, res) => {

    //const owner = req.user._id;
    const owner = "624708907e942ff21cb90776";

    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ owner });
        const product = await Product.findOne({ _id: productId });
        if(!product){
            res.status(404).send({
                message: "item not found"
            })
            return;
        }
        const price = product.price;
        const name = product.productName;

        //if cart already exists for user,

        if(cart){
            const productIndex = cart.products.findIndex((product) => product.productId == productId);

            //check if product exists or not

            if (productIndex > -1) {
                let product = cart.products[productIndex];
                product.quantity += quantity;
                cart.bill = cart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                },0)
                await cart.save();
                res.status(200).send(cart);
            } else {
                //no cart exists, create one
                const newCart = await Cart.create({
                    owner,
                    items: [{productId, name, quantity, price}],
                    bill: quantity * price,
                });
                return res.status(201).send(newCart);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }

});

const deleteCartItems = asyncHandler( async(req, res) => {
    //const owner = req.user._id;
    const owner = "624708907e942ff21cb90776";

    const productId = req.query.productId;
    
    try {
        let cart = await Cart.findOne({ owner });

        const productIndex = cart.products.findIndex((product) => {
            product.productId == productId;
        })
        if (productIndex > -1){
            let product = cart.products[productIndex];
            cart.bill -= product.quantity * product.price;
        
            if (cart.bill < 0) {
                cart.bill = 0
            }

            cart.product.splice(productIndex, 1);
            cart.bill = cart.products.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0)

            cart = await cart.save();

            res.status(200).send(cart);
        } else {
            res.status(404).send("item not found");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});


module.exports = {
    getCart,
    addToCart,
    deleteCartItems
}