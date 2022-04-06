const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId

const productsSchema = new mongoose.Schema({
    owner: {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: [true, 'Please add a image']
    },
    //could add category type string, require
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