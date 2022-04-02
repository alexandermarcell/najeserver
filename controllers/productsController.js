const asyncHandler = require('express-async-handler');
const Products = require('../models/productModel');


const getProducts = asyncHandler( async(req, res) => {

    const productData = await Products.find();
    
    res.status(200).json({
        productData
    })
})




module.exports = { getProducts }