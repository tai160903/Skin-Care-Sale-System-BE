const mongoose = require("mongoose");

const conditionPointSchema = new mongoose.Schema(
  {
    condition: {
      type: Number, 
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ConditionPoint", conditionPointSchema);