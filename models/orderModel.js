const { ObjectID } = require("bson");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    owner : {
      type: ObjectID,
      required: true,
      ref: 'User'
    },
    items: [{
        itemId: {
          type: ObjectID,
          ref: 'Item',
          required: true
      },
      name: String,
      image: String,
      quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1
      },
      price: Number
      }],
    bill: {
      type: Number,
      required: true,
      default: 0
    },
    status: { 
      type: String, 
      default: "pending" 
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;