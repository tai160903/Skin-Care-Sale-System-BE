const express = require("express");
const quizController = require("../controllers/quizController");
const {
  validateQuizSubmission,
  errorHandler,
} = require("../middlewares/quizMiddleware");

const router = express.Router();

router.get("/questions", quizController.getQuestions);
router.get("/answers/:questionId", quizController.getAnswers);
router.post("/submit", validateQuizSubmission, quizController.submitQuiz);

// Use global error handler
router.use(errorHandler);

module.exports = router;
