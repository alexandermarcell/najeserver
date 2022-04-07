const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId

const itemSchema = mongoose.Schema({
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
    name: {
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

const Item = mongoose.model('Item', itemSchema);
module.exports = Item