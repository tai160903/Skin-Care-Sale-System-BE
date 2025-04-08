const mongoose = require("mongoose");
const promotionConditionSchema = new mongoose.Schema(
  {
    point: { type: Number, required: true, unique: true },
  discount: { type: Number, required: true }
    },
  { timestamps: true }
);
module.exports = mongoose.model("PromotionCondition",promotionConditionSchema);