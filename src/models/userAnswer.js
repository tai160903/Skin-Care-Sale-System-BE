const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      answerId: mongoose.Schema.Types.ObjectId,
    },
  ],
  resultSkinType: String, // Final skin type after processing
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserAnswer", userAnswerSchema);
