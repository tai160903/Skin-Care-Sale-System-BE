const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtTime: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [OrderItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    descriptions: {
      type: String,
      default: "",
    },
    finalPrice: {
      type: Number,
      default: 0,
    },
    shipping_fee: {
      type: Number,
      required: true,
    },
    totalPay: {
      type: Number,
      default: 0,
    },
    order_status: {
      type: String,
      enum: ["Pending Confirmation", "Confirmed", "Completed", "Cancelled"],
      default: "Pending Confirmation",
    },
    payment_method: {
      type: String,
      enum: ["PayPal", "Cash"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
