const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Item = require('../models/itemModel');


//get all shopping cart items
const getCart = asyncHandler( async (req, res) => {

    const owner = "624708907e942ff21cb90776";
    //const owner = req.user._id;

    try {
        const cart = await Cart.findOne({ owner });
        if (cart) {
            res.status(200).send(cart);
        } else {
            res.send({
                'message': 'The cart is empty'
            });
        }
    } catch (error) {
        res.status(500).send(error)
    }
});

//add to cart
const addToCart = asyncHandler( async (req, res) => {

    //const owner = req.user._id;
    const owner = "624708907e942ff21cb90776";
    
    const { itemId, quantity } = req.body;
  
    try {
      const cart = await Cart.findOne({ owner });
      const item = await Item.findOne({ _id: itemId });
      if (!item) {
        res.status(404).send({ message: "item not found" });
        return;
      }
      const price = item.price;
      const name = item.name;
      const image = item.image;
      //If cart already exists for user,
      if (cart) {
        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
        //check if product exists or not
  
        if (itemIndex > -1) {
          let item = cart.items[itemIndex];
          item.quantity += quantity;
  
          cart.bill = cart.items.reduce((acc, curr) => {
              return acc + curr.quantity * curr.price;
          },0)
          
          cart.items[itemIndex] = item;
          await cart.save();
          res.status(200).send(cart);
        } else {
          cart.items.push({ itemId, name, image, quantity, price });
          cart.bill = cart.items.reduce((acc, curr) => {
              return acc + curr.quantity * curr.price;
          },0)
  
          await cart.save();
          res.status(200).send(cart);
        }
      } else {
        //no cart exists, create one
        const newCart = await Cart.create({
          owner,
          items: [{ itemId, name, image, quantity, price }],
          bill: quantity * price,
        });
        return res.status(201).send(newCart);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong");
    }
  });

//deletes a cart item
const deleteCartItems = asyncHandler( async(req, res) => {
    //const owner = req.user._id;
    const owner = "624708907e942ff21cb90776";

    const itemId = req.params.id;
    
    try {
        let cart = await Cart.findOne({ owner });
        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
    
        if (itemIndex > -1){
            let item = cart.items[itemIndex];
            cart.bill -= item.quantity * item.price;
        
            if (cart.bill < 0) {
                cart.bill = 0
            }

            cart.items.splice(itemIndex, 1);
            cart.bill = cart.items.reduce((acc, curr) => {
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


const updateItemsInCart = asyncHandler( async(req, res) => {
    //const owner = req.user._id;
  const owner = "624708907e942ff21cb90776";

  const itemId = req.params.id;

  const { quantity } = req.body;
  
  try {
      let cart = await Cart.findOne({ owner });
      const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
      
      if (itemIndex > -1){
        let item = cart.items[itemIndex];
        if (quantity === 1) {
          item.quantity += quantity;

          cart.bill = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
          }, 0)
  
          await cart.save();
          res.status(200).send(cart);
        } 
        if (quantity === -1) {
          item.quantity --;
          
          cart.bill = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
          }, 0)

          await cart.save();
          res.status(200).send(cart);
        }
      } else {
        res.status(404).send({
          message: 'item not found'
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
});


module.exports = {
    getCart,
    addToCart,
    deleteCartItems,
    updateItemsInCart,
}