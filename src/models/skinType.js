const mongoose = require("mongoose");

const SkinTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Oily", "Dry", "Combination", "Normal", "Sensitive"], // Only allows these values
    },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SkinType", SkinTypeSchema);
