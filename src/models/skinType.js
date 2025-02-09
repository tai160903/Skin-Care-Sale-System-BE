const mongoose = require("mongoose");

const SkinTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SkinType", SkinTypeSchema);
