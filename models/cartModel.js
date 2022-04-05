const mongoose = require('mongoose');

const CartSchema = mongoose.Schema(
    {
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User"
        // },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products"
                },
                quantity: Number,
                name: String,
                price: Number
            }
        ],
        active: {
            type: Boolean,
            default: true
        },
        modifiedOn: {
            type: Date,
            default: Date.now
        }
    },
    {
    timestamps: true
    }
)

module.exports = mongoose.model('shoppingcarts', CartSchema);

// const mongoose = require('mongoose');

// const shoppingcartsSchema = mongoose.Schema(
//     function cart(oldCart){
//         this.items = oldCart.items || {};
//         this.totalQty = oldCart.totalQty || 0;
//         this.totalPrice = oldCart.totalPrice || 0;
    
//         this.add = function(item, id) {
//             let storedItem = this.items[id];
//             if( !storedItem ) {
//                 storedItem = this.items[id] = { item: item, qty: 0, price: 0 }
//             }
//             storedItem.qty++;
//             storedItem.price = storedItem.item.price * storedItem.qty;
//             this.totalQty++;
//             this.totalPrice += storedItem.item.price;
//         }
    
//         this.generateArray = function() {
//             let arr = [];
//             for (var id in this.items) {
//                 arr.push(this.items[id])
//             }
//             return arr;
//         }
//     }
// )