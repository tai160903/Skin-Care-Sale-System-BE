const quizService = require("../services/quizService");

class QuizController {
  async getQuestions(req, res) {
    try {
      const questions = await quizService.getQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching questions" });
    }
  }

  async getAnswers(req, res) {
    try {
      const { questionId } = req.params;
      const answers = await quizService.getAnswers(questionId);
      res.json(answers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching answers" });
    }
  }

  async submitQuiz(req, res) {
    try {
      const { userId, answers } = req.body; // Expected: [{ questionId, answerId }]
      const result = await quizService.submitQuiz(userId, answers);
      res.json({ message: "Quiz submitted successfully", result });
    } catch (error) {
      res.status(500).json({ message: "Error submitting quiz" });
    }
  }
}

module.exports = new QuizController();
