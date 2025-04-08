const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    shipping_name: {
      type: String,
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    shipping_phone: {
      type: String,
      required: true,
    },
    shipping_status: {
      type: String,
      enum: ["Pending", "Shipping", "Delivered", "Cancelled"],
      default: "Pending",
    },
    reason: {
      type: String,
      default: "",
    },
    delivery_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipping", ShippingSchema);
