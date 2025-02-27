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

const DraftOrderSchema = new mongoose.Schema(
  {
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
    amountPrice: {
      type: Number,
      default: 0,
    },
    promoPrice: {
      type: Number,
      default: 0,
    },
    // promotion
    desc: {
      type: String,
      default: "",
    },
    finalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DraftOrder", DraftOrderSchema);
