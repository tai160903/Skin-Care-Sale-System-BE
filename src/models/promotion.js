const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    image: { type: String },
    discount_percentage: { type: Number, required: true, min: 0, max: 100 },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Promotion = mongoose.model("Promotion", PromotionSchema);
module.exports = Promotion;
