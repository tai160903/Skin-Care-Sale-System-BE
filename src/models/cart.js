const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", 
    required: true },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 },
  priceAtTime: { 
    type: Number,
    required: true } 
});

const CartSchema = new mongoose.Schema({
  customer_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Customer", 
    required: true },
  items: [CartItemSchema], 
  totalPrice: { 
    type: Number, 
    default: 0 },
  discountpercent: { 
    type: Number, 
    default: 0 },
  finalPrice: { 
    type: Number, 
    default: 0 }
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
