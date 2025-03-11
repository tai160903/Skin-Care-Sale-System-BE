const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      answerId: { type: mongoose.Schema.Types.ObjectId, ref: "Answer" },
    },
  ],
  resultSkinType: { type: mongoose.Schema.Types.ObjectId, ref: "SkinType" }, // Reference to SkinType collection
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserAnswer", userAnswerSchema);
