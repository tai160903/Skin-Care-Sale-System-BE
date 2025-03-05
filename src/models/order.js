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

    const OrderSchema = new mongoose.Schema({
        customer_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Customer",
          required: true,
        },
        items: [OrderItemSchema],
        totalPay: {
          type: Number,
          default: 0,
        },
        order_status: {
          type: String,
          enum: ["pending", "confirmed", "completed", "cancelled"],
          default: "pending",
        },
        payment_method: {
          type: String,
          enum: ["stripe", "cash"],
          required: true,
        },
        shipping_price: {
          type: Number,
          required: true,
        }
      }, { timestamps: true });
  
  module.exports = mongoose.model("Order", OrderSchema);
