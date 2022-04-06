const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const CartSchema = mongoose.Schema(
    {
        userId: {
            type: ObjectID,
            required: true,
            ref: "User"
        },
        products: [
            {
                productId: {
                    type: ObjectID,
                    ref: "Products",
                    required: true
                },
                image: String,
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1
                },
                productName: String,
                price: Number
            }
        ],
        bill: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    {
    timestamps: true
    }
)

const shoppingcarts = mongoose.model('shoppingcarts', CartSchema);
module.exports = shoppingcarts