const mongoose = require("mongoose");

const PromotionUsageSchema = new mongoose.Schema({
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    promotion_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotion",
      required: true,
    },
    used_at: { type: Date, default: Date.now }
  });

module.exports = mongoose.model("PromotionUsage", PromotionUsageSchema);