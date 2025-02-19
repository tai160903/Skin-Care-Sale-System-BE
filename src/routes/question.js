const express = require("express");
const quizController = require("../controllers/questionController");
const {
  validateQuizSubmission,
  errorHandler,
} = require("../middlewares/quizMiddleware");

const router = express.Router();

router.get("/", quizController.getQuestions);
router.get("/answers/:questionId", quizController.getAnswers);
router.get("/results/:userId", quizController.getResults);
router.post("/create", quizController.createQuestion);
router.post("/submit", validateQuizSubmission, quizController.submitQuestion);
router.put("/update/:questionId", quizController.updateQuestion);
router.put("/delete/:questionId", quizController.deleteQuestion);

// Use global error handler
router.use(errorHandler);

module.exports = router;
