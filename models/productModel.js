const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    image: {
        type: String,
        required: [true, 'Please add a image']
    },
    productName: {
        type: String,
        required: [true, 'Please add a product name']
    },
    description: {
        type: String,
        required: [true, 'Please add a product description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Products', productsSchema)