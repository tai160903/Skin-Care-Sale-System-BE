const validateQuizSubmission = (req, res, next) => {
  const { customerId, answers } = req.body;

  if (!customerId) {
    return res.status(400).json({ error: "Customer ID is required" });
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    return res
      .status(400)
      .json({ error: "Answers must be an array and cannot be empty" });
  }

  for (let answer of answers) {
    if (!answer.questionId || !answer.answerId) {
      return res
        .status(400)
        .json({ error: "Each answer must have a questionId and answerId" });
    }
  }

  next();
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
};

module.exports = {
  validateQuizSubmission,
  errorHandler,
};
