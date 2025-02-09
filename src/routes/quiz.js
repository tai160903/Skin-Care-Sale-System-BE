const express = require("express");
const quizController = require("../controllers/quizController");

const router = express.Router();

router.get("/questions", quizController.getQuestions);
router.get("/answers/:questionId", quizController.getAnswers);
router.post("/submit", quizController.submitQuiz);

module.exports = router;
