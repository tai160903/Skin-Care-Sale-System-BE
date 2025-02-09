const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  skinType: { type: String, required: true }, // Example: "Oily", "Dry", "Combination", "Normal"
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});

module.exports = mongoose.model("Answer", answerSchema);
