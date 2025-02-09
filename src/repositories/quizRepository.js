const Question = require("../models/quiz");
const Answer = require("../models/answer");
const UserAnswer = require("../models/userAnswer");

class QuizRepository {
  async getAllQuestions() {
    return await Question.find();
  }

  async getAnswersByQuestionId(questionId) {
    return await Answer.find({ question_id: questionId });
  }

  async saveUserAnswers(userAnswers) {
    return await UserAnswer.create(userAnswers);
  }
}

module.exports = new QuizRepository();
