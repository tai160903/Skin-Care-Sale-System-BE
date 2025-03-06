const questionService = require("../services/questionService");

class QuestionController {
  async getQuestions(req, res) {
    try {
      const questions = await questionService.getQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching questions" });
    }
  }

  async getAnswers(req, res) {
    try {
      const { questionId } = req.params;
      const answers = await questionService.getAnswers(questionId);
      res.json(answers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching answers" });
    }
  }

  async submitQuestion(req, res) {
    try {
      const { customerId, answers } = req.body;

      const result = await questionService.submitQuiz(customerId, answers);
      res.json({ message: "Answer submitted successfully", result });
    } catch (error) {
      res.status(500).json({ message: "Error submitting quiz" });
    }
  }

  async getResults(req, res) {
    try {
      const { userId } = req.params;
      const results = await questionService.getResults(userId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Error fetching results" });
    }
  }

  async createQuestion(req, res) {
    try {
      const question = await questionService.createQuestion(req.body);
      res.status(201).json(question);
    } catch (error) {
      res.status(500).json({ message: "Error creating question" });
    }
  }

  async updateQuestion(req, res) {
    try {
      const { questionId } = req.params;
      const question = await questionService.updateQuestion(
        questionId,
        req.body
      );
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Error updating question" });
    }
  }

  async deleteQuestion(req, res) {
    try {
      const { questionId } = req.params;
      await questionService.deleteQuestion(questionId);
      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting question" });
    }
  }

  async createQuiz(req, res) {
    try {
      const questions = await questionService.createQuiz(req.body);
      res.status(201).json(questions);
    } catch (error) {
      res.status(500).json({ message: "Error creating quiz" });
    }
  }

  async updateQuiz(req, res) {
    try {
      const { questionId } = req.params;
      const question = await questionService.updateQuiz(questionId, req.body);
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Error updating quiz" });
    }
  }

  async deleteQuiz(req, res) {
    try {
      const { questionId } = req.params;
      await questionService.deleteQuiz(questionId);
      res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting quiz" });
    }
  }
}

module.exports = new QuestionController();
